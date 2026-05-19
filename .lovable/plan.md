## 1. Imagem de preview do WhatsApp (Open Graph)

Atualizar `index.html` para usar `https://kngofnnx.com/wp-content/uploads/2026/05/GUTEMBERG-1.png` em:
- `og:image` (+ `og:image:width`, `og:image:height`, `og:image:alt`, `og:image:type`)
- `twitter:image`
- `schema.org` Person `image`

Observação: o WhatsApp faz cache agressivo do preview. Após publicar, o link novo pode levar até ~7 dias para atualizar, ou pode ser forçado adicionando `?v=2` no final da URL ao compartilhar uma vez.

## 2. Botão de Acessibilidade (acima do Modo Copa)

Criar um novo widget flutuante de Acessibilidade seguindo padrões WCAG/W3C, posicionado **acima** do botão Modo Copa (mesmo canto inferior direito), com estilo discreto similar (ícone de pessoa acessível — `Accessibility` do lucide-react).

Ao clicar, abre um painel (Popover/Sheet) com toggles persistidos em `localStorage`, aplicando classes no `<html>`/`<body>`:

- **Tamanho da fonte**: Normal / Grande / Extra-grande (`a11y-font-lg`, `a11y-font-xl`)
- **Alto contraste**: aumenta contraste de texto e fundos (`a11y-high-contrast`)
- **Modo escala de cinza** (auxílio para daltonismo severo) (`a11y-grayscale`)
- **Filtros para daltonismo**: Protanopia / Deuteranopia / Tritanopia via filtros SVG (`a11y-protanopia`, etc.)
- **Sublinhar links** (`a11y-underline-links`)
- **Reduzir animações** (`a11y-reduce-motion`) — respeita também `prefers-reduced-motion`
- **Espaçamento de leitura ampliado** (line-height/letter-spacing) (`a11y-readable`)
- **Cursor grande** (`a11y-big-cursor`)
- **Botão Resetar tudo**

Arquivos novos:
- `src/components/AccessibilityWidget.tsx` — botão + Popover com switches (shadcn)
- `src/styles/accessibility.css` — classes utilitárias + filtros SVG para daltonismo
- `src/hooks/useAccessibilityPrefs.ts` — estado + persistência

Integração:
- Importar CSS em `src/main.tsx`
- Renderizar `<AccessibilityWidget />` em `src/App.tsx` (já existe `ThemeCopaToggle` global). Posicionar com `bottom: 64px` no CSS para ficar acima do toggle do Modo Copa (que está a `bottom: 16px`).
- `aria-label`, `role="dialog"` e foco gerenciado pelo Popover do shadcn (já compatível com WCAG).

## 3. Ajustes responsivos (mobile e tablet)

Auditar e corrigir nos breakpoints `<768px` e `768–1024px`:

- **Header**: garantir que itens não sobreponham logo; menu hambúrguer funcional com foco visível.
- **Hero**: títulos com `clamp()` ou classes `text-3xl sm:text-4xl md:text-6xl`; padding lateral mínimo; CTA full-width no mobile.
- **Statistics / Career / Blog / Instagram**: grids passando para 1 coluna em <640px, 2 em tablet; reduzir paddings verticais.
- **PodcastHighlight**: iframe responsivo (`aspect-video`).
- **Formulários (Apoiador/Liderança/Denúncia)**: inputs full-width, `font-size: 16px` para evitar zoom do iOS, labels acima.
- **WelcomePopup**: largura máx `90vw`, scroll interno se conteúdo passar de `85vh`.
- **Footer**: colunas empilhadas no mobile, espaçamento revisado.
- **Toggles flutuantes (Acessibilidade + Modo Copa)**: garantir tap target ≥44×44px e não cobrir o botão fixo do WhatsApp em `ShareButtons`.
- Substituir `h-screen` por `h-dvh` onde fizer sentido (viewport mobile).

Verificação final: revisar nos viewports 360px, 414px, 768px e 1024px.

## Detalhes técnicos

- Sem mudanças de backend.
- Acessibilidade: classes aplicadas via `document.documentElement.classList`; filtros de daltonismo via `<svg>` oculto com `<filter id="protanopia">` e CSS `filter: url(#protanopia)` em `body`.
- Persistência: `localStorage` chave `a11y-prefs` (JSON).
- Toggle do Modo Copa permanece intocado (regras de memória mantidas).
