import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostsByCategory } from '@/lib/blogUtils';
import { useSeo } from '@/lib/useSeo';
import { SITE_URL, getCanonicalUrl } from '@/lib/blogUtils';

const CATEGORY_LABEL = 'Defesa do Consumidor';
const CATEGORY_SLUG = 'direitos-do-consumidor';
const META_TITLE =
  'Direitos do Consumidor: guia prático e atualizado | Gutemberg Fonseca';
const META_DESCRIPTION =
  'Guia de direitos do consumidor com orientações sobre cobranças, contratos, compras online, golpes digitais, serviços essenciais e como reclamar.';

const CategoryPage = () => {
  const posts = getPostsByCategory(CATEGORY_LABEL).sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
  const canonical = getCanonicalUrl(`/${CATEGORY_SLUG}`);

  useSeo({
    title: META_TITLE,
    description: META_DESCRIPTION,
    canonical,
    type: 'website',
    image: `${SITE_URL}/lovable-uploads/c003fb8b-1544-42bc-881b-af1b83f1ac15.png`,
    breadcrumbs: [
      { name: 'Início', url: SITE_URL + '/' },
      { name: 'Direitos do Consumidor', url: canonical },
    ],
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Direitos do Consumidor',
      description: META_DESCRIPTION,
      url: canonical,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/${CATEGORY_SLUG}/${p.slug}`,
          name: p.title,
        })),
      },
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="text-sm text-muted-foreground mb-6">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-primary">
                  Início
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-foreground font-medium">Direitos do Consumidor</li>
            </ol>
          </nav>

          <header className="max-w-3xl mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Direitos do Consumidor
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              <strong>
                Informação clara para proteger você no dia a dia.
              </strong>
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Conhecer os direitos do consumidor é essencial para evitar prejuízos
              em compras, contratos, serviços, bancos, delivery, viagens,
              telefonia, energia, água e no ambiente digital. Nesta página,
              reunimos orientações práticas sobre os principais problemas
              enfrentados pelos consumidores, com explicações simples, exemplos
              reais e caminhos para buscar solução.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Aqui você encontra conteúdos sobre atraso na entrega, cobrança
              indevida, golpes digitais, cartão de crédito, compras online,
              serviços essenciais, contratos, cancelamentos, garantias e formas
              de reclamação junto aos órgãos de defesa do consumidor.
            </p>
          </header>

          <h2 className="text-2xl font-bold text-foreground mb-6">
            Artigos sobre Direitos do Consumidor
          </h2>

          {posts.length === 0 ? (
            <p className="text-muted-foreground">
              Em breve novos artigos serão publicados nesta categoria.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/${CATEGORY_SLUG}/${post.slug}`}
                  className="group bg-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border hover:border-primary/30"
                >
                  <article className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {post.source}
                      </span>
                      <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-3 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
