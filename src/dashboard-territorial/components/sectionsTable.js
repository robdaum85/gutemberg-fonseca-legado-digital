import { escapeHtml, fmtInt } from '../utils/formatters.js';
import { paginate, paginationHtml } from './pagination.js';

const PAGE_SIZE = 50;

// Tabela paginada: nunca coloca as 9.954 seções na DOM de uma vez (SPEC §9.3, §25).
export function renderSecoes(el, subEl, { secoes, nomeByKey, municipioKey, zona, localIdx, localNome, page }) {
  const rows = secoes
    .filter((s) => (!municipioKey || s.key === municipioKey) && (zona === null || s.zona === zona) && (localIdx === null || s.localIdx === localIdx))
    .sort((a, b) => a.key.localeCompare(b.key) || a.zona - b.zona || a.secao - b.secao);
  const scope = [municipioKey ? nomeByKey.get(municipioKey) : 'Todo o estado', zona !== null ? `Zona ${zona}` : null, localNome].filter(Boolean).join(' · ');
  subEl.innerHTML = ` · ${escapeHtml(scope)}${localIdx !== null ? ' <button type="button" class="terr-chip" data-clear-local>Remover filtro de local ✕</button>' : ''}`;

  if (!rows.length) {
    el.innerHTML = '<p class="terr-empty">Não há registro de voto no arquivo histórico para este recorte.</p>';
    return;
  }
  const pg = paginate(rows, page, PAGE_SIZE);
  const showMun = !municipioKey;
  const body = pg.slice.map((s) => `<tr>${showMun ? `<td>${escapeHtml(nomeByKey.get(s.key))}</td>` : ''}<td class="num">${s.zona}</td><td class="num">${s.secao}</td><td>${escapeHtml(s.local)}</td><td class="num">${fmtInt(s.votos)}</td></tr>`).join('');
  el.innerHTML = `<div class="table-wrap"><table class="table terr-table">
      <caption class="sr-only">Seções eleitorais: ${escapeHtml(scope)}</caption>
      <thead><tr>${showMun ? '<th scope="col">Município</th>' : ''}<th scope="col" class="num">Zona</th><th scope="col" class="num">Seção</th><th scope="col">Local</th><th scope="col" class="num">Votos</th></tr></thead>
      <tbody>${body}</tbody></table></div>${paginationHtml(pg, rows.length, 'seções')}`;
}
