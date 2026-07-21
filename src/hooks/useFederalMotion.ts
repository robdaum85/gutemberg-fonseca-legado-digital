import { useEffect, useRef, useState } from "react";

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function useParallax<T extends HTMLElement>(speed: number, maxMovement = 60, relativeToViewport = false) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (reducedMotion || !desktop.matches) {
        element.style.setProperty("--parallax-y", "0px");
        return;
      }
      const source = relativeToViewport
        ? window.innerHeight / 2 - (element.getBoundingClientRect().top + element.offsetHeight / 2)
        : window.scrollY;
      const movement = Math.max(-maxMovement, Math.min(source * speed, maxMovement));
      element.style.setProperty("--parallax-y", `${movement.toFixed(2)}px`);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    desktop.addEventListener("change", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      desktop.removeEventListener("change", requestUpdate);
      window.cancelAnimationFrame(frame);
      element.style.removeProperty("--parallax-y");
    };
  }, [maxMovement, reducedMotion, relativeToViewport, speed]);

  return ref;
}
