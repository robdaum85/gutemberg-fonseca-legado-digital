# Campanha 2255 — implementação da nova home

Atualizado em 15/08/2026.

## Escopo implementado

- `/` passou a renderizar a campanha federal.
- `/apresentacao-federal` redireciona permanentemente para `/` na Vercel e possui fallback equivalente no React Router.
- A home institucional anterior foi preservada em `/institucional`; nenhum componente foi removido.
- `Verdade`, `Alianças` e `Materiais` foram retirados dos menus e da composição da home. Os componentes e dados continuam no repositório para reativação.
- A seção de propostas recebeu a copy aprovada e três ícones vetoriais no estilo de traço do site.
- O contador usa 04/10/2026 às 00h em `America/Sao_Paulo`, atualiza a cada segundo e exibe dias, horas, minutos e segundos. No dia mostra `É dia de votar!`; depois da data exibe uma mensagem histórica.
- O e-mail `contato@gutembergfonseca.com.br` foi incluído no rodapé.

## Identidade visual

A fonte de verdade está no `:root` de `src/pages/ApresentacaoFederalPage.css`:

| Token | Valor |
| --- | --- |
| `--brand-blue` | `#0066B3` |
| `--brand-green` | `#02A556` |
| `--brand-green-dark` | `#007236` |
| `--brand-yellow` | `#FAE519` |
| `--brand-yellow-icon` | `#FDD504` |
| `--brand-cyan` | `#008CE2` |
| `--brand-black` | `#211915` |
| `--brand-navy` | `#003F66` |

Os aliases antigos da página (`--green-*`, `--navy-*`, `--yellow-*`) agora apontam para esses tokens. A página de evento, que ainda repetia os três hexadecimais depreciados, também foi alinhada.

## SEO e indexação

- Canonical principal: `https://gutembergfonseca.com.br/`.
- Robots da home: `index, follow`.
- O sitemap mantém `/` com prioridade `1.0` e data de atualização 15/08/2026.
- `/apresentacao-federal` e `/institucional` não aparecem no sitemap: a primeira é apenas um alias redirecionado; a segunda é um arquivo histórico acessível por URL direta.
- Título, descrição, Open Graph, Twitter e dados estruturados estáticos foram atualizados para a campanha.

## Analytics e conversões

O GA4 existente (`G-GQTGRP15XX`) volta a carregar na nova home somente após aceite no aviso LGPD. O `page_view` inicial é enviado pela configuração padrão do GA4. Os cliques abaixo usam eventos centralizados por delegação de DOM:

| Evento | Origem |
| --- | --- |
| `support_click` | CTAs de apoio no header e bloco final |
| `whatsapp_click` | botão flutuante e contato do rodapé |
| `whatsapp_conversion` | ações do Exército do Consumidor |
| `contact_email_click` | e-mail do rodapé |
| `video_click` | CTA de vídeo do hero |

O mesmo dispatcher envia `trackCustom` ao Meta Pixel caso `window.fbq` esteja instalado. Nenhum Pixel ID existe no repositório, portanto a instalação do script-base depende do ID oficial da conta da campanha.

### Validação antes do deploy público

1. Aceitar os cookies em uma janela anônima e confirmar `page_view` no relatório Tempo real do GA4.
2. Clicar em cada CTA e conferir os eventos no DebugView do GA4.
3. Informar o Meta Pixel ID oficial, instalar o script-base com consentimento e validar `PageView`/eventos no Meta Pixel Helper.
4. Confirmar o 308/301 de `/apresentacao-federal` para `/` no ambiente Vercel.
5. Submeter novamente `sitemap.xml` no Search Console e inspecionar a canonical de `/`.

## Logos

As assinaturas finais foram entregues em PNG com transparência real e integradas ao navbar, hero e rodapé. O hero também usa a bandeira em PNG como camada independente atrás do retrato. Essa solução substituiu os SVGs exportados pelo Canva, que continham bitmaps encapsulados e não ofereciam ganho vetorial.

A nomenclatura e as dimensões combinadas para a próxima entrega estão em [`entrega-assets-campanha-2255.md`](entrega-assets-campanha-2255.md).

## Verificação local

```bash
npm run lint
npm run build
```

Em 15/08/2026 o build concluiu normalmente. O lint do repositório está bloqueado por incompatibilidade já presente entre ESLint 9.39.4 e `@typescript-eslint` ao carregar a regra `no-unused-expressions`; a falha acontece antes da análise dos arquivos alterados.

Para revisão visual, iniciar `npm run dev` e conferir `/` e `/institucional` em larguras de 390 px, 768 px e 1440 px.
