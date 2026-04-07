import { useParams } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Helmet } from "react-helmet-async";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <div>Post não encontrado</div>;

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />

        {/* Open Graph */}
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
      </Helmet>

      <article className="max-w-3xl mx-auto p-6">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
};

export default BlogPostPage;