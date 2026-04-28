import { useEffect } from 'react';

export interface SeoBreadcrumbItem {
  name: string;
  url: string;
}

export interface SeoOptions {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string; // ISO date for articles
  author?: string;
  articleSchema?: boolean;
  breadcrumbs?: SeoBreadcrumbItem[];
  /**
   * Optional extra JSON-LD object to inject (e.g. CollectionPage / ItemList).
   */
  extraJsonLd?: Record<string, unknown>;
}

function setMeta(
  selector: string,
  attr: 'name' | 'property',
  key: string,
  content: string
): { el: HTMLMetaElement; created: boolean; prev: string | null } {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  let created = false;
  let prev: string | null = null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
    created = true;
  } else {
    prev = el.getAttribute('content');
  }
  el.setAttribute('content', content);
  return { el, created, prev };
}

function setLink(
  rel: string,
  href: string
): { el: HTMLLinkElement; created: boolean; prev: string | null } {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  let created = false;
  let prev: string | null = null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
    created = true;
  } else {
    prev = el.getAttribute('href');
  }
  el.setAttribute('href', href);
  return { el, created, prev };
}

export function useSeo(opts: SeoOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = opts.title;

    const restorers: Array<() => void> = [];

    const desc = setMeta(
      'meta[name="description"]',
      'name',
      'description',
      opts.description
    );
    restorers.push(() => {
      if (desc.created) desc.el.remove();
      else if (desc.prev !== null) desc.el.setAttribute('content', desc.prev);
    });

    const canonical = setLink('canonical', opts.canonical);
    restorers.push(() => {
      if (canonical.created) canonical.el.remove();
      else if (canonical.prev !== null)
        canonical.el.setAttribute('href', canonical.prev);
    });

    // Open Graph
    const ogPairs: Array<[string, string]> = [
      ['og:title', opts.title],
      ['og:description', opts.description],
      ['og:url', opts.canonical],
      ['og:type', opts.type ?? 'website'],
    ];
    if (opts.image) ogPairs.push(['og:image', opts.image]);
    if (opts.type === 'article' && opts.publishedTime) {
      ogPairs.push(['article:published_time', opts.publishedTime]);
    }
    if (opts.type === 'article' && opts.author) {
      ogPairs.push(['article:author', opts.author]);
    }

    for (const [key, val] of ogPairs) {
      const m = setMeta(
        `meta[property="${key}"]`,
        'property',
        key,
        val
      );
      restorers.push(() => {
        if (m.created) m.el.remove();
        else if (m.prev !== null) m.el.setAttribute('content', m.prev);
      });
    }

    // JSON-LD: Article
    const scripts: HTMLScriptElement[] = [];
    if (opts.articleSchema) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo', 'article');
      s.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: opts.title,
        description: opts.description,
        image: opts.image,
        datePublished: opts.publishedTime,
        author: opts.author
          ? { '@type': 'Person', name: opts.author }
          : undefined,
        mainEntityOfPage: opts.canonical,
        url: opts.canonical,
      });
      document.head.appendChild(s);
      scripts.push(s);
    }

    if (opts.breadcrumbs && opts.breadcrumbs.length > 0) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo', 'breadcrumbs');
      s.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: opts.breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.url,
        })),
      });
      document.head.appendChild(s);
      scripts.push(s);
    }

    if (opts.extraJsonLd) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo', 'extra');
      s.textContent = JSON.stringify(opts.extraJsonLd);
      document.head.appendChild(s);
      scripts.push(s);
    }

    return () => {
      document.title = prevTitle;
      restorers.forEach((r) => r());
      scripts.forEach((s) => s.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    opts.title,
    opts.description,
    opts.canonical,
    opts.image,
    opts.type,
    opts.publishedTime,
    opts.author,
    opts.articleSchema,
    JSON.stringify(opts.breadcrumbs ?? []),
    JSON.stringify(opts.extraJsonLd ?? null),
  ]);
}
