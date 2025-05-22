
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Legado', href: '#legado' },
    { name: 'Programas', href: '#programas' },
    { name: 'Números', href: '#numeros' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="text-primary font-bold text-2xl">
          Gutemberg Fonseca
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href} 
              className="px-3 py-2 text-graphite hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button 
            className="bg-primary hover:bg-primary/90 text-white font-medium"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Fale com o Gutemberg
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-graphite p-2" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col">
            {navLinks.map(link => (
              <a 
                key={link.name}
                href={link.href} 
                className="py-3 border-b border-gray-100 text-graphite"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="mt-4 bg-primary hover:bg-primary/90 text-white font-medium"
              onClick={() => {
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
            >
              Fale com o Gutemberg
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
