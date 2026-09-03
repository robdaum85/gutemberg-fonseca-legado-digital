import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButtons, { MobileFixedShare } from '@/components/ShareButtons';
import {
  getPostBySlug,
  getCategorySlug,
  getCanonicalUrl,
  getPostCitations,
  SITE_URL,
} from '@/lib/blogUtils';
import { sanitizeHtml } from '@/lib/security';
import { useSeo } from '@/lib/useSeo';

type CategoryPostPageProps = {
  categoryLabel?: string;
  categorySlug?: string;
};

const CategoryPostPage = ({
  categoryLabel = 'Defesa do Consumidor',
  categorySlug = 'direitos-do-consumidor',
}: CategoryPostPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const isLocalPreview =
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).get('preview') === '1';
  const matchedPost = slug ? getPostBySlug(slug, isLocalPreview) : undefined;
  const validPost = matchedPost && getCategorySlug(matchedPost.category) === categorySlug ? matchedPost : undefined;
  const categoryUrl = getCanonicalUrl(`/${categorySlug}`);
  const canonical = validPost
    ? getCanonicalUrl(`/${categorySlug}/${validPost.slug}`)
    : categoryUrl;

  useSeo(validPost
    ? {
        title: validPost.metaTitle,
        headline: validPost.title,
        description: validPost.metaDescription,
        canonical,
        type: 'article',
        image: validPost.coverImage || validPost.authorImage,
        publishedTime: validPost.date,
        modifiedTime: validPost.updatedAt ?? validPost.date,
        author: validPost.author,
        articleSection: categoryLabel,
        keywords: validPost.tags,
        citations: getPostCitations(validPost),
        articleSchema: true,
        breadcrumbs: [
          { name: 'Início', url: SITE_URL + '/' },
          { name: categoryLabel, url: categoryUrl },
          { name: validPost.title, url: canonical },
        ],
      }
    : {
        title: 'Conteúdo não encontrado | Gutemberg Fonseca',
        description: 'O conteúdo solicitado não foi encontrado.',
        canonical: categoryUrl,
        noindex: true,
      });

  // If post does not exist or doesn't belong to this category, send back to hub
  if (!validPost) {
    return <Navigate to={`/${categorySlug}`} replace />;
  }
  const post = validPost;

  const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="conteudo-principal" tabIndex={-1} className="flex-1 pt-24 pb-16">
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
                <Link to={`/${categorySlug}`} className="hover:text-primary">
                  {categoryLabel}
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
                <time dateTime={post.date} className="text-xs text-muted-foreground">
                  {formattedDate}
                </time>
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
                  <Link rel="author" to="/institucional" className="font-semibold text-sm text-foreground hover:text-primary">
                    {post.author}
                  </Link>
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
                alt={post.coverImageAlt || post.title}
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
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />

            {/* CTA */}
            <div className="mt-10 p-5 bg-muted rounded-lg border">
              <p className="font-semibold text-foreground mb-3">
                Precisa de ajuda? Procure os canais oficiais:
              </p>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li>📱 <strong>Fala Consumidor (WhatsApp):</strong> (21) 99336-4848</li>
                <li>📞 <strong>Disque 151</strong> – PROCON-RJ</li>
                <li>💬 <strong>Zap do Guto:</strong> +55 21 92011-2255</li>
                <li>📷 <strong>Instagram:</strong> @gutembergpfonseca</li>
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
              to={`/${categorySlug}`}
              className="text-primary hover:underline font-medium"
            >
              ← Voltar para {categoryLabel}
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
