import { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { MapPin, Users, Scale, Bus, Building2 } from 'lucide-react';

interface MunicipioData {
  id: string;
  nome: string;
  atendimentos: number;
  acoes: string[];
  coordenadas: { x: number; y: number };
  regiao: string;
}

const municipiosData: MunicipioData[] = [
  { id: 'rio', nome: 'Rio de Janeiro', atendimentos: 150000, acoes: ['Sede Principal', 'Mutirão', 'Fiscalização', 'Expresso'], coordenadas: { x: 45, y: 75 }, regiao: 'Metropolitana' },
  { id: 'niteroi', nome: 'Niterói', atendimentos: 25000, acoes: ['Mutirão', 'Expresso'], coordenadas: { x: 55, y: 72 }, regiao: 'Metropolitana' },
  { id: 'sgoncalo', nome: 'São Gonçalo', atendimentos: 30000, acoes: ['Mutirão', 'Expresso', 'Fiscalização'], coordenadas: { x: 60, y: 68 }, regiao: 'Metropolitana' },
  { id: 'duquecaxias', nome: 'Duque de Caxias', atendimentos: 28000, acoes: ['Mutirão', 'Fiscalização'], coordenadas: { x: 50, y: 65 }, regiao: 'Baixada Fluminense' },
  { id: 'novaiguacu', nome: 'Nova Iguaçu', atendimentos: 22000, acoes: ['Mutirão', 'Expresso'], coordenadas: { x: 40, y: 60 }, regiao: 'Baixada Fluminense' },
  { id: 'campos', nome: 'Campos dos Goytacazes', atendimentos: 18000, acoes: ['Mutirão', 'Fiscalização'], coordenadas: { x: 85, y: 25 }, regiao: 'Norte Fluminense' },
  { id: 'petropolis', nome: 'Petrópolis', atendimentos: 12000, acoes: ['Mutirão'], coordenadas: { x: 55, y: 45 }, regiao: 'Serrana' },
  { id: 'voltaredonda', nome: 'Volta Redonda', atendimentos: 15000, acoes: ['Mutirão', 'Fiscalização'], coordenadas: { x: 20, y: 55 }, regiao: 'Médio Paraíba' },
  { id: 'macae', nome: 'Macaé', atendimentos: 14000, acoes: ['Mutirão', 'Expresso'], coordenadas: { x: 80, y: 40 }, regiao: 'Norte Fluminense' },
  { id: 'cabofrio', nome: 'Cabo Frio', atendimentos: 11000, acoes: ['Mutirão'], coordenadas: { x: 75, y: 55 }, regiao: 'Região dos Lagos' },
  { id: 'angradosreis', nome: 'Angra dos Reis', atendimentos: 8000, acoes: ['Mutirão', 'Fiscalização'], coordenadas: { x: 15, y: 80 }, regiao: 'Costa Verde' },
  { id: 'resende', nome: 'Resende', atendimentos: 9000, acoes: ['Mutirão'], coordenadas: { x: 10, y: 50 }, regiao: 'Médio Paraíba' },
  { id: 'teresopolis', nome: 'Teresópolis', atendimentos: 7500, acoes: ['Mutirão'], coordenadas: { x: 60, y: 40 }, regiao: 'Serrana' },
  { id: 'novafrirburgo', nome: 'Nova Friburgo', atendimentos: 8500, acoes: ['Mutirão', 'Fiscalização'], coordenadas: { x: 65, y: 35 }, regiao: 'Serrana' },
  { id: 'itaborai', nome: 'Itaboraí', atendimentos: 10000, acoes: ['Mutirão', 'Expresso'], coordenadas: { x: 62, y: 60 }, regiao: 'Metropolitana' },
  { id: 'magé', nome: 'Magé', atendimentos: 9500, acoes: ['Mutirão'], coordenadas: { x: 52, y: 55 }, regiao: 'Metropolitana' },
  { id: 'barra_mansa', nome: 'Barra Mansa', atendimentos: 11000, acoes: ['Mutirão', 'Fiscalização'], coordenadas: { x: 18, y: 52 }, regiao: 'Médio Paraíba' },
  { id: 'araruama', nome: 'Araruama', atendimentos: 6500, acoes: ['Mutirão'], coordenadas: { x: 70, y: 58 }, regiao: 'Região dos Lagos' }
];

const regioes = [
  { nome: 'Metropolitana', cor: 'hsl(var(--primary))' },
  { nome: 'Baixada Fluminense', cor: 'hsl(var(--secondary))' },
  { nome: 'Norte Fluminense', cor: 'hsl(210, 70%, 50%)' },
  { nome: 'Serrana', cor: 'hsl(150, 60%, 45%)' },
  { nome: 'Médio Paraíba', cor: 'hsl(280, 60%, 50%)' },
  { nome: 'Região dos Lagos', cor: 'hsl(180, 60%, 45%)' },
  { nome: 'Costa Verde', cor: 'hsl(340, 60%, 50%)' }
];

const getCorRegiao = (regiao: string) => {
  const r = regioes.find(r => r.nome === regiao);
  return r?.cor || 'hsl(var(--primary))';
};

const getIconeAcao = (acao: string) => {
  switch (acao) {
    case 'Sede Principal': return Building2;
    case 'Mutirão': return Users;
    case 'Fiscalização': return Scale;
    case 'Expresso': return Bus;
    default: return MapPin;
  }
};

const InteractiveMap = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [hoveredMunicipio, setHoveredMunicipio] = useState<MunicipioData | null>(null);
  const [selectedMunicipio, setSelectedMunicipio] = useState<MunicipioData | null>(null);

  const totalAtendimentos = municipiosData.reduce((acc, m) => acc + m.atendimentos, 0);

  return (
    <section id="mapa" className="py-20 bg-muted/30">
      <div className="section-container">
        <h2 className="section-title">Atuação em Todo o Estado</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
          A SEDCON e o PROCON-RJ estão presentes em todas as regiões do Estado do Rio de Janeiro, 
          levando atendimento e proteção ao consumidor.
        </p>

        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Mapa Interativo */}
          <div className="lg:col-span-2 bg-card rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="aspect-[16/10] relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl">
              {/* Contorno simplificado do RJ */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Forma estilizada do estado do RJ */}
                <path
                  d="M5,45 Q10,30 25,25 Q40,20 55,22 Q70,18 85,25 Q95,35 90,50 Q85,65 75,70 Q60,78 45,80 Q30,82 20,78 Q10,72 5,60 Q3,50 5,45 Z"
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.5"
                  className="opacity-50"
                />
                
                {/* Pontos dos municípios */}
                {municipiosData.map((municipio) => (
                  <g key={municipio.id}>
                    <circle
                      cx={municipio.coordenadas.x}
                      cy={municipio.coordenadas.y}
                      r={Math.max(2, Math.min(5, municipio.atendimentos / 30000))}
                      fill={getCorRegiao(municipio.regiao)}
                      className="cursor-pointer transition-all duration-300 hover:opacity-80"
                      style={{
                        filter: (hoveredMunicipio?.id === municipio.id || selectedMunicipio?.id === municipio.id) 
                          ? 'drop-shadow(0 0 8px currentColor)' 
                          : 'none',
                        transform: (hoveredMunicipio?.id === municipio.id || selectedMunicipio?.id === municipio.id)
                          ? 'scale(1.3)'
                          : 'scale(1)',
                        transformOrigin: `${municipio.coordenadas.x}px ${municipio.coordenadas.y}px`
                      }}
                      onMouseEnter={() => setHoveredMunicipio(municipio)}
                      onMouseLeave={() => setHoveredMunicipio(null)}
                      onClick={() => setSelectedMunicipio(
                        selectedMunicipio?.id === municipio.id ? null : municipio
                      )}
                    />
                    {/* Pulse animation for Rio de Janeiro */}
                    {municipio.id === 'rio' && (
                      <circle
                        cx={municipio.coordenadas.x}
                        cy={municipio.coordenadas.y}
                        r="6"
                        fill="none"
                        stroke={getCorRegiao(municipio.regiao)}
                        strokeWidth="0.5"
                        className="animate-ping opacity-50"
                      />
                    )}
                  </g>
                ))}
              </svg>

              {/* Tooltip on Hover */}
              {hoveredMunicipio && !selectedMunicipio && (
                <div 
                  className="absolute bg-card shadow-xl rounded-lg p-3 z-10 pointer-events-none border border-border"
                  style={{
                    left: `${hoveredMunicipio.coordenadas.x}%`,
                    top: `${hoveredMunicipio.coordenadas.y}%`,
                    transform: 'translate(-50%, -120%)'
                  }}
                >
                  <p className="font-bold text-primary text-sm">{hoveredMunicipio.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {hoveredMunicipio.atendimentos.toLocaleString('pt-BR')} atendimentos
                  </p>
                </div>
              )}
            </div>

            {/* Legenda de Regiões */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {regioes.map((regiao) => (
                <div key={regiao.nome} className="flex items-center gap-1.5">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: regiao.cor }}
                  />
                  <span className="text-xs text-muted-foreground">{regiao.nome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Painel de Informações */}
          <div className="space-y-4">
            {/* Stats Resumo */}
            <div className="bg-card rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-primary mb-4">Resumo Estadual</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Municípios atendidos</span>
                  <span className="font-bold text-primary">{municipiosData.length}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Total de atendimentos</span>
                  <span className="font-bold text-primary">{totalAtendimentos.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Regiões cobertas</span>
                  <span className="font-bold text-primary">{regioes.length}</span>
                </div>
              </div>
            </div>

            {/* Detalhes do Município Selecionado */}
            <div className="bg-card rounded-xl shadow-lg p-6 min-h-[200px]">
              <h3 className="font-bold text-lg text-primary mb-4">
                {selectedMunicipio ? selectedMunicipio.nome : 'Selecione um município'}
              </h3>
              
              {selectedMunicipio ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Região</p>
                    <p className="font-medium">{selectedMunicipio.regiao}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Atendimentos realizados</p>
                    <p className="font-bold text-2xl text-primary">
                      {selectedMunicipio.atendimentos.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Ações realizadas</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMunicipio.acoes.map((acao) => {
                        const IconeAcao = getIconeAcao(acao);
                        return (
                          <span 
                            key={acao}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            <IconeAcao className="w-3 h-3" />
                            {acao}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Clique em um ponto no mapa para ver os detalhes de atendimento naquele município.
                </p>
              )}
            </div>

            {/* Top 5 Municípios */}
            <div className="bg-card rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-primary mb-4">Maiores Atendimentos</h3>
              <div className="space-y-3">
                {municipiosData
                  .sort((a, b) => b.atendimentos - a.atendimentos)
                  .slice(0, 5)
                  .map((m, index) => (
                    <div 
                      key={m.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                      onClick={() => setSelectedMunicipio(m)}
                    >
                      <span className="w-6 h-6 rounded-full bg-gradient-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{m.nome}</p>
                        <p className="text-xs text-muted-foreground">
                          {m.atendimentos.toLocaleString('pt-BR')} atendimentos
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
