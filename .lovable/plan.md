

## Plano: Substituir Vídeo Central + Verificação do Analytics

### 1. Substituição do Vídeo Central

**Arquivo:** `src/components/MultimediaClipping.tsx`

| Posição | Vídeo Atual | Novo Vídeo |
|---------|-------------|------------|
| Central (2º) | `1sdH4i3vztA` - "Troca de Presentes" | `zabK3YJIGFE` |

**Código atual (linhas 37-41):**
```javascript
{
  id: "1sdH4i3vztA",
  title: "Troca de Presentes",
  caption: "RJTV 2 (TV Rio Sul) – Janeiro/2026",
},
```

**Código após alteração:**
```javascript
{
  id: "zabK3YJIGFE",
  title: "[Título a buscar do YouTube]",
  caption: "[Data/Veículo a definir]",
},
```

Vou buscar o título do vídeo automaticamente do YouTube ao implementar.

---

### 2. Verificação do Google Analytics

**Status: ✅ Instalado Corretamente**

O Google Analytics 4 está configurado no arquivo `index.html` (linhas 33-41):

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-GQTGRP15XX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-GQTGRP15XX');
</script>
```

**Checklist de Implementação:**

| Item | Status |
|------|--------|
| Script gtag.js carregado assincronamente | ✅ |
| ID de medição correto (G-GQTGRP15XX) | ✅ |
| dataLayer inicializado | ✅ |
| Função gtag definida | ✅ |
| Configuração do ID executada | ✅ |
| Posição no `<head>` (antes do body) | ✅ |

**Recomendação:** Para verificar se os dados estão sendo coletados, acesse o [Google Analytics](https://analytics.google.com/) e verifique:
- Relatório em Tempo Real
- Eventos recebidos nas últimas 24h

---

### Resumo das Alterações

| Arquivo | Alteração |
|---------|-----------|
| `src/components/MultimediaClipping.tsx` | Substituir ID do vídeo central de `1sdH4i3vztA` para `zabK3YJIGFE` |

