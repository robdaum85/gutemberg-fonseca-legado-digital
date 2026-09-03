import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Clock3, Loader2, MapPin, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EVENTO_GUTEMBERG } from "@/config/evento";
import { CAMPAIGN_LEGAL_DISCLAIMER } from "@/config/photoFrames";
import {
  cadastrarEvento,
  isEventoApiConfigured,
  type EventoCadastroPayload,
} from "@/lib/eventoApi";
import "./EventoPage.css";
import { useSeo } from "@/lib/useSeo";
import { STATIC_PAGE_SEO, canonicalUrl } from "@/lib/siteSeo";

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
  const seo = STATIC_PAGE_SEO["/evento"];
  useSeo({
    title: seo.title,
    description: seo.description,
    canonical: canonicalUrl(seo.path),
    image: seo.image,
    noindex: true,
  });
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

      const credential = {
        nome: response.nome ?? form.nome,
        codigo: response.codigo,
        qrcodeUrl: response.qrcodeUrl,
      };
      sessionStorage.setItem("evento-credential", JSON.stringify(credential));
      navigate("/evento/sucesso", { state: credential });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar cadastro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="campaign-registration">
      <main id="conteudo-principal" tabIndex={-1}>
        <section className="campaign-registration__hero" id="inicio">
          <div className="campaign-registration__shell campaign-registration__grid">
            <div className="campaign-registration__copy">
              <p className="campaign-registration__eyebrow">{EVENTO_GUTEMBERG.title}</p>
              <h1 className="sr-only">Gutemberg Fonseca 2255 — Candidato a Deputado Federal</h1>
              <img
                className="campaign-registration__logo"
                src="/images/federal/brand/logo-hero-2255-completa.png"
                alt="Gutemberg Fonseca, Deputado Federal, número 2255, o Defensor do Consumidor"
                width="1200"
                height="800"
                loading="eager"
                decoding="async"
              />
              <div className="campaign-registration__event-data" aria-label="Informações do lançamento">
                <div><CalendarDays /><span><small>Data</small><strong>{EVENTO_GUTEMBERG.dateLong}</strong></span></div>
                <div><Clock3 /><span><small>Horário</small><strong>{EVENTO_GUTEMBERG.time}</strong></span></div>
                <div className="campaign-registration__event-location"><MapPin /><span><small>Local</small><strong>{EVENTO_GUTEMBERG.venue}</strong><em>{EVENTO_GUTEMBERG.address}</em></span></div>
              </div>
              <a className="campaign-registration__mobile-cta" href="#formulario-inscricao">
                Confirmar minha presença <ArrowRight />
              </a>
            </div>

            <div className="campaign-registration__portrait" aria-hidden="true">
              <div className="campaign-registration__brazil-emblem"><span /></div>
              <picture>
                <source
                  type="image/webp"
                  sizes="(max-width: 680px) 80vw, (max-width: 1100px) 42vw, 26vw"
                  srcSet="/images/federal/hero/section-01-hero-gutemberg-retrato-02-480x600.webp 480w, /images/federal/hero/section-01-hero-gutemberg-retrato-02-768x960.webp 768w, /images/federal/hero/section-01-hero-gutemberg-retrato-02-1024x1280.webp 1024w"
                />
                <img src="/images/federal/hero/section-01-hero-gutemberg-retrato-02.png" alt="" width="1800" height="2250" />
              </picture>
            </div>

            <form id="formulario-inscricao" onSubmit={handleSubmit} className="campaign-registration__form">
              <p className="campaign-registration__form-kicker">Inscrições abertas</p>
              <h2>Confirme sua presença</h2>
              <p>Preencha seus dados e receba sua identificação para a entrada.</p>

              {error && (
                <div role="alert" className="campaign-registration__error">
                  {error}
                </div>
              )}

              <div className="campaign-registration__fields">
                <div className="campaign-registration__field--full">
                  <Label htmlFor="evento-nome">Nome completo *</Label>
                  <Input id="evento-nome" value={form.nome} onChange={(event) => updateField("nome", event.target.value)} autoComplete="name" required />
                </div>
                <div>
                  <Label htmlFor="evento-cpf">CPF (opcional)</Label>
                  <Input id="evento-cpf" inputMode="numeric" value={form.cpf ?? ""} onChange={(event) => updateField("cpf", formatCpf(event.target.value))} />
                </div>
                <div>
                  <Label htmlFor="evento-telefone">Telefone / WhatsApp *</Label>
                  <Input id="evento-telefone" inputMode="tel" value={form.telefone} onChange={(event) => updateField("telefone", formatPhone(event.target.value))} autoComplete="tel" required />
                </div>
                <div className="campaign-registration__field--full">
                  <Label htmlFor="evento-email">E-mail *</Label>
                  <Input id="evento-email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" required />
                </div>
                <div>
                  <Label htmlFor="evento-cidade">Cidade *</Label>
                  <Input id="evento-cidade" value={form.cidade} onChange={(event) => updateField("cidade", event.target.value)} autoComplete="address-level2" required />
                </div>
                <div>
                  <Label htmlFor="evento-bairro">Bairro *</Label>
                  <Input id="evento-bairro" value={form.bairro} onChange={(event) => updateField("bairro", event.target.value)} autoComplete="address-level3" required />
                </div>
              </div>

              <label className="campaign-registration__consent">
                <Checkbox checked={form.lgpd} onCheckedChange={(checked) => updateField("lgpd", checked === true)} className="mt-0.5" />
                <span>Autorizo o uso dos meus dados para organização e comunicação deste evento.</span>
              </label>

              <Button type="submit" size="lg" className="campaign-registration__submit" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Enviando inscrição..." : "Confirmar minha presença"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>
              <p className="campaign-registration__privacy"><ShieldCheck /> Seus dados serão utilizados somente para organização e comunicação do evento.</p>
            </form>
          </div>
        </section>
      </main>
      <footer className="campaign-registration__footer">
        <div className="campaign-registration__footer-side">
          <img
            className="campaign-registration__footer-logo"
            src="/images/federal/brand/logo-navbar-2255-horizontal.png"
            alt="Gutemberg Fonseca, Deputado Federal, número 2255, o Defensor do Consumidor"
            width="1000"
            height="500"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="campaign-registration__footer-side campaign-registration__footer-side--right">
          <strong>Evento de lançamento · 24 de agosto de 2026</strong>
          <span>{CAMPAIGN_LEGAL_DISCLAIMER.join(" - ")}</span>
        </div>
      </footer>
    </div>
  );
}
