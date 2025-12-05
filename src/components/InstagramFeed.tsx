import { Instagram } from 'lucide-react';
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
    'https://www.instagram.com/p/DR4tXupjNKB/',
    'https://www.instagram.com/reel/DR4XLxSEbcW/',
    'https://www.instagram.com/p/DR2xktJEmby/',
    'https://www.instagram.com/reel/DR0qNG1jBj_/',
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
            {instagramPosts.map((postUrl, index) => (
              <div
                key={index}
                className={`transition-all duration-700 delay-${index * 100}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <a
                  href={postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square bg-muted rounded-lg overflow-hidden hover:opacity-90 transition-opacity relative group"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Instagram className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <div className="w-full h-full bg-gradient-to-br from-gradient-start/20 to-gradient-end/20" />
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.instagram.com/gutembergpfonseca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-gradient-primary text-primary font-heading font-semibold rounded-lg hover:opacity-90 transition-opacity"
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
