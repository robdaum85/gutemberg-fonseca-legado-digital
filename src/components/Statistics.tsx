
import { useIntersectionObserver, useCountAnimation } from '@/hooks/useIntersectionObserver';
import { useState, useEffect, useRef } from 'react';

const Statistics = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  const stats = [
    {
      number: 100,
      unit: "toneladas",
      description: "de produtos impróprios apreendidos em fiscalização"
    },
    {
      number: 137,
      unit: "mil",
      description: "atendimentos realizados em todo o Estado"
    },
    {
      number: 344,
      unit: "",
      description: "denúncias em maio recebidas e resolvidas"
    },
    {
      number: 42,
      unit: "",
      description: "operações de fiscalização realizadas"
    }
  ];
  
  return (
    <section id="numeros" className="py-20 bg-gray-50">
      <div className="section-container">
        <h2 className="section-title">Estatísticas & Impacto</h2>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {stats.map((stat, index) => {
            const statRef = useRef<HTMLDivElement>(null);
            const count = useCountAnimation(statRef, stat.number, 2000, isVisible);

            return (
              <div 
                key={index} 
                ref={statRef}
                className={`bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex justify-center items-baseline">
                  <span className="text-5xl font-bold text-primary">{isVisible ? count : 0}</span>
                  {stat.unit && <span className="text-2xl text-primary ml-1">{stat.unit}</span>}
                </div>
                <p className="text-graphite mt-2">{stat.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '200ms' }}>
            <h3 className="text-xl font-bold text-primary mb-4">Tipos de Ocorrência</h3>
            <div className="space-y-4">
              {[
                { label: "Reclamações sobre produtos e serviços", value: 45 },
                { label: "Práticas abusivas", value: 28 },
                { label: "Publicidade enganosa", value: 15 },
                { label: "Outros", value: 12 }
              ].map((item, i) => (
                <div key={i} className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-primary">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-primary">
                        {item.value}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div style={{ width: `${item.value}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '400ms' }}>
            <h3 className="text-xl font-bold text-primary mb-4">Setores Fiscalizados</h3>
            <div className="space-y-4">
              {[
                { label: "Comércio eletrônico", value: 32 },
                { label: "Supermercados", value: 26 },
                { label: "Eventos e entretenimento", value: 18 },
                { label: "Telefonia", value: 14 },
                { label: "Outros", value: 10 }
              ].map((item, i) => (
                <div key={i} className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-primary">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-primary">
                        {item.value}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div style={{ width: `${item.value}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
