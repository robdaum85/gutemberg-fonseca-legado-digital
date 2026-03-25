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
  },
  {
    slug: "credito-consignado-atencao-aos-seus-direitos",
    source: "Diário do Rio",
    title: "Crédito consignado: atenção aos seus direitos antes de contratar",
    excerpt: "Saiba quais são seus direitos ao contratar crédito consignado e como se proteger de abusos.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2025-03-01",
    image: "",
    metaTitle: "Crédito consignado: atenção aos seus direitos antes de contratar",
    metaDescription: "Saiba quais são seus direitos ao contratar crédito consignado e como se proteger de abusos.",
    content: `
      <p>O crédito consignado é uma das modalidades de empréstimo mais populares no Brasil, especialmente entre aposentados, pensionistas e servidores públicos. Porém, é fundamental conhecer seus direitos antes de contratar.</p>
      <h2>O que é o crédito consignado?</h2>
      <p>O crédito consignado é um tipo de empréstimo em que as parcelas são descontadas diretamente do salário ou benefício do contratante. Isso garante taxas de juros mais baixas, mas exige atenção a alguns pontos importantes.</p>
      <h2>Seus direitos</h2>
      <ul>
        <li>A margem consignável não pode ultrapassar 35% da renda líquida</li>
        <li>Você tem direito à portabilidade do crédito</li>
        <li>É proibida a contratação sem autorização expressa</li>
        <li>Você pode cancelar em até 7 dias após a contratação</li>
      </ul>
      <p>Fique atento e não assine nada sem ler atentamente todas as cláusulas do contrato.</p>
    `
  },
  {
    slug: "turismo-de-verao-direitos-do-hospede",
    source: "Diário do Rio",
    title: "Turismo de verão: hotéis, pousadas e os direitos do hóspede",
    excerpt: "Conheça os direitos que todo hóspede tem ao se hospedar em hotéis e pousadas no período de verão.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2025-02-15",
    image: "",
    metaTitle: "Turismo de verão: hotéis, pousadas e os direitos do hóspede",
    metaDescription: "Conheça os direitos que todo hóspede tem ao se hospedar em hotéis e pousadas.",
    content: `
      <p>O verão é época de viagens e lazer, mas é importante conhecer seus direitos como hóspede para evitar surpresas desagradáveis.</p>
      <h2>Direitos do hóspede</h2>
      <ul>
        <li>Informação clara sobre preços e taxas</li>
        <li>Condições adequadas de higiene e segurança</li>
        <li>Cumprimento do que foi ofertado na reserva</li>
        <li>Direito a cancelamento conforme o CDC</li>
      </ul>
      <p>Caso tenha problemas, registre tudo com fotos e procure os órgãos de defesa do consumidor.</p>
    `
  },
  {
    slug: "trocas-pos-natal-o-que-loja-obrigada-aceitar",
    source: "Diário do Rio",
    title: "Trocas pós-Natal: o que a loja é obrigada a aceitar",
    excerpt: "Entenda quais são as regras para trocas de presentes após o Natal e seus direitos como consumidor.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2025-01-10",
    image: "",
    metaTitle: "Trocas pós-Natal: o que a loja é obrigada a aceitar",
    metaDescription: "Entenda quais são as regras para trocas de presentes após o Natal.",
    content: `
      <p>Após o Natal, muitos consumidores procuram as lojas para trocar presentes. Mas afinal, a loja é obrigada a aceitar a troca?</p>
      <h2>Quando a troca é obrigatória</h2>
      <p>A troca é obrigatória quando o produto apresenta defeito. Nesse caso, o fornecedor tem 30 dias para resolver o problema.</p>
      <h2>Quando a troca não é obrigatória</h2>
      <p>Se o produto não apresenta defeito, a troca depende da política da loja. Porém, se a loja prometeu a troca no momento da compra, deve cumprir.</p>
      <h2>Compras online</h2>
      <p>Para compras feitas pela internet, o consumidor tem o direito de arrependimento em até 7 dias após o recebimento.</p>
    `
  },
  {
    slug: "prazo-entrega-atrasos-compra-nao-chega",
    source: "Diário do Rio",
    title: "Prazo de entrega e atrasos: o que fazer quando a compra não chega",
    excerpt: "Saiba como agir quando o produto comprado não é entregue no prazo prometido.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2025-01-05",
    image: "",
    metaTitle: "Prazo de entrega e atrasos: o que fazer quando a compra não chega",
    metaDescription: "Saiba como agir quando o produto comprado não é entregue no prazo prometido.",
    content: `
      <p>O atraso na entrega de produtos é uma das reclamações mais frequentes nos órgãos de defesa do consumidor.</p>
      <h2>O que diz a lei</h2>
      <p>O Código de Defesa do Consumidor estabelece que o não cumprimento do prazo de entrega configura descumprimento de oferta.</p>
      <h2>O que você pode fazer</h2>
      <ul>
        <li>Exigir o cumprimento forçado da entrega</li>
        <li>Aceitar produto equivalente</li>
        <li>Cancelar a compra com restituição integral</li>
      </ul>
      <p>Guarde sempre o comprovante de compra e prints com o prazo prometido.</p>
    `
  },
  {
    slug: "compras-online-golpes-pix-seguranca",
    source: "Diário do Rio",
    title: "Compras online e golpes no PIX: como comprar com segurança e evitar prejuízos",
    excerpt: "Dicas essenciais para se proteger de golpes ao fazer compras online e pagamentos via PIX.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2024-12-20",
    image: "",
    metaTitle: "Compras online e golpes no PIX: como comprar com segurança",
    metaDescription: "Dicas essenciais para se proteger de golpes ao fazer compras online e pagamentos via PIX.",
    content: `
      <p>Com o crescimento das compras online, os golpes digitais também aumentaram significativamente. O PIX, por sua praticidade, tornou-se alvo de criminosos.</p>
      <h2>Dicas de segurança</h2>
      <ul>
        <li>Verifique sempre a reputação da loja</li>
        <li>Desconfie de preços muito abaixo do mercado</li>
        <li>Nunca faça PIX para desconhecidos</li>
        <li>Use cartão virtual para compras online</li>
        <li>Ative a autenticação em dois fatores</li>
      </ul>
      <h2>Caí em um golpe, e agora?</h2>
      <p>Registre um boletim de ocorrência, entre em contato com o banco e procure o PROCON.</p>
    `
  },
  {
    slug: "direitos-basicos-consumidor-cidadao",
    source: "Diário do Rio",
    title: "Os direitos básicos do consumidor que todo cidadão precisa conhecer",
    excerpt: "Conheça os direitos fundamentais previstos no Código de Defesa do Consumidor.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2024-12-10",
    image: "",
    metaTitle: "Os direitos básicos do consumidor que todo cidadão precisa conhecer",
    metaDescription: "Conheça os direitos fundamentais previstos no Código de Defesa do Consumidor.",
    content: `
      <p>O Código de Defesa do Consumidor (CDC) é uma das leis mais importantes para a proteção dos direitos dos brasileiros. Conheça os direitos básicos que todo cidadão deve saber.</p>
      <h2>Direitos fundamentais</h2>
      <ul>
        <li>Proteção da vida, saúde e segurança</li>
        <li>Educação e informação sobre consumo</li>
        <li>Proteção contra publicidade enganosa</li>
        <li>Modificação de cláusulas abusivas</li>
        <li>Reparação de danos</li>
        <li>Acesso à justiça</li>
      </ul>
      <p>Conhecer seus direitos é o primeiro passo para exercer sua cidadania de forma plena.</p>
    `
  },
  {
    slug: "ano-novo-mesmos-golpes-fraudes-digitais",
    source: "Diário do Vale",
    title: "Ano novo, mesmos golpes: fraudes digitais em alta",
    excerpt: "Alerta sobre as principais fraudes digitais que continuam fazendo vítimas no novo ano.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2025-01-15",
    image: "",
    metaTitle: "Ano novo, mesmos golpes: fraudes digitais em alta",
    metaDescription: "Alerta sobre as principais fraudes digitais que continuam fazendo vítimas.",
    content: `
      <p>O início de um novo ano traz esperança, mas infelizmente os golpes digitais continuam em alta. Criminosos se reinventam e usam novas estratégias para enganar consumidores.</p>
      <h2>Golpes mais comuns</h2>
      <ul>
        <li>Falso boleto bancário</li>
        <li>Clonagem de WhatsApp</li>
        <li>Phishing por e-mail e SMS</li>
        <li>Falsas promoções em redes sociais</li>
      </ul>
      <h2>Como se proteger</h2>
      <p>Desconfie de ofertas muito boas, verifique links antes de clicar e nunca compartilhe dados pessoais por mensagem.</p>
    `
  },
  {
    slug: "direitos-consumidor-desastres-naturais",
    source: "Diário do Vale",
    title: "Direitos do consumidor em tempos de desastres naturais",
    excerpt: "Saiba quais são seus direitos como consumidor em situações de desastres naturais.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2025-01-20",
    image: "",
    metaTitle: "Direitos do consumidor em tempos de desastres naturais",
    metaDescription: "Saiba quais são seus direitos como consumidor em situações de desastres naturais.",
    content: `
      <p>Em tempos de desastres naturais, os consumidores ficam ainda mais vulneráveis. É fundamental conhecer seus direitos para evitar abusos.</p>
      <h2>Seus direitos</h2>
      <ul>
        <li>Proibição de aumento abusivo de preços</li>
        <li>Direito à informação clara sobre produtos e serviços</li>
        <li>Renegociação de dívidas e contratos</li>
        <li>Seguro: cobertura para danos causados por eventos naturais</li>
      </ul>
      <p>Denuncie abusos ao PROCON e registre todas as evidências possíveis.</p>
    `
  },
  {
    slug: "armadilhas-direitos-black-friday",
    source: "Diário do Vale",
    title: "Não caia em armadilhas: conheça seus direitos na Black Friday",
    excerpt: "Guia completo sobre os direitos do consumidor durante a Black Friday.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2024-11-25",
    image: "",
    metaTitle: "Não caia em armadilhas: conheça seus direitos na Black Friday",
    metaDescription: "Guia completo sobre os direitos do consumidor durante a Black Friday.",
    content: `
      <p>A Black Friday é uma das datas mais aguardadas para compras, mas também é quando mais golpes acontecem. Conheça seus direitos.</p>
      <h2>Cuidados essenciais</h2>
      <ul>
        <li>Pesquise preços antes — evite a "metade do dobro"</li>
        <li>Verifique a reputação da loja</li>
        <li>Guarde prints de ofertas e preços</li>
        <li>Compras online: direito de arrependimento em 7 dias</li>
      </ul>
      <h2>Propaganda enganosa</h2>
      <p>Se o desconto anunciado não for real, é propaganda enganosa. Denuncie ao PROCON.</p>
    `
  },
  {
    slug: "compras-natal-golpes-proteger-direitos",
    source: "Diário do Vale",
    title: "Cuidado com as compras de Natal: saiba como evitar golpes e proteger seus direitos",
    excerpt: "Orientações para fazer compras de Natal seguras e conhecer seus direitos.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2024-12-15",
    image: "",
    metaTitle: "Cuidado com as compras de Natal: evite golpes e proteja seus direitos",
    metaDescription: "Orientações para fazer compras de Natal seguras e conhecer seus direitos.",
    content: `
      <p>O Natal é época de presentes e alegria, mas também de oportunidades para golpistas. Proteja-se com conhecimento.</p>
      <h2>Dicas para compras seguras</h2>
      <ul>
        <li>Compare preços em diferentes lojas</li>
        <li>Prefira lojas conhecidas e com boa reputação</li>
        <li>Guarde todos os comprovantes</li>
        <li>Verifique a política de trocas antes de comprar</li>
      </ul>
      <h2>Compras pela internet</h2>
      <p>Verifique se o site é seguro (cadeado no navegador), use cartão virtual e desconfie de preços muito baixos.</p>
    `
  },
  {
    slug: "golpe-maquininha-orienta-consumidores",
    source: "Diário do Vale",
    title: "Advogado Gutemberg Fonseca alerta sobre golpe da 'maquininha' e orienta consumidores",
    excerpt: "Alerta sobre o golpe da maquininha de cartão e orientações para se proteger.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2024-11-10",
    image: "",
    metaTitle: "Golpe da maquininha: como se proteger",
    metaDescription: "Alerta sobre o golpe da maquininha de cartão e orientações para consumidores.",
    content: `
      <p>O golpe da maquininha tem feito cada vez mais vítimas. Criminosos utilizam dispositivos adulterados para roubar dados de cartões.</p>
      <h2>Como funciona o golpe</h2>
      <p>O golpista utiliza uma maquininha com visor quebrado ou adulterado, cobrando valores diferentes do informado verbalmente. Em outros casos, a maquininha clona os dados do cartão.</p>
      <h2>Como se proteger</h2>
      <ul>
        <li>Sempre confira o valor no visor antes de digitar a senha</li>
        <li>Nunca entregue seu cartão para terceiros</li>
        <li>Prefira pagamento por aproximação (NFC)</li>
        <li>Ative as notificações do banco para cada transação</li>
      </ul>
      <p>Se foi vítima, registre B.O. e entre em contato com seu banco imediatamente.</p>
    `
  }
];
