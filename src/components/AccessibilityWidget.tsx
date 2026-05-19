import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Accessibility, Hand, RotateCcw, X } from 'lucide-react';
import { useAccessibilityPrefs, type ColorBlindMode, type FontSize } from '@/hooks/useAccessibilityPrefs';

const AccessibilityWidget = () => {
  const { prefs, update, reset } = useAccessibilityPrefs();
  const [open, setOpen] = useState(false);
  const [vlibrasEnabled, setVlibrasEnabled] = useState(false);
  const [status, setStatus] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const closePanel = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        closePanel();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [closePanel, open]);

  useEffect(() => {
    if (!vlibrasEnabled || typeof window === 'undefined') return;
    if (document.getElementById('vlibras-plugin-script')) return;

    const script = document.createElement('script');
    script.id = 'vlibras-plugin-script';
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      const VLibras = (window as typeof window & {
        VLibras?: { Widget: new (url: string) => unknown };
      }).VLibras;
      if (VLibras?.Widget) {
        new VLibras.Widget('https://vlibras.gov.br/app');
        setStatus('VLibras ativado.');
      }
    };
    document.body.appendChild(script);
  }, [vlibrasEnabled]);

  const updatePreference = <K extends keyof typeof prefs>(
    key: K,
    value: (typeof prefs)[K],
    label: string
  ) => {
    update(key, value);
    setStatus(`${label} ${value ? 'ativado' : 'desativado'}.`);
  };

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
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
        >
          <div className="a11y-panel__header">
            <h3 id={titleId} className="a11y-panel__title">Acessibilidade</h3>
            <button
              type="button"
              className="a11y-panel__close"
              onClick={closePanel}
              aria-label="Fechar painel"
            >
              <X size={18} />
            </button>
          </div>
          <p id={descriptionId} className="a11y-panel__subtitle">
            Ajustes visuais, navegação por teclado e recurso de Libras.
          </p>
          <div className="sr-only" aria-live="polite">{status}</div>

          <div className="a11y-panel__group">
            <span className="a11y-panel__label">Tamanho da fonte</span>
            <div className="a11y-panel__row">
              {fontSizes.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={`a11y-pill ${prefs.fontSize === s.value ? 'is-active' : ''}`}
                  aria-pressed={prefs.fontSize === s.value}
                  onClick={() => {
                    update('fontSize', s.value);
                    setStatus(`Tamanho da fonte alterado para ${s.label}.`);
                  }}
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
              onChange={(e) => {
                update('colorBlind', e.target.value as ColorBlindMode);
                setStatus(`Filtro para daltonismo alterado para ${e.target.selectedOptions[0].text}.`);
              }}
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
                    onClick={() => updatePreference(t.key, !checked as never, t.label)}
                  >
                    <span className="a11y-switch__thumb" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="a11y-panel__group">
            <span className="a11y-panel__label">Libras</span>
            <button
              type="button"
              className="a11y-panel__reset"
              onClick={() => {
                setVlibrasEnabled(true);
                setStatus('Carregando VLibras.');
              }}
              disabled={vlibrasEnabled}
            >
              <Hand size={14} aria-hidden="true" />
              {vlibrasEnabled ? 'VLibras ativado' : 'Ativar VLibras'}
            </button>
          </div>

          <button
            type="button"
            className="a11y-panel__reset"
            onClick={() => {
              reset();
              setStatus('Preferencias restauradas.');
            }}
          >
            <RotateCcw size={14} aria-hidden="true" />
            Restaurar padrões
          </button>
        </div>
      )}
      {vlibrasEnabled && (
        <div {...{ vw: 'true' }} className="enabled" aria-hidden="true">
          <div {...{ 'vw-access-button': 'true' }} className="active" />
          <div {...{ 'vw-plugin-wrapper': 'true' }}>
            <div className="vw-plugin-top-wrapper" />
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;
