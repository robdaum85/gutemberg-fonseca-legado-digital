import { escapeHtml, fmtDuration, fmtInt, fmtPct } from '../utils/formatters.js';

export const EMPTY = {
  semGa4: 'Há resultado eleitoral de 2022, mas nenhum dado digital municipal disponível no recorte importado.',
  semGa4Curto: 'Sem dado GA4 disponível no recorte atual.',
  semVoto: 'Não há registro de voto no arquivo histórico para este município.',
  semMapa: 'Município não relacionado ao mapa. Verificar normalização do nome.',
};
const NOTA = 'Presença digital não representa intenção de voto.';

const row = (label, value) => `<div class="metric"><b>${escapeHtml(label)}</b><span>${escapeHtml(value)}</span></div>`;

function tseRows(t) {
  return [
    row('Votos', fmtInt(t.votos)),
    row('% dos votos de Gutemberg', fmtPct(t.pct_total)),
    row('% dos votos válidos locais', fmtPct(t.pct_validos, 3)),
    row('Seções com voto', `${fmtInt(t.secoes_com_voto)} de ${fmtInt(t.secoes_total)} (${fmtPct(t.pct_secoes, 1)})`),
  ].join('');
}

function ga4Rows(g) {
  return [
    row('Usuários ativos', fmtInt(g.usuarios_ativos)),
    row('Sessões engajadas', fmtInt(g.sessoes_engajadas)),
    row('Taxa de engajamento', fmtPct(g.taxa_engajamento)),
    row('Engajamento médio', fmtDuration(g.tempo_medio_engajamento_seg)),
    row('Participação no tráfego brasileiro identificado no dataset importado', fmtPct(g.share_usuarios_br, 1)),
  ].join('');
}

export function renderDetails(el, { municipio, kpis, municipiosComGa4 }) {
  if (!municipio) {
    el.innerHTML = `
      <div class="terr-details-kicker">Estado do Rio de Janeiro</div>
      <h2>Todos os municípios</h2>
      <p class="sub">Clique em um município no mapa, escolha na lista acima ou clique no nome dele no ranking para ver 2022 e 2026 lado a lado.</p>
      <h3 class="terr-period terr-period-2022">2022</h3>
      <div class="metric-list">${row('Votos', fmtInt(kpis.total_votos))}${row('Municípios com voto', `${fmtInt(kpis.municipios_com_voto)} de ${fmtInt(kpis.municipios_rj)}`)}${row('Seções com voto', fmtInt(kpis.secoes_com_voto))}</div>
      <h3 class="terr-period terr-period-2026">2026 — digital</h3>
      <div class="metric-list">${row('Municípios do RJ com dado GA4 importado', fmtInt(municipiosComGa4))}</div>
      <p class="terr-note">${NOTA}</p>`;
    return;
  }
  const { nome, tse, ga4 } = municipio;
  el.innerHTML = `
    <div class="terr-details-kicker">Município selecionado</div>
    <h2>${escapeHtml(nome)}</h2>
    <h3 class="terr-period terr-period-2022">2022</h3>
    ${tse ? `<div class="metric-list">${tseRows(tse)}</div>` : `<p class="terr-empty">${EMPTY.semVoto}</p>`}
    <h3 class="terr-period terr-period-2026">2026 — digital</h3>
    ${ga4 ? `<div class="metric-list">${ga4Rows(ga4)}</div>` : `<p class="terr-empty">${tse ? EMPTY.semGa4 : EMPTY.semGa4Curto}</p>`}
    <p class="terr-note"><strong>Nota.</strong> ${NOTA}</p>`;
}

// Conteúdo do tooltip do mapa, conforme o modo (SPEC §6.1 e §6.2).
export function tooltipHtml(municipio, mode) {
  if (!municipio) return `<div class="terr-tip"><p>${EMPTY.semMapa}</p></div>`;
  const { nome, tse, ga4 } = municipio;
  const parts = [`<strong>${escapeHtml(nome)}</strong>`];
  if (mode !== '2026') {
    parts.push(tse
      ? `<dl><dt>Votos 2022</dt><dd>${fmtInt(tse.votos)}</dd><dt>% dos votos de Gutemberg</dt><dd>${fmtPct(tse.pct_total)}</dd><dt>% dos votos válidos locais</dt><dd>${fmtPct(tse.pct_validos, 3)}</dd><dt>Seções com voto / total</dt><dd>${fmtInt(tse.secoes_com_voto)} / ${fmtInt(tse.secoes_total)}</dd></dl>`
      : `<p>${EMPTY.semVoto}</p>`);
  }
  if (mode !== '2022') {
    parts.push(ga4
      ? `<dl><dt>Usuários ativos 2026</dt><dd>${fmtInt(ga4.usuarios_ativos)}</dd><dt>Sessões engajadas</dt><dd>${fmtInt(ga4.sessoes_engajadas)}</dd><dt>Taxa de engajamento</dt><dd>${fmtPct(ga4.taxa_engajamento)}</dd><dt>Engajamento médio</dt><dd>${fmtDuration(ga4.tempo_medio_engajamento_seg)}</dd><dt>Eventos</dt><dd>${fmtInt(ga4.eventos)}</dd></dl>`
      : `<p>${EMPTY.semGa4Curto}</p>`);
  }
  parts.push('<small>Clique para ver o comparativo completo.</small>');
  return `<div class="terr-tip">${parts.join('')}</div>`;
}
