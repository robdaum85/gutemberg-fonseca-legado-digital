import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPostModal from '@/components/BlogPostModal';
import { blogPosts } from '@/data/blogPosts';

const BlogPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(slug || null);

  // Open modal from URL on mount
  useEffect(() => {
    if (slug) {
      setSelectedSlug(slug);
    }
  }, [slug]);

  const selectedPost = selectedSlug
    ? blogPosts.find((p) => p.slug === selectedSlug) || null
    : null;

  const handleOpen = (postSlug: string) => {
    setSelectedSlug(postSlug);
    window.history.pushState(null, '', `/blog/${postSlug}`);
  };

  const handleClose = () => {
    setSelectedSlug(null);
    navigate('/blog', { replace: true });
  };

  // Handle popstate (browser back)
  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname;
      if (path.startsWith('/blog/')) {
        const s = path.replace('/blog/', '');
        setSelectedSlug(s);
      } else {
        setSelectedSlug(null);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-center">Blog</h1>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Artigos, colunas e notícias sobre defesa do consumidor por Gutemberg Fonseca
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <button
                key={post.slug}
                onClick={() => handleOpen(post.slug)}
                className="group text-left bg-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border hover:border-primary/30 cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {post.source}
                    </span>
                    <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-3 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      <BlogPostModal
        post={selectedPost}
        open={!!selectedPost}
        onClose={handleClose}
      />
    </div>
  );
};

export default BlogPage;
