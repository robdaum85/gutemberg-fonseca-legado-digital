import { classColor, RAMPS } from '../metrics.js';
import { escapeHtml } from '../utils/formatters.js';

// Legenda textual: cada faixa tem rótulo de valores; “sem dado” usa hachura, não só cor (SPEC §17, §24).
export function renderLegend(el, { metric, classes, noDataLabel }) {
  const ramp = RAMPS[metric.period];
  const range = (c) => (c.min === c.max ? metric.fmt(c.min) : `${metric.fmt(c.min)} a ${metric.fmt(c.max)}`);
  const items = classes.map((c, i) => `<li><span class="terr-swatch" style="background:${classColor(i, classes.length, ramp)}"></span>${escapeHtml(range(c))}</li>`);
  items.push(`<li><span class="terr-swatch terr-swatch-nodata"></span>${escapeHtml(noDataLabel)}</li>`);
  const scope = metric.period === '2026'
    ? '<strong>Engajamento digital 2026</strong> — escala de atividade no site, não de desempenho eleitoral.'
    : '<strong>Resultado eleitoral 2022</strong> — escala do histórico de votos.';
  el.innerHTML = `
    <div class="terr-legend-title">${escapeHtml(metric.label)} <span class="terr-help" title="${escapeHtml(metric.help)}">?</span></div>
    <p class="terr-legend-help">${escapeHtml(metric.help)}</p>
    <ul class="terr-legend-list" aria-label="Legenda de cores do mapa">${items.join('')}</ul>
    <p class="terr-legend-note">${scope} Faixas por quantis: cores mais escuras = valores maiores. Zero fica na faixa mais clara.</p>`;
}
