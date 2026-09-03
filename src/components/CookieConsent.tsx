import { useEffect, useState } from "react";
import { Cookie, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

const CONSENT_STORAGE_KEY = "gf_cookie_consent";
const GA_MEASUREMENT_ID = "G-GQTGRP15XX";
const GOOGLE_ADS_ID = "AW-18358930380";

type CookieConsentValue = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const deleteCookie = (name: string) => {
  const hostnameParts = window.location.hostname.split(".");
  const domains = hostnameParts.map((_, index) => `.${hostnameParts.slice(index).join(".")}`);
  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";

  [`${name}=; expires=${expires}; path=/`, ...domains.map((domain) => `${name}=; expires=${expires}; path=/; domain=${domain}`)].forEach(
    (cookie) => {
      document.cookie = cookie;
    },
  );
};

const clearAnalyticsCookies = () => {
  document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat")
    .forEach(deleteCookie);
};

const DENIED_CONSENT = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

const GRANTED_CONSENT = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

// Google Consent Mode v2: gtag.js loads for every visitor (even before a
// banner decision) so GA4/Ads still receive cookieless, anonymized pings
// and modeled conversions. No cookie is written and no personal data is
// processed until the visitor explicitly accepts, so this stays LGPD-safe
// while fixing the lost pageviews from visitors who never interact with
// the banner.
const initGoogleTags = () => {
  if (document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the native Arguments object in its command queue.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  window.gtag("consent", "default", stored === "accepted" ? GRANTED_CONSENT : DENIED_CONSENT);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
  window.gtag("config", GOOGLE_ADS_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

const updateConsent = (value: CookieConsentValue) => {
  window.gtag?.("consent", "update", value === "accepted" ? GRANTED_CONSENT : DENIED_CONSENT);
};

const CookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsentValue | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : null;
  });

  useEffect(() => {
    initGoogleTags();
  }, []);

  useEffect(() => {
    if (consent === null) return;

    updateConsent(consent);

    if (consent === "rejected") {
      clearAnalyticsCookies();
    }
  }, [consent]);

  const saveConsent = (value: CookieConsentValue) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setConsent(value);
    window.dispatchEvent(new Event("gf:cookie-consent"));
  };

  if (consent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[120] px-4 pb-4 sm:px-6" role="region" aria-label="Aviso de cookies e LGPD">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 text-slate-900 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-primary">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold leading-tight">Aviso de cookies e LGPD</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Usamos cookies essenciais e armazenamento local para preferências do site. Com sua autorização, também usamos
              Google Analytics para medir audiência e melhorar a experiência.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" className="border-slate-300 text-slate-800" onClick={() => saveConsent("rejected")}>
            Rejeitar
          </Button>
          <Button type="button" className="bg-primary text-primary-foreground" onClick={() => saveConsent("accepted")}>
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
