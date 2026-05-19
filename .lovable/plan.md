## Mudanças

### 1. Campos dos forms invisíveis
**Causa:** No Modo Copa, `body.theme-copa { color: #f5f7fb }` é herdado pelos `<input>`, `<textarea>` e `<label>`, deixando o texto branco sobre o card branco.

**Fix:** Adicionar em `src/styles/theme-copa.css` regras escopadas:
- `body.theme-copa input, body.theme-copa textarea, body.theme-copa select { color: #1a1a1a !important; background: #ffffff !important; }`
- `body.theme-copa label { color: #1a1a1a !important; }`
- `body.theme-copa ::placeholder { color: #64748b !important; }`

### 2. Substituir os 2 primeiros posts do Instagram
Em `src/components/InstagramFeed.tsx`, trocar os dois primeiros itens do array:
- **insta1:** url `https://www.instagram.com/p/DYF6cP0mIbw/?igsh=OG1kNDhzMGlvdm1t`, imagem `https://kngofnnx.com/wp-content/uploads/2026/05/br.png`
- **insta2:** url `https://www.instagram.com/p/DYVtrxlxav4/?igsh=MWpyczN5a283aTk1NA==`, imagem `https://kngofnnx.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-15-at-13.37.39.jpeg`
- Mudar o `type` desses dois de `reel` para `post` (já que o badge mostra "Reel"). Vou ajustar o badge condicionalmente para mostrar "Post" quando `type === 'post'`.
- Terceiro post permanece igual.

### 3. Novo post no blog
Adicionar no topo de `blogPosts` em `src/data/blogPosts.ts`:
- `slug`: `bets-orcamento-familiar-armadilha`
- `category`: `Defesa do Consumidor` → URL canônica `/direitos-do-consumidor/bets-orcamento-familiar-armadilha`
- `title`: "Bets e o orçamento familiar: quando o jogo vira uma armadilha"
- `date`: `2026-05-17`
- `readingTime`: `5 min de leitura`
- `excerpt/subTitle`: "Apostas online e jogos de cassino digital podem comprometer o orçamento familiar e exigem acolhimento, fiscalização e proteção ao consumidor."
- `coverImage`: `https://kngofnnx.com/wp-content/uploads/2026/05/artigo2.png`
- `author`/`role`/`authorImage`: mesmos padrões dos outros posts
- `content`: HTML formatado com `<h2>` e `<p>` a partir do texto fornecido
- `featured`: `true`
- `metaTitle`/`metaDescription`/`tags` adequados a SEO

Adicionar a URL canônica `/direitos-do-consumidor/bets-orcamento-familiar-armadilha` em `public/sitemap.xml`.

## Arquivos alterados
- `src/styles/theme-copa.css`
- `src/components/InstagramFeed.tsx`
- `src/data/blogPosts.ts`
- `public/sitemap.xml`
