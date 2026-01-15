import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    // Imagens originais
    'https://img.playbook.com/3gmHBQ3nDjvgLt33nyR9Xxf6x_LASkigwMCHzx-L3P0/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2FiYWNkMDE0/LWJlMjctNDgyZi05/N2I2LTdmYzI1NDdm/ZjQ5OA',
    'https://img.playbook.com/ihBOakoOc26ghY6gcu4YHRzq9KD5chqsOA4_ghcMF4w/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzU1ZDc2ZjE4/LWUzMjAtNDUxNy04/ZWNhLWNiMGQzN2E0/MGNjYw',
    'https://img.playbook.com/qRzLFPwsMekYl6AwVA0-H_YOuZSIRoOrCbvaJdauePg/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzlkMjU5Y2Nj/LWE5NDUtNGQyMS1h/NTlhLTAzNjNkMzQ0/MmE5Nw',
    // Novas imagens
    'https://kngofnnx.com/wp-content/uploads/2026/01/IMG_4766.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/IMG_4754.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/IMG_4700-scaled.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/e0c7e76e-b60e-4d59-a90a-2478cef8fe95.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/WhatsApp-Image-2025-09-23-at-17.01.20-1.jpeg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/096c75df-6456-4746-93f7-d94faef6aabf.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/8fc65008-6172-4812-bb66-aea45acac03d.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/5ac6518b-a0b8-44d0-b8e4-0f876b0ef2dc.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/02b56f38-e9b8-45e7-be39-e1030abcace4.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/01d1b5e5-8ebf-49b7-ba21-9dd2c93781be.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/00b15fc3-cd65-4ada-9879-0d438bef1402.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/0621379e-5efb-4107-891b-c68776a8ed2f.jpg',
    'https://kngofnnx.com/wp-content/uploads/2026/01/2b427863-3f7f-45c5-b6d4-ce49a82758e2.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

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
          Gutemberg de Paula Fonseca
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
