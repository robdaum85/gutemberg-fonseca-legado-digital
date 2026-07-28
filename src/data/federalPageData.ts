import { blogPosts } from "@/data/blogPosts";

const widths = [480, 768, 1024, 1440, 1920] as const;

type ImageFolder =
  | "hero"
  | "trajectory"
  | "experience"
  | "results"
  | "consumer"
  | "people"
  | "cta"
  | "articles";

function responsiveImage(
  folder: ImageFolder,
  baseName: string,
  alt: string,
  ratio: "portrait" | "landscape" = "landscape",
  position = "center center",
) {
  const height = (width: number) =>
    ratio === "portrait" ? Math.round(width * 1.25) : Math.round(width * 0.5625);
  const path = (width: number, extension: "avif" | "webp") =>
    `/images/federal/${folder}/${baseName}-${width}x${height(width)}.${extension}`;

  return {
    alt,
    position,
    width: 1024,
    height: height(1024),
    avifSrcSet: widths.map((width) => `${path(width, "avif")} ${width}w`).join(", "),
    webpSrcSet: widths.map((width) => `${path(width, "webp")} ${width}w`).join(", "),
    fallback: path(1024, "webp"),
  };
}

const recentConsumerArticles = [...blogPosts]
  .filter((post) => post.category === "Defesa do Consumidor")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)
  .map((post) => ({
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    href: `/direitos-do-consumidor/${post.slug}`,
    date: new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "America/Sao_Paulo",
    }).format(new Date(post.date)),
  }));

export const federalPageData = {
  seo: {
    title: "Apresentação Federal | Gutemberg Fonseca",
    description:
      "Protótipo de apresentação da trajetória, resultados e áreas de atuação de Gutemberg Fonseca.",
    canonical: "https://gutembergfonseca.com.br/apresentacao-federal",
    robots: "noindex, nofollow, noarchive",
    googlebot: "noindex, nofollow, noimageindex",
  },
  candidate: {
    name: "Gutemberg Fonseca",
    firstName: "Gutemberg",
    lastName: "Fonseca",
    office: "Apresentação federal — sujeito a confirmação jurídica",
    number: "2255",
    numberLabel: "Número de apresentação",
    slogan: "O Defensor do Consumidor",
  },
  prototype: {
    badge: "PROTÓTIPO",
    ariaLabel: "Aviso importante",
    notice:
      "Página privada de apresentação. Número, candidatura, legenda, dados quantitativos e informações legais dependem de confirmação antes de qualquer publicação oficial.",
    provisionalDataLabel: "DADO PROVISÓRIO",
  },
  navigation: {
    ariaLabel: "Navegação da apresentação",
    logoLabel: "Gutemberg Fonseca — início",
    openMenuLabel: "Abrir menu",
    closeMenuLabel: "Fechar menu",
    links: [
      { label: "Trajetória", href: "#trajetoria" },
      { label: "Resultados", href: "#resultados" },
      { label: "Áreas", href: "#areas" },
      { label: "Consumidor", href: "#consumidor" },
      { label: "Artigos", href: "#artigos" },
    ],
    cta: { label: "Quero apoiar", href: "#contato" },
  },
  hero: {
    eyebrow: "Experiência para cuidar das pessoas",
    description: "18 anos de gestão pública transformadora",
    primaryCta: { label: "Conheça a trajetória", href: "#trajetoria" },
    secondaryCta: { label: "Veja os resultados", href: "#resultados" },
    scrollLabel: "Role para descobrir",
    portrait: responsiveImage(
      "hero",
      "section-01-hero-gutemberg-principal",
      "Retrato de Gutemberg Fonseca",
      "portrait",
      "center bottom",
    ),
  },
  pillars: {
    kicker: "Compromissos",
    title: "Experiência em áreas que mudam a vida das pessoas",
    items: [
      { icon: "scale", title: "Defesa do Consumidor", text: "Informação, fiscalização e proteção contra abusos.", href: "#consumidor" },
      { icon: "shieldCheck", title: "Segurança Pública", text: "Integração, inteligência e prevenção.", href: "#areas" },
      { icon: "building", title: "Gestão Pública", text: "Governança, economia e modernização.", href: "#experiencia" },
      { icon: "medal", title: "Esporte", text: "Acesso, incentivo e políticas estruturantes.", href: "#areas" },
      { icon: "handshake", title: "Relações Institucionais", text: "Diálogo para viabilizar políticas públicas.", href: "#areas" },
    ],
  },
  trajectory: {
    kicker: "Trajetória",
    title: "Uma história construída no serviço público",
    intro:
      "Administrador e especialista em Gestão de Cidades, Marketing e Ciências Políticas, Gutemberg construiu sua trajetória em funções estratégicas no Estado e na capital do Rio de Janeiro.",
    cta: { label: "Conheça essa trajetória", href: "#experiencia" },
    events: [
      { marker: "01", title: "Início da atuação pública", text: "Experiência operacional e administrativa a serviço da população." },
      { marker: "02", title: "Liderança em projetos de segurança", text: "Integração de equipes, inteligência e políticas de prevenção." },
      { marker: "03", title: "Gestão em momentos críticos", text: "Coordenação pública com planejamento, responsabilidade e presença." },
      { marker: "04", title: "Fortalecimento do esporte", text: "Retomada de programas e ampliação do acesso às políticas esportivas." },
      { marker: "05", title: "Defesa do consumidor", text: "Fiscalização, atendimento, conciliação e educação para o consumo." },
    ],
    images: [
      responsiveImage("trajectory", "section-04-trajectory-publico", "Imagem temporária de atuação pública de Gutemberg Fonseca"),
      responsiveImage("trajectory", "section-04-trajectory-seguranca", "Imagem temporária relacionada à segurança pública"),
      responsiveImage("trajectory", "section-04-trajectory-gestao", "Imagem temporária relacionada à gestão pública"),
      responsiveImage("trajectory", "section-04-trajectory-consumidor", "Imagem temporária relacionada à defesa do consumidor"),
    ],
  },
  experience: {
    kicker: "Experiência que gera impacto",
    title: "Método, presença e capacidade de entrega",
    quote: "Política de verdade se faz ouvindo, dialogando e transformando realidades.",
    text: "Uma atuação construída em diferentes áreas do poder público, reunindo planejamento, coordenação de equipes e resposta a momentos críticos.",
    capabilities: ["Reestruturação", "Redução de custos", "Inteligência", "Governança", "Economia", "Modernização"],
    background: responsiveImage("experience", "section-05-experience-urbano", "Cenário urbano temporário do Rio de Janeiro"),
    portrait: responsiveImage("experience", "section-05-experience-retrato", "Retrato temporário de Gutemberg Fonseca", "portrait"),
  },
  results: [
    { value: 470, decimals: 0, prefix: "+", suffix: " mil", label: "consumidores alcançados", description: "Período 2023–2026; fonte pendente.", icon: "users", approved: false },
    { value: 65.8, decimals: 1, prefix: "R$ ", suffix: " mi", label: "em multas aplicadas", description: "Período 2023–2026; fonte pendente.", icon: "scale", approved: false },
    { value: 54.3, decimals: 1, prefix: "R$ ", suffix: " mi", label: "em economia administrativa", description: "Período 2019; fonte pendente.", icon: "building", approved: false },
    { value: 61, decimals: 0, prefix: "", suffix: "%", label: "de redução de roubos na área monitorada", description: "Período 2019; fonte pendente.", icon: "shieldCheck", approved: false },
    { value: 92, decimals: 0, prefix: "", suffix: "", label: "municípios percorridos pelo esporte", description: "Período 2021; fonte pendente.", icon: "medal", approved: false },
  ],
  resultsSection: {
    kicker: "Resultados que transformam",
    title: "Trabalho que pode ser medido",
    validationLabel: "Todos os dados quantitativos aguardam validação documental do cliente.",
  },
  areasSection: {
    kicker: "Áreas de atuação",
    title: "Visão ampla para problemas complexos",
  },
  areas: [
    { icon: "shieldCheck", title: "Segurança Pública", text: "Integração operacional, inteligência e políticas de prevenção." },
    { icon: "scale", title: "Defesa do Consumidor", text: "Fiscalização, orientação, conciliação e combate a práticas abusivas." },
    { icon: "building", title: "Gestão Pública", text: "Reestruturação, governança, controle de custos e modernização." },
    { icon: "medal", title: "Esporte", text: "Acesso, incentivo a atletas e retomada de programas estruturantes." },
    { icon: "siren", title: "Ordem Pública", text: "Coordenação de crise, Defesa Civil e ordenamento urbano." },
    { icon: "handshake", title: "Relações Institucionais", text: "Diálogo institucional para viabilizar recursos e políticas públicas." },
  ],
  consumer: {
    kicker: "Causa de uma vida",
    title: "O consumidor precisa de voz, informação e proteção",
    text: "Da prevenção ao enfrentamento de fraudes e cobranças indevidas, a defesa do consumidor começa pela informação clara e chega onde o cidadão precisa de apoio.",
    points: ["Educação para escolhas mais seguras", "Fiscalização contra práticas abusivas", "Atendimento e conciliação de conflitos", "Proteção diante de golpes e superendividamento"],
    articlesTitle: "Conteúdo recente sobre seus direitos",
    allLabel: "Ver todos os conteúdos",
    allHref: "/direitos-do-consumidor",
    recentArticles: recentConsumerArticles,
  },
  people: {
    kicker: "Perto das pessoas",
    title: "Escutar primeiro. Agir com propósito.",
    titleLine1: "Perto das",
    titleLine2: "pessoas",
    text: "Política pública se constrói no território, em contato direto com famílias, trabalhadores e lideranças locais.",
    galleryLabel: "Acompanhe mais encontros",
    galleryHref: "https://www.instagram.com/gutembergpfonseca/",
    carouselLabel: "Galeria de encontros com a população",
    previousLabel: "Foto anterior",
    nextLabel: "Próxima foto",
    images: [
      responsiveImage("people", "section-09-people-encontro", "Imagem temporária de encontro com a população"),
      responsiveImage("people", "section-09-people-escuta", "Imagem temporária de escuta com moradores"),
      responsiveImage("people", "section-09-people-territorio", "Imagem temporária de agenda no território"),
      responsiveImage("people", "section-09-people-dialogo", "Imagem temporária de diálogo com trabalhadores"),
      responsiveImage("people", "section-09-people-rio", "Imagem temporária do Rio de Janeiro"),
    ],
  },
  articles: {
    kicker: "Artigos recentes",
    title: "Informação para defender direitos",
    allLabel: "Ver todos os artigos",
    allHref: "/direitos-do-consumidor",
    items: recentConsumerArticles,
  },
  finalCall: {
    eyebrow: "Uma nova missão",
    title: "Experiência para defender. Energia para transformar.",
    text: "Uma apresentação de ideias, trajetória e compromisso com as pessoas.",
    cta: { label: "Conheça essa nova missão", href: "#contato" },
    support: {
      eyebrow: "Faça parte",
      title: "Sua voz ajuda a construir essa nova missão.",
      cta: { label: "Quero apoiar", href: "#contato" },
      photo: responsiveImage("cta", "section-11-cta-apoio", "Imagem temporária de Gutemberg Fonseca próximo das pessoas"),
    },
  },
  form: {
    kicker: "Participe",
    title: "Vamos construir essa conversa juntos",
    text: "Preencha os dados para preparar uma mensagem de contato pelo WhatsApp.",
    fields: {
      name: { label: "Nome", placeholder: "Seu nome" },
      phone: { label: "WhatsApp", placeholder: "(00) 00000-0000" },
      email: { label: "E-mail", placeholder: "voce@exemplo.com" },
      city: { label: "Município", placeholder: "Seu município" },
      neighborhood: { label: "Bairro", placeholder: "Seu bairro" },
      interest: { label: "Área de interesse", placeholder: "Selecione uma área" },
      message: { label: "Mensagem opcional", placeholder: "Conte o que você espera dessa conversa" },
      consent: "Autorizo o tratamento dos meus dados pessoais para retorno de contato e envio de informações relacionadas a esta iniciativa, nos termos da Política de Privacidade. Posso revogar este consentimento a qualquer momento.",
    },
    interests: ["Defesa do Consumidor", "Segurança Pública", "Gestão Pública", "Esporte", "Ordem Pública", "Relações Institucionais"],
    submitLabel: "Preparar mensagem no WhatsApp",
    loadingLabel: "Preparando mensagem…",
    successMessage: "Mensagem preparada. O WhatsApp será aberto para você confirmar o envio.",
    errorMessage: "Não foi possível preparar a mensagem. Revise os campos e tente novamente.",
    rateLimitMessage: "Aguarde um minuto antes de preparar outra mensagem.",
    requiredMessage: "Preencha este campo.",
    invalidEmailMessage: "Informe um e-mail válido.",
    invalidPhoneMessage: "Informe um WhatsApp com DDD.",
    consentMessage: "É necessário autorizar o tratamento dos dados.",
    whatsappIntro: "Olá! Vim pela página de apresentação federal.",
    honeypotLabel: "Não preencha este campo",
    consentVersion: "federal-contact-v1-2026-07-20",
    origin: "/apresentacao-federal",
    consentAuditLabel: "Consentimento",
  },
  contacts: {
    phone: "+55 21 92011-2255",
    whatsapp: "5521920112255",
    email: "",
    instagramLabel: "@gutembergpfonseca",
    instagramUrl: "https://www.instagram.com/gutembergpfonseca/",
    facebookUrl: "https://www.facebook.com/gutembergpfonseca",
    youtubeUrl: "https://www.youtube.com/@gutembergpfonseca",
    address: "",
    hours: "",
  },
  footer: {
    navigationTitle: "Navegação",
    contactTitle: "Contato",
    newsletter: {
      title: "Receba novidades",
      text: "Cadastre seu e-mail para acompanhar conteúdos e atualizações.",
      placeholder: "Seu melhor e-mail",
      cta: "Cadastrar",
      loadingLabel: "Cadastrando…",
      successMessage: "E-mail preparado para cadastro.",
      errorMessage: "Informe um e-mail válido ou tente novamente em instantes.",
    },
  },
  legal: {
    campaignLegalName: "",
    campaignCnpj: "",
    candidateNumber: "",
    partyName: "",
    federationName: "",
    legalDisclaimer: "Protótipo privado. Conteúdo sujeito a revisão jurídica, factual e eleitoral.",
    isApproved: false,
    pendingLabel: "Informações eleitorais aguardando validação do jurídico.",
    copyright: "Gutemberg Fonseca. Todos os direitos reservados.",
    copyrightYear: "2026",
    privacyLabel: "Política de privacidade",
    privacyHref: "/#privacidade",
    termsLabel: "Termos de uso",
    termsHref: "/#termos",
  },
  accessibility: {
    skipLabel: "Pular para o conteúdo",
  },
} as const;

export type FederalPageData = typeof federalPageData;
