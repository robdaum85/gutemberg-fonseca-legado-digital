
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';

const About = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  const values = [
    {
      title: "Fiscalização",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "Ações efetivas para garantir o cumprimento da lei e proteger o consumidor."
    },
    {
      title: "Educação",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: "Conscientização e informação para consumidores e fornecedores sobre seus direitos e deveres."
    },
    {
      title: "Parcerias",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Colaborações estratégicas para ampliar o alcance e efetividade das ações de proteção ao consumidor."
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title">Sobre a SEDCON</h2>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>} 
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-lg text-center max-w-3xl mx-auto mb-14">
            A Secretaria de Estado de Defesa do Consumidor (SEDCON) é a primeira e única secretaria estadual 
            dedicada exclusivamente à defesa do consumidor no Rio de Janeiro. Criada em outubro de 2023, 
            sob liderança de Gutemberg Fonseca, a SEDCON tem revolucionado as relações de consumo no estado, 
            priorizando a proteção dos direitos do consumidor através de fiscalização intensiva, educação e parcerias estratégicas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className={`bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {value.icon}
                <h3 className="text-xl font-bold text-primary mb-2">{value.title}</h3>
                <p className="text-graphite">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
