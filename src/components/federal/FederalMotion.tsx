import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { useParallax, useReducedMotion } from "@/hooks/useFederalMotion";

export type RevealDirection = "up" | "down" | "left" | "right" | "fade";
type RevealElement = "div" | "article" | "section";

type MotionStyle = CSSProperties & {
  "--reveal-delay"?: string;
  "--reveal-duration"?: string;
  "--reveal-distance"?: string;
};

export function ParallaxLayer({
  children,
  className = "",
  speed,
  maxMovement = 60,
  ariaHidden = true,
}: {
  children?: ReactNode;
  className?: string;
  speed: number;
  maxMovement?: number;
  ariaHidden?: boolean;
}) {
  const ref = useParallax<HTMLDivElement>(speed, maxMovement, true);
  return <div ref={ref} className={`parallax-layer ${className}`} aria-hidden={ariaHidden}>{children}</div>;
}

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  direction = "up",
  delay = 0,
  duration = 650,
  distance = 28,
  threshold = 0.14,
}: {
  children: ReactNode;
  as?: RevealElement;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px -6%" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion, threshold]);

  const style: MotionStyle = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
    "--reveal-distance": `${distance}px`,
  };
  return <Tag ref={ref as never} className={`reveal reveal--${direction} ${visible ? "is-visible" : ""} ${className}`} style={style}>{children}</Tag>;
}

export function ScrollProgress({ onScrolledChange }: { onScrolledChange: (scrolled: boolean) => void }) {
  const [progress, setProgress] = useState(0);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      const scrolled = window.scrollY > 80;
      if (scrolled !== scrolledRef.current) {
        scrolledRef.current = scrolled;
        onScrolledChange(scrolled);
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [onScrolledChange]);

  return <span className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}
