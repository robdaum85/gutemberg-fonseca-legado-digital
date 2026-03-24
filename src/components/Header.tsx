
import { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { TikTokIcon, ThreadsIcon } from '@/components/SocialIcons';

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
    { name: 'Carreira', href: '#carreira' },
    { name: 'Números', href: '#numeros' },
    { name: 'Blog', href: '#blog' },
    { name: 'Podcast', href: '#podcast' },
    { name: 'Instagram', href: '#instagram' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/gutembergpfonseca/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/gutembergfonseca/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/gutembergpfonseca', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/gutopfonseca', label: 'Twitter' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@gutembergpfonseca_?_r=1&_t=ZS-94xYYr9aX4x', label: 'TikTok' },
    { icon: ThreadsIcon, href: '#', label: 'Threads' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img 
            src="/lovable-uploads/c003fb8b-1544-42bc-881b-af1b83f1ac15.png" 
            alt="Gutemberg Fonseca Logo" 
            className="h-12 md:h-16"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href} 
              className="px-3 py-2 text-white hover:bg-gradient-primary hover:bg-clip-text hover:text-transparent transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Social Media Icons */}
        <div className="hidden md:flex items-center space-x-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-white hover:bg-gradient-primary hover:bg-white/10 transition-all"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white transition-colors"
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
            <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-100">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:bg-gradient-primary hover:bg-clip-text hover:text-transparent transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
