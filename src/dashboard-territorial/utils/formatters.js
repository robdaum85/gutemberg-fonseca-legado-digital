// Formatação pt-BR. Valor ausente nunca vira "undefined"/"NaN": retorna o rótulo de vazio.
export const SEM_DADO = 'Sem dado';
export const SEM_REGISTRO = 'Sem registro';

const isNumber = (n) => typeof n === 'number' && Number.isFinite(n);
const nf = (min, max) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: min, maximumFractionDigits: max });
const INT = nf(0, 0);

export function fmtInt(n, empty = SEM_DADO) {
  return isNumber(n) ? INT.format(n) : empty;
}

export function fmtDecimal(n, digits = 2, empty = SEM_DADO) {
  return isNumber(n) ? nf(digits, digits).format(n) : empty;
}

// Percentuais já chegam em pontos percentuais (54.5 => "54,50%").
export function fmtPct(n, digits = 2, empty = SEM_DADO) {
  return isNumber(n) ? `${nf(digits, digits).format(n)}%` : empty;
}

// Segundos => "56 s" ou "1m43s".
export function fmtDuration(seconds, empty = SEM_DADO) {
  if (!isNumber(seconds)) return empty;
  const total = Math.round(seconds);
  if (total < 60) return `${total} s`;
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}m${String(s).padStart(2, '0')}s`;
}

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
