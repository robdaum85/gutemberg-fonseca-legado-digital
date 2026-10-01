// Parser de CSV delimitado (padrão ";") com suporte a BOM, CRLF e campos entre aspas.
export function parseCsv(text, { delimiter = ';' } = {}) {
  const src = text.replace(/^﻿/, '');
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') { field += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"' && field === '') quoted = true;
    else if (ch === delimiter) { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i += 1;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else field += ch;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// Converte linhas em objetos e valida que todo registro tem o mesmo número de colunas do cabeçalho.
export function csvToObjects(text, { delimiter = ';', required = [], source = 'csv' } = {}) {
  const [header, ...body] = parseCsv(text, { delimiter });
  if (!header) throw new Error(`${source}: arquivo vazio`);
  const columns = header.map((c) => c.trim());
  const missing = required.filter((c) => !columns.includes(c));
  if (missing.length) throw new Error(`${source}: colunas ausentes: ${missing.join(', ')}`);
  return body.map((cells, index) => {
    if (cells.length !== columns.length) {
      throw new Error(`${source}: linha ${index + 2} tem ${cells.length} colunas (esperado ${columns.length})`);
    }
    return Object.fromEntries(columns.map((c, i) => [c, cells[i].trim()]));
  });
}
