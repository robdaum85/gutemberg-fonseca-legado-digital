## Destacar as figurinhas da Copa no rodapé do Contato

Hoje as duas figurinhas (`BOLSONARO.png` e `GUTEMBERG-1.png`) aparecem discretas no canto do `ContactSection`, sem chamada nem moldura. Vou transformá-las num bloco de destaque visual com a frase pedida.

### Onde
`src/components/ContactSection.tsx`, linhas 172-185 (substituir o `<div>` atual das duas imagens).

### O que muda
Trocar o bloco simples por um card de destaque com:

- Container largura total da coluna, fundo `bg-gradient-primary` (gradiente verde→turquesa já existente), bordas arredondadas (`rounded-2xl`), padding generoso, sombra forte (`shadow-2xl`) e leve borda branca translúcida.
- Headline em Poppins 700 (classe existente): **"O Álbum do Brasil precisa dessas figurinhas para completar um Brasil melhor."**
  - Texto em branco, tamanho `text-xl md:text-2xl`, alinhado ao centro no mobile e à esquerda no desktop.
- Subtítulo curto opcional em branco/90 (`text-sm`): "Cole, compartilhe e ajude a completar o álbum."
- Linha das figurinhas:
  - Layout flex centralizado, gap maior (`gap-6`).
  - Aumentar as figurinhas para `h-44 sm:h-52 md:h-64` mantendo `object-contain`.
  - Adicionar leve `rotate` alternado (`-rotate-3` / `rotate-3`) para dar charme de "figurinha colada".
  - Hover: `hover:scale-105` + `transition-transform`.
  - Manter `loading="lazy"` e os mesmos `alt`.
- Animação sutil de entrada já é coberta pelos `useIntersectionObserver` existentes no entorno (não precisa novo hook); apenas classes Tailwind cuidam do hover.

### Considerações
- Só edição visual em um componente; sem novas dependências, sem alteração de dados ou rotas.
- A frase fica visível tanto no tema padrão quanto no modo Copa (o gradiente é o mesmo dos botões da marca).
- Mobile-first respeitado: card ocupa 100% no mobile, figurinhas centralizadas e empilháveis se necessário (`flex-wrap`).