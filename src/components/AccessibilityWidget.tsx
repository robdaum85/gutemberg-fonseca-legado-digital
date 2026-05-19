import { useEffect, useMemo, useState } from "react";
import {
  Accessibility,
  Contrast,
  Ear,
  Eye,
  Minus,
  Palette,
  Plus,
  RotateCcw,
  Type,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

type ColorMode =
  | "default"
  | "high-contrast"
  | "grayscale"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia";

type Preferences = {
  colorMode: ColorMode;
  fontScale: number;
  readableFont: boolean;
  reducedMotion: boolean;
};

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => unknown;
    };
    __vlibrasWidgetLoaded?: boolean;
  }
}

const STORAGE_KEY = "gutemberg-accessibility-preferences";

const defaultPreferences: Preferences = {
  colorMode: "default",
  fontScale: 1,
  readableFont: false,
  reducedMotion: false,
};

const colorOptions: Array<{
  value: ColorMode;
  label: string;
  description: string;
}> = [
  {
    value: "default",
    label: "Padrão",
    description: "Cores originais do site",
  },
  {
    value: "high-contrast",
    label: "Alto contraste",
    description: "Mais contraste para baixa visão",
  },
  {
    value: "grayscale",
    label: "Sem cores",
    description: "Remove cores para foco em contraste",
  },
  {
    value: "protanopia",
    label: "Protanopia",
    description: "Ajuste para dificuldade com tons vermelhos",
  },
  {
    value: "deuteranopia",
    label: "Deuteranopia",
    description: "Ajuste para dificuldade com tons verdes",
  },
  {
    value: "tritanopia",
    label: "Tritanopia",
    description: "Ajuste para dificuldade com tons azuis",
  },
];

const clampFontScale = (value: number) => Math.min(1.4, Math.max(0.9, value));

const loadPreferences = (): Preferences => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultPreferences;
    }

    return {
      ...defaultPreferences,
      ...JSON.parse(stored),
    };
  } catch {
    return defaultPreferences;
  }
};

const getReadableText = () => {
  const mainContent =
    document.getElementById("main-content") ?? document.querySelector("main");

  return (
    mainContent?.textContent?.replace(/\s+/g, " ").trim() ??
    document.body.textContent?.replace(/\s+/g, " ").trim() ??
    ""
  );
};

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [status, setStatus] = useState("");
  const [preferences, setPreferences] = useState<Preferences>(() => {
    if (typeof window === "undefined") {
      return defaultPreferences;
    }

    return loadPreferences();
  });

  const selectedColorMode = useMemo(
    () => colorOptions.find((option) => option.value === preferences.colorMode),
    [preferences.colorMode]
  );

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.a11yColorMode = preferences.colorMode;
    root.dataset.a11yReadableFont = String(preferences.readableFont);
    root.dataset.a11yReducedMotion = String(preferences.reducedMotion);
    root.style.setProperty("--a11y-font-scale", String(preferences.fontScale));

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    const handleSpeechEnd = () => setIsSpeaking(false);

    window.speechSynthesis?.addEventListener("voiceschanged", handleSpeechEnd);

    return () => {
      window.speechSynthesis?.cancel();
      window.speechSynthesis?.removeEventListener(
        "voiceschanged",
        handleSpeechEnd
      );
    };
  }, []);

  const updatePreferences = (next: Partial<Preferences>) => {
    setPreferences((current) => ({
      ...current,
      ...next,
    }));
  };

  const changeFontScale = (step: number) => {
    updatePreferences({
      fontScale: Number(clampFontScale(preferences.fontScale + step).toFixed(2)),
    });
  };

  const resetPreferences = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setPreferences(defaultPreferences);
    setStatus("Preferências de acessibilidade redefinidas.");
  };

  const toggleSpeech = () => {
    if (!("speechSynthesis" in window)) {
      setStatus("Seu navegador não oferece leitura em voz alta.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setStatus("Leitura em voz alta pausada.");
      return;
    }

    const text = getReadableText();

    if (!text) {
      setStatus("Não encontrei texto suficiente para leitura.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text.slice(0, 12000));
    utterance.lang = "pt-BR";
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      setStatus("Não foi possível concluir a leitura em voz alta.");
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setStatus("Leitura em voz alta iniciada.");
  };

  const enableVLibras = () => {
    const existingContainer = document.querySelector("[vw]");

    if (!existingContainer) {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("vw", "");
      wrapper.className = "enabled";
      wrapper.innerHTML = `
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      `;
      document.body.appendChild(wrapper);
    }

    const startWidget = () => {
      if (window.VLibras && !window.__vlibrasWidgetLoaded) {
        window.__vlibrasWidgetLoaded = true;
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
      setStatus("VLibras ativado. Use o botão flutuante para tradução em Libras.");
    };

    if (window.VLibras) {
      startWidget();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", startWidget, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = startWidget;
    script.onerror = () => {
      setStatus("Não foi possível carregar o VLibras agora.");
    };
    document.body.appendChild(script);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo principal
      </a>

      <section
        className="accessibility-widget"
        aria-label="Ferramentas de acessibilidade"
      >
        <button
          type="button"
          className="accessibility-trigger"
          aria-expanded={isOpen}
          aria-controls="accessibility-panel"
          onClick={() => setIsOpen((current) => !current)}
        >
          <Accessibility aria-hidden="true" />
          <span>Acessibilidade</span>
        </button>

        {isOpen && (
          <div id="accessibility-panel" className="accessibility-panel">
            <div className="accessibility-panel-header">
              <div>
                <p className="accessibility-eyebrow">Acessibilidade</p>
                <h2>Adapte sua navegação</h2>
              </div>
              <button
                type="button"
                className="accessibility-icon-button"
                aria-label="Fechar painel de acessibilidade"
                onClick={() => setIsOpen(false)}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="accessibility-group">
              <h3>
                <Palette aria-hidden="true" />
                Daltonismo e contraste
              </h3>
              <div className="accessibility-options-grid">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="accessibility-option"
                    aria-pressed={preferences.colorMode === option.value}
                    onClick={() => updatePreferences({ colorMode: option.value })}
                  >
                    <span>{option.label}</span>
                    <small>{option.description}</small>
                  </button>
                ))}
              </div>
              <p className="accessibility-current">
                Modo atual: {selectedColorMode?.label}
              </p>
            </div>

            <div className="accessibility-group">
              <h3>
                <Eye aria-hidden="true" />
                Leitura visual
              </h3>
              <div className="accessibility-actions-row">
                <button
                  type="button"
                  className="accessibility-action"
                  onClick={() => changeFontScale(-0.1)}
                  disabled={preferences.fontScale <= 0.9}
                >
                  <Minus aria-hidden="true" />
                  A-
                </button>
                <span className="accessibility-font-value">
                  {Math.round(preferences.fontScale * 100)}%
                </span>
                <button
                  type="button"
                  className="accessibility-action"
                  onClick={() => changeFontScale(0.1)}
                  disabled={preferences.fontScale >= 1.4}
                >
                  <Plus aria-hidden="true" />
                  A+
                </button>
              </div>
              <div className="accessibility-actions-grid">
                <button
                  type="button"
                  className="accessibility-action"
                  aria-pressed={preferences.readableFont}
                  onClick={() =>
                    updatePreferences({
                      readableFont: !preferences.readableFont,
                    })
                  }
                >
                  <Type aria-hidden="true" />
                  Fonte legível
                </button>
                <button
                  type="button"
                  className="accessibility-action"
                  aria-pressed={preferences.reducedMotion}
                  onClick={() =>
                    updatePreferences({
                      reducedMotion: !preferences.reducedMotion,
                    })
                  }
                >
                  <Contrast aria-hidden="true" />
                  Reduzir movimento
                </button>
              </div>
            </div>

            <div className="accessibility-group">
              <h3>
                <Ear aria-hidden="true" />
                Libras e áudio
              </h3>
              <div className="accessibility-actions-grid">
                <button
                  type="button"
                  className="accessibility-action"
                  onClick={enableVLibras}
                >
                  <Ear aria-hidden="true" />
                  Ativar VLibras
                </button>
                <button
                  type="button"
                  className="accessibility-action"
                  aria-pressed={isSpeaking}
                  onClick={toggleSpeech}
                >
                  {isSpeaking ? (
                    <VolumeX aria-hidden="true" />
                  ) : (
                    <Volume2 aria-hidden="true" />
                  )}
                  {isSpeaking ? "Parar leitura" : "Ler página"}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="accessibility-reset"
              onClick={resetPreferences}
            >
              <RotateCcw aria-hidden="true" />
              Redefinir ajustes
            </button>

            <p className="sr-only" aria-live="polite">
              {status}
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default AccessibilityWidget;
