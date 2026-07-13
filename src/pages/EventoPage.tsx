import { useState } from "react";
import { CalendarDays, Clock3, Loader2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EventoMapa from "@/components/evento/EventoMapa";
import { EVENTO_COLORS, EVENTO_GUTEMBERG } from "@/config/evento";
import {
  cadastrarEvento,
  isEventoApiConfigured,
  type EventoCadastroPayload,
} from "@/lib/eventoApi";

const initialForm: EventoCadastroPayload = {
  nome: "",
  cpf: "",
  telefone: "",
  email: "",
  cidade: "",
  bairro: "",
  categoria: "Liderança",
  lgpd: false,
  observacoes: "",
};

function onlyDigits(value: string, max: number) {
  return value.replace(/\D/g, "").slice(0, max);
}

function formatCpf(value: string) {
  const digits = onlyDigits(value, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value: string) {
  const digits = onlyDigits(value, 11);
  if (digits.length > 10) {
    return digits.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
  }
  return digits.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
}

export default function EventoPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof EventoCadastroPayload>(
    key: K,
    value: EventoCadastroPayload[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.lgpd) {
      setError("Autorize o uso dos dados para concluir o credenciamento.");
      return;
    }

    if (!isEventoApiConfigured()) {
      setError("Configure VITE_EVENTO_API_URL para ativar o cadastro na planilha.");
      return;
    }

    setLoading(true);
    try {
      const response = await cadastrarEvento(form);
      if (!response.success) {
        setError(response.message ?? "Nao foi possivel concluir o cadastro.");
        return;
      }

      navigate("/evento/sucesso", {
        state: {
          nome: response.nome ?? form.nome,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar cadastro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      id="conteudo-principal"
      className="min-h-screen text-zinc-950"
      style={{ backgroundColor: EVENTO_COLORS.lightGray }}
    >
      <section
        className="relative overflow-hidden border-b border-zinc-200 py-6 lg:py-10"
        style={{ backgroundColor: EVENTO_COLORS.backgroundLight }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1.5"
          style={{
            background: `linear-gradient(90deg, ${EVENTO_COLORS.green} 0 34%, ${EVENTO_COLORS.gold} 34% 66%, ${EVENTO_COLORS.navy} 66%)`,
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-start gap-5 px-4 sm:px-5 lg:grid-cols-[minmax(360px,.82fr)_minmax(0,1.18fr)] lg:gap-8">
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl lg:sticky lg:top-6">
            <img
              src="/evento/palestra-comunicacao-2026.jpeg"
              alt="Cartaz da Palestra de Comunicação com Gutemberg Fonseca"
              className="hidden h-auto w-full lg:block"
              loading="eager"
              fetchpriority="high"
            />

            <div className="h-[300px] overflow-hidden sm:h-[400px] lg:hidden">
              <img
                src="/evento/palestra-comunicacao-2026.jpeg"
                alt="Cartaz da Palestra de Comunicação com Gutemberg Fonseca"
                className="h-full w-full object-cover object-top"
                loading="eager"
                fetchpriority="high"
              />
            </div>

            <div className="p-4 sm:p-5 lg:hidden">
              <p className="text-xs font-black uppercase tracking-[0.14em]" style={{ color: EVENTO_COLORS.green }}>
                {EVENTO_GUTEMBERG.attention}
              </p>
              <h1 className="mt-1 text-2xl font-black leading-tight" style={{ color: EVENTO_COLORS.navy }}>
                {EVENTO_GUTEMBERG.title}
              </h1>
              <p className="mt-2 text-sm font-semibold leading-relaxed" style={{ color: EVENTO_COLORS.blue }}>
                {EVENTO_GUTEMBERG.theme}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold">
                <span className="flex items-center gap-2 rounded-md bg-zinc-50 p-2.5 ring-1 ring-zinc-200">
                  <CalendarDays className="h-4 w-4 shrink-0" style={{ color: EVENTO_COLORS.navy }} />
                  {EVENTO_GUTEMBERG.date}
                </span>
                <span className="flex items-center gap-2 rounded-md bg-zinc-50 p-2.5 ring-1 ring-zinc-200">
                  <Clock3 className="h-4 w-4 shrink-0" style={{ color: EVENTO_COLORS.navy }} />
                  {EVENTO_GUTEMBERG.time}
                </span>
                <span className="col-span-2 flex items-center gap-2 rounded-md bg-zinc-50 p-2.5 ring-1 ring-zinc-200">
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: EVENTO_COLORS.navy }} />
                  {EVENTO_GUTEMBERG.venue}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xl sm:p-7 lg:p-8">
            <div className="mb-5 border-b border-zinc-200 pb-4">
              <p className="hidden text-xs font-black uppercase tracking-[0.16em] lg:block" style={{ color: EVENTO_COLORS.green }}>
                {EVENTO_GUTEMBERG.attention}
              </p>
              <h1 className="mt-1 hidden text-3xl font-black leading-tight lg:block" style={{ color: EVENTO_COLORS.navy }}>
                Inscrição para a {EVENTO_GUTEMBERG.title}
              </h1>
              <p className="mt-2 hidden text-sm font-medium leading-relaxed text-zinc-600 lg:block">
                {EVENTO_GUTEMBERG.date}, às {EVENTO_GUTEMBERG.time}, no {EVENTO_GUTEMBERG.venue}.
              </p>
              <p className="text-xs font-black uppercase tracking-[0.16em] lg:mt-6" style={{ color: EVENTO_COLORS.green }}>
                Credenciamento
              </p>
              <h2 className="mt-1 text-xl font-extrabold">Dados do participante</h2>
            </div>

            {error && (
              <div className="mb-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="evento-nome">Nome completo *</Label>
                <Input
                  id="evento-nome"
                  value={form.nome}
                  onChange={(event) => updateField("nome", event.target.value)}
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="evento-cpf">CPF *</Label>
                <Input
                  id="evento-cpf"
                  inputMode="numeric"
                  value={form.cpf}
                  onChange={(event) => updateField("cpf", formatCpf(event.target.value))}
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="evento-telefone">Telefone / WhatsApp *</Label>
                <Input
                  id="evento-telefone"
                  inputMode="tel"
                  value={form.telefone}
                  onChange={(event) => updateField("telefone", formatPhone(event.target.value))}
                  className="mt-2"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="evento-email">E-mail *</Label>
                <Input
                  id="evento-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="evento-cidade">Cidade *</Label>
                <Input
                  id="evento-cidade"
                  value={form.cidade}
                  onChange={(event) => updateField("cidade", event.target.value)}
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="evento-bairro">Bairro *</Label>
                <Input
                  id="evento-bairro"
                  value={form.bairro}
                  onChange={(event) => updateField("bairro", event.target.value)}
                  className="mt-2"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="evento-categoria">Status *</Label>
                <select
                  id="evento-categoria"
                  value={form.categoria}
                  onChange={(event) => {
                    const categoria = event.target.value;
                    updateField("categoria", categoria);
                    if (categoria !== "Convidado") updateField("observacoes", "");
                  }}
                  className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="Liderança">Liderança</option>
                  <option value="Convidado">Convidado</option>
                </select>
              </div>

              {form.categoria === "Convidado" && (
                <div className="sm:col-span-2">
                  <Label htmlFor="evento-convidado-por">Quem convidou? *</Label>
                  <Input
                    id="evento-convidado-por"
                    value={form.observacoes}
                    onChange={(event) => updateField("observacoes", event.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
              )}
            </div>

            <label className="mt-5 flex items-start gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
              <Checkbox
                checked={form.lgpd}
                onCheckedChange={(checked) => updateField("lgpd", checked === true)}
                className="mt-0.5"
              />
              <span>
                Autorizo o uso dos meus dados para organização, comunicação e controle
                de entrada deste evento.
              </span>
            </label>

            <Button
              type="submit"
              className="mt-6 w-full font-black text-white hover:opacity-95"
              size="lg"
              disabled={loading}
              style={{ backgroundColor: EVENTO_COLORS.green }}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Enviando cadastro..." : "Concluir cadastro"}
            </Button>
          </form>
        </div>
      </section>
      <EventoMapa />
    </main>
  );
}
