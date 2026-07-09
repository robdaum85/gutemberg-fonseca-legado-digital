import { useEffect, useState } from "react";
import { X, MessageCircle, Instagram, Facebook, AlertCircle, Heart, Users, Camera } from "lucide-react";
import { SOCIAL_LINKS } from "@/config/mobilizacao";

const STORAGE_KEY = "welcome_popup_seen_v1";
const TWIBBONIZE_URL = "https://www.twibbonize.com/exercitodoconsumidor";

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setOpen(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setOpen(false);
  };

  const goSection = (id: string) => {
    close();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (!open) return null;

  const externalBtn =
    "flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition";
  const internalBtn =
    "flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-primary text-primary font-semibold hover:opacity-90 transition";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-scale-in max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Fechar"
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5 text-graphite" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold font-poppins text-primary">
            Bem-vindo ao canal do Guto
          </h3>
          <p className="text-sm text-graphite mt-1">Escolha como deseja continuar:</p>
        </div>

        <div className="mb-5 rounded-2xl border border-[rgba(184,255,59,.25)] bg-[rgba(184,255,59,.10)] p-4 text-primary">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(184,255,59,.35)] bg-white/75">
              <Camera className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h4 className="text-base font-bold leading-tight">
                Entre para o Exército do Consumidor
              </h4>
              <p className="mt-2 text-sm leading-5 text-graphite">
                Coloque o filtro oficial da campanha na sua foto e ajude a
                fortalecer essa mobilização pela defesa dos direitos do consumidor.
              </p>
            </div>
          </div>
          <a
            href={TWIBBONIZE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-3 text-sm font-bold text-primary transition hover:opacity-90"
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
            Personalizar minha foto
          </a>
          <p className="mt-2 text-center text-xs leading-5 text-graphite/75">
            Você será direcionado para o Twibbonize para enviar sua foto e
            aplicar o filtro da campanha.
          </p>
        </div>

        <div className="space-y-3">
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className={externalBtn}>
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className={externalBtn}>
            <Instagram className="h-5 w-5" /> Instagram
          </a>
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className={externalBtn}>
            <Facebook className="h-5 w-5" /> Facebook
          </a>

          <div className="pt-2 border-t border-gray-200" />

          <button onClick={() => goSection("denuncia")} className={internalBtn}>
            <AlertCircle className="h-5 w-5" /> Fazer denúncia
          </button>
          <button onClick={() => goSection("apoiador")} className={internalBtn}>
            <Heart className="h-5 w-5" /> Ser apoiador
          </button>
          <button onClick={() => goSection("lideranca")} className={internalBtn}>
            <Users className="h-5 w-5" /> Ser liderança
          </button>
        </div>

        <button
          onClick={close}
          className="block mx-auto mt-6 text-sm text-graphite/70 hover:text-graphite underline underline-offset-4"
        >
          continuar navegando
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
