

## Plano: Adicionar TikTok e Threads às Redes Sociais

### Arquivos a alterar

**`src/components/Header.tsx`**

Adicionar dois novos ícones no array `socialLinks` (após Twitter):

- **TikTok**: link `https://www.tiktok.com/@gutembergpfonseca_?_r=1&_t=ZS-94xYYr9aX4x`, ícone SVG customizado (Lucide não tem TikTok)
- **Threads**: link `#` (placeholder), ícone SVG customizado

Como Lucide não possui ícones de TikTok e Threads, serão criados componentes SVG inline para cada um, seguindo o mesmo padrão visual dos ícones existentes (tamanho 20px no desktop, 24px no mobile).

### Detalhes Técnicos

- Criar dois componentes funcionais simples (`TikTokIcon` e `ThreadsIcon`) com SVG paths oficiais das marcas
- Adicioná-los ao array `socialLinks` no Header (desktop e mobile)
- Ambos aparecerão tanto no menu desktop quanto no mobile

| Rede | Link | Status |
|------|------|--------|
| TikTok | `https://www.tiktok.com/@gutembergpfonseca_?...` | Com link |
| Threads | `#` | Placeholder (sem link por enquanto) |

