## Atualizar coverImage de cada post do blog

Você enviou 21 URLs e existem 16 posts. Proponho a seguinte associação por tema (mapeando o melhor candidato visual para cada slug). URLs sobrando ficam como reserva (não utilizadas).

### Mapeamento proposto (slug → coverImage)

| # | Slug | Nova coverImage |
|---|------|-----------------|
| 1 | `crime-relacao-consumo-virus-silencioso` | `.../crime-relacao-consumo-virus-silencioso.png` |
| 2 | `compras-online-prazo-entrega-direitos-consumidor` | `.../delivery.png` |
| 3 | `corte-indevido-servicos-essenciais-direitos-consumidor` | `.../luz.png` |
| 4 | `gasolina-subindo-sem-reajuste-petrobras-direitos-consumidor` | `.../gasolina-scaled.jpeg` |
| 5 | `pascoa-direitos-consumidor-compra-chocolate` | `.../Design-sem-nome-1.png` |
| 6 | `pascoa-consciente-direito-informacao-rotulo` | `.../Design-sem-nome-1-1.png` |
| 7 | `vagao-feminino-rj-24-horas` | `.../Design-sem-nome-2.png` |
| 8 | `contrato-de-academia-direitos-do-consumidor` | `.../side-view-people-running-treadmill-gym...jpeg` |
| 9 | `direitos-do-hospede-hoteis-pousadas` | `.../african-american-man-carrying-bags-hotel...jpeg` |
| 10 | `direitos-basicos-do-consumidor` | `.../man-shaking-hands-with-lady...jpeg` |
| 11 | `atraso-na-entrega-direitos-do-consumidor` | `.../mature-woman-getting-angry-yelling-phone...jpeg` |
| 12 | `fraudes-digitais-pix-falso-whatsapp-golpes` | `.../anonovogolpe-scaled.jpeg` |
| 13 | `trocas-pos-natal-direitos-consumidor` | `.../trocaposnatal-scaled.jpeg` |
| 14 | `plano-de-celular-direitos-consumidor-fidelizacao-cancelamento` | `.../young-beautiful-woman-having-online-meeting...jpeg` |
| 15 | `compras-online-golpes-pix-como-evitar` | `.../golpesnopix-scaled.jpeg` |
| 16 | `credito-consignado-direitos-consumidor-emprestimo` | `.../creditoconsignado-1-scaled.jpeg` |

URLs não utilizadas (reserva): `odia .../arte_coluna_opiniao_08_maio_2026`, `diariodorio .../Emprestimo-1024x568-1.jpg`, `.../Design-sem-nome-6.png`, `.../emprestimo-scaled.jpeg`, `.../comprasonline.png`.

### Mudanças de código

1. **`src/data/blogPosts.ts`** — substituir o campo `coverImage` em cada um dos 16 posts pela URL correspondente acima. `authorImage` permanece como está (foto do Gutemberg).

2. **`src/components/Blog.tsx`** — atualmente os cards do bloco "Blog" na home não exibem a imagem. Adicionar no topo de cada card um `<div>` com `aspect-video` e `<img src={post.coverImage} alt={post.title} loading="lazy" className="w-full h-full object-cover" />` para que as fotos reais apareçam.

3. **`src/pages/CategoryPage.tsx`** — mesmo ajuste: incluir thumbnail `aspect-video` no topo de cada card da listagem `/direitos-do-consumidor`.

4. **`src/pages/CategoryPostPage.tsx`** — verificar se já renderiza a `coverImage` no hero do post; se não, adicionar imagem destaque acima do título.

Sem mudanças em rotas, dados de outros posts, lógica ou tema. As novas regras de imagem usam classes Tailwind existentes e respeitam o tema Copa.

### Confirme antes de eu implementar

- O mapeamento acima está correto?
- Posso descartar (ou prefere usar em algum slug específico) as 5 URLs sobrando?