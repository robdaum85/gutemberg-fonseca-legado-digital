import { useEffect, useRef, useState } from 'react';
import { Accessibility, RotateCcw, X } from 'lucide-react';
import { useAccessibilityPrefs, type ColorBlindMode, type FontSize } from '@/hooks/useAccessibilityPrefs';

const AccessibilityWidget = () => {
  const { prefs, update, reset } = useAccessibilityPrefs();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const fontSizes: { value: FontSize; label: string }[] = [
    { value: 'normal', label: 'A' },
    { value: 'large', label: 'A+' },
    { value: 'xlarge', label: 'A++' },
  ];

  const colorBlindModes: { value: ColorBlindMode; label: string }[] = [
    { value: 'none', label: 'Nenhum' },
    { value: 'protanopia', label: 'Protanopia (vermelho)' },
    { value: 'deuteranopia', label: 'Deuteranopia (verde)' },
    { value: 'tritanopia', label: 'Tritanopia (azul)' },
  ];

  const toggles: { key: keyof typeof prefs; label: string }[] = [
    { key: 'highContrast', label: 'Alto contraste' },
    { key: 'grayscale', label: 'Escala de cinza' },
    { key: 'underlineLinks', label: 'Sublinhar links' },
    { key: 'reduceMotion', label: 'Reduzir animações' },
    { key: 'readable', label: 'Leitura ampliada' },
    { key: 'bigCursor', label: 'Cursor grande' },
  ];

  return (
    <>
      {/* Filtros SVG para daltonismo */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id="a11y-protanopia">
            <feColorMatrix
              type="matrix"
              values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="a11y-deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="a11y-tritanopia">
            <feColorMatrix
              type="matrix"
              values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      <button
        ref={triggerRef}
        type="button"
        className="a11y-toggle"
        aria-label="Abrir opções de acessibilidade"
        aria-expanded={open}
        aria-controls="a11y-panel"
        title="Acessibilidade"
        onClick={() => setOpen((v) => !v)}
      >
        <Accessibility size={22} aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          className="a11y-panel"
          role="dialog"
          aria-label="Opções de acessibilidade"
        >
          <div className="a11y-panel__header">
            <h3 className="a11y-panel__title">Acessibilidade</h3>
            <button
              type="button"
              className="a11y-panel__close"
              onClick={() => setOpen(false)}
              aria-label="Fechar painel"
            >
              <X size={18} />
            </button>
          </div>
          <p className="a11y-panel__subtitle">Ajustes seguem WCAG 2.1.</p>

          <div className="a11y-panel__group">
            <span className="a11y-panel__label">Tamanho da fonte</span>
            <div className="a11y-panel__row">
              {fontSizes.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={`a11y-pill ${prefs.fontSize === s.value ? 'is-active' : ''}`}
                  aria-pressed={prefs.fontSize === s.value}
                  onClick={() => update('fontSize', s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="a11y-panel__group">
            <label htmlFor="a11y-cb" className="a11y-panel__label">
              Filtro para daltonismo
            </label>
            <select
              id="a11y-cb"
              className="a11y-panel__select"
              value={prefs.colorBlind}
              onChange={(e) => update('colorBlind', e.target.value as ColorBlindMode)}
            >
              {colorBlindModes.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="a11y-panel__list">
            {toggles.map((t) => {
              const checked = prefs[t.key] as boolean;
              return (
                <div key={t.key} className="a11y-panel__item">
                  <span className="a11y-panel__item-label">{t.label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-label={t.label}
                    className={`a11y-switch ${checked ? 'is-on' : ''}`}
                    onClick={() => update(t.key, !checked as never)}
                  >
                    <span className="a11y-switch__thumb" />
                  </button>
                </div>
              );
            })}
          </div>

          <button type="button" className="a11y-panel__reset" onClick={reset}>
            <RotateCcw size={14} aria-hidden="true" />
            Restaurar padrões
          </button>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;
