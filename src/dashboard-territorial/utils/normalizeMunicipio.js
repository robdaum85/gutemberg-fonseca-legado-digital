// Chave canônica para relacionar municípios entre TSE (CSV), GA4 e IBGE (GeoJSON).
// Regras: remove acentos, uppercase, trim, colapsa espaços e aplica aliases explícitos.
// Não há fuzzy matching: nome que não casar deve ir para o relatório de não relacionados.

// Aliases conhecidos (chave já normalizada -> chave canônica). Acrescente somente com evidência.
export const MUNICIPIO_ALIASES = Object.freeze({
  // GA4 grafa algumas cidades em inglês/sem preposição; nenhuma necessária até agora.
});

export function normalizeMunicipio(value) {
  if (value === null || value === undefined) return '';
  const key = String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[‘’´`]/g, "'")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, ' ');
  return MUNICIPIO_ALIASES[key] ?? key;
}

/**
 * Relaciona duas listas por chave normalizada, sem aproximações.
 * @returns {{matched: string[], unmatchedLeft: string[], unmatchedRight: string[]}}
 */
export function matchByMunicipio(leftNames, rightNames) {
  const left = new Map(leftNames.map((name) => [normalizeMunicipio(name), name]));
  const right = new Map(rightNames.map((name) => [normalizeMunicipio(name), name]));
  const matched = [];
  const unmatchedLeft = [];
  for (const [key, name] of left) {
    if (right.has(key)) matched.push(key);
    else unmatchedLeft.push(name);
  }
  const unmatchedRight = [...right].filter(([key]) => !left.has(key)).map(([, name]) => name);
  return { matched, unmatchedLeft, unmatchedRight };
}
