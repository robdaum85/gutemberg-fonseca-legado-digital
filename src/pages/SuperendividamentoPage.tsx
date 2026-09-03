import { useState } from "react";
import { useSeo } from "@/lib/useSeo";
import { STATIC_PAGE_SEO, canonicalUrl } from "@/lib/siteSeo";

const FORM_ID = "1FAIpQLSdXT9BNJJNyT3vrO_NeLB35atJGoor6ltb8opxG-Ui4celV0g";

const ENTRY = {
  nome: "entry.2046066809",
  whatsapp: "entry.25969295",
  email: "entry.893845814",
};

const EBOOK_URL = "/ebook%20gutemberg.pdf";

export default function LandingSuperendividamento() {
  const seo = STATIC_PAGE_SEO["/superendividamento"];
  useSeo({
    title: seo.title,
    description: seo.description,
    canonical: canonicalUrl(seo.path),
    image: seo.image,
    extraJsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seo.title,
      description: seo.description,
      url: canonicalUrl(seo.path),
      inLanguage: "pt-BR",
      about: { "@type": "Thing", name: "Superendividamento" },
    },
  });
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function formatWhatsapp(value: string) {
    let v = value.replace(/\D/g, "").slice(0, 11);

    if (v.length > 6) {
      v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    } else if (v.length > 2) {
      v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    } else if (v.length > 0) {
      v = `(${v}`;
    }

    return v;
  }

  function startDownload() {
    const a = document.createElement("a");
    a.href = EBOOK_URL;
    a.setAttribute("download", "");
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!nome.trim() || !whatsapp.trim()) {
      setError("Preencha pelo menos o nome e o WhatsApp.");
      return;
    }

    setLoading(true);

    const body = new URLSearchParams();
    body.append(ENTRY.nome, nome.trim());
    body.append(ENTRY.whatsapp, whatsapp.trim());

    if (email.trim()) {
      body.append(ENTRY.email, email.trim());
    }

    const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      setSuccess(true);
      setTimeout(startDownload, 300);
    } catch (err) {
      setError("Não foi possível concluir. Verifique sua conexão e tente novamente.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white font-[Poppins,system-ui,sans-serif] text-slate-900">
      <section className="relative overflow-hidden bg-[radial-gradient(900px_500px_at_90%_-20%,#1a52cf,transparent_60%),linear-gradient(135deg,#061f5a,#0c3fae_55%,#082c7d)] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[length:22px_22px] opacity-50" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="mb-6 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[.18em]">
              Material gratuito
            </span>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
              <span className="block whitespace-nowrap text-[clamp(1.75rem,7.3vw,2.125rem)] md:text-5xl">
                SUPERENDIVIDAMENTO:
              </span>
              <span className="text-[#ffd60a]">Entenda seus Direitos</span>
              <br />e saiba como sair das dívidas.
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Está endividado e não sabe por onde começar? Baixe gratuitamente o e-book que preparamos para você e organize sua vida financeira com segurança.
            </p>

            <a
              href="#cadastro"
              className="inline-flex items-center justify-center rounded-xl bg-[#ffd60a] px-7 py-4 text-sm font-extrabold tracking-wide text-[#082c7d] shadow-[0_10px_24px_rgba(255,214,10,.35)] transition hover:bg-[#e6be00]"
            >
              BAIXAR E-BOOK GRATUITO
            </a>
          </div>

          <div className="relative flex justify-center">
            <div className="relative h-[360px] w-[270px] rotate-3 overflow-hidden rounded-lg bg-[#ffd60a] p-3 shadow-[0_30px_60px_rgba(0,0,0,.45),inset_0_0_0_10px_#fff]">
              <div className="absolute left-5 top-[70px] h-[230px] w-[230px] rounded-full bg-[#0c3fae]" />
              <div className="absolute bottom-[-90px] left-[-40px] h-40 w-40 rotate-45 bg-[#16a34a] opacity-90" />

              <div className="relative z-10 flex h-full flex-col px-2 py-1">
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#082c7d]">
                  Guia · Superendividamento
                </span>

                <h3 className="mt-[70px] text-base font-extrabold leading-tight text-white drop-shadow">
                  SUPERENDIVIDAMENTO: ENTENDA SEUS DIREITOS E SAIA DAS DÍVIDAS
                </h3>

                <p className="mt-3 text-[9.5px] font-medium leading-snug text-white/90">
                  Um guia simples e prático para consultar dívidas, renegociar da forma correta e evitar golpes financeiros.
                </p>
              </div>
            </div>

            <span className="absolute bottom-2 right-6 inline-flex rounded-full bg-[#16a34a] px-4 py-2 text-sm font-bold text-white shadow-lg">
              Grátis
            </span>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <span className="mb-6 inline-block rounded-full bg-[#eef2fc] px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#0c3fae]">
              O que tem no material?
            </span>

            <h2 className="mb-4 text-3xl font-extrabold leading-tight text-[#0c3fae] md:text-4xl">
              Um guia simples e prático para retomar o controle.
            </h2>

            <p className="mb-8 max-w-xl text-slate-600">
              Descubra o passo a passo para se organizar financeiramente e proteger os seus direitos.
            </p>

            <ul className="space-y-5">
              {[
                ["Consultar Dívidas", "Aprenda a consultar todas as dívidas vinculadas ao seu CPF."],
                ["Identificar Empréstimos Indevidos", "Saiba como identificar cobranças abusivas ou créditos indevidos."],
                ["Entender Seus Direitos", "Conheça a Lei do Superendividamento e como ela protege você."],
              ].map(([title, text]) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-sm font-bold text-white">
                    ✓
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <p className="text-sm text-slate-500">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-3xl bg-gradient-to-br from-[#0c3fae] to-[#082c7d] p-8 text-white shadow-[0_24px_60px_rgba(8,31,90,.14)]">
            <span className="mb-5 inline-block rounded-full bg-[#ffd60a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#082c7d]">
              100% gratuito
            </span>

            <h3 className="mb-3 text-2xl font-bold">Pronto para ler em qualquer dispositivo</h3>

            <p className="mb-6 text-white/80">
              Um material direto ao ponto, em PDF, para você consultar sempre que precisar.
            </p>

            <ul className="mb-7 space-y-3 text-sm text-white/90">
              <li>• Linguagem simples</li>
              <li>• Passo a passo aplicável hoje</li>
              <li>• Baseado na Lei do Superendividamento</li>
            </ul>

            <a
              href="#cadastro"
              className="flex w-full items-center justify-center rounded-xl bg-[#ffd60a] px-7 py-4 text-sm font-extrabold tracking-wide text-[#082c7d] transition hover:bg-[#e6be00]"
            >
              Quero meu e-book
            </a>
          </aside>
        </div>
      </section>

      <section className="bg-[#f4f6fb] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_rgba(8,31,90,.14)]">
            <div className="bg-red-50 p-7">
              <h3 className="text-xl font-extrabold text-red-600">ALERTA IMPORTANTE</h3>
              <p className="text-sm text-red-700">
                Informação é o primeiro passo para proteger seu dinheiro e seus direitos.
              </p>
            </div>

            <div className="p-7">
              <p className="mb-5 text-slate-600">
                Muitos consumidores só descobrem quando é tarde demais que estão pagando por:
              </p>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {["Empréstimos indevidos", "Cartões não solicitados", "Refinanciamentos automáticos", "Seguros embutidos"].map((item) => (
                  <div key={item} className="rounded-xl border border-slate-200 bg-[#f4f6fb] p-4 font-semibold">
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-[#0c3fae] p-5 text-center font-semibold text-white">
                Não seja mais uma vítima. Baixe o guia gratuito e crie uma <span className="text-[#ffd60a]">blindagem contra abusos</span>.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cadastro" className="bg-[radial-gradient(800px_400px_at_10%_0%,#1a52cf,transparent_60%),linear-gradient(135deg,#082c7d,#061f5a)] py-20 text-white">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <span className="mb-6 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[.18em]">
              Último passo
            </span>

            <h2 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl">
              Preencha e <span className="text-[#ffd60a]">baixe seu e-book</span> gratuitamente.
            </h2>

            <p className="text-white/80">
              Informe seus dados abaixo para liberar o download imediato.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 text-slate-900 shadow-[0_24px_60px_rgba(8,31,90,.14)]">
            {!success ? (
              <>
                <h3 className="mb-2 text-2xl font-extrabold text-[#0c3fae]">Baixe o seu e-book</h3>
                <p className="mb-6 text-sm text-slate-500">Preencha seus dados para liberar o download.</p>

                {error && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-slate-700">
                      Seu Nome Completo
                    </label>
                    <input
                      id="nome"
                      type="text"
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0c3fae] focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-slate-700">
                      Seu WhatsApp
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(event) => setWhatsapp(formatWhatsapp(event.target.value))}
                      placeholder="(00) 00000-0000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0c3fae] focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                      Seu E-mail <span className="font-normal text-slate-500">(Opcional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="seu.email@exemplo.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0c3fae] focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-[#ffd60a] px-7 py-4 text-sm font-extrabold tracking-wide text-[#082c7d] shadow-[0_10px_24px_rgba(255,214,10,.35)] transition hover:bg-[#e6be00] disabled:cursor-progress disabled:opacity-70"
                  >
                    {loading ? "Enviando..." : "BAIXAR E-BOOK GRATUITO"}
                  </button>
                </form>

                <p className="mt-4 text-center text-xs text-slate-500">
                  Suas informações estão seguras. Não enviamos spam.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  ✅
                </div>

                <h3 className="mb-2 text-2xl font-extrabold text-[#128a3e]">Cadastro concluído!</h3>

                <p className="mb-6 text-sm text-slate-500">
                  Seu e-book está pronto. Se o download não começar sozinho, clique no botão abaixo.
                </p>

                <a
                  href={EBOOK_URL}
                  download
                  className="inline-flex items-center justify-center rounded-xl bg-[#ffd60a] px-7 py-4 text-sm font-extrabold tracking-wide text-[#082c7d] shadow-[0_10px_24px_rgba(255,214,10,.35)] transition hover:bg-[#e6be00]"
                >
                  Baixar o e-book
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#0b1220] px-6 py-8 text-center text-sm text-white/70">
        <p>© 2026 Guia Superendividamento. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
