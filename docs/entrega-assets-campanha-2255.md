# Entrega dos assets da campanha 2255

Coloque todos os arquivos nas pastas abaixo usando exatamente estes nomes. A entrega final foi feita em PNG com fundo transparente, evitando os bitmaps encapsulados em SVG gerados pelo Canva.

## Logos

Pasta: `public/images/federal/brand/`

| Arquivo | Uso | Proporção/prancheta recomendada |
| --- | --- | --- |
| `logo-navbar-2255-horizontal.png` | Navbar | 1000 × 500 px; fundo transparente |
| `logo-hero-2255-completa.png` | Lockup principal do hero: cargo, nome, 2255 e slogan | 1200 × 800 px; fundo transparente |
| `logo-rodape-2255-completa.png` | Rodapé sobre navy | 1200 × 800 px; fundo transparente |

Não inclua a logo do partido nesses três arquivos. Preserve uma margem interna mínima de 4% ao redor do desenho. Se navbar e rodapé utilizarem exatamente o mesmo lockup, ainda assim exporte os dois nomes para permitir ajustes independentes posteriores.

Nas páginas 13 e 16, trocar os textos pretos por branco. Manter o número e o check em amarelo e a bolinha do símbolo em azul/ciano. Não redesenhar, esticar ou alterar as proporções internas do lockup.

## Camadas do hero

Pasta: `public/images/federal/hero/`

| Arquivo | Formato | Especificação |
| --- | --- | --- |
| `hero-fundo-desktop.png` | PNG | 2560 × 1200 px; apenas azul, gradientes e textura; sem bandeira, texto ou candidato |
| `hero-fundo-mobile.png` | PNG | 1080 × 1440 px; versão vertical da mesma textura; sem elementos importantes nas bordas |
| `hero-bandeira.png` | PNG com alpha | 1600 × 1600 px; bandeira/losango/anel como peça isolada e transparente |
| `hero-candidato-recorte.png` | PNG com alpha | 1800 × 2250 px; corpo disponível até abaixo do peito e fundo transparente |

O site utiliza derivados WebP dos três PNGs acima para reduzir o peso do primeiro carregamento, mantendo os originais como fallback.

## Compartilhamento e ícone

| Pasta | Arquivo | Especificação |
| --- | --- | --- |
| `public/images/federal/social/` | `og-campanha-2255.png` | 1200 × 630 px; arte completa para WhatsApp, Facebook, LinkedIn e X |
| `public/images/federal/brand/` | `icone-campanha-2255.png` | 512 × 512 px; símbolo isolado com fundo transparente |

Também mantenha os arquivos-fonte em alta resolução fora da pasta pública. O site receberá apenas as versões otimizadas acima.

## Composição prevista

Desktop, acima de 960 px:

- lockup ocupa aproximadamente 46% da largura útil, alinhado à esquerda;
- bandeira começa perto de 47% da tela e pode extrapolar topo/direita;
- candidato ocupa aproximadamente 48–52% da largura, alinhado à direita e ao rodapé do hero;
- a cabeça deve permanecer dentro dos 8% superiores e o rosto dentro da metade direita;
- CTAs ficam abaixo do lockup, sem serem incorporados à arte.

Mobile:

- lockup centralizado no topo, com até 88% da largura;
- bandeira centralizada atrás do candidato;
- candidato ancorado na base, com até 94% da largura;
- número e slogan não devem fazer parte do fundo, pois precisam mudar de posição para evitar sobreposição com o rosto.

## Referência analisada

A referência possui 2500 × 1080 px, proporção 2,31:1. A direção visual está adequada: contraste forte, identificação imediata, número dominante e separação clara entre lockup e candidato. Como peça única, porém, ela perderia texto ou rosto em telas 16:9, notebooks baixos e celulares. Por isso o hero será montado com as quatro camadas acima.

Não é necessário exportar a moldura branca nem os cantos arredondados da referência; esses acabamentos serão feitos em CSS e poderão responder a cada tamanho de tela.
