import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EVENT, findLideranca } from "@/config/aniversario";
import MapaEvento from "@/components/aniversario/MapaEvento";
import ConfirmacaoTicket from "@/components/aniversario/ConfirmacaoTicket";

const WHATSAPP_SHARE_TEXT = "Confirmei presença no aniversário do Gutemberg Fonseca! 🎉";

const PHOTO_PLACEHOLDERS = 6;

// TODO: criar o Google Form de confirmação com os campos Nome, WhatsApp, Email,
// Código do cupom, Liderança (preenchido automaticamente) e Status, depois substituir
// FORM_ID e os IDs de ENTRY abaixo pelos valores reais (inspecionar o HTML do form).
const FORM_ID = "SUBSTITUIR_PELO_FORM_ID";

const ENTRY = {
  nome: "entry.000000001",
  whatsapp: "entry.000000002",
  email: "entry.000000003",
  cupom: "entry.000000004",
  lideranca: "entry.000000005",
  status: "entry.000000006",
};

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

export default function AniversarioPage() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [cupom, setCupom] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lideranca, setLideranca] = useState<string | null>(null);
  const [generatingTicket, setGeneratingTicket] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!nome.trim() || !whatsapp.trim()) {
      setError("Preencha pelo menos o nome e o WhatsApp.");
      return;
    }

    setLoading(true);

    const matchedLideranca = cupom.trim() ? findLideranca(cupom) : null;
    const status = matchedLideranca
      ? `Confirmado via liderança: ${matchedLideranca}`
      : cupom.trim()
        ? "Cupom inválido - triagem"
        : "Sem cupom - triagem";

    const body = new URLSearchParams();
    body.append(ENTRY.nome, nome.trim());
    body.append(ENTRY.whatsapp, whatsapp.trim());
    body.append(ENTRY.cupom, cupom.trim());
    body.append(ENTRY.lideranca, matchedLideranca ?? "");
    body.append(ENTRY.status, status);

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

      setLideranca(matchedLideranca);
      setSuccess(true);
    } catch (err) {
      setError("Não foi possível concluir. Verifique sua conexão e tente novamente.");
      setLoading(false);
    }
  }

  async function captureTicket(): Promise<File | null> {
    if (!ticketRef.current) return null;
    const canvas = await html2canvas(ticketRef.current, { scale: 2, backgroundColor: "#ffffff" });
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return null;
    return new File([blob], "convite-aniversario-gutemberg.png", { type: "image/png" });
  }

  function downloadFile(file: File) {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function handleDownloadTicket() {
    setGeneratingTicket(true);
    try {
      const file = await captureTicket();
      if (file) downloadFile(file);
    } finally {
      setGeneratingTicket(false);
    }
  }

  async function handleShareTicket() {
    setGeneratingTicket(true);
    try {
      const file = await captureTicket();
      if (!file) return;

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Confirmação de presença",
          text: WHATSAPP_SHARE_TEXT,
        });
      } else {
        downloadFile(file);
        window.open(`https://wa.me/?text=${encodeURIComponent(WHATSAPP_SHARE_TEXT)}`, "_blank");
      }
    } catch (err) {
      // Usuário cancelou o compartilhamento nativo — nada a fazer.
    } finally {
      setGeneratingTicket(false);
    }
  }

  const scrollToForm = () => {
    document.getElementById("confirmacao")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-white font-body text-slate-900">
      <style>{`
        body.theme-copa-disabled-route .theme-copa-toggle {
          display: none !important;
        }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[length:22px_22px] opacity-50" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-primary opacity-20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[.18em]">
            Você está convidado(a)
          </span>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
            Aniversário do{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Gutemberg Fonseca
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base text-white/80 md:text-lg">
            Venha comemorar com a gente o aniversário do pré-candidato a Deputado
            Federal Gutemberg Fonseca. Uma noite para celebrar a vida e a trajetória
            ao lado de amigos, apoiadores e lideranças.
          </p>

          <div className="mx-auto mb-10 flex flex-wrap items-center justify-center gap-4">
            <div className="rounded-2xl bg-white/10 px-6 py-4 text-sm font-semibold">
              📅 {EVENT.dateLabel}
            </div>
            <div className="rounded-2xl bg-white/10 px-6 py-4 text-sm font-semibold">
              🕖 {EVENT.timeLabel}
            </div>
            <div className="rounded-2xl bg-white/10 px-6 py-4 text-sm font-semibold">
              📍 {EVENT.venue}
            </div>
          </div>

          <Button variant="gradient" size="lg" onClick={scrollToForm} className="font-bold">
            Confirmar presença
          </Button>
        </div>
      </section>

      {/* Informações do evento */}
      <section className="py-20">
        <div className="section-container !py-0">
          <h2 className="section-title">Informações do evento</h2>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <div className="mb-3 text-3xl">📅</div>
              <h3 className="mb-1 font-bold text-primary">Data</h3>
              <p className="text-slate-600">{EVENT.dateLabel}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <div className="mb-3 text-3xl">🕖</div>
              <h3 className="mb-1 font-bold text-primary">Horário</h3>
              <p className="text-slate-600">{EVENT.timeLabel}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <div className="mb-3 text-3xl">📍</div>
              <h3 className="mb-1 font-bold text-primary">Local</h3>
              <p className="text-slate-600">{EVENT.venue}</p>
              <p className="mt-1 text-sm text-slate-500">{EVENT.address}</p>
              <a
                href={EVENT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-2"
              >
                Ver no mapa
              </a>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <MapaEvento />
          </div>
        </div>
      </section>

      {/* Galeria de fotos */}
      <section className="bg-slate-50 py-20">
        <div className="section-container !py-0">
          <h2 className="section-title">Galeria</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
            Em breve, fotos da trajetória e dos bastidores da festa.
          </p>

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: PHOTO_PLACEHOLDERS }).map((_, index) => (
              <div
                key={index}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white text-slate-400"
              >
                <ImageIcon className="h-8 w-8" />
                <span className="text-xs font-semibold">Foto em breve</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explicação dos cupons */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="mb-3 text-xl font-bold text-primary">Recebeu um cupom de uma liderança?</h3>
            <p className="text-slate-600">
              Informe o código do cupom no formulário de confirmação. Assim garantimos
              que a sua presença seja contabilizada para a liderança que te convidou.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="mb-3 text-xl font-bold text-primary">Não tem cupom?</h3>
            <p className="text-slate-600">
              Sem problema! Preencha o formulário normalmente, sem informar o código.
              Nossa equipe fará uma triagem específica para efetivar o seu convite.
            </p>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section id="confirmacao" className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-xl px-6">
          <div className="mb-10 text-center">
            <span className="mb-6 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[.18em]">
              Último passo
            </span>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl">
              Confirme sua{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">presença</span>
            </h2>
            <p className="text-white/80">
              Preencha seus dados abaixo. Se você tiver um cupom de liderança, informe o
              código para garantir sua vaga prioritária.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 text-slate-900 shadow-[0_24px_60px_rgba(8,31,90,.14)]">
            {!success ? (
              <>
                {error && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="av-nome">Nome completo *</Label>
                    <Input
                      id="av-nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="av-whats">WhatsApp *</Label>
                    <Input
                      id="av-whats"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
                      placeholder="(00) 00000-0000"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="av-email">
                      E-mail <span className="font-normal text-slate-500">(Opcional)</span>
                    </Label>
                    <Input
                      id="av-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="av-cupom">
                      Código do cupom de liderança{" "}
                      <span className="font-normal text-slate-500">(Opcional)</span>
                    </Label>
                    <Input
                      id="av-cupom"
                      value={cupom}
                      onChange={(e) => setCupom(e.target.value)}
                      placeholder="Ex: LID-JOAO01"
                      className="mt-2 uppercase"
                    />
                  </div>

                  <Button type="submit" variant="gradient" size="lg" disabled={loading} className="w-full font-bold">
                    {loading ? "Enviando..." : "Confirmar presença"}
                  </Button>
                </form>

                <p className="mt-4 text-center text-xs text-slate-500">
                  Suas informações estão seguras. Não enviamos spam.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  🎉
                </div>

                <h3 className="mb-2 text-2xl font-extrabold text-primary">
                  {lideranca ? "Presença confirmada!" : "Cadastro recebido!"}
                </h3>

                <p className="mb-6 text-sm text-slate-500">
                  {lideranca
                    ? `Sua presença foi vinculada à liderança ${lideranca}. Te esperamos no dia ${EVENT.dateLabel}!`
                    : "Nossa equipe vai entrar em contato para confirmar sua presença e dar todos os detalhes do evento."}
                </p>

                {lideranca && (
                  <div className="flex flex-col items-center gap-4">
                    <ConfirmacaoTicket
                      ref={ticketRef}
                      nome={nome.trim()}
                      lideranca={lideranca}
                      cupom={cupom.trim().toUpperCase()}
                    />

                    <div className="flex w-full max-w-[320px] flex-col gap-3 sm:flex-row">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleDownloadTicket}
                        disabled={generatingTicket}
                      >
                        {generatingTicket ? "Gerando..." : "Baixar imagem"}
                      </Button>
                      <Button
                        variant="gradient"
                        className="flex-1 font-bold"
                        onClick={handleShareTicket}
                        disabled={generatingTicket}
                      >
                        Compartilhar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#0b1220] px-6 py-8 text-center text-sm text-white/70">
        <p>© 2026 Gutemberg Fonseca. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
