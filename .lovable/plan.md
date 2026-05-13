# Plano: Tema "Modo Copa" — reversível e não-destrutivo

## Objetivo
Criar uma camada visual alternável que transforma o site numa campanha institucional brasileira premium (estilo Copa do Mundo), sem alterar estrutura de componentes, rotas ou lógica. O tema atual continua sendo o padrão.

## Princípios
- **Reversível**: ativado/desativado via toggle, sem reload.
- **Não-destrutivo**: nada do CSS/JSX atual é removido. Tudo novo é escopado em `body.theme-copa ...`.
- **Modular**: todo o CSS do tema fica em **um único arquivo** (`src/styles/theme-copa.css`) — fácil de remover depois.
- **Sem caricaturas**: zero bola/gramado/emoji/carnaval. Tipografia forte, gradientes, diagonais sutis, glow.

## Paleta e tipografia (escopadas ao tema)
- Verde `#008037`, Amarelo `#FCF10B`, Azul `#00488E`, Azul profundo `#02112B` (derivado para fundos).
- Inter ExtraBold (800) para títulos / Inter Regular para corpo, importadas via Google Fonts no `index.html` (sem trocar Poppins do tema padrão — só sobrescrito quando `theme-copa` está ativo).

## Arquitetura

```text
src/
  contexts/ThemeCopaContext.tsx     <- provider + hook useThemeCopa()
  components/ThemeCopaToggle.tsx    <- botão flutuante "Modo Copa"
  styles/theme-copa.css             <- TODO o estilo do tema (escopado em body.theme-copa)
```

1. **Context** com estado `enabled` + persistência em `localStorage('theme-copa')`. Efeito adiciona/remove `document.body.classList.toggle('theme-copa')` e ativa `transition` global durante a troca para fade suave.
2. **Toggle flutuante** fixo no canto inferior direito (z-50), pílula com texto "Modo Copa" e bolinha indicadora. Visível em todas as rotas.
3. **CSS do tema** importado uma vez em `src/main.tsx`. Todas as regras prefixadas com `body.theme-copa` para nunca vazar para o tema padrão.

Integração mínima:
- `src/main.tsx`: `import './styles/theme-copa.css'`
- `src/App.tsx`: envolver app com `<ThemeCopaProvider>` e renderizar `<ThemeCopaToggle />` dentro do provider.

## Estilos do tema (resumo do `theme-copa.css`)

- **Background global**: `body.theme-copa` recebe gradiente diagonal azul profundo (`#02112B → #00488E`) + `::before` com faixas diagonais translúcidas verde/amarelo + `::after` com glow radial amarelo de baixa opacidade. `background-attachment: fixed`.
- **Tipografia**: `body.theme-copa h1,h2,h3` → `font-family: 'Inter', sans-serif; font-weight: 800; letter-spacing: -0.02em;`. Corpo Inter 400.
- **Hero** (`#hero`): overlay azul `rgba(2,17,43,0.75)`, faixa diagonal verde→amarelo no canto inferior, texto principal com leve glow amarelo, CTA reestilizado.
- **Navbar** (`header.fixed`): glassmorphism `backdrop-blur(14px)` + `background: rgba(2,17,43,0.55)`, borda inferior amarela 1px com glow, hover dos links verde.
- **Botões**: variante padrão repintada — amarelo `#FCF10B` + texto azul, hover com glow amarelo; secundários azul com borda verde.
- **Cards** (sections, `.card`, divs com `rounded-*` e `shadow-*`): fundo translúcido `rgba(255,255,255,0.04)`, borda `1px solid rgba(252,241,11,0.18)`, hover `translateY(-4px)` + sombra azul. Faixa diagonal verde/amarelo de 3px no topo via `::before`.
- **Footer**: fundo `#02112B` com textura SVG noise discreta + linhas diagonais e borda superior gradiente verde→amarelo→azul.
- **Animações**: keyframes locais — `copa-bg-drift` (movimento lento do gradiente), `copa-glow-pulse` (glow amarelo nos CTAs), transições globais de 300ms em cores/sombra.
- **Responsivo**: ajusta intensidade de blur, reduz tamanho de faixas diagonais e desabilita `background-attachment: fixed` em mobile.
- **Transição de troca**: classe utilitária `.theme-copa-transitioning *` aplica `transition: background-color 400ms, color 400ms, border-color 400ms, box-shadow 400ms` durante 500ms após o toggle.

## Arquivos criados (3 novos)
- `src/contexts/ThemeCopaContext.tsx`
- `src/components/ThemeCopaToggle.tsx`
- `src/styles/theme-copa.css`

## Arquivos editados (mínimos, 3)
- `src/main.tsx` — 1 import do CSS.
- `src/App.tsx` — wrap com provider + render do toggle.
- `index.html` — `<link>` Google Fonts para Inter 400/800 (não remove Poppins).

## Como remover depois da Copa
1. Excluir os 3 arquivos novos.
2. Reverter as 3 edições mínimas.
Nada do tema padrão terá sido tocado.

## Fora de escopo
- Nenhuma mudança em rotas, SEO, sitemap, blog, lógica de componentes, dados ou estrutura React.
