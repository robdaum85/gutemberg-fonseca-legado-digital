import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { CalendarDays, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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
          <div className="campaign-success__logo-wrap">
            <img
              className="campaign-success__logo"
              src="/images/federal/brand/logo-hero-2255-completa.png"
              alt="Gutemberg Fonseca, Deputado Federal, número 2255, o Defensor do Consumidor"
              width="1200"
              height="800"
              decoding="async"
            />
          </div>
          <h1>Inscrição realizada com sucesso!</h1>
          <p className="campaign-success__thanks">
            {nome ? `Obrigado, ${nome}!` : "Obrigado por se inscrever!"}
          </p>
          <p className="campaign-success__lead">
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

          <div className="campaign-success__info">
            <div className="campaign-success__info-item">
              <CalendarDays aria-hidden="true" />
              <div><strong>Data</strong><span>{EVENTO_GUTEMBERG.date}</span></div>
            </div>
            <div className="campaign-success__info-item">
              <Clock3 aria-hidden="true" />
              <div><strong>Horário</strong><span>{EVENTO_GUTEMBERG.time}</span></div>
            </div>
            <div className="campaign-success__info-item">
              <MapPin aria-hidden="true" />
              <div>
                <strong>{EVENTO_GUTEMBERG.venue}</strong>
                <span>{EVENTO_GUTEMBERG.address}</span>
              </div>
            </div>
          </div>

          <div className="campaign-success__actions">
            <a className="campaign-success__action campaign-success__action--primary" href={EVENTO_GUTEMBERG.mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin aria-hidden="true" />Abrir rota
            </a>
            <Link className="campaign-success__action campaign-success__action--outline" to="/">Voltar ao site</Link>
          </div>
          <p className="campaign-success__security"><ShieldCheck /> Inscrição individual e intransferível.</p>
        </section>
      </main>
    </div>
  );
}
