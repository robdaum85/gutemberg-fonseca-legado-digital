import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/federal/FederalMotion";
import { useSeo } from "@/lib/useSeo";
import { STATIC_PAGE_SEO, canonicalUrl } from "@/lib/siteSeo";
import "./MelPage.css";

// Não há backend: o cadastro vira uma mensagem de WhatsApp enviada pela própria
// pessoa para o número da equipe do Gutemberg, com os dados do formulário já
// preenchidos no texto. Não existe endpoint, banco de dados nem redirecionamento.
const MEL_WHATSAPP_PHONE = "5521920112255";

type ContactForm = {
  name: string;
  whatsapp: string;
  cidade: string;
  email: string;
  website: string; // honeypot
  consent: boolean;
};

const initialForm: ContactForm = {
  name: "",
  whatsapp: "",
  cidade: "",
  email: "",
  website: "",
  consent: false,
};

type FieldErrors = Partial<Record<keyof ContactForm, string>>;

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length > 11 && digits.startsWith("55")) return digits.slice(2, 13);
  return digits.slice(0, 11);
}

function formatPhone(value: string) {
  const digits = normalizePhone(value);
  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function buildWhatsappMessage(form: ContactForm) {
  const email = form.email.trim();
  return (
    `Olá, meu nome é ${form.name.trim()}, moro em ${form.cidade.trim()}. ` +
    `Vim pelo site do Movimento Endividados Livres (M.E.L.) e quero conversar com você.` +
    (email ? ` Meu e-mail: ${email}.` : "")
  );
}

function buildWhatsappUrl(form: ContactForm) {
  const text = encodeURIComponent(buildWhatsappMessage(form));
  return `https://api.whatsapp.com/send/?phone=${MEL_WHATSAPP_PHONE}&text=${text}&type=phone_number&app_absent=0`;
}

function dispatchAnalyticsEvent(eventName: string, details: Record<string, unknown>) {
  document.dispatchEvent(new CustomEvent(`mel:${eventName}`, { detail: details }));
  const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event: `mel_${eventName}`, ...details });
  }
}

export default function MelPage() {
  const seo = STATIC_PAGE_SEO["/mel"];
  useSeo({
    title: seo.title,
    description: seo.description,
    canonical: canonicalUrl(seo.path),
    image: seo.image,
    noindex: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Header / navegação mobile
  const [isNavOpen, setNavOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const navToggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function updateHeader() {
      setScrolled(window.scrollY > 18);
    }
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mel-nav-open", isNavOpen);
    return () => document.body.classList.remove("mel-nav-open");
  }, [isNavOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".site-header")) setNavOpen(false);
    }
    function handleKeydown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setNavOpen((wasOpen) => {
        if (wasOpen) navToggleRef.current?.focus();
        return false;
      });
    }
    const desktopQuery = window.matchMedia("(min-width: 861px)");
    function handleBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setNavOpen(false);
    }

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);
    desktopQuery.addEventListener("change", handleBreakpoint);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
      desktopQuery.removeEventListener("change", handleBreakpoint);
    };
  }, []);

  // CTA mobile fixo: visível entre o fim do hero e o início do check-in
  const [isMobileCtaVisible, setMobileCtaVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const checkinRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function updateMobileCta() {
      const hero = heroRef.current;
      const checkin = checkinRef.current;
      if (!hero || !checkin) return;
      const heroRect = hero.getBoundingClientRect();
      const checkinRect = checkin.getBoundingClientRect();
      const hasPassedHero = heroRect.bottom <= window.innerHeight * 0.42;
      const hasNotReachedCheckin = checkinRect.top >= window.innerHeight * 0.48;
      setMobileCtaVisible(hasPassedHero && hasNotReachedCheckin);
    }
    updateMobileCta();
    window.addEventListener("scroll", updateMobileCta, { passive: true });
    window.addEventListener("resize", updateMobileCta);
    return () => {
      window.removeEventListener("scroll", updateMobileCta);
      window.removeEventListener("resize", updateMobileCta);
    };
  }, []);

  // Privacidade: abre o <details> se a página carregar com #privacidade
  useEffect(() => {
    if (window.location.hash === "#privacidade") {
      const details = document.querySelector<HTMLDetailsElement>("#privacidade details");
      if (details) details.open = true;
    }
  }, []);

  function openPrivacy() {
    const details = document.querySelector<HTMLDetailsElement>("#privacidade details");
    if (details) details.open = true;
  }

  // Formulário
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formStatus, setFormStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadFirstName, setLeadFirstName] = useState("");
  const [whatsappHref, setWhatsappHref] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const whatsappInputRef = useRef<HTMLInputElement>(null);
  const cidadeInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const consentInputRef = useRef<HTMLInputElement>(null);

  function updateField<K extends keyof ContactForm>(key: K, value: ContactForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validateContactFields(): boolean {
    const nameValue = form.name.trim();
    const nameIsValid = nameValue.length >= 2 && /^[a-zA-ZÀ-ÿ\s'.-]+$/.test(nameValue);
    const cidadeValue = form.cidade.trim();
    const cidadeIsValid = cidadeValue.length >= 2 && /^[a-zA-ZÀ-ÿ0-9\s,.-]+$/.test(cidadeValue);
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const whatsappDigits = normalizePhone(form.whatsapp);
    const whatsappIsValid = (whatsappDigits.length === 10 || whatsappDigits.length === 11) && whatsappDigits[0] !== "0";
    const consentIsValid = form.consent;

    const nextErrors: FieldErrors = {
      name: nameIsValid ? undefined : "Informe como podemos chamar você, usando apenas letras.",
      cidade: cidadeIsValid ? undefined : "Informe a sua cidade.",
      email: emailIsValid ? undefined : "Digite um e-mail válido.",
      whatsapp: whatsappIsValid ? undefined : "Digite um WhatsApp válido, incluindo o DDD.",
      consent: consentIsValid ? undefined : "Confirme a autorização para continuar.",
    };
    setErrors(nextErrors);

    if (!nameIsValid) nameInputRef.current?.focus();
    else if (!whatsappIsValid) whatsappInputRef.current?.focus();
    else if (!cidadeIsValid) cidadeInputRef.current?.focus();
    else if (!emailIsValid) emailInputRef.current?.focus();
    else if (!consentIsValid) consentInputRef.current?.focus();

    return nameIsValid && cidadeIsValid && emailIsValid && whatsappIsValid && consentIsValid;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.website) return; // honeypot preenchido: descarta silenciosamente
    if (!validateContactFields()) {
      setFormStatus("Revise os campos indicados antes de continuar.");
      return;
    }

    setFormStatus("");
    const url = buildWhatsappUrl(form);
    setWhatsappHref(url);
    setLeadFirstName(form.name.trim().split(/\s+/)[0]);
    setIsSuccess(true);
    dispatchAnalyticsEvent("lead_completed", { mode: "whatsapp" });

    // Sem backend: o cadastro é a própria mensagem de WhatsApp. Abrir aqui,
    // dentro do mesmo clique do envio, evita bloqueio de pop-up do navegador.
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleRestart() {
    setForm(initialForm);
    setErrors({});
    setFormStatus("");
    setIsSuccess(false);
  }

  function handleStartCheckinClick(source: "mobile_sticky" | "page_cta") {
    dispatchAnalyticsEvent("quiz_started", { source });
  }

  const successMessage =
    "Seu cadastro foi recebido. Abrimos o WhatsApp para você falar com a equipe do Gutemberg — se não abriu, use o botão abaixo.";

  return (
    <div className="mel-page">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} ref={headerRef}>
        <div className="container site-header__inner">
          <a className="brand" href="#topo" aria-label="M.E.L., voltar ao início">
            <img src="/images/mel/mel-logo.png" alt="M.E.L. Movimento Endividado$ Livres" width={709} height={307} />
          </a>

          <nav className={`main-nav${isNavOpen ? " is-open" : ""}`} id="main-nav" aria-label="Navegação principal">
            <a href="#voce-nao-esta-so" onClick={() => setNavOpen(false)}>Por que o M.E.L.</a>
            <a href="#parceria" onClick={() => setNavOpen(false)}>Gutemberg e Babi</a>
            <a href="#propostas" onClick={() => setNavOpen(false)}>Propostas</a>
            <a href="#check-in" onClick={() => setNavOpen(false)}>Cadastro</a>
          </nav>

          <a
            className="button button--small header-cta"
            href="#cadastro"
            onClick={() => handleStartCheckinClick("page_cta")}
          >
            Quero começar
          </a>

          <button
            ref={navToggleRef}
            className="nav-toggle"
            type="button"
            aria-expanded={isNavOpen}
            aria-controls="main-nav"
            aria-label={isNavOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setNavOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="topo" ref={heroRef}>
          <div className="hero__glow" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__content">
              <Reveal>
                <p className="eyebrow">Movimento Endividado$ Livres · RJ + SP</p>
              </Reveal>
              <Reveal>
                <h1 className="hero__title">
                  A <span>escravidão das dívidas</span> vai acabar.
                </h1>
              </Reveal>
              <Reveal>
                <p className="hero-partnership">
                  Gutemberg no Rio.
                  <br />
                  Babi em São Paulo.
                  <br />
                  <strong>Uma causa que une.</strong>
                </p>
              </Reveal>
              <Reveal>
                <p className="hero__lead">
                  82% das famílias brasileiras estão endividadas. Os bancos lucraram 107 bilhões. E a culpa{" "}
                  <strong>NÃO</strong> é sua.
                </p>
              </Reveal>

              <Reveal className="hero__actions">
                <a className="button" href="#cadastro" onClick={() => handleStartCheckinClick("page_cta")}>
                  Quero dar o primeiro passo
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a className="text-link" href="#propostas">
                  Conhecer as propostas
                  <span aria-hidden="true">↓</span>
                </a>
              </Reveal>

              <Reveal>
                <p className="hero__microcopy">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3 5 6v5c0 4.6 2.8 8.2 7 10 4.2-1.8 7-5.4 7-10V6l-7-3Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Leva 1 minuto. Gratuito. Sem informar o valor da dívida.
                </p>
              </Reveal>
            </div>

            <Reveal className="hero__visual duo-visual">
              <p className="duo-visual__tag">Dois estados. A mesma luta.</p>
              <div className="duo-visual__portraits">
                <figure className="duo-person duo-person--guto">
                  <img
                    src="/images/federal/hero/section-01-hero-gutemberg-principal-768x960.webp"
                    srcSet="/images/federal/hero/section-01-hero-gutemberg-principal-480x600.webp 480w, /images/federal/hero/section-01-hero-gutemberg-principal-768x960.webp 768w"
                    sizes="(max-width: 860px) 45vw, 260px"
                    width={768}
                    height={960}
                    alt="Gutemberg Fonseca, de braços cruzados, com o colete da defesa do consumidor"
                  />
                  <figcaption>
                    <span>Rio de Janeiro</span>
                    <strong>
                      Gutemberg
                      <br />
                      Fonseca
                    </strong>
                    <b>2255</b>
                    <small>Deputado federal · RJ</small>
                  </figcaption>
                </figure>
                <figure className="duo-person duo-person--babi">
                  <img
                    src="/mel/assets/babi-540.webp"
                    srcSet="/mel/assets/babi-360.webp 360w, /mel/assets/babi-540.webp 540w, /mel/assets/babi-720.webp 720w, /mel/assets/babi-900.webp 900w"
                    sizes="(max-width: 860px) 45vw, 260px"
                    width={540}
                    height={810}
                    alt="Babi Mendes, sorrindo, de braços cruzados"
                  />
                  <figcaption>
                    <span>São Paulo</span>
                    <strong>
                      Babi
                      <br />
                      Mendes
                    </strong>
                    <b>2206</b>
                    <small>Deputada federal · SP</small>
                  </figcaption>
                </figure>
              </div>
              <p className="duo-visual__caption">Candidatos a deputado federal pelo M.E.L.</p>
            </Reveal>
          </div>

          <a className="hero__scroll" href="#voce-nao-esta-so" aria-label="Continue para a próxima seção">
            <span>Continue</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
        </section>

        <section className="truth-section" id="voce-nao-esta-so">
          <div className="container truth-section__grid">
            <Reveal as="div" className="truth-section__heading">
              <p className="eyebrow eyebrow--light">Sem culpa. Com clareza.</p>
              <h2>
                Você não é <br />
                a sua dívida.
              </h2>
            </Reveal>

            <Reveal as="div" className="truth-section__content">
              <p className="truth-section__intro">
                O endividamento não define o seu valor como pessoa, pai, mãe ou profissional. Ele pode afetar o sono,
                as relações e as decisões, mas você não precisa carregar tudo em silêncio.
              </p>

              <figure className="truth-quote">
                <blockquote>
                  <span className="quote-mark" aria-hidden="true">
                    "
                  </span>
                  Eu sou uma dessas 82%. E eu me recuso a assistir 84 milhões de brasileiros passarem pelo que eu
                  passei.
                </blockquote>
                <figcaption className="truth-quote__author">
                  <img
                    className="truth-quote__avatar"
                    src="/mel/assets/avatar-280.webp"
                    alt=""
                    width={280}
                    height={280}
                    loading="lazy"
                  />
                  <span>
                    <strong>Babi Mendes</strong>, candidata a deputada federal por São Paulo
                  </span>
                </figcaption>
              </figure>

              <p className="truth-section__closing">Antes de se culpar, dê o primeiro passo com a gente.</p>
            </Reveal>
          </div>
        </section>

        <section className="candidate-section" aria-labelledby="candidate-title">
          <div className="candidate-section__stats">
            <Reveal as="div" className="container">
              <p className="eyebrow eyebrow--ink">Tudo no mesmo ano</p>

              <ul className="candidate-section__stats-list" aria-label="Números do endividamento no Brasil">
                <li className="candidate-section__stat">
                  <div className="candidate-section__stat-number" aria-hidden="true">
                    <strong>82</strong>
                    <span>%</span>
                  </div>
                  <p className="candidate-section__stat-label">
                    <span className="sr-only">82% </span>das famílias endividadas
                  </p>
                </li>
                <li className="candidate-section__stat">
                  <div className="candidate-section__stat-number" aria-hidden="true">
                    <strong>84</strong>
                    <span>mi</span>
                  </div>
                  <p className="candidate-section__stat-label">
                    <span className="sr-only">84 milhões </span>com nome sujo
                  </p>
                </li>
                <li className="candidate-section__stat">
                  <div className="candidate-section__stat-number" aria-hidden="true">
                    <strong>451</strong>
                    <span>%</span>
                  </div>
                  <p className="candidate-section__stat-label">
                    <span className="sr-only">451% </span>de juros ao ano no rotativo
                  </p>
                </li>
                <li className="candidate-section__stat">
                  <div className="candidate-section__stat-number" aria-hidden="true">
                    <span className="candidate-section__stat-prefix">R$</span>
                    <strong>107</strong>
                    <span>bi</span>
                  </div>
                  <p className="candidate-section__stat-label">
                    <span className="sr-only">107 bilhões de reais </span>de lucro dos bancos
                  </p>
                </li>
              </ul>

              <p className="candidate-section__verdict">
                Isso não é crise. <span>É projeto.</span>
              </p>
              <p className="candidate-section__stats-source">
                Fontes: PEIC/CNC (endividamento); Serasa (inadimplentes); Banco Central (juros do rotativo); balanços
                dos maiores bancos (lucro).
              </p>
            </Reveal>
          </div>

          <div className="candidate-section__body section" id="propostas">
            <div className="container candidate-section__grid">
              <Reveal as="div" className="section-heading section-heading--tight candidate-section__heading">
                <p className="eyebrow">Rio de Janeiro + São Paulo</p>
                <h2 id="candidate-title">Do movimento para o Congresso.</h2>
                <p className="candidate-section__bio">
                  A vivência de Babi com o endividamento se encontra com a trajetória de Gutemberg na defesa do
                  consumidor. Duas histórias que se somam a uma pauta: mais proteção, informação e caminhos para
                  recomeçar.
                </p>
              </Reveal>

              <Reveal as="div" className="proposals">
                <h3 className="eyebrow eyebrow--light proposals__title">As propostas do M.E.L. para o Congresso</h3>

                <ol className="proposals__list">
                  <li className="proposal">
                    <span className="proposal__number" aria-hidden="true">01</span>
                    <div>
                      <h4>Teto real de juros pro consumidor.</h4>
                      <p>Na taxa. No ato. Com fiscalização. O Brasil cobra 451% no rotativo. A média mundial é 10 vezes menor.</p>
                    </div>
                  </li>
                  <li className="proposal">
                    <span className="proposal__number" aria-hidden="true">02</span>
                    <div>
                      <h4>Programa Nacional de Renegociação.</h4>
                      <p>O modelo que já funciona no Rio de Janeiro levado pro Brasil inteiro. Começando pelo eixo Rio e São Paulo.</p>
                    </div>
                  </li>
                  <li className="proposal">
                    <span className="proposal__number" aria-hidden="true">03</span>
                    <div>
                      <h4>Restrição severa das bets.</h4>
                      <p>O governo regulamentou o cassino no celular do povo. A gente vai desarmar essa bomba.</p>
                    </div>
                  </li>
                  <li className="proposal">
                    <span className="proposal__number" aria-hidden="true">04</span>
                    <div>
                      <h4>Proteção do consumidor digital.</h4>
                      <p>Sistema integrado entre estados pra pegar golpista. Golpista não pode mudar de CEP e sumir.</p>
                    </div>
                  </li>
                </ol>

                <p className="proposals__motto">
                  Indignação sem projeto é desabafo.
                  <span>Indignação com projeto de lei é libertação.</span>
                </p>

                <a
                  className="button proposals__cta"
                  href="#cadastro"
                  onClick={() => handleStartCheckinClick("page_cta")}
                >
                  Quero me cadastrar
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>

                <span className="proposals__watermark" aria-hidden="true">M.E.L.</span>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="checkin-section section" id="check-in" ref={checkinRef}>
          <div className="container checkin-section__grid">
            <Reveal as="section" className="checkin-intro">
              <p className="eyebrow eyebrow--light">Cadastro</p>
              <h2>Entre no movimento. Sem julgamento, sem custo.</h2>
              <p>
                Deixe seu contato para falar com a equipe do Gutemberg, no Rio de Janeiro, sobre o M.E.L. Ninguém vai
                perguntar como você chegou até aqui.
              </p>

              <ul className="checkin-assurances" aria-label="Informações sobre o cadastro">
                <li>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
                  Gratuito, sem nenhum custo
                </li>
                <li>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
                  Leva cerca de 1 minuto
                </li>
                <li>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
                  Sem informar o valor da dívida
                </li>
                <li>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
                  Você pode sair quando quiser
                </li>
              </ul>
            </Reveal>

            <div id="cadastro">
            <Reveal as="div" className="quiz-card">

              {!isSuccess ? (
                <form id="lead-form" noValidate onSubmit={handleSubmit}>
                  <section className="quiz-step contact-step is-active" aria-labelledby="contact-title">
                    <div className="contact-step__heading">
                      <span className="contact-step__badge" aria-hidden="true">✦</span>
                      <div>
                        <p>Você não precisa resolver tudo hoje.</p>
                        <h3 id="contact-title">Chegou um M.E.L. para você.</h3>
                      </div>
                    </div>

                    <p className="contact-step__intro">
                      Dê o primeiro passo para tirar esse peso da cabeça e receber os próximos conteúdos do
                      movimento.
                    </p>

                    <div className="form-grid">
                      <div className="field field--full">
                        <label htmlFor="name">Nome</label>
                        <input
                          ref={nameInputRef}
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Como podemos chamar você?"
                          minLength={2}
                          maxLength={80}
                          required
                          aria-describedby="name-error"
                          aria-invalid={errors.name ? "true" : undefined}
                          value={form.name}
                          onChange={(event) => updateField("name", event.target.value)}
                        />
                        <p className="field-error" id="name-error" aria-live="polite">{errors.name}</p>
                      </div>

                      <div className="field field--full">
                        <label htmlFor="whatsapp">WhatsApp com DDD</label>
                        <input
                          ref={whatsappInputRef}
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="(00) 00000-0000"
                          maxLength={19}
                          required
                          aria-describedby="whatsapp-error"
                          aria-invalid={errors.whatsapp ? "true" : undefined}
                          value={form.whatsapp}
                          onChange={(event) => updateField("whatsapp", formatPhone(event.target.value))}
                        />
                        <p className="field-error" id="whatsapp-error" aria-live="polite">{errors.whatsapp}</p>
                      </div>

                      <div className="field">
                        <label htmlFor="cidade">Cidade</label>
                        <input
                          ref={cidadeInputRef}
                          id="cidade"
                          name="cidade"
                          type="text"
                          autoComplete="address-level2"
                          placeholder="Onde você mora"
                          maxLength={120}
                          required
                          aria-describedby="cidade-error"
                          aria-invalid={errors.cidade ? "true" : undefined}
                          value={form.cidade}
                          onChange={(event) => updateField("cidade", event.target.value)}
                        />
                        <p className="field-error" id="cidade-error" aria-live="polite">{errors.cidade}</p>
                      </div>
                      <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                          ref={emailInputRef}
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          placeholder="voce@exemplo.com"
                          maxLength={120}
                          required
                          aria-describedby="email-error"
                          aria-invalid={errors.email ? "true" : undefined}
                          value={form.email}
                          onChange={(event) => updateField("email", event.target.value)}
                        />
                        <p className="field-error" id="email-error" aria-live="polite">{errors.email}</p>
                      </div>
                    </div>

                    <div className="honeypot" aria-hidden="true">
                      <label htmlFor="website">Não preencha este campo</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(event) => updateField("website", event.target.value)}
                      />
                    </div>

                    <label className="consent">
                      <input
                        ref={consentInputRef}
                        type="checkbox"
                        name="consent"
                        checked={form.consent}
                        required
                        aria-describedby="consent-error"
                        onChange={(event) => updateField("consent", event.target.checked)}
                      />
                      <span aria-hidden="true" />
                      <small>
                        Autorizo a equipe de Gutemberg Fonseca (2255/RJ) a usar meus dados para contato sobre o
                        M.E.L. por e-mail e WhatsApp, conforme a política de privacidade. Posso cancelar a qualquer
                        momento.{" "}
                        <a
                          href="#privacidade"
                          target="_blank"
                          rel="noopener"
                          onClick={openPrivacy}
                        >
                          Saiba como cuidamos dos seus dados.
                        </a>
                      </small>
                    </label>
                    <p className="field-error" id="consent-error" aria-live="polite">{errors.consent}</p>

                    <p className="form-status" role="status" aria-live="polite">{formStatus}</p>

                    <div className="quiz-actions quiz-actions--solo">
                      <button className="button button--block" type="submit">
                        <span>Quero dar o primeiro passo</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </button>
                    </div>
                  </section>
                </form>
              ) : (
                <section className="success-state" tabIndex={-1}>
                  <div className="success-state__icon" aria-hidden="true">
                    <svg viewBox="0 0 48 48"><path d="m11 24 9 9 18-19" /></svg>
                  </div>
                  <p className="eyebrow">Primeiro passo concluído</p>
                  <h3>
                    Você não está sozinho, <span>{leadFirstName}</span>.
                  </h3>
                  <p>{successMessage}</p>
                  <div className="quiz-actions">
                    <button className="button button--ghost" type="button" onClick={handleRestart}>
                      Fazer outro cadastro
                    </button>
                    <a className="button" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => dispatchAnalyticsEvent("whatsapp_click", {})}>
                      Entrar no WhatsApp do M.E.L.
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </section>
              )}

              <noscript>
                <style>{`[data-submit-button] { display: none; }`}</style>
                <p className="noscript-message">Ative o JavaScript para enviar o cadastro.</p>
              </noscript>
            </Reveal>
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-section__shape" aria-hidden="true" />
          <Reveal as="div" className="container closing-section__content">
            <p className="eyebrow eyebrow--light">Um passo possível hoje</p>
            <h2>
              A dívida faz parte da sua história. <br />
              <span>Ela não precisa definir o seu futuro.</span>
            </h2>
            <p>Clareza não resolve tudo de uma vez, mas muda a direção.</p>
            <a
              className="button button--light"
              href="#cadastro"
              onClick={() => handleStartCheckinClick("page_cta")}
            >
              Quero fazer parte do M.E.L.
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </Reveal>
        </section>

        <section className="privacy-section" id="privacidade" aria-labelledby="privacy-title">
          <div className="container">
            <details>
              <summary id="privacy-title">
                <span>Privacidade e uso dos seus dados</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </summary>
              <div className="privacy-section__content">
                <p><strong>Como funciona o cadastro.</strong> Ao confirmar o formulário, abrimos o WhatsApp com uma mensagem já preenchida com os dados que você digitou, para você enviar diretamente à equipe de Gutemberg Fonseca. O site não guarda esses dados em nenhum servidor ou banco de dados: eles só chegam à equipe se você enviar a mensagem pelo seu próprio WhatsApp.</p>
                <p><strong>Atendimento no Rio.</strong> O cadastro desta página será destinado à equipe de Gutemberg Fonseca (2255/RJ), para contato sobre o M.E.L. por e-mail e WhatsApp. A presença da Babi nesta página não implica envio dos seus dados para a equipe de São Paulo.</p>
                <p><strong>Contato.</strong> Fale com a equipe pelo e-mail <a href="mailto:contato@gutembergfonseca.com.br">contato@gutembergfonseca.com.br</a>.</p>
                <p className="privacy-section__notice">Campanha de Gutemberg Fonseca · Deputado Federal RJ · CNPJ 68.237.089/0001-48.</p>
              </div>
            </details>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <a className="footer-brand" href="#topo" aria-label="M.E.L., voltar ao início">
            <img src="/images/mel/mel-logo.png" alt="M.E.L. Movimento Endividado$ Livres" width={709} height={307} loading="lazy" />
          </a>

          <p className="site-footer__about">
            Informação e acolhimento para organizar a mente e o bolso. O M.E.L. une Babi Mendes, 2206, candidata a
            deputada federal por São Paulo, e Gutemberg Fonseca, 2255, candidato a deputado federal pelo Rio de
            Janeiro.
          </p>

          <nav className="footer-nav" aria-label="Links do rodapé">
            <a href="#propostas">Propostas</a>
            <a href="#check-in">Cadastro</a>
            <a href="#privacidade" onClick={openPrivacy}>Privacidade</a>
          </nav>
        </div>

        <div className="container">
          <ul className="site-footer__ticket" aria-label="Candidatos apoiados pelo movimento">
            <li>Gutemberg Fonseca <strong>2255</strong> Deputado Federal RJ</li>
            <li>Babi Mendes <strong>2206</strong> Deputada Federal SP</li>
            <li>Flávio Bolsonaro <strong>22</strong> Presidente</li>
          </ul>
        </div>

        <div className="container site-footer__legal">
          <div>
            <p>© <span>{new Date().getFullYear()}</span> Movimento Endividado$ Livres, A Nova Abolição.</p>
            <p>M.E.L. no Rio de Janeiro e em São Paulo. Atendimento desta página: equipe de Gutemberg Fonseca (2255/RJ).</p>
            <p>
              Conteúdo político-eleitoral. As informações desta página não substituem orientação financeira, jurídica
              ou psicológica individualizada.
            </p>
          </div>
          <p>
            Gutemberg Fonseca · Deputado Federal RJ · CNPJ 68.237.089/0001-48
            <br />
            Bárbara Hannelore da Silva Mendes · Deputada Federal SP · CNPJ 68.352.923/0001-46
          </p>
        </div>
      </footer>

      <a
        className={`mobile-cta${isMobileCtaVisible ? " is-visible" : ""}`}
        href="#cadastro"
        onClick={() => handleStartCheckinClick("mobile_sticky")}
      >
        Quero dar o primeiro passo
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
