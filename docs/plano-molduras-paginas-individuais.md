# Plano: reduzir vitrine de molduras + páginas individuais por aliado

Status: **implementado**

## Pedido do cliente

Na página de molduras (`/molduras`), a vitrine pública deve mostrar **apenas 3 opções**:

1. Somente Gutemberg
2. Gutemberg e Flávio (Bolsonaro)
3. Gutemberg, Flávio e Douglas Ruas

As demais combinações (moldura com cada aliado/candidato individual) saem da vitrine pública e passam a existir **cada uma em sua própria página/link**, para que o cliente envie o link certo para cada aliado divulgar. Ele também quer **acompanhar acessos de cada link via analytics**.

## Como funciona hoje

- Existe uma única rota `/molduras` e `/molduras/:slug` (`src/App.tsx:138-139`), servidas pelo mesmo componente `MoldurasPage`.
- `MoldurasPage` sempre renderiza a grade completa com **todas** as 20 molduras ativas (`activePhotoFrames`), não importa qual `:slug` esteja na URL — o link individual só pré-seleciona o editor abaixo da grade, mas a vitrine com todo mundo continua visível.
- As molduras estão cadastradas em `src/config/photoFrames.ts` (20 no total: 1 solo, 1 com Flávio, 1 chapa com Douglas Ruas + Flávio, e mais 17 com aliados individuais).
- Analytics: GA4 (`G-GQTGRP15XX`) é carregado só após consentimento de cookies (`CookieConsent.tsx`) e dispara `page_view` automático usando a URL atual no momento do carregamento — ou seja, **cada link direto (`/molduras/slug-do-aliado`) já gera um `page_path` distinto no GA4** quando alguém abre o link. Não existe hoje um evento de `page_view` disparado nas trocas de moldura feitas *dentro* da vitrine (é só `history.replaceState`), mas isso não afeta o caso de uso de "link individual enviado pelo WhatsApp".

## O que precisa mudar

### 1. Marcar quais molduras são "públicas" (vitrine) vs "individuais" (só por link)
Adicionar um campo (ex: `featured: boolean`) em `photoFrames.ts` e marcar `true` apenas nos 3 slugs:
- `gutemberg-fonseca-2255`
- `guto-flavio-bolsonaro`
- `guto-douglas-flavio`

Os outros 17 (Dr. Rogério Amorim, Arthur Monteiro, Cris Kaizer, Dani Martins, Daniel Marques, Elker Jaé, Greg Duarte, Jeremias Santos, Marcelo da Construção, Prof. Marcelo Macedo, Marquinho do Transporte, Rodrigo da Lumar, Sub Honório, Fabinho Costa & Vantoil, Felipe Pampolha/Michel Marins/Zezinho Orelha, Janeyde/Jorge Felippe Neto, Nilsão/Giovani Ratinho) ficam `featured: false`.

### 2. Ajustar `MoldurasPage`
- A grade em `/molduras` passa a listar só `activePhotoFrames.filter(f => f.featured)` (3 cards).
- Quando alguém acessa `/molduras/:slug` de uma moldura **não destacada**, a página abre direto no editor daquele aliado e **não mostra a grade com as outras**, evitando que a pessoa descubra as demais páginas "privadas" navegando pela vitrine. O botão "escolher outra moldura" leva de volta para `/molduras` (a vitrine pública com só 3 opções), não para uma lista das 17.
- URLs continuam sendo `/molduras/<slug>` (não precisa mudar a estrutura de rotas, já suporta isso).

### 3. SEO / privacidade dos links individuais
- Adicionar `noindex` (via `useSeo` ou tag `robots`) nas páginas de moldura não destacada, para não aparecerem no Google — são links que o cliente vai distribuir diretamente, não para busca pública.
- Manter Open Graph (título/imagem) só nelas para preview bonito no WhatsApp quando o aliado compartilhar.

### 4. Analytics por link
- Como cada aliado tem sua própria URL, o GA4 já registra `page_path` diferente por link — não precisa de infraestrutura nova.
- Sugestão: criar no GA4 uma **exploração/relatório salvo** filtrando `page_path` que começa com `/molduras/`, agrupado por página, para o cliente enxergar cliques/acessos por aliado numa tabela só.
- Opcional (mais preciso): disparar um evento customizado `photo_frame_page_view` com o `slug`/`title` do aliado ao montar a página, para facilitar o filtro sem depender de parsing de URL.

## Esforço estimado

- Baixo: é basicamente um filtro na config + pequeno ajuste condicional no componente existente. Sem novas páginas/rotas, sem backend novo.
- Trabalho manual do cliente: nenhum — os 17 links já existem hoje (`/molduras/guto-dr-rogerio-amorim`, etc.), só precisam parar de aparecer na vitrine.

## Decisões confirmadas com o cliente

1. Destaques são os 3 mesmo (Somente Gutemberg, Gutemberg & Flávio, Gutemberg/Flávio/Douglas Ruas).
2. As 17 páginas individuais ficam sem link visível em lugar nenhum do site.
3. `page_path` no GA4 já resolve o acompanhamento por link — sem evento customizado.

## O que foi feito

- `src/config/photoFrames.ts`: novo campo `featured` em cada moldura; `true` só nos 3 destaques. Novo export `featuredPhotoFrames`.
- `src/pages/MoldurasPage.tsx`: a grade de `/molduras` usa `featuredPhotoFrames` (só 3 cards). Quando a URL é de uma moldura não destacada, a grade fica oculta — a página abre direto no editor daquele aliado, sem mostrar as outras opções.
- `src/lib/useSeo.ts`: nova opção `noindex`; aplicada nas 17 páginas individuais (`<meta name="robots" content="noindex,follow">`), para não aparecerem no Google.
- `public/sitemap.xml`: removidas as 17 URLs individuais do sitemap (ficam só `/molduras` e os 3 destaques) — como são links privados para o cliente distribuir, não fazem sentido no sitemap.
- `npx tsc --noEmit` e `npm run build` rodados sem erros.

## Links individuais para o cliente distribuir

Cada aliado tem sua própria URL. Basta enviar o link correspondente para cada grupo:

| Aliado(s) | Link |
|---|---|
| Dr. Rogério Amorim | https://gutembergfonseca.com.br/molduras/guto-dr-rogerio-amorim |
| Arthur Monteiro | https://gutembergfonseca.com.br/molduras/guto-arthur-monteiro |
| Cris Kaizer | https://gutembergfonseca.com.br/molduras/guto-cris-kaizer |
| Dani Martins | https://gutembergfonseca.com.br/molduras/guto-dani-martins |
| Daniel Marques | https://gutembergfonseca.com.br/molduras/guto-daniel-marques |
| Elker Jaé | https://gutembergfonseca.com.br/molduras/guto-elker-jae |
| Greg Duarte | https://gutembergfonseca.com.br/molduras/guto-greg-duarte |
| Jeremias Santos | https://gutembergfonseca.com.br/molduras/guto-jeremias-santos |
| Marcelo da Construção | https://gutembergfonseca.com.br/molduras/guto-marcelo-construcao |
| Professor Marcelo Macedo | https://gutembergfonseca.com.br/molduras/guto-marcelo-macedo |
| Marquinho do Transporte | https://gutembergfonseca.com.br/molduras/guto-marquinho-transporte |
| Rodrigo da Lumar | https://gutembergfonseca.com.br/molduras/guto-rodrigo-lumar |
| Sub Honório | https://gutembergfonseca.com.br/molduras/guto-sub-honorio |
| Fabinho Costa & Vantoil | https://gutembergfonseca.com.br/molduras/guto-fabinho-vantoil |
| Felipe Pampolha, Michel Marins & Zezinho Orelha | https://gutembergfonseca.com.br/molduras/guto-felipe-michel-zezinho |
| Janeyde do Calçadão & Jorge Felippe Neto | https://gutembergfonseca.com.br/molduras/guto-janeyde-jorge |
| Nilsão & Giovani Ratinho | https://gutembergfonseca.com.br/molduras/guto-nilsao-ratinho |

No GA4, esses acessos aparecem filtrando o relatório de páginas por `page_path` começando com `/molduras/`.
