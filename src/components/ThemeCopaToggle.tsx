import { Volleyball } from 'lucide-react';
import { useThemeCopa } from '@/contexts/ThemeCopaContext';

const ThemeCopaToggle = () => {
  const { enabled, toggle } = useThemeCopa();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Desativar Modo Copa' : 'Ativar Modo Copa'}
      title="Modo Copa"
      className="theme-copa-toggle"
    >
      <Volleyball size={20} aria-hidden="true" />
    </button>
  );
};

export default ThemeCopaToggle;
