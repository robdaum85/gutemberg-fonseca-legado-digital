## Objetivo

Refinar o **modo Copa** (sem alterar o tema padrão) corrigindo contrastes em botões/setas, deixando o menu/ícones do header em amarelo, e estendendo o tema às páginas internas de **Direitos do Consumidor** (lista e post).

Tudo continua escopado em `body.theme-copa` em `src/styles/theme-copa.css` — totalmente reversível.

---

## 1. Botão "Ver todos os artigos" (Blog)

Hoje usa `Button variant="outline"` em fundo translúcido — fica com texto/borda apagados sobre o azul.

No `theme-copa.css`, adicionar regra escopada para `body.theme-copa #blog a[href="/direitos-do-consumidor"] button`:
- Borda amarela `#FCF10B`
- Texto amarelo `#FCF10B`, ícone amarelo
- Hover: fundo amarelo sólido + texto azul `#02112B` (mesmo padrão dos CTAs Copa)
- `box-shadow` sutil amarelo no hover

## 2. Setas do clipping de notícias (← →)

Os dois `Button variant="outline" size="icon"` em `MultimediaClipping.tsx` (linhas 216–232) ficam quase invisíveis no fundo escuro.

No `theme-copa.css`, adicionar:
- `body.theme-copa #multimedia button[class*="absolute"][class*="rounded"]` (seletor pelos botões circulares posicionados absolutamente)
- Fundo: gradiente amarelo `#FCF10B → #fff170`
- Ícone (chevron): cor azul `#02112B`
- Borda azul translúcida + sombra
- Hover: leve `scale(1.08)` + glow amarelo

## 3. Navbar — texto e ícones em amarelo

No `Header.tsx` o tema padrão usa `text-white`. No modo Copa, sobrescrever via CSS (sem mexer no JSX):

- `body.theme-copa header nav a` → `color: #FCF10B`
- `body.theme-copa header nav a:hover` → manter highlight verde já existente, com texto amarelo intensificado (drop-shadow)
- `body.theme-copa header .md\:flex a[aria-label] svg` (ícones sociais) → `color: #FCF10B`
- Hover dos ícones: fundo `rgba(252,241,11,0.12)` + glow amarelo
- Botão hambúrguer mobile: também amarelo

A "logo branca" continua intacta.

## 4. Página **Direitos do Consumidor** (lista + post)

As páginas `CategoryPage.tsx` e `CategoryPostPage.tsx` já renderizam `<Header />` e `<Footer />` (que herdam o tema Copa via `body.theme-copa`), porém o conteúdo central usa `bg-background`, `text-foreground`, `bg-card` que ficam claros.

Adicionar no `theme-copa.css` regras escopadas a essas páginas (sem `id` específico — usar seletores genéricos que só batem quando a section/main existe nessas rotas):

- `body.theme-copa main .bg-background, body.theme-copa .min-h-screen.bg-background` → fundo transparente (deixa o gradiente Copa do `body` aparecer)
- Headings `h1, h2` da página → branco
- Parágrafos `text-foreground/80` → `#d4dbe8`
- Breadcrumb (`text-muted-foreground`) → `#cdd5e3`; link "Início" → amarelo no hover
- Cards de artigo (`Link` com `bg-card rounded-lg shadow-md ... border`):
  - já casa com regra existente de cards translúcidos (`rounded-lg` + `shadow`)
  - reforçar: borda amarela `rgba(252,241,11,0.25)`, hover borda sólida `#FCF10B`
  - título do card → branco, hover → amarelo
  - badge `text-primary bg-primary/10` (fonte) → fundo `rgba(252,241,11,0.15)`, texto amarelo
  - ícone `BookOpen` → cinza claro, hover amarelo
- Página de post (`CategoryPostPage`): mesmas regras de tipografia + container `prose`/conteúdo do artigo legível em fundo escuro (texto claro, links amarelos, blockquotes com borda amarela).

Tudo isso vive **exclusivamente** no CSS — nenhum `.tsx` precisa ser alterado nessas páginas.

---

## Arquivos alterados

- `src/styles/theme-copa.css` — único arquivo modificado. Novas seções:
  1. `/* Blog: botão Ver todos os artigos */`
  2. `/* Multimedia: setas do carrossel */`
  3. `/* Navbar: texto/ícones amarelos */` (substitui/expande bloco atual de header)
  4. `/* Páginas Direitos do Consumidor (lista + post) */`

## Fora de escopo

- Estrutura React, rotas, lógica, dados, SEO
- Tema padrão (sem Copa) permanece inalterado
- Outras páginas/sections já temáticas
