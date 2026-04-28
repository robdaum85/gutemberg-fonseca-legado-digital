
# Sincronização final — SEO, rotas e sitemap

## Diagnóstico

A branch atual já reflete a versão mais recente da consolidação do blog. Tudo que diz respeito a SEO, rotas e sitemap está correto e ativo:

| Área | Estado | Arquivo |
|---|---|---|
| Rota canônica do hub | ✅ Ativa | `src/App.tsx` → `/direitos-do-consumidor` |
| Rota canônica do post | ✅ Ativa | `src/App.tsx` → `/direitos-do-consumidor/:slug` |
| Redirect `/blog` → hub | ✅ `<Navigate replace>` | `src/App.tsx` |
| Redirect `/blog/:slug` → post canônico | ✅ via `BlogPostRedirect` | `src/App.tsx` |
| Sitemap canônico | ✅ Apenas URLs novas | `public/sitemap.xml` |
| Robots aponta sitemap | ✅ | `public/robots.txt` |
| Canonical, OG, JSON-LD (Article + Breadcrumb + CollectionPage/ItemList) | ✅ | `src/lib/useSeo.ts`, `CategoryPage.tsx`, `CategoryPostPage.tsx` |
| Mapeamento categoria → URL | ✅ | `src/lib/blogUtils.ts` (`CATEGORY_SLUG_MAP`) |
| Header e preview do Blog apontam para hub | ✅ | `Header.tsx`, `Blog.tsx` |
| Guia de publicação | ✅ Cabeçalho | `src/data/blogPosts.ts` |

Nenhum arquivo precisa ser recriado, sobrescrito ou removido.

## Único ajuste pequeno proposto (opcional, mas recomendado)

Remover do `vercel.json` os dois rewrites específicos para `/blog` e `/blog/:slug`. Eles eram necessários quando havia páginas reais nessas rotas; agora são redirects do React Router e o catch-all já cuida do fallback SPA. O arquivo continua existindo (não é deletado), apenas fica mais limpo e evita "pegar" tráfego em rotas que não existem mais.

**Antes:**
```json
{
  "rewrites": [
    { "source": "/blog/:slug", "destination": "/index.html" },
    { "source": "/blog", "destination": "/index.html" },
    { "source": "/((?!robots\\.txt|...).*)", "destination": "/index.html" }
  ]
}
```

**Depois:**
```json
{
  "rewrites": [
    { "source": "/((?!robots\\.txt|...).*)", "destination": "/index.html" }
  ]
}
```

Observação: Lovable Hosting ignora `vercel.json` (faz SPA fallback nativamente). Esse arquivo só tem efeito se você publicar o repositório na Vercel.

## O que NÃO será feito

- ❌ Não recriar `BlogPage.tsx` nem `BlogPostModal.tsx` (foram removidos intencionalmente).
- ❌ Não sobrescrever `blogPosts.ts`, `App.tsx`, `Header.tsx`, `Blog.tsx`, `CategoryPage.tsx`, `CategoryPostPage.tsx`, `blogUtils.ts`, `useSeo.ts`, `sitemap.xml` ou `robots.txt`. Já estão corretos.
- ❌ Não mexer em componentes fora do escopo SEO/rotas/sitemap.

## Resultado

Após a aprovação, a única edição será `vercel.json` (limpeza dos dois rewrites redundantes). Se preferir não tocar em nada, basta dizer — o projeto já está sincronizado com a versão final.
