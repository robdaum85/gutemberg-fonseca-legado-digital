import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EVENTO_COLORS } from "@/config/evento";
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

type Success = {
  nome: string;
  codigo: string;
  message?: string;
};

export function EventoCadastroRapido({ onRegistered }: { onRegistered: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<EventoCadastroPayload>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<Success | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("evento-cadastro-open", open);
    return () => document.documentElement.classList.remove("evento-cadastro-open");
  }, [open]);

  function updateField<K extends keyof EventoCadastroPayload>(
    key: K,
    value: EventoCadastroPayload[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setForm(initialForm);
    setError("");
    setSuccess(null);
  }

  function changeOpen(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) reset();
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.lgpd) {
      setError("Autorize o uso dos dados para concluir o cadastro.");
      return;
    }
    if (!isEventoApiConfigured()) {
      setError("A API do evento não está configurada.");
      return;
    }

    setLoading(true);
    try {
      const response = await cadastrarEvento(form);
      if (!response.success) {
        setError(response.message ?? "Não foi possível concluir o cadastro.");
        return;
      }
      setSuccess({
        nome: response.nome ?? form.nome,
        codigo: response.codigo,
        message: response.message,
      });
      onRegistered();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar cadastro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <Button
          type="button"
          size="icon"
          onClick={() => setOpen(true)}
          aria-label="Cadastrar novo participante"
          title="Novo cadastro"
          className="fixed bottom-[116px] right-4 z-[60] h-11 w-11 rounded-full text-white shadow-lg lg:hidden"
          style={{ backgroundColor: EVENTO_COLORS.green }}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      <Dialog open={open} onOpenChange={changeOpen}>
        <DialogContent className="z-[70] max-h-[92dvh] w-[calc(100%-24px)] overflow-y-auto rounded-xl p-0 sm:max-w-xl">
          <style>{`html.evento-cadastro-open .a11y-toggle { display: none; }`}</style>
          <div className="border-b border-zinc-200 px-5 py-4 pr-12">
            <DialogTitle className="text-xl font-extrabold">Novo cadastro</DialogTitle>
            <DialogDescription className="mt-1">
              Cadastre quem chegou ao evento sem inscrição prévia.
            </DialogDescription>
          </div>

          {success ? (
            <div className="p-5">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                <CheckCircle2 className="h-8 w-8" />
                <h3 className="mt-3 text-lg font-extrabold">Cadastro confirmado</h3>
                <p className="mt-1 font-bold">{success.nome}</p>
                <p className="mt-1 font-mono text-sm">{success.codigo}</p>
                {success.message && <p className="mt-2 text-sm">{success.message}</p>}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button type="button" variant="outline" onClick={() => changeOpen(false)}>
                  Fechar
                </Button>
                <Button type="button" className="text-white" style={{ backgroundColor: EVENTO_COLORS.green }} onClick={reset}>
                  Novo cadastro
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4 p-5">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              <div>
                <Label htmlFor="rapido-nome">Nome completo *</Label>
                <Input id="rapido-nome" value={form.nome} onChange={(event) => updateField("nome", event.target.value)} className="mt-1.5" required autoFocus />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="rapido-cpf">CPF *</Label>
                  <Input id="rapido-cpf" inputMode="numeric" value={form.cpf} onChange={(event) => updateField("cpf", formatCpf(event.target.value))} className="mt-1.5" required />
                </div>
                <div>
                  <Label htmlFor="rapido-telefone">Telefone / WhatsApp *</Label>
                  <Input id="rapido-telefone" inputMode="tel" value={form.telefone} onChange={(event) => updateField("telefone", formatPhone(event.target.value))} className="mt-1.5" required />
                </div>
              </div>
              <div>
                <Label htmlFor="rapido-email">E-mail *</Label>
                <Input id="rapido-email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="mt-1.5" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="rapido-cidade">Cidade *</Label>
                  <Input id="rapido-cidade" value={form.cidade} onChange={(event) => updateField("cidade", event.target.value)} className="mt-1.5" required />
                </div>
                <div>
                  <Label htmlFor="rapido-bairro">Bairro *</Label>
                  <Input id="rapido-bairro" value={form.bairro} onChange={(event) => updateField("bairro", event.target.value)} className="mt-1.5" required />
                </div>
              </div>
              <div>
                <Label htmlFor="rapido-categoria">Status *</Label>
                <select
                  id="rapido-categoria"
                  value={form.categoria}
                  onChange={(event) => {
                    updateField("categoria", event.target.value);
                    if (event.target.value !== "Convidado") updateField("observacoes", "");
                  }}
                  className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  required
                >
                  <option value="Liderança">Liderança</option>
                  <option value="Convidado">Convidado</option>
                </select>
              </div>
              {form.categoria === "Convidado" && (
                <div>
                  <Label htmlFor="rapido-convidado">Quem convidou? *</Label>
                  <Input id="rapido-convidado" value={form.observacoes} onChange={(event) => updateField("observacoes", event.target.value)} className="mt-1.5" required />
                </div>
              )}

              <label className="flex items-start gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
                <Checkbox checked={form.lgpd} onCheckedChange={(checked) => updateField("lgpd", checked === true)} className="mt-0.5" />
                <span>Autorizo o uso dos dados para organização, comunicação e controle de entrada deste evento.</span>
              </label>

              <Button type="submit" size="lg" disabled={loading} className="w-full font-black text-white" style={{ backgroundColor: EVENTO_COLORS.green }}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Cadastrando..." : "Concluir cadastro"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
