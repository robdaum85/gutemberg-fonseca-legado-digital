

## Plano: Limpar Blog — Manter Apenas o Post Real

### Alteração

**Arquivo: `src/data/blogPosts.ts`**
- Remover todos os posts placeholder (linhas 50-314)
- Manter apenas o primeiro post (`cobranca-indevida-apos-cancelamento`) que você enviou

### Como Adicionar Novos Posts

O arquivo onde você cadastra posts é:

**`src/data/blogPosts.ts`**

Para adicionar um novo post, basta inserir um novo objeto dentro do array `blogPosts`, seguindo este modelo:

```typescript
{
  slug: "url-amigavel-do-post",
  source: "Nome da Fonte",
  title: "Título do Artigo",
  excerpt: "Resumo curto para o card.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-04-01",
  image: "/images/gutemberg-coluna.jpg",
  metaTitle: "Título para SEO",
  metaDescription: "Descrição para SEO.",
  content: `
    <p>Conteúdo HTML aqui...</p>
    <h2>Subtítulo</h2>
    <p>Mais conteúdo...</p>
  `
}
```

Cada novo objeto é separado por vírgula dentro do array `[]`.

