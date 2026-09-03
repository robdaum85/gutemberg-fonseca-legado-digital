export const SITE_URL = "https://gutembergfonseca.com.br";
export const SITE_NAME = "Gutemberg Fonseca";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/images/federal/social/og-campanha-2255.png`;
export const PERSON_ID = `${SITE_URL}/#gutemberg-fonseca`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const AUTHOR_URL = `${SITE_URL}/institucional`;

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/gutembergpfonseca/",
  "https://www.facebook.com/gutembergpfonseca",
  "https://www.linkedin.com/in/gutembergfonseca/",
  "https://www.youtube.com/@gutembergpfonseca",
];

export type StaticPageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
};

export const STATIC_PAGE_SEO: Record<string, StaticPageSeo> = {
  "/": {
    title: "Gutemberg Fonseca 2255 | O Federal do Consumidor",
    description:
      "Conheça a trajetória, os resultados e as propostas de Gutemberg Fonseca para defender o consumidor no Rio e em Brasília.",
    path: "/",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/institucional": {
    title: "Trajetória de Gutemberg Fonseca | Defesa do Consumidor",
    description:
      "Conheça a trajetória profissional, a atuação pública e os resultados de Gutemberg Fonseca na defesa do consumidor e da cidadania.",
    path: "/institucional",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/direitos-do-consumidor": {
    title: "Direitos do Consumidor: guia prático e atualizado | Gutemberg Fonseca",
    description:
      "Guia de direitos do consumidor com orientações sobre cobranças, contratos, compras online, golpes digitais, serviços essenciais e como reclamar.",
    path: "/direitos-do-consumidor",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/direitos-do-cidadao": {
    title: "Direitos do Cidadão: informação e transparência | Gutemberg Fonseca",
    description:
      "Conteúdos sobre direitos do cidadão, acesso à informação, transparência pública e participação na fiscalização do poder público.",
    path: "/direitos-do-cidadao",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/seguranca-publica": {
    title: "Segurança Pública: informação e propostas | Gutemberg Fonseca",
    description:
      "Artigos e orientações sobre segurança pública, proteção das mulheres, cidadania e políticas públicas no Rio de Janeiro.",
    path: "/seguranca-publica",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/codigo-de-defesa-do-consumidor": {
    title: "Defenda o Código de Defesa do Consumidor | PL 2766/2021",
    description:
      "Entenda como o PL 2766/2021 pode enfraquecer a proteção dos consumidores brasileiros e assine o abaixo-assinado em defesa do Código de Defesa do Consumidor.",
    path: "/codigo-de-defesa-do-consumidor",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/superendividamento": {
    title: "Superendividamento: entenda seus direitos e saia das dívidas",
    description:
      "Baixe gratuitamente um guia prático para consultar dívidas, renegociar com segurança e conhecer os direitos de quem está superendividado.",
    path: "/superendividamento",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/catadoresdelixo": {
    title: "Valorização dos catadores de materiais recicláveis",
    description:
      "Conheça a mobilização pela valorização dos catadores, por melhores condições de trabalho, renda, estrutura e direitos sociais.",
    path: "/catadoresdelixo",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/motociclistas": {
    title: "Direitos dos motociclistas do Rio | Mobilização",
    description:
      "Conheça e participe da mobilização em defesa dos motociclistas e trabalhadores que dependem da moto no Rio de Janeiro.",
    path: "/motociclistas",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/seguranca": {
    title: "Foco na Democracia | Segurança Pública",
    description:
      "Cadastre-se para acompanhar mobilizações cívicas sobre segurança pública e projetos de lei em tramitação.",
    path: "/seguranca",
    image: "https://kngofnnx.com/wp-content/uploads/2026/06/plenario-bg.jpg",
  },
  "/molduras": {
    title: "Molduras de campanha | Gutemberg Fonseca",
    description:
      "Escolha uma moldura oficial, personalize com sua foto e compartilhe seu apoio. O processamento acontece no seu próprio dispositivo.",
    path: "/molduras",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/aniversario": {
    title: "Aniversário de Gutemberg Fonseca",
    description: "Página de confirmação do evento de aniversário de Gutemberg Fonseca.",
    path: "/aniversario",
    image: DEFAULT_SOCIAL_IMAGE,
    noindex: true,
  },
  "/evento": {
    title: "Lançamento da campanha | Gutemberg Fonseca",
    description: "Página do evento de lançamento da campanha de Gutemberg Fonseca.",
    path: "/evento",
    image: DEFAULT_SOCIAL_IMAGE,
    noindex: true,
  },
};

export function absoluteUrl(value?: string): string | undefined {
  if (!value) return undefined;
  return new URL(value, SITE_URL).href;
}

export function canonicalUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Gutemberg Fonseca",
    alternateName: "Guto Fonseca",
    url: AUTHOR_URL,
    image: `${SITE_URL}/images/federal/hero/hero-candidato-recorte.png`,
    jobTitle: "Candidato a Deputado Federal",
    description:
      "Especialista em defesa do consumidor e ex-secretário de Estado de Defesa do Consumidor do Rio de Janeiro.",
    knowsAbout: ["Defesa do consumidor", "Cidadania", "Gestão pública", "Segurança pública"],
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: "pt-BR",
    publisher: { "@id": PERSON_ID },
  };
}
