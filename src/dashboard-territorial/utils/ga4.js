import { normalizeMunicipio } from './normalizeMunicipio.js';
import { parseDotDecimal } from './parsePtBrNumber.js';

// Categorias de qualidade do tráfego (SPEC §12). "bot_identificado" só é usado quando a
// própria ferramenta fornece evidência; nunca é inferido a partir do país ou da cidade.
export const TRAFFIC_CATEGORY = Object.freeze({
  BRASIL_RJ: 'brasil_rj',
  BRASIL_FORA_RJ: 'brasil_fora_rj',
  EXTERIOR: 'exterior',
  NOT_SET: 'not_set',
  BOT_IDENTIFICADO: 'bot_identificado',
});

export const GA4_METRICS = [
  'usuarios_ativos',
  'novos_usuarios',
  'sessoes_engajadas',
  'taxa_engajamento',
  'sessoes_engajadas_por_usuario',
  'tempo_medio_engajamento_seg',
  'eventos',
];

const isNotSet = (value) => normalizeMunicipio(value) === '(NOT SET)' || String(value).trim() === '';

/**
 * Classifica uma linha do relatório de cidades do GA4.
 * Somente BRASIL_RJ entra no comparativo territorial do mapa.
 * Observação: o GA4 por cidade não traz a UF; o match com o RJ é por nome exato normalizado.
 */
export function classifyGa4City({ cidade, pais }, rjKeys) {
  if (isNotSet(cidade) || isNotSet(pais)) return TRAFFIC_CATEGORY.NOT_SET;
  if (normalizeMunicipio(pais) !== 'BRAZIL' && normalizeMunicipio(pais) !== 'BRASIL') return TRAFFIC_CATEGORY.EXTERIOR;
  return rjKeys.has(normalizeMunicipio(cidade)) ? TRAFFIC_CATEGORY.BRASIL_RJ : TRAFFIC_CATEGORY.BRASIL_FORA_RJ;
}

export function parseGa4CityRow(raw, rjKeys) {
  const row = { cidade: raw.cidade, pais: raw.pais, key: normalizeMunicipio(raw.cidade) };
  for (const metric of GA4_METRICS) row[metric] = parseDotDecimal(raw[metric], { field: `${raw.cidade}.${metric}` });
  row.categoria = classifyGa4City(row, rjKeys);
  return row;
}

/**
 * Participação no tráfego brasileiro identificado no dataset importado (SPEC §21).
 * Denominador: soma de usuários das cidades brasileiras com valor importado.
 */
export function shareUsuariosBrasil(rows) {
  const brasileiras = rows.filter((r) => (r.categoria === TRAFFIC_CATEGORY.BRASIL_RJ || r.categoria === TRAFFIC_CATEGORY.BRASIL_FORA_RJ) && r.usuarios_ativos !== null);
  const total = brasileiras.reduce((sum, r) => sum + r.usuarios_ativos, 0);
  return { total, share: (row) => (row.usuarios_ativos === null || total === 0 ? null : (row.usuarios_ativos / total) * 100) };
}
