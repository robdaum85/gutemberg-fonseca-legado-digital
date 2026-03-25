

## Plano: Sistema de Blog Interno com Modal

### Visão Geral
Substituir o blog atual (links externos) por um sistema interno com conteúdo renderizado em modal, URL dinâmica, compartilhamento e SEO.

---

### Arquivos a Criar

**1. `src/data/blogPosts.ts`** — Estrutura de dados
- Tipo `BlogPost` com: `slug`, `source`, `title`, `excerpt`, `author`, `role`, `date`, `image`, `metaTitle`, `metaDescription`, `content` (HTML)
- Array `blogPosts` migrado com os 11 posts existentes (conteúdo placeholder no campo `content`, dados reais nos demais campos)
- Autor padrão: "Gutemberg Fonseca", role: "Coluna de Defesa do Consumidor"

**2. `src/components/BlogPostModal.tsx`** — Modal do post
- Usa `Dialog` do shadcn/ui (já existe no projeto)
- Layout: overlay escuro, modal centralizado (~700px largura), scroll interno
- Cabeçalho: foto do autor, nome, subtítulo, tag da fonte, data
- Conteúdo: título H1, imagem destacada, HTML via `dangerouslySetInnerHTML`
- Botões de compartilhamento (WhatsApp, Facebook, X, Copiar link) no topo e final
- CTA padrão fixo no final de cada post (canais oficiais: WhatsApp, Disque 151, Instagram)
- Fechar com X, clique fora, ESC (comportamento nativo do Dialog)

**3. `src/components/ShareButtons.tsx`** — Componente de compartilhamento
- Botões: WhatsApp, Facebook, X (Twitter), Copiar link
- URLs conforme especificado
- Feedback "Link copiado!" ao copiar
- Versão mobile: botão fixo "Compartilhar no WhatsApp" na parte inferior

**4. `src/pages/BlogPage.tsx`** — Página /blog
- Grid de cards com: tag da fonte, título, excerpt, ícone de leitura
- Ao clicar: abre modal (sem navegação de página)
- Gerencia URL dinâmica com `history.pushState` (`/blog/[slug]`)
- Ao fechar modal: `history.back()`
- Ao carregar com slug na URL: abre modal automaticamente
- Atualiza `document.title` e meta tags dinamicamente

---

### Arquivos a Modificar

**5. `src/App.tsx`**
- Adicionar rota `/blog` e `/blog/:slug` apontando para `BlogPage`

**6. `src/components/Blog.tsx`** (seção na homepage)
- Manter como preview/resumo na homepage
- Trocar links externos por links internos para `/blog`
- Adicionar botão "Ver todos os artigos" linkando para `/blog`
- Cards agora abrem modal ou navegam para `/blog/[slug]`

**7. `src/components/Header.tsx`**
- Adicionar link "Blog" no menu de navegação apontando para `/blog`

---

### Detalhes Técnicos

- **URL dinâmica**: `history.pushState`/`popstate` para gerenciar URLs sem reload
- **SEO**: `document.title` e `meta[name="description"]` atualizados via `useEffect`; JSON-LD schema `Article` injetado no head
- **Performance**: Lazy load da página Blog via `React.lazy`; modal leve sem reload
- **Responsivo**: mobile-first, tipografia editorial, largura de leitura ~700px
- **Escalabilidade**: dados isolados em `src/data/blogPosts.ts`, fácil migração para API/CMS

