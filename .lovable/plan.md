

## Plano: Manter Apenas 3 Imagens Originais no Hero

### Arquivo a ser alterado

**`src/components/Hero.tsx`**

### Situação Atual

O slider de imagens possui:
- **Desktop**: 7 imagens (3 originais + 4 novas)
- **Mobile**: 16 imagens (7 + 9 verticais adicionais)

### Alteração Proposta

Simplificar para usar apenas as **3 imagens originais do Playbook** em todos os dispositivos:

| Antes | Depois |
|-------|--------|
| 7 imagens no desktop | 3 imagens |
| 16 imagens no mobile | 3 imagens |

### Código Atual (linhas 5-38)

```javascript
// Imagens que aparecem em TODAS as telas (desktop + mobile) - 7 fotos
const allDevicesImages = [
  // 3 originais do Playbook
  'https://img.playbook.com/3gmHBQ3nDjvgLt33...',
  'https://img.playbook.com/ihBOakoOc26ghY6g...',
  'https://img.playbook.com/qRzLFPwsMekYl6Aw...',
  // 4 novas que funcionam bem no desktop
  'https://kngofnnx.com/wp-content/uploads/2026/01/01d1b5e5...',
  'https://kngofnnx.com/wp-content/uploads/2026/01/00b15fc3...',
  'https://kngofnnx.com/wp-content/uploads/2026/01/0621379e...',
  'https://kngofnnx.com/wp-content/uploads/2026/01/2b427863...',
];

// Imagens que aparecem APENAS no mobile (9 fotos verticais)
const mobileOnlyImages = [
  'https://kngofnnx.com/wp-content/uploads/2026/01/IMG_4766.jpg',
  // ... mais 8 imagens
];

// No mobile: todas as 16 fotos | No desktop: apenas 7 fotos
const backgroundImages = isMobile 
  ? [...allDevicesImages, ...mobileOnlyImages] 
  : allDevicesImages;
```

### Código Após Alteração

```javascript
// 3 imagens originais do Playbook - usadas em todos os dispositivos
const backgroundImages = [
  'https://img.playbook.com/3gmHBQ3nDjvgLt33nyR9Xxf6x_LASkigwMCHzx-L3P0/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2FiYWNkMDE0/LWJlMjctNDgyZi05/N2I2LTdmYzI1NDdm/ZjQ5OA',
  'https://img.playbook.com/ihBOakoOc26ghY6gcu4YHRzq9KD5chqsOA4_ghcMF4w/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzU1ZDc2ZjE4/LWUzMjAtNDUxNy04/ZWNhLWNiMGQzN2E0/MGNjYw',
  'https://img.playbook.com/qRzLFPwsMekYl6AwVA0-H_YOuZSIRoOrCbvaJdauePg/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzlkMjU5Y2Nj/LWE5NDUtNGQyMS1h/NTlhLTAzNjNkMzQ0/MmE5Nw',
];
```

### Simplificações

| Item | Ação |
|------|------|
| Array `allDevicesImages` | Remover (substituído por `backgroundImages`) |
| Array `mobileOnlyImages` | Remover completamente |
| Import `useIsMobile` | Remover (não será mais necessário) |
| Variável `isMobile` | Remover |
| `useEffect` de reset de índice | Remover (não há mais troca mobile/desktop) |
| Lógica condicional mobile/desktop | Remover |

### Resultado

```text
┌─────────────────────────────────────────────────┐
│              Hero Slider                        │
├─────────────────────────────────────────────────┤
│                                                 │
│   ● ○ ○   ← Apenas 3 indicadores               │
│                                                 │
│   Mesmas 3 imagens em desktop e mobile         │
│   Código mais simples e responsivo             │
│                                                 │
└─────────────────────────────────────────────────┘
```

