# Reenvio da consolidação do blog para o GitHub

## Objetivo

Forçar um novo commit/push do Lovable para o GitHub contendo o estado atual e correto da consolidação do blog em `/direitos-do-consumidor`, sobrescrevendo eventuais divergências do repositório.

## Como vai funcionar

O Lovable só faz push quando há mudança em arquivo. Como o código aqui já está correto, vou tocar dois arquivos de forma útil (não é "mudança fake" — agrega valor real) para gerar um commit novo que arrasta junto todo o estado atual:

1. **`src/data/blogPosts.ts`** — adicionar um cabeçalho de comentário com o checklist de publicação (você pediu isso na pergunta anterior). Documenta:
   - Onde editar para criar/atualizar posts
   - Como o `category` define a URL automaticamente
   - Lembrete de atualizar `public/sitemap.xml` ao publicar

2. **`.lovable/plan.md`** — atualizar o registro da consolidação com a data/nota do reenvio.

## Verificação prévia (read-only)

Antes de tocar qualquer coisa, confirmo que estes arquivos estão no estado esperado:

- `src/App.tsx` → rota `/blog` redireciona, `BlogPostRedirect` ativo ✅ (já confirmado no contexto)
- `src/lib/blogUtils.ts` → `CATEGORY_SLUG_MAP` correto ✅
- `src/lib/useSeo.ts` → existe ✅
- `src/pages/CategoryPage.tsx` e `CategoryPostPage.tsx` → existem ✅
- `src/components/Header.tsx` → menu "Direitos do Consumidor"
- `src/components/Blog.tsx` → links da home apontando para `/direitos-do-consumidor/{slug}`
- `src/pages/BlogPage.tsx` e `src/components/BlogPostModal.tsx` → ausentes (deletados)
- `public/sitemap.xml` → só com URLs canônicas

Se algo estiver fora do esperado, corrijo no mesmo passo.

## Resultado

Um único commit novo é empurrado pelo Lovable para o GitHub. Como o sync do Lovable usa o estado do editor como fonte da verdade nesse push, sobrescreve qualquer divergência.

Após o push concluir (alguns segundos), você já pode continuar editando via código diretamente no GitHub normalmente.

## Detalhes técnicos

- Nenhuma mudança funcional na aplicação — só adição de comentário-guia em `blogPosts.ts` e atualização do `.lovable/plan.md`.
- Nenhum arquivo deletado, criado ou movido.
- Sem impacto em rotas, SEO, sitemap ou conteúdo visível.
