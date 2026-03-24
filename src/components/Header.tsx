
import { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z"/>
  </svg>
);

const ThreadsIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.186 24h-.007C5.461 23.956.057 18.507 0 11.73 0 5.256 5.373 0 11.993 0 18.616 0 24 5.256 24 11.73c0 3.107-1.266 6.074-3.488 8.178-.09.09-.222.092-.312.002a.221.221 0 0 1-.002-.312A10.253 10.253 0 0 0 23.556 11.73C23.556 5.5 18.376.444 11.993.444 5.612.444.444 5.5.444 11.73c.053 6.533 5.227 11.68 11.735 11.826h.007c2.146 0 4.204-.56 6.024-1.635a.222.222 0 0 1 .303.08.222.222 0 0 1-.08.303A12.4 12.4 0 0 1 12.186 24zM8.873 11.07c.009-1.907 1.574-3.456 3.49-3.456h.016c1.924.009 3.49 1.565 3.49 3.472 0 .906-.354 1.758-.997 2.4a3.484 3.484 0 0 1-2.41 1.04h-.099a3.487 3.487 0 0 1-2.493-1.04 3.384 3.384 0 0 1-.997-2.416zm.444 0c0 .787.307 1.527.865 2.087a3.042 3.042 0 0 0 2.173.907h.087a3.04 3.04 0 0 0 2.099-.907 2.942 2.942 0 0 0 .866-2.087c0-1.663-1.364-3.02-3.042-3.028h-.014c-1.671 0-3.032 1.358-3.034 3.028z"/>
  </svg>
);

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
