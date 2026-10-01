import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeMunicipio, matchByMunicipio } from '../utils/normalizeMunicipio.js';
import { parsePtBrNumber, parseDotDecimal, parseInteger, ParseNumberError } from '../utils/parsePtBrNumber.js';
import { csvToObjects, parseCsv } from '../utils/csv.js';
import { classifyGa4City, parseGa4CityRow, shareUsuariosBrasil, TRAFFIC_CATEGORY } from '../utils/ga4.js';
import { fmtDuration, fmtInt, fmtPct, SEM_DADO } from '../utils/formatters.js';
import { buildClasses, classColor, RAMPS } from '../metrics.js';
import { sortMunicipios, filterMunicipios } from '../components/municipalityRanking.js';

test('normalizeMunicipio: acentos, caixa, espaços', () => {
  assert.equal(normalizeMunicipio('São João de Meriti'), 'SAO JOAO DE MERITI');
  assert.equal(normalizeMunicipio('Rio de Janeiro'), 'RIO DE JANEIRO');
  assert.equal(normalizeMunicipio('Magé'), 'MAGE');
  assert.equal(normalizeMunicipio('  armação   dos búzios '), 'ARMACAO DOS BUZIOS');
  assert.equal(normalizeMunicipio(null), '');
});

test('matchByMunicipio: sem fuzzy matching', () => {
  const r = matchByMunicipio(['MAGÉ', 'RIO DE JANEIRO', 'MAGÉE'], ['Magé', 'Rio de Janeiro', 'Varre-Sai']);
  assert.deepEqual(r.matched, ['MAGE', 'RIO DE JANEIRO']);
  assert.deepEqual(r.unmatchedLeft, ['MAGÉE']);
  assert.deepEqual(r.unmatchedRight, ['Varre-Sai']);
});

test('parsePtBrNumber: vírgula decimal e milhar', () => {
  assert.equal(parsePtBrNumber('54,50'), 54.5);
  assert.equal(parsePtBrNumber('0,322'), 0.322);
  assert.equal(parsePtBrNumber('3.263.787'), 3263787);
  assert.equal(parsePtBrNumber('1.234,5'), 1234.5);
  assert.equal(parsePtBrNumber('10512'), 10512);
  assert.equal(parsePtBrNumber(''), null, 'vazio é sem dado, não zero');
  assert.throws(() => parsePtBrNumber('54.50,1'), ParseNumberError);
  assert.throws(() => parsePtBrNumber('abc'), ParseNumberError);
  assert.throws(() => parseInteger('1,5'), ParseNumberError);
});

test('parseDotDecimal: formato do CSV do GA4', () => {
  assert.equal(parseDotDecimal('60.34'), 60.34);
  assert.equal(parseDotDecimal(''), null);
  assert.throws(() => parseDotDecimal('60,34'), ParseNumberError);
});

test('parseCsv: BOM, CRLF, aspas e linhas vazias', () => {
  assert.deepEqual(parseCsv('﻿a;b\r\n1;"x;y"\r\n\r\n2;"diz ""oi"""\r\n'), [['a', 'b'], ['1', 'x;y'], ['2', 'diz "oi"']]);
  assert.throws(() => csvToObjects('a;b\n1;2;3\n'), /3 colunas/);
  assert.throws(() => csvToObjects('a;b\n1;2\n', { required: ['c'] }), /ausentes: c/);
});

test('GA4: exterior e (not set) nunca entram no RJ; bot nunca é inferido', () => {
  const rj = new Set(['RIO DE JANEIRO', 'CABO FRIO']);
  assert.equal(classifyGa4City({ cidade: 'Rio de Janeiro', pais: 'Brazil' }, rj), TRAFFIC_CATEGORY.BRASIL_RJ);
  assert.equal(classifyGa4City({ cidade: 'Sao Paulo', pais: 'Brazil' }, rj), TRAFFIC_CATEGORY.BRASIL_FORA_RJ);
  assert.equal(classifyGa4City({ cidade: 'Lisboa', pais: 'Portugal' }, rj), TRAFFIC_CATEGORY.EXTERIOR);
  assert.equal(classifyGa4City({ cidade: 'Teerã', pais: 'Iran' }, rj), TRAFFIC_CATEGORY.EXTERIOR);
  assert.equal(classifyGa4City({ cidade: '(not set)', pais: 'Brazil' }, rj), TRAFFIC_CATEGORY.NOT_SET);
  // Mesmo nome de cidade do RJ, mas fora do Brasil: continua exterior.
  assert.equal(classifyGa4City({ cidade: 'Rio de Janeiro', pais: 'Portugal' }, rj), TRAFFIC_CATEGORY.EXTERIOR);
});

test('GA4: share brasileiro ignora exterior e sem dado', () => {
  const rj = new Set(['RIO DE JANEIRO']);
  const rows = [
    { cidade: 'Rio de Janeiro', pais: 'Brazil', usuarios_ativos: '202' },
    { cidade: 'Sao Paulo', pais: 'Brazil', usuarios_ativos: '33' },
    { cidade: 'Lisboa', pais: 'Portugal', usuarios_ativos: '500' },
    { cidade: 'Niteroi', pais: 'Brazil', usuarios_ativos: '' },
  ].map((r) => parseGa4CityRow(r, rj));
  const { total, share } = shareUsuariosBrasil(rows);
  assert.equal(total, 235);
  assert.equal(share(rows[3]), null);
  assert.ok(Math.abs(share(rows[0]) - 85.957) < 0.01);
});

test('formatters nunca devolvem undefined/NaN', () => {
  assert.equal(fmtInt(19288), '19.288');
  assert.equal(fmtPct(54.5), '54,50%');
  assert.equal(fmtDuration(103), '1m43s');
  assert.equal(fmtDuration(56), '56 s');
  for (const v of [null, undefined, NaN, Infinity]) {
    assert.equal(fmtInt(v), SEM_DADO);
    assert.equal(fmtPct(v), SEM_DADO);
    assert.equal(fmtDuration(v), SEM_DADO);
  }
});

test('buildClasses: zero na menor faixa, sem dado = -1', () => {
  const { classes, classify } = buildClasses([0, 1, 2, 3, 4, 5, 6, 7, 8, 100, null]);
  assert.equal(classes.length, 5);
  assert.equal(classify(0), 0);
  assert.equal(classify(100), 4);
  assert.equal(classify(null), -1);
  const few = buildClasses([14, 17, 32, 202, null, null]);
  assert.equal(few.classes.length, 4);
  assert.equal(buildClasses([null, null]).classes.length, 0);
  assert.equal(classColor(0, 1, RAMPS[2022]), RAMPS[2022][2]);
  assert.equal(classColor(3, 4, RAMPS[2026]), RAMPS[2026][4]);
});

test('ranking: ordena por coluna e mantém sem dado no fim', () => {
  const rows = [
    { key: 'A', nome: 'A', tse: { votos: 5 }, ga4: null },
    { key: 'B', nome: 'B', tse: null, ga4: { usuarios_ativos: 10 } },
    { key: 'C', nome: 'C', tse: { votos: 50 }, ga4: { usuarios_ativos: 2 } },
  ];
  assert.deepEqual(sortMunicipios(rows, { column: 'votos', dir: 'desc' }).map((r) => r.key), ['C', 'A', 'B']);
  assert.deepEqual(sortMunicipios(rows, { column: 'votos', dir: 'asc' }).map((r) => r.key), ['A', 'C', 'B']);
  assert.deepEqual(sortMunicipios(rows, { column: 'usuarios_ativos', dir: 'asc' }).map((r) => r.key), ['C', 'B', 'A']);
  assert.deepEqual(filterMunicipios(rows, 'c').map((r) => r.key), ['C']);
});
