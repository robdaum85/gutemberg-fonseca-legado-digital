
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
  ExternalLink,
  Youtube
} from 'lucide-react';
import { newsClipping } from '@/data/newsClipping';
import { TikTokIcon, ThreadsIcon } from '@/components/SocialIcons';

const MultimediaClipping = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  // Dados dos vídeos - atualizados com os novos IDs do YouTube
  const videos = [
    {
      id: "xi2QbV0uDDg",
      title: "Balcão do Consumidor",
      caption: "RJTV 2 (TV Rio Sul) – Janeiro/2026",
    },
    {
      id: "zabK3YJIGFE",
      title: "Cuidado Onde Você Abastece!",
      caption: "RJTV 2 (TV Rio Sul) – Janeiro/2026",
    },
    {
      id: "xDj3UwD3U9g",
      title: "Operação Café Real",
      caption: "Balanço Geral Rio (Record TV) – Agosto/2025",
    },
    {
      id: "94gPo7NtOaI",
      title: "Divida Zero",
      caption: "Participação em mídia",
    },
    {
      id: "L7qtJxk4v9U",
      title: "Laboratório Móvel",
      caption: "Participação em mídia",
    },
    {
      id: "j6hddMF9E6s",
      title: "Golpe do Falso Atendente",
      caption: "Participação em mídia",
    },
  ];

  // Dados do clipping importados de src/data/newsClipping.ts

  // Redes sociais
  const socialMedia = [
    { icon: Instagram, url: "https://www.instagram.com/gutembergpfonseca/", name: "Instagram" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/gutembergfonseca/", name: "LinkedIn" },
    { icon: Facebook, url: "https://www.facebook.com/gutembergpfonseca", name: "Facebook" },
    { icon: Twitter, url: "https://twitter.com/gutopfonseca", name: "Twitter" },
    { icon: TikTokIcon, url: "https://www.tiktok.com/@gutembergpfonseca_?_r=1&_t=ZS-94xYYr9aX4x", name: "TikTok" },
    { icon: ThreadsIcon, url: "https://www.threads.com/@gutembergpfonseca?xmt=AQF0XDiAQ-9DqUfAwkcvQRQ3-spVkHjM2r0URsdLwXFy_ww", name: "Threads" },
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
            
            {/* Botão do Canal */}
            <div className="flex justify-center mt-8">
              <Button
                asChild
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <a 
                  href="https://www.youtube.com/@gutembergpfonseca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Youtube className="h-5 w-5" />
                  Acessar Canal no YouTube
                </a>
              </Button>
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
                            <p className="text-sm text-gray-500">{news.vehicle}</p>
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
                          {news.summary && <p className="text-gray-600">{news.summary}</p>}
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
        </div>
      </div>
    </section>
  );
};

export default MultimediaClipping;
