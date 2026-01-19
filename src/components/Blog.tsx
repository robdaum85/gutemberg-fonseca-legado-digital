import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ExternalLink } from 'lucide-react';

interface BlogPost {
  title: string;
  url: string;
  source: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Ano novo, mesmos golpes: fraudes digitais em alta",
    url: "https://diariodovale.com.br/economia/ano-novo-mesmos-golpes-fraudes-digitais-em-alta/",
    source: "Diário do Vale"
  },
  {
    title: "RJ moderniza defesa do consumidor e inaugura sede totalmente inclusiva",
    url: "https://diariodovale.com.br/economia/rj-moderniza-defesa-do-consumidor-e-inaugura-sede-totalmente-inclusiva/",
    source: "Diário do Vale"
  },
  {
    title: "Até o cafezinho está sendo fraudado",
    url: "https://diariodovale.com.br/colunas/ate-o-cafezinho-esta-sendo-fraudado/",
    source: "Diário do Vale"
  },
  {
    title: "Volta às aulas sem dor no bolso: como economizar no material escolar",
    url: "https://diariodovale.com.br/colunas/volta-as-aulas-sem-dor-no-bolso-como-economizar-no-material-escolar/",
    source: "Diário do Vale"
  },
  {
    title: "Procon interdita empresas que instalavam kits de gás veicular irregularmente",
    url: "https://diariodovale.com.br/destaque/procon-interdita-empresas-que-instalavam-kits-de-gas-veicular-irregularmente/",
    source: "Diário do Vale"
  }
];

const Blog = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="section-container">
        <h2 className="section-title">Blog</h2>
        <p className="text-center text-graphite mb-12 max-w-2xl mx-auto">
          Artigos, colunas e notícias sobre defesa do consumidor
        </p>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {blogPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/30"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {post.source}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors line-clamp-3">
                  {post.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
