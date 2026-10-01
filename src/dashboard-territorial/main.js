// Mapa territorial: 2022 (TSE) × presença digital 2026 (GA4). Painel descritivo — sem previsão,
// sem score e sem priorização de municípios (SPEC §0, §22).
import './territorial.css';
import { loadGeojson, loadLocais, loadSecoes, loadTerritorial } from './data/loaders.js';
import { buildClasses, classColor, DEFAULT_METRIC, METRICS, metricIdsFor, RAMPS } from './metrics.js';
import { renderLegend } from './components/mapLegend.js';
import { EMPTY, renderDetails, tooltipHtml } from './components/municipalityDetails.js';
import { renderRanking } from './components/municipalityRanking.js';
import { renderZones } from './components/zoneRanking.js';
import { renderLocais } from './components/votingLocationsTable.js';
import { renderSecoes } from './components/sectionsTable.js';
import { renderTrafficQuality } from './components/trafficQuality.js';
import { escapeHtml, fmtInt, fmtPct } from './utils/formatters.js';
import { TRAFFIC_CATEGORY } from './utils/ga4.js';

const $ = (id) => document.getElementById(id);
const DEFAULT_MUNICIPIO = 'RIO DE JANEIRO';

const state = {
  mode: '2022',
  metric: 'votos',
  municipio: DEFAULT_MUNICIPIO,
  zona: null,
  localIdx: null,
  sort: { column: 'votos', dir: 'desc' },
  rankingQuery: '',
  locaisQuery: '',
  locaisPage: 0,
  secoesPage: 0,
  zonasExpanded: false,
};

let ctx = null; // dados carregados + mapa
let initPromise = null;
let lastMapKey = '';

// ---------------------------------------------------------------- render
function renderKpis(kpis) {
  const card = (accent, label, value, hint) => `<div class="card kpi ${accent}"><div class="label">${label}</div><div class="value">${value}</div><div class="hint">${hint}</div></div>`;
  $('terr-kpis').innerHTML = [
    card('accent', 'Votos em 2022', fmtInt(kpis.total_votos), 'Deputado federal · total histórico'),
    card('accent-cyan', 'Municípios com voto', fmtInt(kpis.municipios_com_voto), `de ${fmtInt(kpis.municipios_rj)} municípios do RJ`),
    card('accent-green', 'Seções com voto', fmtInt(kpis.secoes_com_voto), `em ${fmtInt(kpis.locais)} locais e ${fmtInt(kpis.zonas)} zonas`),
    card('accent-purple', 'Na capital', fmtPct(kpis.capital_pct, 1), `${fmtInt(kpis.capital_votos)} votos no Rio de Janeiro`),
    card('accent-amber', 'Nos 3 maiores municípios', fmtPct(kpis.top3_share), 'Rio, Duque de Caxias e Magé'),
  ].join('');
}

function fillMetricSelect() {
  const select = $('terr-metric');
  const option = (id) => `<option value="${id}"${id === state.metric ? ' selected' : ''}>${escapeHtml(METRICS[id].label)}</option>`;
  const ids = metricIdsFor(state.mode);
  select.innerHTML = state.mode === 'comparacao'
    ? ['2022', '2026'].map((p) => `<optgroup label="${p === '2022' ? 'Eleição 2022' : 'Digital 2026'}">${ids.filter((id) => METRICS[id].period === p).map(option).join('')}</optgroup>`).join('')
    : ids.map(option).join('');
}

function syncControls() {
  $('terr-municipio').value = state.municipio;
  $('terr-metric').value = state.metric;
  document.querySelectorAll('.terr-modes button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)));
}

function renderMap() {
  const metric = METRICS[state.metric];
  const key = `${state.metric}|${state.mode}|${state.municipio}`;
  const { classes, classify } = buildClasses(ctx.municipios.map((m) => metric.get(m)));
  const ramp = RAMPS[metric.period];
  const styleByKey = new Map(ctx.municipios.map((m) => {
    const cls = classify(metric.get(m));
    return [m.key, { cls, color: cls < 0 ? null : classColor(cls, classes.length, ramp) }];
  }));
  const noDataLabel = metric.period === '2026' ? 'Sem dado GA4 no recorte importado' : 'Sem registro de voto em 2022';
  renderLegend($('terr-legend'), { metric, classes, noDataLabel });

  const comGa4 = ctx.municipios.filter((m) => m.ga4).length;
  $('terr-map-title').textContent = state.mode === 'comparacao' ? `Comparação · ${metric.label}` : metric.label;
  $('terr-map-sub').textContent = metric.period === '2026'
    ? `Somente municípios do RJ presentes no GA4 (${comGa4} de ${ctx.municipios.length}). Cidades do exterior e (not set) não entram no mapa. Os demais aparecem hachurados como “sem dado”, não como zero.`
    : `Resultado de Gutemberg (2255) para deputado federal em 2022, por município. Clique em um município para ver 2022 e 2026 lado a lado.`;

  if (!ctx.map || key === lastMapKey) return;
  lastMapKey = key;
  ctx.map.update({
    styleByKey,
    selectedKey: state.municipio || null,
    tooltip: (k) => tooltipHtml(ctx.byKey.get(k), state.mode),
  });
}

function renderSecoesIfOpen() {
  const details = $('terr-secoes-details');
  if (!details.open) return;
  const target = $('terr-secoes');
  if (!ctx.secoes) {
    target.innerHTML = '<p class="terr-loading">Carregando seções…</p>';
    loadSecoes()
      .then((secoes) => { ctx.secoes = secoes; renderSecoesIfOpen(); })
      .catch((error) => { target.innerHTML = `<p class="terr-error">Não foi possível carregar as seções: ${escapeHtml(error.message)} <button type="button" class="terr-linkbtn" data-retry-secoes>Tentar de novo</button></p>`; });
    return;
  }
  renderSecoes(target, $('terr-secoes-sub'), {
    secoes: ctx.secoes,
    nomeByKey: ctx.nomeByKey,
    municipioKey: state.municipio || null,
    zona: state.zona,
    localIdx: state.localIdx,
    localNome: state.localIdx !== null ? ctx.locais[state.localIdx].nome : null,
    page: state.secoesPage,
  });
}

function render() {
  syncControls();
  renderMap();
  renderDetails($('terr-details'), {
    municipio: state.municipio ? ctx.byKey.get(state.municipio) : null,
    kpis: ctx.data.kpis,
    municipiosComGa4: ctx.municipios.filter((m) => m.ga4).length,
  });
  renderRanking($('terr-ranking-table'), { municipios: ctx.municipios, sort: state.sort, query: state.rankingQuery, selectedKey: state.municipio });
  renderZones($('terr-zonas'), $('terr-zonas-sub'), { zonas: ctx.zonas, nomeByKey: ctx.nomeByKey, municipioKey: state.municipio || null, zona: state.zona, expanded: state.zonasExpanded });
  renderLocais($('terr-locais'), $('terr-locais-sub'), {
    locais: ctx.locais, nomeByKey: ctx.nomeByKey, municipioKey: state.municipio || null, zona: state.zona, localIdx: state.localIdx, query: state.locaisQuery, page: state.locaisPage,
  });
  renderSecoesIfOpen();
}

function setState(patch) {
  Object.assign(state, patch);
  render();
}

function selectMunicipio(key, { focusMap = false } = {}) {
  setState({ municipio: key, zona: null, localIdx: null, locaisPage: 0, secoesPage: 0, zonasExpanded: false });
  if (focusMap) ctx.map?.focus(key || null);
}

function renderStatic() {
  const { data } = ctx;
  renderKpis(data.kpis);

  $('terr-municipio').innerHTML = `<option value="">Todos os municípios</option>${[...ctx.municipios]
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    .map((m) => `<option value="${escapeHtml(m.key)}">${escapeHtml(m.nome)}${m.tse ? '' : ' (sem voto em 2022)'}</option>`).join('')}`;
  $('terr-municipio').disabled = false;
  $('terr-metric').disabled = false;
  fillMetricSelect();

  const top = ctx.municipios.filter((m) => m.tse).sort((a, b) => b.tse.votos - a.tse.votos).slice(0, 10);
  $('terr-top10').innerHTML = top.map((m) => `<button type="button" class="bar-row terr-bar" data-select="${escapeHtml(m.key)}" aria-label="${escapeHtml(m.nome)}: ${fmtInt(m.tse.votos)} votos">
      <span class="bar-label">${escapeHtml(m.nome)}</span><span class="track"><span class="fill" style="width:${((m.tse.votos / top[0].tse.votos) * 100).toFixed(1)}%"></span></span><span class="bar-value">${fmtInt(m.tse.votos)}</span></button>`).join('');

  const br = data.ga4.cidades.filter((c) => c.categoria === TRAFFIC_CATEGORY.BRASIL_RJ || c.categoria === TRAFFIC_CATEGORY.BRASIL_FORA_RJ).sort((a, b) => (b.usuarios_ativos ?? -1) - (a.usuarios_ativos ?? -1));
  const maxBr = Math.max(...br.map((c) => c.usuarios_ativos ?? 0), 1);
  $('terr-ga4-br').innerHTML = br.length
    ? `${br.map((c) => {
      const noRj = c.categoria === TRAFFIC_CATEGORY.BRASIL_RJ;
      return `<div class="bar-row"><div class="bar-label">${escapeHtml(c.cidade)} <span class="pill ${noRj ? 'ok' : ''}">${noRj ? 'no mapa' : 'fora do RJ'}</span></div><div class="track"><div class="fill terr-fill-2026" style="width:${(((c.usuarios_ativos ?? 0) / maxBr) * 100).toFixed(1)}%"></div></div><div class="bar-value">${fmtInt(c.usuarios_ativos)}</div></div>`;
    }).join('')}<p class="note">Participação de cada cidade calculada sobre ${fmtInt(data.ga4.total_usuarios_brasil_importado)} usuários das cidades brasileiras importadas (não sobre o total do site). Municípios que não aparecem no relatório ficam como “sem dado”, não como zero.</p>`
    : '<p class="terr-empty">Nenhuma cidade brasileira no recorte importado.</p>';

  $('terr-sources').innerHTML = `Fontes: ${escapeHtml(data.meta.fontes.tse)}. ${escapeHtml(data.meta.fontes.ga4)}. Limites: ${escapeHtml(data.meta.fontes.geo)}. Dados processados em ${escapeHtml(data.meta.gerado_em.split('-').reverse().join('/'))}. Métricas digitais e eleitorais não são combinadas em nenhum índice.`;
}

// Confere invariantes no navegador; inconsistência é exibida, nunca mascarada (SPEC §23).
function runtimeChecks() {
  const problems = [];
  const soma = ctx.municipios.reduce((acc, m) => acc + (m.tse?.votos ?? 0), 0);
  if (soma !== ctx.data.kpis.total_votos) problems.push(`Soma municipal ${fmtInt(soma)} ≠ total ${fmtInt(ctx.data.kpis.total_votos)}.`);
  const semPoligono = ctx.municipios.filter((m) => !ctx.geoKeys.has(m.key));
  if (semPoligono.length) problems.push(`${EMPTY.semMapa} (${semPoligono.map((m) => m.nome).join(', ')})`);
  if (import.meta.env.DEV) console.info('[territorial] QA do build', ctx.data.qa, problems.length ? problems : 'sem inconsistências no navegador');
  return problems;
}

// ---------------------------------------------------------------- init
async function init() {
  const status = $('terr-status');
  status.className = 'terr-status';
  status.textContent = 'Carregando dados territoriais…';
  const [data, geojson, locais] = await Promise.all([loadTerritorial(), loadGeojson(), loadLocais()]);
  const zonas = data.zonas.map(([key, zona, votos]) => ({ key, zona, votos }));
  ctx = {
    data,
    geojson,
    locais,
    zonas,
    secoes: null,
    map: null,
    municipios: data.municipios,
    byKey: new Map(data.municipios.map((m) => [m.key, m])),
    nomeByKey: new Map(data.municipios.map((m) => [m.key, m.nome])),
    geoKeys: new Set(geojson.features.map((f) => f.properties.key)),
  };
  renderStatic();
  const problems = runtimeChecks();

  try {
    const { createTerritorialMap } = await import('./components/territorialMap.js');
    ctx.map = createTerritorialMap({ container: $('terr-map'), geojson, onSelect: (key) => selectMunicipio(key) });
  } catch (error) {
    console.error('[territorial] mapa indisponível', error);
    $('terr-map').innerHTML = '<p class="terr-error">O mapa não pôde ser exibido neste navegador (WebGL indisponível). Todos os valores continuam disponíveis na tabela “Ranking municipal”.</p>';
  }
  render();

  if (problems.length) {
    status.className = 'terr-status terr-error';
    status.textContent = `Atenção: ${problems.join(' ')}`;
  } else {
    status.textContent = '';
  }
}

function ensureInit() {
  initPromise ??= init().catch((error) => {
    initPromise = null;
    const status = $('terr-status');
    status.className = 'terr-status terr-error';
    status.innerHTML = `Não foi possível carregar o mapa territorial: ${escapeHtml(error.message)} <button type="button" class="terr-linkbtn" id="terr-retry">Tentar de novo</button>`;
    $('terr-retry')?.addEventListener('click', ensureInit);
    throw error;
  });
  return initPromise;
}

async function ensureQuality() {
  const el = $('terr-quality');
  if (!el || el.dataset.ready) return;
  try {
    renderTrafficQuality(el, { ga4: (await loadTerritorial()).ga4 });
    el.dataset.ready = '1';
  } catch (error) {
    el.innerHTML = `<h2>Qualidade do tráfego</h2><p class="terr-error">Não foi possível carregar os dados: ${escapeHtml(error.message)}</p>`;
  }
}

// ---------------------------------------------------------------- eventos
function bindEvents() {
  $('terr-municipio').addEventListener('change', (e) => selectMunicipio(e.target.value, { focusMap: true }));
  $('terr-metric').addEventListener('change', (e) => setState({ metric: e.target.value }));
  document.querySelectorAll('.terr-modes button').forEach((btn) => btn.addEventListener('click', () => {
    if (!ctx) return;
    const mode = btn.dataset.mode;
    state.mode = mode;
    if (mode !== 'comparacao') state.metric = DEFAULT_METRIC[mode];
    fillMetricSelect();
    render();
  }));

  $('terr-ranking-search').addEventListener('input', (e) => ctx && setState({ rankingQuery: e.target.value }));
  $('terr-ranking-table').addEventListener('click', (e) => {
    const sortBtn = e.target.closest('[data-sort]');
    if (sortBtn) {
      const column = sortBtn.dataset.sort;
      const dir = state.sort.column === column ? (state.sort.dir === 'asc' ? 'desc' : 'asc') : (column === 'nome' ? 'asc' : 'desc');
      setState({ sort: { column, dir } });
      $('terr-ranking-table').querySelector(`[data-sort="${column}"]`)?.focus();
      return;
    }
    const selectBtn = e.target.closest('[data-select]');
    if (selectBtn) {
      selectMunicipio(selectBtn.dataset.select, { focusMap: true });
      $('terr-details').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });
  $('terr-top10').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-select]');
    if (btn) selectMunicipio(btn.dataset.select, { focusMap: true });
  });

  $('terr-zonas').addEventListener('click', (e) => {
    const expand = e.target.closest('[data-zonas-expand]');
    if (expand) { setState({ zonasExpanded: expand.dataset.zonasExpand === 'true' }); return; }
    const bar = e.target.closest('[data-zona]');
    if (!bar) return;
    const zona = Number(bar.dataset.zona);
    const same = state.zona === zona && state.municipio === bar.dataset.key;
    setState({ municipio: bar.dataset.key, zona: same ? null : zona, localIdx: null, locaisPage: 0, secoesPage: 0 });
  });

  $('terr-locais-search').addEventListener('input', (e) => ctx && setState({ locaisQuery: e.target.value, locaisPage: 0 }));
  const locaisArea = $('terr-locais').parentElement;
  locaisArea.addEventListener('click', (e) => {
    if (e.target.closest('[data-clear-zona]')) { setState({ zona: null, localIdx: null, locaisPage: 0, secoesPage: 0 }); return; }
    const page = e.target.closest('#terr-locais [data-page]');
    if (page) { setState({ locaisPage: Number(page.dataset.page) }); return; }
    const local = e.target.closest('[data-local]');
    if (local) {
      const idx = Number(local.dataset.local);
      const details = $('terr-secoes-details');
      setState({ localIdx: idx, zona: ctx.locais[idx].zona, municipio: ctx.locais[idx].key, secoesPage: 0 });
      if (!details.open) details.open = true; // dispara o toggle e carrega as seções
      details.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  });

  const secoesDetails = $('terr-secoes-details');
  secoesDetails.addEventListener('toggle', () => ctx && renderSecoesIfOpen());
  secoesDetails.addEventListener('click', (e) => {
    if (e.target.closest('[data-clear-local]')) { e.preventDefault(); setState({ localIdx: null, secoesPage: 0 }); return; }
    if (e.target.closest('[data-retry-secoes]')) { renderSecoesIfOpen(); return; }
    const page = e.target.closest('#terr-secoes [data-page]');
    if (page) setState({ secoesPage: Number(page.dataset.page) });
  });
}

// ---------------------------------------------------------------- impressão
function snapshotMapForPrint() {
  const img = $('terr-map-print');
  const container = $('terr-map');
  if (!ctx?.map || !container.clientWidth) return;
  try {
    img.src = ctx.map.snapshot();
    img.hidden = false;
  } catch (error) {
    console.warn('[territorial] não foi possível capturar o mapa para impressão', error);
  }
}

async function prepareForPrint() {
  await Promise.all([ensureInit(), ensureQuality()]);
  if (!ctx.map) return;
  const section = $('territorial');
  const offscreen = !$('terr-map').clientWidth;
  if (offscreen) section.classList.add('terr-print-prep'); // renderiza fora da tela, sem trocar de aba
  ctx.map.resize();
  await ctx.map.whenIdle();
  snapshotMapForPrint();
  if (offscreen) section.classList.remove('terr-print-prep');
}

window.addEventListener('beforeprint', snapshotMapForPrint);
window.territorialDashboard = { prepareForPrint };

document.addEventListener('dashboard:tabchange', (e) => {
  if (e.detail.tab === 'territorial') ensureInit().then(() => ctx.map?.resize()).catch(() => {});
  if (e.detail.tab === 'publico') ensureQuality();
});
bindEvents();
if ($('territorial')?.classList.contains('active')) ensureInit().catch(() => {});
if ($('publico')?.classList.contains('active')) ensureQuality();
