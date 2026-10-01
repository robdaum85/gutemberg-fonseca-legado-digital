// Camada única de parsing + QA do Mapa territorial (SPEC §2, §3, §20, §23).
// Lê os CSVs do TSE (docs/eleicao-2022, fora do git), o GA4 por cidade/país (data/territorial)
// e o GeoJSON do IBGE; valida totais e joins; grava JSON compactos em public/data/territorial.
// Qualquer inconsistência interrompe o build: os números nunca são “ajustados” para bater.
// Uso: node scripts/territorial/build-territorial-data.mjs
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { csvToObjects } from '../../src/dashboard-territorial/utils/csv.js';
import { normalizeMunicipio, matchByMunicipio } from '../../src/dashboard-territorial/utils/normalizeMunicipio.js';
import { parseInteger, parsePtBrNumber } from '../../src/dashboard-territorial/utils/parsePtBrNumber.js';
import { parseGa4CityRow, shareUsuariosBrasil, TRAFFIC_CATEGORY } from '../../src/dashboard-territorial/utils/ga4.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const TSE_DIR = path.join(ROOT, 'docs/eleicao-2022');
const GA4_DIR = path.join(ROOT, 'data/territorial');
const OUT_DIR = path.join(ROOT, 'public/data/territorial');

const EXPECTED = Object.freeze({
  totalVotos: 19288,
  municipios: 89,
  zonas: 180,
  locais: 3063,
  secoes: 9954,
  filtrosSecao: {
    ANO_ELEICAO: '2022',
    SG_UF: 'RJ',
    DS_CARGO: 'Deputado Federal',
    NR_VOTAVEL: '2255',
    NM_VOTAVEL: 'GUTEMBERG DE PAULA FONSECA',
  },
});

const errors = [];
const check = (ok, message) => { if (!ok) errors.push(message); return ok; };
const sum = (rows, field) => rows.reduce((acc, r) => acc + r[field], 0);
const read = (dir, file) => readFile(path.join(dir, file), 'utf8');
const groupSum = (rows, keyFn, field) => rows.reduce((map, r) => map.set(keyFn(r), (map.get(keyFn(r)) ?? 0) + r[field]), new Map());

// ---------- GeoJSON (IBGE) ----------
const geojson = JSON.parse(await read(OUT_DIR, 'rj_municipios.geojson'));
const geoByKey = new Map(geojson.features.map((f) => [f.properties.key, f.properties]));
const rjKeys = new Set(geoByKey.keys());

// ---------- Município ----------
const municipiosRaw = csvToObjects(await read(TSE_DIR, 'gutemberg_por_municipio.csv'), {
  source: 'gutemberg_por_municipio.csv',
  required: ['municipio', 'votos', 'pct_do_total_gutemberg', 'votos_validos_dep_federal', 'pct_dos_validos_no_municipio', 'secoes_com_voto', 'secoes_total'],
});
const municipios = municipiosRaw.map((r) => {
  const f = (name) => `${r.municipio}.${name}`;
  return {
    key: normalizeMunicipio(r.municipio),
    votos: parseInteger(r.votos, { field: f('votos') }),
    pct_total: parsePtBrNumber(r.pct_do_total_gutemberg, { field: f('pct_do_total_gutemberg') }),
    votos_validos: parseInteger(r.votos_validos_dep_federal, { field: f('votos_validos_dep_federal') }),
    pct_validos: parsePtBrNumber(r.pct_dos_validos_no_municipio, { field: f('pct_dos_validos_no_municipio') }),
    secoes_com_voto: parseInteger(r.secoes_com_voto, { field: f('secoes_com_voto') }),
    secoes_total: parseInteger(r.secoes_total, { field: f('secoes_total') }),
  };
});
check(municipios.length === EXPECTED.municipios, `município: ${municipios.length} linhas (esperado ${EXPECTED.municipios})`);
check(sum(municipios, 'votos') === EXPECTED.totalVotos, `município: soma ${sum(municipios, 'votos')} (esperado ${EXPECTED.totalVotos})`);
check(new Set(municipios.map((m) => m.key)).size === municipios.length, 'município: nomes duplicados após normalização');
for (const m of municipios) {
  check(m.secoes_com_voto <= m.secoes_total, `município ${m.key}: secoes_com_voto > secoes_total`);
  check([m.pct_total, m.pct_validos].every(Number.isFinite), `município ${m.key}: percentual não numérico`);
}
const votosPorMunicipio = new Map(municipios.map((m) => [m.key, m.votos]));

// ---------- Zona ----------
const zonas = csvToObjects(await read(TSE_DIR, 'gutemberg_por_zona.csv'), { source: 'gutemberg_por_zona.csv', required: ['municipio', 'zona', 'votos'] })
  .map((r) => ({ key: normalizeMunicipio(r.municipio), zona: parseInteger(r.zona, { field: 'zona' }), votos: parseInteger(r.votos, { field: 'votos' }) }));
check(zonas.length === EXPECTED.zonas, `zona: ${zonas.length} linhas (esperado ${EXPECTED.zonas})`);
check(sum(zonas, 'votos') === EXPECTED.totalVotos, `zona: soma ${sum(zonas, 'votos')} (esperado ${EXPECTED.totalVotos})`);
for (const [key, votos] of groupSum(zonas, (z) => z.key, 'votos')) {
  check(votosPorMunicipio.get(key) === votos, `zona: soma de ${key} = ${votos}, município = ${votosPorMunicipio.get(key)}`);
}
const votosPorZona = new Map(zonas.map((z) => [`${z.key}|${z.zona}`, z.votos]));

// ---------- Local de votação ----------
const locais = csvToObjects(await read(TSE_DIR, 'gutemberg_por_local_votacao.csv'), { source: 'gutemberg_por_local_votacao.csv', required: ['municipio', 'zona', 'local_votacao', 'endereco', 'votos'] })
  .map((r) => ({ key: normalizeMunicipio(r.municipio), zona: parseInteger(r.zona, { field: 'zona' }), nome: r.local_votacao, endereco: r.endereco, votos: parseInteger(r.votos, { field: 'votos' }) }));
check(locais.length === EXPECTED.locais, `local: ${locais.length} linhas (esperado ${EXPECTED.locais})`);
check(sum(locais, 'votos') === EXPECTED.totalVotos, `local: soma ${sum(locais, 'votos')} (esperado ${EXPECTED.totalVotos})`);
for (const [zk, votos] of groupSum(locais, (l) => `${l.key}|${l.zona}`, 'votos')) {
  check(votosPorZona.get(zk) === votos, `local: soma da zona ${zk} = ${votos}, zona = ${votosPorZona.get(zk)}`);
}
const localId = (key, zona, nome, endereco) => `${key}|${zona}|${nome}|${endereco}`;
const localIndex = new Map(locais.map((l, i) => [localId(l.key, l.zona, l.nome, l.endereco), i]));
check(localIndex.size === locais.length, 'local: (município, zona, local, endereço) duplicado');

// ---------- Seção ----------
const secoesRaw = csvToObjects(await read(TSE_DIR, 'votacao_secao_2022_gutemberg_fonseca.csv'), {
  source: 'votacao_secao_2022_gutemberg_fonseca.csv',
  required: ['ANO_ELEICAO', 'SG_UF', 'NM_MUNICIPIO', 'NR_ZONA', 'NR_SECAO', 'DS_CARGO', 'NR_VOTAVEL', 'NM_VOTAVEL', 'QT_VOTOS', 'NM_LOCAL_VOTACAO', 'DS_LOCAL_VOTACAO_ENDERECO'],
});
check(secoesRaw.length === EXPECTED.secoes, `seção: ${secoesRaw.length} linhas (esperado ${EXPECTED.secoes})`);
for (const [field, expected] of Object.entries(EXPECTED.filtrosSecao)) {
  const bad = secoesRaw.filter((r) => r[field] !== expected).length;
  check(bad === 0, `seção: ${bad} linhas com ${field} diferente de "${expected}"`);
}
const secoes = [];
const semLocal = [];
for (const r of secoesRaw) {
  const key = normalizeMunicipio(r.NM_MUNICIPIO);
  const zona = parseInteger(r.NR_ZONA, { field: 'NR_ZONA' });
  const votos = parseInteger(r.QT_VOTOS, { field: 'QT_VOTOS' });
  check(votos > 0, `seção ${key}/${zona}/${r.NR_SECAO}: QT_VOTOS = ${votos}`);
  const local = localIndex.get(localId(key, zona, r.NM_LOCAL_VOTACAO, r.DS_LOCAL_VOTACAO_ENDERECO));
  if (local === undefined) semLocal.push(`${key}/${zona}/${r.NR_SECAO}`);
  secoes.push({ key, zona, secao: parseInteger(r.NR_SECAO, { field: 'NR_SECAO' }), local, votos });
}
check(semLocal.length === 0, `seção: ${semLocal.length} seções sem local correspondente (ex.: ${semLocal.slice(0, 3).join(', ')})`);
check(sum(secoes, 'votos') === EXPECTED.totalVotos, `seção: soma ${sum(secoes, 'votos')} (esperado ${EXPECTED.totalVotos})`);
check(new Set(secoes.map((s) => `${s.key}|${s.zona}|${s.secao}`)).size === secoes.length, 'seção: (município, zona, seção) duplicado');
for (const [i, votos] of groupSum(secoes, (s) => s.local, 'votos')) {
  if (i !== undefined) check(locais[i].votos === votos, `seção: soma do local ${locais[i].nome} = ${votos}, local = ${locais[i].votos}`);
}
const secoesPorMunicipio = secoes.reduce((map, s) => map.set(s.key, (map.get(s.key) ?? 0) + 1), new Map());
for (const m of municipios) {
  check(secoesPorMunicipio.get(m.key) === m.secoes_com_voto, `seção: ${m.key} tem ${secoesPorMunicipio.get(m.key)} seções no arquivo, agregado diz ${m.secoes_com_voto}`);
}

// ---------- Join GeoJSON ----------
const join = matchByMunicipio(municipiosRaw.map((r) => r.municipio), geojson.features.map((f) => f.properties.name));
check(join.unmatchedLeft.length === 0, `GeoJSON: municípios do CSV sem polígono: ${join.unmatchedLeft.join(', ')}`);

// ---------- GA4 ----------
const ga4Cidades = csvToObjects(await read(GA4_DIR, 'ga4_cidades_2026.csv'), {
  delimiter: ',', source: 'ga4_cidades_2026.csv', required: ['cidade', 'pais', 'usuarios_ativos', 'sessoes_engajadas', 'taxa_engajamento', 'tempo_medio_engajamento_seg', 'eventos'],
}).map((r) => parseGa4CityRow(r, rjKeys));
for (const c of ga4Cidades) {
  check(c.taxa_engajamento === null || (c.taxa_engajamento >= 0 && c.taxa_engajamento <= 100), `GA4 ${c.cidade}: taxa_engajamento fora de 0–100 (use pontos percentuais)`);
}
check(new Set(ga4Cidades.filter((c) => c.categoria === TRAFFIC_CATEGORY.BRASIL_RJ).map((c) => c.key)).size
  === ga4Cidades.filter((c) => c.categoria === TRAFFIC_CATEGORY.BRASIL_RJ).length, 'GA4: cidade do RJ repetida');
const ga4Paises = csvToObjects(await read(GA4_DIR, 'ga4_paises_2026.csv'), { delimiter: ',', source: 'ga4_paises_2026.csv', required: ['pais', 'pais_pt', 'usuarios_ativos'] })
  .map((r) => ({ pais: r.pais, pais_pt: r.pais_pt, usuarios_ativos: parseInteger(r.usuarios_ativos, { field: `${r.pais}.usuarios_ativos` }) }));

if (errors.length) {
  console.error(`\n✖ ${errors.length} inconsistência(s) — nada foi gravado:\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}

// ---------- Saída ----------
const ga4ByKey = new Map(ga4Cidades.filter((c) => c.categoria === TRAFFIC_CATEGORY.BRASIL_RJ).map((c) => [c.key, c]));
const brShare = shareUsuariosBrasil(ga4Cidades);
const tseByKey = new Map(municipios.map((m) => [m.key, m]));
const round = (n, d = 2) => (n === null ? null : Math.round(n * 10 ** d) / 10 ** d);
const pickGa4 = (c) => c && ({
  usuarios_ativos: c.usuarios_ativos,
  novos_usuarios: c.novos_usuarios,
  sessoes_engajadas: c.sessoes_engajadas,
  taxa_engajamento: c.taxa_engajamento,
  tempo_medio_engajamento_seg: c.tempo_medio_engajamento_seg,
  eventos: c.eventos,
  share_usuarios_br: round(brShare.share(c)),
});

const municipiosOut = [...geoByKey.values()].map((g) => {
  const t = tseByKey.get(g.key);
  return {
    key: g.key,
    nome: g.name,
    codigo_ibge: g.codigo_ibge,
    tse: t ? {
      votos: t.votos,
      pct_total: t.pct_total,
      pct_validos: t.pct_validos,
      votos_validos: t.votos_validos,
      secoes_com_voto: t.secoes_com_voto,
      secoes_total: t.secoes_total,
      pct_secoes: round((t.secoes_com_voto / t.secoes_total) * 100),
    } : null,
    ga4: pickGa4(ga4ByKey.get(g.key)) ?? null,
  };
});

const ranked = [...municipios].sort((a, b) => b.votos - a.votos);
const capital = tseByKey.get('RIO DE JANEIRO');
const territorial = {
  meta: {
    gerado_em: new Date().toISOString().slice(0, 10),
    fontes: {
      tse: 'TSE — votação por seção, Eleições Gerais 2022, 1º turno, Deputado Federal, candidato 2255',
      ga4: 'Google Analytics 4 — relatório de cidades/países, setembro/2026 (print importado)',
      geo: geojson.metadata?.fonte ?? 'IBGE',
    },
  },
  kpis: {
    total_votos: EXPECTED.totalVotos,
    municipios_com_voto: municipios.length,
    municipios_rj: geojson.features.length,
    secoes_com_voto: secoes.length,
    zonas: zonas.length,
    locais: locais.length,
    capital_votos: capital.votos,
    capital_pct: round((capital.votos / EXPECTED.totalVotos) * 100),
    top3_share: round((ranked.slice(0, 3).reduce((a, m) => a + m.votos, 0) / EXPECTED.totalVotos) * 100),
  },
  municipios: municipiosOut,
  zonas: zonas.map((z) => [z.key, z.zona, z.votos]),
  ga4: {
    total_usuarios_brasil_importado: brShare.total,
    cidades: ga4Cidades.map(({ cidade, pais, categoria, usuarios_ativos, sessoes_engajadas, taxa_engajamento, tempo_medio_engajamento_seg }) => ({
      cidade, pais, categoria, usuarios_ativos, sessoes_engajadas, taxa_engajamento, tempo_medio_engajamento_seg,
    })),
    paises: ga4Paises,
  },
  qa: {
    total_votos: { municipio: sum(municipios, 'votos'), zona: sum(zonas, 'votos'), local: sum(locais, 'votos'), secao: sum(secoes, 'votos') },
    linhas: { municipio: municipios.length, zona: zonas.length, local: locais.length, secao: secoes.length },
    geojson: { matched: join.matched.length, unmatched_csv: join.unmatchedLeft, unmatched_geojson: join.unmatchedRight },
    ga4_por_categoria: Object.fromEntries(Object.values(TRAFFIC_CATEGORY).map((c) => [c, ga4Cidades.filter((r) => r.categoria === c).map((r) => r.cidade)])),
  },
};

// Locais e seções em arrays posicionais (carregados sob demanda pelo navegador).
const munKeys = [...geoByKey.keys()];
const munIdx = new Map(munKeys.map((k, i) => [k, i]));
const locaisOut = { municipios: munKeys, colunas: ['municipio_idx', 'zona', 'local', 'endereco', 'votos'], rows: locais.map((l) => [munIdx.get(l.key), l.zona, l.nome, l.endereco, l.votos]) };
const secoesOut = { colunas: ['local_idx', 'secao', 'votos'], rows: secoes.map((s) => [s.local, s.secao, s.votos]) };

await writeFile(path.join(OUT_DIR, 'territorial.json'), JSON.stringify(territorial));
await writeFile(path.join(OUT_DIR, 'locais.json'), JSON.stringify(locaisOut));
await writeFile(path.join(OUT_DIR, 'secoes.json'), JSON.stringify(secoesOut));

console.log('✔ Validações OK');
console.table({
  'Total de votos': territorial.qa.total_votos,
  Linhas: territorial.qa.linhas,
});
console.log(`GeoJSON: ${join.matched.length} relacionados · sem polígono: ${join.unmatchedLeft.length} · sem voto 2022: ${join.unmatchedRight.join(', ') || '—'}`);
console.log('GA4 por categoria:', territorial.qa.ga4_por_categoria);
