## Mudanças

### 1. Remover "Depoimentos"
- `src/components/Header.tsx`: remover o item `{ name: 'Depoimentos', href: '#depoimentos' }` do array `navLinks` (afeta desktop e mobile).
- `src/pages/Index.tsx`: remover `<Testimonials />` do JSX e o respectivo `import Testimonials from '@/components/Testimonials'`.
- O arquivo `src/components/Testimonials.tsx` permanece no projeto (não deletado), apenas desconectado.

### 2. Comentar "Clipping de Notícias" (uso futuro)
- `src/pages/Index.tsx`: comentar a linha `<MultimediaClipping />` com `{/* ... */}` e manter o `import` também comentado, deixando um comentário `// TODO: reativar futuramente` para fácil retomada.

### 3. Sobre — layout no modo Copa
- `src/components/About.tsx`: usar o hook `useThemeCopa()` para detectar `enabled`.
- Quando `enabled === true` (modo Copa):
  - Inverter a ordem das colunas: texto à esquerda, foto à direita. Isso será feito aplicando `lg:flex-row-reverse` no container flex (mantendo a ordem do DOM e o `flex-col` no mobile).
  - Substituir a `src` da imagem por `https://kngofnnx.com/wp-content/uploads/2026/05/gutoselecao.png` e ajustar o `alt` para "Gutemberg Fonseca - Copa".
  - As animações de entrada (`translate-x` esquerda/direita) e demais estilos permanecem iguais — apenas a direção visual da fileira muda.
- Quando `enabled === false`: layout atual permanece intacto (foto à esquerda, texto à direita, imagem original `/lovable-uploads/424487f0-...`).

## Detalhes técnicos

```tsx
// About.tsx (resumo)
const { enabled: isCopa } = useThemeCopa();
const imgSrc = isCopa
  ? 'https://kngofnnx.com/wp-content/uploads/2026/05/gutoselecao.png'
  : '/lovable-uploads/424487f0-dee5-4f8e-bdab-8e3e234b08c7.png';

<div className={`flex flex-col ${isCopa ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-start mt-12`}>
```

Nada mais é alterado: identidade visual, demais seções, formulários de mobilização e tema padrão continuam como estão.