import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(projectRoot, "dist");
const publicDir = path.join(projectRoot, "public");
const ssrDir = path.join(projectRoot, ".ssr-temp");
const serverEntry = path.join(ssrDir, "entry-server.js");
const server = await import(`${pathToFileURL(serverEntry).href}?v=${Date.now()}`);

const {
  AUTHOR_URL,
  DEFAULT_SOCIAL_IMAGE,
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  STATIC_PAGE_SEO,
  WEBSITE_ID,
  absoluteUrl,
  getPrerenderPaths,
  personJsonLd,
  publicFrames,
  publicPosts,
  render,
  websiteJsonLd,
} = server;

const baseTemplate = await readFile(path.join(distDir, "index.html"), "utf8");
const buildDate = new Date().toISOString().slice(0, 10);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeXml(value = "") {
  return escapeHtml(value);
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function postForPath(urlPath) {
  return publicPosts.find((post) => urlPath.endsWith(`/${post.slug}`));
}

function frameForPath(urlPath) {
  if (!urlPath.startsWith("/molduras/")) return undefined;
  const slug = urlPath.split("/").filter(Boolean).at(-1);
  return publicFrames.find((frame) => frame.slug === slug);
}

function categoryInfo(urlPath) {
  if (urlPath === "/direitos-do-consumidor") return { label: "Direitos do Consumidor", dataLabel: "Defesa do Consumidor" };
  if (urlPath === "/direitos-do-cidadao") return { label: "Direitos do Cidadão", dataLabel: "Direitos do Cidadão" };
  if (urlPath === "/seguranca-publica") return { label: "Segurança Pública", dataLabel: "Segurança Pública" };
  return undefined;
}

function schemaFor(urlPath, seo) {
  const canonical = `${SITE_URL}${urlPath === "/" ? "/" : urlPath}`;
  const graph = [websiteJsonLd(), personJsonLd()];
  const post = postForPath(urlPath);
  const category = categoryInfo(urlPath);
  const frame = frameForPath(urlPath);

  if (post) {
    const citations = [...post.content.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)]
      .map((match) => match[1])
      .filter((url) => !/gutembergfonseca\.com\.br|instagram\.com|facebook\.com|linkedin\.com|wa\.me/i.test(url));
    graph.push({
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: post.title,
      description: post.metaDescription,
      image: absoluteUrl(post.coverImage || post.authorImage),
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      author: { "@id": PERSON_ID, "@type": "Person", name: post.author, url: AUTHOR_URL },
      publisher: { "@id": PERSON_ID },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      articleSection: post.category,
      keywords: post.tags,
      about: post.tags?.map((name) => ({ "@type": "Thing", name })),
      citation: [...new Set(citations)],
      inLanguage: "pt-BR",
      url: canonical,
    });
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: post.category, item: canonical.slice(0, canonical.lastIndexOf("/")) },
        { "@type": "ListItem", position: 3, name: post.title, item: canonical },
      ],
    });
  } else if (category) {
    const posts = publicPosts.filter((item) => item.category === category.dataLabel);
    graph.push({
      "@type": "CollectionPage",
      "@id": canonical,
      name: category.label,
      description: seo.description,
      url: canonical,
      inLanguage: "pt-BR",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: `${canonical}/${item.slug}`,
        })),
      },
    });
  } else if (urlPath === "/institucional") {
    graph.push({ "@type": "ProfilePage", "@id": canonical, name: seo.title, url: canonical, mainEntity: { "@id": PERSON_ID } });
  } else {
    graph.push({
      "@type": "WebPage",
      "@id": canonical,
      name: seo.title,
      description: seo.description,
      url: canonical,
      inLanguage: "pt-BR",
      about: frame ? { "@type": "Thing", name: frame.title } : { "@id": PERSON_ID },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function seoFor(urlPath) {
  const post = postForPath(urlPath);
  if (post) {
    return {
      title: post.metaTitle,
      description: post.metaDescription,
      image: absoluteUrl(post.coverImage || post.authorImage),
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      section: post.category,
      noindex: false,
    };
  }

  const frame = frameForPath(urlPath);
  if (frame) {
    return {
      title: `${frame.title} | Molduras de campanha`,
      description: frame.description,
      image: absoluteUrl(frame.frameSrc),
      type: "website",
      noindex: !frame.featured,
    };
  }

  if (urlPath.startsWith("/evento/")) {
    const titles = {
      "/evento/sucesso": "Inscrição realizada | Gutemberg Fonseca",
      "/evento/checkin": "Portaria do evento | Área operacional",
      "/evento/dashboard": "Participantes do evento | Área operacional",
    };
    return {
      title: titles[urlPath] || "Área operacional | Gutemberg Fonseca",
      description: "Área operacional do evento, não destinada à indexação.",
      image: DEFAULT_SOCIAL_IMAGE,
      type: "website",
      noindex: true,
    };
  }

  const staticSeo = STATIC_PAGE_SEO[urlPath];
  if (!staticSeo) {
    return {
      title: "Página não encontrada | Gutemberg Fonseca",
      description: "A página solicitada não foi encontrada.",
      image: DEFAULT_SOCIAL_IMAGE,
      type: "website",
      noindex: true,
    };
  }
  return { ...staticSeo, type: "website", noindex: Boolean(staticSeo.noindex) };
}

function cleanBaseHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+(?:name|property)=["'](?:description|author|robots|og:[^"']+|twitter:[^"']+)["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']alternate["'][^>]*type=["']application\/rss\+xml["'][^>]*>\s*/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, "");
}

function metadataMarkup(urlPath, seo) {
  const canonical = `${SITE_URL}${urlPath === "/" ? "/" : urlPath}`;
  const image = absoluteUrl(seo.image || DEFAULT_SOCIAL_IMAGE);
  const robots = seo.noindex
    ? "noindex,follow"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  const articleMeta = seo.type === "article"
    ? `\n    <meta property="article:published_time" content="${escapeHtml(seo.publishedTime)}" />\n    <meta property="article:modified_time" content="${escapeHtml(seo.modifiedTime)}" />\n    <meta property="article:section" content="${escapeHtml(seo.section)}" />`
    : "";

  return `
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="author" content="Gutemberg Fonseca" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" type="application/rss+xml" title="${SITE_NAME}" href="${SITE_URL}/feed.xml" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:type" content="${seo.type}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:alt" content="${escapeHtml(seo.title)}" />${articleMeta}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${escapeHtml(seo.title)}" />
    <script type="application/ld+json" data-prerendered-seo>${safeJson(schemaFor(urlPath, seo))}</script>
  `;
}

function buildHtml(urlPath, bodyMarkup) {
  const seo = seoFor(urlPath);
  const cleanTemplate = cleanBaseHead(baseTemplate);
  const withMetadata = cleanTemplate.replace("</head>", `${metadataMarkup(urlPath, seo)}</head>`);
  const prerenderedRoot = `<div id="root">${bodyMarkup}</div><!--app-root-end-->`;
  if (withMetadata.includes("<!--app-root-end-->")) {
    return withMetadata.replace(/<div id="root">[\s\S]*?<!--app-root-end-->/, prerenderedRoot);
  }
  return withMetadata.replace('<div id="root"></div>', prerenderedRoot);
}

for (const urlPath of getPrerenderPaths()) {
  const outputFile = urlPath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, `${urlPath.replace(/^\//, "")}.html`);
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, buildHtml(urlPath, render(urlPath)), "utf8");
}

await writeFile(path.join(distDir, "404.html"), buildHtml("/404", render("/404")), "utf8");

const indexableStaticPaths = Object.values(STATIC_PAGE_SEO)
  .filter((page) => !page.noindex)
  .map((page) => page.path);
const indexablePostPaths = publicPosts.map((post) => {
  const segment = post.category === "Direitos do Cidadão"
    ? "direitos-do-cidadao"
    : post.category === "Segurança Pública"
      ? "seguranca-publica"
      : "direitos-do-consumidor";
  return {
    path: `/${segment}/${post.slug}`,
    lastmod: (post.updatedAt || post.date).slice(0, 10),
    image: post.coverImage || post.authorImage,
  };
});
const indexableFramePaths = publicFrames
  .filter((frame) => frame.featured)
  .map((frame) => ({ path: `/molduras/${frame.slug}`, lastmod: buildDate, image: frame.frameSrc }));
const sitemapEntries = [
  ...indexableStaticPaths.map((urlPath) => ({
    path: urlPath,
    lastmod: buildDate,
    image: STATIC_PAGE_SEO[urlPath]?.image,
  })),
  ...indexablePostPaths,
  ...indexableFramePaths,
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries.map((entry) => `  <url><loc>${escapeXml(`${SITE_URL}${entry.path === "/" ? "/" : entry.path}`)}</loc><lastmod>${entry.lastmod}</lastmod>${entry.image ? `<image:image><image:loc>${escapeXml(absoluteUrl(entry.image))}</image:loc></image:image>` : ""}</url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");

const llmsSections = Object.values(STATIC_PAGE_SEO)
  .filter((page) => !page.noindex)
  .map((page) => `- [${page.title}](${SITE_URL}${page.path === "/" ? "/" : page.path}): ${page.description}`);
const llmsPosts = publicPosts.map((post) => {
  const entry = indexablePostPaths.find((item) => item.path.endsWith(`/${post.slug}`));
  return `- [${post.title}](${SITE_URL}${entry.path}): ${post.excerpt}`;
});
const llms = `# Gutemberg Fonseca

> Site oficial com trajetória pública, propostas e orientações práticas sobre direitos do consumidor e cidadania.

Conteúdo em português do Brasil. URLs canônicas e fontes oficiais estão disponíveis nas páginas vinculadas.

## Páginas principais

${llmsSections.join("\n")}

## Artigos

${llmsPosts.join("\n")}
`;
await writeFile(path.join(distDir, "llms.txt"), llms, "utf8");
await writeFile(path.join(publicDir, "llms.txt"), llms, "utf8");

const rssItems = publicPosts.map((post) => {
  const entry = indexablePostPaths.find((item) => item.path.endsWith(`/${post.slug}`));
  const link = `${SITE_URL}${entry.path}`;
  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
}).join("\n");
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${SITE_NAME}</title>
  <link>${SITE_URL}/</link>
  <description>Direitos do consumidor, cidadania e atuação pública de Gutemberg Fonseca.</description>
  <language>pt-BR</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
</channel></rss>
`;
await writeFile(path.join(distDir, "feed.xml"), rss, "utf8");
await writeFile(path.join(publicDir, "feed.xml"), rss, "utf8");

if (path.basename(ssrDir) !== ".ssr-temp") throw new Error("Diretório SSR temporário inesperado.");
await rm(ssrDir, { recursive: true, force: true });

console.log(`Pré-renderizadas ${getPrerenderPaths().length} rotas; sitemap, llms.txt e feed.xml gerados.`);
