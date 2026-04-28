export type BlogPost = {
  slug: string;
  source: string;
  category: string;
  title: string;
  subTitle?: string;
  excerpt: string;
  author: string;
  role: string;
  date: string;
  authorImage: string;
  coverImage?: string;
  metaTitle: string;
  metaDescription: string;
  readingTime?: string;
  tags?: string[];
  featured?: boolean;
  content: string;
  
};

export const blogPosts: BlogPost[] = [
  {
  slug: "delivery-sem-dor-de-cabeca-conheca-seus-direitos",
  source: "Coluna",
  category: "Defesa do Consumidor",
  title: "Delivery sem dor de cabeça: conheça seus direitos",
  subTitle: "Pedido errado, atraso ou qualidade ruim? Saiba como agir e não sair no prejuízo.",
  excerpt: "Problemas com delivery são comuns, mas o consumidor não precisa arcar com prejuízo. O Código de Defesa do Consumidor garante reembolso, correção ou reenvio em caso de falhas no serviço.",
  author: "Gutemberg Fonseca",
  role: "Especialista em Defesa do Consumidor",
  date: "2026-04-25",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/delivery.png",
  metaTitle: "Delivery sem dor de cabeça: conheça seus direitos",
  metaDescription: "Saiba o que fazer quando o pedido chega errado, atrasado ou em condições inadequadas. O consumidor tem direito a reembolso, troca ou correção do serviço.",
  readingTime: "4 min de leitura",
  tags: [
    "delivery",
    "direitos do consumidor",
    "pedido errado",
    "atraso entrega",
    "CDC",
    "Gutemberg Fonseca"
  ],
  featured: false,
  content: `

    <h1>Delivery sem dor de cabeça: conheça seus direitos</h1>
    <p><strong>Pedido errado, atraso ou qualidade abaixo do esperado não são problemas que o consumidor deve assumir.</strong></p>

    <p>Pedir comida por aplicativo já faz parte da rotina de muitos consumidores. Ainda assim, problemas como pedido errado, atraso ou qualidade abaixo do esperado continuam frequentes. Nessas situações, o consumidor não deve arcar com prejuízo. O Código de Defesa do Consumidor determina que o serviço seja prestado conforme a oferta.</p>

    <h2>Pedido errado ou incompleto</h2>
    <p>Se o pedido chegar errado ou incompleto, há falha na prestação do serviço. O consumidor pode escolher entre a correção imediata, o reenvio do pedido ou a devolução do valor pago.</p>
    <p>O mesmo se aplica quando o alimento é entregue em condições diferentes das informadas, como temperatura inadequada ou apresentação comprometida.</p>

    <h2>Atraso na entrega</h2>
    <p>Quando há atraso além do prazo informado, ocorre descumprimento da oferta. Nessa hipótese, o consumidor pode cancelar o pedido e solicitar o reembolso integral.</p>

    <h2>Quem é responsável?</h2>
    <p>A responsabilidade pode ser solidária entre o restaurante e a empresa que gerencia o aplicativo, dependendo da forma como o serviço é prestado. Ambos integram a cadeia de fornecimento e podem responder pelo problema.</p>

    <h2>Como se proteger</h2>
    <p>Se acontecer algum problema, é importante registrar a reclamação no próprio aplicativo e guardar comprovantes. Fotos do produto e capturas de tela das mensagens ajudam a demonstrar o ocorrido.</p>
    <p>Se não houver solução, o consumidor pode procurar os órgãos de defesa do consumidor ou utilizar plataformas digitais de reclamação.</p>

    <h2>Direito à qualidade e cumprimento da oferta</h2>
    <p>Praticidade não pode gerar prejuízo. O fornecedor deve cumprir o que foi prometido, no prazo, na forma e na qualidade informados.</p>

    <p>Se quiser fazer uma denúncia sobre esse tema ou qualquer outro, os canais são: Fala Consumidor (SEDCON) pelo WhatsApp (21) 99336-4848 ou pelo Disque 151 do PROCON-RJ. Quem quiser, pode falar comigo pelo “Zap do Guto” (21) 96619-2498. Também estou no @gutembergfonseca.</p>

    <p><em>Gutemberg Fonseca é Especialista em Defesa do Consumidor e ex-Secretário de Estado de Defesa do Consumidor do Rio de Janeiro.</em></p>

  `
},  
  
  {
      slug: "juros-abusivos-cartao-de-credito-limite-divida-rotativo",
      source: "Original",
      category: "Defesa do Consumidor",
      title: "Juros Abusivos no Cartão de Crédito: Existe um Limite que o Banco Não Te Conta",
      subTitle: "Qual o valor máximo que a dívida do cartão pode chegar? Descubra a regra que protege o consumidor.",
      excerpt: "Os juros abusivos no cartão de crédito chegaram a 436% ao ano. Mas existe uma regra que protege o consumidor: sua dívida no rotativo não pode ultrapassar o dobro do valor original. Entenda como funciona.",
      author: "Gutemberg Fonseca",
      role: "Especialista em Defesa do Consumidor",
      date: "2026-04-22",
      authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
      coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/Design-sem-nome-6.png",
      metaTitle: "Juros Abusivos no Cartão de Crédito: Existe um Limite que o Banco Não Te Conta",
      metaDescription: "Os juros abusivos no cartão de crédito chegaram a 436% ao ano. Mas existe uma regra que protege o consumidor: sua dívida no rotativo não pode ultrapassar o dobro do valor original. Entenda como funciona.",
      readingTime: "5 min de leitura",
      tags: [
        "juros cartão de crédito",
        "direitos do consumidor",
        "crédito rotativo",
        "dívida abusiva",
        "Gutemberg Fonseca"
      ],
      featured: true,
      content: `

        <h1>Juros Abusivos no Cartão de Crédito: Existe um Limite que o Banco Não Te Conta</h1>
        <p><strong>Qual o valor máximo que a dívida do cartão pode chegar?</strong></p>
        <p>Eu já ouvi essa história centenas de vezes. A pessoa atrasa uma fatura, paga o mínimo, e de repente a dívida virou um monstro que ela não consegue mais olhar de frente. Parece que não tem saída. Mas tem.</p>

        <h2>O rotativo e os juros de 436% ao ano</h2>
        <p>Quando você não paga a fatura inteira do cartão, o valor restante entra no chamado crédito rotativo. É aí que começa o problema. Os juros do rotativo no Brasil chegaram a 436% ao ano, um dos mais altos do mundo.</p>
        <p>Quem não conhece os próprios direitos fica à mercê de cobranças que crescem sem limite aparente.</p>

        <h2>A regra que poucos conhecem</h2>
        <p>O Banco Central e o Conselho Monetário Nacional estabelecem que, no crédito rotativo e no parcelamento do cartão, a dívida total não pode ultrapassar 100% do valor original. Na prática, isso significa:</p>
        <ul>
          <li>Devia R$ 1.000? Com juros e encargos, o máximo cobrado é R$ 2.000.</li>
        </ul>
        <p>Se a sua dívida já ultrapassou esse valor, você pode questionar a cobrança e usar isso como argumento na negociação com o banco.</p>

        <h2>Como verificar a sua situação</h2>
        <p>Pegue a sua fatura e responda duas perguntas simples:</p>
        <ul>
          <li>Quanto você devia no começo?</li>
          <li>Quanto o banco está cobrando hoje?</li>
        </ul>
        <p>Se o valor atual for mais do que o dobro do original, procure o SAC do banco, o Procon do seu estado ou um advogado especialista em direito do consumidor.</p>

        <h2>Isso não é desculpa pra deixar de pagar</h2>
        <p>Conhecer esse direito não significa ignorar a dívida. Nome sujo e restrição de crédito continuam sendo consequências que prejudicam a sua vida. A melhor saída ainda é quitar a dívida o quanto antes, usando esse limite como argumento na hora de negociar.</p>

        <p>Compartilha esse texto com quem está afogado no cartão. Informação também é um direito.</p>

        <p><em>Gutemberg Fonseca é Especialista em Defesa do Consumidor e ex-Secretário de Estado de Defesa do Consumidor do Rio de Janeiro. Acompanhe mais conteúdos sobre seus direitos no Instagram @gutembergpfonseca.</em></p>
      `
    },
  {
    slug: "como-saber-se-tem-emprestimo-no-meu-nome-banco-central",
    source: "Original",
    category: "Defesa do Consumidor",
    title: "Como saber se tem empréstimo no meu nome: o guia completo para consultar pelo Banco Central",
    subTitle: "Descubra como consultar se tem empréstimo no seu nome pelo Registrato do Banco Central. Passo a passo, riscos de fraude e o que fazer se aparecer dívida que não reconhece.",
    excerpt: "Descubra como consultar se tem empréstimo no seu nome pelo Registrato do Banco Central. Passo a passo, riscos de fraude e o que fazer se aparecer dívida que não reconhece.",
    author: "Gutemberg Fonseca",
    role: "Especialista em Defesa do Consumidor",
    date: "2026-04-20",
    authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
    coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/emprestimo-scaled.jpeg",
    metaTitle: "Como saber se tem empréstimo no meu nome? Consulte grátis no Banco Central",
    metaDescription: "Descubra como consultar se tem empréstimo no seu nome pelo Registrato do Banco Central. Passo a passo, riscos de fraude e o que fazer se aparecer dívida que não reconhece.",
    readingTime: "7 min de leitura",
    tags: [
      "como saber se tem empréstimo no meu nome",
      "consulta empréstimo no meu nome",
      "empréstimo no CPF",
      "Registrato Banco Central",
      "fraude empréstimo no meu nome",
      "dívida no nome que não reconhece",
      "SCR Banco Central"
    ],
    featured: true,
    content: `

      <h1>Como saber se tem empréstimo no meu nome: o guia completo para consultar pelo Banco Central</h1>
      <p>Você sabe exatamente quais empréstimos e financiamentos estão vinculados ao seu CPF agora?</p>
      <p>Se a resposta for \"não tenho certeza\", você não está sozinho. Milhares de brasileiros descobrem, na hora de tentar um crédito ou fechar um financiamento, que existem contratos no seu nome que eles nem se lembram de ter assinado, ou pior, que nunca assinaram.</p>
      <p>A boa notícia: como saber se tem empréstimo no seu nome é mais simples do que parece. E a consulta é gratuita, oficial e leva menos de cinco minutos.</p>

      <h2>Por que você pode ter empréstimos no seu nome sem saber</h2>
      <p>Isso acontece com mais frequência do que as pessoas imaginam. Existem pelo menos três situações comuns:</p>
      <ul>
        <li><strong>Contratos esquecidos:</strong> empréstimos antigos, renegociações ou financiamentos que ainda constam no sistema mesmo depois de pagos.</li>
        <li><strong>Fraudes e golpes:</strong> uso indevido do CPF para contratar crédito sem a sua autorização, um crime que cresce a cada ano no Brasil.</li>
        <li><strong>Erros cadastrais:</strong> registros incorretos feitos por instituições financeiras.</li>
      </ul>
      <p>Em todos esses casos, o primeiro passo é o mesmo: consultar o sistema oficial do Banco Central para saber o que está registrado no seu nome.</p>

      <h2>O que é o Registrato e por que ele existe</h2>
      <p>O Registrato é uma plataforma oficial do Banco Central do Brasil. Ela funciona como uma espécie de extrato financeiro completo: reúne todas as informações sobre empréstimos, financiamentos e operações de crédito vinculadas ao seu CPF, independentemente da instituição financeira que originou o contrato.</p>
      <p>As informações vêm do SCR — Sistema de Informações de Crédito, um banco de dados que todas as instituições financeiras do país são obrigadas a alimentar. Ou seja: se existe um empréstimo no seu nome, ele está lá.</p>
      <p>O acesso é gratuito, o site é oficial (<a href=\"https://registrato.bcb.gov.br\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">registrato.bcb.gov.br</a>) e qualquer cidadão pode consultar.</p>

      <h2>Como saber se tem empréstimo no seu nome: passo a passo pelo Registrato</h2>
      <p>Siga as etapas abaixo. Você vai precisar de uma conta gov.br com nível prata ou ouro para autenticar o acesso.</p>
      <ol>
        <li><strong>Acesse o site oficial:</strong> Entre em <a href=\"https://registrato.bcb.gov.br\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">registrato.bcb.gov.br</a>. Esse é o endereço oficial. Desconfie de qualquer site parecido com nome diferente.</li>
        <li><strong>Faça login com sua conta gov.br:</strong> Clique em \"Entrar com gov.br\" e use seu CPF e senha. Se sua conta ainda for nível bronze, você precisará subir para prata ou ouro para acessar os dados de crédito. Isso pode ser feito pelo próprio aplicativo gov.br, validando sua identidade por biometria facial ou outros métodos.</li>
        <li><strong>Autorize o acesso aos seus dados:</strong> O sistema vai pedir que você autorize a consulta às suas informações financeiras. É uma etapa de segurança obrigatória. Confirme a autorização para continuar.</li>
        <li><strong>Selecione \"Empréstimos e Financiamentos — SCR\":</strong> Na página inicial do Registrato, você vai ver várias categorias de consulta. Clique em \"Empréstimos e Financiamentos — o SCR\".</li>
        <li><strong>Solicite o relatório:</strong> Clique em \"Solicite um novo relatório\". Em seguida, vá em \"Histórico\", escolha o período que deseja consultar (mês e ano) e clique em \"Próximo\".</li>
      </ol>
      <p>Em poucos segundos, o sistema gera um relatório completo com tudo que está registrado no seu nome no sistema financeiro nacional.</p>

      <h2>O que você vai encontrar no relatório</h2>
      <p>O relatório do SCR mostra informações como:</p>
      <ul>
        <li>Nome da instituição financeira</li>
        <li>Tipo de operação (crédito pessoal, financiamento de veículo, consignado, etc.)</li>
        <li>Valor contratado</li>
        <li>Situação do contrato (em aberto, quitado, em atraso)</li>
        <li>Data da operação</li>
      </ul>
      <p>Se aparecer algo que você não reconhece, não ignore. Pode ser um erro ou o início de uma fraude.</p>

      <h2>O que fazer se encontrar algo errado</h2>
      <p>Encontrou um contrato que não é seu? Veja o que fazer:</p>
      <ol>
        <li><strong>Anote todos os detalhes do registro:</strong> Nome da instituição, tipo de operação, valor e data. Você vai precisar dessas informações.</li>
        <li><strong>Entre em contato com a instituição financeira:</strong> Acesse os canais oficiais de atendimento da instituição que aparece no relatório e informe que não reconhece a operação. Exija cancelamento e esclarecimentos formais.</li>
        <li><strong>Registre um boletim de ocorrência:</strong> Se suspeitar de fraude, registre o B.O. na delegacia ou pelo site da Polícia Civil do seu estado. É um passo importante para sua proteção jurídica.</li>
        <li><strong>Faça a reclamação formal no <a href=\"https://consumidor.gov.br\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">consumidor.gov.br</a>:</strong> O consumidor.gov.br é a plataforma oficial do governo federal para reclamações contra empresas. É gratuito e as empresas têm prazo para responder.</li>
        <li><strong>Procure o Procon do seu estado:</strong> Se a instituição não resolver, o Procon pode intermediar e aplicar sanções. No Rio de Janeiro, o Procon-RJ atende presencialmente e online.</li>
      </ol>

      <h2>Erros comuns que as pessoas cometem nessa situação</h2>
      <ul>
        <li><strong>Entrar em contato por canais não oficiais:</strong> Cuidado com números de WhatsApp ou telefones encontrados em buscas no Google. Use sempre os canais oficiais da instituição, disponíveis no site do Banco Central ou no próprio site da empresa.</li>
        <li><strong>Pagar uma dívida sem verificar se é legítima:</strong> Antes de pagar qualquer cobrança que chegue por SMS, WhatsApp ou ligação, consulte o Registrato para confirmar se aquela operação realmente existe no seu nome.</li>
        <li><strong>Achar que não tem direito porque \"assinou um contrato\":</strong> Mesmo que tenha assinado algo, se as condições foram abusivas, a informação foi omitida ou você foi induzido ao erro, você tem direito de questionar. O Código de Defesa do Consumidor protege você.</li>
        <li><strong>Deixar pra depois:</strong> Quanto mais tempo passa, mais difícil fica reverter algumas situações. A consulta é gratuita e rápida. Não tem motivo para esperar.</li>
      </ul>

      <h2>Com que frequência você deve consultar o Registrato</h2>
      <p>Não existe uma regra oficial, mas uma boa prática é consultar ao menos uma vez por ano — ou sempre que:</p>
      <ul>
        <li>Você for solicitar um novo crédito ou financiamento</li>
        <li>Suspeitar que seus dados foram vazados</li>
        <li>Receber cobranças de dívidas que não reconhece</li>
        <li>Notar movimentações estranhas na sua vida financeira</li>
      </ul>
      <p>Fazer isso com regularidade é uma forma de monitorar sua vida financeira e agir rápido se algo estiver errado.</p>

      <h2>Conclusão</h2>
      <p>Saber se tem empréstimo no seu nome não é complicado. O Banco Central disponibilizou uma ferramenta gratuita, oficial e acessível justamente para isso,  e a maioria das pessoas simplesmente não sabe que ela existe.</p>
      <p>Se você chegou até aqui, já deu o primeiro passo: buscou a informação.</p>
      <p>Agora o próximo passo é simples: acesse o <a href=\"https://registrato.bcb.gov.br\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">registrato.bcb.gov.br</a>, faça a consulta e veja com seus próprios olhos o que está registrado no seu CPF.</p>
      <p>Se encontrar algo que não reconhece, não entre em pânico, mas também não ignore. Você tem direitos, e existem caminhos concretos para resolver.</p>
      <p>Compartilhe esse conteúdo com alguém que pode precisar. Muita gente está pagando dívidas que não são suas ou sendo negativadas por contratos que nunca assinou,  e não sabe que pode mudar isso.</p>

      <p><em>Gutemberg Fonseca é Especialista em Defesa do Consumidor e ex-Secretário de Estado de Defesa do Consumidor do Rio de Janeiro. Acompanhe mais conteúdos sobre seus direitos no Instagram @gutembergpfonseca.</em></p>
    `
  },
  // ...existing code...
  {
    slug: "crime-relacao-consumo-virus-silencioso",
    source: "O Dia",
    category: "Defesa do Consumidor",
    title: "O crime na relação de consumo é um vírus silencioso e pode ser combatido",
    subTitle:
      "Produtos falsificados, contrabando e práticas ilegais impactam a economia e colocam consumidores em risco.",
    excerpt:
      "Produtos falsificados, contrabando e práticas ilegais impactam a economia e colocam consumidores em risco.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-04-13",
    authorImage:
      "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
    coverImage:
      "https://kngofnnx.com/wp-content/uploads/2026/04/crime-relacao-consumo-virus-silencioso.png",
    metaTitle:
      "Crime na relação de consumo: um problema silencioso",
    metaDescription:
      "Entenda como o crime nas relações de consumo afeta a sociedade e como combatê-lo.",
    readingTime: "6 min de leitura",
    tags: [
      "Produtos falsificados",
      "Contrabando",
      "Direitos do consumidor",
      "Fiscalização",
      "Crime econômico"
    ],
    featured: true,
    content: `
      <p><strong>O crime na relação de consumo é um vírus silencioso — e pode ser combatido.</strong></p>

      <br/>

      <h2>Uma epidemia invisível</h2>
      <p>Experiência à frente da gestão pública, inclusive em momentos críticos como a pandemia, ensinou que as maiores ameaças nem sempre são visíveis. Hoje, fora do contexto sanitário, o Brasil convive com outra epidemia silenciosa: o crime nas relações de consumo. Um problema estrutural que afeta a economia, compromete a segurança e impacta diretamente a vida da população.</p>

      <br/>

      <h2>O tamanho do prejuízo</h2>
      <p>Contrabando, pirataria, falsificação e adulteração de produtos alimentam uma cadeia criminosa bilionária. Dados do Fórum Nacional Contra a Pirataria e a Ilegalidade apontam prejuízos de centenas de bilhões de reais ao país. São recursos que deixam de circular na economia formal, comprometendo empregos, arrecadação e investimentos em áreas essenciais.</p>

      <br/>

      <h2>Risco real para o consumidor</h2>
      <p>Mais do que números, trata-se de uma questão de risco real. Produtos falsificados ou adulterados não passam por controle de qualidade e podem causar danos à saúde e à segurança. Cosméticos irregulares provocam reações alérgicas, brinquedos sem certificação colocam crianças em perigo, e até itens aparentemente simples, como roupas e calçados, podem gerar lesões. O barato, nesses casos, pode sair caro e até perigoso.</p>

      <br/>

      <h2>Fiscalização e crime organizado</h2>
      <p>Operações de fiscalização têm mostrado a dimensão desse problema. A Operação Veritas, realizada em parceria com órgãos de controle e segurança, resultou na apreensão de mais de 30 toneladas de produtos piratas em estabelecimentos em diversas regiões do estado do Rio de Janeiro. Mercadorias que, além de enganar o consumidor, muitas vezes financiam atividades ilícitas como milícias, lavagem de dinheiro e sonegação fiscal.</p>

      <br/>

      <h2>Por que o consumidor compra irregular?</h2>
      <p>Muitas vezes, a escolha por um produto irregular está associada ao preço mais baixo, à falta de informação ou ao desejo de acesso a determinadas marcas. Por isso, a educação para o consumo é tão essencial quanto a fiscalização. Informar, orientar e conscientizar são etapas fundamentais para prevenir riscos.</p>

      <br/>

      <h2>Responsabilidade compartilhada</h2>
      <p>O enfrentamento ao crime nas relações de consumo passa, necessariamente, pela construção de uma cultura de responsabilidade compartilhada. O consumidor que exige nota fiscal, verifica a procedência do produto e denuncia irregularidades contribui diretamente para um mercado mais justo e seguro.</p>

      <br/>

      <h2>Como combater esse crime?</h2>
      <p>Esse tipo de crime é silencioso, mas seus efeitos são profundos. Combatê-lo é proteger não apenas o direito de escolha, mas a saúde, a segurança e a dignidade da população. A boa notícia é que existe solução: informação, fiscalização e engajamento coletivo são as ferramentas mais eficazes nessa luta.</p>

      <br/>

      <h2>Denuncie</h2>
      <p>Denúncias, reclamações e dúvidas podem ser enviadas pelo whatsapp <strong>+55 (21) 96619-2498</strong> ou pelo <strong>@gutembergfonseca</strong>.</p>
    `
  },
  {
    slug: "compras-online-prazo-entrega-direitos-consumidor",
    source: "Diário do Vale",
    category: "Defesa do Consumidor",
    title: "Compras online: atenção aos prazos de entrega e aos seus direitos",
    subTitle:
      "Atrasos, direito de arrependimento e descumprimento da oferta estão entre os principais problemas nas compras pela internet. Saiba como agir.",
    excerpt:
      "Atrasos, direito de arrependimento e descumprimento da oferta estão entre os principais problemas nas compras pela internet. Saiba como agir.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-04-10",
    authorImage:
      "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
      coverImage:
        "https://kngofnnx.com/wp-content/uploads/2026/04/comprasonline.png",
    metaTitle:
      "Compras online: prazos de entrega e direitos do consumidor",
    metaDescription:
      "Saiba o que fazer em caso de atraso na entrega, como funciona o direito de arrependimento e como agir em compras online.",
    readingTime: "5 min de leitura",
    tags: [
      "Compras online",
      "Prazo de entrega",
      "Direitos do consumidor",
      "Direito de arrependimento",
      "Reembolso",
      "Compra pela internet"
    ],
    featured: false,
    content: `
      <p><strong>Comprar pela internet já faz parte da rotina do consumidor conectado — mas exige atenção.</strong> Um dos pontos mais importantes é o prazo de entrega, que deve ser informado de forma clara no momento da compra e cumprido exatamente como prometido.</p>

      <br/>

      <h2>Prazo de entrega deve ser respeitado</h2>

      <p>Se houver atraso, o consumidor não precisa aceitar passivamente. A lei garante três opções:</p>

      <p>Exigir o cumprimento da entrega;<br/>
      Aceitar outro produto equivalente;<br/>
      Cancelar a compra com reembolso integral, incluindo o frete.</p>

      <br/>

      <h2>Direito de arrependimento</h2>

      <p>Nas compras realizadas pela internet, o consumidor pode desistir da compra em até sete dias após o recebimento do produto ou da assinatura do contrato.</p>

      <p>Não é necessário justificar. O valor pago deve ser devolvido integralmente, e o fornecedor é responsável pelos custos da devolução.</p>

      <br/>

      <h2>Produto diferente do comprado</h2>

      <p>Se o consumidor receber algo diferente do que foi adquirido, há descumprimento da oferta.</p>

      <p>Nesse caso, ele pode exigir o produto correto, aceitar outro equivalente ou cancelar a compra com devolução do valor pago.</p>

      <br/>

      <h2>Como evitar problemas</h2>

      <p>Algumas medidas simples ajudam a reduzir riscos:</p>

      <p>Pesquisar a reputação da loja;<br/>
      Verificar avaliações de outros consumidores;<br/>
      Guardar comprovantes e registros da compra.</p>

      <br/>

      <h2>Transparência não é opcional</h2>

      <p>No ambiente digital, a regra é clara: o fornecedor deve cumprir a oferta e agir com transparência.</p>

      <p><strong>Isso não é favor — é obrigação legal.</strong></p>

      <br/>

      <h2>Onde buscar ajuda</h2>

      <p>Se houver problemas, o consumidor pode registrar denúncia nos canais de defesa:</p>

      <p>Fala Consumidor (SEDCON) pelo WhatsApp (21) 99336-4848;<br/>
      Disque 151 do PROCON-RJ;<br/>
      Também é possível buscar atendimento digital ou presencial.</p>

      <p><strong>Consumidor informado evita prejuízos e faz valer seus direitos.</strong></p>
    `
  },


  {
    slug: "corte-indevido-servicos-essenciais-direitos-consumidor",
    source: "Coluna Defesa do Consumidor",
    category: "Defesa do Consumidor",
    title: "Corte indevido de serviços essenciais: o consumidor não pode ficar no escuro",
    subTitle: "Interrupção de água e luz sem aviso prévio ou por dívida em disputa pode ser abusiva. Saiba quais são seus direitos.",
    excerpt: "Interrupção de água e luz sem aviso prévio ou por dívida em disputa pode ser abusiva. Saiba quais são seus direitos.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-04-06",
    authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
      coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/luz.png",
    metaTitle: "Corte de luz ou água: quando é ilegal e quais são seus direitos",
    metaDescription: "Saiba quando o corte de serviços essenciais é abusivo e o que fazer para garantir seus direitos.",
    readingTime: "5 min de leitura",
    tags: [
      "Serviços essenciais",
      "Corte de luz",
      "Corte de água",
      "Direitos do consumidor",
      "Cobrança indevida",
      "Procon"
    ],
    featured: false,
    content: `
      <p><strong>Ficar sem água ou luz por conta de um corte indevido é mais do que um transtorno — é uma violação de direitos básicos.</strong> Serviços essenciais devem ser interrompidos apenas em situações específicas e seguindo regras claras.</p>

      <br/>

      <h2>Quando o corte pode acontecer</h2>

      <p>O corte de serviços como água e energia pode ocorrer quando há dívidas recentes e sem contestação.</p>

      <p>Nesses casos, a concessionária pode suspender o fornecimento após aviso prévio. Ainda assim, existem limites e regras que precisam ser respeitadas.</p>

      <br/>

      <h2>Dívidas antigas não justificam corte</h2>

      <p>Um erro comum acontece quando a empresa corta o serviço por dívidas muito antigas.</p>

      <p>Nessas situações, a interrupção é irregular. A empresa pode cobrar os valores por outros meios, mas não pode suspender o fornecimento.</p>

      <br/>

      <h2>Falta de aviso prévio é abuso</h2>

      <p>O consumidor deve ser informado com antecedência sobre o risco de corte.</p>

      <p>Sem comunicação clara e comprovada, a interrupção do serviço é considerada abusiva.</p>

      <br/>

      <h2>Dívida em disputa não autoriza corte</h2>

      <p>Se o valor da conta estiver sendo contestado, a empresa não pode realizar o corte até que a situação seja analisada.</p>

      <p>Nesses casos, o consumidor tem direito à revisão da cobrança e à apresentação de justificativas.</p>

      <br/>

      <h2>Seus direitos em caso de corte indevido</h2>

      <p>O consumidor não está desamparado. Veja o que a lei garante:</p>

      <p>Não pode haver corte por dívidas antigas sem relação com o consumo atual;<br/>
      O aviso prévio é obrigatório antes da suspensão;<br/>
      Contas em disputa não autorizam corte automático;<br/>
      O serviço deve ser restabelecido rapidamente após o pagamento;<br/>
      É possível buscar o PROCON e a Justiça em caso de abuso.</p>

      <br/>

      <h2>Serviço essencial é direito, não privilégio</h2>

      <p>O acesso à água e à energia elétrica é um direito básico e deve ser respeitado.</p>

      <p>Se houver irregularidade, o consumidor pode procurar a Secretaria de Estado de Defesa do Consumidor (SEDCON) ou o PROCON-RJ.</p>

      <p><strong>Informação é a melhor defesa — e conhecer seus direitos é o primeiro passo para não ficar no escuro.</strong></p>
    `
  },

  {
    slug: "gasolina-subindo-sem-reajuste-petrobras-direitos-consumidor",
    source: "Coluna Defesa do Consumidor",
    category: "Defesa do Consumidor",
    title: "Gasolina subindo sem aumento da Petrobras: o que está acontecendo — e o que você pode fazer",
    subTitle: "Alta nos combustíveis sem reajuste oficial levanta suspeitas sobre margens abusivas. Entenda o que está por trás do aumento e como agir.",
    excerpt: "Alta nos combustíveis sem reajuste oficial levanta suspeitas sobre margens abusivas. Entenda o que está por trás do aumento e como agir.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-03-30",
    authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
    coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/gasolina-scaled.jpeg",
    metaTitle: "Gasolina subindo sem reajuste: entenda o aumento e seus direitos",
    metaDescription: "Saiba por que a gasolina está subindo mesmo sem reajuste da Petrobras e o que você pode fazer diante de possíveis abusos.",
    readingTime: "6 min de leitura",
    tags: [
      "Gasolina",
      "Preço abusivo",
      "Combustível",
      "Direitos do consumidor",
      "Procon",
      "Fiscalização"
    ],
    featured: false,
    content: `
    <p><strong>Você foi abastecer e levou um susto com o preço na bomba?</strong> A gasolina e o diesel vêm subindo há semanas — e o mais intrigante é que não houve reajuste oficial da Petrobras.</p>

    <p>Diante disso, surge a dúvida: de onde vem essa alta? E o mais importante: o que o consumidor pode fazer?</p>

    <br/>

    <h2>Por que o combustível está subindo?</h2>

    <p>O preço que chega até você passa por uma cadeia: Petrobras → distribuidoras → postos. Cada etapa influencia o valor final.</p>

    <p>Em momentos de instabilidade internacional, como conflitos geopolíticos, o preço do petróleo pode subir e pressionar os custos. Mas isso não explica tudo.</p>

    <p><strong>Parte do aumento que você está pagando não é custo — é margem de lucro.</strong></p>

    <br/>

    <h2>Os números que chamam atenção</h2>

    <p>Levantamentos recentes mostram aumento significativo nas margens de distribuidoras e postos.</p>

    <p>Em alguns casos, o custo subiu poucos centavos, mas o preço final ao consumidor aumentou mais de R$ 1 por litro.</p>

    <p>Isso pode caracterizar prática abusiva, quando não há justificativa proporcional para o reajuste.</p>

    <br/>

    <h2>O impacto no bolso do consumidor</h2>

    <p>Para quem depende do carro para trabalhar, o impacto é direto. Pequenos aumentos no litro representam dezenas de reais a mais por semana.</p>

    <p>Além disso, o diesel mais caro afeta o transporte e encarece produtos no supermercado.</p>

    <br/>

    <h2>Fiscalizações e investigações</h2>

    <p>Órgãos de defesa do consumidor e autoridades já iniciaram fiscalizações para apurar aumentos injustificados.</p>

    <p>Há também investigações sobre possíveis práticas irregulares, como alinhamento de preços entre empresas.</p>

    <p>Quem estiver praticando abuso deverá prestar esclarecimentos.</p>

    <br/>

    <h2>O que você pode fazer agora</h2>

    <p>O consumidor não precisa aceitar esse cenário sem reação. Veja como agir:</p>

    <p><strong>1. Verifique o preço antes de abastecer:</strong> divergência entre placa e bomba é irregularidade.<br/>
    <strong>2. Guarde o comprovante:</strong> ele é essencial para qualquer reclamação.<br/>
    <strong>3. Registre denúncia no Procon:</strong> presencialmente, pelo site ou aplicativo.<br/>
    <strong>4. Use o Consumidor.gov.br:</strong> plataforma gratuita com resposta obrigatória das empresas.</p>

    <br/>

    <h2>Erros comuns que você deve evitar</h2>

    <p>Muitos consumidores acabam perdendo seus direitos por falta de informação:</p>

    <p>Achar que reclamar não adianta;<br/>
    Não comparar preços entre postos;<br/>
    Aceitar justificativas genéricas sem questionar.</p>

    <br/>

    <h2>Você não está sozinho</h2>

    <p>O aumento abusivo dos combustíveis afeta toda a população — do motorista ao consumidor no supermercado.</p>

    <p><strong>Se você identificou aumento injustificado, não fique em silêncio. Denuncie. Seu relato faz diferença.</strong></p>
  `
  },

  {
    slug: "pascoa-direitos-consumidor-compra-chocolate",
    source: "Coluna Defesa do Consumidor",
    category: "Defesa do Consumidor",
    title: "Páscoa sem gosto amargo: conheça seus direitos na hora de comprar chocolate",
    subTitle: "Diferença de peso, produtos fora do padrão e informações pouco claras estão entre os principais problemas. Saiba como evitar prejuízos.",
    excerpt: "Diferença de peso, produtos fora do padrão e informações pouco claras estão entre os principais problemas. Saiba como evitar prejuízos.",
    author: "Gutemberg Fonseca",
    role: "Coluna de Defesa do Consumidor",
    date: "2026-03-30",
    authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
      coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/Design-sem-nome-2.png",
    metaTitle: "Páscoa: conheça seus direitos ao comprar ovos de chocolate",
    metaDescription: "Saiba como evitar prejuízos na Páscoa ao comprar chocolates e conheça seus direitos como consumidor.",
    readingTime: "4 min de leitura",
    tags: [
      "Páscoa",
      "Direitos do consumidor",
      "Ovo de chocolate",
      "Publicidade enganosa",
      "Produto com defeito",
      "Compra segura"
    ],
    featured: false,
    content: `
    <p><strong>A Páscoa é tempo de celebrar, reunir a família e adoçar a vida.</strong> Mas ninguém merece que o sabor do chocolate seja substituído pelo gosto amargo de uma infração contra o consumidor.</p>

    <p>Nesta época do ano, aumentam as reclamações sobre diferença de peso dos itens, produtos fora do padrão e falta de clareza nas informações. Estar atento é o melhor caminho para evitar prejuízos.</p>

    <br/>

    <h2>Antes de comprar, fique atento:</h2>

    <p><strong>Peso líquido x embalagem:</strong> o que vale é o peso do chocolate, não o tamanho da caixa. Muitas embalagens são grandes, mas contêm menos produto do que parecem. Confira sempre o peso líquido indicado.<br/>
    
    <strong>Preço por grama:</strong> comparar o valor proporcional ajuda a identificar opções mais vantajosas e evitar armadilhas.<br/>
    
    <strong>Validade:</strong> produtos vencidos não podem ser vendidos. Alimentos fora da validade representam risco à saúde e configuram infração grave.<br/>
    
    <strong>Qualidade e conservação:</strong> o chocolate não pode apresentar sinais de alteração, como manchas esbranquiçadas, que indicam problema de conservação. O produto deve estar protegido do calor e da umidade.<br/>
    
    <strong>Informação clara:</strong> ingredientes, alergênicos e características precisam estar visíveis. Falta de informação também é infração.<br/>
    
    <strong>Troca:</strong> defeitos, alterações visíveis ou problemas na fabricação dão direito à substituição do produto ou à devolução do valor pago.</p>

    <br/>

    <h2>Se houver problema, saiba como agir</h2>

    <p>Se encontrar qualquer irregularidade, procure os órgãos de defesa do consumidor, como a Secretaria de Estado de Defesa do Consumidor e o PROCON-RJ.</p>

    <p>Você também pode registrar denúncia pelo Fala Consumidor (SEDCON) via WhatsApp (21) 99336-4848 ou pelo Disque 151 do PROCON-RJ.</p>

    <p><strong>Informação é o melhor ingrediente para não cair em armadilhas.</strong></p>
  `
  },

{
  slug: "pascoa-consciente-direito-informacao-rotulo",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Páscoa consciente: você tem direito à informação no rótulo; saiba como usá-la",
  subTitle: "Saber ler ingredientes, identificar alergênicos e entender a tabela nutricional ajuda o consumidor a fazer escolhas mais seguras.",
  excerpt: "Saber ler ingredientes, identificar alergênicos e entender a tabela nutricional ajuda o consumidor a fazer escolhas mais seguras.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-26",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/Design-sem-nome-1-1.png",
  metaTitle: "Páscoa consciente: como ler rótulos e proteger sua saúde",
  metaDescription: "Aprenda a interpretar rótulos de alimentos na Páscoa e faça escolhas mais seguras e conscientes.",
  readingTime: "5 min de leitura",
  tags: [
    "Páscoa",
    "Rótulo de alimentos",
    "Direitos do consumidor",
    "Informação clara",
    "Segurança alimentar",
    "ANVISA"
  ],
  featured: false,
  content: `
    <p><strong>A Páscoa chega com vitrines coloridas, ovos de chocolate e uma infinidade de produtos industrializados.</strong> Mas, no meio de tantas opções, um detalhe essencial ainda passa despercebido por muitos consumidores: o rótulo.</p>

    <p>As informações da embalagem não são mero detalhe. O consumidor tem direito a receber dados claros, corretos e em linguagem acessível — e saber interpretá-los é uma forma de proteger a própria saúde.</p>

    <br/>

    <h2>O que a lista de ingredientes revela</h2>

    <p>Muitas escolhas são feitas pela marca, preço ou aparência, mas é no verso da embalagem que estão as informações mais importantes.</p>

    <p>A lista de ingredientes é organizada em ordem decrescente, ou seja, o primeiro item é o que aparece em maior quantidade. Se o açúcar aparece logo no início, isso indica alta concentração no produto.</p>

    <br/>

    <h2>Atenção aos alergênicos</h2>

    <p>Ingredientes como leite, ovos, soja, amendoim, castanhas e glúten devem estar claramente identificados.</p>

    <p>Para pessoas com alergias ou intolerâncias, essa informação é essencial. A ausência ou falta de clareza pode representar risco à saúde e configurar infração ao Código de Defesa do Consumidor.</p>

    <br/>

    <h2>Tabela nutricional: o que observar</h2>

    <p>A tabela nutricional informa calorias, açúcar, gorduras e sódio por porção.</p>

    <p>Comparar produtos semelhantes ajuda a fazer escolhas mais equilibradas, especialmente quando há consumo frequente ou crianças envolvidas.</p>

    <br/>

    <h2>Rotulagem frontal: o alerta da lupa</h2>

    <p>Com as novas regras da ANVISA, muitos produtos passaram a trazer símbolos na parte frontal da embalagem.</p>

    <p>A lupa indica alto teor de açúcar adicionado, gordura saturada ou sódio, funcionando como um alerta visual para o consumidor.</p>

    <br/>

    <h2>Validade e conservação também importam</h2>

    <p>Verificar a data de validade e as condições de armazenamento é fundamental, principalmente no caso de chocolates, que podem sofrer alterações de textura e sabor quando mal conservados.</p>

    <br/>

    <h2>Consumo consciente começa pela informação</h2>

    <p>Na correria das compras, é comum agir por impulso. Mas consumir com consciência é garantir não apenas uma escolha melhor, mas também o respeito aos seus direitos.</p>

    <p><strong>Nesta Páscoa, não deixe que a pressa substitua a informação.</strong></p>
  `
},

{
  slug: "vagao-feminino-rj-24-horas",
  source: "Portal Pessoal",
  category: "Segurança Pública",
  title: "Vagão feminino RJ 24 horas: o que muda na rotina das mulheres no transporte público",
  subTitle: "Vagão feminino RJ agora funciona 24h. Entenda o impacto na rotina e na segurança das mulheres no transporte público.",
  excerpt: "Quantas mulheres já passaram por situações constrangedoras no trem ou no metrô? Conheça os avanços e o que muda com o funcionamento 24h do vagão feminino.",
  author: "Gutemberg Fonseca",
  role: "Secretário de Estado de Defesa do Consumidor",
  date: "2025-03-25",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
    coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/Design-sem-nome-1.png",
  metaTitle: "Vagão feminino RJ 24 horas: segurança das mulheres no transporte público",
  metaDescription: "Vagão feminino RJ agora funciona 24h. Entenda o impacto na rotina e na segurança das mulheres no transporte público.",
  readingTime: "4 min de leitura",
  tags: [
    "Vagão feminino",
    "Transporte público RJ",
    "Segurança das mulheres",
    "Mobilidade urbana",
    "Direitos das mulheres"
  ],
  featured: false,
  content: `
    <p><strong>Quantas mulheres já passaram por situações constrangedoras no trem ou no metrô?</strong></p>

    <p>Essa ainda é uma realidade presente no transporte público no Rio de Janeiro, e que precisa ser enfrentada com seriedade.</p>
    
    <p>Na última quarta, dia 24 de março, estive no Palácio Tiradentes, no Centro do Rio, em uma sessão solene que marcou um avanço importante nessa discussão: a ampliação para 24 horas do funcionamento dos vagões exclusivos para mulheres nos trens e metrôs do estado.</p>
    
    <p>Essa atualização reforça uma medida que já existia, mas que agora passa a acompanhar a rotina de quem utiliza metrô e trem RJ em diferentes horários, inclusive à noite e de madrugada.</p>

    <br/>

    <h2>Quando a pauta deixa de ser debate e vira realidade</h2>

    <p>A mudança é simples de explicar, mas significativa no que representa.</p>
    
    <p>Garantir que os espaços exclusivos estejam disponíveis em qualquer horário é reconhecer que o deslocamento das mulheres não acontece em janelas limitadas, ele faz parte de uma rotina contínua, todos os dias.</p>
    
    <p>Durante a sessão, falei sobre esse avanço e porque essa é uma pauta que precisa estar no centro das prioridades.</p>

    <br/>

    <h2>Mais do que mobilidade, estamos falando de respeito</h2>

    <p>Defender o consumidor é, antes de tudo, defender pessoas.</p>
    
    <p>E quando a gente fala de segurança das mulheres no transporte público, está falando de algo que impacta diretamente a vida de milhares de cariocas.</p>
    
    <p>Está nas decisões do dia a dia.</p>
    
    <p>Nos horários que escolhem.</p>
    
    <p>Nos caminhos que evitam.</p>
    
    <p>É sobre a liberdade de ir e vir com mais tranquilidade.</p>

    <br/>

    <h2>Transporte público no Rio de Janeiro: um passo que aponta direção</h2>

    <p>A ampliação do vagão feminino RJ para 24 horas não resolve tudo, mas aponta um caminho.</p>
    
    <p>Mostra que a realidade está sendo observada.</p>
    
    <p>E que é possível avançar com medidas concretas.</p>
    
    <p>Ainda há muito a ser feito quando falamos do transporte público no Rio de Janeiro, especialmente para as mulheres, mas cada passo consistente faz diferença.</p>

    <br/>

    <h2>No fim, é sobre o básico</h2>

    <p>No fim das contas, o que está em jogo não é só a organização dentro de um vagão.</p>
    
    <p>É respeito.</p>
    
    <p>É dignidade.</p>
    
    <p>É tranquilidade no dia a dia.</p>
    
    <p>Seguimos atentos e trabalhando para que esse tipo de avanço deixe de ser exceção, e passe a fazer parte da regra.</p>
  `
},

{
  slug: "contrato-de-academia-direitos-do-consumidor",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Academia e contrato: o que o consumidor precisa saber antes de assinar",
  subTitle: "Reajuste sem aviso, multa de fidelização e dificuldade para cancelar estão entre os principais problemas enfrentados por consumidores em contratos de academia.",
  excerpt: "Vai se matricular em academia? Saiba o que o contrato precisa ter, quando o reajuste é abusivo e como funciona o cancelamento.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-26",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
    coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/side-view-people-running-treadmill-gym.jpg-scaled.jpeg",
  metaTitle: "Contrato de academia: direitos do consumidor antes de assinar",
  metaDescription: "Vai se matricular em academia? Saiba o que o contrato precisa ter, quando o reajuste é abusivo e como funciona o cancelamento. Conheça seus direitos.",
  readingTime: "4 min de leitura",
  tags: [
    "Contrato de academia",
    "Cancelamento de academia",
    "Reajuste de mensalidade academia",
    "Fidelização abusiva academia"
  ],
  featured: false,
  content: `
    <p><strong>Matrícula em academia parece simples — mas o contrato pode esconder armadilhas.</strong> Reajuste sem aviso, multa abusiva e dificuldade para cancelar são problemas reais. Conheça seus direitos antes de colocar o tênis.</p>

    <p>Com a chegada de um novo ano, a promessa de saúde, bem-estar e disposição leva muita gente direto ao balcão de matrícula das academias. E não tem nada de errado nisso — o problema começa quando o entusiasmo fala mais alto do que a atenção ao contrato.</p>

    <p>Reajuste inesperado na mensalidade, multa alta para cancelar, cláusulas que ninguém explicou na hora da venda... Tudo isso pode transformar uma decisão saudável em uma dor de cabeça jurídica. Por isso, antes de assinar qualquer coisa, vale entender o que diz a lei sobre contrato de academia e direitos do consumidor.</p>

    <br/>

    <h2>A academia pode aumentar a mensalidade quando quiser?</h2>

    <p>Não. O reajuste de mensalidade só é permitido se estiver claramente previsto no contrato, com critérios objetivos e transparentes — por exemplo, reajuste anual pelo IPCA ou por outro índice definido previamente.</p>

    <p>Reajuste surpresa, sem aviso prévio, sem justificativa ou sem previsão contratual, é considerado prática abusiva e pode ser contestado. Se isso aconteceu com você, guarde o contrato, o histórico de cobranças e registre sua reclamação.</p>

    <div class="article-callout">
      <strong>Atenção:</strong><br />
      Se a academia aumentou a mensalidade sem aviso e sem previsão contratual clara, o consumidor pode contestar a cobrança e exigir explicações formais.
    </div>

    <br/>

    <h2>E a fidelização? A academia pode cobrar multa se eu cancelar?</h2>

    <p>Pode — mas dentro de limites. A multa por cancelamento antecipado é permitida quando é razoável e proporcional ao tempo que falta para encerrar o período de fidelização.</p>

    <p>O que não é permitido é cobrar um valor tão alto que praticamente inviabiliza o cancelamento. Isso fere o direito de cancelamento de academia e pode ser considerado cláusula abusiva.</p>

    <div class="article-callout">
      <strong>Exemplo prático:</strong><br />
      Em um contrato de 12 meses, se o consumidor já cumpriu boa parte do prazo, a multa deve ser proporcional ao período restante — não ao valor integral do contrato.
    </div>

    <br/>

    <h2>Contratei pela internet. Tenho alguma proteção especial?</h2>

    <p>Sim, e essa é uma das proteções mais importantes para quem assina plano de academia pelo site ou aplicativo: o direito de arrependimento.</p>

    <p>Se a contratação foi feita online, você pode cancelar o contrato em até 7 dias corridos a partir da data da assinatura — sem precisar apresentar nenhuma justificativa e com direito a reembolso integral do valor pago.</p>

    <p>Esse prazo é garantido pelo Código de Defesa do Consumidor e vale para qualquer contratação feita à distância, ou seja, sem que você tenha ido pessoalmente ao estabelecimento para fechar o negócio.</p>

    <br/>

    <h2>Dicas práticas antes de assinar o contrato de academia</h2>

    <p>Antes de colocar a caneta no papel — ou o dedo na tela — preste atenção nesses pontos:</p>

    <ul>
      <li>Leia todas as cláusulas com calma, inclusive as letras miúdas</li>
      <li>Exija uma cópia do contrato</li>
      <li>Verifique as regras de cancelamento e reajuste antes de assumir qualquer compromisso</li>
      <li>Desconfie de promessas verbais: o que vale é o que está no contrato</li>
      <li>Guarde todos os comprovantes de pagamento desde a primeira mensalidade</li>
    </ul>

    <br/>

    <h2>Na hora de cancelar, a academia precisa facilitar</h2>

    <p>Assim como na contratação de qualquer serviço, o cancelamento de academia não pode ser transformado em obstáculo. Exigir documentos desnecessários, criar burocracia excessiva ou dificultar o encerramento do contrato é prática irregular.</p>

    <p>A academia deve oferecer canais acessíveis para o cancelamento — e o processo deve ser simples, direto e sem armadilhas.</p>

    <br/>

    <h2>Academia deve trazer saúde, não prejuízo</h2>

    <p>A matrícula em uma academia é uma escolha positiva — e precisa continuar sendo. Ler o contrato com atenção, entender seus direitos e guardar os comprovantes são os primeiros exercícios de quem quer se proteger de abusos.</p>

    <p>Se você passou por algum problema com contrato de academia, mensalidade abusiva ou dificuldade de cancelamento, não fique sem resposta. Os canais de defesa do consumidor estão à disposição</p>

  `
},

{
  slug: "direitos-do-hospede-hoteis-pousadas",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Viagem de verão: conheça os direitos do hóspede em hotéis e pousadas",
  subTitle: "Foto diferente da realidade, reserva não honrada ou cobrança indevida? Conheça os direitos do hóspede em hotéis e pousadas e saiba o que exigir.",
  excerpt: "Foto bonita no site, realidade decepcionante na chegada? Saiba quais são os direitos do hóspede em hotéis e pousadas e o que exigir quando algo dá errado.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-30",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
    coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/african-american-man-carrying-bags-hotel-lobby-arriving-reception-counter-with-woman-check-guests-preparing-fill-registration-forms-staff-welcoming-tourists.jpg-scaled.jpeg",
  metaTitle: "Viagem de verão: conheça os direitos do hóspede em hotéis e pousadas",
  metaDescription: "Foto diferente da realidade, reserva não honrada ou cobrança indevida? Conheça os direitos do hóspede em hotéis e pousadas e saiba o que exigir.",
  readingTime: "6 min de leitura",
  tags: [
    "Direitos do hóspede",
    "Hotel e pousada",
    "Propaganda enganosa",
    "Reserva não honrada",
    "Cobrança indevida",
    "Direito do consumidor"
  ],
  featured: false,
  content: `
    <p><strong>Foto bonita no site, realidade decepcionante na chegada — isso é mais comum do que parece.</strong> Saiba quais são os direitos do hóspede em hotéis e pousadas e o que exigir quando algo dá errado.</p>

    <p>O verão chegou, as malas estão prontas e a expectativa está lá em cima. Mas junto com a alta temporada, crescem também as reclamações de consumidores que encontraram uma realidade bem diferente do que foi anunciado — quarto menor do que parecia nas fotos, piscina interditada, reserva que "sumiu" no sistema ou cobrança surpresa no check-out.</p>

    <p>Conhecer os direitos do hóspede em hotéis e pousadas faz toda a diferença para não deixar a viagem virar um pesadelo jurídico. Veja os principais problemas e o que a lei garante em cada caso.</p>

    <br/>

    <h2>1. Propaganda enganosa: quando a foto não tem nada a ver com a realidade</h2>

    <p>Fotos antigas, editadas ou que induzem o consumidor ao erro são proibidas pelo Código de Defesa do Consumidor. Não importa se o anúncio está no site do hotel, em uma plataforma de reservas ou nas redes sociais — a publicidade precisa refletir a realidade do serviço oferecido.</p>

    <p><strong>Situações clássicas de propaganda enganosa em hotel:</strong></p>

    <ul>
      <li>Piscina que parece enorme nas fotos, mas cabe três pessoas</li>
      <li>Quarto anunciado como "vista para o mar" que, na chegada, dá para o estacionamento</li>
      <li>Fotos de uma reforma que aconteceu há dez anos e o local está deteriorado</li>
    </ul>

    <p><strong>O que você pode exigir:</strong> acomodação equivalente ao que foi anunciado, desconto proporcional no valor da diária ou cancelamento com devolução integral do dinheiro pago.</p>

    <p><strong>Dica prática:</strong> antes de chegar, salve prints do anúncio original com fotos e descrição. Se a realidade for diferente, você tem prova.</p>

    <br/>

    <h2>2. Reserva não honrada: pagou, confirmou e não tem quarto?</h2>

    <p>Isso é ilegal. Depois que a reserva foi confirmada e o pagamento realizado, o estabelecimento não pode simplesmente dizer que não tem vaga disponível.</p>

    <p><strong>O que você pode exigir:</strong></p>

    <ul>
      <li>Hospedagem em local de categoria equivalente ou superior, sem nenhum custo adicional para você</li>
      <li>Reembolso de despesas extras que surgirem por causa do problema — como transporte até outro hotel</li>
      <li>Indenização por danos causados, dependendo da situação</li>
    </ul>

    <br/>

    <h2>3. Cobranças indevidas: taxa que apareceu do nada no check-out</h2>

    <p>Toda cobrança precisa ser informada previamente e aceita pelo consumidor. Taxa de serviço, taxa de resort, taxa de limpeza, diária extra — tudo precisa estar claro antes do fechamento da reserva.</p>

    <p>Se no check-out aparecer algum valor que você nunca concordou em pagar, questione imediatamente. Exija a discriminação detalhada da fatura e não pague o que não foi previamente combinado.</p>

    <p><strong>O que fazer:</strong> anote o valor cobrado indevidamente, peça o documento formal e registre sua reclamação — tanto na plataforma onde fez a reserva quanto nos órgãos de defesa do consumidor.</p>

    <br/>

    <h2>4. No-show: a multa por não comparecer pode ser abusiva?</h2>

    <p>No-show é quando o hóspede faz a reserva e não aparece. Hotéis e pousadas podem cobrar por isso — mas apenas se as condições estiverem claramente informadas no momento da reserva.</p>

    <p>Cláusulas que cobram o valor total da estadia em qualquer situação, sem proporcionalidade, podem ser consideradas abusivas e contestadas.</p>

    <br/>

    <h2>Dicas essenciais antes e durante a hospedagem</h2>

    <p>Seja na reserva ou na chegada, alguns cuidados fazem toda a diferença:</p>

    <ul>
      <li>Guarde prints de fotos, anúncios e da confirmação da reserva antes de viajar</li>
      <li>Leia com atenção as regras de cancelamento e política de no-show</li>
      <li>Exija sempre contrato, recibo ou e-mail de confirmação</li>
      <li>Questione no ato qualquer cobrança que não estava prevista</li>
      <li>Documente tudo se surgir algum problema — fotos, vídeos, protocolos</li>
    </ul>

    <br/>

    <h2>Problema não resolvido? Acione a defesa do consumidor</h2>

    <p>Se o hotel ou a pousada não resolver a situação diretamente, você não precisa engolir o prejuízo. Registre sua reclamação nos canais oficiais:</p>

    <ul>
      <li><strong>Fala Consumidor (SEDCON):</strong> WhatsApp (21) 99336-4848 ou Disque 151 (PROCON-RJ)</li>
      <li><strong>Zap do Guto:</strong> (21) 96619-2498</li>
      <li><strong>Instagram:</strong> @gutembergfonseca</li>
    </ul>
  `
},

{
  slug: "direitos-basicos-do-consumidor",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Direitos básicos do consumidor: o que todo cidadão precisa saber antes de comprar",
  subTitle: "Produto com defeito, propaganda enganosa ou cobrança indevida estão entre as situações em que o Código de Defesa do Consumidor protege você.",
  excerpt: "Produto com defeito, propaganda enganosa ou cobrança indevida? Conheça os direitos básicos do consumidor e saiba como o CDC protege você no dia a dia.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-26",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
    coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/man-shaking-hands-with-lady.jpg-scaled.jpeg",
  metaTitle: "Direitos básicos do consumidor: o que você precisa saber",
  metaDescription: "Produto com defeito, propaganda enganosa ou cobrança indevida? Conheça os direitos básicos do consumidor e saiba como o CDC protege você no dia a dia.",
  readingTime: "5 min de leitura",
  tags: [
    "Direitos básicos do consumidor",
    "Código de Defesa do Consumidor",
    "Garantia legal de produtos",
    "Direito de arrependimento compras online"
  ],
  featured: true,
  content: `
    <p><strong>Produto com defeito, propaganda enganosa, cobrança indevida — o Código de Defesa do Consumidor garante proteção em todas essas situações.</strong> Conheça os direitos básicos do consumidor e saiba como se proteger no dia a dia.</p>

    <p>Você já devolveu um produto com defeito e a loja se recusou a trocar? Já viu um anúncio com uma oferta incrível que, na hora de comprar, simplesmente "não existia mais"? Já foi cobrado por algo que nunca contratou?</p>

    <p>Se respondeu sim para qualquer uma dessas perguntas, saiba que em todas elas a lei estava do seu lado — e você talvez não soubesse. O Código de Defesa do Consumidor, conhecido como CDC, existe exatamente para isso: garantir que o consumidor não fique desamparado diante de abusos, seja numa compra online, num contrato de serviço ou numa ida simples ao supermercado.</p>

    <p>Conhecer os direitos básicos do consumidor não é assunto só para advogados. É informação que qualquer pessoa precisa ter para se proteger no cotidiano.</p>

    <br/>

    <h2>1. Direito à informação clara e verdadeira</h2>

    <p>Antes de fechar qualquer compra ou contrato, você tem o direito de receber todas as informações relevantes sobre o produto ou serviço: preço, validade, características, forma de uso e eventuais riscos.</p>

    <p>O fornecedor não pode omitir detalhes importantes — e nem usar aquelas "letras miúdas" para esconder cláusulas que prejudicam o consumidor. Se a informação não estava clara, ela não pode ser usada contra você.</p>

    <br/>

    <h2>2. Proteção contra propaganda enganosa</h2>

    <p>Se a empresa prometeu, ela é obrigada a cumprir. Simples assim. A oferta feita em qualquer canal — anúncio, site, panfleto, vitrine ou publicidade nas redes sociais — vincula o contrato. Isso significa que, se foi anunciado, você tem direito de receber exatamente o que foi prometido.</p>

    <br/>

    <h2>3. Segurança nos produtos e serviços</h2>

    <p>Todo produto ou serviço colocado no mercado precisa ser seguro para quem usa. Isso vale para alimentos, brinquedos, eletrodomésticos, medicamentos, cosméticos — qualquer coisa.</p>

    <p>Se o produto tiver algum risco, o fornecedor é obrigado a avisar de forma clara. E se o risco for grave, o produto precisa ser retirado de circulação — é o que acontece nos recalls que você vê sendo anunciados de tempos em tempos.</p>

    <br/>

    <h2>4. Garantia legal: o direito de exigir conserto, troca ou devolução</h2>

    <p>Esse é um dos direitos básicos do consumidor que mais gera dúvida — e que mais as empresas tentam ignorar. A lei garante um prazo mínimo de garantia para todo produto ou serviço, independentemente de qualquer garantia extra que a loja ofereça:</p>

    <ul>
      <li><strong>Produtos duráveis (eletrodomésticos, eletrônicos, móveis):</strong> 90 dias de garantia legal</li>
      <li><strong>Produtos não duráveis (alimentos, cosméticos, itens de uso rápido):</strong> 30 dias de garantia legal</li>
    </ul>

    <p>Dentro desse prazo, se o produto apresentar defeito, você pode exigir conserto, substituição por outro produto igual ou devolução do dinheiro. A empresa não pode se recusar.</p>

    <br/>

    <h2>5. Direito a um atendimento digno</h2>

    <p>Parece óbvio, mas precisa estar aqui: o consumidor tem o direito de ser tratado com respeito em qualquer relação de consumo. Isso vale para lojas, bancos, operadoras de telefonia, serviços públicos — em qualquer lugar onde você seja cliente.</p>

    <p>Humilhação, grosseria, discriminação ou qualquer tipo de constrangimento durante um atendimento são situações que podem gerar indenização por danos morais.</p>

    <br/>

    <h2>6. Direito de arrependimento em compras online</h2>

    <p>Comprou pela internet e se arrependeu? Você tem 7 dias corridos a partir da data da compra — ou do recebimento do produto — para desistir, sem precisar dar nenhuma explicação.</p>

    <p>A devolução do valor pago deve ser integral, incluindo o frete. A empresa não pode oferecer crédito no lugar do dinheiro sem a sua concordância.</p>

    <br/>

    <h2>Por que conhecer seus direitos faz diferença?</h2>

    <p>Quando o consumidor sabe o que a lei garante, fica muito mais difícil ser enganado. E quando mais pessoas conhecem e exercem seus direitos, o mercado melhora para todo mundo — as empresas que desrespeitam são pressionadas a mudar, e as boas práticas se tornam o padrão.</p>

    <p>Informação é, sim, o melhor instrumento de defesa do consumidor.</p>
  `
},

{
  slug: "atraso-na-entrega-direitos-do-consumidor",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Prazo de entrega e atrasos: o que fazer quando a compra não chega",
  subTitle: "Saiba o que fazer quando a entrega atrasa: conheça seus direitos, as opções de reembolso e como reclamar nos órgãos de defesa do consumidor.",
  excerpt: "Saiba o que fazer quando a entrega atrasa: conheça seus direitos, as opções de reembolso e como reclamar nos órgãos de defesa do consumidor.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-30",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
    coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/mature-woman-getting-angry-yelling-phone-call-desk.jpg-scaled.jpeg",
  metaTitle: "Prazo de entrega e atrasos: o que fazer quando a compra não chega",
  metaDescription: "Saiba o que fazer quando a entrega atrasa: conheça seus direitos, as opções de reembolso e como reclamar nos órgãos de defesa do consumidor.",
  readingTime: "6 min de leitura",
  tags: [
    "Atraso na entrega",
    "Prazo de entrega",
    "Direitos do consumidor",
    "Cancelamento e reembolso",
    "Compra online",
    "Falha na prestação de serviço"
  ],
  featured: false,
  content: `
    <p><strong>Poucas coisas irritam mais do que esperar por uma encomenda que simplesmente não aparece.</strong> Se você já ficou nessa situação, saiba que não precisa aceitar calado. Quando há atraso na entrega, a lei está claramente do lado do consumidor — e entender seus direitos é o primeiro passo para resolver o problema sem dor de cabeça.</p>

    <br/>

    <h2>O que a lei garante quando o prazo não é cumprido</h2>

    <p>A empresa é obrigada a cumprir o prazo que ela mesma informou — seja no site, no aplicativo, na loja física, no recibo ou no anúncio. Isso não é favor, é obrigação legal.</p>

    <p>Se o prazo vence e o produto não chega, a loja até pode avisar sobre o atraso, mas você não é obrigado a aceitar uma nova data. E quando a empresa descumpre o combinado sem nenhum aviso prévio, isso se chama falha na prestação do serviço — e abre caminho para que você exija uma solução imediata.</p>

    <br/>

    <h2>Quais são os seus direitos em caso de atraso?</h2>

    <p>Quando a entrega atrasa, você tem o direito de escolher o que fazer. As opções são:</p>

    <br/>

    <h3>Cancelamento e reembolso total</h3>

    <p>Você pode cancelar a compra e receber de volta tudo o que pagou, incluindo o valor do frete. O reembolso deve ser integral e imediato.</p>

    <br/>

    <h3>Abatimento no preço</h3>

    <p>Prefere continuar com a compra, mas quer ser compensado pelo transtorno? Você pode exigir um desconto sobre o valor já pago.</p>

    <br/>

    <h3>Nova data definitiva de entrega</h3>

    <p>Se ainda quiser receber o produto, pode exigir que a empresa estabeleça uma nova data de entrega — desta vez, com compromisso real.</p>

    <br/>

    <h2>Cuidado com a "ausência do destinatário" que nunca aconteceu</h2>

    <p>Uma prática cada vez mais comum é a transportadora registrar "destinatário ausente" no sistema sem ter passado de verdade no endereço. Se isso acontecer com você, veja o que fazer:</p>

    <p>Registre provas — fotos da fachada ou da portaria no horário em que a suposta tentativa teria acontecido são muito úteis. Em seguida, exija uma nova entrega sem custo adicional. Se o problema se repetir, você tem direito a cancelar a compra e receber o reembolso completo. Lembre-se: <strong>o erro da transportadora não pode virar prejuízo seu.</strong></p>

    <br/>

    <h2>Passo a passo para resolver o problema</h2>

    <p>Independentemente do tipo de atraso, siga este caminho:</p>

    <p>Guarde todas as provas — prints de conversas, comprovantes de pagamento, anúncios com o prazo informado. Depois, entre em contato com a loja pelos canais oficiais, peça um prazo final para a resolução e anote o número do protocolo de atendimento.</p>

    <p>Se nada avançar, acione os órgãos de defesa do consumidor. E se o atraso causou um prejuízo maior — como um presente que não chegou a tempo para uma data especial, um produto essencial para o trabalho ou um item para um evento —, você pode pedir indenização por danos materiais ou morais.</p>
  `
},

{
  slug: "fraudes-digitais-pix-falso-whatsapp-golpes",
  source: "Diário do Vale",
  category: "Defesa do Consumidor",
  title: "Ano novo, mesmos golpes: fraudes digitais seguem em alta",
  subTitle: "PIX falso, links maliciosos e clonagem de WhatsApp continuam fazendo vítimas. Saiba como se proteger e evitar prejuízos.",
  excerpt: "PIX falso, links maliciosos e clonagem de WhatsApp continuam fazendo vítimas. Saiba como se proteger e evitar prejuízos.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-01-16",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/anonovogolpe-scaled.jpeg",
  metaTitle: "Fraudes digitais em alta: como se proteger de golpes com PIX, links e WhatsApp",
  metaDescription: "Veja como funcionam os principais golpes digitais, como PIX falso e clonagem de WhatsApp, e saiba como se proteger.",
  readingTime: "5 min de leitura",
  tags: [
    "Golpes digitais",
    "PIX falso",
    "Fraudes online",
    "Clonagem de WhatsApp",
    "Segurança digital",
    "Direitos do consumidor"
  ],
  featured: false,
  content: `
    <p><strong>O ano muda, mas os golpes continuam os mesmos — e cada vez mais sofisticados.</strong> Fraudes digitais seguem em alta no Brasil, atingindo consumidores por meio de PIX falso, links maliciosos e clonagem de WhatsApp. Diante desse cenário, informação é a principal ferramenta para evitar prejuízos.</p>

    <br/>

    <h2>PIX falso: o golpe da pressa e da pressão</h2>

    <p>Um dos golpes mais comuns acontece quando o consumidor recebe um comprovante falso ou uma mensagem urgente solicitando transferência via PIX. A pressão emocional é parte da estratégia para induzir o erro.</p>

    <p>Antes de realizar qualquer pagamento, é fundamental confirmar se o valor realmente saiu da conta e desconfiar de pedidos feitos com urgência ou tom alarmista.</p>

    <br/>

    <h2>Links maliciosos: o risco escondido em um clique</h2>

    <p>Outro método bastante utilizado é o envio de links falsos por e-mail, SMS ou redes sociais. Muitas vezes, os golpistas se passam por bancos, lojas ou até órgãos públicos.</p>

    <p>Ao clicar, o consumidor pode ter seus dados roubados. Por isso, a orientação é clara: <strong>não clique em links suspeitos e nunca informe dados pessoais, senhas ou códigos fora dos canais oficiais.</strong></p>

    <br/>

    <h2>Clonagem de WhatsApp ainda faz vítimas</h2>

    <p>A clonagem de contas no WhatsApp continua sendo uma prática recorrente. Nesse tipo de golpe, o criminoso se passa por alguém conhecido e solicita dinheiro ou códigos enviados por SMS.</p>

    <p>É importante reforçar: nenhuma empresa ou pessoa confiável pede código de verificação. Ativar a verificação em duas etapas no aplicativo é uma das formas mais eficazes de proteção.</p>

    <br/>

    <h2>Dicas importantes para se proteger</h2>

    <p>Algumas atitudes simples podem evitar grandes prejuízos:</p>

    <p>Desconfie de mensagens urgentes ou com erros de português;<br/>
    Nunca compartilhe senhas ou códigos;<br/>
    Confirme sempre o destinatário antes de fazer um PIX;<br/>
    Ative a verificação em duas etapas nos aplicativos;<br/>
    Mantenha antivírus e sistema sempre atualizados.</p>

    <br/>

    <h2>Onde buscar ajuda em caso de golpe</h2>

    <p>Se você for vítima ou tiver dúvidas, é importante procurar orientação. Os canais de atendimento incluem o Fala Consumidor (SEDCON) pelo WhatsApp (21) 99336-4848 e o Disque 151 do PROCON-RJ.</p>

    <p>Também é possível buscar atendimento direto com a equipe por canais digitais. O importante é agir rápido para minimizar prejuízos e registrar a ocorrência.</p>

    <br/>

    <p><strong>A prevenção ainda é a melhor defesa.</strong> Em um ambiente digital cada vez mais complexo, estar atento e bem informado é essencial para não cair em armadilhas.</p>
  `
},

{
  slug: "trocas-pos-natal-direitos-consumidor",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Trocas pós-Natal: o que a loja é obrigada a aceitar?",
  subTitle: "Entenda quando a troca é obrigatória por lei, quando depende da política da loja e quais são seus direitos nas compras feitas pela internet.",
  excerpt: "Entenda quando a troca é obrigatória por lei, quando depende da política da loja e quais são seus direitos nas compras feitas pela internet.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2025-12-31",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/trocaposnatal-scaled.jpeg",
  metaTitle: "Trocas pós-Natal: quando a loja é obrigada a aceitar devolução ou troca",
  metaDescription: "Saiba quando você tem direito à troca ou devolução após o Natal e quando isso depende da política da loja.",
  readingTime: "6 min de leitura",
  tags: [
    "Troca de produtos",
    "Direito do consumidor",
    "Troca pós-Natal",
    "Produto com defeito",
    "Direito de arrependimento",
    "Compras online"
  ],
  featured: false,
  content: `
    <p><strong>Depois do Natal, uma cena se repete todos os anos:</strong> filas nas lojas, sacolas nas mãos e uma dúvida comum entre os consumidores — é possível trocar o presente recebido?</p>

    <p>A resposta depende da situação. Nem toda troca é obrigatória por lei, e entender essa diferença é fundamental para evitar frustrações e prejuízos.</p>

    <br/>

    <h2>Produto com defeito: troca é obrigatória</h2>

    <p>Se o presente veio com defeito, não há discussão: o consumidor tem direito à solução do problema. A loja tem até 30 dias para resolver a situação.</p>

    <p>Caso o defeito não seja solucionado dentro desse prazo, o consumidor pode escolher entre a troca do produto, a devolução do dinheiro ou o abatimento proporcional do valor.</p>

    <p>Em casos mais graves — quando o defeito compromete a qualidade ou o uso do produto — a troca ou devolução pode ser exigida de forma imediata, sem necessidade de aguardar os 30 dias.</p>

    <br/>

    <h2>Produto sem defeito: troca depende da loja</h2>

    <p>Quando o produto não apresenta defeito, a troca por gosto, tamanho ou cor não é uma obrigação legal. Nesse caso, a troca depende exclusivamente da política da loja.</p>

    <p>Por isso, é sempre importante verificar as regras antes da compra — seja no cupom fiscal, em cartazes ou no site do estabelecimento.</p>

    <br/>

    <h2>Compras pela internet têm regra diferente</h2>

    <p>Nas compras realizadas fora do estabelecimento físico — pela internet, telefone ou aplicativos — o consumidor tem o chamado <strong>direito de arrependimento</strong>.</p>

    <p>Isso significa que é possível desistir da compra em até sete dias corridos após o recebimento do produto, sem precisar justificar o motivo.</p>

    <p>Nesses casos, a empresa deve devolver integralmente o valor pago, incluindo o frete.</p>

    <br/>

    <h2>Etiqueta e embalagem: podem ser exigidas?</h2>

    <p>Para trocas por liberalidade da loja, é comum que sejam exigidos requisitos como etiqueta, embalagem original e ausência de uso.</p>

    <p>No entanto, quando há defeito no produto, essas exigências não podem impedir o exercício do direito do consumidor.</p>

    <br/>

    <h2>Dicas para evitar problemas nas trocas</h2>

    <p>Algumas atitudes simples ajudam a garantir seus direitos:</p>

    <p>Guarde sempre o cupom fiscal;<br/>
    Verifique a política de trocas antes de comprar;<br/>
    Evite retirar etiquetas antes de ter certeza sobre o produto;<br/>
    Teste o item o quanto antes, especialmente eletrônicos.</p>

    <br/>

    <h2>Quando procurar ajuda</h2>

    <p>Se houver dificuldade na troca ou devolução, o consumidor pode buscar orientação nos órgãos de defesa do consumidor, como o PROCON-RJ e a SEDCON.</p>

    <p>Entender seus direitos é a melhor forma de evitar dores de cabeça — e garantir que o presente não vire prejuízo.</p>
  `
},

{
  slug: "plano-de-celular-direitos-consumidor-fidelizacao-cancelamento",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Plano de celular sem pegadinhas: conheça seus direitos",
  subTitle: "Fidelização, internet lenta e dificuldade para cancelar estão entre as principais queixas dos consumidores. Saiba o que a lei garante.",
  excerpt: "Fidelização, internet lenta e dificuldade para cancelar estão entre as principais queixas dos consumidores. Saiba o que a lei garante.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-02-25",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/young-beautiful-woman-having-online-meeting.jpg-scaled.jpeg",
  metaTitle: "Plano de celular: direitos do consumidor sobre fidelização, cancelamento e qualidade",
  metaDescription: "Saiba seus direitos em planos de celular: fidelização, internet lenta, portabilidade e cancelamento sem burocracia.",
  readingTime: "5 min de leitura",
  tags: [
    "Plano de celular",
    "Fidelização",
    "Cancelamento de contrato",
    "Direitos do consumidor",
    "Internet lenta",
    "Portabilidade"
  ],
  featured: false,
  content: `
    <p><strong>Os planos de celular fazem parte do dia a dia dos brasileiros — mas também lideram as reclamações nos órgãos de defesa do consumidor.</strong> Problemas como cobranças indevidas, internet abaixo do prometido e dificuldade para cancelar são frequentes. A boa notícia é que o Código de Defesa do Consumidor garante direitos claros.</p>

    <br/>

    <h2>Fidelização: quando é permitida?</h2>

    <p>A fidelização só pode existir quando há um benefício real ao consumidor, como desconto no aparelho ou na mensalidade.</p>

    <p>Mesmo assim, existem regras: o prazo máximo é de 12 meses e todas as condições devem estar claras no contrato. Se a operadora descumprir o que foi prometido, a multa por quebra de fidelidade não pode ser cobrada.</p>

    <br/>

    <h2>Internet lenta: o serviço deve cumprir o que foi prometido</h2>

    <p>Se a internet não entrega a velocidade contratada, isso caracteriza falha na prestação do serviço.</p>

    <p>Nesse caso, o consumidor pode exigir desconto na fatura, a correção do problema ou até o cancelamento do contrato sem pagamento de multa.</p>

    <br/>

    <h2>Portabilidade é um direito seu</h2>

    <p>O consumidor pode mudar de operadora e manter o mesmo número de telefone, sem custos e sem precisar justificar.</p>

    <p>A empresa não pode dificultar o processo nem criar barreiras para impedir a troca.</p>

    <br/>

    <h2>Cancelamento deve ser simples</h2>

    <p>Cancelar um plano não pode ser uma batalha. O Código de Defesa do Consumidor proíbe práticas abusivas, como longas esperas, exigência de atendimento presencial ou transferências intermináveis.</p>

    <p>O processo deve ser rápido, claro e acessível.</p>

    <br/>

    <h2>Como evitar problemas</h2>

    <p>Algumas atitudes ajudam a evitar dores de cabeça:</p>

    <p>Leia o contrato com atenção antes de contratar;<br/>
    Guarde todos os protocolos de atendimento;<br/>
    Desconfie de ofertas com promessas exageradas;<br/>
    Registre qualquer problema imediatamente.</p>

    <br/>

    <h2>Procure seus direitos</h2>

    <p>Se houver abuso ou dificuldade na resolução do problema, o consumidor pode buscar ajuda nos órgãos de defesa do consumidor, como o PROCON-RJ e a SEDCON.</p>

    <p><strong>Informação clara não é favor — é obrigação.</strong> E consumidor bem informado não cai em pegadinhas.</p>
  `
},

{
  slug: "compras-online-golpes-pix-como-evitar",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Compras online e golpes no PIX: como comprar com segurança e evitar prejuízos",
  subTitle: "Sites falsos, anúncios enganosos e fraudes no PIX estão entre os principais riscos. Veja como se proteger e o que fazer se cair em um golpe.",
  excerpt: "Sites falsos, anúncios enganosos e fraudes no PIX estão entre os principais riscos. Veja como se proteger e o que fazer se cair em um golpe.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2025-12-17",
  authorImage: "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/golpesnopix-scaled.jpeg",
  metaTitle: "Golpes em compras online e PIX: como evitar fraudes e comprar com segurança",
  metaDescription: "Aprenda a identificar golpes em compras online e no PIX e saiba o que fazer para evitar prejuízos.",
  readingTime: "6 min de leitura",
  tags: [
    "Compras online",
    "Golpes no PIX",
    "Fraudes digitais",
    "Segurança digital",
    "Direitos do consumidor",
    "Sites falsos"
  ],
  featured: false,
  content: `
    <p><strong>Comprar pela internet virou hábito — mas também abriu espaço para golpes cada vez mais sofisticados.</strong> Sites falsos, anúncios enganosos e fraudes com PIX estão entre as principais armadilhas enfrentadas pelos consumidores.</p>

    <p>Com informação e atenção, é possível evitar prejuízos e comprar com mais segurança.</p>

    <br/>

    <h2>Antes de comprar: como identificar se o site é confiável</h2>

    <p>Muitos golpes acontecem porque o consumidor não consegue identificar um site falso. Alguns cuidados ajudam a evitar problemas:</p>

    <p>Desconfie de preços muito abaixo do normal — ofertas "imperdíveis" são usadas para atrair vítimas;<br/>
    Verifique se o site informa CNPJ, endereço, telefone e formas de contato;<br/>
    Pesquise a reputação da loja e avaliações de outros consumidores;<br/>
    Confira o endereço do site — golpistas costumam usar links parecidos com os originais;<br/>
    Evite clicar em links enviados por redes sociais ou mensagens.</p>

    <br/>

    <h2>Pagamento por PIX exige atenção redobrada</h2>

    <p>O PIX é rápido e prático, mas também se tornou uma ferramenta frequente em golpes.</p>

    <p><strong>O PIX é seguro quando:</strong><br/>
    É feito diretamente para empresas confiáveis;<br/>
    O pagamento ocorre dentro do próprio site oficial;<br/>
    O nome do destinatário confere com a empresa.</p>

    <p><strong>Desconfie quando:</strong><br/>
    A loja só aceita PIX e não oferece outras formas de pagamento;<br/>
    O vendedor pede para pagar por fora, via WhatsApp;<br/>
    O nome do recebedor é de pessoa física desconhecida;<br/>
    O link leva para páginas estranhas ou recém-criadas.</p>

    <br/>

    <h2>Golpes mais comuns</h2>

    <p>Entre os golpes mais frequentes estão:</p>

    <p>Sites falsos que imitam lojas conhecidas;<br/>
    Anúncios de produtos que nunca são entregues;<br/>
    Golpistas que se passam por atendentes e pedem pagamento via PIX;<br/>
    Links maliciosos que capturam dados do consumidor.</p>

    <br/>

    <h2>O que fazer se cair em um golpe</h2>

    <p>As medidas dependem da forma de pagamento:</p>

    <p><strong>Cartão de crédito:</strong><br/>
    Solicite o cancelamento da compra junto ao banco;<br/>
    Peça a contestação da cobrança.</p>

    <p><strong>PIX:</strong><br/>
    Entre em contato imediatamente com o banco;<br/>
    Informe que foi vítima de golpe e solicite o Mecanismo Especial de Devolução (MED);<br/>
    Registre ocorrência policial;<br/>
    Procure o PROCON-RJ ou a SEDCON.</p>

    <p><strong>Boleto:</strong><br/>
    Verifique quem recebeu o pagamento;<br/>
    O banco pode ajudar a identificar o destinatário.</p>

    <br/>

    <h2>Informação é a melhor proteção</h2>

    <p>Grande parte dos golpes acontece por falta de informação ou atenção. Verificar antes de pagar é sempre o melhor caminho.</p>

    <p><strong>Comprar online pode ser seguro — desde que o consumidor esteja atento.</strong></p>
  `
},

{
  slug: "credito-consignado-direitos-consumidor-emprestimo",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Crédito consignado: atenção aos seus direitos antes de contratar",
  subTitle: "Margem consignável, portabilidade e descontos indevidos estão entre os principais pontos de atenção. Saiba como evitar prejuízos.",
  excerpt: "Margem consignável, portabilidade e descontos indevidos estão entre os principais pontos de atenção. Saiba como evitar prejuízos.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-01-14",
  authorImage: "https://kngofnnx.com/wp-content/uploads/2026/04/creditoconsignado-1-scaled.jpeg",
  coverImage: "https://kngofnnx.com/wp-content/uploads/2026/04/creditoconsignado-1-scaled.jpeg",
  metaTitle: "Crédito consignado: direitos do consumidor e cuidados antes de contratar",
  metaDescription: "Saiba seus direitos no crédito consignado, como evitar descontos indevidos e o que fazer em caso de fraude.",
  readingTime: "6 min de leitura",
  tags: [
    "Crédito consignado",
    "Direitos do consumidor",
    "Empréstimo",
    "Descontos indevidos",
    "Margem consignável",
    "Fraudes financeiras"
  ],
  featured: false,
  content: `
    <p><strong>O crédito consignado é uma das modalidades de empréstimo mais utilizadas no Brasil</strong>, especialmente por aposentados, pensionistas e servidores públicos. Apesar dos juros mais baixos, essa facilidade exige atenção — principalmente quando o consumidor não conhece bem seus direitos.</p>

    <br/>

    <h2>Margem consignável: existe limite</h2>

    <p>Um dos pontos mais importantes é a margem consignável, que representa o limite da renda que pode ser comprometido com parcelas do empréstimo.</p>

    <p>Esse limite existe justamente para evitar o superendividamento. Quando a margem está totalmente utilizada, nenhuma nova contratação pode ser feita — nem mesmo em forma de refinanciamento disfarçado.</p>

    <p>Se houver desconto acima do permitido, o consumidor tem direito à correção imediata.</p>

    <br/>

    <h2>Portabilidade: você não é obrigado a ficar no mesmo banco</h2>

    <p>Muita gente não sabe, mas é possível transferir o empréstimo para outra instituição que ofereça juros menores.</p>

    <p>A portabilidade não pode gerar custos extras nem aumentar a dívida. Além disso, a liberação de dinheiro durante esse processo só pode ocorrer com autorização expressa do consumidor.</p>

    <p>Fique atento a propostas que prometem "troca com troco": elas podem esconder novas contratações indevidas.</p>

    <br/>

    <h2>Descontos indevidos e empréstimos não autorizados</h2>

    <p>Um problema cada vez mais comum é o surgimento de empréstimos consignados não autorizados.</p>

    <p>Muitos consumidores só percebem quando o valor começa a ser descontado no benefício. Essa prática é ilegal — nenhuma instituição pode contratar empréstimo sem consentimento claro do cliente.</p>

    <p>Nesses casos, o desconto deve ser suspenso imediatamente e os valores cobrados precisam ser devolvidos.</p>

    <br/>

    <h2>O que fazer em caso de irregularidade</h2>

    <p>Se identificar cobranças indevidas, siga este passo a passo:</p>

    <p>Solicite ao banco o contrato e o comprovante da autorização;<br/>
    Registre reclamação nos canais oficiais da instituição;<br/>
    Peça a suspensão imediata dos descontos;<br/>
    Procure o PROCON-RJ ou a SEDCON;<br/>
    Se necessário, busque orientação jurídica.</p>

    <br/>

    <h2>Cuidado com ofertas fáceis</h2>

    <p>Ofertas de empréstimo por telefone, mensagens ou redes sociais devem ser vistas com cautela — especialmente quando prometem dinheiro rápido sem análise.</p>

    <p>Além disso, é importante não confundir empréstimo consignado com cartão de crédito consignado. No cartão, o pagamento mínimo é descontado automaticamente, e o restante da dívida pode gerar juros altos.</p>

    <br/>

    <h2>Antes de contratar, faça as contas</h2>

    <p>Crédito consignado não é renda extra — é dívida. Antes de contratar, avalie sua capacidade de pagamento e desconfie de propostas milagrosas.</p>

    <p><strong>Informação é a melhor proteção contra abusos e golpes.</strong></p>
  `
}

];