import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Users, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// URL da API do IBGE para os municípios do RJ
const geoUrl =
  "https://servicodados.ibge.gov.br/api/v3/malhas/estados/33?formato=application/vnd.geo+json&intrarregiao=municipio";

// Dados de atendimento por código IBGE do município
const dadosAtendimento: Record<
  string,
  { nome: string; atendimentos: number; acoes: string[]; regiao: string }
> = {
  "3304557": { nome: "Rio de Janeiro", atendimentos: 150000, acoes: ["Sede Principal", "Mutirões", "Operações Especiais"], regiao: "Metropolitana" },
  "3303302": { nome: "Niterói", atendimentos: 28000, acoes: ["Mutirão", "PROCON Expresso"], regiao: "Metropolitana" },
  "3301702": { nome: "Duque de Caxias", atendimentos: 35000, acoes: ["Mutirão", "Fiscalização"], regiao: "Metropolitana" },
  "3304904": { nome: "São Gonçalo", atendimentos: 32000, acoes: ["Mutirão", "Atendimento Itinerante"], regiao: "Metropolitana" },
  "3302403": { nome: "Itaboraí", atendimentos: 12000, acoes: ["Mutirão"], regiao: "Metropolitana" },
  "3302270": { nome: "Guapimirim", atendimentos: 4500, acoes: ["PROCON Expresso"], regiao: "Metropolitana" },
  "3303500": { nome: "Nova Iguaçu", atendimentos: 28000, acoes: ["Mutirão", "Fiscalização"], regiao: "Baixada Fluminense" },
  "3301009": { nome: "Belford Roxo", atendimentos: 18000, acoes: ["Mutirão"], regiao: "Baixada Fluminense" },
  "3305109": { nome: "São João de Meriti", atendimentos: 15000, acoes: ["Atendimento", "Fiscalização"], regiao: "Baixada Fluminense" },
  "3303906": { nome: "Petrópolis", atendimentos: 22000, acoes: ["Mutirão", "Operação Verão"], regiao: "Serrana" },
  "3305703": { nome: "Teresópolis", atendimentos: 12000, acoes: ["Mutirão"], regiao: "Serrana" },
  "3303609": { nome: "Nova Friburgo", atendimentos: 9500, acoes: ["PROCON Expresso"], regiao: "Serrana" },
  "3301405": { nome: "Campos dos Goytacazes", atendimentos: 18000, acoes: ["Mutirão", "Fiscalização"], regiao: "Norte Fluminense" },
  "3302304": { nome: "Itaperuna", atendimentos: 6000, acoes: ["Atendimento Itinerante"], regiao: "Noroeste Fluminense" },
  "3306305": { nome: "Volta Redonda", atendimentos: 14000, acoes: ["Mutirão", "Fiscalização"], regiao: "Médio Paraíba" },
  "3300456": { nome: "Barra Mansa", atendimentos: 9000, acoes: ["Mutirão"], regiao: "Médio Paraíba" },
  "3300100": { nome: "Angra dos Reis", atendimentos: 11000, acoes: ["Operação Verão", "Mutirão"], regiao: "Costa Verde" },
  "3303807": { nome: "Paraty", atendimentos: 5500, acoes: ["Operação Verão"], regiao: "Costa Verde" },
  "3300936": { nome: "Cabo Frio", atendimentos: 16000, acoes: ["Operação Verão", "Mutirão"], regiao: "Região dos Lagos" },
  "3300225": { nome: "Araruama", atendimentos: 8000, acoes: ["Mutirão"], regiao: "Região dos Lagos" },
  "3300704": { nome: "Búzios", atendimentos: 6500, acoes: ["Operação Verão"], regiao: "Região dos Lagos" },
  "3304201": { nome: "Rio das Ostras", atendimentos: 9500, acoes: ["Fiscalização"], regiao: "Região dos Lagos" },
  "3302007": { nome: "Macaé", atendimentos: 14000, acoes: ["Mutirão", "Fiscalização"], regiao: "Norte Fluminense" },
};

// Função para obter cor baseada nos atendimentos
const getColorByAtendimentos = (atendimentos: number): string => {
  if (atendimentos >= 100000) return "hsl(228, 88%, 13%)"; // primary - azul escuro
  if (atendimentos >= 50000) return "hsl(171, 81%, 35%)"; // turquesa escuro
  if (atendimentos >= 25000) return "hsl(171, 81%, 47%)"; // turquesa
  if (atendimentos >= 15000) return "hsl(136, 64%, 50%)"; // verde médio
  if (atendimentos >= 8000) return "hsl(100, 64%, 59%)"; // secondary - verde
  if (atendimentos >= 3000) return "hsl(100, 64%, 70%)"; // verde claro
  return "hsl(100, 40%, 85%)"; // verde muito claro
};

// Totais estaduais
const totais = {
  municipiosAtendidos: Object.keys(dadosAtendimento).length,
  totalAtendimentos: Object.values(dadosAtendimento).reduce((acc, m) => acc + m.atendimentos, 0),
  totalMunicipiosRJ: 92,
};

interface TooltipState {
  x: number;
  y: number;
  content: { nome: string; atendimentos: number; regiao: string } | null;
}

const InteractiveMap = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [position, setPosition] = useState({ coordinates: [-43.2, -22.5] as [number, number], zoom: 1 });
  const [tooltip, setTooltip] = useState<TooltipState>({ x: 0, y: 0, content: null });
  const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [-43.2, -22.5], zoom: 1 });
    setSelectedMunicipio(null);
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  const selectedData = selectedMunicipio ? dadosAtendimento[selectedMunicipio] : null;

  return (
    <section
      id="mapa"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-secondary to-[hsl(171,81%,47%)] bg-clip-text text-transparent">
              Atuação em Todo o Estado
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mapa interativo mostrando a presença da SEDCON nos municípios fluminenses.
            Clique em um município para ver detalhes.
          </p>
        </div>

        {/* Main Content */}
        <div
          className={`grid lg:grid-cols-[1fr_320px] gap-6 transition-all duration-700 ${
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Map Container */}
          <div className="relative bg-card rounded-2xl border shadow-lg overflow-hidden">
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-card/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">Carregando mapa do IBGE...</p>
                </div>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={handleZoomIn}
                className="h-9 w-9 shadow-md"
                title="Aproximar"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={handleZoomOut}
                className="h-9 w-9 shadow-md"
                title="Afastar"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleReset}
                className="h-9 w-9 shadow-md"
                title="Resetar visualização"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Map */}
            <div className="aspect-[4/3] md:aspect-[16/10]">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 6000,
                  center: [-43.2, -22.5],
                }}
                style={{ width: "100%", height: "100%" }}
              >
                <ZoomableGroup
                  zoom={position.zoom}
                  center={position.coordinates}
                  onMoveEnd={handleMoveEnd}
                  minZoom={1}
                  maxZoom={4}
                >
                  <Geographies
                    geography={geoUrl}
                  >
                    {({ geographies }) => {
                      if (isLoading && geographies.length > 0) {
                        setIsLoading(false);
                      }
                      return (
                        <>
                          {geographies.map((geo) => {
                            const codarea = geo.properties?.codarea;
                            const dados = codarea ? dadosAtendimento[codarea] : null;
                            const isSelected = selectedMunicipio === codarea;

                            return (
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={
                                  isSelected
                                    ? "hsl(171, 81%, 47%)"
                                    : dados
                                    ? getColorByAtendimentos(dados.atendimentos)
                                    : "hsl(220, 10%, 85%)"
                                }
                                stroke="hsl(0, 0%, 100%)"
                                strokeWidth={0.5}
                                style={{
                                  default: {
                                    outline: "none",
                                    transition: "fill 0.2s ease",
                                  },
                                  hover: {
                                    fill: dados ? "hsl(171, 81%, 55%)" : "hsl(220, 10%, 75%)",
                                    outline: "none",
                                    cursor: dados ? "pointer" : "default",
                                  },
                                  pressed: {
                                    fill: "hsl(100, 64%, 59%)",
                                    outline: "none",
                                  },
                                }}
                                onMouseEnter={(evt) => {
                                  if (dados) {
                                    const { clientX, clientY } = evt;
                                    setTooltip({
                                      x: clientX,
                                      y: clientY,
                                      content: dados,
                                    });
                                  }
                                }}
                                onMouseLeave={() => {
                                  setTooltip({ x: 0, y: 0, content: null });
                                }}
                                onClick={() => {
                                  if (codarea && dados) {
                                    setSelectedMunicipio(
                                      selectedMunicipio === codarea ? null : codarea
                                    );
                                  }
                                }}
                              />
                            );
                          })}
                        </>
                      );
                    }}
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur px-2 py-1 rounded">
                <span className="w-3 h-3 rounded-sm" style={{ background: "hsl(228, 88%, 13%)" }} />
                <span>100k+</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur px-2 py-1 rounded">
                <span className="w-3 h-3 rounded-sm" style={{ background: "hsl(171, 81%, 47%)" }} />
                <span>25k+</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur px-2 py-1 rounded">
                <span className="w-3 h-3 rounded-sm" style={{ background: "hsl(100, 64%, 59%)" }} />
                <span>8k+</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur px-2 py-1 rounded">
                <span className="w-3 h-3 rounded-sm" style={{ background: "hsl(100, 64%, 70%)" }} />
                <span>3k+</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur px-2 py-1 rounded">
                <span className="w-3 h-3 rounded-sm" style={{ background: "hsl(220, 10%, 85%)" }} />
                <span>Sem dados</span>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Stats Summary */}
            <div className="bg-card rounded-xl border p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-secondary" />
                Resumo Estadual
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Municípios atendidos</span>
                  <span className="font-bold text-lg">
                    {totais.municipiosAtendidos}
                    <span className="text-muted-foreground text-sm font-normal">
                      /{totais.totalMunicipiosRJ}
                    </span>
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-[hsl(171,81%,47%)] rounded-full transition-all duration-1000"
                    style={{
                      width: isIntersecting
                        ? `${(totais.municipiosAtendidos / totais.totalMunicipiosRJ) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-muted-foreground text-sm">Total de atendimentos</span>
                  <span className="font-bold text-lg text-secondary">
                    {totais.totalAtendimentos.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Municipality */}
            <div className="bg-card rounded-xl border p-5 shadow-sm min-h-[200px]">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                {selectedData ? selectedData.nome : "Selecione um município"}
              </h3>
              {selectedData ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Região</p>
                    <p className="font-medium">{selectedData.regiao}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Atendimentos</p>
                    <p className="font-bold text-2xl text-secondary">
                      {selectedData.atendimentos.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Ações realizadas</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedData.acoes.map((acao, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                        >
                          {acao}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Clique em um município colorido no mapa para ver informações detalhadas sobre os
                  atendimentos realizados.
                </p>
              )}
            </div>

            {/* Top Municipalities */}
            <div className="bg-card rounded-xl border p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Top 5 Municípios
              </h3>
              <div className="space-y-3">
                {Object.entries(dadosAtendimento)
                  .sort((a, b) => b[1].atendimentos - a[1].atendimentos)
                  .slice(0, 5)
                  .map(([codigo, dados], index) => (
                    <div
                      key={codigo}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                        selectedMunicipio === codigo
                          ? "bg-secondary/20"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedMunicipio(codigo)}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0
                              ? "bg-yellow-500 text-yellow-950"
                              : index === 1
                              ? "bg-gray-300 text-gray-700"
                              : index === 2
                              ? "bg-amber-600 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="font-medium text-sm">{dados.nome}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {(dados.atendimentos / 1000).toFixed(0)}k
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.content && (
        <div
          className="fixed z-50 pointer-events-none bg-popover text-popover-foreground border rounded-lg shadow-lg px-3 py-2 text-sm"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            transform: "translateY(-100%)",
          }}
        >
          <p className="font-semibold">{tooltip.content.nome}</p>
          <p className="text-muted-foreground text-xs">{tooltip.content.regiao}</p>
          <p className="text-secondary font-bold">
            {tooltip.content.atendimentos.toLocaleString("pt-BR")} atendimentos
          </p>
        </div>
      )}
    </section>
  );
};

export default InteractiveMap;
