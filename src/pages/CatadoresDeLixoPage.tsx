import { useEffect, useState } from "react";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxeK2QANgItpinK5Vf__G3H5CxMJjc8tkyL2ql9bFwNDXzbcdjNoezDguBdP-r7-JlJ/exec";

export default function CatadoresPage() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const hadThemeCopa = document.body.classList.contains("theme-copa");
    document.body.classList.add("theme-copa-disabled-route");
    document.body.classList.remove("theme-copa");
    const frame = window.requestAnimationFrame(() => {
      document.body.classList.remove("theme-copa");
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.classList.remove("theme-copa-disabled-route");
      if (hadThemeCopa) {
        document.body.classList.add("theme-copa");
      }
    };
  }, []);

  function formatWhatsapp(value: string) {
    let v = value.replace(/\D/g, "").substring(0, 11);

    if (v.length > 6) {
      v = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
    } else if (v.length > 2) {
      v = `(${v.substring(0, 2)}) ${v.substring(2)}`;
    } else if (v.length > 0) {
      v = `(${v}`;
    }

    return v;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      nome,
      whatsapp,
      email,
    };

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      setSuccess(true);
    } catch {
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-50 font-[Inter,sans-serif] text-slate-900">
      <style>{`
        body.theme-copa-disabled-route .theme-copa-toggle {
          display: none !important;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <RecycleIcon className="h-[120vw] w-[120vw] rotate-12 text-green-900 opacity-[0.03] md:h-[80vw] md:w-[80vw]" />
      </div>

      <header className="relative z-10 overflow-hidden bg-green-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4ade80,#166534,transparent)] opacity-20" />
        <RecycleIcon className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 -rotate-12 text-green-100 opacity-10" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-16 text-center md:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-800/50 px-4 py-2 text-sm font-semibold text-green-300 backdrop-blur">
            <RecycleIcon className="h-5 w-5" />
            Mobilização Nacional
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            É hora de valorizar quem{" "}
            <span className="text-green-400">sustenta a reciclagem</span> no Brasil!
          </h1>

          <p className="mb-10 max-w-3xl text-lg leading-relaxed text-green-100 md:text-xl">
            Milhares de catadores trabalham todos os dias, mas ainda enfrentam falta de apoio,
            renda baixa e pouca valorização. Enquanto isso, projetos importantes estão sendo
            discutidos no Congresso, e você precisa estar por dentro.
          </p>

          <a
            href="#cadastro-form"
            className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-8 py-4 text-lg font-bold text-green-900 shadow-[0_0_40px_-10px_rgba(250,204,21,.5)] transition hover:scale-105 hover:bg-yellow-300"
          >
            QUERO PARTICIPAR →
          </a>

          <p className="mt-4 text-sm font-medium text-green-300/80">
            Chegou o momento de cobrar mudanças!
          </p>
        </div>
      </header>

      <section className="relative z-10 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-800 md:text-4xl">
              Quem cuida do meio ambiente também precisa ser cuidado!
            </h2>
            <p className="text-lg text-slate-600">
              Hoje, a realidade da maioria dos catadores é dura:
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard color="red" icon="🛡️" title="Trabalham sem apoio">
              Falta de estrutura adequada e de equipamentos de proteção para o dia a dia.
            </InfoCard>

            <InfoCard color="orange" icon="📉" title="Ganham pouco">
              O valor pago pelo material reciclável não reflete a importância e o esforço do trabalho.
            </InfoCard>

            <InfoCard color="amber" icon="⚠️" title="Sem direitos básicos">
              A grande maioria atua na informalidade, sem acesso a garantias e direitos sociais.
            </InfoCard>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-slate-200 bg-slate-100 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-slate-300 md:w-20" />
            <span className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">
              Mas isso precisa mudar
            </span>
            <div className="h-px w-12 bg-slate-300 md:w-20" />
          </div>

          <h2 className="mb-4 text-center text-3xl font-bold text-slate-800 md:text-4xl">
            O que está em jogo <span className="text-green-600">AGORA</span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-slate-600">
            O Congresso já discute medidas que podem impactar diretamente a vida dos catadores.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <ProjectCard
              icon="💰"
              color="green"
              title="Mais renda para quem recicla"
              badge="Isso pode significar mais dinheiro no seu bolso."
            >
              O <strong>PL 1227/2025</strong> propõe incentivos e redução de impostos para
              fortalecer a atividade.
            </ProjectCard>

            <ProjectCard
              icon="🎓"
              color="blue"
              title="Mais oportunidades e qualificação"
              badge="Isso pode abrir novas oportunidades de renda."
            >
              O <strong>PL 2600/2025</strong> prevê cursos e formação para quem trabalha com
              reciclagem.
            </ProjectCard>

            <ProjectCard
              icon="🏅"
              color="purple"
              title="Reconhecimento do seu trabalho"
              badge="Mas isso ainda precisa sair do papel."
            >
              A <strong>Política Nacional de Resíduos Sólidos</strong> já determina que os
              catadores devem ser incluídos e valorizados.
            </ProjectCard>
          </div>
        </div>
      </section>

      <section
        id="cadastro-form"
        className="relative z-10 overflow-hidden bg-green-900 px-6 py-20 text-white"
      >
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(30deg,rgba(255,255,255,.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,.18)_87.5%,rgba(255,255,255,.18)),linear-gradient(150deg,rgba(255,255,255,.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,.18)_87.5%,rgba(255,255,255,.18)),linear-gradient(30deg,rgba(255,255,255,.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,.18)_87.5%,rgba(255,255,255,.18)),linear-gradient(150deg,rgba(255,255,255,.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,.18)_87.5%,rgba(255,255,255,.18))] [background-position:0_0,0_0,16px_28px,16px_28px] [background-size:32px_56px]" />
        <RecycleIcon className="pointer-events-none absolute -left-24 -top-32 h-[600px] w-[600px] text-green-300 opacity-5" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="text-center lg:text-left">
            <div className="mb-4 flex items-center justify-center gap-4 lg:justify-start">
              <div className="h-px w-12 bg-green-800" />
              <span className="text-xs font-bold uppercase tracking-[.2em] text-yellow-400">
                Virada de chave
              </span>
              <div className="h-px w-20 bg-green-800" />
            </div>

            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
              O momento é agora.
            </h2>

            <p className="mx-auto mb-8 max-w-xl text-lg text-green-100 lg:mx-0">
              Essas mudanças estão acontecendo, e quem estiver informado sai na frente. Ao se
              cadastrar, você:
            </p>

            <div className="mx-auto mb-10 grid max-w-xl gap-4 text-left lg:mx-0">
              {[
                "Recebe informações verificadas sobre projetos de lei em tramitação.",
                "É notificado sobre votações importantes no Congresso.",
                "Participa de mobilizações cívicas legais e transparentes.",
                "Integra uma rede de cidadãos comprometidos com a segurança e a causa.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-green-400/20 bg-green-800/50 p-4 backdrop-blur"
                >
                  <span className="mt-0.5 text-yellow-400">✓</span>
                  <span className="text-green-50">{item}</span>
                </div>
              ))}
            </div>

            <div className="mx-auto flex max-w-xl items-start gap-3 rounded-2xl border border-green-800 bg-green-950/40 p-5 text-left text-sm text-green-100 lg:mx-0">
              <span className="text-green-400">🛡️</span>
              <p>
                <strong className="mb-1 block text-base text-white">Cidadania pura e simples</strong>
                Não é filiação partidária. Não é obrigação política. É participação cidadã
                organizada e transparente.
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-lg rounded-3xl bg-white p-8 text-slate-900 shadow-2xl md:p-10">
            {!success ? (
              <>
                <div className="mb-8 text-center sm:text-left">
                  <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
                    <RecycleIcon className="h-6 w-6 text-green-600" />
                    <h3 className="text-2xl font-bold text-slate-800">Junte-se à causa</h3>
                  </div>
                  <p className="text-slate-500">
                    Preencha seus dados para receber os alertas e fazer parte da mudança.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <Input
                    label="Seu Nome Completo"
                    value={nome}
                    onChange={setNome}
                    placeholder="Ex: João da Silva"
                    required
                  />

                  <Input
                    label="Seu WhatsApp"
                    value={whatsapp}
                    onChange={(value) => setWhatsapp(formatWhatsapp(value))}
                    placeholder="(00) 00000-0000"
                    required
                    type="tel"
                  />

                  <Input
                    label="Seu E-mail"
                    optional
                    value={email}
                    onChange={setEmail}
                    placeholder="seu.email@exemplo.com"
                    type="email"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 p-4 text-lg font-bold text-white shadow-[0_8px_20px_rgba(22,163,74,.3)] transition hover:scale-[1.02] hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Enviando..." : "CONCLUIR CADASTRO →"}
                  </button>

                  <p className="mt-4 flex items-center justify-center gap-1 text-center text-xs text-slate-500">
                    🛡️ Suas informações estão seguras. Não enviamos spam.
                  </p>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
                  ✓
                </div>
                <h4 className="mb-2 text-2xl font-bold text-slate-800">Cadastro realizado!</h4>
                <p className="text-slate-600">
                  Obrigado por se juntar à causa. Em breve você receberá nossas novidades.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-slate-900 px-6 py-8 text-center text-sm text-slate-400">
        <p className="flex items-center justify-center gap-2">
          ♻️ © 2026 Mobilização Nacional dos Catadores. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}

function Input({
  label,
  optional,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  optional?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-5">
      <label className="mb-1 block text-sm font-semibold text-slate-700">
        {label} {optional && <span className="font-normal text-slate-400">(Opcional)</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-500/25"
      />
    </div>
  );
}

function InfoCard({
  color,
  icon,
  title,
  children,
}: {
  color: "red" | "orange" | "amber";
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  const colors = {
    red: "border-rose-100 bg-rose-50 text-red-600",
    orange: "border-orange-100 bg-orange-50 text-orange-600",
    amber: "border-amber-100 bg-amber-50 text-amber-600",
  };

  return (
    <div className={`rounded-2xl border p-6 text-center ${colors[color]}`}>
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-600">{children}</p>
    </div>
  );
}

function ProjectCard({
  icon,
  color,
  title,
  badge,
  children,
}: {
  icon: string;
  color: "green" | "blue" | "purple";
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  const iconColors = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
  };

  const badgeColors = {
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${iconColors[color]}`}>
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-800">{title}</h3>
      <p className="mb-4 text-sm text-slate-600">{children}</p>
      <span className={`inline-flex w-full rounded-lg px-3 py-2 text-xs font-semibold ${badgeColors[color]}`}>
        ✓ {badge}
      </span>
    </div>
  );
}

function RecycleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  );
}
