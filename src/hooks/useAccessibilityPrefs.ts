import { useEffect, useState, useCallback } from 'react';

export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
export type FontSize = 'normal' | 'large' | 'xlarge';

export interface A11yPrefs {
  fontSize: FontSize;
  highContrast: boolean;
  grayscale: boolean;
  colorBlind: ColorBlindMode;
  underlineLinks: boolean;
  reduceMotion: boolean;
  readable: boolean;
  bigCursor: boolean;
}

const DEFAULTS: A11yPrefs = {
  fontSize: 'normal',
  highContrast: false,
  grayscale: false,
  colorBlind: 'none',
  underlineLinks: false,
  reduceMotion: false,
  readable: false,
  bigCursor: false,
};

const STORAGE_KEY = 'a11y-prefs';

function load(): A11yPrefs {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function apply(prefs: A11yPrefs) {
  const root = document.documentElement;
  root.classList.toggle('a11y-font-lg', prefs.fontSize === 'large');
  root.classList.toggle('a11y-font-xl', prefs.fontSize === 'xlarge');
  root.classList.toggle('a11y-high-contrast', prefs.highContrast);
  root.classList.toggle('a11y-grayscale', prefs.grayscale);
  root.classList.toggle('a11y-underline-links', prefs.underlineLinks);
  root.classList.toggle('a11y-reduce-motion', prefs.reduceMotion);
  root.classList.toggle('a11y-readable', prefs.readable);
  root.classList.toggle('a11y-big-cursor', prefs.bigCursor);
  root.classList.remove('a11y-protanopia', 'a11y-deuteranopia', 'a11y-tritanopia');
  if (prefs.colorBlind !== 'none') {
    root.classList.add(`a11y-${prefs.colorBlind}`);
  }
}

export function useAccessibilityPrefs() {
  const [prefs, setPrefs] = useState<A11yPrefs>(load);

  useEffect(() => {
    apply(prefs);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore
    }
  }, [prefs]);

  const update = useCallback(<K extends keyof A11yPrefs>(key: K, value: A11yPrefs[K]) => {
    setPrefs((p) => ({ ...p, [key]: value }));
  }, []);

  const reset = useCallback(() => setPrefs(DEFAULTS), []);

  return { prefs, update, reset };
}
