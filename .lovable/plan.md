## Problema

Quando o usuário clica no botão de acessibilidade, o popover abre, mas:

1. **Aparência confusa**: o painel parece "uma nova barra de navegação" — todos os switches aparecem amarelos (parecem todos ligados) porque o Modo Copa está ativo e suas regras CSS (`body.theme-copa button…`) pintam os switches do shadcn com gradiente amarelo. Resultado: impossível distinguir ON/OFF.
2. **Título "Acessibilidade" invisível** dentro do popover (texto branco sobre fundo branco devido a overrides do tema).
3. **Texto descritivo** com baixo contraste.
4. **Popover muito alto** — passa do meio da tela.

## Plano de correção

Refatorar `src/components/AccessibilityWidget.tsx` e `src/styles/accessibility.css` para que o painel seja **totalmente isolado** dos estilos globais (não usar `Switch`/`Label`/`Popover` do shadcn que são pintados pelo tema). Em vez disso:

- Usar um **dropdown próprio** ancorado ao botão (posição `fixed` no canto inferior direito, acima do botão), com `z-index` alto.
- Fechar ao clicar fora ou apertar Esc.
- Largura compacta (~300px), altura máx `min(70vh, 520px)` com scroll interno.
- **Estilos inline com `!important`** (escopados em `.a11y-panel`) para imunidade ao Modo Copa: fundo branco, texto escuro, switches custom (track cinza/verde).
- Toggle pills custom (não `<Switch>` do shadcn): `<button role="switch" aria-checked>` com indicador visual claro (cinza = off, verde = on).
- Botões de tamanho de fonte mantidos, mas com bordas explícitas.
- Substituir o título "Acessibilidade" para ter cor explícita.

Não mexer no Modo Copa nem em outros componentes. Apenas o widget de acessibilidade e seu CSS.
