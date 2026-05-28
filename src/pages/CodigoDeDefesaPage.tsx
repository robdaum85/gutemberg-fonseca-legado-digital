import { useState } from "react";
import { useSeo } from "@/lib/useSeo";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz6SyRRoE9DZ8CzbAQB6DVudGncAMqF3pkxRvRIx9yQ4xsFtE5fEfUPyVNrZnL7okAW/exec";
const PAGE_URL = "https://gutembergfonseca.com.br/codigo-de-defesa-do-consumidor";
const PAGE_TITLE = "Defenda o Código de Defesa do Consumidor | PL 2766/2021";
const PAGE_DESCRIPTION =
  "Entenda como o PL 2766/2021 pode enfraquecer a proteção dos consumidores brasileiros e assine o abaixo-assinado em defesa do Código de Defesa do Consumidor.";

type FormState = {
  nome: string;
  email: string;
  telefone: string;
  termos: boolean;
};

const initialForm: FormState = {
  nome: "",
  email: "",
  telefone: "",
  termos: false,
};

const problems = [
  {
    icon: "💸",
    title: "Juros Abusivos",
    text: "Taxas que endividam famílias inteiras e destroem o poder de compra.",
  },
  {
    icon: "🧾",
    title: "Cobranças Indevidas",
    text: "Serviços não contratados e contas fantasmas todo mês.",
  },
  {
    icon: "🕵️",
    title: "Golpes Financeiros",
    text: "Falta de segurança no digital e bancos que lavam as mãos.",
  },
  {
    icon: "⚠️",
    title: "Serviços Precários",
    text: "Telecomunicações, energia e aviação com péssima qualidade.",
  },
  {
    icon: "🏦",
    title: "Abuso Bancário",
    text: "Venda casada, bloqueios sem aviso e falta de atendimento.",
  },
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const match = digits.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

  if (!match) return "";
  if (!match[2]) return match[1];

  return `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
}

export default function DefesaConsumidorPL2766Page() {
  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    canonical: PAGE_URL,
    type: "website",
    breadcrumbs: [
      { name: "Início", url: "https://gutembergfonseca.com.br/" },
      { name: "Código de Defesa do Consumidor", url: PAGE_URL },
    ],
    extraJsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      inLanguage: "pt-BR",
      about: [
        {
          "@type": "Thing",
          name: "Código de Defesa do Consumidor",
        },
        {
          "@type": "Thing",
          name: "PL 2766/2021",
        },
      ],
      potentialAction: {
        "@type": "RegisterAction",
        name: "Assinar abaixo-assinado em defesa do consumidor",
        target: `${PAGE_URL}#assine-agora`,
      },
    },
  });

  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.nome.trim() || !form.email.trim() || !form.termos) {
      setError("Preencha nome, e-mail e aceite os termos para continuar.");
      return;
    }

    setIsSubmitting(true);

    const data = {
      nome: form.nome.trim(),
      email: form.email.trim(),
      telefone: form.telefone.trim(),
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Erro ao enviar assinatura. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setForm(initialForm);
    setError("");
    setIsSuccess(false);
  }

  return (
    <main className="min-h-screen scroll-smooth bg-[#f8fafc] font-[Inter,system-ui,sans-serif] text-[#0f172a] antialiased selection:bg-[#1d4ed8] selection:text-white">
      <style>{`
        @keyframes pulseGold {
          0% { box-shadow: 0 0 0 0 rgba(255, 183, 0, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(255, 183, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 183, 0, 0); }
        }

        .btn-pulse-pl2766 {
          animation: pulseGold 2s infinite;
        }

        .highlight-pl2766 {
          background-color: #ffb700;
          color: #0f172a;
          padding: 0.1em 0.3em;
          border-radius: 0.25rem;
          font-weight: 900;
        }
      `}</style>

      <header className="relative overflow-hidden bg-[#0f172a] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1d4ed8] to-[#0f172a] opacity-90" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#0d9488] opacity-20 blur-3xl mix-blend-multiply" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center lg:py-28">
          <div className="mb-8 inline-block animate-bounce rounded-full bg-[#ffb700] px-5 py-2 text-sm font-bold uppercase tracking-wider text-[#0f172a] shadow-lg">
            ⚠️ Alerta aos Consumidores
          </div>

          <h1 className="mb-8 text-4xl font-black uppercase leading-tight md:text-6xl">
            Você sabia que querem{" "}
            <span className="text-[#ffb700] underline decoration-4 underline-offset-8">
              acabar
            </span>{" "}
            com o Código de Defesa do Consumidor?
          </h1>

          <p className="mb-12 max-w-4xl text-lg font-medium leading-relaxed text-gray-200 md:text-2xl">
            O <mark className="highlight-pl2766">PL 2766/2021</mark>, de autoria do ex-deputado{" "}
            <mark className="highlight-pl2766">Marco Bertaiolli</mark>, pode abrir caminho para um verdadeiro{" "}
            <strong className="border-b-2 border-[#0d9488] text-white">
              desmanche da proteção
            </strong>{" "}
            do consumidor brasileiro.
          </p>

          <p className="mb-5 text-sm font-semibold tracking-wide text-white">
            NÃO DEIXE QUE ACABEM COM OS SEUS DIREITOS
          </p>

          <a
            href="#assine-agora"
            className="btn-pulse-pl2766 flex items-center gap-3 rounded-full bg-[#ffb700] px-10 py-4 text-xl font-black text-[#0f172a] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#ffcc33]"
          >
            ✍️ ASSINE O ABAIXO-ASSINADO
          </a>
        </div>
      </header>

      <section id="assine-agora" className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h2 className="mb-6 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
                A realidade já é difícil.
                <br />
                <span className="text-[#1d4ed8]">Eles querem piorar.</span>
              </h2>

              <p className="mb-10 text-lg text-gray-600">
                Enquanto milhões de famílias sofrem diariamente, alguns parlamentares querem alterar as regras e enfraquecer a fiscalização contra empresas e infratores.
              </p>

              <div className="space-y-4">
                {problems.map((problem) => (
                  <div
                    key={problem.title}
                    className="flex items-center gap-4 rounded-xl border-l-4 border-[#0d9488] bg-[#f8fafc] p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl text-[#1d4ed8] shadow-sm">
                      {problem.icon}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#0f172a]">{problem.title}</h3>
                      <p className="text-sm text-gray-600">{problem.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-full lg:col-span-5">
              <div className="sticky top-8 rounded-3xl border-t-8 border-[#ffb700] bg-[#0f172a] p-6 shadow-2xl lg:p-8">
                {!isSuccess ? (
                  <>
                    <div className="mb-6 text-center">
                      <h3 className="mb-2 text-2xl font-black uppercase tracking-wide text-white">
                        Assine o Abaixo-Assinado
                      </h3>
                      <p className="text-sm text-[#f8fafc] opacity-90">
                        Mostre que o povo brasileiro está atento e não aceita ataques aos seus direitos.
                      </p>
                    </div>

                    {error && (
                      <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="nome" className="ml-1 mb-1 block text-xs font-semibold text-gray-300">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="nome"
                          required
                          value={form.nome}
                          onChange={(event) => updateField("nome", event.target.value)}
                          placeholder="Digite seu nome completo"
                          className="w-full rounded-xl border-0 bg-white px-4 py-2.5 text-sm text-[#0f172a] transition-all focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="ml-1 mb-1 block text-xs font-semibold text-gray-300">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={form.email}
                          onChange={(event) => updateField("email", event.target.value)}
                          placeholder="seu@email.com"
                          className="w-full rounded-xl border-0 bg-white px-4 py-2.5 text-sm text-[#0f172a] transition-all focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                        />
                      </div>

                      <div>
                        <label htmlFor="telefone" className="ml-1 mb-1 block text-xs font-semibold text-gray-300">
                          WhatsApp / Celular
                        </label>
                        <input
                          type="tel"
                          id="telefone"
                          value={form.telefone}
                          onChange={(event) => updateField("telefone", formatPhone(event.target.value))}
                          placeholder="(00) 00000-0000"
                          className="w-full rounded-xl border-0 bg-white px-4 py-2.5 text-sm text-[#0f172a] transition-all focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                        />
                      </div>

                      <div className="flex items-start pt-2">
                        <div className="flex h-5 items-center">
                          <input
                            id="termos"
                            type="checkbox"
                            required
                            checked={form.termos}
                            onChange={(event) => updateField("termos", event.target.checked)}
                            className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-[#ffb700] focus:ring-2 focus:ring-[#ffb700]"
                          />
                        </div>
                        <label htmlFor="termos" className="ml-3 text-xs leading-tight text-gray-400">
                          Concordo em assinar a petição e aceito receber atualizações sobre a defesa do consumidor.
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffb700] py-3.5 text-lg font-black uppercase text-[#0f172a] shadow-lg transition-colors hover:bg-[#ffcc33] disabled:cursor-progress disabled:opacity-70"
                      >
                        {isSubmitting ? "Enviando..." : "ASSINE O ABAIXO-ASSINADO"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="mt-4 rounded-2xl bg-white py-6 text-center">
                    <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0d9488]/20 text-3xl text-[#0d9488]">
                      ✓
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-[#0f172a]">Assinatura Confirmada!</h3>
                    <p className="mb-6 px-4 text-gray-600">
                      Sua voz foi adicionada à nossa luta. Juntos somos mais fortes.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-sm font-bold text-[#1d4ed8] transition-colors hover:text-[#ffb700]"
                    >
                      ↻ Preencher novamente
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-[#0f172a]">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#1d4ed8]">
              Entenda o que está em jogo
            </p>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              Por que defender o Código de Defesa do Consumidor?
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              O Código de Defesa do Consumidor é uma das principais garantias para quem enfrenta cobranças indevidas, juros abusivos, golpes financeiros, propaganda enganosa e serviços mal prestados. Ele protege a parte mais vulnerável da relação de consumo e ajuda a equilibrar a relação entre cidadãos, empresas e instituições financeiras.
            </p>

            <p>
              A preocupação com o <strong>PL 2766/2021</strong> é que mudanças na legislação podem enfraquecer instrumentos de fiscalização e dificultar a responsabilização de quem viola direitos básicos do consumidor. Em um cenário de superendividamento, fraudes digitais e aumento das reclamações contra serviços essenciais, o Brasil precisa ampliar a proteção, não reduzir.
            </p>

            <p>
              Esta campanha reúne consumidores que querem preservar direitos, fortalecer os órgãos de defesa do consumidor e impedir retrocessos. Assinar o abaixo-assinado é uma forma direta de demonstrar apoio público à manutenção e ao fortalecimento do Código de Defesa do Consumidor.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f8fafc] py-20 text-[#0f172a]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 text-6xl text-[#1d4ed8]">⚖️</div>

          <h2 className="mb-8 text-3xl font-black uppercase text-[#0f172a] md:text-5xl">
            A Ameaça do <span className="text-[#ffb700]">PL 2766/2021</span>
          </h2>

          <div className="space-y-6 rounded-3xl border border-gray-100 bg-white p-8 text-left text-lg text-gray-700 shadow-lg md:p-12 md:text-2xl">
            <p>
              O projeto de <mark className="highlight-pl2766">Marco Bertaiolli</mark> propõe mudanças que{" "}
              <strong>beneficiam quem desrespeita</strong> os direitos da população, protegendo o comércio ilegal e infratores ao invés do cidadão honesto.
            </p>

            <div className="mt-8 rounded-2xl border-b-4 border-[#0d9488] bg-[#1d4ed8] p-8 text-center text-white shadow-inner">
              <h3 className="mb-2 text-2xl font-bold md:text-3xl">
                O Brasil precisa de MAIS proteção ao consumidor.
              </h3>
              <p className="text-xl font-black uppercase tracking-wider text-[#ffcc33]">
                Não de retrocessos!
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t-8 border-[#ffb700] bg-[#0f172a] pb-8 pt-16 text-white">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.08)_2px,transparent_2px)] [background-size:20px_20px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div className="mb-12 border-b border-gray-700 pb-12">
            <h2 className="mb-4 text-3xl font-black text-[#ffb700] md:text-4xl">
              📣 AVISO AOS POLÍTICOS
            </h2>
            <p className="mt-4 text-xl font-bold text-gray-300 md:text-2xl">
              Quem votar a favor deste PL será taxado pelo povo como
              <br className="hidden md:block" />
              <span className="mt-3 inline-block rounded-lg bg-[#ffb700] px-4 py-2 font-black text-[#0f172a] shadow-lg">
                INIMIGO DO CONSUMIDOR!
              </span>
            </p>
          </div>

          <div className="text-gray-400">
            <p className="mb-2 font-semibold">
              Campanha Nacional em Defesa do Código de Defesa do Consumidor.
            </p>
            <p className="flex items-center justify-center gap-2 text-sm">
              🛡️ © 2026. Todos os direitos reservados à população brasileira.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
