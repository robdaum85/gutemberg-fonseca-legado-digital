import { Instagram, Camera, Film } from 'lucide-react';
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

  const instagramPosts = [
    {
      url: 'https://www.instagram.com/p/DR4tXupjNKB/',
      type: 'post' as const,
      description: 'Maior apreensão da história do RJ',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
    },
    {
      url: 'https://www.instagram.com/reel/DR4XLxSEbcW/',
      type: 'reel' as const,
      description: 'Operação Malha Fina em ação',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
    },
    {
      url: 'https://www.instagram.com/p/DR2xktJEmby/',
      type: 'post' as const,
      description: 'Fiscalização e combate ao crime',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    {
      url: 'https://www.instagram.com/reel/DR0qNG1jBj_/',
      type: 'reel' as const,
      description: 'Bastidores da SEDCON',
      gradient: 'from-emerald-500 via-green-500 to-lime-500',
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {instagramPosts.map((post, index) => (
              <div
                key={index}
                className={`transition-all duration-700`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square rounded-xl overflow-hidden relative group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
                  
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                    {/* Badge */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                      {post.type === 'reel' ? (
                        <>
                          <Film className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">Reel</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">Post</span>
                        </>
                      )}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Instagram className="w-8 h-8" />
                    </div>
                    
                    {/* Description */}
                    <p className="text-center font-heading font-semibold text-sm leading-tight px-2">
                      {post.description}
                    </p>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">Ver no Instagram →</span>
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
