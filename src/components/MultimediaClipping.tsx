
import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter,
  Share2,
  ExternalLink
} from 'lucide-react';

const MultimediaClipping = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  // Dados dos vídeos
  const videos = [
    {
      id: "UCioLHaDMpWqXGiCqnjtkEAg",
      title: "Entrevista RJTV",
      caption: "Entrevista no RJTV – Maio/2025",
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Ações da SEDCON",
      caption: "TV Rio – Abril/2025",
    },
    {
      id: "9bZkp7q19f0",
      title: "Defesa do Consumidor",
      caption: "Band Rio – Março/2025",
    },
  ];

  // Dados do clipping
  const newsClipping = [
    {
      source: "O Globo",
      date: "15/05/2025",
      title: "SEDCON intensifica fiscalizações em estabelecimentos comerciais",
      summary: "Secretaria aplicou mais de 200 multas em operações de defesa do consumidor.",
      url: "https://oglobo.globo.com",
    },
    {
      source: "Extra",
      date: "10/05/2025",
      title: "Gutemberg Fonseca anuncia novos projetos para 2025",
      summary: "Secretário apresenta plano estratégico para fortalecer direitos do consumidor.",
      url: "https://extra.globo.com",
    },
    {
      source: "G1 Rio",
      date: "05/05/2025",
      title: "SEDCON media conflitos entre consumidores e empresas",
      summary: "Mais de 1.000 casos resolvidos através de mediação no primeiro trimestre.",
      url: "https://g1.globo.com",
    },
  ];

  // Dados dos depoimentos
  const testimonials = [
    {
      quote: "Graças à SEDCON consegui resolver um problema que se arrastava há meses. O atendimento foi rápido e eficiente.",
      author: "Maria da Silva",
      role: "Cidadã carioca"
    },
    {
      quote: "A parceria com a SEDCON tem sido fundamental para melhorarmos nossos processos de atendimento ao cliente.",
      author: "Carlos Santos",
      role: "Empresário"
    },
    {
      quote: "O trabalho do Secretário Gutemberg tem transformado as relações de consumo no Rio de Janeiro.",
      author: "Ana Oliveira",
      role: "Advogada especialista em direito do consumidor"
    },
  ];

  // Redes sociais
  const socialMedia = [
    { icon: Instagram, url: "https://www.instagram.com/gutembergpfonseca/", name: "Instagram" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/gutembergfonseca/", name: "LinkedIn" },
    { icon: Facebook, url: "https://www.facebook.com/gutembergpfonseca", name: "Facebook" },
    { icon: Twitter, url: "https://twitter.com/gutopfonseca", name: "Twitter" },
  ];

  const shareNews = (news: typeof newsClipping[0]) => {
    const text = `${news.title} - ${news.source}`;
    const url = news.url;
    
    if (navigator.share) {
      navigator.share({ title: text, url });
    } else {
      navigator.clipboard.writeText(`${text} - ${url}`);
    }
  };

  const nextNewsSlide = () => {
    setCurrentNewsSlide((prev) => (prev + 1) % newsClipping.length);
  };

  const prevNewsSlide = () => {
    setCurrentNewsSlide((prev) => (prev - 1 + newsClipping.length) % newsClipping.length);
  };

  const nextTestimonialSlide = () => {
    setCurrentTestimonialSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonialSlide = () => {
    setCurrentTestimonialSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="multimedia" 
      className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(/lovable-uploads/5118e141-56bb-4600-b3bb-86aec0a70a56.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      <div className="section-container relative z-10">
        <h2 className="section-title">Vídeos, Notícias & Depoimentos</h2>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`space-y-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Galeria de Vídeos */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-primary text-center">Vídeos Institucionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card 
                  key={video.id} 
                  className={`overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        frameBorder="0"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-primary">{video.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{video.caption}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Clipping de Notícias */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-primary text-center">Clipping de Notícias</h3>
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentNewsSlide * 100}%)` }}
                >
                  {newsClipping.map((news, index) => (
                    <Card key={index} className="min-w-full px-4">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-primary text-lg">{news.source}</h4>
                            <span className="text-sm text-gray-500">{news.date}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => shareNews(news)}
                            className="hover:bg-gray-100"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <a 
                          href={news.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          <h5 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                            {news.title}
                            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h5>
                          <p className="text-gray-600">{news.summary}</p>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={prevNewsSlide}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextNewsSlide}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-primary">Siga nas Redes Sociais</h3>
            <div className="flex justify-center space-x-6">
              {socialMedia.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Depoimentos */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-primary text-center">Depoimentos</h3>
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonialSlide * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="min-w-full px-4">
                      <CardContent className="p-8 text-center">
                        <div className="mb-6">
                          <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                        <p className="text-lg italic text-graphite mb-6">"{testimonial.quote}"</p>
                        <div>
                          <p className="font-semibold text-primary">{testimonial.author}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonialSlide}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonialSlide}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quem é Gutemberg? */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary to-primary/90 text-white overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold mb-6 text-center">Quem é Gutemberg?</h3>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    Gutemberg de Paula Fonseca, 48 anos, casado, pai de dois filhos, carioca de Jacarepaguá 
                    e hoje morador de Vargem Grande. Administrador com pós-graduação em Administração, Negócios 
                    e Marketing; pós-graduado em Ciências Políticas, Poder e Establishment; especialização em 
                    gerenciamento de cidades; e ex-árbitro FIFA.
                  </p>
                  
                  <p>Como gestor público há mais de 18 anos, ocupou cargos estratégicos:</p>
                  
                  <ul className="space-y-2 pl-4">
                    <li>– Diretor de Operações da Secretaria de Trabalho e Renda (2007)</li>
                    <li>– Chefe de Gabinete na Câmara Municipal do Rio (2008)</li>
                    <li>– Secretário de Turismo, Lazer e Esporte de Japeri (2012)</li>
                    <li>– Diretor de Marketing da Secretaria de Turismo do RJ (2013)</li>
                    <li>– Secretário de Governo do Estado (2019)</li>
                    <li>– Secretário de Ordem Pública da capital (2020)</li>
                    <li>– Secretário de Esporte, Lazer e Juventude do Estado (2021)</li>
                    <li>– Desde 2023, Secretário de Estado de Defesa do Consumidor do RJ</li>
                  </ul>
                  
                  <blockquote className="text-center text-xl font-semibold italic mt-8 p-6 bg-white/10 rounded-lg">
                    "Educação e Esporte são Ferramentas Primordiais na Formação do Cidadão de Bem."
                    <cite className="block mt-2 text-base font-normal">— Gutemberg Fonseca</cite>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultimediaClipping;
