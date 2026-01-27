

## Plano: Substituir Vídeos e Adicionar Botão do Canal

### Alterações no arquivo `src/components/MultimediaClipping.tsx`

| Linha | Ação | Descrição |
|-------|------|-----------|
| 14 | Adicionar import | Importar ícone `Youtube` do lucide-react |
| 30-41 | Substituir array | Trocar os 2 vídeos atuais pelos 3 novos |
| 127 | Adicionar botão | Inserir botão "Acessar Canal" após o grid de vídeos |

### Novos Vídeos

```javascript
const videos = [
  {
    id: "xi2QbV0uDDg",
    title: "Vídeo 1",
    caption: "Descrição do vídeo 1",
  },
  {
    id: "1sdH4i3vztA",
    title: "Vídeo 2",
    caption: "Descrição do vídeo 2",
  },
  {
    id: "xDj3UwD3U9g",
    title: "Vídeo 3",
    caption: "Descrição do vídeo 3",
  },
];
```

### Novo Botão do Canal

Será adicionado abaixo do grid de vídeos:

```jsx
<div className="flex justify-center mt-8">
  <Button
    asChild
    className="bg-red-600 hover:bg-red-700 text-white"
  >
    <a 
      href="https://www.youtube.com/@CANAL_DO_USUARIO" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2"
    >
      <Youtube className="h-5 w-5" />
      Acessar Canal no YouTube
    </a>
  </Button>
</div>
```

### Resultado Visual

```text
┌─────────────────────────────────────────────────┐
│           Vídeos Institucionais                 │
├─────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ Vídeo 1 │  │ Vídeo 2 │  │ Vídeo 3 │         │
│  └─────────┘  └─────────┘  └─────────┘         │
│                                                 │
│         [🎬 Acessar Canal no YouTube]           │
│              (botão vermelho)                   │
└─────────────────────────────────────────────────┘
```

### Pergunta

Preciso de duas informações para completar o plano:

1. **Títulos e legendas dos vídeos** - Quais são os títulos e descrições para cada um dos 3 vídeos?

2. **Link do canal** - Qual é o endereço do canal do YouTube para o botão "Acessar Canal"?

