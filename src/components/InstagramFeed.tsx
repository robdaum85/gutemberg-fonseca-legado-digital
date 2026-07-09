import { Instagram, Camera } from 'lucide-react';
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
      url: 'https://www.instagram.com/reel/DajEqnptyVQ/?igsh=MWs2ZDU1dmt5MGYybQ%3D%3D',
      image: '/instagram/DajEqnptyVQ.jpg',
      type: 'reel' as const,
    },
    {
      url: 'https://www.instagram.com/reel/DagyHs_O8G3/?igsh=MTExdHNlMmk1Zm1wbg%3D%3D',
      image: '/instagram/DagyHs_O8G3.jpg',
      type: 'reel' as const,
    },
    {
      url: 'https://www.instagram.com/reel/Dak5ZjZxkDC/?igsh=dndvazJzdDVzbTFj',
      image: '/instagram/Dak5ZjZxkDC.jpg',
      type: 'reel' as const,
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

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
