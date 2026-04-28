# Reenvio da consolidação do blog para o GitHub

Status: aplicado.

Estado atual confirmado:
- `/blog` e `/blog/:slug` redirecionam para `/direitos-do-consumidor` (canônico).
- Hub temático ativo em `src/pages/CategoryPage.tsx` e `CategoryPostPage.tsx`.
- Header exibe "Direitos do Consumidor".
- `BlogPage.tsx` e `BlogPostModal.tsx` removidos.
- Sitemap contém apenas URLs canônicas.
- `src/data/blogPosts.ts` agora traz cabeçalho-guia com checklist de publicação.

Fluxo de publicação:
1. Editar `src/data/blogPosts.ts` (campo `category` define a URL).
2. Adicionar URL nova em `public/sitemap.xml`.
3. Categoria nova? Adicionar em `CATEGORY_SLUG_MAP` em `src/lib/blogUtils.ts`.
