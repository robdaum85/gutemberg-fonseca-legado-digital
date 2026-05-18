## Problema

O projeto usa `vite-plugin-pwa` com `registerType: "autoUpdate"`, que registra um service worker em produção. Dentro do iframe de preview da Lovable isso causa exatamente o sintoma que você descreveu: o SW intercepta navegações e serve HTML/JS antigos do cache, mesmo após mudanças no código.

Além disso, dispositivos que já visitaram o site publicado têm o SW antigo instalado — só remover o plugin **não** desinstala o SW desses navegadores. Eles continuariam servindo cache para sempre.

## Plano

### 1. Remover o PWA do build
- Desinstalar `vite-plugin-pwa`.
- Remover o bloco `VitePWA({...})` de `vite.config.ts`.
- Remover a importação do plugin.

### 2. Substituir o service worker por um "kill-switch"
Criar `public/sw.js` estático cujo único trabalho é:
- limpar todos os caches (`caches.keys()` + `caches.delete`),
- forçar reload das abas abertas com um query param de cache-bust,
- chamar `self.registration.unregister()`.

Assim, qualquer dispositivo que já tinha o SW antigo instalado vai, na próxima visita, baixar este SW novo, limpar tudo e se auto-desinstalar.

### 3. Garantir que nada re-registre o SW
- Verificar `src/main.tsx`, `index.html` e `src/App.tsx` — se houver chamada `navigator.serviceWorker.register(...)` ou `registerSW()`, remover.
- Adicionar (defensivamente) em `src/main.tsx` um bloco que desregistra qualquer SW existente ao iniciar, garantindo limpeza mesmo se o `sw.js` não for buscado.

### 4. Manter manifest mínimo (opcional)
O `index.html` já tem `theme-color`, `apple-touch-icon` e meta tags PWA-friendly. Isso continua funcionando para "Adicionar à tela inicial" sem precisar de service worker. Não mexer.

### 5. Comunicar limitações
- O preview da Lovable e novos visitantes verão a versão mais recente imediatamente.
- Usuários que já instalaram o PWA antigo na tela inicial podem precisar abrir o site uma vez no navegador para o kill-switch rodar.
- A app perde funcionalidade offline (consequência esperada de desativar o SW).

## Arquivos afetados

- `vite.config.ts` — remover bloco VitePWA e import.
- `package.json` — remover `vite-plugin-pwa` (via `bun remove`).
- `public/sw.js` — novo arquivo, kill-switch.
- `src/main.tsx` — adicionar bloco de unregister defensivo.

Posso seguir?
