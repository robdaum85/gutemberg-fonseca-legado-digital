import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import ShareButtons, { MobileFixedShare } from './ShareButtons';
import type { BlogPost } from '@/data/blogPosts';
import { getCanonicalUrl, getPostCategoryUrl, SITE_URL } from '@/lib/blogUtils';
import { useSeo } from '@/lib/useSeo';

interface BlogPostModalProps {
  post: BlogPost | null;
  open: boolean;
  onClose: () => void;
}

const BlogPostModal = ({ post, open, onClose }: BlogPostModalProps) => {
  // Canonical URL points to the preferred (category) URL when applicable
  const canonical = post ? getCanonicalUrl(getPostCategoryUrl(post)) : '';
  const postUrl = canonical;

  useSeo(
    post && open
      ? {
          title: post.metaTitle,
          description: post.metaDescription,
          canonical,
          type: 'article',
          image: post.coverImage || post.authorImage,
          publishedTime: post.date,
          author: post.author,
          articleSchema: true,
        }
      : {
          title: document.title,
          description: '',
          canonical: SITE_URL + window.location.pathname,
        }
  );

  if (!post) return null;

  const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent className="max-w-[750px] w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0 border-none">
          <DialogTitle className="sr-only">{post.title}</DialogTitle>
          
          {/* Header */}
          <div className="sticky top-0 bg-background z-10 border-b px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  GF
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {post.source}
                </span>
                <span className="text-xs text-muted-foreground">{formattedDate}</span>
              </div>
            </div>
            <div className="mt-3">
              <ShareButtons title={post.title} url={postUrl} />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full rounded-lg mb-6 object-cover max-h-[400px]"
                loading="lazy"
              />
            )}

            <div
              className="prose prose-sm sm:prose-base max-w-none text-foreground
                prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
                prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-foreground/90 prose-ul:my-4 prose-li:mb-1"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-8 p-5 bg-muted rounded-lg border">
              <p className="font-semibold text-foreground mb-3">Precisa de ajuda? Procure os canais oficiais:</p>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li>📱 <strong>Fala Consumidor (WhatsApp):</strong> (21) 99336-4848</li>
                <li>📞 <strong>Disque 151</strong> – PROCON-RJ</li>
                <li>💬 <strong>Zap do Guto:</strong> (21) 96619-2498</li>
                <li>📷 <strong>Instagram:</strong> @gutembergfonseca</li>
              </ul>
            </div>

            {/* Bottom share */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">Compartilhe este artigo:</p>
              <ShareButtons title={post.title} url={postUrl} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {open && <MobileFixedShare title={post.title} url={postUrl} />}
    </>
  );
};

export default BlogPostModal;
