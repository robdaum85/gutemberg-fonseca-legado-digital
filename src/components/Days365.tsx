
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';

const Days365 = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  const achievements = [
    {
      title: "Lançamento do Balcão do Consumidor",
      description: "Atendimento direto à população, simplificando reclamações e conciliações.",
      icon: "📋"
    },
    {
      title: "Interdição Preventiva do Cristo Redentor",
      description: "Ação que protegeu milhares de turistas, garantindo segurança e prevenção.",
      icon: "🔍"
    },
    {
      title: "Fortalecimento dos Canais de Denúncia",
      description: "Modernização do Fala Consumidor, ampliando acessibilidade para todo o estado.",
      icon: "📱"
    }
  ];

  return (
    <section id="365dias" className="py-20 bg-primary text-white">
      <div className="section-container">
        <h2 className="section-title text-white">365 Dias de Gestão na SEDCON</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 opacity-90">
          Destaque especial aos resultados alcançados em 2023-2024 à frente da Secretaria de Defesa do Consumidor
        </p>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {achievements.map((item, index) => (
            <div 
              key={index}
              className={`bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-white/80">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div 
          className={`mt-12 bg-white/5 p-8 rounded-lg max-w-3xl mx-auto backdrop-blur-sm transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <h3 className="text-2xl font-bold mb-4 text-center">Resultados Concretos</h3>
          <p className="mb-4">
            Em apenas um ano de gestão, a SEDCON sob liderança de Gutemberg Fonseca transformou as relações 
            de consumo no estado do Rio de Janeiro. A secretaria implementou processos inovadores e facilitou 
            o acesso dos consumidores aos seus direitos.
          </p>
          <p>
            Entre as iniciativas, destacam-se a ampliação dos canais de denúncia, fiscalizações estratégicas 
            em diversos setores comerciais e maior presença em municípios do interior, levando proteção ao 
            consumidor para regiões anteriormente desassistidas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Days365;
