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
    excerpt:
      "Cobrança após cancelamento é irregular. Saiba como reunir provas, exigir o fim da cobrança e pedir devolução em dobro.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-03-25",
    image: "/images/gutemberg-coluna.jpg",
    metaTitle: "Cobrança indevida após cancelamento: saiba seus direitos",
    metaDescription:
      "Cancelou o serviço e ainda está sendo cobrado? Saiba o que fazer diante de uma cobrança indevida após o cancelamento e como pedir devolução em dobro.",
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
  },

  {
    slug: "credito-consignado-atencao-aos-seus-direitos-antes-de-contratar",
    source: "Diário do Rio",
    title: "Crédito consignado: atenção aos seus direitos antes de contratar",
    excerpt:
      "Antes de assinar um contrato de crédito consignado, o consumidor precisa entender taxas, descontos e riscos envolvidos.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-03-26",
    image: "/images/gutemberg-coluna.jpg",
    metaTitle: "Crédito consignado: atenção aos seus direitos antes de contratar",
    metaDescription:
      "Saiba quais cuidados tomar antes de contratar crédito consignado e conheça os direitos do consumidor para evitar problemas.",
    content: `
      <p><strong>O crédito consignado pode parecer uma solução rápida, mas exige atenção redobrada antes da contratação.</strong></p>
      <p>Antes de assinar qualquer contrato, o consumidor deve verificar taxas, prazo de pagamento, valor total financiado e impacto das parcelas no orçamento mensal.</p>
      <h2>O que avaliar antes de contratar</h2>
      <ul>
        <li>Taxa de juros aplicada</li>
        <li>Valor final do contrato</li>
        <li>Quantidade de parcelas</li>
        <li>Desconto mensal no benefício ou salário</li>
      </ul>
      <h2>Cuidado com assédio comercial</h2>
      <p>Ofertas insistentes por telefone, mensagens e promessas de facilidade merecem atenção. O consumidor não deve contratar por pressão.</p>
      <h2>Leia antes de assinar</h2>
      <p>Nunca aceite contratação sem acesso claro ao contrato e às condições completas da operação.</p>
      <h2>Em caso de irregularidade</h2>
      <p>Se houver cobrança indevida, contratação sem consentimento ou falta de transparência, procure os órgãos de defesa do consumidor.</p>
    `
  },

  {
    slug: "turismo-de-verao-hoteis-pousadas-e-os-direitos-do-hospede",
    source: "Diário do Rio",
    title: "Turismo de verão: hotéis, pousadas e os direitos do hóspede",
    excerpt:
      "Reservas, cancelamentos, overbooking e qualidade do serviço: veja os principais direitos do consumidor na hospedagem.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-03-26",
    image: "/images/gutemberg-coluna.jpg",
    metaTitle: "Turismo de verão: hotéis, pousadas e os direitos do hóspede",
    metaDescription:
      "Vai viajar? Entenda os direitos do hóspede em hotéis e pousadas, inclusive em casos de reserva, cancelamento e falhas no serviço.",
    content: `
      <p><strong>Viajar no verão exige planejamento, e isso inclui conhecer os direitos do consumidor na hospedagem.</strong></p>
      <p>Ao reservar hotel ou pousada, é fundamental guardar comprovantes, condições da oferta e política de cancelamento.</p>
      <h2>O que o estabelecimento deve cumprir</h2>
      <ul>
        <li>Preço anunciado</li>
        <li>Categoria e estrutura prometidas</li>
        <li>Serviços inclusos na oferta</li>
        <li>Condições informadas no momento da reserva</li>
      </ul>
      <h2>Problemas comuns</h2>
      <p>Overbooking, quarto diferente do contratado, ausência de serviços anunciados e cobrança extra indevida são situações que podem gerar reclamação e reparação.</p>
      <h2>Guarde provas</h2>
      <p>Fotos, prints, e-mails e recibos ajudam a comprovar a falha na prestação do serviço.</p>
      <h2>Se não resolver</h2>
      <p>O consumidor pode procurar os órgãos de defesa do consumidor para buscar solução administrativa e orientação adequada.</p>
    `
  },

  {
    slug: "trocas-pos-natal-o-que-a-loja-e-obrigada-a-aceitar",
    source: "Diário do Rio",
    title: "Trocas pós-Natal: o que a loja é obrigada a aceitar",
    excerpt:
      "Nem toda troca é obrigatória, mas o consumidor tem direitos claros quando há defeito, vício ou descumprimento da oferta.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-03-26",
    image: "/images/gutemberg-coluna.jpg",
    metaTitle: "Trocas pós-Natal: o que a loja é obrigada a aceitar",
    metaDescription:
      "Entenda quando a loja é obrigada a trocar produtos após o Natal e quais são os direitos do consumidor em caso de defeito ou vício.",
    content: `
      <p><strong>Depois do Natal, muita gente procura as lojas para trocar presentes — mas é importante entender quando a troca é um direito e quando depende da política do estabelecimento.</strong></p>
      <h2>Quando a troca é obrigatória</h2>
      <p>Se o produto apresenta defeito, vício de qualidade ou não corresponde ao que foi ofertado, a loja ou fabricante deve solucionar o problema.</p>
      <h2>Quando a troca não é obrigatória</h2>
      <p>Nos casos em que o produto está perfeito e a pessoa apenas não gostou de cor, tamanho ou modelo, a troca depende da política comercial da loja.</p>
      <h2>Comprovantes são essenciais</h2>
      <p>Nota fiscal, etiqueta, embalagem e prova da compra facilitam o atendimento e a solução do problema.</p>
      <h2>Oferta vincula o fornecedor</h2>
      <p>Se a loja prometeu troca em determinado prazo, precisa cumprir o que anunciou.</p>
    `
  },

  {
    slug: "prazo-de-entrega-e-atrasos-o-que-fazer-quando-a-compra-nao-chega",
    source: "Diário do Rio",
    title: "Prazo de entrega e atrasos: o que fazer quando a compra não chega",
    excerpt:
      "Atraso na entrega não é mero detalhe. Saiba como cobrar a empresa, exigir solução e proteger seus direitos.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-03-26",
    image: "/images/gutemberg-coluna.jpg",
    metaTitle: "Prazo de entrega e atrasos: o que fazer quando a compra não chega",
    metaDescription:
      "Seu pedido atrasou ou não chegou? Veja quais são os direitos do consumidor diante do descumprimento do prazo de entrega.",
    content: `
      <p><strong>Quando a compra não chega no prazo prometido, o consumidor não é obrigado a aceitar silêncio, desculpas vagas ou espera indefinida.</strong></p>
      <p>O prazo de entrega integra a oferta e deve ser cumprido pela empresa.</p>
      <h2>O que fazer diante do atraso</h2>
      <ol>
        <li>Registre reclamação formal com a empresa</li>
        <li>Guarde prints, e-mails e comprovantes</li>
        <li>Peça uma solução clara e prazo objetivo</li>
      </ol>
      <h2>O consumidor pode exigir</h2>
      <ul>
        <li>Entrega do produto</li>
        <li>Cancelamento da compra</li>
        <li>Devolução do valor pago</li>
      </ul>
      <h2>Não aceite indefinição</h2>
      <p>Se a empresa não cumpre a oferta nem resolve o problema, cabe reclamação aos órgãos de defesa do consumidor.</p>
    `
  },

  {
    slug: "compras-online-e-golpes-no-pix-como-comprar-com-seguranca-e-evitar-prejuizos",
    source: "Diário do Rio",
    title: "Compras online e golpes no PIX: como comprar com segurança e evitar prejuízos",
    excerpt:
      "Descontos mirabolantes, perfis falsos e pagamento instantâneo exigem atenção. Veja como evitar golpes nas compras online.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-03-26",
    image: "/images/gutemberg-coluna.jpg",
    metaTitle: "Compras online e golpes no PIX: como comprar com segurança e evitar prejuízos",
    metaDescription:
      "Aprenda a identificar sinais de golpe em compras online com PIX e saiba como se proteger antes de pagar.",
    content: `
      <p><strong>Comprar online é prático, mas exige cautela, especialmente quando o pagamento é feito por PIX.</strong></p>
      <p>Golpistas exploram urgência, preços muito baixos e perfis falsos para induzir o consumidor ao erro.</p>
      <h2>Sinais de alerta</h2>
      <ul>
        <li>Preço muito abaixo do mercado</li>
        <li>Pressa para fechar a compra</li>
        <li>Perfil sem histórico confiável</li>
        <li>Ausência de canais formais de atendimento</li>
      </ul>
      <h2>Antes de pagar</h2>
      <p>Pesquise reputação, confira CNPJ quando houver, verifique comentários reais e desconfie de promessas excessivas.</p>
      <h2>PIX exige ainda mais cuidado</h2>
      <p>Como o pagamento é instantâneo, recuperar valores pode ser mais difícil quando há fraude.</p>
      <h2>Se cair em golpe</h2>
      <p>Registre imediatamente boletim de ocorrência, avise a instituição financeira e reúna todas as provas da transação.</p>
    `
  },

  {
    slug: "os-direitos-basicos-do-consumidor-que-todo-cidadao-precisa-conhecer",
    source: "Diário do Rio",
    title: "Os direitos básicos do consumidor que todo cidadão precisa conhecer",
    excerpt:
      "Informação clara, proteção contra abusos e reparação por danos estão entre os direitos fundamentais do consumidor.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-03-26",
    image: "/images/gutemberg-coluna.jpg",
    metaTitle: "Os direitos básicos do consumidor que todo cidadão precisa conhecer",
    metaDescription:
      "Conheça os direitos básicos do consumidor e entenda por que informação, segurança e respeito devem fazer parte de toda relação de consumo.",
    content: `
      <p><strong>Conhecer os direitos básicos do consumidor é o primeiro passo para evitar abusos e exigir respeito nas relações de consumo.</strong></p>
      <h2>Direito à informação</h2>
      <p>Todo consumidor deve receber informações claras, corretas e completas sobre produtos e serviços.</p>
      <h2>Proteção contra publicidade enganosa</h2>
      <p>Promessas falsas, omissões importantes e anúncios que induzem ao erro violam a legislação.</p>
      <h2>Reparação por danos</h2>
      <p>Quando há prejuízo causado por falha do fornecedor, o consumidor pode exigir reparação.</p>
      <h2>Acesso à justiça e aos órgãos de defesa</h2>
      <p>O consumidor não está sozinho. Existem canais de atendimento, conciliação e fiscalização para apoiar a defesa de seus direitos.</p>
      <h2>Informação é proteção</h2>
      <p>Quanto mais consciente o cidadão estiver, menor o espaço para práticas abusivas e desrespeito.</p>
    `
  }
];