# Plano: Exército do Consumidor

Adicionar uma área de mobilização ao site sem alterar estrutura, sections ou identidade visual existentes. Todos os envios abrem WhatsApp com mensagem pré-formatada (`https://wa.me/...` + `encodeURIComponent`). Sem backend, sem Google Forms.

## Arquivos novos

```text
src/config/mobilizacao.ts         → constantes (WhatsApp, redes sociais, labels)
src/lib/whatsapp.ts               → helper buildWhatsAppUrl(tipo, campos)
src/components/mobilizacao/
  ExercitoHero.tsx                → section principal com CTAs
  FormApoiador.tsx                → formulário Apoiador
  FormLideranca.tsx               → formulário Liderança
  FormDenuncia.tsx                → formulário Denúncia (com aviso)
  WelcomePopup.tsx                → pop-up inicial (mini-Linktree)
```

## Arquivos modificados

- `src/pages/Index.tsx` — inserir `<ExercitoHero />`, `<FormApoiador />`, `<FormLideranca />`, `<FormDenuncia />` após `<Blog />` (ou antes de `<ContactSection />`), e montar `<WelcomePopup />` no topo.
- `src/components/Footer.tsx` — adicionar links rápidos: Apoiador, Liderança, Denúncia (opcional, mantém padrão).

Nada mais é alterado. Componentes existentes (`Button`, `Input`, `Label`, `Textarea`, `useToast`) são reaproveitados. Tokens do design system (`bg-primary`, `bg-gradient-primary`, Poppins/Inter) mantidos.

## Section 1 — Mobilização (ExercitoHero)
- id: `exercito`
- Título: "Faça parte do Exército do Consumidor."
- Subtítulo conforme briefing.
- 3 botões com `scrollIntoView({behavior:'smooth'})` para `#apoiador`, `#lideranca`, `#denuncia`.
- Visual: fundo gradiente `bg-gradient-primary` com texto em `text-primary`, mesma vibe da seção Hero/Stats.

## Section 2 — Apoiador (`#apoiador`)
Campos obrigatórios: Nome, Cidade, Bairro, WhatsApp. Opcional: Mensagem.
Botão "Enviar como apoiador" → WhatsApp tipo `APOIADOR`.

## Section 3 — Liderança (`#lideranca`)
Campos obrigatórios: Nome, Cidade, Bairro, WhatsApp, Área de atuação. Opcionais: Redes sociais, Mensagem.
Botão "Enviar cadastro de liderança" → WhatsApp tipo `LIDERANÇA`.

## Section 4 — Denúncia (`#denuncia`)
Campos obrigatórios: Nome, WhatsApp, Empresa/serviço, Cidade, Bairro, Tipo de problema, Descrição.
Aviso: "As informações serão enviadas diretamente pelo WhatsApp. Não compartilhe dados sensíveis além do necessário."
Botão "Enviar denúncia pelo WhatsApp" → WhatsApp tipo `DENÚNCIA`.

Validação client-side com mensagens via `useToast` (padrão já usado em `ContactSection`).

## Pop-up de boas-vindas (WelcomePopup)
- Aparece 1x por sessão (`sessionStorage.setItem('welcome_popup_seen','1')`).
- Título "Bem-vindo ao canal do Guto" + subtítulo.
- Botões: WhatsApp, Instagram, Facebook, Site oficial, Fazer denúncia, Ser apoiador, Ser liderança.
  - Externos abrem em nova aba; internos fecham o popup e fazem scroll para a section.
- Botão X de fechar + link discreto "continuar navegando".
- Desktop: modal central com `backdrop-blur-sm` e `animate-scale-in`.
- Mobile: ocupa ~quase toda a tela (`max-w-md w-[92vw]`), tipografia confortável.
- Implementado com `Dialog` do shadcn (já disponível).

## Detalhes técnicos

`src/config/mobilizacao.ts`:
```ts
export const WHATSAPP_NUMBER = "5521966192498";
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/gutembergpfonseca/",
  facebook:  "https://www.facebook.com/gutembergpfonseca",
  site:      "https://gutemberg-fonseca-legado-digital.lovable.app",
  whatsapp:  `https://wa.me/${WHATSAPP_NUMBER}`,
};
```

`src/lib/whatsapp.ts`:
```ts
type Tipo = "APOIADOR" | "LIDERANÇA" | "DENÚNCIA";
export function buildWhatsAppUrl(tipo: Tipo, intro: string, campos: Record<string,string>) {
  const linhas = Object.entries(campos)
    .filter(([,v]) => v?.trim())
    .map(([k,v]) => `${k}: ${v}`).join("\n");
  const texto = `${intro}\n\n${linhas}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}
```

Cada form chama `window.open(url, '_blank')` após validar campos obrigatórios.

## Fora de escopo
- Não remover/alterar sections existentes.
- Não tocar em rotas, blog, ou estilo global.
- Sem persistência de dados.