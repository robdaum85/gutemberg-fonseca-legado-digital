
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';

const About = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const aboutImages = [
    '/lovable-uploads/424487f0-dee5-4f8e-bdab-8e3e234b08c7.png',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'
  ];
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 4000); // Troca a cada 4 segundos

    return () => clearInterval(interval);
  }, [aboutImages.length]);

  return (
    <section id="sobre" className="py-20 bg-gray-50/60">
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
                src={aboutImages[currentImageIndex]} 
                alt="Gutemberg Fonseca" 
                className="w-full max-w-sm mx-auto lg:mx-0 rounded-xl shadow-2xl object-cover h-80 transition-all duration-500"
              />
              
              {/* Indicadores de imagem */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {aboutImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
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
