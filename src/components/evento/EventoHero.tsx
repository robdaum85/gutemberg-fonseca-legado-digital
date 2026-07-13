import { EVENTO_COLORS } from "@/config/evento";

type EventoHeroProps = {
  variant?: "full" | "compact";
  theme?: "dark" | "light";
};

const HERO_IMAGE = "/evento/palestra-comunicacao-2026.jpeg";

const ALT_TEXT =
  "Palestra de Comunicação com Gutemberg Fonseca, dia 13 de julho de 2026 às 16h30, no Windsor Barra Hotel";

// Lowercase "fetchpriority" (vs. React 19's camelCase fetchPriority) avoids a
// DOM-attribute warning on this project's React 18.
function eventoHeroImgProps(className: string) {
  return {
    src: HERO_IMAGE,
    alt: ALT_TEXT,
    className,
    loading: "eager" as const,
    fetchpriority: "high",
  };
}

export function EventoHero({ variant = "full", theme = "dark" }: EventoHeroProps) {
  const backgroundColor = theme === "light" ? EVENTO_COLORS.backgroundLight : EVENTO_COLORS.navy;

  if (variant === "compact") {
    return (
      <div
        className={`evento-hero evento-hero--theme-${theme} relative h-44 w-full overflow-hidden md:h-64`}
        style={{ backgroundColor }}
      >
        <img
          {...eventoHeroImgProps("absolute inset-0 h-full w-full object-cover object-top")}
        />
        <div
          className="evento-hero__overlay pointer-events-none absolute inset-0"
          style={{
            background:
              theme === "light"
                ? "linear-gradient(180deg, rgba(239,241,246,0) 40%, rgba(239,241,246,0.9) 100%)"
                : "linear-gradient(180deg, rgba(2,53,120,0) 35%, rgba(5,15,35,0.72) 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div
      className={`evento-hero evento-hero--theme-${theme} flex h-[min(150vw,720px)] min-h-[420px] w-full justify-center overflow-hidden md:h-[min(78vh,760px)] md:min-h-[560px]`}
      style={{ backgroundColor }}
    >
      <img {...eventoHeroImgProps("h-full w-full object-contain object-top")} />
    </div>
  );
}

export default EventoHero;
