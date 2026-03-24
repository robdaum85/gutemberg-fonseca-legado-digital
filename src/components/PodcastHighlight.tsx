import { Play, Youtube } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';

const PodcastHighlight = () => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  return (
    <section id="podcast" className="section-container bg-muted/30">
      <div className="container mx-auto px-4 py-16">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-title bg-gradient-primary bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Youtube className="w-8 h-8 text-primary" />
            Podcast em Destaque
          </h2>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Vídeo Completo - 2 colunas */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/XCONLAT8Jc0"
                    title="Entrevista Completa - Gutemberg Fonseca"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Entrevista Completa
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Assista à entrevista completa sobre a atuação da SEDCON e PROCON-RJ
                  </p>
                </div>
              </div>
            </div>

            {/* Corte em Destaque - 1 coluna */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl overflow-hidden shadow-lg relative">
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-primary text-primary-foreground text-xs font-semibold rounded-full">
                    <Play className="w-3 h-3" />
                    Corte em Destaque
                  </span>
                </div>
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/pBf2OqFrQ3E"
                    title="Corte em Destaque - Gutemberg Fonseca"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Trecho em Destaque
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Veja o momento mais marcante da entrevista
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.youtube.com/watch?v=XCONLAT8Jc0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-primary text-primary-foreground font-heading font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              <Youtube className="w-5 h-5" />
              Assistir no YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastHighlight;
