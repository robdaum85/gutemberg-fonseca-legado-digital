import { METRICS } from '../metrics.js';
import { escapeHtml } from '../utils/formatters.js';
import { normalizeMunicipio } from '../utils/normalizeMunicipio.js';

// Colunas da SPEC §7. Propositalmente sem score/oportunidade/prioridade.
export const RANKING_COLUMNS = [
  { id: 'nome', label: 'Município', get: (m) => m.nome, text: true },
  { id: 'votos', label: 'Votos 2022', metric: 'votos' },
  { id: 'pct_total', label: '% votos 2022', metric: 'pct_total' },
  { id: 'pct_validos', label: 'Penetração local 2022', metric: 'pct_validos' },
  { id: 'usuarios_ativos', label: 'Usuários 2026', metric: 'usuarios_ativos' },
  { id: 'sessoes_engajadas', label: 'Sessões engajadas 2026', metric: 'sessoes_engajadas' },
  { id: 'taxa_engajamento', label: 'Taxa engajamento 2026', metric: 'taxa_engajamento' },
  { id: 'tempo_medio_engajamento_seg', label: 'Tempo médio 2026', metric: 'tempo_medio_engajamento_seg' },
];

const valueOf = (col, m) => (col.metric ? METRICS[col.metric].get(m) : col.get(m));

// Ordena mantendo “sem dado” sempre no fim, em qualquer direção.
export function sortMunicipios(rows, { column, dir }) {
  const col = RANKING_COLUMNS.find((c) => c.id === column) ?? RANKING_COLUMNS[1];
  const sign = dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const va = valueOf(col, a);
    const vb = valueOf(col, b);
    if (va === null && vb === null) return a.nome.localeCompare(b.nome, 'pt-BR');
    if (va === null) return 1;
    if (vb === null) return -1;
    const cmp = col.text ? va.localeCompare(vb, 'pt-BR') : va - vb;
    return cmp * sign || a.nome.localeCompare(b.nome, 'pt-BR');
  });
}

export function filterMunicipios(rows, query) {
  const q = normalizeMunicipio(query);
  return q ? rows.filter((m) => m.key.includes(q)) : rows;
}

export function renderRanking(table, { municipios, sort, query, selectedKey }) {
  const rows = sortMunicipios(filterMunicipios(municipios, query), sort);
  const head = RANKING_COLUMNS.map((col) => {
    const active = sort.column === col.id;
    const ariaSort = active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none';
    const arrow = active ? (sort.dir === 'asc' ? '↑' : '↓') : '↕';
    const help = col.metric ? ` title="${escapeHtml(METRICS[col.metric].help)}"` : '';
    return `<th scope="col" aria-sort="${ariaSort}" class="${col.text ? '' : 'num'}"><button type="button" class="terr-sort" data-sort="${col.id}"${help}>${escapeHtml(col.label)} <span aria-hidden="true">${arrow}</span></button></th>`;
  }).join('');

  const body = rows.length
    ? rows.map((m) => {
      const cells = RANKING_COLUMNS.slice(1).map((col) => {
        const metric = METRICS[col.metric];
        const value = metric.get(m);
        return `<td class="num">${value === null ? `<span class="terr-nodata">${escapeHtml(metric.fmt(null))}</span>` : escapeHtml(metric.fmt(value))}</td>`;
      }).join('');
      const selected = m.key === selectedKey;
      return `<tr class="${selected ? 'is-selected' : ''}"><th scope="row"><button type="button" class="terr-rowbtn" data-select="${escapeHtml(m.key)}" aria-pressed="${selected}">${escapeHtml(m.nome)}</button></th>${cells}</tr>`;
    }).join('')
    : `<tr><td colspan="${RANKING_COLUMNS.length}" class="terr-empty">Nenhum município encontrado para “${escapeHtml(query)}”.</td></tr>`;

  table.innerHTML = `<caption class="sr-only">Ranking municipal: votos de 2022 e atividade digital de 2026 por município</caption><thead><tr>${head}</tr></thead><tbody>${body}</tbody>`;
}
