export type PhotoFrameDefinition = {
  slug: string;
  candidateName: string;
  candidateNumber: string;
  office: string;
  title: string;
  description: string;
  frameSrc: string;
  output: { width: number; height: number };
  photoArea: { x: number; y: number; width: number; height: number };
  initialTopBias: number;
  maxZoom: number;
  fileName: string;
  backgroundColor: string;
  colors: { primary: string; secondary: string; accent: string };
  legalLines: string[];
  active: boolean;
};

export const photoFrames: PhotoFrameDefinition[] = [
  {
    slug: "gutemberg-fonseca-2255",
    candidateName: "Gutemberg Fonseca",
    candidateNumber: "2255",
    office: "Deputado Federal",
    title: "Voto & Indico",
    description: "Coloque sua foto na moldura oficial de Gutemberg Fonseca 2255 e compartilhe seu apoio.",
    frameSrc: "/images/molduras/gutemberg-2255/moldura-voto-indico.png",
    output: { width: 1080, height: 1080 },
    photoArea: { x: 0, y: 0, width: 1080, height: 600 },
    initialTopBias: 0.08,
    maxZoom: 2,
    fileName: "voto-e-indico-gutemberg-2255.png",
    backgroundColor: "#00265f",
    colors: { primary: "#00265f", secondary: "#009440", accent: "#ffe833" },
    legalLines: [
      "CNPJ do candidato: 68.237.089/0001-48",
      "Coligação: Rio Real (PL - Mobiliza - Agir - Avante)",
    ],
    active: true,
  },
];

export const activePhotoFrames = photoFrames.filter((frame) => frame.active);

export function getPhotoFrame(slug?: string) {
  return activePhotoFrames.find((frame) => frame.slug === slug);
}
