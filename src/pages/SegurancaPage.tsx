import { useState } from "react";
import { useSeo } from "@/lib/useSeo";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxwiflS7nVhpcKm-eG6sceTa3cdKnB61vDxF-MrEsyWvi9sT7lwSAjmBUIn5HYxGoA/exec";
const HERO_IMAGE_URL =
  "https://kngofnnx.com/wp-content/uploads/2026/06/plenario-bg.jpg";
const PAGE_URL = "https://gutembergfonseca.com.br/seguranca";
const PAGE_TITLE = "Foco na Democracia | Segurança Pública";
const PAGE_DESCRIPTION =
  "Cadastre-se para acompanhar mobilizações cívicas sobre segurança pública e projetos de lei em tramitação.";

type FormState = {
  nome: string;
  email: string;
  estado: string;
  telefone: string;
};

const initialForm: FormState = {
  nome: "",
  email: "",
  estado: "",
  telefone: "",
};

const estados = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO",
];

const benefits = [
  "Recebe informações verificadas sobre projetos de lei em tramitação.",
  "É notificado sobre votações importantes.",
  "Participa de mobilizações cívicas legais e transparentes.",
  "Integra uma rede de cidadãos comprometidos com a segurança.",
];

const faqItems = [
  {
    question: "Vou receber spam?",
    answer:
      "Não. Você receberá apenas informações relevantes sobre segurança pública e atividade legislativa.",
  },
  {
    question: "Meus dados são vendidos?",
    answer:
      "Nunca. Seus dados são protegidos pela LGPD e utilizados exclusivamente para a finalidade informada no cadastro.",
  },
  {
    question: "Posso sair quando quiser?",
    answer:
      "Sim, a qualquer momento. Basta solicitar o cancelamento e seus dados serão removidos da base.",
  },
  {
    question: "Isso é filiação partidária?",
    answer:
      "Não. Este é um movimento de participação cidadã apartidário. Não há qualquer vínculo com partidos políticos.",
  },
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function SegurancaPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ title: string; message: string } | null>(
    null,
  );

  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    canonical: PAGE_URL,
    image: HERO_IMAGE_URL,
    type: "website",
    breadcrumbs: [
      { name: "Início", url: "https://gutembergfonseca.com.br/" },
      { name: "Segurança Pública", url: PAGE_URL },
    ],
    extraJsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      inLanguage: "pt-BR",
      potentialAction: {
        "@type": "RegisterAction",
        name: "Cadastrar-se para acompanhar mobilizações cívicas",
        target: `${PAGE_URL}#cadastro`,
      },
    },
  });

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function showToast(title: string, message: string) {
    setToast({ title, message });
    window.setTimeout(() => setToast(null), 5200);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome.trim(),
          email: form.email.trim(),
          estado: form.estado,
          telefone: form.telefone.trim() || "",
        }),
      });

      showToast(
        "Cadastro recebido!",
        "Obrigado por participar. Em breve você receberá informações.",
      );
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      showToast("Erro ao enviar", "Verifique sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen scroll-smooth bg-[#f6f1e8] font-[Inter,system-ui,sans-serif] text-[#172033] antialiased">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

        .seguranca-display {
          font-family: "Bebas Neue", Impact, sans-serif;
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 0.9;
        }

        .seguranca-input {
          width: 100%;
          min-height: 50px;
          border: 1px solid #e4e7ec;
          border-radius: 8px;
          padding: 12px 14px;
          background: #fbf8f1;
          color: #172033;
          font-weight: 500;
          outline: none;
        }

        .seguranca-input:focus {
          border-color: #c19031;
          box-shadow: 0 0 0 3px rgba(193, 144, 49, 0.22);
        }
      `}</style>

      <section
        className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-[#101a2d] px-4 text-white"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(16, 26, 45, 0.95), rgba(16, 26, 45, 0.78), rgba(16, 26, 45, 0.98)), url(${HERO_IMAGE_URL})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-auto max-w-5xl py-20 text-center">
          <h1 className="seguranca-display text-[clamp(3.4rem,14vw,10rem)]">
            A segurança pública{" "}
            <span className="text-[#d9ad55]">não pode mais esperar</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-[clamp(1.25rem,3vw,2rem)] font-bold leading-snug">
            Famílias brasileiras merecem viver sem medo.
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-white/75">
            É hora de cobrar mudanças do Congresso.
          </p>

          <a
            href="#formulario-cadastro"
            className="mt-10 inline-flex min-h-14 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#c19031] to-[#d9ad55] px-10 py-4 text-lg font-extrabold text-[#101a2d] no-underline shadow-[0_12px_30px_rgba(193,144,49,.34)] transition hover:-translate-y-0.5 hover:brightness-105 max-sm:w-full"
          >
            Quero participar
          </a>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#101a2d] to-[#243657] px-4 py-16 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Neste momento"
            eyebrowTone="red"
            title={
              <>
                Seu futuro está{" "}
                <span className="text-[#d9ad55]">sendo decidido</span>
              </>
            }
          />

          <p className="mx-auto mb-9 max-w-3xl text-center text-lg leading-relaxed text-white/80">
            O <strong className="text-[#d9ad55]">PL 5582/25</strong> e outros
            projetos estão em tramitação no Congresso Nacional. Essas propostas
            vão definir:
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            <InfoCard title="Forças de segurança">
              Terão ferramentas legais para agir com eficiência.
            </InfoCard>
            <InfoCard title="Consequências reais">
              Criminosos enfrentarão punições proporcionais.
            </InfoCard>
            <InfoCard title="Sua família">
              Poderá viver com mais tranquilidade.
            </InfoCard>
          </div>

          <p className="mx-auto mt-9 max-w-4xl rounded-lg border border-white/15 bg-white/10 p-5 text-center text-lg leading-relaxed text-white/90">
            Decisões que afetam{" "}
            <strong className="text-[#d9ad55]">215 milhões</strong> de
            brasileiros não podem ser tomadas apenas por 513 deputados e 81
            senadores.
          </p>
        </div>
      </section>

      <section id="cadastro" className="px-4 py-16 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Faça parte"
            title={
              <>
                Cadastre-se e faça parte{" "}
                <span className="text-[#c19031]">da mudança</span>
              </>
            }
          />

          <div className="grid gap-8 md:grid-cols-2 md:gap-14">
            <div>
              <h3 className="mb-5 text-2xl font-extrabold">
                Ao se cadastrar, você:
              </h3>

              <ul className="grid gap-4">
                {benefits.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[30px_1fr] items-start gap-3 text-lg leading-relaxed"
                  >
                    <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-gradient-to-br from-[#c19031] to-[#d9ad55] font-black text-[#101a2d]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg border border-[#e4e7ec] bg-white p-6 shadow-[0_8px_24px_rgba(16,26,45,.06)]">
                <strong className="text-[#182640]">
                  Não é filiação partidária. Não é obrigação política.
                </strong>
                <br />É participação cidadã organizada.
              </div>

              <div className="mt-6 rounded-lg border border-[#e4e7ec] bg-white p-6 shadow-[0_8px_24px_rgba(16,26,45,.06)]">
                <strong className="seguranca-display block text-[clamp(3rem,7vw,4.5rem)] text-[#182640]">
                  12.847+
                </strong>
                <span className="text-[#667085]">
                  brasileiros já se cadastraram
                </span>
              </div>
            </div>

            <form
              id="formulario-cadastro"
              onSubmit={handleSubmit}
              className="scroll-mt-8 rounded-lg border border-[#e4e7ec] bg-white p-6 shadow-[0_20px_50px_rgba(16,26,45,.16)] md:p-9"
            >
              <p className="mb-6 text-center text-[#667085]">
                Preencha seus dados abaixo
              </p>

              <Field id="nome" label="Nome completo *">
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  required
                  value={form.nome}
                  onChange={(event) => updateField("nome", event.target.value)}
                  placeholder="Seu nome completo"
                  className="seguranca-input"
                />
              </Field>

              <Field id="email" label="E-mail *">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  required
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="seu@email.com"
                  className="seguranca-input"
                />
              </Field>

              <Field id="estado" label="Estado *">
                <select
                  id="estado"
                  name="estado"
                  required
                  value={form.estado}
                  onChange={(event) =>
                    updateField("estado", event.target.value)
                  }
                  className="seguranca-input"
                >
                  <option value="">Selecione seu estado</option>
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                id="telefone"
                label={
                  <>
                    Telefone{" "}
                    <span className="font-medium text-[#667085]">
                      (opcional)
                    </span>
                  </>
                }
              >
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={15}
                  value={form.telefone}
                  onChange={(event) =>
                    updateField("telefone", formatPhone(event.target.value))
                  }
                  placeholder="(00) 00000-0000"
                  className="seguranca-input"
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex min-h-14 w-full items-center justify-center rounded-[10px] bg-gradient-to-br from-[#c19031] to-[#d9ad55] px-7 py-4 font-extrabold text-[#101a2d] shadow-[0_12px_30px_rgba(193,144,49,.34)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? "Enviando..." : "Quero acompanhar e participar"}
              </button>

              <div className="mt-4 text-center text-xs text-[#667085]">
                Seus dados estão protegidos conforme a LGPD.
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#101a2d] to-[#243657] px-4 py-16 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Nosso posicionamento"
            title={
              <>
                Defendemos uma{" "}
                <span className="text-[#d9ad55]">posição clara</span>
              </>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Pillar title="Segurança como prioridade">
              Forças equipadas e respaldadas.
            </Pillar>
            <Pillar title="Leis que funcionam">
              Menos brechas, mais efetividade.
            </Pillar>
            <Pillar title="Combate ao crime">
              Facções não podem vencer o Estado.
            </Pillar>
            <Pillar title="Transparência total">
              Decisões públicas e debatidas.
            </Pillar>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <ComparisonBox title="Quando participa">
              <li>Decisões com respaldo social</li>
              <li>Parlamentares pressionados</li>
              <li>Mudanças reais na legislação</li>
            </ComparisonBox>
            <ComparisonBox title="Quando se omite" red>
              <li>Decisões em gabinetes fechados</li>
              <li>Leis que favorecem criminosos</li>
              <li>Insegurança crônica</li>
            </ComparisonBox>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Consideração final"
            title={
              <>
                Sua participação{" "}
                <span className="text-[#c19031]">faz diferença</span>
              </>
            }
          />

          <div className="mx-auto mb-7 max-w-3xl text-center text-lg leading-relaxed text-[#667085]">
            <p>
              O crime organizado conta com sua <strong>omissão</strong>.
            </p>
            <p>
              Legisladores negligentes contam com sua <strong>distração</strong>
              .
            </p>
            <p>
              A mudança conta com sua{" "}
              <strong className="text-[#c19031]">ação</strong>.
            </p>
          </div>

          <div className="mx-auto mb-7 max-w-2xl rounded-lg border border-[#e4e7ec] bg-white p-7 text-center shadow-[0_8px_24px_rgba(16,26,45,.08)]">
            <p>Informar-se é seu direito.</p>
            <p>Participar é sua escolha.</p>
            <h3 className="seguranca-display mt-3 text-4xl text-[#c19031]">
              Fazer a diferença é sua responsabilidade.
            </h3>
          </div>

          <p className="text-center">
            <a
              href="#formulario-cadastro"
              className="inline-flex min-h-14 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#c19031] to-[#d9ad55] px-7 py-4 font-extrabold text-[#101a2d] no-underline shadow-[0_12px_30px_rgba(193,144,49,.34)] transition hover:-translate-y-0.5 hover:brightness-105 max-sm:w-full"
            >
              Quero participar agora
            </a>
          </p>

          <div className="mx-auto mt-14 max-w-3xl">
            <SectionHeading
              eyebrow="Dúvidas frequentes"
              title="Perguntas frequentes"
            />

            {faqItems.map((item) => (
              <details
                key={item.question}
                className="mb-3 rounded-lg border border-[#e4e7ec] bg-white shadow-[0_6px_18px_rgba(16,26,45,.05)]"
              >
                <summary className="cursor-pointer p-5 font-extrabold text-[#182640]">
                  {item.question}
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-[#667085]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#101a2d] px-4 pb-7 pt-12 text-white/70">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-7 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <h2 className="seguranca-display mb-4 text-4xl text-[#d9ad55]">
                Foco na
                <br />
                Democracia
              </h2>
              <p>
                Movimento apartidário de participação cidadã focado na segurança
                pública e transparência legislativa.
              </p>
            </div>
            <FooterColumn title="Links úteis">
              <a href="#cadastro">Cadastre-se</a>
              <a href="#cadastro">Sobre o Movimento</a>
              <a href="#cadastro">Política de Privacidade</a>
              <a href="#cadastro">Termos de Uso</a>
            </FooterColumn>
            <FooterColumn title="Contato">
              <span>contato@foconademocracia.org.br</span>
              <span>(11) 0000-0000</span>
              <span>Brasília, DF - Brasil</span>
            </FooterColumn>
            <FooterColumn title="Redes sociais">
              <a href="#cadastro">Facebook</a>
              <a href="#cadastro">Instagram</a>
              <a href="#cadastro">Twitter/X</a>
            </FooterColumn>
          </div>

          <div className="flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-sm">
            <span>
              © 2026 Foco na Democracia. Todos os direitos reservados.
            </span>
            <span>Dados protegidos conforme LGPD (Lei 13.709/2018).</span>
          </div>
        </div>
      </footer>

      {toast && (
        <div
          className="fixed bottom-5 right-5 z-50 max-w-[min(420px,calc(100%-36px))] rounded-lg bg-[#101a2d] px-5 py-4 text-white shadow-[0_20px_50px_rgba(16,26,45,.16)]"
          role="status"
          aria-live="polite"
        >
          <strong className="mb-1 block text-[#d9ad55]">{toast.title}</strong>
          <span>{toast.message}</span>
        </div>
      )}
    </main>
  );
}

function SectionHeading({
  eyebrow,
  eyebrowTone = "gold",
  title,
}: {
  eyebrow: string;
  eyebrowTone?: "gold" | "red";
  title: React.ReactNode;
}) {
  const eyebrowClass =
    eyebrowTone === "red"
      ? "bg-red-600/20 text-red-200"
      : "bg-[#c19031]/20 text-[#c19031] dark:text-[#d9ad55]";

  return (
    <div className="mb-10 text-center">
      <span
        className={`mb-5 inline-flex min-h-[34px] items-center justify-center rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider ${eyebrowClass}`}
      >
        {eyebrow}
      </span>
      <h2 className="seguranca-display text-[clamp(2.7rem,7vw,5rem)]">
        {title}
      </h2>
    </div>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-extrabold text-[#182640]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-lg border border-[#d9ad55]/30 bg-white/5 p-7">
      <h3 className="mb-2 text-xl font-bold text-[#d9ad55]">{title}</h3>
      <p className="leading-relaxed text-white/70">{children}</p>
    </article>
  );
}

function Pillar({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-lg border border-[#d9ad55]/30 bg-white/5 px-4 py-6 text-center">
      <h3 className="mb-2 font-bold text-[#d9ad55]">{title}</h3>
      <p className="text-sm leading-relaxed text-white/70">{children}</p>
    </article>
  );
}

function ComparisonBox({
  title,
  red = false,
  children,
}: {
  title: string;
  red?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border p-6 ${
        red
          ? "border-red-500/40 bg-red-700/10"
          : "border-[#d9ad55]/30 bg-[#c19031]/10"
      }`}
    >
      <h3
        className={`mb-4 font-bold ${red ? "text-red-200" : "text-[#d9ad55]"}`}
      >
        {title}
      </h3>
      <ul className="list-disc pl-5 leading-loose text-white/80">{children}</ul>
    </div>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 font-bold text-[#d9ad55]">{title}</h3>
      <div className="grid gap-2">
        {Array.isArray(children)
          ? children.map((child, index) => (
              <span
                key={index}
                className="[&_a]:text-white/70 [&_a]:no-underline hover:[&_a]:text-[#d9ad55]"
              >
                {child}
              </span>
            ))
          : children}
      </div>
    </div>
  );
}
