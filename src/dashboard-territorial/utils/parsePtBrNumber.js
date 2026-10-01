// Converte números em formato pt-BR ("54,50", "3.263.787", "1.234,5") para Number.
// Campo vazio vira null ("sem dado"), nunca 0. Valor inválido lança erro: não mascarar.

export class ParseNumberError extends Error {}

export function parsePtBrNumber(raw, { field = 'valor' } = {}) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === 'number') {
    if (!Number.isFinite(raw)) throw new ParseNumberError(`${field}: número não finito (${raw})`);
    return raw;
  }
  const text = String(raw).trim();
  if (text === '') return null;
  // pt-BR: "." separa milhar e "," separa decimal.
  if (!/^-?\d{1,3}(\.\d{3})*(,\d+)?$|^-?\d+(,\d+)?$/.test(text)) {
    throw new ParseNumberError(`${field}: "${text}" não é um número pt-BR válido`);
  }
  return Number(text.replace(/\./g, '').replace(',', '.'));
}

// Números já em formato internacional (ponto decimal), como no CSV do GA4 definido na SPEC.
export function parseDotDecimal(raw, { field = 'valor' } = {}) {
  if (raw === null || raw === undefined) return null;
  const text = String(raw).trim();
  if (text === '') return null;
  if (!/^-?\d+(\.\d+)?$/.test(text)) {
    throw new ParseNumberError(`${field}: "${text}" não é um número válido`);
  }
  return Number(text);
}

export function parseInteger(raw, opts) {
  const value = parsePtBrNumber(raw, opts);
  if (value !== null && !Number.isInteger(value)) {
    throw new ParseNumberError(`${opts?.field ?? 'valor'}: "${raw}" deveria ser inteiro`);
  }
  return value;
}
