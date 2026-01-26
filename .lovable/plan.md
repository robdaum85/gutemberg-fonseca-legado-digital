

## Plano: Remover Vídeo Band Rio

### Alteração

**Arquivo:** `src/components/MultimediaClipping.tsx`

| Ação | Descrição |
|------|-----------|
| Remover item do array | Excluir o terceiro vídeo do array `videos` (linhas 36-39) |

### Código Atual (linhas 26-40)

```javascript
const videos = [
  {
    id: "fC0VS6gZBXw",
    title: "Entrevista RJTV",
    caption: "Entrevista no RJTV – Maio/2025",
  },
  {
    id: "UKt484G9Oe8",
    title: "Ações da SEDCON",
    caption: "TV Rio – Abril/2025",
  },
  {
    id: "mDm-5C9ZNwI",          // <- REMOVER
    title: "Defesa do Consumidor",
    caption: "Band Rio – Março/2025",
  },
];
```

### Código Após Alteração

```javascript
const videos = [
  {
    id: "fC0VS6gZBXw",
    title: "Entrevista RJTV",
    caption: "Entrevista no RJTV – Maio/2025",
  },
  {
    id: "UKt484G9Oe8",
    title: "Ações da SEDCON",
    caption: "TV Rio – Abril/2025",
  },
];
```

### Resultado

A seção "Vídeos Institucionais" exibirá apenas 2 vídeos:
1. Entrevista RJTV – Maio/2025
2. Ações da SEDCON – TV Rio – Abril/2025

