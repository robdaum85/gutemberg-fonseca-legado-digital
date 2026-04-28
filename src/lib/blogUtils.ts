import { blogPosts, type BlogPost } from '@/data/blogPosts';

export const SITE_URL = 'https://gutembergfonseca.com.br';

export const CATEGORY_SLUG_MAP: Record<string, string> = {
  'Defesa do Consumidor': 'direitos-do-consumidor',
  'Segurança Pública': 'seguranca-publica',
};

export const CATEGORY_LABEL_MAP: Record<string, string> = Object.entries(
  CATEGORY_SLUG_MAP
).reduce((acc, [label, slug]) => {
  acc[slug] = label;
  return acc;
}, {} as Record<string, string>);

export function getCategorySlug(category: string): string | null {
  return CATEGORY_SLUG_MAP[category] ?? null;
}

export function getCategoryFromSlug(slug: string): string | null {
  return CATEGORY_LABEL_MAP[slug] ?? null;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/**
 * Returns the canonical (preferred) URL path for a post.
 * Posts whose category maps to a hub slug get the category URL as canonical.
 */
export function getPostCategoryUrl(post: BlogPost): string {
  const categorySlug = getCategorySlug(post.category);
  if (categorySlug) {
    return `/${categorySlug}/${post.slug}`;
  }
  return `/blog/${post.slug}`;
}

export function getCanonicalUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}
