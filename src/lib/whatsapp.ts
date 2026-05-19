import { WHATSAPP_NUMBER } from "@/config/mobilizacao";

export type TipoContato = "APOIADOR" | "LIDERANÇA" | "DENÚNCIA";

const INTROS: Record<TipoContato, string> = {
  APOIADOR: "Olá, gostaria de participar como APOIADOR do Exército do Consumidor.",
  "LIDERANÇA": "Olá, gostaria de me cadastrar como LIDERANÇA do Exército do Consumidor.",
  "DENÚNCIA": "Olá, gostaria de registrar uma DENÚNCIA pelo Exército do Consumidor.",
};

export function buildWhatsAppUrl(
  tipo: TipoContato,
  campos: Record<string, string>
): string {
  const linhas = Object.entries(campos)
    .filter(([, v]) => v && v.trim().length > 0)
    .map(([k, v]) => `${k}: ${v.trim()}`)
    .join("\n");
  const texto = `${INTROS[tipo]}\n\n${linhas}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}
