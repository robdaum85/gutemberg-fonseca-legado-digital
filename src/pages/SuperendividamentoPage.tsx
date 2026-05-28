import { FormEvent, useEffect, useState } from "react";
import { useSeo } from "@/lib/useSeo";

const FORM_ID = "1FAIpQLSdXT9BNJJNyT3vrO_NeLB35atJGoor6ltb8opxG-Ui4celV0g";

const ENTRY = {
  nome: "entry.2046066809",
  whatsapp: "entry.25969295",
  email: "entry.893845814",
};

const EBOOK_URL =
  "https://kngofnnx.com/wp-content/uploads/2026/05/ebook-gutemberg.pdf";

const maskWhatsapp = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length > 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  if (digits.length > 2) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length > 0) {
    return `(${digits}`;
  }

  return "";
};

const BenefitIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="#f5c518" strokeWidth="2" />
    <path
      d="M8 12l2.5 2.5L16 9"
      stroke="#f5c518"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SuperendividamentoPage = () => {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useSeo({
    title: "Virada de Chave - Junte-se a causa",
    description:
      "Cadastre-se para receber informacoes e baixar o ebook de Gutemberg Fonseca.",
    canonical: "https://gutembergfonseca.com.br/superendividamento",
    type: "website",
  });

  useEffect(() => {
    const preconnectGoogle = document.createElement("link");
    preconnectGoogle.rel = "preconnect";
    preconnectGoogle.href = "https://fonts.googleapis.com";

    const preconnectGstatic = document.createElement("link");
    preconnectGstatic.rel = "preconnect";
    preconnectGstatic.href = "https://fonts.gstatic.com";
    preconnectGstatic.crossOrigin = "anonymous";

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";

    document.head.append(preconnectGoogle, preconnectGstatic, fontLink);
    window.scrollTo(0, 0);

    return () => {
      preconnectGoogle.remove();
      preconnectGstatic.remove();
      fontLink.remove();
    };
  }, []);

  const startDownload = () => {
    const link = document.createElement("a");
    link.href = EBOOK_URL;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const showSuccess = () => {
    setIsSuccess(true);
    startDownload();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const trimmedNome = nome.trim();
    const trimmedWhatsapp = whatsapp.trim();
    const trimmedEmail = email.trim();

    if (!trimmedNome || !trimmedWhatsapp) {
      setErrorMessage("Preencha pelo menos o nome e o WhatsApp.");
      return;
    }

    setIsSubmitting(true);

    const body = new URLSearchParams();
    body.append(ENTRY.nome, trimmedNome);
    body.append(ENTRY.whatsapp, trimmedWhatsapp);
    if (trimmedEmail) body.append(ENTRY.email, trimmedEmail);

    const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    try {
      await fetch(url, { method: "POST", mode: "no-cors", body });
      showSuccess();
    } catch {
      setErrorMessage(
        "Nao foi possivel concluir. Verifique sua conexao e tente novamente."
      );
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "Recebe informacoes verificadas sobre projetos de lei em tramitacao.",
    "E notificado sobre votacoes importantes no Congresso.",
    "Participa de mobilizacoes civicas legais e transparentes.",
    "Integra uma rede de cidadaos comprometidos com a seguranca e a causa.",
  ];

  return (
    <main className="super-page">
      <style>{`
        .super-page {
          --bg-deep: #0a3a2a;
          --bg-deep-2: #0c4632;
          --card-tint: rgba(255, 255, 255, 0.04);
          --card-tint-border: rgba(255, 255, 255, 0.08);
          --highlight-box: rgba(0, 0, 0, 0.22);
          --gold: #f5c518;
          --green-btn: #19a64a;
          --green-btn-hover: #15923f;
          --white: #ffffff;
          --text-soft: rgba(255, 255, 255, 0.78);
          --text-muted: rgba(255, 255, 255, 0.55);
          --ink: #1f2937;
          --ink-soft: #6b7280;
          --field-bg: #f8fafc;
          --field-border: #e2e8f0;
          position: relative;
          display: flex;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          overflow-x: hidden;
          background:
            radial-gradient(1200px 600px at 85% -10%, var(--bg-deep-2), transparent 60%),
            var(--bg-deep);
          color: var(--white);
          font-family: "Poppins", system-ui, sans-serif;
          padding: 48px 24px;
        }

        .super-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 0L56 16v32L28 64 0 48V16z' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E");
          background-size: 56px 64px;
          opacity: 0.6;
          pointer-events: none;
        }

        .super-hero {
          position: relative;
          z-index: 1;
          display: grid;
          width: 100%;
          max-width: 1240px;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .super-eyebrow {
          display: flex;
          align-items: center;
          gap: 16px;
          color: var(--gold);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 18px;
        }

        .super-eyebrow::before {
          content: "";
          width: 36px;
          height: 2px;
          background: var(--gold);
        }

        .super-left h1 {
          font-size: clamp(40px, 5vw, 60px);
          font-weight: 800;
          line-height: 1.05;
          margin-bottom: 22px;
        }

        .super-lead {
          color: var(--text-soft);
          font-size: 18px;
          line-height: 1.55;
          max-width: 520px;
          margin-bottom: 28px;
        }

        .super-benefit {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: var(--card-tint);
          border: 1px solid var(--card-tint-border);
          border-radius: 14px;
          padding: 16px 18px;
          margin-bottom: 14px;
        }

        .super-benefit svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .super-benefit p {
          font-size: 15.5px;
          font-weight: 500;
          line-height: 1.4;
        }

        .super-pledge {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: var(--highlight-box);
          border: 1px solid rgba(25, 166, 74, 0.35);
          border-radius: 14px;
          padding: 18px 20px;
          margin-top: 22px;
        }

        .super-pledge h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .super-pledge p {
          color: var(--text-muted);
          font-size: 13.5px;
          line-height: 1.45;
        }

        .super-card {
          background: var(--white);
          border-radius: 24px;
          padding: 40px 38px;
          color: var(--ink);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
        }

        .super-card-title {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #14532d;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .super-card-sub {
          color: var(--ink-soft);
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 26px;
        }

        .super-field {
          margin-bottom: 18px;
        }

        .super-field label {
          display: block;
          color: #374151;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .super-field label span {
          color: var(--ink-soft);
          font-weight: 400;
        }

        .super-field input {
          width: 100%;
          border: 1px solid var(--field-border);
          border-radius: 12px;
          background: var(--field-bg);
          color: var(--ink);
          font-family: inherit;
          font-size: 15px;
          outline: none;
          padding: 14px 16px;
          transition: border-color .15s, box-shadow .15s;
        }

        .super-field input::placeholder {
          color: #9ca3af;
        }

        .super-field input:focus {
          border-color: var(--green-btn);
          box-shadow: 0 0 0 3px rgba(25, 166, 74, 0.15);
        }

        .super-submit-btn,
        .super-download-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #fff;
          background: var(--green-btn);
          border: none;
          border-radius: 12px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: .5px;
          transition: background .15s, transform .05s;
        }

        .super-submit-btn {
          width: 100%;
          cursor: pointer;
          margin-top: 8px;
          padding: 17px;
        }

        .super-submit-btn:hover,
        .super-download-btn:hover {
          background: var(--green-btn-hover);
        }

        .super-submit-btn:active {
          transform: scale(.99);
        }

        .super-submit-btn:disabled {
          cursor: progress;
          opacity: .7;
        }

        .super-privacy {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: var(--ink-soft);
          font-size: 13px;
          margin-top: 16px;
        }

        .super-success {
          text-align: center;
          padding: 8px 0;
        }

        .super-check-circle {
          display: flex;
          width: 64px;
          height: 64px;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: #dcfce7;
        }

        .super-success h2 {
          color: #14532d;
          font-size: 22px;
          margin-bottom: 8px;
        }

        .super-success p {
          color: var(--ink-soft);
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .super-download-btn {
          display: inline-flex;
          padding: 16px 28px;
          text-decoration: none;
        }

        .super-error-msg {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
          border-radius: 10px;
          font-size: 13.5px;
          margin-bottom: 16px;
          padding: 12px 14px;
        }

        @media (max-width: 900px) {
          .super-hero {
            grid-template-columns: 1fr;
            gap: 40px;
          }

        }

        @media (max-width: 520px) {
          .super-page {
            padding: 28px 16px;
          }

          .super-card {
            border-radius: 18px;
            padding: 28px 22px;
          }
        }
      `}</style>

      <section className="super-hero" aria-label="Virada de Chave">
        <section className="super-left">
          <div className="super-eyebrow">VIRADA DE CHAVE</div>
          <h1>O momento e agora.</h1>
          <p className="super-lead">
            Essas mudancas estao acontecendo, e quem estiver informado sai na
            frente. Ao se cadastrar, voce:
          </p>

          {benefits.map((benefit) => (
            <div className="super-benefit" key={benefit}>
              <BenefitIcon />
              <p>{benefit}</p>
            </div>
          ))}

          <div className="super-pledge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"
                stroke="#19a64a"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="#19a64a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <h3>Cidadania pura e simples</h3>
              <p>
                Nao e filiacao partidaria. Nao e obrigacao politica. E
                participacao cidada organizada e transparente.
              </p>
            </div>
          </div>
        </section>

        <aside className="super-card">
          {!isSuccess ? (
            <div>
              <div className="super-card-title">Junte-se a causa</div>
              <p className="super-card-sub">
                Preencha seus dados para receber os alertas e fazer parte da
                mudanca.
              </p>

              {errorMessage && (
                <div className="super-error-msg" role="alert">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="super-field">
                  <label htmlFor="nome">Seu Nome Completo</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Ex: Joao da Silva"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    required
                  />
                </div>

                <div className="super-field">
                  <label htmlFor="whatsapp">Seu WhatsApp</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="(00) 00000-0000"
                    value={whatsapp}
                    onChange={(event) =>
                      setWhatsapp(maskWhatsapp(event.target.value))
                    }
                    required
                  />
                </div>

                <div className="super-field">
                  <label htmlFor="email">
                    Seu E-mail <span>(Opcional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="super-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "CONCLUIR CADASTRO"}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>

              <div className="super-privacy">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="5"
                    y="11"
                    width="14"
                    height="9"
                    rx="2"
                    stroke="#6b7280"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 11V8a4 4 0 018 0v3"
                    stroke="#6b7280"
                    strokeWidth="2"
                  />
                </svg>
                Suas informacoes estao seguras. Nao enviamos spam.
              </div>
            </div>
          ) : (
            <div className="super-success">
              <div className="super-check-circle">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2>Cadastro concluido!</h2>
              <p>
                Obrigado por fazer parte da causa. Seu ebook esta pronto para
                download.
              </p>
              <a href={EBOOK_URL} className="super-download-btn" download>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Baixar o Ebook
              </a>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
};

export default SuperendividamentoPage;
