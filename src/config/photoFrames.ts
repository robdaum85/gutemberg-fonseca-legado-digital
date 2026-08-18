export type FrameAlly = {
  name: string;
  office?: string;
  number?: string;
};

export type PhotoFrameDefinition = {
  slug: string;
  /** Título exibido no card e no editor. */
  title: string;
  /** Aliados que aparecem na arte além do próprio Gutemberg (vazio na moldura solo). */
  allies: FrameAlly[];
  description: string;
  frameSrc: string;
  output: { width: number; height: number };
  photoArea: { x: number; y: number; width: number; height: number };
  initialTopBias: number;
  maxZoom: number;
  fileName: string;
  backgroundColor: string;
  colors: { primary: string; secondary: string; accent: string };
  active: boolean;
};

// Identificação exigida pelo TSE — já vem impressa em todas as artes,
// repetida aqui apenas como texto acessível (a arte é uma imagem decorativa).
export const CAMPAIGN_LEGAL_DISCLAIMER = [
  "CNPJ do candidato: 68.237.089/0001-48",
  "Coligação: Rio Real (PL - Mobiliza - Agir - Avante)",
];

// Cores oficiais do site (ver :root em ApresentacaoFederalPage.css).
const BRAND_COLORS = { primary: "#003f66", secondary: "#02a556", accent: "#fae519" };
const BRAND_BACKGROUND = "#00265f";

// As artes "Guto & aliado" têm todas a mesma janela transparente (0,0,3000,1718).
const PAIR_PHOTO_AREA = { x: 0, y: 0, width: 3000, height: 1718 };
// As artes com chapa completa (3-4 pessoas) têm janela um pouco menor (0,0,3000,1860).
const CHAPA_PHOTO_AREA = { x: 0, y: 0, width: 3000, height: 1860 };

function frameDefaults() {
  return {
    output: { width: 3000, height: 3000 },
    initialTopBias: 0.08,
    maxZoom: 2,
    backgroundColor: BRAND_BACKGROUND,
    colors: BRAND_COLORS,
    active: true,
  };
}

export const photoFrames: PhotoFrameDefinition[] = [
  {
    slug: "gutemberg-fonseca-2255",
    title: "Somente Gutemberg",
    allies: [],
    description: "Coloque sua foto na moldura oficial de Gutemberg Fonseca 2255 e compartilhe seu apoio.",
    frameSrc: "/images/molduras/gutemberg-2255/moldura-voto-indico.png",
    photoArea: { x: 0, y: 0, width: 1080, height: 600 },
    fileName: "voto-e-indico-gutemberg-2255.png",
    ...frameDefaults(),
    output: { width: 1080, height: 1080 },
  },
  {
    slug: "guto-dr-rogerio-amorim",
    title: "Guto & Dr. Rogério Amorim",
    allies: [{ name: "Dr. Rogério Amorim", office: "Deputado Estadual", number: "22123" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Dr. Rogério Amorim 22123.",
    frameSrc: "/images/molduras/guto-dr-rogerio-amorim.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-dr-rogerio-amorim.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-arthur-monteiro",
    title: "Guto & Arthur Monteiro",
    allies: [{ name: "Arthur Monteiro", office: "Deputado Estadual", number: "77222" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Arthur Monteiro 77222.",
    frameSrc: "/images/molduras/guto-arthur-monteiro.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-arthur-monteiro.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-cris-kaizer",
    title: "Guto & Cris Kaizer",
    allies: [{ name: "Cris Kaizer", office: "Deputada Estadual", number: "55180" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Cris Kaizer 55180.",
    frameSrc: "/images/molduras/guto-cris-kaizer.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-cris-kaizer.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-dani-martins",
    title: "Guto & Dani Martins",
    allies: [{ name: "Dani Martins", office: "Deputada Estadual", number: "10610" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Dani Martins 10610.",
    frameSrc: "/images/molduras/guto-dani-martins.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-dani-martins.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-daniel-marques",
    title: "Guto & Daniel Marques",
    allies: [{ name: "Daniel Marques", office: "Deputado Estadual", number: "22002" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Daniel Marques 22002.",
    frameSrc: "/images/molduras/guto-daniel-marques.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-daniel-marques.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-elker-jae",
    title: "Guto & Elker Jaé",
    allies: [{ name: "Elker Jaé", office: "Deputado Estadual", number: "12005" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Elker Jaé 12005.",
    frameSrc: "/images/molduras/guto-elker-jae.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-elker-jae.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-flavio-bolsonaro",
    title: "Guto & Flávio Bolsonaro",
    allies: [{ name: "Flávio Bolsonaro", office: "Presidente (vice Alfredo Gaspar)", number: "22" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Flávio Bolsonaro 22.",
    frameSrc: "/images/molduras/guto-flavio-bolsonaro.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-flavio-bolsonaro.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-greg-duarte",
    title: "Guto & Greg Duarte",
    allies: [{ name: "Greg Duarte", office: "Deputado Estadual", number: "22777" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Greg Duarte 22777.",
    frameSrc: "/images/molduras/guto-greg-duarte.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-greg-duarte.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-jeremias-santos",
    title: "Guto & Jeremias Santos",
    allies: [{ name: "Jeremias Santos", office: "Deputado Estadual", number: "22021" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Jeremias Santos 22021.",
    frameSrc: "/images/molduras/guto-jeremias-santos.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-jeremias-santos.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-marcelo-construcao",
    title: "Guto & Marcelo da Construção",
    allies: [{ name: "Marcelo da Construção", office: "Deputado Estadual", number: "45021" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Marcelo da Construção 45021.",
    frameSrc: "/images/molduras/guto-marcelo-construcao.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-marcelo-construcao.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-marcelo-macedo",
    title: "Guto & Professor Marcelo Macedo",
    allies: [{ name: "Professor Marcelo Macedo" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Professor Marcelo Macedo.",
    frameSrc: "/images/molduras/guto-marcelo-macedo.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-marcelo-macedo.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-marquinho-transporte",
    title: "Guto & Marquinho do Transporte",
    allies: [{ name: "Marquinho do Transporte", office: "Deputado Estadual", number: "27123" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Marquinho do Transporte 27123.",
    frameSrc: "/images/molduras/guto-marquinho-transporte.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-marquinho-transporte.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-rodrigo-lumar",
    title: "Guto & Rodrigo da Lumar",
    allies: [{ name: "Rodrigo da Lumar", office: "Deputado Estadual", number: "27111" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Rodrigo da Lumar 27111.",
    frameSrc: "/images/molduras/guto-rodrigo-lumar.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-rodrigo-lumar.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-sub-honorio",
    title: "Guto & Sub Honório",
    allies: [{ name: "Sub Honório", office: "Deputado Estadual", number: "27999" }],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255 e Sub Honório 27999.",
    frameSrc: "/images/molduras/guto-sub-honorio.webp",
    photoArea: PAIR_PHOTO_AREA,
    fileName: "voto-e-indico-guto-sub-honorio.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-douglas-flavio",
    title: "Chapa: Douglas Ruas & Flávio Bolsonaro",
    allies: [
      { name: "Douglas Ruas", office: "Governador (vice Fernanda Louback)", number: "22" },
      { name: "Flávio Bolsonaro", office: "Presidente (vice Alfredo Gaspar)", number: "22" },
    ],
    description: "Mostre seu apoio à chapa completa: Douglas Ruas, Gutemberg Fonseca 2255 e Flávio Bolsonaro.",
    frameSrc: "/images/molduras/guto-douglas-flavio.webp",
    photoArea: CHAPA_PHOTO_AREA,
    fileName: "voto-e-indico-guto-douglas-flavio.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-fabinho-vantoil",
    title: "Guto, Fabinho Costa & Vantoil",
    allies: [
      { name: "Fabinho Costa", office: "Prefeito de Iguaba" },
      { name: "Vantoil", office: "Deputado Estadual (ex-prefeito de Iguaba)", number: "40999" },
    ],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255, Fabinho Costa e Vantoil 40999.",
    frameSrc: "/images/molduras/guto-fabinho-vantoil.webp",
    photoArea: CHAPA_PHOTO_AREA,
    fileName: "voto-e-indico-guto-fabinho-vantoil.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-felipe-michel-zezinho",
    title: "Guto, Felipe Pampolha, Michel Marins & Zezinho Orelha",
    allies: [
      { name: "Michel Marins" },
      { name: "Felipe Pampolha", office: "Deputado Estadual", number: "11123" },
      { name: "Zezinho Orelha" },
    ],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255, Felipe Pampolha 11123, Michel Marins e Zezinho Orelha.",
    frameSrc: "/images/molduras/guto-felipe-michel-zezinho.webp",
    photoArea: CHAPA_PHOTO_AREA,
    fileName: "voto-e-indico-guto-felipe-michel-zezinho.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-janeyde-jorge",
    title: "Guto, Janeyde do Calçadão & Jorge Felippe Neto",
    allies: [
      { name: "Janeyde do Calçadão" },
      { name: "Jorge Felippe Neto", office: "Deputado Estadual", number: "22800" },
    ],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255, Janeyde do Calçadão e Jorge Felippe Neto 22800.",
    frameSrc: "/images/molduras/guto-janeyde-jorge.webp",
    photoArea: CHAPA_PHOTO_AREA,
    fileName: "voto-e-indico-guto-janeyde-jorge.png",
    ...frameDefaults(),
  },
  {
    slug: "guto-nilsao-ratinho",
    title: "Guto, Nilsão & Giovani Ratinho",
    allies: [
      { name: "Nilsão", office: "Vereador" },
      { name: "Giovani Ratinho", office: "Deputado Estadual", number: "15000" },
    ],
    description: "Mostre seu apoio a Gutemberg Fonseca 2255, Nilsão e Giovani Ratinho 15000.",
    frameSrc: "/images/molduras/guto-nilsao-ratinho.webp",
    photoArea: CHAPA_PHOTO_AREA,
    fileName: "voto-e-indico-guto-nilsao-ratinho.png",
    ...frameDefaults(),
  },
];

export const activePhotoFrames = photoFrames.filter((frame) => frame.active);

export function getPhotoFrame(slug?: string) {
  return activePhotoFrames.find((frame) => frame.slug === slug);
}

export function formatAlly(ally: FrameAlly) {
  const parts = [ally.office, ally.number].filter(Boolean);
  return parts.length > 0 ? `${ally.name} · ${parts.join(" ")}` : ally.name;
}
