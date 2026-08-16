# Expansão editorial do legado

Implementação experimental baseada no arquivo `PANFLETO - LEGADO GUTEMBERG FONSECA - SEPARADO.pdf`.

O PDF foi usado como fonte editorial histórica, não como instrução técnica nem como comprovação independente. As seções anteriores do site foram preservadas. Foram adicionados quatro blocos:

1. `Da Merck para o Brasil`;
2. `Do apito à gestão`;
3. linha do tempo de 2007 a 2023;
4. entregas, indicadores e casos do legado.

## Snapshot anterior

Antes da implementação, as versões de `ApresentacaoFederalPage.tsx` e `ApresentacaoFederalPage.css` foram armazenadas no stash local:

```text
stash@{0}: snapshot-pre-legado-pdf-2026-08-15
```

Para restaurar somente a página ao estado anterior, após confirmação explícita:

```powershell
git restore --source='stash@{0}' -- src/pages/ApresentacaoFederalPage.tsx src/pages/ApresentacaoFederalPage.css
```

Não executar a restauração sem confirmação, pois ela remove as novas seções desses dois arquivos.

## Fotografias a entregar

Pasta sugerida: `public/images/federal/legacy/`

| Arquivo | Tamanho recomendado | Uso |
| --- | ---: | --- |
| `legado-origem-merck.webp` | 1600 × 1200 px | Feira, infância ou comunidade da Merck |
| `legado-arbitragem-fifa.webp` | 1600 × 1200 px | Gutemberg durante a carreira de árbitro |
| `legado-crise-covid.webp` | 1600 × 1000 px | Gestão do Gabinete de Crise ou hospital de campanha |
| `legado-consumidor-fiscalizacao.webp` | 1600 × 1000 px | Fiscalização ou atendimento ao consumidor |
| `legado-esporte-inclusao.webp` | 1600 × 1000 px | Bolsa Atleta, campo esportivo ou Caravana do Esporte |
| `legado-exercito-consumidor.webp` | 1920 × 1080 px | Fotografia coletiva para a mobilização |

Preferir WebP, perfil sRGB e qualidade entre 82 e 88. Manter os arquivos originais fora da pasta pública.

## Validação factual pendente

- padronizar o total de anos de atuação pública;
- confirmar os cargos e as datas de 2012 e 2013;
- confirmar o período e o critério do número de 1,3 milhão de atendimentos;
- confirmar o período dos mais de R$ 14 milhões renegociados;
- confirmar 600 bolsas para atletas e paratletas;
- confirmar mais de 15 campos esportivos;
- reunir links públicos para as ações de fiscalização, Covid-19 e esporte;
- definir a atribuição correta entre participação pessoal, equipe, secretaria e governo.

Os indicadores permanecem visualmente marcados como `Validação documental em andamento` até essa conferência.
