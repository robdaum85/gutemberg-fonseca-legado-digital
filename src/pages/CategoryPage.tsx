import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostsByCategory } from '@/lib/blogUtils';
import { useSeo } from '@/lib/useSeo';
import { SITE_URL, getCanonicalUrl } from '@/lib/blogUtils';
import { STATIC_PAGE_SEO } from '@/lib/siteSeo';

type CategoryPageProps = {
  categoryLabel?: string;
  categorySlug?: string;
};

const CategoryPage = ({
  categoryLabel = 'Defesa do Consumidor',
  categorySlug = 'direitos-do-consumidor',
}: CategoryPageProps) => {
  const isCitizenCategory = categorySlug === 'direitos-do-cidadao';
  const isSecurityCategory = categorySlug === 'seguranca-publica';
  const publicCategoryLabel = isCitizenCategory
    ? 'Direitos do Cidadão'
    : isSecurityCategory
      ? 'Segurança Pública'
      : 'Direitos do Consumidor';
  const pageSeo = STATIC_PAGE_SEO[`/${categorySlug}`] ?? STATIC_PAGE_SEO['/direitos-do-consumidor'];
  const metaTitle = pageSeo.title;
  const metaDescription = pageSeo.description;
  const posts = getPostsByCategory(categoryLabel).sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
  const canonical = getCanonicalUrl(`/${categorySlug}`);

  useSeo({
    title: metaTitle,
    description: metaDescription,
    canonical,
    type: 'website',
    image: pageSeo.image,
    breadcrumbs: [
      { name: 'Início', url: SITE_URL + '/' },
      { name: publicCategoryLabel, url: canonical },
    ],
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: publicCategoryLabel,
      description: metaDescription,
      url: canonical,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/${categorySlug}/${p.slug}`,
          name: p.title,
        })),
      },
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="conteudo-principal" tabIndex={-1} className="flex-1 pt-24 pb-16">
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
              <li className="text-foreground font-medium">{publicCategoryLabel}</li>
            </ol>
          </nav>

          <header className="max-w-3xl mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {publicCategoryLabel}
            </h1>
            {isCitizenCategory ? (
              <>
                <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                  <strong>Informação para conhecer, exercer e defender seus direitos.</strong>
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Nesta página, você encontra orientações práticas sobre acesso à
                  informação, transparência pública, serviços governamentais e
                  participação cidadã.
                </p>
              </>
            ) : isSecurityCategory ? (
              <>
                <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                  <strong>Informação e propostas para proteger quem vive e trabalha no Rio.</strong>
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Reunimos análises sobre segurança pública, proteção das mulheres,
                  transporte, prevenção e políticas públicas com impacto direto na população.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                  <strong>Informação clara para proteger você no dia a dia.</strong>
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
              </>
            )}
          </header>

          <h2 className="text-2xl font-bold text-foreground mb-6">
            Artigos sobre {publicCategoryLabel}
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
                  to={`/${categorySlug}/${post.slug}`}
                  className="group bg-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border hover:border-primary/30 flex flex-col"
                >
                  {post.coverImage && (
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
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
