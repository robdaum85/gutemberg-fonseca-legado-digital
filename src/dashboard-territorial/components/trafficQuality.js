import { TRAFFIC_CATEGORY } from '../utils/ga4.js';
import { escapeHtml, fmtInt, fmtPct } from '../utils/formatters.js';

// Totais do mês já publicados nas outras abas deste painel (GA4 e Clarity, 01–30/09/26).
const TOTAIS = { ga4UsuariosAtivos: 1282, clarityUsuariosUnicos: 795, claritySessoes: 1263 };

const metric = (label, value, hint = '') => `<div class="metric"><b>${escapeHtml(label)}${hint ? `<small class="terr-cell-sub">${escapeHtml(hint)}</small>` : ''}</b><span>${escapeHtml(value)}</span></div>`;

export function renderTrafficQuality(el, { ga4 }) {
  const brasil = ga4.paises.find((p) => p.pais === 'Brazil')?.usuarios_ativos ?? null;
  const exteriorListado = ga4.paises.filter((p) => p.pais !== 'Brazil').reduce((acc, p) => acc + p.usuarios_ativos, 0);
  const naoDetalhado = brasil === null ? null : TOTAIS.ga4UsuariosAtivos - brasil - exteriorListado;
  const pct = (n) => (n === null ? null : (n / TOTAIS.ga4UsuariosAtivos) * 100);
  const byCat = (cat) => ga4.cidades.filter((c) => c.categoria === cat);
  const valor = (c) => (c.usuarios_ativos === null ? 'valor não importado' : `${fmtInt(c.usuarios_ativos)} usuários`);
  const cidadesTxt = (list) => (list.length ? list.map((c) => `${escapeHtml(c.cidade)} (${valor(c)})`).join(', ') : '—');
  const bots = byCat(TRAFFIC_CATEGORY.BOT_IDENTIFICADO);

  const categorias = [
    { nome: 'Brasil — RJ', trat: 'Entra na análise territorial (mapa).', cidades: byCat(TRAFFIC_CATEGORY.BRASIL_RJ), pill: 'ok' },
    { nome: 'Brasil — fora do RJ', trat: 'Conta como Brasil, mas fica fora do mapa do RJ.', cidades: byCat(TRAFFIC_CATEGORY.BRASIL_FORA_RJ), pill: '' },
    { nome: 'Exterior', trat: 'Excluído do comparativo territorial.', cidades: byCat(TRAFFIC_CATEGORY.EXTERIOR), pill: 'warn' },
    { nome: '(not set)', trat: 'Excluído por localização não resolvida.', cidades: byCat(TRAFFIC_CATEGORY.NOT_SET), pill: 'warn' },
    { nome: 'Bot identificado', trat: 'Somente com evidência da própria ferramenta.', cidades: bots, pill: 'bad' },
  ];

  el.innerHTML = `
    <h2>Qualidade do tráfego</h2>
    <div class="sub">Google Analytics e Clarity · setembro/2026. Bloco separado do mapa eleitoral: aqui ficam o tráfego externo e o tráfego sem localização útil.</div>
    <div class="grid two" style="margin-top:14px">
      <div class="metric-list">
        ${metric('Usuários no Brasil', `${fmtInt(brasil)} (${fmtPct(pct(brasil), 1)})`, 'GA4 · país')}
        ${metric('Usuários nos outros 6 países listados', `${fmtInt(exteriorListado)} (${fmtPct(pct(exteriorListado), 1)})`, ga4.paises.filter((p) => p.pais !== 'Brazil').map((p) => p.pais_pt).join(', '))}
        ${metric('Outros países ou (not set)', `${fmtInt(naoDetalhado)} (${fmtPct(pct(naoDetalhado), 1)})`, 'Diferença para o total; não detalhado no recorte importado')}
        ${metric('Bots identificados', bots.length ? fmtInt(bots.length) : 'Sem evidência importada', 'Não inferimos bot por país ou cidade')}
        ${metric('Usuários: GA4 × Clarity', `${fmtInt(TOTAIS.ga4UsuariosAtivos)} × ${fmtInt(TOTAIS.clarityUsuariosUnicos)}`, `Clarity registra ${fmtPct((TOTAIS.clarityUsuariosUnicos / TOTAIS.ga4UsuariosAtivos) * 100, 0)} do total do GA4; as ferramentas contam de formas diferentes e não são somadas`)}
      </div>
      <div>
        <div class="table-wrap"><table class="table">
          <caption class="sr-only">Categorias de qualidade do tráfego por cidade</caption>
          <thead><tr><th scope="col">Categoria</th><th scope="col">Tratamento</th><th scope="col">Cidades no relatório importado</th></tr></thead>
          <tbody>${categorias.map((c) => `<tr><td><span class="pill ${c.pill}">${escapeHtml(c.nome)}</span></td><td>${escapeHtml(c.trat)}</td><td>${cidadesTxt(c.cidades)}</td></tr>`).join('')}</tbody>
        </table></div>
        <p class="note">Tráfego externo ou sem localização útil para a comparação territorial. Cidades estrangeiras não são rotuladas como bot sem evidência específica (ex.: filtro de bots do Clarity).</p>
      </div>
    </div>`;
}
