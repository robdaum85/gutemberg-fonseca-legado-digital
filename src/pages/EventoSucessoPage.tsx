import { CheckCircle2, Instagram, MessageCircle, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EVENTO_COLORS, EVENTO_GUTEMBERG } from "@/config/evento";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/EQnrzZVVdhmH3HsfpHoXRL";
const INSTAGRAM_URL = "https://www.instagram.com/gutembergpfonseca/";

type SuccessState = {
  nome?: string;
};

export default function EventoSucessoPage() {
  const { state } = useLocation();
  const { nome } = (state ?? {}) as SuccessState;

  return (
    <main
      id="conteudo-principal"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8"
      style={{ backgroundColor: EVENTO_COLORS.backgroundLight }}
    >
      <img
        src="/evento/palestra-comunicacao-2026.jpeg"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-25 blur-[2px]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-white/65" aria-hidden="true" />

      <section className="relative w-full max-w-lg rounded-2xl border border-white/80 bg-white/95 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-9">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
        >
          <Link to="/" aria-label="Fechar e voltar para o site principal">
            <X className="h-5 w-5" />
          </Link>
        </Button>

        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg"
          style={{ backgroundColor: EVENTO_COLORS.green }}
        >
          <CheckCircle2 className="h-9 w-9" />
        </div>

        <p
          className="mt-5 text-xs font-black uppercase tracking-[0.16em]"
          style={{ color: EVENTO_COLORS.green }}
        >
          {EVENTO_GUTEMBERG.title}
        </p>
        <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl" style={{ color: EVENTO_COLORS.navy }}>
          Cadastro feito com sucesso!
        </h1>
        {nome && <p className="mt-3 text-lg font-bold text-zinc-800">Obrigado, {nome}.</p>}
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-600 sm:text-base">
          Sua inscrição foi confirmada. Entre no nosso grupo para acompanhar os avisos e as próximas ações.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-7 h-auto min-h-11 w-full whitespace-normal py-3 font-black leading-tight text-white hover:opacity-95"
          style={{ backgroundColor: EVENTO_COLORS.green }}
        >
          <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" />
            Entrar no grupo Exército do Consumidor
          </a>
        </Button>

        <div className="my-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Siga nossas redes</span>
          <span className="h-px flex-1 bg-zinc-200" />
        </div>

        <Button asChild variant="outline" size="lg" className="w-full font-bold">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <Instagram className="h-5 w-5" />
            Seguir no Instagram
          </a>
        </Button>
      </section>
    </main>
  );
}
