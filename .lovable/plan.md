## Escopo

Quatro ajustes visuais — apenas frontend, sem mexer em rotas, lógica ou dados.

### 1. Logo branca (Header + Footer)
- Em `src/components/Header.tsx` (linha 52) e `src/components/Footer.tsx` (linha 8), trocar o `src` da `<img>` para `https://kngofnnx.com/wp-content/uploads/2026/05/LOGO-BRANCA.png`.
- Manter classes/altura existentes; apenas a URL muda.

### 2. Tema Copa na seção Instagram
A seção `#instagram` usa `bg-background` e título com `bg-gradient-primary` (azul). Adicionar regras em `src/styles/theme-copa.css` escopadas em `body.theme-copa #instagram`:
- Fundo translúcido + overlay institucional (mesmo padrão de `#numeros`/`#blog`/`#multimedia` com `DDESKTOP.png` + gradiente azul-marinho).
- Título `Instagram` com gradiente verde→amarelo (igual aos números).
- Link `@gutembergpfonseca` em amarelo `#FCF10B`.
- Botão "Ver mais no Instagram": amarelo com texto azul-marinho (padrão Copa).
- Cards dos posts já herdam o estilo de cards translúcidos.

### 3. Fundo do Footer com `DDESKTOP.png`
Em `src/styles/theme-copa.css`, complementar o bloco `body.theme-copa footer`:
- Adicionar `background-image: url('https://kngofnnx.com/wp-content/uploads/2026/05/DDESKTOP.png')` sobreposto ao gradiente azul-marinho atual, com `background-size: cover`, `background-position: center`, e overlay escuro `rgba(2,17,43,0.78)` para garantir legibilidade.
- Manter as faixas diagonais e a borda gradient já existentes.

### 4. Figurinhas no `#contato` (abaixo de "Siga-nos")
Em `src/components/ContactSection.tsx`, após o `<div className="flex space-x-4">…</div>` dos ícones sociais (após linha 170), adicionar um novo bloco:

```tsx
<div className="mt-8 flex items-end justify-start gap-4">
  <img
    src="https://kngofnnx.com/wp-content/uploads/2026/05/BOLSONARO.png"
    alt="Figurinha Flávio Bolsonaro"
    className="h-40 md:h-56 w-auto object-contain drop-shadow-xl"
    loading="lazy"
  />
  <img
    src="https://kngofnnx.com/wp-content/uploads/2026/05/GUTEMBERG-1.png"
    alt="Figurinha Gutemberg Fonseca"
    className="h-40 md:h-56 w-auto object-contain drop-shadow-xl"
    loading="lazy"
  />
</div>
```

Ordem: Flávio à esquerda, Gutemberg à direita. Tamanho responsivo (mobile menor, desktop maior). Apenas presentes quando o usuário rolar até a seção.

## Arquivos alterados
- `src/components/Header.tsx` — trocar URL da logo (1 linha).
- `src/components/Footer.tsx` — trocar URL da logo (1 linha).
- `src/components/ContactSection.tsx` — adicionar bloco das duas figurinhas após os ícones sociais.
- `src/styles/theme-copa.css` — adicionar regras para `#instagram` e complementar `footer` com a imagem de fundo.

## Fora do escopo
Rotas, SEO, dados, lógica React, novos componentes ou alterações em outras seções já tematizadas.
