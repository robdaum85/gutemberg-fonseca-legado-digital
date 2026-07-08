import { EVENTO_COLORS } from "@/config/evento";

type EventoHeroProps = {
  /**
   * "full": banner exibido por inteiro, sem corte, trocando para a arte
   * vertical (stories) no mobile. Usado no topo do /evento.
   * "compact": recorta a faixa superior do banner desktop (a arte mobile e
   * um poster vertical de stories, nao serve para recorte em faixa baixa).
   * Usado em paginas secundarias (sucesso, checkin).
   */
  variant?: "full" | "compact";
};

const HERO_DESKTOP_JPG = "/hero/herodesktop.jpg";
const HERO_DESKTOP_WEBP = "/hero/herodesktop.webp";
const HERO_MOBILE_JPG = "/hero/heromobile.jpg";
const HERO_MOBILE_WEBP = "/hero/heromobile.webp";

const ALT_TEXT =
  "Lançamento Pré-Campanha - Deputado Federal Gutemberg Fonseca, 27/07 as 19h no Espaco Hall";

// Lowercase "fetchpriority" (vs. React 19's camelCase fetchPriority) avoids a
// DOM-attribute warning on this project's React 18.
function eventoHeroImgProps(className: string) {
  return {
    src: HERO_DESKTOP_JPG,
    alt: ALT_TEXT,
    className,
    loading: "eager" as const,
    fetchpriority: "high",
  };
}

export function EventoHero({ variant = "full" }: EventoHeroProps) {
  if (variant === "compact") {
    return (
      <div
        className="relative h-40 w-full overflow-hidden md:h-52"
        style={{ backgroundColor: EVENTO_COLORS.navy }}
      >
        <picture>
          <source srcSet={HERO_DESKTOP_WEBP} type="image/webp" />
          <img
            {...eventoHeroImgProps("absolute inset-0 h-full w-full object-cover object-top")}
          />
        </picture>
      </div>
    );
  }

  return (
    <div
      className="flex h-[340px] max-h-[340px] w-full justify-center overflow-hidden md:h-[340px] md:max-h-[340px] lg:h-[380px] lg:max-h-[380px] xl:h-auto xl:max-h-none xl:overflow-visible"
      style={{ backgroundColor: EVENTO_COLORS.navy }}
    >
      <picture className="block h-full w-full xl:h-auto">
        <source media="(max-width: 767px)" srcSet={HERO_MOBILE_WEBP} type="image/webp" />
        <source media="(max-width: 767px)" srcSet={HERO_MOBILE_JPG} />
        <source srcSet={HERO_DESKTOP_WEBP} type="image/webp" />
        <img
          {...eventoHeroImgProps(
            "h-full w-full max-w-none object-cover object-top md:w-[200%] md:object-[0%_25%] xl:h-auto xl:w-full xl:max-w-full",
          )}
        />
      </picture>
    </div>
  );
}

export default EventoHero;
