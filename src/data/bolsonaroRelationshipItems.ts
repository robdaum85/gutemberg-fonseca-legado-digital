export type BolsonaroRelationshipMediaType = "gallery" | "timeline" | "video" | "testimonial";

export type BolsonaroRelationshipItem = {
  id: string;
  person: string;
  date: string | null;
  location: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string | null;
  mediaType: BolsonaroRelationshipMediaType;
  imageAvif: string;
  imageWebp: string;
  imageAlt: string;
  isApproved: boolean;
};

const mediaPath = (name: string, extension: "avif" | "webp") =>
  `/images/federal/bolsonaro/${name}-960x640.${extension}`;

export const bolsonaroRelationshipItems: BolsonaroRelationshipItem[] = [
  {
    id: "relacionamento-registro-em-validacao-01",
    person: "Participantes a confirmar",
    date: null,
    location: "Local a confirmar",
    description:
      "Espaço reservado para registro documental, condicionado à validação da fonte, do contexto e das pessoas retratadas.",
    sourceLabel: "Fonte pendente de aprovação",
    sourceUrl: null,
    mediaType: "gallery",
    imageAvif: mediaPath("section-08-bolsonaro-registro-documental-01", "avif"),
    imageWebp: mediaPath("section-08-bolsonaro-registro-documental-01", "webp"),
    imageAlt: "Arte gráfica provisória para futuro registro documental validado",
    isApproved: false,
  },
  {
    id: "relacionamento-registro-em-validacao-02",
    person: "Participantes a confirmar",
    date: null,
    location: "Local a confirmar",
    description:
      "Marco provisório da linha do tempo. Não representa declaração de apoio, aliança ou participação confirmada.",
    sourceLabel: "Fonte pendente de aprovação",
    sourceUrl: null,
    mediaType: "timeline",
    imageAvif: mediaPath("section-08-bolsonaro-registro-documental-02", "avif"),
    imageWebp: mediaPath("section-08-bolsonaro-registro-documental-02", "webp"),
    imageAlt: "Arte gráfica provisória para marco de linha do tempo",
    isApproved: false,
  },
  {
    id: "relacionamento-depoimento-em-validacao",
    person: "Depoente a confirmar",
    date: null,
    location: "Local a confirmar",
    description:
      "Área reservada para vídeo ou depoimento que possua autorização, fonte pública e aprovação editorial.",
    sourceLabel: "Vídeo ou depoimento ainda não aprovado",
    sourceUrl: null,
    mediaType: "testimonial",
    imageAvif: mediaPath("section-08-bolsonaro-depoimento-01", "avif"),
    imageWebp: mediaPath("section-08-bolsonaro-depoimento-01", "webp"),
    imageAlt: "Arte gráfica provisória para vídeo ou depoimento validado",
    isApproved: false,
  },
];
