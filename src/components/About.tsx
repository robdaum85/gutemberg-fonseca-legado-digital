
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';

const About = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title">Sobre o Secretário</h2>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start mt-12">
          <div 
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`lg:w-2/5 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/424487f0-dee5-4f8e-bdab-8e3e234b08c7.png" 
                alt="Gutemberg Fonseca" 
                className="w-full max-w-sm mx-auto lg:mx-0 rounded-xl shadow-2xl object-cover"
              />
            </div>
          </div>
          
          <div 
            className={`lg:w-3/5 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Gutemberg de Paula Fonseca</h3>
            
            <p className="text-graphite mb-4">
              Gutemberg Fonseca é administrador com MBA em Marketing, pós-graduação em Ciências Políticas 
              e especialização em gerenciamento de cidades. Sua trajetória é marcada por uma série de cargos 
              estratégicos na administração pública do Rio de Janeiro.
            </p>
            
            <p className="text-graphite mb-4">
              Atuou como Diretor de Operações (2007), Chefe de Gabinete na Câmara do Rio (2008), 
              Secretário de Turismo de Japeri (2012), Diretor de Marketing do Turismo Estadual (2013), 
              Secretário de Governo (2019), Secretário de Ordem Pública (2020), Secretário de Esporte e, 
              desde 2023, Secretário de Defesa do Consumidor do Rio.
            </p>
            
            <p className="text-graphite">
              Com 18 anos de experiência em gestão pública, Gutemberg é reconhecido por sua capacidade 
              de transformação e inovação nos setores onde atua, sempre com foco em resultados mensuráveis 
              e impacto positivo para a população fluminense.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
