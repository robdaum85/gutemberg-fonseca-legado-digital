import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { CalendarDays, CheckCircle2, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EVENTO_GUTEMBERG } from "@/config/evento";
import "./EventoPage.css";

type SuccessState = {
  nome?: string;
  codigo?: string;
  qrcodeUrl?: string;
};

function storedCredential(): SuccessState {
  try {
    return JSON.parse(sessionStorage.getItem("evento-credential") ?? "{}") as SuccessState;
  } catch {
    return {};
  }
}

export default function EventoSucessoPage() {
  const { state } = useLocation();
  const successState = state ? (state as SuccessState) : storedCredential();
  const nome = successState.nome?.trim();
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!successState.qrcodeUrl) return;
    QRCode.toDataURL(successState.qrcodeUrl, { width: 360, margin: 2, errorCorrectionLevel: "M" })
      .then(setQrImage)
      .catch(() => setQrImage(""));
  }, [successState.qrcodeUrl]);

  return (
    <div className="campaign-registration campaign-success">
      <main id="conteudo-principal" tabIndex={-1} className="campaign-success__main">
        <section className="campaign-success__card">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-primary">
            {EVENTO_GUTEMBERG.slogan}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Inscrição realizada com sucesso!
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            {nome ? `Obrigado, ${nome}!` : "Obrigado por se inscrever!"}
          </p>
          <p className="mx-auto mt-2 max-w-lg leading-relaxed text-slate-600">
            Sua presença está confirmada para o lançamento da campanha de Gutemberg Fonseca a Deputado Federal.
          </p>

          {successState.codigo && (
            <div className="campaign-success__credential">
              <p>Apresente esta identificação na entrada</p>
              {qrImage && <img src={qrImage} alt={`QR Code da inscrição ${successState.codigo}`} width="240" height="240" />}
              <strong>{successState.codigo}</strong>
              <small>Salve esta tela ou faça uma captura para apresentar mesmo sem internet.</small>
            </div>
          )}

          <div className="mt-7 space-y-3 rounded-xl bg-slate-50 p-5 text-left">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div><strong className="block text-slate-900">Data</strong><span className="text-slate-600">{EVENTO_GUTEMBERG.date}</span></div>
            </div>
            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div><strong className="block text-slate-900">Horário</strong><span className="text-slate-600">{EVENTO_GUTEMBERG.time}</span></div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <strong className="block text-slate-900">{EVENTO_GUTEMBERG.venue}</strong>
                <span className="text-slate-600">{EVENTO_GUTEMBERG.address}</span>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Button asChild size="lg" className="font-bold">
              <a href={EVENTO_GUTEMBERG.mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4" />
                Abrir rota
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold">
              <Link to="/">Voltar ao site</Link>
            </Button>
          </div>
          <p className="campaign-success__security"><ShieldCheck /> Inscrição individual e intransferível.</p>
        </section>
      </main>
    </div>
  );
}
