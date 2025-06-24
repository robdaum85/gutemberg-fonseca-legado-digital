
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';
import { Settings, Users, MapPin, TrendingUp, Building2, Shield, Trophy, ShieldCheck } from 'lucide-react';

const Career = () => {
  const events = [
    {
      year: "2007",
      title: "Diretor de Operações",
      description: "Secretaria de Trabalho e Renda",
      icon: Settings
    },
    {
      year: "2008",
      title: "Chefe de Gabinete",
      description: "Câmara Municipal do Rio",
      icon: Users
    },
    {
      year: "2012",
      title: "Secretário de Turismo, Lazer e Esporte",
      description: "Prefeitura de Japeri",
      icon: MapPin
    },
    {
      year: "2013",
      title: "Diretor de Marketing",
      description: "Secretaria de Turismo do Estado do RJ",
      icon: TrendingUp
    },
    {
      year: "2019",
      title: "Secretário de Governo",
      description: "Unificação do programa Segurança Presente",
      icon: Building2
    },
    {
      year: "2020",
      title: "Secretário de Ordem Pública",
      description: "Comando do Gabinete de Crise Covid-19",
      icon: Shield
    },
    {
      year: "2021",
      title: "Secretário de Esporte, Lazer e Juventude",
      description: "Retomada do programa Bolsa Atleta",
      icon: Trophy
    },
    {
      year: "2023",
      title: "Secretário de Defesa do Consumidor",
      description: "Lançamento do Balcão, interdição preventiva do Cristo Redentor, fortalecimento do Fala Consumidor",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="carreira" className="py-20 bg-gray-50">
      <div className="section-container">
        <h2 className="section-title">Trajetória Profissional</h2>
        
        <div className="relative mt-16">
          {/* Timeline central line - hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary hidden md:block"></div>
          
          {/* Timeline items */}
          <div className="relative space-y-8 md:space-y-16">
            {events.map((event, index) => {
              const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
              const [isVisible, setIsVisible] = useState(false);
              const IconComponent = event.icon;
              
              useEffect(() => {
                if (isIntersecting) {
                  setIsVisible(true);
                }
              }, [isIntersecting]);
              
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  ref={ref as React.RefObject<HTMLDivElement>}
                  className={`relative z-10 ${
                    // Mobile: simple stacked layout
                    // Desktop: alternating layout
                    'md:flex md:items-center ' + 
                    (isEven ? 'md:flex-row' : 'md:flex-row-reverse')
                  }`}
                >
                  {/* Mobile layout */}
                  <div className="md:hidden">
                    <div 
                      className={`transition-all duration-1000 ${
                        isVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-10'
                      }`}
                    >
                      <div className="bg-white rounded-lg shadow-lg p-6 mx-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                            <IconComponent size={32} className="text-white" />
                          </div>
                          <div>
                            <span className="inline-block text-secondary font-bold text-lg">{event.year}</span>
                            <h3 className="text-xl font-bold text-primary">{event.title}</h3>
                          </div>
                        </div>
                        <p className="text-graphite">{event.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div 
                    className={`hidden md:block md:w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'} transition-all duration-1000 ${
                      isVisible 
                        ? 'opacity-100' 
                        : 'opacity-0 transform ' + (isEven ? '-translate-x-20' : 'translate-x-20')
                    }`}
                  >
                    <div className={`flex items-center gap-4 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-md">
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <div className={isEven ? 'text-right' : 'text-left'}>
                        <span className="inline-block text-secondary font-bold mb-2">{event.year}</span>
                        <h3 className="text-xl font-bold text-primary mb-2">{event.title}</h3>
                        <p className="text-graphite">{event.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Central dot - only on desktop */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-secondary rounded-full border-4 border-white shadow hidden md:block"></div>
                  
                  <div className="hidden md:block md:w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
