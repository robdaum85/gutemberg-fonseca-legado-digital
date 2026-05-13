import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

type ThemeCopaContextValue = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (v: boolean) => void;
};

const ThemeCopaContext = createContext<ThemeCopaContextValue | undefined>(undefined);

const STORAGE_KEY = 'theme-copa';

export const ThemeCopaProvider = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabledState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  });

  useEffect(() => {
    const body = document.body;
    body.classList.add('theme-copa-transitioning');
    if (enabled) body.classList.add('theme-copa');
    else body.classList.remove('theme-copa');
    window.localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
    const t = window.setTimeout(() => body.classList.remove('theme-copa-transitioning'), 600);
    return () => window.clearTimeout(t);
  }, [enabled]);

  const toggle = useCallback(() => setEnabledState((v) => !v), []);
  const setEnabled = useCallback((v: boolean) => setEnabledState(v), []);

  return (
    <ThemeCopaContext.Provider value={{ enabled, toggle, setEnabled }}>
      {children}
    </ThemeCopaContext.Provider>
  );
};

export const useThemeCopa = () => {
  const ctx = useContext(ThemeCopaContext);
  if (!ctx) throw new Error('useThemeCopa must be used inside ThemeCopaProvider');
  return ctx;
};
