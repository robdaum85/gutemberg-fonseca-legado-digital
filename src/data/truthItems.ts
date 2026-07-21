export type TruthStatus = "false" | "misleading" | "out-of-context" | "true" | "under-review";

export type TruthSource = {
  label: string;
  url: string | null;
  publishedAt: string | null;
};

export type TruthItem = {
  id: string;
  claim: string;
  summary: string;
  explanation: string;
  sources: TruthSource[];
  claimDate: string | null;
  reviewedAt: string | null;
  status: TruthStatus;
  isApproved: boolean;
};

export const truthItems: TruthItem[] = [
  {
    id: "verdade-conteudo-em-revisao",
    claim: "Conteúdo reservado para uma futura checagem documental.",
    summary: "Este item demonstra a interface enquanto a apuração editorial e jurídica não foi concluída.",
    explanation:
      "Nenhuma alegação será publicada como fato antes da conferência de documentos, datas, contexto e fontes independentes.",
    sources: [{ label: "Fonte documental pendente de validação", url: null, publishedAt: null }],
    claimDate: null,
    reviewedAt: null,
    status: "under-review",
    isApproved: false,
  },
  {
    id: "verdade-segunda-checagem",
    claim: "Espaço demonstrativo para uma segunda verificação.",
    summary: "Registro provisório sem afirmação pública associada.",
    explanation:
      "A publicação dependerá de fonte acessível, explicação contextual, data da análise e aprovação responsável.",
    sources: [{ label: "Documentação ainda não anexada", url: null, publishedAt: null }],
    claimDate: null,
    reviewedAt: null,
    status: "under-review",
    isApproved: false,
  },
];
