import { useEffect } from "react";

export function useDisableThemeCopa() {
  useEffect(() => {
    const hadThemeCopa = document.body.classList.contains("theme-copa");
    document.body.classList.add("theme-copa-disabled-route");
    document.body.classList.remove("theme-copa");

    const frame = window.requestAnimationFrame(() => {
      document.body.classList.remove("theme-copa");
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.classList.remove("theme-copa-disabled-route");
      if (hadThemeCopa) {
        document.body.classList.add("theme-copa");
      }
    };
  }, []);
}

