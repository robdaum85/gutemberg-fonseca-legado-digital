## Toggle Modo Copa mais discreto (ícone bola de futebol)

Trocar o botão atual (pílula com texto "Modo Copa ON/OFF") por um botão circular pequeno com o ícone de bola de futebol, posicionado no canto inferior direito.

### `src/components/ThemeCopaToggle.tsx`
- Importar `import { Volleyball } from 'lucide-react'` (é o ícone de bola/futebol disponível no lucide; visual de gomos clássicos).
- Renderizar um `<button>` quadrado/circular (~40px), `aria-label` mantido ("Ativar/Desativar Modo Copa"), `aria-pressed={enabled}`.
- Conteúdo: apenas o ícone `<Volleyball size={20} />`. Remover o `__label` com texto e o `__dot`.
- Tooltip nativo via `title="Modo Copa"`.

### `src/styles/theme-copa.css`
- Reescrever `.theme-copa-toggle` como botão circular discreto:
  - `width: 40px; height: 40px; padding: 0; border-radius: 999px;`
  - Fundo neutro semitransparente: `background: rgba(2, 17, 43, 0.55); backdrop-filter: blur(8px);`
  - Borda fina: `border: 1px solid rgba(255,255,255,0.15);`
  - Cor do ícone (OFF): `color: rgba(255,255,255,0.65);`
  - Sombra suave: `box-shadow: 0 4px 12px rgba(0,0,0,0.25);`
  - Opacidade base `0.7`, vai a `1` no hover.
- Estado ativo (quando `body.theme-copa` está aplicado): `.theme-copa .theme-copa-toggle { color: #FCF10B; border-color: rgba(252,241,11,0.55); box-shadow: 0 0 12px rgba(252,241,11,0.35); opacity: 1; }`.
- Remover regras `.theme-copa-toggle__dot` e `.theme-copa-toggle__label` (não usadas).
- Ajustar a media query da linha 480 para o novo tamanho (`width: 36px; height: 36px;` em telas pequenas).

### Considerações
- Sem novas dependências (`lucide-react` já está no projeto).
- Posição/`z-index` preservados (fixed, canto inferior direito).
- Acessibilidade mantida via `aria-label` + `aria-pressed`.
- Reversível: apenas edição de dois arquivos existentes.