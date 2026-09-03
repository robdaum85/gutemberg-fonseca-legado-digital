import { useEffect } from 'react';
import {
  AUTHOR_URL,
  PERSON_ID,
  SITE_NAME,
  absoluteUrl,
  personJsonLd,
  websiteJsonLd,
} from '@/lib/siteSeo';

export interface SeoBreadcrumbItem {
  name: string;
  url: string;
}

export interface SeoOptions {
  title: string;
  headline?: string;
  description: string;
  canonical: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string; // ISO date for articles
  modifiedTime?: string;
  author?: string;
  authorUrl?: string;
  articleSection?: string;
  keywords?: string[];
  citations?: string[];
  articleSchema?: boolean;
  breadcrumbs?: SeoBreadcrumbItem[];
  /**
   * Marca a página como noindex,follow (ex: links individuais não listados).
   */
  noindex?: boolean;
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
  const breadcrumbsKey = JSON.stringify(opts.breadcrumbs ?? []);
  const keywordsKey = JSON.stringify(opts.keywords ?? []);
  const citationsKey = JSON.stringify(opts.citations ?? []);
  const extraJsonLdKey = JSON.stringify(opts.extraJsonLd ?? null);

  useEffect(() => {
    document.head
      .querySelectorAll('script[type="application/ld+json"][data-prerendered-seo]')
      .forEach((script) => script.remove());

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

    const robots = setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      opts.noindex
        ? 'noindex,follow'
        : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    );
    restorers.push(() => {
      if (robots.created) robots.el.remove();
      else if (robots.prev !== null) robots.el.setAttribute('content', robots.prev);
    });

    const absoluteImage = absoluteUrl(opts.image);

    // Open Graph
    const ogPairs: Array<[string, string]> = [
      ['og:title', opts.title],
      ['og:description', opts.description],
      ['og:url', opts.canonical],
      ['og:type', opts.type ?? 'website'],
      ['og:locale', 'pt_BR'],
      ['og:site_name', SITE_NAME],
    ];
    if (absoluteImage) {
      ogPairs.push(['og:image', absoluteImage]);
      ogPairs.push(['og:image:secure_url', absoluteImage]);
      ogPairs.push(['og:image:alt', opts.title]);
    }
    if (opts.type === 'article' && opts.publishedTime) {
      ogPairs.push(['article:published_time', opts.publishedTime]);
    }
    if (opts.type === 'article' && opts.author) {
      ogPairs.push(['article:author', opts.author]);
    }
    if (opts.type === 'article' && opts.modifiedTime) {
      ogPairs.push(['article:modified_time', opts.modifiedTime]);
    }
    if (opts.type === 'article' && opts.articleSection) {
      ogPairs.push(['article:section', opts.articleSection]);
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

    const twitterPairs: Array<[string, string]> = [
      ['twitter:card', absoluteImage ? 'summary_large_image' : 'summary'],
      ['twitter:title', opts.title],
      ['twitter:description', opts.description],
    ];
    if (absoluteImage) {
      twitterPairs.push(['twitter:image', absoluteImage]);
      twitterPairs.push(['twitter:image:alt', opts.title]);
    }
    for (const [key, val] of twitterPairs) {
      const meta = setMeta(`meta[name="${key}"]`, 'name', key, val);
      restorers.push(() => {
        if (meta.created) meta.el.remove();
        else if (meta.prev !== null) meta.el.setAttribute('content', meta.prev);
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
        '@type': 'BlogPosting',
        '@id': `${opts.canonical}#article`,
        headline: opts.headline ?? opts.title,
        description: opts.description,
        image: absoluteImage,
        datePublished: opts.publishedTime,
        dateModified: opts.modifiedTime ?? opts.publishedTime,
        author: opts.author
          ? {
              '@type': 'Person',
              '@id': PERSON_ID,
              name: opts.author,
              url: opts.authorUrl ?? AUTHOR_URL,
            }
          : undefined,
        publisher: { '@id': PERSON_ID },
        mainEntityOfPage: { '@type': 'WebPage', '@id': opts.canonical },
        articleSection: opts.articleSection,
        keywords: opts.keywords,
        about: opts.keywords?.map((name) => ({ '@type': 'Thing', name })),
        citation: opts.citations,
        inLanguage: 'pt-BR',
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

    const entityScript = document.createElement('script');
    entityScript.type = 'application/ld+json';
    entityScript.setAttribute('data-seo', 'entities');
    entityScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [websiteJsonLd(), personJsonLd()],
    });
    document.head.appendChild(entityScript);
    scripts.push(entityScript);

    return () => {
      document.title = prevTitle;
      restorers.forEach((r) => r());
      scripts.forEach((s) => s.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    opts.title,
    opts.headline,
    opts.description,
    opts.canonical,
    opts.image,
    opts.type,
    opts.publishedTime,
    opts.modifiedTime,
    opts.author,
    opts.authorUrl,
    opts.articleSection,
    keywordsKey,
    citationsKey,
    opts.articleSchema,
    opts.noindex,
    breadcrumbsKey,
    extraJsonLdKey,
  ]);
}
