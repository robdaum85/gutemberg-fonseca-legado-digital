// Mapa coroplético municipal do RJ (MapLibre GL JS, sem mapa base externo).
// Recebe as cores já calculadas por município; não conhece regras de negócio.
import { Map as MapLibreMap, NavigationControl, Popup, setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import { NO_DATA_COLOR } from '../metrics.js';

setWorkerUrl(workerUrl);

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function bboxOf(features) {
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  const walk = (c) => {
    if (typeof c[0] === 'number') {
      b[0] = Math.min(b[0], c[0]); b[1] = Math.min(b[1], c[1]);
      b[2] = Math.max(b[2], c[0]); b[3] = Math.max(b[3], c[1]);
    } else c.forEach(walk);
  };
  features.forEach((f) => walk(f.geometry.coordinates));
  return [[b[0], b[1]], [b[2], b[3]]];
}

// Hachura diagonal para “sem dado”: não depende só da cor (SPEC §17, §24).
function hatchImage(size = 10) {
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = NO_DATA_COLOR;
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = '#8b97a6';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(0, size); ctx.lineTo(size, 0);
  ctx.moveTo(-size / 2, size / 2); ctx.lineTo(size / 2, -size / 2);
  ctx.moveTo(size / 2, size * 1.5); ctx.lineTo(size * 1.5, size / 2);
  ctx.stroke();
  return ctx.getImageData(0, 0, size, size);
}

/**
 * @param {{container: HTMLElement, geojson: object, onSelect: (key: string) => void}} options
 */
export function createTerritorialMap({ container, geojson, onSelect }) {
  const features = geojson.features.map((f) => ({
    type: 'Feature',
    geometry: f.geometry,
    properties: { key: f.properties.key, cls: -1, color: NO_DATA_COLOR },
  }));
  const featureByKey = new Map(features.map((f) => [f.properties.key, f]));
  const stateBounds = bboxOf(features);
  let tooltipFor = () => '';
  let pending = null;

  const map = new MapLibreMap({
    container,
    style: { version: 8, sources: {}, layers: [{ id: 'bg', type: 'background', paint: { 'background-color': '#f6f9fc' } }] },
    bounds: stateBounds,
    fitBoundsOptions: { padding: 16 },
    maxBounds: [[stateBounds[0][0] - 1.5, stateBounds[0][1] - 1], [stateBounds[1][0] + 1.5, stateBounds[1][1] + 1]],
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
    cooperativeGestures: true,
    attributionControl: { compact: true, customAttribution: 'Limites municipais: IBGE' },
    canvasContextAttributes: { preserveDrawingBuffer: true, antialias: true },
  });
  map.touchZoomRotate.disableRotation();
  map.addControl(new NavigationControl({ showCompass: false }), 'top-right');

  const popup = new Popup({ closeButton: false, closeOnClick: false, maxWidth: '300px', className: 'terr-popup', offset: 10 });

  const ready = new Promise((resolve) => {
    map.on('load', () => {
      map.addImage('hatch', hatchImage());
      map.addSource('municipios', { type: 'geojson', data: { type: 'FeatureCollection', features } });
      map.addLayer({ id: 'mun-fill', type: 'fill', source: 'municipios', filter: ['>=', ['get', 'cls'], 0], paint: { 'fill-color': ['get', 'color'] } });
      map.addLayer({ id: 'mun-nodata', type: 'fill', source: 'municipios', filter: ['<', ['get', 'cls'], 0], paint: { 'fill-pattern': 'hatch' } });
      map.addLayer({ id: 'mun-line', type: 'line', source: 'municipios', paint: { 'line-color': '#ffffff', 'line-width': 0.8 } });
      map.addLayer({ id: 'mun-hover', type: 'line', source: 'municipios', filter: ['==', ['get', 'key'], ''], paint: { 'line-color': '#10233f', 'line-width': 1.6 } });
      map.addLayer({ id: 'mun-selected', type: 'line', source: 'municipios', filter: ['==', ['get', 'key'], ''], paint: { 'line-color': '#10233f', 'line-width': 3 } });
      resolve();
    });
  });

  const interactive = ['mun-fill', 'mun-nodata'];
  const canHover = window.matchMedia?.('(hover: hover)').matches;
  for (const layer of interactive) {
    map.on('mousemove', layer, (event) => {
      const key = event.features?.[0]?.properties?.key;
      if (!key) return;
      map.getCanvas().style.cursor = 'pointer';
      map.setFilter('mun-hover', ['==', ['get', 'key'], key]);
      if (canHover) popup.setLngLat(event.lngLat).setHTML(tooltipFor(key)).addTo(map);
    });
    map.on('mouseleave', layer, () => {
      map.getCanvas().style.cursor = '';
      map.setFilter('mun-hover', ['==', ['get', 'key'], '']);
      popup.remove();
    });
    map.on('click', layer, (event) => {
      const key = event.features?.[0]?.properties?.key;
      if (key) onSelect(key);
    });
  }

  async function apply() {
    await ready;
    const { styleByKey, selectedKey } = pending;
    for (const [key, feature] of featureByKey) {
      const style = styleByKey.get(key) ?? { cls: -1, color: NO_DATA_COLOR };
      feature.properties.cls = style.cls;
      feature.properties.color = style.color;
    }
    map.getSource('municipios').setData({ type: 'FeatureCollection', features });
    map.setFilter('mun-selected', ['==', ['get', 'key'], selectedKey ?? '']);
  }

  return {
    /** styleByKey: Map<key, {cls, color}>; cls = -1 significa sem dado. */
    update({ styleByKey, selectedKey, tooltip }) {
      tooltipFor = tooltip;
      pending = { styleByKey, selectedKey };
      return apply();
    },
    async focus(key) {
      await ready;
      const feature = featureByKey.get(key);
      const bounds = feature ? bboxOf([feature]) : stateBounds;
      map.fitBounds(bounds, { padding: 40, maxZoom: 10, duration: reducedMotion() ? 0 : 600 });
    },
    resize: () => map.resize(),
    whenIdle: () => ready.then(() => new Promise((resolve) => (map.loaded() && !map.isMoving() ? resolve() : map.once('idle', resolve)))),
    snapshot: () => map.getCanvas().toDataURL('image/png'),
  };
}
