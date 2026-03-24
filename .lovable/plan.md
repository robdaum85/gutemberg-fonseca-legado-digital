

## Plano: Adicionar TikTok e Threads em Todas as Seções

Os ícones de TikTok e Threads já existem no **Header**. Faltam em mais duas seções:

### Seções a atualizar

| Seção | Arquivo | Alteração |
|-------|---------|-----------|
| Clipping Multimídia | `src/components/MultimediaClipping.tsx` (linhas 52-57) | Adicionar TikTok e Threads ao array `socialMedia` |
| Contato / "Siga-nos" | `src/components/ContactSection.tsx` (linhas 138-157) | Adicionar ícones de TikTok e Threads após LinkedIn |

### Detalhes Técnicos

**MultimediaClipping.tsx:**
- Importar os componentes SVG `TikTokIcon` e `ThreadsIcon` (definir inline ou extrair para arquivo compartilhado)
- Adicionar ao array `socialMedia`:
  - TikTok: `https://www.tiktok.com/@gutembergpfonseca_?_r=1&_t=ZS-94xYYr9aX4x`
  - Threads: `#` (placeholder)

**ContactSection.tsx:**
- Adicionar dois novos `<a>` com os SVGs de TikTok e Threads, seguindo o mesmo padrão visual (`bg-primary hover:bg-primary/80 text-white p-3 rounded-full`)

Para evitar duplicação de código, os componentes `TikTokIcon` e `ThreadsIcon` serão extraídos para um arquivo compartilhado (`src/components/SocialIcons.tsx`) e importados no Header, MultimediaClipping e ContactSection.

