import { fmtInt } from '../utils/formatters.js';

export function paginate(rows, page, pageSize) {
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(Math.max(0, page), pages - 1);
  return { pages, current, slice: rows.slice(current * pageSize, (current + 1) * pageSize) };
}

// Controles com data-page; o chamador delega o clique e lê o número da página.
export function paginationHtml({ pages, current }, total, label) {
  if (pages <= 1) return `<div class="terr-pager"><span>${fmtInt(total)} ${label}</span></div>`;
  return `<nav class="terr-pager" aria-label="Paginação de ${label}">
    <button type="button" data-page="${current - 1}" ${current === 0 ? 'disabled' : ''} aria-label="Página anterior">‹ Anterior</button>
    <span>Página ${current + 1} de ${pages} · ${fmtInt(total)} ${label}</span>
    <button type="button" data-page="${current + 1}" ${current === pages - 1 ? 'disabled' : ''} aria-label="Próxima página">Próxima ›</button>
  </nav>`;
}
