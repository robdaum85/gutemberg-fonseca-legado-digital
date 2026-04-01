
import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Button } from '@/components/ui/button';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  const testimonials = [
    {
      content: "A SEDCON trouxe uma nova perspectiva para as relações de consumo no Rio. Consegui resolver uma reclamação que se arrastava há meses em apenas uma semana com a intervenção deles.",
      author: "Maria Silva",
      role: "Consumidora"
    },
    {
      content: "O trabalho de educação para o consumo realizado pela equipe do Gutemberg é exemplar. Empresários e consumidores agora entendem melhor seus direitos e deveres.",
      author: "João Santos",
      role: "Empresário"
    },
    {
      content: "As fiscalizações efetivas da SEDCON têm criado um ambiente de consumo mais justo e transparente no estado. Os resultados são perceptíveis em apenas um ano de atuação.",
      author: "Ana Oliveira",
      role: "Advogada especialista em direito do consumidor"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title">Depoimentos</h2>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>} 
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Testimonials Slider */}
          <div className="relative max-w-4xl mx-auto mb-20">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="min-w-full px-4">
                    <div className="bg-gray-50 p-8 rounded-lg shadow-md relative">
                      <svg className="absolute top-0 left-10 transform -translate-y-1/2 text-primary w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="#4050a1" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-lg text-graphite italic mb-6">{testimonial.content}</p>
                      <div className="flex items-center">
                        <div>
                          <p className="font-semibold text-primary">{testimonial.author}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevSlide} 
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6 bg-white p-2 rounded-full shadow-lg text-primary hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextSlide} 
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-6 bg-white p-2 rounded-full shadow-lg text-primary hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>
          </div>
          
          {/* CTA Banner */}
          <div className="mt-20 bg-primary text-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Quer saber mais sobre nossas ações?</h3>
            <p className="text-lg mb-8">Fale diretamente com o Gutemberg</p>
            <Button 
              size="lg" 
              variant="gradient"
              className="font-bold"
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Agende uma Reunião
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
