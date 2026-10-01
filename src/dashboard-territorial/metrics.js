import { fmtDuration, fmtInt, fmtPct, SEM_DADO, SEM_REGISTRO } from './utils/formatters.js';

// Escalas sequenciais de uma só cor, validadas (contraste do 1º passo >= 2:1).
// Azul = resultado eleitoral 2022. Laranja = atividade digital 2026. Nunca verde/vermelho.
export const RAMPS = {
  2022: ['#86b6ef', '#5598e7', '#2a78d6', '#1c5cab', '#0d366b'],
  2026: ['#f29a72', '#eb6834', '#c9521f', '#9c3c14', '#6b260a'],
};
export const NO_DATA_COLOR = '#d9dee5';

const tse = (field) => (m) => m.tse?.[field] ?? null;
const ga4 = (field) => (m) => m.ga4?.[field] ?? null;

// Definições em linguagem simples (SPEC §18). `empty` é o rótulo quando o valor não existe.
export const METRICS = {
  votos: { period: '2022', label: 'Votos 2022', get: tse('votos'), fmt: (n) => fmtInt(n, SEM_REGISTRO), help: 'Votos recebidos por Gutemberg (2255) para deputado federal em 2022.' },
  pct_total: { period: '2022', label: '% dos votos de Gutemberg', get: tse('pct_total'), fmt: (n) => fmtPct(n, 2, SEM_REGISTRO), help: 'Quanto do total de 19.288 votos de Gutemberg veio deste município.' },
  pct_validos: { period: '2022', label: 'Penetração local', get: tse('pct_validos'), fmt: (n) => fmtPct(n, 3, SEM_REGISTRO), help: 'Percentual dos votos válidos para deputado federal no município que foram para Gutemberg em 2022.' },
  pct_secoes: { period: '2022', label: 'Cobertura de seções', get: tse('pct_secoes'), fmt: (n) => fmtPct(n, 1, SEM_REGISTRO), help: 'Percentual das seções eleitorais do município com ao menos um voto em Gutemberg.' },
  usuarios_ativos: { period: '2026', label: 'Usuários ativos 2026', get: ga4('usuarios_ativos'), fmt: (n) => fmtInt(n), help: 'Pessoas/dispositivos com atividade no site no período (GA4).' },
  sessoes_engajadas: { period: '2026', label: 'Sessões engajadas 2026', get: ga4('sessoes_engajadas'), fmt: (n) => fmtInt(n), help: 'Visitas em que houve interação real: mais de 10 s, conversão ou 2+ páginas.' },
  taxa_engajamento: { period: '2026', label: 'Taxa de engajamento 2026', get: ga4('taxa_engajamento'), fmt: (n) => fmtPct(n, 2), help: 'Percentual de sessões em que a pessoa realmente interagiu com o site.' },
  tempo_medio_engajamento_seg: { period: '2026', label: 'Tempo médio 2026', get: ga4('tempo_medio_engajamento_seg'), fmt: (n) => fmtDuration(n), help: 'Tempo médio de engajamento por usuário ativo.' },
  eventos: { period: '2026', label: 'Eventos 2026', get: ga4('eventos'), fmt: (n) => fmtInt(n), help: 'Total de interações registradas pelo GA4 (visualizações, cliques, rolagens etc.).' },
};

export const DEFAULT_METRIC = { 2022: 'votos', 2026: 'usuarios_ativos' };

export const metricIdsFor = (mode) => Object.keys(METRICS).filter((id) => mode === 'comparacao' || METRICS[id].period === mode);

/**
 * Faixas por quantis sobre os valores existentes (inclui zero; exclui “sem dado”).
 * Retorna até 5 classes [{min, max}] e um classificador valor -> índice (ou -1 = sem dado).
 */
export function buildClasses(values, maxClasses = 5) {
  const sorted = [...new Set(values.filter((v) => v !== null))].sort((a, b) => a - b);
  if (!sorted.length) return { classes: [], classify: () => -1 };
  const n = Math.min(maxClasses, sorted.length);
  const uppers = [];
  for (let i = 1; i <= n; i += 1) {
    const upper = sorted[Math.ceil((i / n) * sorted.length) - 1];
    if (uppers[uppers.length - 1] !== upper) uppers.push(upper);
  }
  const classes = uppers.map((max, i) => ({ min: i === 0 ? sorted[0] : sorted[sorted.indexOf(uppers[i - 1]) + 1], max }));
  const classify = (v) => (v === null ? -1 : classes.findIndex((c) => v <= c.max));
  return { classes, classify };
}

// Com menos de 5 faixas, espalha as cores pela escala para manter o contraste entre elas.
export function classColor(index, count, ramp) {
  if (count <= 1) return ramp[Math.floor(ramp.length / 2)];
  return ramp[Math.round((index * (ramp.length - 1)) / (count - 1))];
}

export { SEM_DADO, SEM_REGISTRO };
