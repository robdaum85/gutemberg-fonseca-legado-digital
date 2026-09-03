import {
  CSSProperties,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accessibility,
  ArrowUpRight,
  BadgeCheck,
  BadgeDollarSign,
  BookOpenCheck,
  ChevronDown,
  ChevronUp,
  CircleX,
  Download,
  Facebook,
  FileText,
  Fuel,
  Handshake,
  Headphones,
  Instagram,
  Landmark,
  LifeBuoy,
  Linkedin,
  LockKeyhole,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  Network,
  PackageCheck,
  Pause,
  Play,
  ReceiptText,
  RefreshCcw,
  ShieldAlert,
  ShoppingCart,
  Square,
  Twitter,
  UtilityPole,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TikTokIcon, ThreadsIcon } from "@/components/SocialIcons";
import { WHATSAPP_NUMBER } from "@/config/mobilizacao";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getPostCategoryUrl, getPostsByCategory } from "@/lib/blogUtils";
import { useCampaignAnalytics } from "@/lib/campaignAnalytics";
import { useSeo } from "@/lib/useSeo";
import { PhotoFramesSection } from "@/components/molduras/PhotoFramesSection";
import "./ApresentacaoFederalPage.css";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
import "@/components/federal/FederalSections.css";

type RevealDirection = "up" | "down" | "left" | "right" | "fade";
type RevealElement = "div" | "article" | "section" | "li";

type MotionStyle = CSSProperties & {
  "--reveal-delay"?: string;
  "--reveal-duration"?: string;
  "--reveal-distance"?: string;
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function useParallax<T extends HTMLElement>(speed: number, maxMovement = 60) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion || !desktop.matches) {
        element.style.setProperty("--parallax-y", "0px");
        return;
      }

      const movement = Math.max(-maxMovement, Math.min(window.scrollY * speed, maxMovement));
      element.style.setProperty("--parallax-y", `${movement.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    desktop.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      desktop.removeEventListener("change", requestUpdate);
      window.cancelAnimationFrame(frame);
      element.style.removeProperty("--parallax-y");
    };
  }, [maxMovement, reducedMotion, speed]);

  return ref;
}

function Reveal({
  children,
  as: Tag = "div",
  className = "",
  direction = "up",
  delay = 0,
  duration = 650,
  distance = 28,
  threshold = 0.14,
}: {
  children: ReactNode;
  as?: RevealElement;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px -6%" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion, threshold]);

  const style: MotionStyle = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
    "--reveal-distance": `${distance}px`,
  };

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal--${direction} ${visible ? "is-visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

function AnimatedCounter({ result }: { result: Result }) {
  const match = result.value.match(/^(.*?)(\d[\d.,]*)(.*?)$/);
  const prefix = match?.[1] ?? "";
  const numericValue = Number((match?.[2] ?? "0").replace(/\./g, "").replace(",", "."));
  const suffix = match?.[3] ?? "";

  return (
    <p className="r-value" aria-label={`${result.value}${result.unit ? ` ${result.unit}` : ""}, ${result.label}`}>
      <span aria-hidden="true">{prefix}<span className="r-number" data-gsap-value={numericValue}>{numericValue.toLocaleString("pt-BR")}</span>{suffix} {result.unit && <span className="unit">{result.unit}</span>}</span>
    </p>
  );
}

function ScrollProgress({ onScrolledChange }: { onScrolledChange: (scrolled: boolean) => void }) {
  const [progress, setProgress] = useState(0);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      const scrolled = window.scrollY > 80;
      if (scrolled !== scrolledRef.current) {
        scrolledRef.current = scrolled;
        onScrolledChange(scrolled);
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [onScrolledChange]);

  return <span className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

function useFederalGsapPilot(disabled: boolean) {
  const scope = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (disabled || document.documentElement.classList.contains("a11y-reduce-motion")) return;

    gsap.registerPlugin(ScrollTrigger);
    let mediaContext: ReturnType<typeof gsap.matchMedia> | undefined;
    const gsapContext = gsap.context(() => {
        gsap.fromTo(
          ".pillar",
          { autoAlpha: 0, y: 42, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.78,
            stagger: 0.12,
            ease: "back.out(1.25)",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: ".pillars-card", start: "top 94%", once: true },
          },
        );

        gsap.utils.toArray<HTMLElement>(".r-number").forEach((number) => {
          const target = Number(number.dataset.gsapValue ?? 0);
          const counter = { value: 0 };
          number.textContent = "0";
          gsap.to(counter, {
            value: target,
            duration: 1.8,
            ease: "power2.out",
            snap: { value: 1 },
            onUpdate: () => {
              number.textContent = Math.round(counter.value).toLocaleString("pt-BR");
            },
            scrollTrigger: {
              trigger: number.closest(".r-stat"),
              start: "top 82%",
              once: true,
            },
          });
        });

        const peopleTimeline = gsap.timeline({
          scrollTrigger: { trigger: ".people", start: "top 82%", once: true },
        });
        peopleTimeline
          .fromTo(
            [".people .p-title", ".people .p-line", ".people .p-text"],
            { autoAlpha: 0, x: -48 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.7,
              stagger: 0.14,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
            },
          )
          .fromTo(
            ".p-mosaic img",
            { autoAlpha: 0, y: 48, scale: 0.94 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.72,
              stagger: 0.09,
              ease: "back.out(1.15)",
              clearProps: "transform,opacity,visibility",
            },
            "-=0.28",
          );

        gsap.fromTo(
          ".a-item",
          { autoAlpha: 0, y: 48, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: ".a-grid", start: "top 84%", once: true },
          },
        );

        mediaContext = gsap.matchMedia();
        mediaContext.add("(min-width: 768px)", () => {
          gsap.utils.toArray<HTMLElement>(".t-slice img").forEach((image) => {
            gsap.fromTo(
              image,
              { yPercent: -4, scale: 1.06 },
              {
                yPercent: 4,
                scale: 1.06,
                ease: "none",
                scrollTrigger: {
                  trigger: image.closest(".t-slice"),
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          });

          gsap.fromTo(
            ".p-mosaic",
            { y: 22 },
            {
              y: -22,
              ease: "none",
              scrollTrigger: {
                trigger: ".people",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        });
      }, scope);
    ScrollTrigger.refresh();

    return () => {
      mediaContext?.revert();
      gsapContext.revert();
    };
  }, [disabled]);

  return scope;
}

type CampaignIconName =
  | "shield"
  | "family"
  | "briefcase"
  | "heart"
  | "education"
  | "consumer"
  | "people"
  | "pin"
  | "document"
  | "medal"
  | "money"
  | "play"
  | "arrow"
  | "gallery"
  | "phone"
  | "email"
  | "clock"
  | "handshake"
  | "smartphone"
  | "menu";

type Pillar = {
  title: string;
  description: string;
  href: string;
  icon: CampaignIconName;
};

type Result = {
  value: string;
  unit?: string;
  label: string;
  description: string;
  tone: "green" | "yellow";
  icon: CampaignIconName;
};

type Area = {
  title: string;
  description: string;
  icon: CampaignIconName;
};

type Proposal = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const pillars: Pillar[] = [
  { title: "Defesa do Consumidor", description: "Mais direitos e respeito", href: "#consumidor", icon: "shield" },
  { title: "Família & Valores", description: "Apoio a quem sustenta o Brasil", href: "#areas", icon: "family" },
  { title: "Geração de Empregos", description: "Oportunidades e renda para nossa gente", href: "#areas", icon: "briefcase" },
  { title: "Saúde de Qualidade", description: "Mais acesso e atendimento digno", href: "#areas", icon: "heart" },
  { title: "Educação que Transforma", description: "Investimento no futuro do país", href: "#areas", icon: "education" },
];

const results: Result[] = [
  { value: "+120", unit: "mil", label: "Pessoas beneficiadas", description: "com ações e projetos em todo o Brasil", tone: "green", icon: "people" },
  { value: "+85", label: "Municípios alcançados", description: "Presença constante e atuante", tone: "yellow", icon: "pin" },
  { value: "+240", label: "Projetos apresentados", description: "Leis e iniciativas em defesa do cidadão", tone: "green", icon: "document" },
  { value: "+160", label: "Parcerias estratégicas", description: "Com instituições públicas e privadas", tone: "yellow", icon: "medal" },
  { value: "+R$ 350", unit: "mi", label: "Em recursos destinados", description: "Para saúde, educação, infraestrutura e mais", tone: "green", icon: "money" },
];

const areas: Area[] = [
  { title: "Defesa do Consumidor", description: "Mais proteção, informação e respeito aos seus direitos.", icon: "consumer" },
  { title: "Saúde de Qualidade", description: "Lutamos por mais acesso, estrutura e atendimento humanizado.", icon: "heart" },
  { title: "Educação que Transforma", description: "Apoiamos projetos que preparam nossas crianças para o futuro.", icon: "education" },
  { title: "Emprego e Renda", description: "Incentivo ao trabalho, ao empreendedorismo e à qualificação.", icon: "briefcase" },
  { title: "Família e Valores", description: "Defesa da família como base de uma sociedade forte e justa.", icon: "family" },
  { title: "Segurança e Cidadania", description: "Apoio às forças de segurança e políticas que protegem o cidadão.", icon: "shield" },
];

const proposals: Proposal[] = [
  { title: "Direito ao Reparo", description: "Ampliar o acesso a peças, assistência técnica e reparos após a garantia.", icon: Wrench },
  { title: "Renegociação de dívidas", description: "Criar períodos nacionais de estímulo à negociação de débitos.", icon: Handshake },
  { title: "Combate ao superendividamento", description: "Fortalecer mecanismos de prevenção e tratamento previstos no CDC.", icon: LifeBuoy },
  { title: "Preços transparentes", description: "Combater cobranças ocultas e facilitar a comparação entre preço à vista e parcelado.", icon: BadgeDollarSign },
  { title: "Atendimento humano nos SACs", description: "Assegurar alternativa de atendimento por pessoa, inclusive em sistemas automatizados.", icon: Headphones },
  { title: "SAC acessível", description: "Ampliar atendimento adaptado para pessoas com deficiência e oferta de Libras.", icon: Accessibility },
  { title: "Combate aos “dark patterns”", description: "Impedir interfaces digitais desenhadas para induzir decisões contra o interesse do consumidor.", icon: MousePointerClick },
  { title: "Proteção contra renovação automática abusiva", description: "Reforçar informação prévia e mecanismos de cancelamento.", icon: RefreshCcw },
  { title: "Pós-venda obrigatório", description: "Estabelecer padrões mínimos de suporte depois da compra.", icon: PackageCheck },
  { title: "Cancelamento simplificado", description: "Permitir cancelamento de serviços por canais tão acessíveis quanto os utilizados para contratação.", icon: CircleX },
  { title: "Proteção contra publicidade enganosa", description: "Reforçar mecanismos contra alegações falsas ou sem comprovação.", icon: Megaphone },
  { title: "Fiscalização de produtos falsificados", description: "Ampliar ações integradas contra falsificação e comércio irregular.", icon: BadgeCheck },
  { title: "Combate a fraudes digitais", description: "Criar mecanismos de proteção para consumidores vítimas de golpes eletrônicos.", icon: ShieldAlert },
  { title: "Proteção contra cobranças indevidas", description: "Fortalecer mecanismos de restituição e responsabilização.", icon: ReceiptText },
  { title: "Transparência em contratos digitais", description: "Exigir informações claras sobre preço, renovação, cancelamento e período de contratação.", icon: FileText },
  { title: "Proteção de dados do consumidor", description: "Reforçar transparência sobre utilização de dados em relações de consumo.", icon: LockKeyhole },
  { title: "Defesa do consumidor nos serviços essenciais", description: "Aprimorar mecanismos de proteção em água, energia, telefonia e outros serviços.", icon: UtilityPole },
  { title: "Fiscalização de combustíveis", description: "Ampliar ações contra adulteração, fraude de quantidade e irregularidades na comercialização.", icon: Fuel },
  { title: "Proteção nas compras pela internet", description: "Facilitar reclamações, cancelamentos e ressarcimentos em operações digitais.", icon: ShoppingCart },
  { title: "Educação para o consumo", description: "Criar programas de educação financeira e de direitos do consumidor.", icon: BookOpenCheck },
  { title: "Integração dos órgãos de defesa do consumidor", description: "Melhorar a cooperação entre órgãos federais, estaduais e municipais.", icon: Landmark },
  { title: "Fortalecimento do Sistema Nacional de Defesa do Consumidor", description: "Ampliar estrutura, fiscalização, atendimento e capacidade de resposta.", icon: Network },
];

function ProposalList({ items, start }: { items: Proposal[]; start: number }) {
  return (
    <ol className="proposals-list" start={start}>
      {items.map((proposal, index) => {
        const ProposalIcon = proposal.icon;
        const number = start + index;

        return (
          <Reveal
            as="li"
            className="proposal-item"
            direction="up"
            delay={Math.min(index, 3) * 45}
            key={proposal.title}
          >
            <span className="proposal-icon" aria-hidden="true"><ProposalIcon /></span>
            <span className={`proposal-number ${number === 13 ? "proposal-number--twelve-plus-one" : ""}`} aria-hidden="true">
              {number === 13 ? "12+1" : number}
            </span>
            <div className="proposal-copy">
              <h3>{proposal.title}</h3>
              <p>{proposal.description}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

const legacyTimeline = [
  { year: "2007", title: "Primeiros passos na gestão pública", description: "Atuação ligada ao desenvolvimento do SINE e à ampliação de oportunidades para trabalhadores em busca de emprego." },
  { year: "2008–2011", title: "Câmara Municipal do Rio", description: "Experiência como chefe de gabinete, acompanhando projetos, equipes e demandas diretas da população." },
  { year: "2012", title: "Meio ambiente", description: "Passagem pela Subsecretaria de Meio Ambiente de São João de Meriti." },
  { year: "2013", title: "Turismo, esporte e lazer", description: "Gestão municipal em Japeri, reunindo políticas de turismo, esporte e lazer." },
  { year: "2019", title: "Articulação estadual", description: "Atuação na Secretaria de Governo do Estado e em iniciativas de integração como o Segurança Presente." },
  { year: "2020", title: "Ordem pública e gestão de crise", description: "Coordenação de ações urbanas e participação no Gabinete de Crise durante a pandemia de Covid-19." },
  { year: "2021", title: "Esporte como inclusão", description: "Retomada de programas de incentivo, apoio a atletas e ampliação da estrutura esportiva." },
  { year: "2023", title: "Defesa do consumidor", description: "Fortalecimento do atendimento, da fiscalização, da conciliação e das ações contra práticas abusivas." },
] as const;

const legacyEvidence = [
  { value: "1,3 milhão", label: "de atendimentos", description: "Volume atribuído à estrutura SEDCON e PROCON-RJ desde 2023 no acervo institucional." },
  { value: "+ R$ 14 mi", label: "em dívidas renegociadas", description: "Resultado citado para mutirões do programa Dívida Zero RJ." },
  { value: "600", label: "bolsas para atletas", description: "Apoio financeiro citado para atletas e paratletas do estado." },
  { value: "+15", label: "campos esportivos", description: "Estruturas de grama sintética citadas no material histórico da gestão." },
] as const;

const legacyCases = [
  { icon: "shield" as const, eyebrow: "Gestão de crise", title: "Decidir sob pressão", description: "Experiência na coordenação de respostas públicas durante a pandemia, conciliando ordem urbana, serviços essenciais e proteção da população." },
  { icon: "consumer" as const, eyebrow: "Defesa do consumidor", title: "Fiscalização presente nas ruas", description: "Ações contra cobranças indevidas, venda casada, produtos vencidos e falhas na prestação de serviços essenciais." },
  { icon: "medal" as const, eyebrow: "Esporte e oportunidade", title: "Inclusão que chega aos territórios", description: "Programas de incentivo, recuperação de espaços e aproximação das políticas esportivas com atletas e comunidades." },
] as const;

const ELECTION_DATE = "2026-10-04";
const ELECTION_TIMESTAMP = Date.parse("2026-10-04T00:00:00-03:00");
const SITE_LAUNCH_TIMESTAMP = Date.parse("2026-08-16T00:01:00-03:00");

type SiteLaunchCountdown = {
  active: boolean;
  hours: number;
  minutes: number;
  seconds: number;
};

function getSiteLaunchCountdown(now = new Date()): SiteLaunchCountdown {
  const remainingSeconds = Math.max(0, Math.ceil((SITE_LAUNCH_TIMESTAMP - now.getTime()) / 1_000));

  return {
    active: remainingSeconds > 0,
    hours: Math.floor(remainingSeconds / 3_600),
    minutes: Math.floor((remainingSeconds % 3_600) / 60),
    seconds: remainingSeconds % 60,
  };
}

type ElectionCountdown = {
  status: "counting" | "today" | "finished";
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getElectionCountdown(now = new Date()): ElectionCountdown {
  const saoPauloDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  if (saoPauloDate === ELECTION_DATE) {
    return { status: "today", days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const remainingSeconds = Math.max(0, Math.floor((ELECTION_TIMESTAMP - now.getTime()) / 1_000));
  if (remainingSeconds === 0) {
    return { status: "finished", days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    status: "counting",
    days: Math.floor(remainingSeconds / 86_400),
    hours: Math.floor((remainingSeconds % 86_400) / 3_600),
    minutes: Math.floor((remainingSeconds % 3_600) / 60),
    seconds: remainingSeconds % 60,
  };
}

const trajectoryImages = [
  {
    src: "/images/federal/trajectory/section-02-trajetoria-institucional-1200x1600.webp",
    alt: "Gutemberg Fonseca em agenda institucional",
  },
  {
    src: "/images/federal/trajectory/section-02-trajetoria-dialogo-cidadao-1200x1600.webp",
    alt: "Gutemberg Fonseca em diálogo com cidadãos",
  },
  {
    src: "/images/federal/trajectory/section-02-trajetoria-acao-publica-1200x1600.webp",
    alt: "Gutemberg Fonseca durante ação pública",
  },
  {
    src: "/images/federal/trajectory/section-02-trajetoria-comunidade-1200x1600.webp",
    alt: "Gutemberg Fonseca próximo à comunidade",
  },
] as const;

const peopleImages = [
  { src: "/images/federal/people/section-07-pessoas-abraco-principal.webp", alt: "Gutemberg Fonseca abraçando um participante durante agenda comunitária", className: "p-big", position: "center center" },
  { src: "/images/federal/people/section-07-pessoas-agenda-publica.webp", alt: "Gutemberg Fonseca caminhando durante agenda pública", position: "58% center" },
  { src: "/images/federal/people/section-07-pessoas-plenario.webp", alt: "Gutemberg Fonseca acompanhando uma cerimônia no plenário", position: "58% center" },
  { src: "/images/federal/people/section-07-pessoas-cerimonia.webp", alt: "Gutemberg Fonseca em cerimônia institucional", position: "48% 32%" },
  { src: "/images/federal/people/section-07-pessoas-dialogo-evento.webp", alt: "Gutemberg Fonseca dialogando com participantes de um evento", position: "58% center" },
  { src: "/images/federal/people/section-07-pessoas-perfil-institucional.webp", alt: "Gutemberg Fonseca em solenidade oficial", position: "52% 30%" },
  { src: "/images/federal/people/section-07-pessoas-circulacao-evento.webp", alt: "Gutemberg Fonseca circulando entre participantes de um evento", position: "58% center" },
  { src: "/images/federal/people/section-07-pessoas-homenagem.webp", alt: "Gutemberg Fonseca recebendo uma homenagem", position: "55% 30%" },
  { src: "/images/federal/people/section-07-pessoas-encontro-noturno.webp", alt: "Gutemberg Fonseca chegando a um encontro institucional", position: "58% center" },
  { src: "/instagram/DayxovqGh0O.jpg", alt: "Gutemberg Fonseca durante entrega de homenagem", position: "center 25%" },
  { src: "/instagram/DawJ2iwmt_B.jpg", alt: "Gutemberg Fonseca ao lado de apoiadores em um encontro público", position: "center center" },
  { src: "/instagram/DaOxCd5GoEH.jpg", alt: "Gutemberg Fonseca reunido com moradores e apoiadores", position: "center 40%" },
  { src: "/instagram/DaOdOa5vZRy.jpg", alt: "Gutemberg Fonseca durante uma agenda de trabalho", position: "center 28%" },
] as const;

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/gutembergpfonseca/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gutembergfonseca/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/gutembergpfonseca", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/gutopfonseca", label: "Twitter" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@gutembergpfonseca_?_r=1&_t=ZS-94xYYr9aX4x", label: "TikTok" },
  { icon: ThreadsIcon, href: "https://www.threads.com/@gutembergpfonseca?xmt=AQF0XDiAQ-9DqUfAwkcvQRQ3-spVkHjM2r0URsdLwXFy_ww", label: "Threads" },
] as const;

const consumerArticles = getPostsByCategory("Defesa do Consumidor")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

const instagramHighlights = [
  { href: "https://www.instagram.com/p/DcChFFymgG4/?igsh=Z2RuYTVqNmxybXpw", image: "/instagram/DcChFFymgG4.jpg", alt: "Gutemberg Fonseca reunido com lideranças e apoiadores" },
  { href: "https://www.instagram.com/p/Db_wTLyiQVO/?igsh=MXp2cHcydHV1ZzZw", image: "/instagram/Db_wTLyiQVO.webp", alt: "Convite de Gutemberg Fonseca para o Resgate do Brasil em Copacabana" },
  { href: "https://www.instagram.com/reel/Db_tHaZJgFu/?igsh=cWJ3bmVxYmExNno0", image: "/instagram/Db_tHaZJgFu.jpg", alt: "Gutemberg Fonseca falando sobre transformação em entrevista" },
] as const;

const consumerArmyActions = [
  { label: "Quero ser apoiador", icon: "people" as const, href: buildWhatsAppUrl("APOIADOR", { Origem: "Página federal", Interesse: "Quero fazer parte do Exército do Consumidor como apoiador." }) },
  { label: "Quero ser liderança", icon: "medal" as const, href: buildWhatsAppUrl("LIDERANÇA", { Origem: "Página federal", Interesse: "Quero atuar como liderança do Exército do Consumidor na minha comunidade." }) },
  { label: "Fazer uma denúncia", icon: "shield" as const, href: buildWhatsAppUrl("DENÚNCIA", { Origem: "Página federal", Interesse: "Quero relatar uma situação que pode violar direitos do consumidor." }) },
] as const;

const gutoWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, meu candidato, tudo bem?  cheguei pelo site, gostaria de conversar com você!")}`;
const supportWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Quero apoiar")}`;

function CampaignIcon({ name, className }: { name: CampaignIconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "shield": return <svg {...common}><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "family": return <svg {...common}><circle cx="8" cy="7" r="3"/><circle cx="16" cy="7" r="3"/><path d="M2 21v-1a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v1M14 14h2a6 6 0 0 1 6 6v1"/></svg>;
    case "briefcase": return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></svg>;
    case "heart": return <svg {...common}><path d="M20.8 6.6a5 5 0 0 0-8.1-1.3L12 6l-.7-.7a5 5 0 1 0-7 7L12 20l7.8-7.7a5 5 0 0 0 1-5.7z"/><path d="M7.5 12H10l1.5-2.5L13 13l1.2-1.8h2.3"/></svg>;
    case "education": return <svg {...common}><path d="M2 9l10-5 10 5-10 5L2 9z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6"/></svg>;
    case "consumer": return <svg {...common}><circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h3l2.6 12.5a2 2 0 0 0 2 1.5h7.7a2 2 0 0 0 2-1.6L21 7H6"/></svg>;
    case "people": return <svg {...common}><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.6A5.5 5.5 0 0 1 22 19.8"/></svg>;
    case "pin": return <svg {...common}><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>;
    case "document": return <svg {...common}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>;
    case "medal": return <svg {...common}><circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 21l5-2.6L17 21l-1.5-7.5"/></svg>;
    case "money": return <svg {...common}><circle cx="12" cy="12" r="9.5"/><path d="M12 6.5v11M15 9a3 3 0 0 0-3-1.5c-1.7 0-3 .9-3 2.2s1.2 1.9 3 2.3 3 1 3 2.3-1.3 2.2-3 2.2A3 3 0 0 1 9 16"/></svg>;
    case "play": return <svg {...common} fill="currentColor"><circle cx="12" cy="12" r="11" fill="#04220f" stroke="none"/><path d="M10 8.5v7l6-3.5-6-3.5z" fill="#ffd400" stroke="none"/></svg>;
    case "arrow": return <svg {...common} strokeWidth={2.4}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "gallery": return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.6"/><path d="M21 16l-5-5-6 6-2.5-2.5L3 19"/></svg>;
    case "phone": return <svg {...common}><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c1 .3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>;
    case "email": return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>;
    case "clock": return <svg {...common}><circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3.5 2"/></svg>;
    case "handshake": return <svg {...common}><path d="m8.5 11.5 2 2a2 2 0 0 0 2.8 0l3.2-3.2"/><path d="m14 8 2-2 5 5-6.2 6.2a2 2 0 0 1-2.8 0L6.8 12"/><path d="m10 7-2-1-5 5 5.5 5.5"/></svg>;
    case "smartphone": return <svg {...common}><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 5h4M11 18h2"/><path d="m9 12 2 2 4-4"/></svg>;
    case "menu": return <svg {...common} strokeWidth={2.4}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
  }
}

function PartyLogo({ className = "" }: { className?: string }) {
  return (
    <img
      className={`party-logo ${className}`}
      src="/images/federal/brand/logo-pl.png"
      alt="Partido Liberal"
      width="842"
      height="842"
      decoding="async"
    />
  );
}

const heroPortrait = {
  fallback: "/images/federal/hero/hero-candidato-recorte.png",
  webp: "/images/federal/hero/hero-candidato-recorte.webp",
  width: 1800,
  height: 2250,
} as const;

const fileLabel = (path: string) => {
  const fileName = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "Novo registro";
  return fileName
    .replace(/^\d+[\s_-]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const galleryImports = import.meta.glob(
  "/src/assets/fotos/*.{avif,jpg,jpeg,png,webp}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const jingleImports = import.meta.glob(
  "/src/assets/jingles/*.{m4a,mp3,ogg,wav}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const driveGalleryImages = Object.entries(galleryImports)
  .sort(([left], [right]) => left.localeCompare(right, "pt-BR"))
  .map(([path, src], index) => ({
    src,
    alt: /^foto galeria$/i.test(fileLabel(path))
      ? `Foto da campanha ${index + 1}`
      : fileLabel(path),
    position: "center center",
  }));

const campaignJingles = [
  ...Object.entries(jingleImports)
    .sort(([left], [right]) => left.localeCompare(right, "pt-BR"))
    .map(([, src], index) => ({ title: `Jingle ${index + 2}`, src, isTheme: false })),
  { title: "Jingle 1", src: "/audio/jingle-campanha-2255.mp3", isTheme: true },
];

export default function FederalPreviewPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [campaignPopupOpen, setCampaignPopupOpen] = useState(false);
  const [jingleStatus, setJingleStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [activeJingleIndex, setActiveJingleIndex] = useState(campaignJingles.length - 1);
  const [jinglePlaylistOpen, setJinglePlaylistOpen] = useState(false);
  const [activePeopleImageIndex, setActivePeopleImageIndex] = useState(0);
  const [siteLaunchCountdown, setSiteLaunchCountdown] = useState(getSiteLaunchCountdown);
  const [electionCountdown, setElectionCountdown] = useState(getElectionCountdown);
  const launchGateRef = useRef<HTMLDivElement>(null);
  const campaignPopupCloseRef = useRef<HTMLButtonElement>(null);
  const jingleAudioRef = useRef<HTMLAudioElement>(null);
  const confirmationAudioRef = useRef<HTMLAudioElement>(null);
  const galleryImages = [...driveGalleryImages, ...peopleImages];
  const activePeopleImage = galleryImages[activePeopleImageIndex] ?? galleryImages[0];
  const activeJingle = campaignJingles[activeJingleIndex] ?? campaignJingles[0];
  const reducedMotion = useReducedMotion();
  const gsapScopeRef = useFederalGsapPilot(reducedMotion);
  const flagGlobeRef = useParallax<HTMLDivElement>(0.18);
  const heroPortraitRef = useParallax<HTMLDivElement>(0.04);

  useSeo({
    title: "Gutemberg Fonseca 2255 | O Federal do Consumidor",
    description: "Conheça a trajetória, os resultados e as propostas de Gutemberg Fonseca para defender o consumidor no Rio e em Brasília.",
    canonical: "https://gutembergfonseca.com.br/",
    image: "https://gutembergfonseca.com.br/images/federal/social/og-campanha-2255.png",
  });
  useCampaignAnalytics();

  useEffect(() => {
    document.body.classList.add("federal-page");
    return () => document.body.classList.remove("federal-page");
  }, []);

  useEffect(() => {
    const updateLaunchCountdown = () => setSiteLaunchCountdown(getSiteLaunchCountdown());
    updateLaunchCountdown();
    const interval = window.setInterval(updateLaunchCountdown, 250);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateCountdown = () => setElectionCountdown(getElectionCountdown());
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (siteLaunchCountdown.active) return;

    let popupTimer = 0;
    const schedulePopup = () => {
      window.clearTimeout(popupTimer);
      popupTimer = window.setTimeout(() => setCampaignPopupOpen(true), 700);
    };

    if (window.localStorage.getItem("gf_cookie_consent")) {
      schedulePopup();
    } else {
      window.addEventListener("gf:cookie-consent", schedulePopup, { once: true });
    }

    return () => {
      window.clearTimeout(popupTimer);
      window.removeEventListener("gf:cookie-consent", schedulePopup);
    };
  }, [siteLaunchCountdown.active]);

  useEffect(() => {
    if (!siteLaunchCountdown.active) return;

    const previousOverflow = document.body.style.overflow;
    const keepFocusOnGate = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const gate = launchGateRef.current;
      if (!gate) return;
      const focusable = Array.from(gate.querySelectorAll<HTMLElement>("a[href]"));
      if (!focusable.length) {
        event.preventDefault();
        gate.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === gate)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", keepFocusOnGate);
    launchGateRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", keepFocusOnGate);
    };
  }, [siteLaunchCountdown.active]);

  useEffect(() => {
    if (!campaignPopupOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCampaignPopupOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    campaignPopupCloseRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [campaignPopupOpen]);

  const playJingle = async (restart = false) => {
    const audio = jingleAudioRef.current;
    if (!audio) return;

    if (restart) audio.currentTime = 0;
    audio.volume = 0.65;

    try {
      await audio.play();
      setJingleStatus("playing");
    } catch {
      setJingleStatus("paused");
    }
  };

  const pauseJingle = () => {
    jingleAudioRef.current?.pause();
    setJingleStatus("paused");
  };

  const stopJingle = () => {
    const audio = jingleAudioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setJingleStatus("idle");
  };

  const selectJingle = (index: number) => {
    const audio = jingleAudioRef.current;
    audio?.pause();
    if (audio) audio.currentTime = 0;
    setJingleStatus("idle");
    setActiveJingleIndex(index);
    setJinglePlaylistOpen(false);
    window.requestAnimationFrame(() => {
      void playJingle(true);
    });
  };

  const sharePhoto = (network: "whatsapp" | "facebook" | "x") => {
    const photoUrl = new URL(activePeopleImage.src, window.location.origin).href;
    const message = "Veja esta foto da campanha de Gutemberg Fonseca 2255";
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${message}: ${photoUrl}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(photoUrl)}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(photoUrl)}`,
    };

    window.open(shareUrls[network], "_blank", "noopener,noreferrer");
  };

  const playConfirmationSound = () => {
    const audio = confirmationAudioRef.current;
    if (!audio) return Promise.resolve();

    audio.pause();
    audio.currentTime = 0;

    return new Promise<void>((resolve) => {
      const finish = () => {
        audio.removeEventListener("ended", finish);
        audio.removeEventListener("error", finish);
        resolve();
      };

      audio.addEventListener("ended", finish, { once: true });
      audio.addEventListener("error", finish, { once: true });
      audio.play().catch(finish);
    });
  };

  const handleVoteClick = () => {
    setCampaignPopupOpen(false);
    void playConfirmationSound().then(() => playJingle(true));
  };

  return (
    <>
      <a className="skip" href="#main">Pular para o conteúdo</a>
      {siteLaunchCountdown.active && (
        <div ref={launchGateRef} className="site-launch-gate" role="dialog" aria-modal="true" aria-labelledby="site-launch-title" tabIndex={-1}>
          <div className="site-launch-card">
            <img src="/lovable-uploads/c003fb8b-1544-42bc-881b-af1b83f1ac15.png" alt="Gutemberg Fonseca" width="986" height="405" decoding="async"/>
            <nav className="site-launch-social" aria-label="Redes sociais de Gutemberg Fonseca">
              {socialLinks.map(({ icon: SocialIcon, href, label }) => <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} data-campaign-event="social_click" data-campaign-label={`Pré-lançamento: ${label}`} key={label}><SocialIcon/></a>)}
            </nav>
            <span>Uma nova caminhada está prestes a começar</span>
            <h2 id="site-launch-title">O novo site entra no ar em</h2>
            <time className="site-launch-countdown" dateTime="2026-08-16T00:01:00-03:00" aria-label={`${siteLaunchCountdown.hours} horas, ${siteLaunchCountdown.minutes} minutos e ${siteLaunchCountdown.seconds} segundos`}>
              <span><strong>{String(siteLaunchCountdown.hours).padStart(2, "0")}</strong><small>Horas</small></span>
              <b aria-hidden="true">:</b>
              <span><strong>{String(siteLaunchCountdown.minutes).padStart(2, "0")}</strong><small>Minutos</small></span>
              <b aria-hidden="true">:</b>
              <span><strong>{String(siteLaunchCountdown.seconds).padStart(2, "0")}</strong><small>Segundos</small></span>
            </time>
            <p>16 de agosto de 2026 · 00:01 · Horário de Brasília</p>
          </div>
        </div>
      )}
      {campaignPopupOpen && (
        <div className="campaign-popup-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCampaignPopupOpen(false); }}>
          <section className="campaign-popup" role="dialog" aria-modal="true" aria-labelledby="campaign-popup-title" aria-describedby="campaign-popup-description">
            <button ref={campaignPopupCloseRef} className="campaign-popup-close" type="button" aria-label="Fechar" onClick={() => setCampaignPopupOpen(false)}>×</button>
            <div className="campaign-popup-brand">
              <img src="/images/federal/brand/logo-hero-2255-completa.png" alt="Gutemberg Fonseca, deputado federal, número 2255. O Defensor do Consumidor." width="1200" height="800" decoding="async"/>
            </div>
            <div className="campaign-popup-content">
              <span className="campaign-popup-kicker">Vamos juntos pelo Brasil</span>
              <h2 id="campaign-popup-title">Acompanhe, compartilhe e faça parte</h2>
              <p id="campaign-popup-description">Siga Gutemberg Fonseca nas redes sociais e acompanhe as propostas, agendas e a caminhada até Brasília.</p>
              <button className="campaign-popup-jingles" type="button" onClick={() => setCampaignPopupOpen(false)}>
                <Headphones aria-hidden="true"/>
                <span><strong>Tem jingle novo chegando!</strong><small>Feche o aviso e escute no player.</small></span>
              </button>
              <div className="campaign-popup-social" aria-label="Siga Gutemberg Fonseca nas redes sociais">
                {socialLinks.map(({ icon: SocialIcon, href, label }) => <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Seguir no ${label}`} title={label} data-campaign-event="social_click" data-campaign-label={`Pop-up: ${label}`} key={label}><SocialIcon/><span>{label}</span></a>)}
              </div>
              <div className="campaign-popup-vote">
                <p><strong>Dia 4 de outubro, vote</strong><span>Gutemberg Fonseca 2255</span></p>
                <a href="#inicio" onClick={handleVoteClick} data-campaign-event="support_click" data-campaign-label="Pop-up: Eu voto 2255">Eu voto 2255<CampaignIcon name="arrow"/></a>
              </div>
            </div>
          </section>
        </div>
      )}
      <audio ref={confirmationAudioRef} src="/audio/confirma-urna.mp3" preload="auto"/>
      <audio key={activeJingle.src} ref={jingleAudioRef} src={activeJingle.src} preload="metadata" loop onPlay={() => setJingleStatus("playing")} onPause={() => setJingleStatus((status) => status === "idle" ? status : "paused")}/>
      <div className="campaign-jingle-dock">
        <div className="campaign-jingle-invite">
          <button className="campaign-jingle-toggle" type="button" aria-expanded={jinglePlaylistOpen} aria-controls="campaign-jingle-list" onClick={() => setJinglePlaylistOpen((open) => !open)}>
            <span><Headphones aria-hidden="true"/> Jingles</span>
            {jinglePlaylistOpen ? <ChevronDown aria-hidden="true"/> : <ChevronUp aria-hidden="true"/>}
          </button>
          {jinglePlaylistOpen && <div className="campaign-jingle-list" id="campaign-jingle-list" aria-label="Jingles da campanha">
            {campaignJingles.map((jingle, index) => <button type="button" className={activeJingleIndex === index ? "is-active" : ""} aria-pressed={activeJingleIndex === index} onClick={() => selectJingle(index)} key={jingle.src}><Play aria-hidden="true"/><span>{jingle.title}</span>{jingle.isTheme && <small>Tema</small>}</button>)}
          </div>}
        </div>
        <aside className="campaign-jingle-player" aria-label={`Player do jingle ${activeJingle.title}`}>
          <span className="campaign-jingle-copy"><small>{activeJingle.isTheme ? "Jingle tema" : "Tocando agora"}</small><strong>{activeJingle.title}</strong></span>
          <button type="button" aria-label={jingleStatus === "playing" ? "Pausar jingle" : "Reproduzir jingle"} title={jingleStatus === "playing" ? "Pausar" : "Reproduzir"} data-campaign-event={jingleStatus === "playing" ? "jingle_pause" : "jingle_play"} data-campaign-label={`${jingleStatus === "playing" ? "Pausar" : "Reproduzir"}: ${activeJingle.title}`} onClick={() => { if (jingleStatus === "playing") pauseJingle(); else void playJingle(jingleStatus === "idle"); }}>
            {jingleStatus === "playing" ? <Pause aria-hidden="true"/> : <Play aria-hidden="true"/>}
          </button>
          <button type="button" aria-label="Parar jingle" title="Parar" data-campaign-event="jingle_stop" data-campaign-label={`Parar: ${activeJingle.title}`} onClick={stopJingle} disabled={jingleStatus === "idle"}>
            <Square aria-hidden="true"/>
          </button>
        </aside>
      </div>
      <a className="federal-whatsapp" href={gutoWhatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar com Guto pelo WhatsApp" title="WhatsApp do Guto" data-campaign-event="whatsapp_click" data-campaign-label="WhatsApp flutuante"><MessageCircle aria-hidden="true"/></a>

      <header className={`header ${headerScrolled ? "is-scrolled" : ""}`}>
        <div className="shell">
          <a className="header-brand" href="#inicio" aria-label="Gutemberg Fonseca, Deputado Federal">
            <img className="header-campaign-logo" src="/images/federal/brand/logo-navbar-2255-horizontal.png" alt="" width="1000" height="500" decoding="async"/>
          </a>

          <nav className="nav" aria-label="Navegação principal">
            <a className="is-active" href="#inicio">Início</a>
            <a href="#trajetoria">Trajetória</a>
            <a href="#resultados">Resultados</a>
            <a href="#propostas">Propostas</a>
            <a href="/molduras">Molduras</a>
            <a href="#fotos">Fotos</a>
            <a href="#contato">Contato</a>
          </nav>

          <a className="btn btn--yellow header-support" href={supportWhatsAppUrl} target="_blank" rel="noopener noreferrer" onClick={() => { void playConfirmationSound(); }} data-campaign-event="support_click" data-campaign-label="Quero apoiar no cabeçalho"><CampaignIcon name="heart"/>Quero apoiar</a>
          <button className="menu-btn" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><CampaignIcon name="menu"/></button>
        </div>

        <ScrollProgress onScrolledChange={setHeaderScrolled}/>

        {menuOpen && <nav className="mobile-nav" aria-label="Navegação mobile">
          <div className="mobile-nav-links">{[["Início", "#inicio"],["Trajetória", "#trajetoria"],["Resultados", "#resultados"],["Propostas", "#propostas"],["Molduras", "/molduras"],["Fotos", "#fotos"],["Contato", "#contato"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>
          <div className="mobile-nav-social" aria-label="Redes sociais">{socialLinks.map(({ icon: SocialIcon, href, label }) => <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} key={label}><SocialIcon/></a>)}</div>
        </nav>}
      </header>

      <main id="main" ref={gsapScopeRef}>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-background" aria-hidden="true"/>
          <div className="shell hero-grid">
            <div className="hero-copy-main">
              <h1 className="sr-only" id="hero-title">Gutemberg Fonseca 2255 — O Defensor do Consumidor</h1>
              <img className="hero-campaign-logo" src="/images/federal/brand/logo-hero-2255-completa.png" alt="Gutemberg Fonseca, deputado federal, número 2255. O Defensor do Consumidor." width="1200" height="800" loading="eager" {...{ fetchpriority: "high" }} decoding="async"/>
            </div>

            <div className="hero-copy-secondary">
              <p className="hero-statement">Trabalho sério, transparente e presente. Por você, por sua família e por um Brasil mais justo para todos.</p>
              <div className="hero-actions">
                <a className="btn btn--outline-w" href="#propostas" onClick={() => { void playConfirmationSound(); }} data-campaign-event="proposal_click" data-campaign-label="Conheça minhas propostas">Conheça minhas propostas</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-flag-card">
                <img ref={flagGlobeRef} className="hero-flag-art" src="/images/federal/hero/hero-bandeira.png" alt="" width="1600" height="1600" aria-hidden="true" decoding="async"/>
                <div className="hero-portrait-wrap" role="img" aria-label="Gutemberg Fonseca em retrato oficial">
                  <div ref={heroPortraitRef} className="hero-portrait-stage">
                    <picture className="hero-portrait-frame is-active" aria-hidden="true">
                      <source type="image/webp" srcSet={heroPortrait.webp}/>
                      <img className="hero-portrait-image" src={heroPortrait.fallback} alt="" width={heroPortrait.width} height={heroPortrait.height} loading="eager" decoding="async"/>
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="election-countdown" aria-label="Contagem regressiva para a eleição de 4 de outubro de 2026">
          <div className="election-countdown-copy"><CampaignIcon name="clock"/><span><strong>Rumo à eleição</strong><small>4 de outubro de 2026</small></span></div>
          {electionCountdown.status === "counting" ? (
            <time className="countdown-grid" dateTime="2026-10-04T00:00:00-03:00">
              {([
                [electionCountdown.days, "dias"],
                [electionCountdown.hours, "horas"],
                [electionCountdown.minutes, "minutos"],
                [electionCountdown.seconds, "segundos"],
              ] as const).map(([value, label]) => <span className="countdown-unit" key={label}><b>{String(value).padStart(2, "0")}</b><small>{label}</small></span>)}
            </time>
          ) : <strong className="countdown-message">{electionCountdown.status === "today" ? "É dia de votar!" : "A eleição foi em 4 de outubro"}</strong>}
        </aside>

        <section className="pillars" aria-label="Pilares de atuação"><div className="shell"><div className="pillars-card">
          {pillars.map((pillar) => <a className="pillar" href={pillar.href} key={pillar.title}><span className="pillar-icon"><CampaignIcon name={pillar.icon}/></span><span><h3>{pillar.title}</h3><p>{pillar.description}</p></span></a>)}
        </div></div></section>

        <section className="legacy-origin" id="origem" aria-labelledby="legacy-origin-title"><div className="shell">
          <Reveal className="legacy-origin-heading" direction="up"><span className="section-kicker">Raízes que explicam o caminho</span><h2 id="legacy-origin-title">Da Merck <em>para o Brasil</em></h2><p>Antes dos gabinetes, vieram o trabalho, a responsabilidade e o contato direto com quem acorda cedo para construir a própria vida.</p></Reveal>
          <div className="legacy-origin-grid">
            <Reveal as="article" className="legacy-origin-story" direction="left"><span className="legacy-index">01</span><div><h3>Uma história moldada no trabalho</h3><p>Nascido e criado em Jacarepaguá, Gutemberg cresceu na comunidade da Merck. Ainda jovem, ajudava a família nas feiras, carregando e vendendo alimentos. Foi ali que aprendeu o valor do esforço, da palavra e do respeito por quem trabalha.</p><p>Essa origem acompanha sua atuação pública: presença no território, escuta direta e compromisso com soluções que façam diferença na vida real.</p><div className="legacy-values" aria-label="Valores construídos nessa trajetória"><span>Trabalho</span><span>Resiliência</span><span>Presença</span></div></div></Reveal>
            <Reveal className="legacy-photo-slot legacy-photo-slot--origin" direction="right">{null}</Reveal>
          </div>
          <Reveal as="article" className="legacy-method" direction="up"><div className="legacy-method-title"><span className="legacy-index">02</span><div><span className="section-kicker">Do apito à gestão</span><h3>Regra, equilíbrio e coragem para decidir</h3></div></div><p>Foram doze anos de arbitragem até integrar o quadro da FIFA. A experiência de tomar decisões sob pressão ajudou a formar um método de gestão baseado em preparo, firmeza e respeito às regras.</p><div className="legacy-method-principles"><span><b>01</b>Escutar antes de decidir</span><span><b>02</b>Aplicar a regra com equilíbrio</span><span><b>03</b>Assumir responsabilidade pelo resultado</span></div></Reveal>
        </div></section>

        <section className="trajectory" id="trajetoria" aria-labelledby="trajectory-title"><div className="shell trajectory-inner"><div className="trajectory-grid">
          <Reveal direction="left"><h2 className="t-title" id="trajectory-title">Trajetória de<br/>Trabalho e Fé</h2><div className="t-line" aria-hidden="true"/><div className="t-story"><p>Administrador e especialista em gestão de cidades, marketing e ciências políticas, Gutemberg construiu sua vida pública atuando em funções estratégicas no Estado e na cidade do Rio de Janeiro.</p><p>Sua trajetória reúne experiência em gestão, segurança, ordem pública, esporte e defesa do consumidor, sempre com presença nos territórios e diálogo direto com a população.</p><p>Esse caminho consolidou um método de trabalho baseado em planejamento, responsabilidade, escuta e capacidade de transformar demandas reais em ação pública.</p></div></Reveal>
          <div className="t-slices" role="group" aria-label="Fotos da trajetória">{trajectoryImages.map((image, index) => <Reveal className="t-slice" direction="right" delay={index * 100} key={image.src}><img src={image.src} alt={image.alt} width="1200" height="1600" loading="lazy" decoding="async"/></Reveal>)}</div>
        </div></div></section>

        <section className="legacy-timeline" aria-labelledby="legacy-timeline-title"><div className="shell">
          <Reveal className="legacy-timeline-heading" direction="up"><span className="section-kicker">Uma vida de serviço</span><h2 id="legacy-timeline-title">Experiência construída <em>etapa por etapa</em></h2><p>Uma visão objetiva dos principais capítulos apresentados no acervo histórico da trajetória pública.</p></Reveal>
          <ol className="legacy-timeline-list">{legacyTimeline.map((event, index) => <Reveal as="li" className="legacy-timeline-item" direction="up" delay={(index % 4) * 60} key={`${event.year}-${event.title}`}><span className="legacy-timeline-year">{event.year}</span><span className="legacy-timeline-dot" aria-hidden="true"/><div><h3>{event.title}</h3><p>{event.description}</p></div></Reveal>)}</ol>
        </div></section>

        <section className="results" id="resultados" aria-labelledby="results-title"><div className="shell results-grid">
          <Reveal direction="up"><h2 className="r-title" id="results-title"><span className="g">Resultados que</span><span className="b">Transformam</span></h2><div className="r-line" aria-hidden="true"/><p className="r-text">Nosso trabalho já gerou conquistas reais e benefícios que melhoram a vida das pessoas todos os dias.</p></Reveal>
          <div className="r-stats">{results.map((result, index) => <Reveal as="article" className="r-stat" direction="up" delay={index * 70} key={result.label}><span className={`r-icon r-icon--${result.tone}`}><CampaignIcon name={result.icon}/></span><AnimatedCounter result={result}/><p className="r-label">{result.label}</p><p className="r-desc">{result.description}</p></Reveal>)}</div>
        </div></section>

        <section className="legacy-proof" aria-labelledby="legacy-proof-title"><div className="shell">
          <Reveal className="legacy-proof-heading" direction="up"><span className="section-kicker">Legado em números e ações</span><h2 id="legacy-proof-title">Entregas que ajudam a contar <em>essa história</em></h2><p>Indicadores e casos levantados no material histórico para futura consolidação com documentos e fontes públicas.</p></Reveal>
          <div className="legacy-evidence-grid">{legacyEvidence.map((item, index) => <Reveal as="article" className="legacy-evidence-card" direction="up" delay={index * 70} key={item.label}><strong>{item.value}</strong><h3>{item.label}</h3><p>{item.description}</p></Reveal>)}</div>
          <div className="legacy-cases-grid">{legacyCases.map((item, index) => <Reveal as="article" className="legacy-case-card" direction="up" delay={index * 80} key={item.title}><span className="legacy-case-icon"><CampaignIcon name={item.icon}/></span><small>{item.eyebrow}</small><h3>{item.title}</h3><p>{item.description}</p></Reveal>)}</div>
        </div></section>

        <section className="people" id="fotos" aria-labelledby="people-title"><div className="shell people-grid">
          <div><span className="section-kicker">Galeria de fotos</span><h2 className="p-title" id="people-title"><span className="g">Perto das pessoas,</span><span className="b">presente na vida real.</span></h2><div className="p-line" aria-hidden="true"/><p className="p-text">A política só faz sentido quando está ao lado de quem mais precisa. É ouvindo, dialogando e agindo que seguimos transformando vidas.</p></div>
          <div className="p-mosaic" role="group" aria-label="Galeria de fotos com a população" onMouseLeave={() => setActivePeopleImageIndex(0)}>
            <div className="p-featured-column">
              <div className="p-featured"><img src={activePeopleImage.src} alt={activePeopleImage.alt} width="1600" height="1066" loading="lazy" decoding="async"/></div>
              <div className="p-photo-actions" aria-label="Compartilhar ou salvar esta foto">
                <span>Compartilhe:</span>
                <button type="button" onClick={() => sharePhoto("whatsapp")} aria-label="Compartilhar foto no WhatsApp" title="WhatsApp"><MessageCircle aria-hidden="true"/><span>WhatsApp</span></button>
                <button type="button" onClick={() => sharePhoto("facebook")} aria-label="Compartilhar foto no Facebook" title="Facebook"><Facebook aria-hidden="true"/><span>Facebook</span></button>
                <button type="button" onClick={() => sharePhoto("x")} aria-label="Compartilhar foto no X" title="X"><Twitter aria-hidden="true"/><span>X</span></button>
                <a href={activePeopleImage.src} download={`gutemberg-fonseca-foto-${String(activePeopleImageIndex + 1).padStart(2, "0")}.webp`} aria-label="Salvar esta foto" title="Salvar foto"><Download aria-hidden="true"/><span>Salvar</span></a>
              </div>
            </div>
            <div className="p-thumbnails">{galleryImages.slice(1).map((image, thumbnailIndex) => { const imageIndex = thumbnailIndex + 1; return <button className={activePeopleImageIndex === imageIndex ? "is-active" : ""} type="button" aria-label={`Exibir em destaque: ${image.alt}`} aria-pressed={activePeopleImageIndex === imageIndex} onMouseEnter={() => setActivePeopleImageIndex(imageIndex)} onFocus={() => setActivePeopleImageIndex(imageIndex)} onClick={() => setActivePeopleImageIndex(imageIndex)} key={image.src}><img src={image.src} alt="" width="400" height="267" loading="lazy" decoding="async" style={{ objectPosition: image.position }}/></button>; })}</div>
          </div>
        </div></section>

        <section className="proposals" id="propostas" aria-labelledby="proposals-title"><div className="shell">
          <Reveal className="proposals-heading" direction="up"><span className="section-kicker">Do Rio para Brasília</span><h2 id="proposals-title">Um mandato em defesa <em>do consumidor</em></h2><p>Em Brasília, nosso mandato vai trabalhar para fortalecer a defesa do consumidor através de leis, recursos e articulação política.</p><p>Vamos trabalhar junto ao Governo Federal, ao Governo do Estado, à Assembleia Legislativa, aos municípios e aos órgãos de defesa do consumidor para transformar boas ideias em políticas que cheguem à população.</p></Reveal>
          <div className="proposals-grid">
            <ProposalList items={proposals.slice(0, 11)} start={1}/>
            <ProposalList items={proposals.slice(11)} start={12}/>
          </div>
          <Reveal className="proposals-closing" direction="fade"><p>Em Brasília, a defesa do consumidor terá voz, trabalho e prioridade.</p></Reveal>
        </div></section>

        <section className="areas" id="areas" aria-labelledby="areas-title"><div className="shell"><Reveal direction="up"><h2 className="a-title" id="areas-title">Áreas de <em>Atuação</em></h2></Reveal><div className="a-grid">{areas.map((area, index) => <Reveal as="article" className="a-item" direction="up" delay={index * 80} key={area.title}><span className="a-icon"><CampaignIcon name={area.icon}/></span><h3>{area.title}</h3><p>{area.description}</p></Reveal>)}</div></div></section>

        <section className="consumer-content" id="consumidor" aria-labelledby="consumer-content-title"><div className="shell">
          <Reveal className="consumer-content-heading" direction="up"><span className="section-kicker">Informação que protege</span><h2 id="consumer-content-title">Direitos do <em>Consumidor</em></h2><p>Orientações práticas para reconhecer abusos, evitar golpes e tomar decisões mais seguras.</p></Reveal>
          <div className="consumer-articles">{consumerArticles.map((article, index) => <Reveal as="article" className="consumer-article" direction="up" delay={index * 80} key={article.slug}><a className="consumer-article-media" href={getPostCategoryUrl(article)}><img src={article.coverImage} alt={article.coverImageAlt} width="1200" height="675" loading="lazy" decoding="async"/></a><div className="consumer-article-body"><span>{new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(article.date))} · {article.readingTime}</span><h3><a href={getPostCategoryUrl(article)}>{article.title}</a></h3><p>{article.excerpt}</p><a className="consumer-article-link" href={getPostCategoryUrl(article)}>Ler artigo<ArrowUpRight/></a></div></Reveal>)}</div>
          <Reveal className="consumer-content-cta" direction="fade"><div><strong>Mais informação. Mais proteção.</strong><p>Acesse todos os conteúdos sobre seus direitos.</p></div><a className="btn btn--yellow" href="/direitos-do-consumidor">Ver todos os artigos<CampaignIcon name="arrow"/></a></Reveal>
        </div></section>

        <section className="consumer-army" id="exercito" aria-labelledby="consumer-army-title"><div className="shell consumer-army-grid">
          <Reveal direction="left"><span className="section-kicker">Mobilização que protege</span><h2 id="consumer-army-title">Faça parte do <em>Exército do Consumidor</em></h2><p>Consumidor unido tem força. Participe, mobilize sua comunidade e ajude a construir uma rede ativa de defesa dos direitos do consumidor.</p><blockquote>“Nenhum consumidor sozinho. A mobilização começa com você.”</blockquote></Reveal>
          <div className="consumer-army-actions">{consumerArmyActions.map((action, index) => <Reveal as="article" className="consumer-army-action" direction="right" delay={index * 80} key={action.label}><span><CampaignIcon name={action.icon}/></span><h3>{action.label}</h3><p>A conversa continua diretamente no WhatsApp do Guto, com a finalidade já identificada.</p><a href={action.href} target="_blank" rel="noopener noreferrer" data-campaign-event="whatsapp_conversion" data-campaign-label={action.label}>Enviar pelo WhatsApp<MessageCircle/></a></Reveal>)}</div>
        </div></section>

        <PhotoFramesSection />

        <section className="federal-instagram" id="instagram" aria-labelledby="federal-instagram-title"><div className="shell federal-instagram-grid">
          <Reveal className="federal-instagram-copy" direction="left"><Instagram aria-hidden="true"/><span className="section-kicker">Acompanhe a rotina</span><h2 id="federal-instagram-title">Direto do <em>Instagram</em></h2><p>Informação, agendas e encontros em um canal direto com você.</p><a href="https://www.instagram.com/gutembergpfonseca/" target="_blank" rel="noopener noreferrer">@gutembergpfonseca<ArrowUpRight/></a></Reveal>
          <div className="federal-instagram-posts">{instagramHighlights.map((post, index) => <Reveal direction="up" delay={index * 70} key={post.href}><a href={post.href} target="_blank" rel="noopener noreferrer" aria-label={`${post.alt}. Abrir no Instagram`} data-campaign-event="social_click" data-campaign-label={`Destaque do Instagram ${index + 1}`}><img src={post.image} alt={post.alt} width="1080" height="1080" loading="lazy" decoding="async"/><span><Instagram/>Ver publicação</span></a></Reveal>)}</div>
        </div></section>

        <section className="cta" id="participe" aria-labelledby="cta-title"><div className="shell cta-grid">
          <div className="cta-copy"><h2 id="cta-title"><span className="y">Vamos juntos</span>por um Brasil melhor!</h2><p>Sua participação é o que nos move a seguir em frente. Apoie, compartilhe e faça parte dessa mudança.</p></div>
          <div className="cta-support"><span className="heart" aria-hidden="true"><CampaignIcon name="heart"/></span><p className="lead">Eu apoio</p><h3>Gutemberg<br/>Fonseca</h3><a className="btn btn--yellow" href={supportWhatsAppUrl} target="_blank" rel="noopener noreferrer" onClick={() => { void playConfirmationSound(); }} data-campaign-event="support_click" data-campaign-label="Quero apoiar no CTA final">Quero apoiar<CampaignIcon name="arrow"/></a></div>
          <div className="cta-photo"><img src="/images/federal/people/section-09-cta-retrato-institucional.webp" alt="Gutemberg Fonseca durante agenda institucional" width="854" height="1280" loading="lazy" decoding="async"/></div>
        </div></section>

        <footer className="footer" id="contato"><div className="shell f-grid">
          <div className="f-logo"><a className="footer-brand" href="#inicio" aria-label="Gutemberg Fonseca 2255, O Defensor do Consumidor"><img className="footer-campaign-logo" src="/images/federal/brand/logo-rodape-2255-completa.png" alt="" width="1200" height="800" loading="lazy" decoding="async"/></a><p className="f-slogan">Compromisso, experiência e coragem para representar você em Brasília.</p><div className="f-social">{socialLinks.map(({ icon: SocialIcon, href, label }) => <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} key={label}><SocialIcon size={18}/></a>)}</div></div>
          <div className="f-col"><h4>Fale conosco</h4><a className="f-contact-item" href={gutoWhatsAppUrl} target="_blank" rel="noopener noreferrer" data-campaign-event="whatsapp_click" data-campaign-label="WhatsApp do rodapé"><MessageCircle/><span>(21) 92011-2255</span></a><a className="f-contact-item" href="mailto:contato@gutembergfonseca.com.br" data-campaign-event="contact_email_click" data-campaign-label="E-mail do rodapé"><CampaignIcon name="email"/><span>contato@gutembergfonseca.com.br</span></a></div>
          <div className="f-party"><PartyLogo/><p>Partido Liberal</p></div>
        </div><div className="f-bar"><div className="shell"><span>© 2026 Gutemberg Fonseca — Todos os direitos reservados.</span><span>CNPJ: 68.237.089/0001-48&nbsp;|&nbsp; <a href="#">Política de Privacidade</a>&nbsp;|&nbsp; <a href="#">Termos de Uso</a></span></div></div></footer>
      </main>
    </>
  );
}
