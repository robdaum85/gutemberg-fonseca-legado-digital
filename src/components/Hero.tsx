
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToCareer = () => {
    document.getElementById('carreira')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/lovable-uploads/5118e141-56bb-4600-b3bb-86aec0a70a56.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up">
          Gutemberg de Paula Fonseca
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          18 anos de gestão pública transformadora
        </p>
        <Button 
          size="lg" 
          className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg py-6 px-8 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
          onClick={scrollToCareer}
        >
          Conheça Minha Trajetória
        </Button>
      </div>
      
      {/* Parallax elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-primary/30 to-transparent"></div>
    </section>
  );
};

export default Hero;
