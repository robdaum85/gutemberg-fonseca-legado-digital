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
import { ArrowUpRight, Facebook, Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { TikTokIcon, ThreadsIcon } from "@/components/SocialIcons";
import { BolsonaroAllianceSection } from "@/components/federal/BolsonaroAllianceSection";
import { CampaignMaterialsSection } from "@/components/federal/CampaignMaterialsSection";
import { TruthSection } from "@/components/federal/TruthSection";
import { WHATSAPP_NUMBER } from "@/config/mobilizacao";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getPostCategoryUrl, getPostsByCategory } from "@/lib/blogUtils";
import "./ApresentacaoFederalPage.css";
import "@/components/federal/FederalSections.css";

type RevealDirection = "up" | "down" | "left" | "right" | "fade";
type RevealElement = "div" | "article" | "section";

type MotionStyle = CSSProperties & {
  "--reveal-delay"?: string;
  "--reveal-duration"?: string;
  "--reveal-distance"?: string;
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
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

  useLayoutEffect(() => {
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
  commitments: readonly string[];
  icon: CampaignIconName;
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
  { title: "Defesa do Consumidor", description: "Fortalecer a proteção de quem compra, contrata e utiliza serviços.", commitments: ["Combate a fraudes e práticas abusivas", "Informação clara e educação para o consumo"], icon: "consumer" },
  { title: "Segurança e Cidadania", description: "Apoiar políticas integradas de prevenção, inteligência e proteção.", commitments: ["Integração entre forças e municípios", "Tecnologia aplicada à segurança pública"], icon: "shield" },
  { title: "Saúde mais próxima", description: "Ampliar o acesso e valorizar o atendimento que chega primeiro ao cidadão.", commitments: ["Fortalecimento da atenção básica", "Mais estrutura e atendimento humanizado"], icon: "heart" },
  { title: "Educação e futuro", description: "Preparar crianças e jovens para novas oportunidades de formação e trabalho.", commitments: ["Qualificação profissional conectada ao mercado", "Tecnologia e inovação nas escolas"], icon: "education" },
  { title: "Emprego e renda", description: "Criar um ambiente favorável para quem trabalha, produz e empreende.", commitments: ["Incentivo ao pequeno empreendedor", "Formação para novos postos de trabalho"], icon: "briefcase" },
  { title: "Família e inclusão", description: "Cuidar das famílias e ampliar a autonomia de quem mais precisa.", commitments: ["Proteção à infância e à pessoa idosa", "Inclusão e acessibilidade nas políticas públicas"], icon: "family" },
];

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
  { href: "https://www.instagram.com/reel/DbTO_h0Rgx7/", image: "/instagram/DbTO_h0Rgx7.jpg", alt: "Gutemberg Fonseca orientando consumidores sobre compras pela internet" },
  { href: "https://www.instagram.com/p/Dax344KkXLX/", image: "/instagram/Dax344KkXLX.jpg", alt: "Publicação de Gutemberg Fonseca sobre energia e direitos do consumidor" },
  { href: "https://www.instagram.com/p/DayxovqGh0O/", image: "/instagram/DayxovqGh0O.jpg", alt: "Gutemberg Fonseca durante entrega de homenagem" },
  { href: "https://www.instagram.com/p/DawJ2iwmt_B/", image: "/instagram/DawJ2iwmt_B.jpg", alt: "Gutemberg Fonseca reunido com apoiadores" },
] as const;

const consumerArmyActions = [
  { label: "Quero ser apoiador", icon: "people" as const, href: buildWhatsAppUrl("APOIADOR", { Origem: "Página federal", Interesse: "Quero fazer parte do Exército do Consumidor como apoiador." }) },
  { label: "Quero ser liderança", icon: "medal" as const, href: buildWhatsAppUrl("LIDERANÇA", { Origem: "Página federal", Interesse: "Quero atuar como liderança do Exército do Consumidor na minha comunidade." }) },
  { label: "Fazer uma denúncia", icon: "shield" as const, href: buildWhatsAppUrl("DENÚNCIA", { Origem: "Página federal", Interesse: "Quero relatar uma situação que pode violar direitos do consumidor." }) },
] as const;

const gutoWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, meu candidato, tudo bem?  cheguei pelo site, gostaria de conversar com você!")}`;

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
  fallback: "/images/federal/hero/section-01-hero-gutemberg-retrato-03.png",
  webpSrcSet: "/images/federal/hero/section-01-hero-gutemberg-retrato-03-480x600.webp 480w, /images/federal/hero/section-01-hero-gutemberg-retrato-03-768x960.webp 768w, /images/federal/hero/section-01-hero-gutemberg-retrato-03-1024x1280.webp 1024w",
  width: 1800,
  height: 2250,
} as const;

export default function FederalPreviewPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activePeopleImageIndex, setActivePeopleImageIndex] = useState(0);
  const activePeopleImage = peopleImages[activePeopleImageIndex];
  const reducedMotion = useReducedMotion();
  const gsapScopeRef = useFederalGsapPilot(reducedMotion);
  const flagGlobeRef = useParallax<HTMLDivElement>(0.18);
  const heroPortraitRef = useParallax<HTMLDivElement>(0.04);

  useEffect(() => {
    document.body.classList.add("federal-page");
    return () => document.body.classList.remove("federal-page");
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobots = existingRobots?.content;
    const robots = existingRobots ?? document.createElement("meta");

    if (!existingRobots) {
      robots.name = "robots";
      document.head.appendChild(robots);
    }

    document.title = "Apresentação Federal | Gutemberg Fonseca";
    robots.content = "noindex, nofollow, noarchive";

    return () => {
      document.title = previousTitle;
      if (existingRobots && previousRobots !== undefined) existingRobots.content = previousRobots;
      else robots.remove();
    };
  }, []);

  return (
    <>
      <a className="skip" href="#main">Pular para o conteúdo</a>
      <a className="federal-whatsapp" href={gutoWhatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar com Guto pelo WhatsApp" title="WhatsApp do Guto"><MessageCircle aria-hidden="true"/></a>

      <header className={`header ${headerScrolled ? "is-scrolled" : ""}`}>
        <div className="shell">
          <a className="header-brand" href="#inicio" aria-label="Gutemberg Fonseca, Deputado Federal">
            <span className="logo">
              <span className="logo-office">Deputado Federal</span>
              <span className="logo-name">Gutemberg<br/>Fonseca</span>
            </span>
          </a>
          <span className="header-number" aria-label="Número 2255">2255</span>

          <nav className="nav" aria-label="Navegação principal">
            <a className="is-active" href="#inicio">Início</a>
            <a href="#trajetoria">Trajetória</a>
            <a href="#resultados">Resultados</a>
            <a href="#propostas">Propostas</a>
            <a href="#verdade">Verdade</a>
            <a href="#bolsonaro">Alianças</a>
            <a href="#materiais">Materiais</a>
            <a href="#contato">Contato</a>
          </nav>

          <a className="btn btn--yellow header-support" href="#contato"><CampaignIcon name="heart"/>Quero apoiar</a>
          <button className="menu-btn" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><CampaignIcon name="menu"/></button>
        </div>

        <ScrollProgress onScrolledChange={setHeaderScrolled}/>

        {menuOpen && <nav className="mobile-nav" aria-label="Navegação mobile">
          <div className="mobile-nav-links">{[["Início", "#inicio"],["Trajetória", "#trajetoria"],["Resultados", "#resultados"],["Propostas", "#propostas"],["Verdade", "#verdade"],["Alianças", "#bolsonaro"],["Materiais", "#materiais"],["Contato", "#contato"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>
          <div className="mobile-nav-social" aria-label="Redes sociais">{socialLinks.map(({ icon: SocialIcon, href, label }) => <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} key={label}><SocialIcon/></a>)}</div>
        </nav>}
      </header>

      <main id="main" ref={gsapScopeRef}>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-background" aria-hidden="true"/>
          <div className="shell hero-grid">
            <div className="hero-copy-main">
              <p className="hero-office">Deputado Federal</p>
              <h1 className="hero-name" id="hero-title">Gutemberg<br/>Fonseca</h1>
              <div className="hero-campaign-line"><p className="hero-slogan">O Federal do <b>Consumidor</b></p><p className="hero-candidate-number">2255</p></div>
            </div>

            <div className="hero-copy-secondary">
              <p className="hero-statement">Trabalho sério, transparente e presente. Por você, por sua família e por um Brasil mais justo para todos.</p>
              <div className="hero-actions">
                <a className="btn btn--yellow" href="#video"><CampaignIcon name="play"/>Assista ao vídeo</a>
                <a className="btn btn--outline-w" href="#propostas">Conheça minhas propostas</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-flag-card">
                <div ref={flagGlobeRef} className="flag-globe" aria-hidden="true">
                  <div className="flag-band" />
                </div>
                <div className="hero-portrait-wrap" role="img" aria-label="Gutemberg Fonseca em retrato oficial">
                  <div ref={heroPortraitRef} className="hero-portrait-stage">
                    <picture className="hero-portrait-frame is-active" aria-hidden="true">
                      <source type="image/webp" sizes="(max-width: 959px) 190px, 400px" srcSet={heroPortrait.webpSrcSet}/>
                      <img className="hero-portrait-image" src={heroPortrait.fallback} alt="" width={heroPortrait.width} height={heroPortrait.height} loading="eager" decoding="async"/>
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pillars" aria-label="Pilares de atuação"><div className="shell"><div className="pillars-card">
          {pillars.map((pillar) => <a className="pillar" href={pillar.href} key={pillar.title}><span className="pillar-icon"><CampaignIcon name={pillar.icon}/></span><span><h3>{pillar.title}</h3><p>{pillar.description}</p></span></a>)}
        </div></div></section>

        <section className="trajectory" id="trajetoria" aria-labelledby="trajectory-title"><div className="shell trajectory-inner"><div className="trajectory-grid">
          <Reveal direction="left"><h2 className="t-title" id="trajectory-title">Trajetória de<br/>Trabalho e Fé</h2><div className="t-line" aria-hidden="true"/><div className="t-story"><p>Administrador e especialista em gestão de cidades, marketing e ciências políticas, Gutemberg construiu sua vida pública atuando em funções estratégicas no Estado e na cidade do Rio de Janeiro.</p><p>Sua trajetória reúne experiência em gestão, segurança, ordem pública, esporte e defesa do consumidor, sempre com presença nos territórios e diálogo direto com a população.</p><p>Esse caminho consolidou um método de trabalho baseado em planejamento, responsabilidade, escuta e capacidade de transformar demandas reais em ação pública.</p></div></Reveal>
          <div className="t-slices" role="group" aria-label="Fotos da trajetória">{trajectoryImages.map((image, index) => <Reveal className="t-slice" direction="right" delay={index * 100} key={image.src}><img src={image.src} alt={image.alt} width="1200" height="1600" loading="lazy" decoding="async"/></Reveal>)}</div>
        </div></div></section>

        <section className="results" id="resultados" aria-labelledby="results-title"><div className="shell results-grid">
          <Reveal direction="up"><h2 className="r-title" id="results-title"><span className="g">Resultados que</span><span className="b">Transformam</span></h2><div className="r-line" aria-hidden="true"/><p className="r-text">Nosso trabalho já gerou conquistas reais e benefícios que melhoram a vida das pessoas todos os dias.</p></Reveal>
          <div className="r-stats">{results.map((result, index) => <Reveal as="article" className="r-stat" direction="up" delay={index * 70} key={result.label}><span className={`r-icon r-icon--${result.tone}`}><CampaignIcon name={result.icon}/></span><AnimatedCounter result={result}/><p className="r-label">{result.label}</p><p className="r-desc">{result.description}</p></Reveal>)}</div>
        </div></section>

        <section className="people" id="pessoas" aria-labelledby="people-title"><div className="shell people-grid">
          <div><h2 className="p-title" id="people-title"><span className="g">Perto das pessoas,</span><span className="b">presente na vida real.</span></h2><div className="p-line" aria-hidden="true"/><p className="p-text">A política só faz sentido quando está ao lado de quem mais precisa. É ouvindo, dialogando e agindo que seguimos transformando vidas.</p></div>
          <div className="p-mosaic" role="group" aria-label="Galeria de fotos com a população" onMouseLeave={() => setActivePeopleImageIndex(0)}>
            <div className="p-featured"><img src={activePeopleImage.src} alt={activePeopleImage.alt} width="1600" height="1066" loading="lazy" decoding="async" style={{ objectPosition: activePeopleImage.position }}/></div>
            <div className="p-thumbnails">{peopleImages.slice(1).map((image, thumbnailIndex) => { const imageIndex = thumbnailIndex + 1; return <button className={activePeopleImageIndex === imageIndex ? "is-active" : ""} type="button" aria-label={`Exibir em destaque: ${image.alt}`} aria-pressed={activePeopleImageIndex === imageIndex} onMouseEnter={() => setActivePeopleImageIndex(imageIndex)} onFocus={() => setActivePeopleImageIndex(imageIndex)} onClick={() => setActivePeopleImageIndex(imageIndex)} key={image.src}><img src={image.src} alt="" width="400" height="267" loading="lazy" decoding="async" style={{ objectPosition: image.position }}/></button>; })}</div>
          </div>
        </div></section>

        <section className="proposals" id="propostas" aria-labelledby="proposals-title"><div className="shell">
          <Reveal className="proposals-heading" direction="up"><span className="section-kicker">Compromissos com o futuro</span><h2 id="proposals-title">Propostas para <em>cuidar das pessoas</em></h2><p>Prioridades para um mandato federal presente, responsável e conectado às necessidades de quem vive e trabalha no Rio de Janeiro.</p></Reveal>
          <div className="proposals-grid">{proposals.map((proposal, index) => <Reveal as="article" className="proposal-item" direction="up" delay={(index % 3) * 80} key={proposal.title}><span className="proposal-icon"><CampaignIcon name={proposal.icon}/></span><h3>{proposal.title}</h3><p>{proposal.description}</p><ul>{proposal.commitments.map((commitment) => <li key={commitment}>{commitment}</li>)}</ul></Reveal>)}</div>
        </div></section>

        <section className="areas" id="areas" aria-labelledby="areas-title"><div className="shell"><Reveal direction="up"><h2 className="a-title" id="areas-title">Áreas de <em>Atuação</em></h2></Reveal><div className="a-grid">{areas.map((area, index) => <Reveal as="article" className="a-item" direction="up" delay={index * 80} key={area.title}><span className="a-icon"><CampaignIcon name={area.icon}/></span><h3>{area.title}</h3><p>{area.description}</p></Reveal>)}</div></div></section>

        <section className="consumer-content" id="consumidor" aria-labelledby="consumer-content-title"><div className="shell">
          <Reveal className="consumer-content-heading" direction="up"><span className="section-kicker">Informação que protege</span><h2 id="consumer-content-title">Direitos do <em>Consumidor</em></h2><p>Orientações práticas para reconhecer abusos, evitar golpes e tomar decisões mais seguras.</p></Reveal>
          <div className="consumer-articles">{consumerArticles.map((article, index) => <Reveal as="article" className="consumer-article" direction="up" delay={index * 80} key={article.slug}><a className="consumer-article-media" href={getPostCategoryUrl(article)}><img src={article.coverImage} alt={article.coverImageAlt} width="1200" height="675" loading="lazy" decoding="async"/></a><div className="consumer-article-body"><span>{new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(article.date))} · {article.readingTime}</span><h3><a href={getPostCategoryUrl(article)}>{article.title}</a></h3><p>{article.excerpt}</p><a className="consumer-article-link" href={getPostCategoryUrl(article)}>Ler artigo<ArrowUpRight/></a></div></Reveal>)}</div>
          <Reveal className="consumer-content-cta" direction="fade"><div><strong>Mais informação. Mais proteção.</strong><p>Acesse todos os conteúdos sobre seus direitos.</p></div><a className="btn btn--yellow" href="/direitos-do-consumidor">Ver todos os artigos<CampaignIcon name="arrow"/></a></Reveal>
        </div></section>

        <section className="consumer-army" id="exercito" aria-labelledby="consumer-army-title"><div className="shell consumer-army-grid">
          <Reveal direction="left"><span className="section-kicker">Mobilização que protege</span><h2 id="consumer-army-title">Faça parte do <em>Exército do Consumidor</em></h2><p>Consumidor unido tem força. Participe, mobilize sua comunidade e ajude a construir uma rede ativa de defesa dos direitos do consumidor.</p><blockquote>“Nenhum consumidor sozinho. A mobilização começa com você.”</blockquote></Reveal>
          <div className="consumer-army-actions">{consumerArmyActions.map((action, index) => <Reveal as="article" className="consumer-army-action" direction="right" delay={index * 80} key={action.label}><span><CampaignIcon name={action.icon}/></span><h3>{action.label}</h3><p>A conversa continua diretamente no WhatsApp do Guto, com a finalidade já identificada.</p><a href={action.href} target="_blank" rel="noopener noreferrer">Enviar pelo WhatsApp<MessageCircle/></a></Reveal>)}</div>
        </div></section>

        <TruthSection/>

        <BolsonaroAllianceSection/>

        <section className="federal-instagram" id="instagram" aria-labelledby="federal-instagram-title"><div className="shell federal-instagram-grid">
          <Reveal className="federal-instagram-copy" direction="left"><Instagram aria-hidden="true"/><span className="section-kicker">Acompanhe a rotina</span><h2 id="federal-instagram-title">Direto do <em>Instagram</em></h2><p>Informação, agendas e encontros em um canal direto com você.</p><a href="https://www.instagram.com/gutembergpfonseca/" target="_blank" rel="noopener noreferrer">@gutembergpfonseca<ArrowUpRight/></a></Reveal>
          <div className="federal-instagram-posts">{instagramHighlights.map((post, index) => <Reveal direction="up" delay={index * 70} key={post.href}><a href={post.href} target="_blank" rel="noopener noreferrer" aria-label={`${post.alt}. Abrir no Instagram`}><img src={post.image} alt={post.alt} width="1080" height="1080" loading="lazy" decoding="async"/><span><Instagram/>Ver publicação</span></a></Reveal>)}</div>
        </div></section>

        <CampaignMaterialsSection/>

        <section className="cta" id="participe" aria-labelledby="cta-title"><div className="shell cta-grid">
          <div className="cta-copy"><h2 id="cta-title"><span className="y">Vamos juntos</span>por um Brasil melhor!</h2><p>Sua participação é o que nos move a seguir em frente. Apoie, compartilhe e faça parte dessa mudança.</p></div>
          <div className="cta-support"><span className="heart" aria-hidden="true"><CampaignIcon name="heart"/></span><p className="lead">Eu apoio</p><h3>Gutemberg<br/>Fonseca</h3><a className="btn btn--yellow" href="#contato">Quero apoiar agora<CampaignIcon name="arrow"/></a></div>
          <div className="cta-photo"><img src="/images/federal/people/section-09-cta-retrato-institucional.webp" alt="Gutemberg Fonseca durante agenda institucional" width="854" height="1280" loading="lazy" decoding="async"/></div>
        </div></section>

        <footer className="footer" id="contato"><div className="shell f-grid">
          <div className="f-logo"><div className="f-brand-row"><a className="logo" href="#inicio" aria-label="Gutemberg Fonseca"><span className="logo-office">Deputado Federal</span><span className="logo-name">Gutemberg<br/>Fonseca</span></a><strong className="f-candidate-number" aria-label="Número 2255">2255</strong></div><p className="f-slogan">Compromisso, experiência e coragem para representar você em Brasília.</p><div className="f-social">{socialLinks.map(({ icon: SocialIcon, href, label }) => <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} key={label}><SocialIcon size={18}/></a>)}</div></div>
          <div className="f-col"><h4>Navegação</h4><a href="#inicio">Início</a><a href="#trajetoria">Trajetória</a><a href="#resultados">Resultados</a><a href="#propostas">Propostas</a><a href="#verdade">Verdade</a><a href="#bolsonaro">Alianças</a><a href="#materiais">Materiais</a><a href="#contato">Contato</a></div>
          <div className="f-col"><h4>Fale conosco</h4><a className="f-contact-item" href={gutoWhatsAppUrl} target="_blank" rel="noopener noreferrer"><MessageCircle/><span>(21) 92011-2255</span></a></div>
          <div className="f-party"><PartyLogo/><p>Partido Liberal</p></div>
        </div><div className="f-bar"><div className="shell"><span>© 2026 Gutemberg Fonseca — Todos os direitos reservados.</span><span>CNPJ: 68.237.089/0001-48&nbsp;|&nbsp; <a href="#">Política de Privacidade</a>&nbsp;|&nbsp; <a href="#">Termos de Uso</a></span></div></div></footer>
      </main>
    </>
  );
}
