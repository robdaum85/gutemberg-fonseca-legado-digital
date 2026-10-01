// Confere os JSON publicados (gerados pelo build de dados), sem depender dos CSVs fora do git.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => JSON.parse(readFileSync(new URL(`../../../public/data/territorial/${file}`, import.meta.url), 'utf8'));
const territorial = read('territorial.json');
const geojson = read('rj_municipios.geojson');
const locais = read('locais.json');
const secoes = read('secoes.json');
const TOTAL = 19288;
const sum = (arr) => arr.reduce((a, b) => a + b, 0);

test('totais históricos batem em todos os níveis', () => {
  const comVoto = territorial.municipios.filter((m) => m.tse);
  assert.equal(comVoto.length, 89);
  assert.equal(sum(comVoto.map((m) => m.tse.votos)), TOTAL);
  assert.equal(territorial.zonas.length, 180);
  assert.equal(sum(territorial.zonas.map((z) => z[2])), TOTAL);
  assert.equal(locais.rows.length, 3063);
  assert.equal(sum(locais.rows.map((l) => l[4])), TOTAL);
  assert.equal(secoes.rows.length, 9954);
  assert.equal(sum(secoes.rows.map((s) => s[2])), TOTAL);
  assert.ok(secoes.rows.every((s) => s[2] > 0));
  for (const m of comVoto) assert.ok(m.tse.secoes_com_voto <= m.tse.secoes_total, m.nome);
});

test('GeoJSON: 92 municípios do RJ, todos os 89 com voto relacionados', () => {
  assert.equal(geojson.features.length, 92);
  const keys = new Set(geojson.features.map((f) => f.properties.key));
  for (const m of territorial.municipios) assert.ok(keys.has(m.key), m.key);
  assert.deepEqual(territorial.qa.geojson.unmatched_csv, []);
});

test('GA4: somente cidades do RJ no Brasil entram no mapa; ausente ≠ zero', () => {
  const noMapa = territorial.municipios.filter((m) => m.ga4).map((m) => m.key).sort();
  assert.deepEqual(noMapa, ['CABO FRIO', 'DUQUE DE CAXIAS', 'RIO DE JANEIRO', 'SAO JOAO DE MERITI']);
  const mage = territorial.municipios.find((m) => m.key === 'MAGE');
  assert.equal(mage.ga4, null, 'Magé sem dado GA4 deve ser null, não zero');
  for (const c of territorial.ga4.cidades.filter((x) => x.categoria === 'exterior' || x.categoria === 'not_set')) {
    assert.ok(!territorial.municipios.some((m) => m.ga4 && m.nome === c.cidade), c.cidade);
  }
  assert.deepEqual(territorial.qa.ga4_por_categoria.bot_identificado, []);
});

test('nenhum campo de score/previsão nos dados publicados', () => {
  const text = JSON.stringify(territorial).toLowerCase();
  for (const word of ['score', 'previs', 'potencial', 'prioridade', 'persuas', 'votos_estimados']) {
    assert.ok(!text.includes(word), word);
  }
});
