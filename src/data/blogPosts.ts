export type BlogPost = {
  slug: string;
  source: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  date: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "cobranca-indevida-apos-cancelamento",
    source: "Diário do Rio",
    title: "Cancelei o serviço e continuam cobrando: o que fazer diante de uma cobrança indevida após o cancelamento",
    excerpt: "Cobrança após cancelamento é irregular. Saiba como reunir provas, exigir o fim da cobrança e pedir devolução em dobro.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-03-25",
    image: "/images/gutemberg-coluna.jpg",
    metaTitle: "Cobrança indevida após cancelamento: saiba seus direitos",
    metaDescription: "Cancelou o serviço e ainda está sendo cobrado? Saiba o que fazer diante de uma cobrança indevida após o cancelamento e como pedir devolução em dobro.",
    content: `
      <p><strong>Academia, internet, streaming ou TV por assinatura — cobrar depois do cancelamento é prática irregular.</strong> Saiba como se proteger, exigir seus direitos e, se necessário, pedir a devolução em dobro do que pagou.</p>
      <p>Você pediu o cancelamento, anotou o protocolo, recebeu a confirmação — e mesmo assim, semanas depois, a fatura chega como se nada tivesse acontecido.</p>
      <p>Essa situação é mais comum do que deveria, e acontece com todo tipo de serviço: academia, provedor de internet, plataforma de streaming, TV por assinatura.</p>
      <h2>Por que guardar o protocolo de cancelamento é tão importante?</h2>
      <p>O protocolo é a sua prova. Sem ele, fica muito mais difícil comprovar que você pediu o cancelamento formalmente.</p>
      <ul>
        <li>O número do protocolo</li>
        <li>A data e o horário do pedido</li>
        <li>O nome do atendente, se for por telefone</li>
      </ul>
      <h2>A cobrança continuou mesmo assim. O que fazer agora?</h2>
      <ol>
        <li>Registre reclamação diretamente na empresa</li>
        <li>Guarde todas as faturas e comprovantes de pagamento</li>
        <li>Exija a devolução dos valores pagos indevidamente</li>
      </ol>
      <p>Se você pagou algo que não devia, a legislação garante a devolução em dobro, com correção monetária e juros.</p>
      <h2>Problema persiste? Acione os órgãos de defesa do consumidor</h2>
      <p>Você pode registrar sua reclamação nos canais oficiais e também nos contatos do Gutemberg para orientação.</p>
      <h2>Cancelar é um direito. Cobrar depois é infração.</h2>
      <p>Guarde tudo, exija seus direitos e, se precisar de ajuda, acione os canais de defesa do consumidor.</p>
    `
  }
];
