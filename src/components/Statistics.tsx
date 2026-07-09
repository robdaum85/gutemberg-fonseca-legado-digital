import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Banknote,
  Building2,
  Car,
  ClipboardCheck,
  ClipboardList,
  Database,
  DollarSign,
  FileText,
  Fuel,
  Gavel,
  Handshake,
  HeartHandshake,
  MapPin,
  Medal,
  Megaphone,
  Scale,
  SearchCheck,
  Shield,
  ShieldCheck,
  Siren,
  Sparkles,
  Trophy,
  TrendingDown,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCountUp } from '@/hooks/useCountUp';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import resultsData from '@/data/results.json';

type ResultFilter =
  | 'todos'
  | 'segov'
  | 'seguranca'
  | 'esporte'
  | 'seop'
  | 'sedcon'
  | 'relacoes';

type ResultNumber = {
  value: number | null;
  label?: string;
  prefix?: string;
  suffix?: string;
  plus?: boolean;
  decimals?: number;
};

type ResultItem = {
  id: string;
  category: string;
  government: string;
  role: string;
  period: string;
  number: ResultNumber;
  title: string;
  description: string;
  icon: string;
  image?: string;
  details: string;
  project: string;
  source?: string;
  order: number;
  tags: string[];
};

type AreaMapCard = {
  id: ResultFilter;
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  indicators: string[];
  ariaLabel: string;
};

const results = resultsData as ResultItem[];

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Banknote,
  Building2,
  Car,
  ClipboardCheck,
  ClipboardList,
  Database,
  DollarSign,
  FileText,
  Fuel,
  Gavel,
  Handshake,
  HeartHandshake,
  MapPin,
  Medal,
  Megaphone,
  Scale,
  SearchCheck,
  Shield,
  ShieldCheck,
  Siren,
  Sparkles,
  Trophy,
  TrendingDown,
  Users,
};

const filters: { id: ResultFilter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'segov', label: 'SEGOV' },
  { id: 'seguranca', label: 'Segurança' },
  { id: 'esporte', label: 'Esporte' },
  { id: 'seop', label: 'SEOP' },
  { id: 'sedcon', label: 'SEDCON' },
  { id: 'relacoes', label: 'Relações Institucionais' },
];

const timelineMarkers: { id: ResultFilter; label: string }[] = [
  { id: 'segov', label: 'SEGOV' },
  { id: 'seguranca', label: 'Segurança' },
  { id: 'esporte', label: 'Esporte' },
  { id: 'seop', label: 'SEOP' },
  { id: 'sedcon', label: 'SEDCON' },
];

const areaMapCards: AreaMapCard[] = [
  {
    id: 'seguranca',
    icon: ShieldCheck,
    title: 'Segurança Pública',
    description:
      'Gestão de programas estaduais voltados à prevenção da violência, inteligência operacional e fiscalização.',
    badge: 'SEGOV',
    indicators: ['Segurança Presente', 'Lei Seca', 'Rota Segura'],
    ariaLabel: 'Mostrar resultados da área de Segurança Pública',
  },
  {
    id: 'sedcon',
    icon: Scale,
    title: 'Defesa do Consumidor',
    description:
      'Modernização da política estadual de defesa do consumidor, fiscalização e ampliação do atendimento.',
    badge: 'SEDCON',
    indicators: ['PROCON-RJ', 'Mutirão', 'Consumidor Social'],
    ariaLabel: 'Mostrar resultados da área de Defesa do Consumidor',
  },
  {
    id: 'segov',
    icon: Building2,
    title: 'Gestão Pública',
    description:
      'Reestruturação administrativa, redução de custos, inteligência e governança.',
    badge: 'SEGOV',
    indicators: ['Economia', 'Inteligência', 'Modernização'],
    ariaLabel: 'Mostrar resultados da área de Gestão Pública',
  },
  {
    id: 'esporte',
    icon: Medal,
    title: 'Esporte',
    description:
      'Fortalecimento das políticas esportivas e ampliação do acesso ao esporte.',
    badge: 'Secretaria de Esporte',
    indicators: ['Bolsa Atleta', 'Grandes Eventos', 'Caravana'],
    ariaLabel: 'Mostrar resultados da área de Esporte',
  },
  {
    id: 'seop',
    icon: Siren,
    title: 'Ordem Pública',
    description:
      'Coordenação de ações estratégicas durante a pandemia e gestão operacional da cidade.',
    badge: 'SEOP',
    indicators: ['Gabinete de Crise', 'Hospital de Campanha', 'Defesa Civil'],
    ariaLabel: 'Mostrar resultados da área de Ordem Pública',
  },
  {
    id: 'relacoes',
    icon: Handshake,
    title: 'Relações Institucionais',
    description:
      'Articulação entre órgãos públicos para captação de recursos e implementação de políticas estratégicas.',
    badge: 'SEGOV',
    indicators: ['Alerj', 'Maracanã', 'Carnaval'],
    ariaLabel: 'Mostrar resultados da área de Relações Institucionais',
  },
];

const heroIds = [
  'sedcon-consumidores-atendidos',
  'segov-economia-total',
  'seguranca-reducao-roubos',
  'seop-hospital-campanha',
];

const suffixLabels: Record<string, string> = {
  milhoes: 'milhões',
  mil: 'mil',
  toneladas: 'toneladas',
};

function toDisplayText(value: string) {
  return value
    .replaceAll('Gestao', 'Gestão')
    .replaceAll('gestao', 'gestão')
    .replaceAll('Publica', 'Pública')
    .replaceAll('publica', 'pública')
    .replaceAll('Seguranca', 'Segurança')
    .replaceAll('seguranca', 'segurança')
    .replaceAll('Relacoes', 'Relações')
    .replaceAll('relacoes', 'relações')
    .replaceAll('Institucionais', 'Institucionais')
    .replaceAll('Defesa do Consumidor', 'Defesa do Consumidor')
    .replaceAll('Fiscalizacao', 'Fiscalização')
    .replaceAll('fiscalizacao', 'fiscalização')
    .replaceAll('fiscalizatorias', 'fiscalizatórias')
    .replaceAll('Consciencia', 'Consciência')
    .replaceAll('conscientizacao', 'conscientização')
    .replaceAll('Conscientizacao', 'Conscientização')
    .replaceAll('inteligencia', 'inteligência')
    .replaceAll('Inteligencia', 'Inteligência')
    .replaceAll('Reducao', 'Redução')
    .replaceAll('reducao', 'redução')
    .replaceAll('Operacao', 'Operação')
    .replaceAll('operacoes', 'operações')
    .replaceAll('Operacoes', 'Operações')
    .replaceAll('acoes', 'ações')
    .replaceAll('Acoes', 'Ações')
    .replaceAll('estrategicas', 'estratégicas')
    .replaceAll('estrategica', 'estratégica')
    .replaceAll('ampliacao', 'ampliação')
    .replaceAll('Ampliacao', 'Ampliação')
    .replaceAll('Atencao', 'Atenção')
    .replaceAll('atencao', 'atenção')
    .replaceAll('municipios', 'municípios')
    .replaceAll('Municipios', 'Municípios')
    .replaceAll('Conciliações', 'Conciliações')
    .replaceAll('Conciliacoes', 'Conciliações')
    .replaceAll('conciliacao', 'conciliação')
    .replaceAll('Veiculos', 'Veículos')
    .replaceAll('veiculos', 'veículos')
    .replaceAll('Infracoes', 'Infrações')
    .replaceAll('infracoes', 'infrações')
    .replaceAll('Ocorrencias', 'Ocorrências')
    .replaceAll('ocorrencias', 'ocorrências')
    .replaceAll('Patrocinio', 'Patrocínio')
    .replaceAll('patrocinio', 'patrocínio')
    .replaceAll('Articulacao', 'Articulação')
    .replaceAll('articulacao', 'articulação')
    .replaceAll('Economia', 'Economia')
    .replaceAll('operacional', 'operacional')
    .replaceAll('Secretario', 'Secretário')
    .replaceAll('area', 'área')
    .replaceAll('Area', 'Área')
    .replaceAll('periodo', 'período')
    .replaceAll('Periodo', 'Período')
    .replaceAll('praticas', 'práticas')
    .replaceAll('orgaos', 'órgãos')
    .replaceAll('orgaos', 'órgãos')
    .replaceAll('populacao', 'população')
    .replaceAll('solucoes', 'soluções')
    .replaceAll('Resolucao', 'Resolução')
    .replaceAll('dividas', 'dívidas')
    .replaceAll('familias', 'famílias')
    .replaceAll('Mutiroes', 'Mutirões')
    .replaceAll('renegociacao', 'renegociação')
    .replaceAll('relacoes', 'relações')
    .replaceAll('saude', 'saúde')
    .replaceAll('maquina', 'máquina')
    .replaceAll('transito', 'trânsito')
    .replaceAll('prevencao', 'prevenção')
    .replaceAll('politica', 'política')
    .replaceAll('politicas', 'políticas')
    .replaceAll('Avanco', 'Avanço')
    .replaceAll('Integracao', 'Integração')
    .replaceAll('integracao', 'integração')
    .replaceAll('Identificacao', 'Identificação')
    .replaceAll('identificacao', 'identificação')
    .replaceAll('Revisao', 'Revisão')
    .replaceAll('modernizacao', 'modernização')
    .replaceAll('projecao', 'projeção')
    .replaceAll('calendario', 'calendário')
    .replaceAll('atualizacao', 'atualização')
    .replaceAll('Atualizacao', 'Atualização')
    .replaceAll('inclusao', 'inclusão')
    .replaceAll('Inclusao', 'Inclusão')
    .replaceAll('atuacao', 'atuação')
    .replaceAll('coordenacao', 'coordenação')
    .replaceAll('Coordenacao', 'Coordenação')
    .replaceAll('apreensao', 'apreensão')
    .replaceAll('normativa', 'normativa')
    .replaceAll('apreensoes', 'apreensões')
    .replaceAll('Apreensoes', 'Apreensões')
    .replaceAll('improprios', 'impróprios')
    .replaceAll('servicos', 'serviços')
    .replaceAll('Trofeu', 'Troféu')
    .replaceAll('urbanas', 'urbanas')
    .replaceAll('combustivel', 'combustível')
    .replaceAll('Combustivel', 'Combustível')
    .replaceAll('frota', 'frota')
    .replaceAll('publicos', 'públicos')
    .replaceAll('publico', 'público');
}

function formatNumber(number: ResultNumber, currentValue?: number) {
  if (number.value === null) {
    return number.label ?? '';
  }

  const value = currentValue ?? number.value;
  const formatted =
    number.decimals && number.decimals > 0
      ? value.toFixed(number.decimals).replace('.', ',')
      : Math.round(value).toLocaleString('pt-BR');

  const suffix = number.suffix ? suffixLabels[number.suffix] ?? number.suffix : '';

  return `${number.prefix ? `${number.prefix} ` : ''}${formatted}${
    suffix ? ` ${suffix}` : ''
  }${number.plus ? '+' : ''}`;
}

type AnimatedNumberProps = {
  result: ResultItem;
  enabled: boolean;
  className?: string;
};

function AnimatedNumber({ result, enabled, className = '' }: AnimatedNumberProps) {
  const count = useCountUp({
    end: result.number.value ?? 0,
    decimals: result.number.decimals ?? 0,
    duration: 2200,
    enabled: enabled && result.number.value !== null,
  });
  const displayValue =
    enabled && result.number.value !== null ? count : result.number.value ?? undefined;

  return (
    <p
      className={`tabular-nums ${className}`}
      aria-label={`${formatNumber(result.number)} ${toDisplayText(result.title)}`}
    >
      {formatNumber(result.number, displayValue)}
    </p>
  );
}

function useFilteredResults(activeFilter: ResultFilter) {
  return useMemo(() => {
    const ordered = [...results].sort((a, b) => a.order - b.order);
    if (activeFilter === 'todos') return ordered;
    return ordered.filter((result) => result.tags.includes(activeFilter));
  }, [activeFilter]);
}

const Statistics = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.12 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ResultFilter>('todos');
  const [selectedResult, setSelectedResult] = useState<ResultItem | null>(null);

  useEffect(() => {
    if (isIntersecting) setHasAnimated(true);
  }, [isIntersecting]);

  const heroResults = useMemo(
    () => heroIds.map((id) => results.find((result) => result.id === id)).filter(Boolean) as ResultItem[],
    [],
  );
  const visibleResults = useFilteredResults(activeFilter);

  function showAreaResults(filter: ResultFilter) {
    setActiveFilter(filter);
    window.setTimeout(() => {
      const firstResult = document.querySelector<HTMLElement>(
        `[data-result-tags~="${filter}"]`,
      );
      firstResult?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  return (
    <section
      id="numeros"
      className="statistics-premium relative overflow-hidden bg-[#081B3F] py-20 text-white md:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#061833_0%,#0A2350_48%,#071A3D_100%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(25,195,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(184,255,59,.08)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#19C3FF]/10 blur-3xl md:h-[42rem] md:w-[42rem]" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#B8FF3B]/10 blur-3xl md:h-80 md:w-80" />

      <div className="section-container relative max-w-[1440px] !py-0">
        <header className="mx-auto max-w-[840px] text-center">
          <h2 className="font-heading text-3xl font-black leading-tight text-white md:text-5xl">
            Resultados que Transformam
          </h2>
          <div className="mx-auto mt-5 h-1 w-40 rounded-full bg-gradient-to-r from-[#B8FF3B] to-[#19C3FF]" />
          <p className="mx-auto mt-7 text-base leading-8 text-[#BFC9DA] md:text-lg">
            Ao longo de sua trajetória na gestão pública, Gutemberg Fonseca
            liderou projetos que fortaleceram a segurança, ampliaram os direitos
            do consumidor, modernizaram a administração pública, impulsionaram o
            esporte e coordenaram ações estratégicas que impactaram milhões de
            fluminenses.
          </p>
        </header>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:mt-14 xl:grid-cols-4"
        >
          {heroResults.map((result, index) => (
            <button
              key={result.id}
              type="button"
              onClick={() => setSelectedResult(result)}
              className="group rounded-[20px] border border-white/10 bg-white/[0.06] p-5 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#B8FF3B]/70 hover:bg-white/[0.09] sm:p-6 xl:p-7"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AnimatedNumber
                result={result}
                enabled={hasAnimated}
                className="text-3xl font-black leading-none text-white transition-colors duration-300 group-hover:text-[#B8FF3B] sm:text-4xl md:text-5xl"
              />
              <h3 className="mt-4 text-base font-black leading-tight text-white sm:text-lg">
                {toDisplayText(result.title)}
              </h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#B8FF3B] sm:text-sm">
                {toDisplayText(result.government)} • {result.period}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-12 xl:mt-16">
          <div className="mx-auto max-w-[840px] text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#19C3FF]">
              Mapa de Atuação
            </p>
            <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">
              Áreas que conectam os resultados
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#BFC9DA] md:text-base">
              Antes dos indicadores detalhados, veja em quais frentes de gestão
              pública Gutemberg Fonseca construiu entregas ao longo da carreira.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6 xl:gap-4">
            {areaMapCards.map((area, index) => {
              const Icon = area.icon;

              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => showAreaResults(area.id)}
                  aria-label={area.ariaLabel}
                  className="group flex min-h-[12.5rem] flex-col rounded-[20px] border border-[rgba(184,255,59,.12)] bg-[rgba(8,28,68,.72)] p-4 text-left shadow-[0_10px_34px_rgba(0,0,0,.18)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#19C3FF]/50 hover:shadow-[0_18px_46px_rgba(25,195,255,.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3B] sm:min-h-[11.5rem] sm:p-5 xl:min-h-[11.75rem]"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <Icon
                      className="h-6 w-6 shrink-0 text-[#B8FF3B] transition-transform duration-300 group-hover:scale-[1.08] sm:h-7 sm:w-7"
                      aria-hidden="true"
                    />
                    <span className="max-w-[7.25rem] rounded-full bg-[#B8FF3B]/10 px-2 py-1 text-right text-[0.58rem] font-black uppercase leading-3 tracking-[0.1em] text-[#B8FF3B] transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#B8FF3B] group-hover:text-[#081B3F] sm:text-[0.6rem]">
                      {area.badge}
                    </span>
                  </div>
                  <h4 className="mt-4 min-h-[2.25rem] text-sm font-black uppercase leading-tight text-white transition-colors duration-300 group-hover:text-[#B8FF3B] sm:min-h-[2.5rem] sm:text-base xl:text-[0.94rem]">
                    {area.title}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#BFC9DA] xl:line-clamp-2">
                    {area.description}
                  </p>
                  <p className="mt-auto pt-3 text-[0.65rem] font-bold uppercase leading-4 tracking-[0.08em] text-[#19C3FF]">
                    {area.indicators.join(' • ')}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl xl:mt-14">
          <div className="absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-transparent via-[#19C3FF]/45 to-transparent md:block" />
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0">
            {timelineMarkers.map((marker) => {
              const isActive = activeFilter === marker.id;

              return (
                <button
                  key={marker.id}
                  type="button"
                  onClick={() => showAreaResults(marker.id)}
                  className="group relative flex min-w-[5.5rem] snap-start flex-col items-center gap-2 rounded-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3B] md:min-w-0 md:gap-3"
                >
                  <span
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-black transition-all duration-300 md:h-12 md:w-12 ${
                      isActive
                        ? 'border-[#B8FF3B] bg-[#B8FF3B] text-[#081B3F] shadow-[0_0_28px_rgba(184,255,59,.35)]'
                        : 'border-[#19C3FF]/35 bg-[#0A2046] text-[#BFC9DA] group-hover:border-[#B8FF3B] group-hover:text-[#B8FF3B]'
                    }`}
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                  <span
                    className={`text-[0.68rem] font-black uppercase leading-4 tracking-[0.12em] transition-colors md:text-xs md:tracking-[0.16em] ${
                      isActive ? 'text-[#B8FF3B]' : 'text-[#BFC9DA]'
                    }`}
                  >
                    {marker.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center"
          aria-label="Filtrar indicadores por area"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`min-h-11 rounded-full border px-3 py-2.5 text-center text-xs font-bold leading-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081B3F] sm:px-5 sm:text-sm ${
                  isActive
                    ? 'border-[#B8FF3B] bg-[#B8FF3B] text-[#081B3F] shadow-[0_0_28px_rgba(184,255,59,0.22)]'
                    : 'border-white/15 bg-white/5 text-[#DCE6F5] hover:border-[#19C3FF] hover:bg-white/10'
                }`}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div
          id="resultados-detalhados"
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-6"
        >
          {visibleResults.map((result, index) => {
            const Icon = iconMap[result.icon] ?? ShieldCheck;

            return (
              <button
                key={result.id}
                type="button"
                onClick={() => setSelectedResult(result)}
                data-result-tags={result.tags.join(' ')}
                className="statistics-premium-card scroll-mt-24 group flex min-h-[19rem] flex-col rounded-[20px] border border-[rgba(184,255,59,.18)] bg-[rgba(10,32,70,.82)] p-5 text-left shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#B8FF3B] hover:shadow-[0_22px_70px_rgba(0,0,0,.38)] sm:min-h-[21rem] sm:p-7 xl:min-h-[22rem] xl:p-8"
                style={{ transitionDelay: `${Math.min(index, 8) * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B8FF3B]/20 bg-[#081B3F]/80 text-[#B8FF3B] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_26px_rgba(184,255,59,0.32)]">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <span className="max-w-[9rem] text-right text-[0.65rem] font-black uppercase leading-4 tracking-[0.14em] text-[#19C3FF] sm:max-w-none sm:text-xs sm:tracking-[0.16em]">
                    {toDisplayText(result.category)}
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#B8FF3B]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#B8FF3B] transition-colors group-hover:bg-[#B8FF3B] group-hover:text-[#081B3F]">
                    {toDisplayText(result.government)}
                  </span>
                  <span className="rounded-full bg-[#B8FF3B]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#B8FF3B] transition-colors group-hover:bg-[#B8FF3B] group-hover:text-[#081B3F]">
                    {result.period}
                  </span>
                </div>

                <AnimatedNumber
                  result={result}
                  enabled={hasAnimated}
                  className="mt-6 break-words text-3xl font-black leading-none text-white transition-colors duration-300 group-hover:text-[#B8FF3B] sm:mt-7 sm:text-4xl md:text-5xl"
                />
                <h3 className="mt-5 text-lg font-black leading-tight text-white sm:text-xl">
                  {toDisplayText(result.title)}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-6 text-[#BFC9DA] sm:leading-7">
                  {toDisplayText(result.description)}
                </p>
              </button>
            );
          })}
        </div>

        <div className="statistics-premium-highlight mt-14 overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-r from-[#0C2149] via-[#0B2A57] to-[#10345F] p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.24)] md:p-10">
          <p className="mx-auto max-w-4xl text-base leading-8 text-[#EAF1FC] md:text-lg">
            Cada resultado apresentado nesta seção está vinculado a uma fase
            específica da trajetória de Gutemberg Fonseca na administração
            pública, evidenciando sua atuação em diferentes áreas estratégicas
            do Estado do Rio de Janeiro.
          </p>
        </div>
      </div>

      <Dialog open={!!selectedResult} onOpenChange={(open) => !open && setSelectedResult(null)}>
        <DialogContent className="max-h-[90vh] w-[94vw] max-w-3xl overflow-y-auto border border-[#B8FF3B]/20 bg-[#081B3F] p-0 text-white shadow-[0_25px_90px_rgba(0,0,0,.55)]">
          {selectedResult && (
            <div className="relative">
              <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(184,255,59,.18),transparent_35%),linear-gradient(135deg,#0C2149,#081B3F)] p-8 md:p-10">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#B8FF3B]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#B8FF3B]">
                    {toDisplayText(selectedResult.government)}
                  </span>
                  <span className="rounded-full bg-[#B8FF3B]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#B8FF3B]">
                    {selectedResult.period}
                  </span>
                </div>
                <DialogTitle className="mt-6 text-3xl font-black text-white md:text-4xl">
                  {toDisplayText(selectedResult.title)}
                </DialogTitle>
                <DialogDescription className="mt-4 text-base leading-7 text-[#BFC9DA]">
                  {toDisplayText(selectedResult.description)}
                </DialogDescription>
                <p className="mt-6 text-5xl font-black text-[#B8FF3B]">
                  {formatNumber(selectedResult.number)}
                </p>
              </div>

              <div className="grid gap-6 p-8 md:grid-cols-[1fr_1.3fr] md:p-10">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#19C3FF]">
                      Cargo exercido
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white">
                      {toDisplayText(selectedResult.role)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#19C3FF]">
                      Período
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white">
                      {selectedResult.period}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#19C3FF]">
                      Projeto relacionado
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white">
                      {toDisplayText(selectedResult.project)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#19C3FF]">
                    Resultado
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#EAF1FC]">
                    {toDisplayText(selectedResult.details)}
                  </p>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#19C3FF]">
                      Fotos e documentos
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#BFC9DA]">
                      {selectedResult.source
                        ? toDisplayText(selectedResult.source)
                        : 'Documento comprobatório ou galeria podem ser vinculados aqui quando disponíveis.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Statistics;
