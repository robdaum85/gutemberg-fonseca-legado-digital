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

  // Dados dos vídeos - atualizados com os novos IDs do YouTube
  const videos = [
    {
      id: "fC0VS6gZBXw",
      title: "Entrevista RJTV",
      caption: "Entrevista no RJTV – Maio/2025",
    },
    {
      id: "UKt484G9Oe8",
      title: "Ações da SEDCON",
      caption: "TV Rio – Abril/2025",
    },
    {
      id: "mDm-5C9ZNwI",
      title: "Defesa do Consumidor",
      caption: "Band Rio – Março/2025",
    },
  ];

  // Dados do clipping - atualizados com os 13 novos clippings
  const newsClipping = [
    {
      date: "01/04/2025",
      source: "Dia Online",
      vehicle: "Governador/Defesa do Consumidor",
      title: "Comissão formada após morte de turista apresenta relatório de melhorias no Cristo Redentor",
      summary: "Força-tarefa apresenta medidas para aumentar a segurança e qualidade dos serviços no Cristo Redentor.",
      url: "https://odia.ig.com.br/rio-de-janeiro/2025/04/7030667-comissao-formada-apos-morte-de-turista-apresenta-relatorio-de-melhorias-no-cristo-redentor.html"
    },
    {
      date: "01/04/2025",
      source: "Jornal BandNews Rio 2ª Edição",
      vehicle: "BandNews FM",
      title: "Cristo Redentor terá elevador até novembro, segundo Secretaria de Estado de Defesa do Consumidor",
      summary: "Secretaria anuncia prazo para instalação de elevador para garantir acessibilidade no monumento.",
      url: "https://imagens.empauta.com/audio/eJwFwUEKgCAQAMA3WdDdNbMIBcW29CYWpkTQSfD1zWCLs0--2BuUqtBEpF3njOnMdOdhIC1bSJOazLvWJLwVT0olHXEFyjeXogfZRyCPgfo7sPh0rYWuXxihU4LSX--2FcJB9j.mp"
    },
    {
      date: "01/04/2025",
      source: "AM Post",
      vehicle: "Portal de Notícias",
      title: "Comissão do Cristo Redentor tem segunda reunião após morte de turista",
      summary: "Segunda reunião da comissão discute melhorias na segurança e atendimento aos visitantes.",
      url: "https://ampost.com.br/brasil/comissao-do-cristo-redentor-tem-segunda-reuniao-apos-morte-de-turista/"
    },
    {
      date: "01/04/2025",
      source: "Diário do Rio",
      vehicle: "Portal de Notícias",
      title: "Mais de uma tonelada de alimentos impróprios é descartada em mercados do RJ em uma semana",
      summary: "Ação de fiscalização da SEDCON resulta no descarte de grande quantidade de alimentos inadequados para consumo.",
      url: "https://diariodorio.com/mais-de-uma-tonelada-de-alimentos-improprios-e-descartada-em-mercados-do-rj-em-uma-semana/"
    },
    {
      date: "01/04/2025",
      source: "RJ4News",
      vehicle: "Portal de Notícias",
      title: "Mais de uma tonelada de alimentos impróprios para consumo foram descartados em uma semana",
      summary: "Fiscalização intensiva da Defesa do Consumidor garante qualidade dos alimentos comercializados.",
      url: "https://rj4news.com.br/2025/04/01/mais-de-uma-tonelada-de-alimentos-improprios-para-consumo-foram-descartados-em-uma-semana/"
    },
    {
      date: "01/04/2025",
      source: "Diário Carioca",
      vehicle: "Portal de Notícias",
      title: "Mais de uma tonelada de alimentos irregulares são descartados no RJ",
      summary: "Operação da SEDCON retira do mercado alimentos que apresentavam irregularidades sanitárias.",
      url: "https://www.diariocarioca.com/rio-de-janeiro/mais-de-uma-tonelada-de-alimentos-irregulares-sao-descartados-no-rj/"
    },
    {
      date: "01/04/2025",
      source: "Diário Carioca",
      vehicle: "Portal de Notícias",
      title: "Cristo Redentor: Governo do Rio apresenta avanços para garantir segurança e qualidade dos serviços",
      summary: "Relatório apresenta melhorias implementadas para garantir experiência segura aos visitantes.",
      url: "https://www.diariocarioca.com/rio-de-janeiro/cristo-redentor-governo-do-rio-apresenta-avancos-para-garantir-seguranca-e-qualidade-dos-servicos/"
    },
    {
      date: "01/04/2025",
      source: "A Tribuna RJ",
      vehicle: "Portal de Notícias",
      title: "Fiscalização encontra tonelada de alimentos impróprios no Estado",
      summary: "Ação coordenada identifica e remove do mercado produtos alimentícios inadequados.",
      url: "https://www.atribunarj.com.br/materia/fiscalizacao-encontra-tonelada-de-alimentos-improprios-no-estado"
    },
    {
      date: "31/03/2025",
      source: "G1",
      vehicle: "Portal de Notícias",
      title: "Cristo Redentor vai ter elevador para cadeirantes",
      summary: "Medida visa garantir acessibilidade plena ao monumento para pessoas com deficiência.",
      url: "https://g1.globo.com/google/amp/rj/rio-de-janeiro/noticia/2025/03/31/cristo-redentor-vai-ter-elevador-para-cadeirantes.ghtml"
    },
    {
      date: "31/03/2025",
      source: "Agência Brasil",
      vehicle: "Defesa do Consumidor",
      title: "Força-tarefa do Corcovado promete aumentar segurança para visitantes",
      summary: "Iniciativa coordenada busca implementar melhorias na segurança e qualidade do atendimento.",
      url: "https://agenciabrasil.ebc.com.br/geral/noticia/2025-03/forca-tarefa-do-corcovado-promete-aumentar-seguranca-para-visitantes"
    },
    {
      date: "31/03/2025",
      source: "TV Prefeito",
      vehicle: "Defesa do Consumidor",
      title: "Relatório sobre melhorias no Cristo Redentor após morte de turista é apresentado",
      summary: "Documento detalha ações implementadas para prevenir novos incidentes e melhorar a experiência.",
      url: "https://tvprefeito.com/relatorio-sobre-melhorias-no-cristo-redentor-apos-morte-de-turista-e-apresentado/"
    },
    {
      date: "31/03/2025",
      source: "Jornal de Hoje",
      vehicle: "Defesa do Consumidor",
      title: "Força-tarefa do Corcovado promete aumentar segurança para visitantes",
      summary: "Comissão apresenta medidas concretas para garantir segurança e qualidade no atendimento aos turistas.",
      url: "https://jornalhoje.inf.br/wp/geral/forca-tarefa-do-corcovado-promete-aumentar-seguranca-para-visitantes/"
    },
    {
      date: "31/03/2025",
      source: "Diário do Rio",
      vehicle: "Portal de Notícias",
      title: "Cristo Redentor vai ter elevador para cadeirantes até novembro, garante secretário",
      summary: "Secretário confirma prazo para instalação de equipamento que garantirá acessibilidade completa.",
      url: "https://diariodorio.com/cristo-redentor-vai-ter-elevador-para-cadeirantes-ate-novembro-garante-secretario/"
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
