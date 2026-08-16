import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (command: string, event: string, parameters?: Record<string, string>) => void;
  }
}

const EVENT_ATTRIBUTE = "data-campaign-event";

export function useCampaignAnalytics() {
  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>(`[${EVENT_ATTRIBUTE}]`)
        : null;

      if (!target) return;

      const eventName = target.dataset.campaignEvent;
      if (!eventName) return;

      const parameters = {
        link_text: target.dataset.campaignLabel ?? target.textContent?.trim().replace(/\s+/g, " ") ?? "",
        link_url: target instanceof HTMLAnchorElement ? target.href : "",
        page_path: window.location.pathname,
      };

      window.gtag?.("event", eventName, parameters);
      window.fbq?.("trackCustom", eventName, parameters);
    };

    document.addEventListener("click", trackClick, true);
    return () => document.removeEventListener("click", trackClick, true);
  }, []);
}
