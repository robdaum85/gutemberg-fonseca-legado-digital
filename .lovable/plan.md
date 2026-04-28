## Plano: Arquitetura SEO — Hub Temático "Direitos do Consumidor"

Manter `/blog` e `/blog/:slug` exatamente como estão (modal + URL dinâmica) e adicionar, em paralelo, a página pilar `/direitos-do-consumidor` com seus próprios posts em `/direitos-do-consumidor/:slug`, melhorando SEO técnico (canonical, Open Graph, Article schema, breadcrumb) e atualizando o `sitemap.xml`.

---

### Arquivos a Criar

**1. `src/lib/blogUtils.ts`** — Helpers centrais
- `CATEGORY_SLUG_MAP`: `{ "Defesa do Consumidor": "direitos-do-consumidor", "Segurança Pública": "seguranca-publica" }`
- `getCategorySlug(category)` → retorna o slug da categoria
- `getCategoryFromSlug(slug)` → reverso
- `getPostsByCategory(category)` → filtra `blogPosts`
- `getPostCategoryUrl(post)` → `/direitos-do-consumidor/{slug}` quando aplicável; caso contrário `/blog/{slug}`
- `getCanonicalUrl(path)` → `https://gutembergfonseca.com.br{path}`
- `SITE_URL` constante

**2. `src/lib/useSeo.ts`** — Hook de SEO sem dependências
- Atualiza `document.title`, `meta[name=description]`, `link[rel=canonical]`
- Injeta/atualiza Open Graph (`og:title`, `og:description`, `og:image`, `og:type=article`, `og:url`) e `article:published_time`
- Injeta JSON-LD `Article` + `BreadcrumbList` quando aplicável
- Limpa tudo no unmount restaurando valores anteriores

**3. `src/pages/CategoryPage.tsx`** — Página pilar `/direitos-do-consumidor`
- H1 "Direitos do Consumidor"
- Texto introdutório institucional fornecido
- Grid de cards dos posts da categoria, linkando para `/direitos-do-consumidor/:slug` via `<Link>` (links internos crawláveis)
- `useSeo` com `metaTitle` e `metaDescription` próprios da categoria + canonical
- JSON-LD `CollectionPage` + `ItemList`

**4. `src/pages/CategoryPostPage.tsx`** — Post canônico em `/direitos-do-consumidor/:slug`
- Renderização full page (não modal) do post
- Header, breadcrumb "Início > Direitos do Consumidor > Título", artigo com `prose`, ShareButtons e CTA (mesma estrutura do `BlogPostModal`)
- `useSeo` com canonical apontando para `/direitos-do-consumidor/:slug` (URL canônica preferida para posts da categoria)
- Schema.org `Article` + `BreadcrumbList`
- Se slug não pertence à categoria, redireciona para `/blog/:slug`

---

### Arquivos a Editar

**5. `src/App.tsx`** — Adicionar rotas (lazy)
```tsx
<Route path="/direitos-do-consumidor" element={<CategoryPage />} />
<Route path="/direitos-do-consumidor/:slug" element={<CategoryPostPage />} />
```
Manter `/blog` e `/blog/:slug` intactos.

**6. `src/components/BlogPostModal.tsx`** — Melhorias SEO no modal
- Usar `getPostCategoryUrl(post)` para a URL canônica/compartilhamento
- Adicionar `<link rel=canonical>` apontando para a URL canônica do post (categoria quando aplicável)
- Adicionar OG tags (`og:title`, `og:description`, `og:image`, `og:type=article`, `og:url`, `article:published_time`) via hook `useSeo`
- Manter comportamento atual (abre/fecha, restaura tags)

**7. `src/pages/BlogPage.tsx`** — Pequeno ajuste
- Cards usam `<Link>` para `getPostCategoryUrl(post)` quando a categoria mapeia, mantendo o comportamento de modal apenas dentro de `/blog`. (Sem mudança visual; melhora links internos para SEO.)
- Adicionar `useSeo` para meta da listagem `/blog`.

**8. `public/sitemap.xml`** — Regenerar
Incluir:
- `/`
- `/blog`
- `/direitos-do-consumidor`
- `/blog/{slug}` para todos os posts (mantém URLs antigas)
- `/direitos-do-consumidor/{slug}` para posts da categoria "Defesa do Consumidor"
Adicionar `<lastmod>` baseado em `post.date`.

**9. `src/pages/BlogPostPage.tsx`** — Remover (arquivo órfão, não roteado, usa `react-helmet-async` sem provider). A funcionalidade está coberta por `BlogPostModal` e o novo `CategoryPostPage`.

---

### Detalhes Técnicos

- **Canonical strategy**: para posts com `category === "Defesa do Consumidor"`, a URL canônica é `/direitos-do-consumidor/{slug}`. O modal em `/blog/{slug}` aponta `<link rel=canonical>` para essa URL canônica, evitando conteúdo duplicado.
- **Breadcrumb visual** em `CategoryPostPage` usa o componente `src/components/ui/breadcrumb.tsx` já existente.
- **Sem novas dependências** (`react-helmet-async` não está instalado; o hook `useSeo` manipula `document.head` direto).
- **Lazy loading** das novas páginas via `React.lazy` no `App.tsx`.
- **Vercel rewrites**: `vercel.json` já tem fallback genérico que cobre `/direitos-do-consumidor/*`. Sem mudança necessária.
- **Texto introdutório** da página pilar: usar exatamente o texto institucional fornecido.

### Resultado

- `/blog` continua funcionando (modal + URL dinâmica) ✓
- `/direitos-do-consumidor` vira hub temático com posts de "Defesa do Consumidor" ✓
- Cada post de Defesa do Consumidor é acessível por duas URLs, com canonical apontando para a versão `/direitos-do-consumidor/{slug}` ✓
- Breadcrumb, Open Graph, Article schema e canonical em todas as páginas ✓
- Sitemap atualizado com todas as URLs ✓
- Zero quebra na estrutura atual ✓
