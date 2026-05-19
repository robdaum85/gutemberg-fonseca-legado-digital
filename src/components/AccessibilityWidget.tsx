import { Accessibility, RotateCcw } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAccessibilityPrefs, type ColorBlindMode, type FontSize } from '@/hooks/useAccessibilityPrefs';

const AccessibilityWidget = () => {
  const { prefs, update, reset } = useAccessibilityPrefs();

  const fontSizes: { value: FontSize; label: string }[] = [
    { value: 'normal', label: 'A' },
    { value: 'large', label: 'A+' },
    { value: 'xlarge', label: 'A++' },
  ];

  const colorBlindModes: { value: ColorBlindMode; label: string }[] = [
    { value: 'none', label: 'Nenhum' },
    { value: 'protanopia', label: 'Protanopia' },
    { value: 'deuteranopia', label: 'Deuteranopia' },
    { value: 'tritanopia', label: 'Tritanopia' },
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
              values="0.567 0.433 0 0 0
                      0.558 0.442 0 0 0
                      0 0.242 0.758 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="a11y-deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0 0 0
                      0.7 0.3 0 0 0
                      0 0.3 0.7 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="a11y-tritanopia">
            <feColorMatrix
              type="matrix"
              values="0.95 0.05 0 0 0
                      0 0.433 0.567 0 0
                      0 0.475 0.525 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="a11y-toggle"
            aria-label="Abrir opções de acessibilidade"
            title="Acessibilidade"
          >
            <Accessibility size={22} aria-hidden="true" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="top"
          sideOffset={8}
          className="w-80 max-h-[80vh] overflow-y-auto"
          aria-label="Painel de acessibilidade"
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm mb-1">Acessibilidade</h3>
              <p className="text-xs text-muted-foreground">
                Ajustes seguem padrões internacionais (WCAG 2.1).
              </p>
            </div>

            {/* Tamanho da fonte */}
            <div>
              <Label className="text-xs font-semibold mb-2 block">Tamanho da fonte</Label>
              <div className="flex gap-1">
                {fontSizes.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => update('fontSize', s.value)}
                    aria-pressed={prefs.fontSize === s.value}
                    className={`flex-1 py-2 rounded-md border text-sm font-bold transition-colors ${
                      prefs.fontSize === s.value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-accent'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Daltonismo */}
            <div>
              <Label htmlFor="a11y-cb" className="text-xs font-semibold mb-2 block">
                Filtro para daltonismo
              </Label>
              <select
                id="a11y-cb"
                value={prefs.colorBlind}
                onChange={(e) => update('colorBlind', e.target.value as ColorBlindMode)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                {colorBlindModes.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              {[
                { key: 'highContrast', label: 'Alto contraste' },
                { key: 'grayscale', label: 'Escala de cinza' },
                { key: 'underlineLinks', label: 'Sublinhar links' },
                { key: 'reduceMotion', label: 'Reduzir animações' },
                { key: 'readable', label: 'Leitura ampliada' },
                { key: 'bigCursor', label: 'Cursor grande' },
              ].map((t) => (
                <div key={t.key} className="flex items-center justify-between">
                  <Label htmlFor={`a11y-${t.key}`} className="text-sm cursor-pointer">
                    {t.label}
                  </Label>
                  <Switch
                    id={`a11y-${t.key}`}
                    checked={prefs[t.key as keyof typeof prefs] as boolean}
                    onCheckedChange={(v) => update(t.key as never, v as never)}
                  />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              className="w-full gap-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restaurar padrões
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AccessibilityWidget;
