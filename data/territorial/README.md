# Dados do Mapa territorial

Fontes usadas por `npm run data:territorial` para gerar `public/data/territorial/*.json`.

| Arquivo | Origem | Observação |
|---|---|---|
| `docs/eleicao-2022/*.csv` | TSE — votação por seção 2022, candidato 2255 | Fora do git (`.gitignore`). Necessários só para regenerar os JSON. |
| `ga4_cidades_2026.csv` | GA4 → Usuário → Cidade (print de setembro/2026) | Separador `,`, ponto decimal. Tempo em segundos. Taxa em pontos percentuais. |
| `ga4_paises_2026.csv` | GA4 → Usuário → País (setembro/2026) | Mesmos números da aba “Público”. |
| `public/data/territorial/rj_municipios.geojson` | IBGE (malha municipal + localidades) | Gerado por `npm run data:rj-geojson`. |

## Regras

- Célula vazia no GA4 significa **valor não importado** (sem dado), nunca zero.
- Cidades fora do Brasil e `(not set)` ficam no arquivo bruto e aparecem só em “Qualidade do tráfego”. Elas nunca entram no mapa.
- Não marcar cidade como bot sem evidência da ferramenta (ex.: filtro de bots do Clarity).
- Para atualizar o GA4, substitua as linhas pelos números do novo recorte e rode `npm run data:territorial`.
