
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';

const Timeline = () => {
  const events = [
    {
      date: "Outubro 2023",
      title: "Criação da SEDCON",
      description: "Primeira e única secretaria estadual dedicada exclusivamente à defesa do consumidor no Rio de Janeiro."
    },
    {
      date: "Dezembro 2023",
      title: "Parceria Turiscon",
      description: "Lançamento do programa de proteção ao turista, garantindo segurança nas relações de consumo turísticas."
    },
    {
      date: "Novembro 2023",
      title: "Operação Black Friday",
      description: "Fiscalização intensiva durante a principal semana de promoções do comércio, prevenindo fraudes."
    },
    {
      date: "Fevereiro 2024",
      title: "EDCON-RJ",
      description: "Primeiro Encontro de Defesa do Consumidor do Estado do Rio, reunindo órgãos e especialistas do setor."
    },
    {
      date: "Abril 2024",
      title: "Balcão na Estrada",
      description: "Programa de atendimento itinerante para levar os serviços da SEDCON a municípios distantes da capital."
    },
    {
      date: "Julho 2024",
      title: "Resolução SEDCON nº 16",
      description: "Normativa sobre as relações de consumo nas plataformas de marketplace, regulamentando a atuação no estado."
    }
  ];

  return (
    <section id="legado" className="py-20 bg-gray-50">
      <div className="section-container">
        <h2 className="section-title">Linha do Tempo</h2>
        
        <div className="relative mt-16">
          {/* Timeline central line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
          
          {/* Timeline items */}
          <div className="relative">
            {events.map((event, index) => {
              const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
              const [isVisible, setIsVisible] = useState(false);
              
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
                  className={`relative z-10 mb-16 flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center`}
                >
                  <div 
                    className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'} transition-all duration-1000 ${
                      isVisible 
                        ? 'opacity-100' 
                        : 'opacity-0 transform ' + (isEven ? '-translate-x-20' : 'translate-x-20')
                    }`}
                  >
                    <span className="inline-block text-secondary font-bold mb-2">{event.date}</span>
                    <h3 className="text-xl font-bold text-primary mb-2">{event.title}</h3>
                    <p className="text-graphite">{event.description}</p>
                  </div>
                  
                  {/* Central dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-secondary rounded-full border-4 border-white shadow"></div>
                  
                  <div className="w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
