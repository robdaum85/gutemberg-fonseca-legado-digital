import { useEffect, useState } from "react";
import { CalendarDays, Clock3, Loader2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EVENTO_GUTEMBERG } from "@/config/evento";
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
  lgpd: false,
};

function onlyDigits(value: string, max: number) {
  return value.replace(/\D/g, "").slice(0, max);
}

function formatCpf(value: string) {
  return onlyDigits(value, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value: string) {
  const digits = onlyDigits(value, 11);
  return digits.length > 10
    ? digits.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3")
    : digits.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
}

export default function EventoPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function updateField<K extends keyof EventoCadastroPayload>(
    key: K,
    value: EventoCadastroPayload[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.cpf && onlyDigits(form.cpf, 11).length !== 11) {
      setError("Informe um CPF válido ou deixe o campo em branco.");
      return;
    }

    if (!form.lgpd) {
      setError("Autorize o uso dos dados para concluir a inscrição.");
      return;
    }

    if (!isEventoApiConfigured()) {
      setError("O cadastro está temporariamente indisponível. Tente novamente em instantes.");
      return;
    }

    setLoading(true);
    try {
      const response = await cadastrarEvento(form);
      if (!response.success) {
        setError(response.message ?? "Não foi possível concluir o cadastro.");
        return;
      }

      navigate("/evento/sucesso", {
        state: { nome: response.nome ?? form.nome },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar cadastro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main id="conteudo-principal" tabIndex={-1}>
        <section className="bg-primary px-4 pb-16 pt-32 text-white md:pb-20 md:pt-36">
          <div className="container mx-auto max-w-6xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
              {EVENTO_GUTEMBERG.attention}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
              {EVENTO_GUTEMBERG.title}
            </h1>
            <p className="mt-3 text-xl font-semibold text-white/85">{EVENTO_GUTEMBERG.venue}</p>

            <div className="mt-8 grid max-w-5xl gap-3 text-sm font-semibold sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4">
                <CalendarDays className="h-5 w-5 shrink-0 text-emerald-300" />
                <span>{EVENTO_GUTEMBERG.date}</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4">
                <Clock3 className="h-5 w-5 shrink-0 text-emerald-300" />
                <span>20:00</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4 sm:col-span-2">
                <MapPin className="h-5 w-5 shrink-0 text-emerald-300" />
                <span>{EVENTO_GUTEMBERG.address}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-2xl bg-primary p-6 text-white shadow-lg md:p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">Local do evento</p>
              <h2 className="mt-3 text-3xl font-extrabold">{EVENTO_GUTEMBERG.venue}</h2>
              <p className="mt-4 leading-relaxed text-white/80">{EVENTO_GUTEMBERG.address}</p>
              <a
                href={EVENTO_GUTEMBERG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-bold text-primary transition-opacity hover:opacity-90"
              >
                <MapPin className="h-4 w-4" />
                Abrir rota no mapa
              </a>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg sm:p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">Inscrição</p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Garanta sua presença</h2>
              <p className="mt-2 text-slate-600">Preencha seus dados para participar do evento.</p>

              {error && (
                <div role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="evento-nome">Nome completo *</Label>
                  <Input id="evento-nome" value={form.nome} onChange={(event) => updateField("nome", event.target.value)} className="mt-2" autoComplete="name" required />
                </div>
                <div>
                  <Label htmlFor="evento-cpf">CPF (opcional)</Label>
                  <Input id="evento-cpf" inputMode="numeric" value={form.cpf ?? ""} onChange={(event) => updateField("cpf", formatCpf(event.target.value))} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="evento-telefone">Telefone / WhatsApp *</Label>
                  <Input id="evento-telefone" inputMode="tel" value={form.telefone} onChange={(event) => updateField("telefone", formatPhone(event.target.value))} className="mt-2" autoComplete="tel" required />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="evento-email">E-mail *</Label>
                  <Input id="evento-email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="mt-2" autoComplete="email" required />
                </div>
                <div>
                  <Label htmlFor="evento-cidade">Cidade *</Label>
                  <Input id="evento-cidade" value={form.cidade} onChange={(event) => updateField("cidade", event.target.value)} className="mt-2" autoComplete="address-level2" required />
                </div>
                <div>
                  <Label htmlFor="evento-bairro">Bairro *</Label>
                  <Input id="evento-bairro" value={form.bairro} onChange={(event) => updateField("bairro", event.target.value)} className="mt-2" autoComplete="address-level3" required />
                </div>
              </div>

              <label className="mt-5 flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <Checkbox checked={form.lgpd} onCheckedChange={(checked) => updateField("lgpd", checked === true)} className="mt-0.5" />
                <span>Autorizo o uso dos meus dados para organização e comunicação deste evento.</span>
              </label>

              <Button type="submit" size="lg" className="mt-6 w-full font-bold" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Enviando cadastro..." : "Concluir cadastro"}
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
