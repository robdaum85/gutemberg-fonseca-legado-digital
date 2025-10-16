import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, ExternalLink } from 'lucide-react';

const TruthSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  const truthItems = [
    {
      id: "fake1",
      fake: "Gutemberg Fonseca não tem experiência em gestão pública",
      truth: "Com 18 anos de carreira dedicados ao serviço público, Gutemberg Fonseca acumula vasta experiência em cargos estratégicos, incluindo a liderança da SEDCON (Secretaria de Defesa do Consumidor) do Rio de Janeiro.",
      source: "Currículo oficial e registros públicos de nomeações",
      sourceLink: "#carreira"
    },
    {
      id: "fake2",
      fake: "A gestão na SEDCON não trouxe resultados concretos",
      truth: "Durante sua gestão na SEDCON, foram implementadas iniciativas transformadoras como o Balcão do Consumidor, a interdição preventiva do Cristo Redentor para proteção de turistas, e a modernização dos canais de denúncia através do Fala Consumidor.",
      source: "Relatórios oficiais da SEDCON 2023-2024",
      sourceLink: "#conquistas"
    },
    {
      id: "fake3",
      fake: "Não há propostas claras para o futuro",
      truth: "Gutemberg Fonseca apresenta um plano estruturado focado em proteção ao consumidor, fiscalização eficiente, ampliação de serviços públicos e modernização da gestão através de tecnologia e transparência.",
      source: "Plano de governo e declarações oficiais",
      sourceLink: "#sobre"
    }
  ];

  return (
    <section id="verdade" className="py-20 bg-background">
      <div className="section-container">
        <h2 className="section-title">Conheça a Verdade</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-muted-foreground">
          Desmistificando fake news e esclarecendo fatos sobre a trajetória e realizações de Gutemberg Fonseca
        </p>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {truthItems.map((item, index) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-start gap-4 text-left w-full">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                        <X className="w-5 h-5 text-destructive" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-heading font-semibold text-lg text-destructive group-hover:text-destructive/80 transition-colors">
                        {item.fake}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="border-l-4 border-gradient-start pl-6 ml-4 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-heading font-semibold text-lg bg-gradient-primary bg-clip-text text-transparent mb-2">
                          A Verdade:
                        </p>
                        <p className="text-foreground leading-relaxed">
                          {item.truth}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Fonte:</span>
                        <span>{item.source}</span>
                        {item.sourceLink && (
                          <a 
                            href={item.sourceLink}
                            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors ml-2"
                          >
                            Ver mais
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div 
          className={`mt-12 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desconfie de informações sem fonte. Verifique sempre os fatos e procure dados oficiais. 
            A transparência é fundamental para uma democracia saudável.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TruthSection;