

## Plano: Atualizar Link do Threads em Todas as Seções

Substituir o placeholder `#` pelo link real do Threads em 3 arquivos:

| Arquivo | Linha | Alteração |
|---------|-------|-----------|
| `src/components/Header.tsx` | 40 | `href: '#'` → `href: 'https://www.threads.com/@gutembergpfonseca?xmt=...'` |
| `src/components/MultimediaClipping.tsx` | 74 | `url: "#"` → `url: 'https://www.threads.com/@gutembergpfonseca?xmt=...'` |
| `src/components/ContactSection.tsx` | 164 | `href="#"` → `href="https://www.threads.com/@gutembergpfonseca?xmt=..."` |

