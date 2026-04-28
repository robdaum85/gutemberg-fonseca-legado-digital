## Plano: Unificar Blog em "Direitos do Consumidor"

### Por que existem duas páginas hoje

Na arquitetura atual, deixei `/blog` e `/direitos-do-consumidor` convivendo em paralelo por uma razão técnica de SEO: posts antigos ou compartilhamentos externos que apontam para `/blog/:slug` continuam funcionando, e o `<link rel="canonical">` informa ao Google que a versão "oficial" é a `/direitos-do-consumidor/:slug`. Isso evita perda de links e evita conteúdo duplicado.

Mas como hoje **100% dos posts** são da categoria "Defesa do Consumidor", manter duas páginas de listagem (uma genérica em `/blog` e a hub temática em `/direitos-do-consumidor`) é redundante e dilui a autoridade SEO. Faz total sentido unificar.

### Solução

Transformar `/direitos-do-consumidor` na **única** página hub e redirecionar todo o tráfego de `/blog` para ela, preservando os links antigos.

### Alterações

**1. `src/App.tsx` — Redirecionar rotas antigas**
- `/blog` → redireciona para `/direitos-do-consumidor` (via `<Navigate replace>`)
- `/blog/:slug` → redireciona para `/direitos-do-consumidor/:slug` quando o post existir na categoria; senão para `/direitos-do-consumidor`
- Criar pequeno componente `BlogRedirect` inline para fazer o lookup do slug e decidir o destino correto (preservando SEO via redirect 301-equivalente do lado cliente)
- Remover o lazy import de `BlogPage` (não usado mais)

**2. `src/components/Header.tsx`**
- Trocar item de menu "Blog" → "Direitos do Consumidor" apontando para `/direitos-do-consumidor`

**3. `src/components/Blog.tsx`** (seção da home)
- Atualizar links dos cards: `/blog/:slug` → `/direitos-do-consumidor/:slug`
- Botão "Ver todos os artigos": `/blog` → `/direitos-do-consumidor`
- Opcionalmente atualizar o título/CTA da seção para "Direitos do Consumidor" (manter texto atual se você preferir, posso confirmar)

**4. `src/components/BlogPostModal.tsx`**
- Não é mais usado em nenhuma rota ativa após a unificação. Vou deletar o arquivo para evitar código morto.

**5. `src/pages/BlogPage.tsx`**
- Deletar (substituído pelo redirect).

**6. `src/pages/CategoryPostPage.tsx`**
- Ajustar o fallback (linhas 22 e 25): em vez de redirecionar para `/blog`, redirecionar para `/direitos-do-consumidor` (já que `/blog` agora é só um redirect).

**7. `public/sitemap.xml`**
- Remover entradas `/blog` e `/blog/:slug` (mantemos apenas as URLs canônicas `/direitos-do-consumidor` e `/direitos-do-consumidor/:slug`).

### Resultado para o usuário

- Quem clicar em "Blog" no menu antigo, em links externos antigos ou compartilhamentos no WhatsApp/redes sociais cai automaticamente na página correta.
- O Google passa a indexar uma única URL canônica por post, concentrando autoridade.
- A página hub "Direitos do Consumidor: guia prático e atualizado" passa a ser a porta de entrada principal do conteúdo editorial.
- Menu fica mais alinhado ao posicionamento institucional ("Direitos do Consumidor" em vez de "Blog").

### Observação

Como o redirect é client-side (SPA), o ideal a longo prazo seria configurar redirect 301 no nível do hosting. Para o Lovable hosting atual, o redirect via React Router é a abordagem padrão e funciona corretamente para SEO desde que o `<link rel=canonical>` aponte para a URL final — o que já está implementado.
