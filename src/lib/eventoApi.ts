export type EventoCadastroPayload = {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  cidade: string;
  bairro: string;
  categoria: string;
  lgpd: boolean;
};

export type EventoCadastroResponse = {
  success: boolean;
  codigo: string;
  qrcodeUrl: string;
  nome?: string;
  message?: string;
};

export type EventoConsultaResponse = {
  success: boolean;
  status?: "PENDENTE" | "VALIDADO" | "CANCELADO" | "DUPLICADO";
  nome?: string;
  codigo?: string;
  dataValidacao?: string;
  horaValidacao?: string;
  validadoPor?: string;
  message?: string;
};

export type EventoValidarResponse = {
  success: boolean;
  resultado:
    | "VALIDADO_COM_SUCESSO"
    | "JA_VALIDADO"
    | "CODIGO_NAO_ENCONTRADO"
    | "ERRO";
  nome?: string;
  codigo?: string;
  status?: string;
  dataValidacao?: string;
  horaValidacao?: string;
  validadoPor?: string;
  message?: string;
};

export type EventoDashboardResponse = {
  success: boolean;
  totalInscritos: number;
  totalValidados: number;
  totalPendentes: number;
  percentualComparecimento: number;
  ultimasValidacoes: Array<{
    data: string;
    hora: string;
    codigo: string;
    resultado: string;
    nome: string;
    fiscal: string;
    portaria: string;
    observacao: string;
  }>;
  tentativasInvalidas: number;
  convitesReutilizados: number;
  message?: string;
};

const API_URL = import.meta.env.VITE_EVENTO_API_URL?.trim() ?? "";
const API_TOKEN = import.meta.env.VITE_EVENTO_API_TOKEN?.trim() ?? "";

export function isEventoApiConfigured() {
  return API_URL.length > 0 && !API_URL.includes("SUBSTITUIR");
}

function buildUrl(action: string, params?: Record<string, string>) {
  if (!isEventoApiConfigured()) {
    throw new Error("Configure VITE_EVENTO_API_URL com a URL do Web App do Apps Script.");
  }

  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  if (API_TOKEN) url.searchParams.set("token", API_TOKEN);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("A API retornou uma resposta invalida.");
  }
}

async function post<T>(action: string, payload: Record<string, unknown>): Promise<T> {
  const response = await fetch(buildUrl(action), {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({ action, token: API_TOKEN, ...payload }),
  });
  return parseJson<T>(response);
}

async function get<T>(action: string, params?: Record<string, string>): Promise<T> {
  const response = await fetch(buildUrl(action, params), {
    method: "GET",
  });
  return parseJson<T>(response);
}

export function cadastrarEvento(payload: EventoCadastroPayload) {
  return post<EventoCadastroResponse>("cadastro", payload);
}

export function consultarCodigo(codigo: string) {
  return get<EventoConsultaResponse>("consulta", { codigo: normalizeCodigo(codigo) });
}

export function validarCodigo(codigo: string, fiscal: string, portaria: string) {
  return post<EventoValidarResponse>("validar", {
    codigo: normalizeCodigo(codigo),
    fiscal,
    portaria,
  });
}

export function carregarDashboard() {
  return get<EventoDashboardResponse>("dashboard");
}

export function normalizeCodigo(value: string) {
  return value.trim().toUpperCase();
}

export function extractCodigoFromScan(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed);
    return normalizeCodigo(url.searchParams.get("codigo") ?? trimmed);
  } catch {
    const match = trimmed.match(/codigo=([^&]+)/i);
    return normalizeCodigo(match ? decodeURIComponent(match[1]) : trimmed);
  }
}

