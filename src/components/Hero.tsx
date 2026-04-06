import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// 6 imagens do site kngofnnx.com
const backgroundImages = [
  'https://kngofnnx.com/wp-content/uploads/2026/04/img6.jpeg',
  'https://kngofnnx.com/wp-content/uploads/2026/04/img5.jpeg',
  'https://kngofnnx.com/wp-content/uploads/2026/04/img4.jpeg',
  'https://kngofnnx.com/wp-content/uploads/2026/04/img3.jpeg',
  'https://kngofnnx.com/wp-content/uploads/2026/04/img2.jpeg',
  'https://kngofnnx.com/wp-content/uploads/2026/04/img1.jpeg',
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToCareer = () => {
    document.getElementById('carreira')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background image with responsive sizing */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
          Gutemberg Fonseca
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          18 anos de gestão pública transformadora
        </p>
        <Button 
          size="lg" 
          variant="gradient"
          className="font-bold text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
          onClick={scrollToCareer}
        >
          Conheça Minha Trajetória
        </Button>
      </div>
      
      {/* Parallax elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-primary/30 to-transparent"></div>
      
      {/* Indicadores de imagem - responsivos */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
