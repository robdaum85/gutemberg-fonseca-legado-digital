import { useState } from "react";
import { useSeo } from "@/lib/useSeo";
import { STATIC_PAGE_SEO, canonicalUrl } from "@/lib/siteSeo";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwCqE6Or8leTViJqZwdEMNOGEUyypjWFNFKnq0-HAl7QOkhT_U6Zp1IsdyQ-NYycBpg/exec";

export interface SignatureFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
}

const initialForm: SignatureFormData = {
  name: "",
  email: "",
  phone: "",
  city: "",
};

export async function submitSignature(data: SignatureFormData): Promise<void> {
  await fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: data.name,
      email: data.email,
      telefone: data.phone || "",
      cidade: data.city || "",
    }),
  });
}

export default function MotosLivresPage() {
  const seo = STATIC_PAGE_SEO["/motociclistas"];
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
    },
  });
  const [form, setForm] = useState<SignatureFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(1);

  function updateField(field: keyof SignatureFormData, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 2) return digits;

    if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function scrollToForm() {
    document.getElementById("assinatura")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      await submitSignature(form);
      setSuccess(true);
      setCount((current) => current + 1);
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      alert("Não foi possível registrar sua assinatura. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#0f172a]">
      <section className="relative overflow-hidden bg-[#171c26] px-4 py-24 text-center text-white md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,184,0,.18),transparent_55%)]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffb800]/40 bg-[#ffb800]/10 px-4 py-2 text-sm font-bold text-[#ffb800]">
            <span className="h-2 w-2 rounded-full bg-[#ffb800]" />
            {count} assinaturas coletadas
          </div>

          <h1 className="text-5xl font-black uppercase leading-tight tracking-tight md:text-7xl">
            O Rio não pode
            <br />
            parar
            <br />
            <span className="text-[#ffb800]">quem trabalha!</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 md:text-xl">
            Diga NÃO ao controle abusivo e à perseguição aos motociclistas do
            Rio de Janeiro.
          </p>

          <button
            type="button"
            onClick={scrollToForm}
            className="mt-10 rounded-full bg-[#ffb800] px-10 py-4 text-lg font-black text-[#0f172a] shadow-lg shadow-[#ffb800]/30 transition hover:scale-105 hover:bg-[#ffc72c]"
          >
            ASSINE O ABAIXO-ASSINADO ↓
          </button>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-black md:text-5xl">
            Por que precisamos{" "}
            <span className="text-[#ffb800]">barrar</span> essas medidas?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-500">
            O que a Prefeitura chama de “direção segura”, nós chamamos de
            invasão e burocracia.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <ReasonCard icon="🛰️" title="Vigilância por GPS">
              O governo quer monitorar seus passos em tempo real através dos
              aplicativos. Isso é invasão de privacidade e controle total sobre
              o trabalhador autônomo.
            </ReasonCard>

            <ReasonCard icon="⚖️" title="Punições Arbitrárias">
              O risco de descredenciamento e bloqueios por critérios da
              Prefeitura tira a autonomia de quem sustenta a família em duas
              rodas.
            </ReasonCard>

            <ReasonCard icon="🚫" title="Ameaça à Circulação">
              O recuo atual é temporário. Precisamos garantir que vias como a
              Linha Vermelha continuem livres para o fluxo de quem tem pressa
              para entregar.
            </ReasonCard>

            <ReasonCard icon="📋" title="Burocracia que Exclui">
              Exigências excessivas de certidões e licenciamentos que só servem
              para tirar o trabalhador da rua e favorecer a arrecadação.
            </ReasonCard>
          </div>
        </div>
      </section>

      <section className="bg-[#171c26] px-4 py-20 text-white md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-black md:text-5xl">
            O consumidor também{" "}
            <span className="text-[#ffb800]">paga a conta</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-slate-400">
            Se o motociclista é perseguido, o Rio de Janeiro inteiro sofre.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <ImpactCard icon="💲" title="Entregas mais caras">
              O custo da burocracia vai direto para o valor do frete.
            </ImpactCard>

            <ImpactCard icon="⏱️" title="Atrasos inevitáveis">
              Regras que ignoram a realidade das ruas tornam o serviço lento e
              ineficiente.
            </ImpactCard>

            <ImpactCard icon="👥" title="Menos opções">
              Com o aumento das punições, muitos pais de família serão
              impedidos de trabalhar.
            </ImpactCard>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-black md:text-5xl">
            Nossas exigências:{" "}
            <span className="text-[#ffb800]">respeito, não controle!</span>
          </h2>

          <div className="mt-12 space-y-6">
            {[
              "Fim da exigência de monitoramento por GPS pela Prefeitura.",
              "Interrupção imediata de qualquer plano de restrição de velocidade exclusivo para motos em grandes avenidas.",
              "Asfalto de qualidade e sinalização correta — que é o que realmente evita acidentes.",
              "Liberdade para trabalhar sem o medo constante de bloqueios e descredenciamentos injustos.",
            ].map((item) => (
              <div key={item} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <span className="text-xl text-[#ffb800]">✓</span>
                <p className="text-lg font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="assinatura" className="bg-[#171c26] px-4 py-20 text-white md:py-28">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center text-3xl font-black md:text-5xl">
            Junte-se à <span className="text-[#ffb800]">luta!</span>
          </h2>

          <p className="mx-auto mt-4 max-w-md text-center text-lg text-slate-400">
            Sua assinatura é a nossa ferramenta para pressionar a Prefeitura e a
            Câmara Municipal.
          </p>

          <div className="mt-12 rounded-2xl bg-white/7 p-8 shadow-xl">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Nome completo"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={(value) => updateField("name", value)}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(value) => updateField("email", value)}
                  required
                />

                <Input
                  label="Telefone (com DDD)"
                  placeholder="(21) 99999-8888"
                  value={form.phone}
                  onChange={(value) => updateField("phone", formatPhone(value))}
                  required
                />

                <Input
                  label="Cidade / Bairro"
                  placeholder="Rio de Janeiro - Centro"
                  value={form.city}
                  onChange={(value) => updateField("city", value)}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#ffb800] px-8 py-4 text-lg font-black text-[#0f172a] shadow-lg shadow-[#ffb800]/30 transition hover:bg-[#ffc72c] disabled:cursor-progress disabled:opacity-70"
                >
                  {loading ? "Enviando..." : "QUERO ASSINAR AGORA"}
                </button>
              </form>
            ) : (
              <div className="py-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffb800] text-3xl text-[#0f172a]">
                  ✓
                </div>

                <h3 className="text-2xl font-black">Assinatura confirmada!</h3>

                <p className="mt-3 text-slate-300">
                  Obrigado por se juntar à mobilização. Sua participação
                  fortalece essa causa.
                </p>

                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-sm font-bold text-[#ffb800] hover:underline"
                >
                  Preencher novamente
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-12 text-center">
        <p className="text-2xl font-black">
          O motociclista é o{" "}
          <span className="text-[#ffb800]">motor do Rio.</span>
        </p>

        <p className="mt-3 text-slate-500">
          Não aceitaremos ser tratados como criminosos.
        </p>

        <p className="mt-8 text-xs text-slate-500">
          © 2025 Motos Livres RJ. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}

function ReasonCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group rounded-2xl bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#ffb800]/10 text-2xl">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-black">{title}</h3>
          <p className="mt-3 leading-relaxed text-slate-600">{children}</p>
        </div>
      </div>
    </div>
  );
}

function ImpactCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffb800]/15 text-3xl text-[#ffb800]">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-black">{title}</h3>
      <p className="mt-3 leading-relaxed text-slate-400">{children}</p>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-white">{label}</label>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-[#ffb800] focus:ring-2 focus:ring-[#ffb800]/30"
      />
    </div>
  );
}
