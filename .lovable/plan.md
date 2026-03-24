

## Plano: Atualizar Podcast, Rodapé e Instagram

### 1. Vídeo Destaque do Podcast

**Arquivo:** `src/components/PodcastHighlight.tsx` (linha 35)

Substituir o ID do vídeo principal de `EyfwkZLfEQw` para `XCONLAT8Jc0`. Atualizar também o link do botão "Assistir no YouTube" (linha 88).

### 2. Rodapé — Remover Links

**Arquivo:** `src/components/Footer.tsx` (linhas 24-25)

Remover estas duas linhas do menu:
- `Realizações` (linha 24)
- `365 Dias` (linha 25)

### 3. Instagram — Novos Posts

**Arquivo:** `src/components/InstagramFeed.tsx` (linhas 15-36)

Substituir os 4 posts atuais por 3 novos:

| # | Link | Imagem |
|---|------|--------|
| 1 | `.../reel/DWRTgxCjqpL/...` | `noticia1.png` |
| 2 | `.../reel/DWPw1L9S3PF/...` | `noticia2.png` |
| 3 | `.../reel/DWOgyF3D9KC/...` | `noticias3.png` |

O tipo será alterado de `post` para `reel`. O grid passará de 4 para 3 colunas.

