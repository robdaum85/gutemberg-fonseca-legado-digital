import { escapeHtml, fmtInt, fmtPct } from '../utils/formatters.js';

const COLLAPSED = 12;

// Barras horizontais ordenadas por votos. Cada barra é um botão que filtra locais e seções.
export function renderZones(el, subEl, { zonas, nomeByKey, municipioKey, zona, expanded }) {
  const rows = zonas
    .filter((z) => !municipioKey || z.key === municipioKey)
    .sort((a, b) => b.votos - a.votos || a.zona - b.zona);
  const total = rows.reduce((acc, z) => acc + z.votos, 0);

  subEl.textContent = municipioKey
    ? `${nomeByKey.get(municipioKey)} · ${rows.length} zona(s) com voto em 2022. Clique em uma zona para filtrar locais e seções.`
    : `Todas as ${rows.length} zonas com voto no estado. Clique em uma zona para filtrar locais e seções.`;

  if (!rows.length) {
    el.innerHTML = '<p class="terr-empty">Não há registro de voto no arquivo histórico para este município.</p>';
    return;
  }
  const visible = expanded ? rows : rows.slice(0, COLLAPSED);
  const max = rows[0].votos;
  const bars = visible.map((z) => {
    const label = municipioKey ? `Zona ${z.zona}` : `${nomeByKey.get(z.key)} · Zona ${z.zona}`;
    const active = zona !== null && z.zona === zona && (!municipioKey || z.key === municipioKey);
    return `<button type="button" class="bar-row terr-bar${active ? ' is-selected' : ''}" data-zona="${z.zona}" data-key="${escapeHtml(z.key)}" aria-pressed="${active}"
      aria-label="${escapeHtml(label)}: ${fmtInt(z.votos)} votos, ${fmtPct((z.votos / total) * 100, 1)} do recorte">
      <span class="bar-label">${escapeHtml(label)}</span>
      <span class="track"><span class="fill" style="width:${((z.votos / max) * 100).toFixed(1)}%"></span></span>
      <span class="bar-value">${fmtInt(z.votos)}</span>
    </button>`;
  }).join('');
  const more = rows.length > COLLAPSED
    ? `<button type="button" class="terr-more" data-zonas-expand="${!expanded}">${expanded ? 'Mostrar menos' : `Mostrar todas as ${rows.length} zonas`}</button>`
    : '';
  el.innerHTML = bars + more;
}
