
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

  // Dados do clipping - atualizados com os novos clippings reais
  const newsClipping = [
    {
      date: "24/06/2025",
      source: "Jornal BandNews Rio",
      vehicle: "Rádio BandNews",
      title: "Procon-RJ multa empresa do Jaé em até R$ 10 milhões por falhas no atendimento",
      summary: "Secretaria de Defesa do Consumidor aplicou multa significativa por irregularidades no atendimento.",
      url: "https://imagens.empauta.com/audio/eJwFwUsOgyAQANAriZ8D0FC0i5kW0hnD7CwmaoINiQsNp--2BfNdqP--2BjnM6nWZkjxoTNzjGE5odJEpWjy4kR--2BcvuNvdrL4xAU5KHeReQ6ob8XeH00--3D.mp3"
    },
    {
      date: "23/06/2025",
      source: "Diário do Povo",
      vehicle: "Portal de Notícias",
      title: "Rio amplia horários de postos do Jaé e inaugura superpostos",
      summary: "Novas medidas para melhorar o atendimento aos usuários do transporte público municipal.",
      url: "https://diario.dopovo.com.br/2025/06/23/rio-amplia-horarios-de-postos-do-jae-e-inaugura-superpostos/"
    },
    {
      date: "23/06/2025",
      source: "O Informativo",
      vehicle: "Portal de Notícias",
      title: "Empresa responsável pelo cartão Jaé intimada por desrespeito aos direitos do consumidor",
      summary: "SEDCON atua para garantir os direitos dos usuários do sistema de transporte público.",
      url: "https://oinformativo.com/cidades/empresa-responsavel-por-emissao-do-cartao-jae-e-intimada-a-prestar-esclarecimentos-por-desrespeito-aos-direitos-do-consumidor"
    },
    {
      date: "23/06/2025",
      source: "Blog do Jader Santos",
      vehicle: "Portal de Notícias",
      title: "Procon-RJ cobra explicações sobre emissão do cartão Jaé no Rio",
      summary: "Secretaria exige esclarecimentos sobre dificuldades enfrentadas pelos consumidores.",
      url: "https://www.blogdojadersantos.com.br/nb2/rj/rio-de-janeiro/noticia/2025/06/20/procon-rj-cobra-explicacoes-emissao-do-cartao-jae-no-rio.ghtml"
    },
    {
      date: "23/06/2025",
      source: "MSN",
      vehicle: "Portal de Notícias",
      title: "Procon-RJ cobra explicações sobre dificuldades na emissão do cartão Jaé no Rio",
      summary: "Ação da SEDCON busca solucionar problemas enfrentados pelos usuários do transporte público.",
      url: "http://www.msn.com/pt-br/noticias/brasil/procon-rj-cobra-explica%C3%A7%C3%B5es-sobre-dificuldades-na-emiss%C3%A3o-do-cart%C3%A3o-ja%C3%A9-no-rio/ar-AA1H6Q50?apiversion=v2&noservercache=1&domshim=1&renderwebcomponents=1&wcseo=1&batchservertelemetry=1&noservertelemetry=1"
    }
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
                            <p className="text-sm text-gray-500">{news.vehicle}</p>
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
        </div>
      </div>
    </section>
  );
};

export default MultimediaClipping;
