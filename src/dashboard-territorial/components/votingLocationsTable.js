import { escapeHtml, fmtInt } from '../utils/formatters.js';
import { normalizeMunicipio } from '../utils/normalizeMunicipio.js';
import { paginate, paginationHtml } from './pagination.js';

const PAGE_SIZE = 20;

export function filterLocais(locais, { municipioKey, zona, query }) {
  const q = normalizeMunicipio(query);
  return locais
    .filter((l) => (!municipioKey || l.key === municipioKey)
      && (zona === null || l.zona === zona)
      && (!q || normalizeMunicipio(`${l.nome} ${l.endereco}`).includes(q)))
    .sort((a, b) => b.votos - a.votos || a.nome.localeCompare(b.nome, 'pt-BR'));
}

export function renderLocais(el, subEl, { locais, nomeByKey, municipioKey, zona, localIdx, query, page }) {
  const rows = filterLocais(locais, { municipioKey, zona, query });
  const scope = [municipioKey ? nomeByKey.get(municipioKey) : 'Todo o estado', zona !== null ? `Zona ${zona}` : null].filter(Boolean).join(' · ');
  subEl.innerHTML = `${escapeHtml(scope)} · ordenado por votos.${zona !== null ? ' <button type="button" class="terr-chip" data-clear-zona>Remover filtro de zona ✕</button>' : ''}`;

  if (!rows.length) {
    el.innerHTML = `<p class="terr-empty">${query ? `Nenhum local encontrado para “${escapeHtml(query)}”.` : 'Não há registro de voto no arquivo histórico para este recorte.'}</p>`;
    return;
  }
  const pg = paginate(rows, page, PAGE_SIZE);
  const showMun = !municipioKey;
  const body = pg.slice.map((l) => `<tr class="${l.idx === localIdx ? 'is-selected' : ''}">
      <td>${escapeHtml(l.nome)}${showMun ? `<div class="terr-cell-sub">${escapeHtml(nomeByKey.get(l.key))}</div>` : ''}</td>
      <td>${escapeHtml(l.endereco)}</td>
      <td class="num">${l.zona}</td>
      <td class="num">${fmtInt(l.votos)}</td>
      <td><button type="button" class="terr-linkbtn" data-local="${l.idx}" aria-label="Ver seções de ${escapeHtml(l.nome)}">Ver seções</button></td>
    </tr>`).join('');
  el.innerHTML = `<div class="table-wrap"><table class="table terr-table">
      <caption class="sr-only">Locais de votação: ${escapeHtml(scope)}</caption>
      <thead><tr><th scope="col">Local</th><th scope="col">Endereço</th><th scope="col" class="num">Zona</th><th scope="col" class="num">Votos</th><th scope="col"><span class="sr-only">Ações</span></th></tr></thead>
      <tbody>${body}</tbody></table></div>${paginationHtml(pg, rows.length, 'locais')}`;
}
