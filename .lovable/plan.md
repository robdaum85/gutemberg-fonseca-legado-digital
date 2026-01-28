

## Plano: Substituir Imagens e Links do Instagram

### Arquivo a ser alterado

**`src/components/InstagramFeed.tsx`**

### Situação Atual

O componente usa **cards com gradientes coloridos** (sem imagens reais) para representar os posts do Instagram:

```javascript
const instagramPosts = [
  {
    url: 'https://www.instagram.com/p/DR4tXupjNKB/',
    type: 'post',
    description: 'Maior apreensão da história do RJ',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
  },
  // ... mais 3 posts
];
```

### Alteração Proposta

Substituir os 4 posts atuais pelos novos, agora usando **imagens reais** em vez de gradientes:

| Posição | Nova Imagem | Novo Link |
|---------|-------------|-----------|
| 1 | `guto1.png` | `.../p/DThvZenks6H/` |
| 2 | `guto2.png` | `.../p/DTu9r-rEbTn/` |
| 3 | `guto3.png` | `.../p/DTdcycDki2k/` |
| 4 | `guto4.png` | `.../p/DS2qS5ZEvqk/` |

### Código Após Alteração

**Array de posts (linhas 15-40):**

```javascript
const instagramPosts = [
  {
    url: 'https://www.instagram.com/p/DThvZenks6H/?igsh=dnNtYzIwc2I1cXUz',
    image: 'https://kngofnnx.com/wp-content/uploads/2026/01/Guto1.png',
    type: 'post' as const,
  },
  {
    url: 'https://www.instagram.com/p/DTu9r-rEbTn/?igsh=NWpzcDA5djF3aXIw',
    image: 'https://kngofnnx.com/wp-content/uploads/2026/01/guto2.png',
    type: 'post' as const,
  },
  {
    url: 'https://www.instagram.com/p/DTdcycDki2k/?igsh=NnU3MnhueDUwcm90',
    image: 'https://kngofnnx.com/wp-content/uploads/2026/01/guto3.png',
    type: 'post' as const,
  },
  {
    url: 'https://www.instagram.com/p/DS2qS5ZEvqk/?igsh=ZDR4d3VqbHJsMjYw',
    image: 'https://kngofnnx.com/wp-content/uploads/2026/01/guto4.png',
    type: 'post' as const,
  },
];
```

**Template do card (linhas 80-124):**

Substituir o gradiente de fundo por uma imagem real:

```jsx
{/* Antes: Gradient Background */}
<div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />

{/* Depois: Imagem Real */}
<img 
  src={post.image} 
  alt="Post do Instagram"
  className="absolute inset-0 w-full h-full object-cover"
/>
```

### Simplificações

| Item | Ação |
|------|------|
| Propriedade `gradient` | Remover (substituída por `image`) |
| Propriedade `description` | Remover (não será exibida) |
| Pattern Overlay | Remover (não necessário com imagens) |
| Ícone central do Instagram | Remover (as imagens falam por si) |
| Badge Post/Reel | Manter para identificar o tipo |

### Resultado Visual

```text
┌─────────────────────────────────────────────────┐
│                  Instagram                       │
│             @gutembergpfonseca                   │
├─────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│  │ Guto1   │  │ Guto2   │  │ Guto3   │  │ Guto4   │
│  │ (foto)  │  │ (foto)  │  │ (foto)  │  │ (foto)  │
│  │  [Post] │  │  [Post] │  │  [Post] │  │  [Post] │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘
│                                                   │
│         [Ver mais no Instagram]                   │
└─────────────────────────────────────────────────┘
```

### Resumo das Alterações

| Linha | Alteração |
|-------|-----------|
| 15-40 | Substituir array `instagramPosts` com novos URLs, imagens e remover gradientes |
| 82-90 | Substituir `<div>` com gradiente por `<img>` com a foto real |
| 92-118 | Simplificar conteúdo central removendo ícone e descrição |

