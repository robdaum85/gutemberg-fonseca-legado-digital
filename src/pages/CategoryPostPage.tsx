import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButtons, { MobileFixedShare } from '@/components/ShareButtons';
import {
  getPostBySlug,
  getCategorySlug,
  getCanonicalUrl,
  SITE_URL,
} from '@/lib/blogUtils';
import { useSeo } from '@/lib/useSeo';

const CATEGORY_LABEL = 'Defesa do Consumidor';
const CATEGORY_SLUG = 'direitos-do-consumidor';

const CategoryPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // If post does not exist or doesn't belong to this category, send back to hub
  if (!post) {
    return <Navigate to="/direitos-do-consumidor" replace />;
  }
  if (getCategorySlug(post.category) !== CATEGORY_SLUG) {
    return <Navigate to="/direitos-do-consumidor" replace />;
  }

  const canonical = getCanonicalUrl(`/${CATEGORY_SLUG}/${post.slug}`);
  const categoryUrl = getCanonicalUrl(`/${CATEGORY_SLUG}`);

  const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  useSeo({
    title: post.metaTitle,
    description: post.metaDescription,
    canonical,
    type: 'article',
    image: post.coverImage || post.authorImage,
    publishedTime: post.date,
    author: post.author,
    articleSchema: true,
    breadcrumbs: [
      { name: 'Início', url: SITE_URL + '/' },
      { name: 'Direitos do Consumidor', url: categoryUrl },
      { name: post.title, url: canonical },
    ],
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="text-sm text-muted-foreground mb-6">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-primary">
                  Início
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link to={`/${CATEGORY_SLUG}`} className="hover:text-primary">
                  Direitos do Consumidor
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-foreground font-medium line-clamp-1">
                {post.title}
              </li>
            </ol>
          </nav>

          <article>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {post.source}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formattedDate}
                </span>
                {post.readingTime && (
                  <span className="text-xs text-muted-foreground">
                    · {post.readingTime}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
                {post.title}
              </h1>
              {post.subTitle && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {post.subTitle}
                </p>
              )}

              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  GF
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {post.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{post.role}</p>
                </div>
              </div>

              <div className="mt-6">
                <ShareButtons title={post.title} url={canonical} />
              </div>
            </header>

            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full rounded-lg mb-8 object-cover max-h-[420px]"
                loading="lazy"
              />
            )}

            <div
              className="prose prose-sm sm:prose-base max-w-none text-foreground
                prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
                prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-foreground/90 prose-ul:my-4 prose-li:mb-1
                prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-10 p-5 bg-muted rounded-lg border">
              <p className="font-semibold text-foreground mb-3">
                Precisa de ajuda? Procure os canais oficiais:
              </p>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li>📱 <strong>Fala Consumidor (WhatsApp):</strong> (21) 99336-4848</li>
                <li>📞 <strong>Disque 151</strong> – PROCON-RJ</li>
                <li>💬 <strong>Zap do Guto:</strong> (21) 96619-2498</li>
                <li>📷 <strong>Instagram:</strong> @gutembergfonseca</li>
              </ul>
            </div>

            {/* Bottom share */}
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Compartilhe este artigo:
              </p>
              <ShareButtons title={post.title} url={canonical} />
            </div>
          </article>

          {/* Back to hub */}
          <div className="mt-10 text-center">
            <Link
              to={`/${CATEGORY_SLUG}`}
              className="text-primary hover:underline font-medium"
            >
              ← Voltar para Direitos do Consumidor
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <MobileFixedShare title={post.title} url={canonical} />
    </div>
  );
};

export default CategoryPostPage;
