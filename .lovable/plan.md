## Objetivo
Fazer o Modo Copa vir ativado por padrão para todos os visitantes, só sendo desligado se o usuário clicar no botão (Volleyball) ou se desativarmos via código.

## Alteração

**`src/contexts/ThemeCopaContext.tsx`** — mudar o estado inicial:

- Hoje: `enabled` inicia em `false` quando não há nada no `localStorage`.
- Novo comportamento: `enabled` inicia em `true` por padrão. Só fica `false` quando o `localStorage` tem explicitamente o valor `'0'` (ou seja, o usuário já clicou no botão para desligar nesta sessão/dispositivo).

Lógica do estado inicial:
```
const stored = localStorage.getItem('theme-copa');
return stored === null ? true : stored === '1';
```

Assim:
- Primeiro acesso → Modo Copa ON.
- Usuário clica no botão para desligar → grava `'0'` → continua OFF nas próximas visitas naquele dispositivo.
- Usuário clica de novo para ligar → grava `'1'` → volta para ON.
- Para forçar OFF globalmente via código futuramente, basta trocar o default `true` por `false`.

## Fora do escopo
- Sem mudanças no botão `ThemeCopaToggle`, no CSS do tema, nos componentes visuais ou em qualquer outra parte do site.
- Sem alteração de rotas, SEO ou backend.

## Validação
- Abrir o site em um navegador sem `localStorage` da chave `theme-copa` → tema Copa aparece ativo.
- Clicar no botão Volleyball → desliga e persiste como OFF ao recarregar.
- Clicar novamente → liga e persiste como ON.
