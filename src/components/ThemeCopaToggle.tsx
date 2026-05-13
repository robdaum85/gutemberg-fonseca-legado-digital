import { useThemeCopa } from '@/contexts/ThemeCopaContext';

const ThemeCopaToggle = () => {
  const { enabled, toggle } = useThemeCopa();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Desativar Modo Copa' : 'Ativar Modo Copa'}
      className="theme-copa-toggle"
    >
      <span className={`theme-copa-toggle__dot ${enabled ? 'is-on' : ''}`} />
      <span className="theme-copa-toggle__label">
        Modo Copa {enabled ? 'ON' : 'OFF'}
      </span>
    </button>
  );
};

export default ThemeCopaToggle;
