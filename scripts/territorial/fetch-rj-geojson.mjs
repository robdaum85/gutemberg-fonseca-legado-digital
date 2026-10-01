// Baixa os limites municipais oficiais do Estado do Rio de Janeiro (IBGE, malha municipal)
// e grava public/data/territorial/rj_municipios.geojson com nome e código IBGE em cada feature.
// Os nomes vêm da API de localidades do IBGE e são relacionados pelo código do município.
// Uso: node scripts/territorial/fetch-rj-geojson.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeMunicipio } from '../../src/dashboard-territorial/utils/normalizeMunicipio.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'public/data/territorial/rj_municipios.geojson');
const UF_RJ = 33;
const MALHA_URL = `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${UF_RJ}?formato=application/vnd.geo%2Bjson&qualidade=intermediaria&intrarregiao=municipio`;
const NOMES_URL = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF_RJ}/municipios`;
const EXPECTED_MUNICIPIOS_RJ = 92;

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

// 5 casas decimais (~1 m) bastam para o mapa e reduzem o arquivo.
const roundCoords = (coords) => (typeof coords[0] === 'number'
  ? coords.map((n) => Math.round(n * 1e5) / 1e5)
  : coords.map(roundCoords));

const [malha, municipios] = await Promise.all([getJson(MALHA_URL), getJson(NOMES_URL)]);
const nomePorCodigo = new Map(municipios.map((m) => [String(m.id), m.nome]));

const semNome = [];
const features = malha.features.map((feature) => {
  const codigo = String(feature.properties.codarea);
  const name = nomePorCodigo.get(codigo);
  if (!name) semNome.push(codigo);
  return {
    type: 'Feature',
    properties: { codigo_ibge: codigo, name, key: normalizeMunicipio(name) },
    geometry: { ...feature.geometry, coordinates: roundCoords(feature.geometry.coordinates) },
  };
});

if (semNome.length) throw new Error(`Feições sem nome na API do IBGE: ${semNome.join(', ')}`);
if (features.length !== EXPECTED_MUNICIPIOS_RJ) {
  throw new Error(`Esperado ${EXPECTED_MUNICIPIOS_RJ} municípios no RJ, recebido ${features.length}`);
}

features.sort((a, b) => a.properties.key.localeCompare(b.properties.key));
const geojson = {
  type: 'FeatureCollection',
  metadata: {
    fonte: 'IBGE — API de malhas v3 (qualidade intermediária) + API de localidades v1',
    malha_url: MALHA_URL,
    nomes_url: NOMES_URL,
    gerado_em: new Date().toISOString().slice(0, 10),
  },
  features,
};

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(geojson));
console.log(`OK: ${features.length} municípios gravados em ${path.relative(ROOT, OUT)}`);
