import { useState } from "react";
import { CalendarDays, Loader2, MapPin, ShieldCheck, Vote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EventoMapa from "@/components/evento/EventoMapa";
import { EventoHero } from "@/components/evento/EventoHero";
import { EVENTO_COLORS, EVENTO_GUTEMBERG } from "@/config/evento";
import { useDisableThemeCopa } from "@/hooks/useDisableThemeCopa";
import {
  cadastrarEvento,
  isEventoApiConfigured,
  type EventoCadastroPayload,
} from "@/lib/eventoApi";

const CATEGORIAS = [
  "Convidado",
  "Apoiador",
  "Lideranca",
];

const initialForm: EventoCadastroPayload = {
  nome: "",
  cpf: "",
  telefone: "",
  email: "",
  cidade: "",
  bairro: "",
  categoria: "Convidado",
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
  useDisableThemeCopa();
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
          codigo: response.codigo,
          qrcodeUrl: response.qrcodeUrl,
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
      <EventoHero variant="full" />
      <section
        className="relative overflow-hidden border-b border-white/10"
        style={{ backgroundColor: EVENTO_COLORS.navy }}
      >
        <div className="absolute inset-x-0 top-0 h-2" style={{ backgroundColor: EVENTO_COLORS.yellow }} />
        <div className="absolute bottom-0 left-0 h-24 w-full" style={{ backgroundColor: EVENTO_COLORS.green }} />

        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[.95fr_1.05fr] lg:py-14">
          <div className="flex flex-col justify-center text-white">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-bold text-white ring-1 ring-white/15">
              <ShieldCheck className="h-4 w-4" />
              Credenciamento oficial
            </div>
            <p className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: EVENTO_COLORS.yellow }}>
              {EVENTO_GUTEMBERG.title}
            </p>
            <h1 className="mt-2 text-4xl font-black leading-tight md:text-6xl">
              {EVENTO_GUTEMBERG.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-black" style={{ color: EVENTO_COLORS.navy }}>
                <Vote className="h-4 w-4" />
                {EVENTO_GUTEMBERG.office}
              </span>
              <span className="text-5xl font-black leading-none" style={{ color: EVENTO_COLORS.yellow }}>
                {EVENTO_GUTEMBERG.year}
              </span>
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/82">
              Garanta sua credencial para o evento. O cadastro gera um código único
              e um QR Code para apresentar na entrada.
            </p>
            <div className="mt-6 grid gap-3 text-sm font-bold sm:grid-cols-2">
              <span className="flex items-center gap-2 rounded-md bg-white/10 p-3 ring-1 ring-white/10">
                <CalendarDays className="h-5 w-5" style={{ color: EVENTO_COLORS.yellow }} />
                {EVENTO_GUTEMBERG.date} as {EVENTO_GUTEMBERG.time}
              </span>
              <span className="flex items-center gap-2 rounded-md bg-white/10 p-3 ring-1 ring-white/10">
                <MapPin className="h-5 w-5" style={{ color: EVENTO_COLORS.yellow }} />
                {EVENTO_GUTEMBERG.venue}
              </span>
            </div>
            <p className="mt-3 max-w-xl text-sm font-medium text-white/72">
              {EVENTO_GUTEMBERG.address}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-white/20 bg-white p-5 shadow-2xl md:p-7">
            <div className="mb-5 border-b border-zinc-200 pb-4">
              <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: EVENTO_COLORS.green }}>
                Inscricao
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
                <Label htmlFor="evento-categoria">Categoria</Label>
                <select
                  id="evento-categoria"
                  value={form.categoria}
                  onChange={(event) => updateField("categoria", event.target.value)}
                  className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {CATEGORIAS.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              {form.categoria === "Convidado" && (
                <div className="sm:col-span-2">
                  <Label htmlFor="evento-convidado-por">Quem te convidou?</Label>
                  <Input
                    id="evento-convidado-por"
                    value={form.observacoes}
                    onChange={(event) => updateField("observacoes", event.target.value)}
                    className="mt-2"
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
              {loading ? "Gerando credencial..." : "Concluir cadastro"}
            </Button>
          </form>
        </div>
      </section>
      <EventoMapa />
    </main>
  );
}
