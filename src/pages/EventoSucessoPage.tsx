import { useEffect } from "react";
import { CalendarDays, CheckCircle2, Clock3, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { EVENTO_GUTEMBERG } from "@/config/evento";

type SuccessState = {
  nome?: string;
};

export default function EventoSucessoPage() {
  const { state } = useLocation();
  const nome = ((state ?? {}) as SuccessState).nome?.trim();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main id="conteudo-principal" tabIndex={-1} className="bg-primary px-4 pb-16 pt-32 md:pb-24 md:pt-40">
        <section className="container mx-auto max-w-2xl rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-primary">
            {EVENTO_GUTEMBERG.title}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Inscrição realizada com sucesso!
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            {nome ? `Obrigado, ${nome}!` : "Obrigado por se inscrever!"}
          </p>
          <p className="mx-auto mt-2 max-w-lg leading-relaxed text-slate-600">
            Agradecemos a sua confirmação. Esperamos você no Grande Evento São Gonçalo.
          </p>

          <div className="mt-7 space-y-3 rounded-xl bg-slate-50 p-5 text-left">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div><strong className="block text-slate-900">Data</strong><span className="text-slate-600">{EVENTO_GUTEMBERG.date}</span></div>
            </div>
            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div><strong className="block text-slate-900">Horário</strong><span className="text-slate-600">20:00</span></div>
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
