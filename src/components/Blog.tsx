import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ExternalLink } from 'lucide-react';

interface BlogPost {
  title: string;
  url: string;
  source: string;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Crédito consignado: atenção aos seus direitos antes de contratar",
    url: "https://diariodorio.com/credito-consignado-atencao-aos-seus-direitos-antes-de-contratar/",
    source: "Diário do Rio",
    image: "https://diariodorio.com/wp-content/uploads/2025/01/credito-consignado.jpg"
  },
  {
    title: "Turismo de verão: hotéis, pousadas e os direitos do hóspede",
    url: "https://diariodorio.com/turismo-de-verao-hoteis-pousadas-e-os-direitos-do-hospede/",
    source: "Diário do Rio",
    image: "https://diariodorio.com/wp-content/uploads/2025/01/turismo-de-verao.jpg"
  },
  {
    title: "Trocas pós-Natal: o que a loja é obrigada a aceitar",
    url: "https://diariodorio.com/trocas-pos-natal-o-que-a-loja-e-obrigada-a-aceitar/",
    source: "Diário do Rio",
    image: "https://diariodorio.com/wp-content/uploads/2024/12/trocas-pos-natal.jpg"
  },
  {
    title: "Prazo de entrega e atrasos: o que fazer quando a compra não chega",
    url: "https://diariodorio.com/prazo-de-entrega-e-atrasos-o-que-fazer-quando-a-compra-nao-chega/",
    source: "Diário do Rio",
    image: "https://diariodorio.com/wp-content/uploads/2024/12/prazo-de-entrega.jpg"
  },
  {
    title: "Compras online e golpes no PIX: como comprar com segurança e evitar prejuízos",
    url: "https://diariodorio.com/compras-online-e-golpes-no-pix-como-comprar-com-seguranca-e-evitar-prejuizos/",
    source: "Diário do Rio",
    image: "https://diariodorio.com/wp-content/uploads/2024/12/compras-online-pix.jpg"
  },
  {
    title: "Os direitos básicos do consumidor que todo cidadão precisa conhecer",
    url: "https://diariodorio.com/os-direitos-basicos-do-consumidor-que-todo-cidadao-precisa-conhecer/",
    source: "Diário do Rio",
    image: "https://diariodorio.com/wp-content/uploads/2024/12/direitos-consumidor.jpg"
  },
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
              {post.image && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
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
