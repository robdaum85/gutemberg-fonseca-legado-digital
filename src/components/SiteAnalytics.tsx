import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function SiteAnalytics() {
  const location = useLocation();
  const firstLocation = useRef(true);

  useEffect(() => {
    if (firstLocation.current) {
      firstLocation.current = false;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      window.gtag?.("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: `${location.pathname}${location.search}`,
      });
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const trackNavigation = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
      if (!target || target.hasAttribute("data-campaign-event")) return;

      const destination = new URL(target.href, window.location.href);
      window.gtag?.("event", "navigation_click", {
        link_text: target.textContent?.trim().replace(/\s+/g, " ").slice(0, 120) ?? "",
        link_url: destination.href,
        outbound: destination.origin !== window.location.origin,
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", trackNavigation, true);
    return () => document.removeEventListener("click", trackNavigation, true);
  }, []);

  return null;
}
