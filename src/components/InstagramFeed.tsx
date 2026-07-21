import { Instagram, Camera, ArrowUpRight, CirclePlay } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';

const InstagramFeed = () => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  const featuredPost = {
    url: 'https://www.instagram.com/reel/Da7tQV_xMx4/?igsh=MW0wM2w1aHltNzNnOQ%3D%3D',
    image: '/instagram/Da7tQV_xMx4.jpg',
    title: 'Estacionamento de graça: você é a favor ou contra?',
    description:
      'Entenda a proposta de estacionamento gratuito no Rio de Janeiro, quem poderá ser beneficiado e quais pontos exigem atenção dos consumidores.',
  };

  const instagramPosts = [
    {
      url: 'https://www.instagram.com/p/DawJ2iwmt_B/?igsh=c3Fuc3hhbHRibHV6',
      image: '/instagram/DawJ2iwmt_B.jpg',
      type: 'post' as const,
    },
    {
      url: 'https://www.instagram.com/p/Dax344KkXLX/?igsh=Y3ZpNWZqbTFta281',
      image: '/instagram/Dax344KkXLX.jpg',
      type: 'post' as const,
    },
    {
      url: 'https://www.instagram.com/reel/Dayg82sBNHs/?igsh=MTBhYWU0cTFoNW1rbQ%3D%3D',
      image: '/instagram/Dayg82sBNHs.jpg',
      type: 'reel' as const,
    },
    {
      url: 'https://www.instagram.com/p/DayxovqGh0O/?igsh=YzB4dXo3c2oyd3Zt',
      image: '/instagram/DayxovqGh0O.jpg',
      type: 'post' as const,
    },
  ];

  return (
    <section id="instagram" className="section-container bg-background">
      <div className="container mx-auto px-4 py-16">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-title bg-gradient-primary bg-clip-text text-transparent">
            Instagram
          </h2>
          
          <div className="flex justify-center mb-8">
            <a
              href="https://www.instagram.com/gutembergpfonseca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-heading font-semibold hover:opacity-80 transition-opacity"
            >
              <Instagram className="w-6 h-6" />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                @gutembergpfonseca
              </span>
            </a>
          </div>

          <a
            href={featuredPost.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${featuredPost.title} — assistir no Instagram`}
            className="group mx-auto mb-10 grid max-w-6xl overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl md:grid-cols-[minmax(0,1fr)_320px]"
          >
            <div className="order-2 flex flex-col justify-center p-6 sm:p-8 md:order-1 lg:p-10">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  <CirclePlay className="h-4 w-4" />
                  Reel em destaque
                </span>
                <span className="rounded-full border border-primary/25 bg-background/70 px-3 py-1.5 text-xs font-semibold text-foreground">
                  Tema importante
                </span>
              </div>

              <h3 className="mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
                {featuredPost.title}
              </h3>
              <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {featuredPost.description}
              </p>

              <span className="inline-flex w-fit items-center gap-2 font-semibold text-primary">
                Assistir ao Reel no Instagram
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>

            <div className="relative order-1 min-h-[420px] overflow-hidden bg-black md:order-2 md:min-h-[480px]">
              <img
                src={featuredPost.image}
                alt="Entrada do estacionamento do Shopping Leblon com chamada para entender a nova regra do estacionamento gratuito"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-black/55 text-white shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <CirclePlay className="h-9 w-9" aria-hidden="true" />
                </span>
              </div>
            </div>
          </a>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {instagramPosts.map((post, index) => (
              <div
                key={post.url}
                className={`transition-all duration-700`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square rounded-xl overflow-hidden relative group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Imagem Real */}
                  <img 
                    src={post.image} 
                    alt="Post do Instagram"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 text-white">
                    <Camera className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{post.type === 'reel' ? 'Reel' : 'Post'}</span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">Ver no Instagram -&gt;</span>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.instagram.com/gutembergpfonseca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-gradient-primary text-primary-foreground font-heading font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Ver mais no Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
