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
  slug: "contrato-de-academia-direitos-do-consumidor",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Academia e contrato: o que o consumidor precisa saber antes de assinar",
  subTitle:
    "Reajuste sem aviso, multa de fidelização e dificuldade para cancelar estão entre os principais problemas enfrentados por consumidores em contratos de academia.",
  excerpt:
    "Vai se matricular em academia? Saiba o que o contrato precisa ter, quando o reajuste é abusivo e como funciona o cancelamento.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-26",
  authorImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  metaTitle: "Contrato de academia: direitos do consumidor antes de assinar",
  metaDescription:
    "Vai se matricular em academia? Saiba o que o contrato precisa ter, quando o reajuste é abusivo e como funciona o cancelamento. Conheça seus direitos.",
  readingTime: "4 min de leitura",
  tags: [
    "Contrato de academia",
    "Cancelamento de academia",
    "Reajuste de mensalidade",
    "Direito do consumidor"
  ],
  featured: false,
  content: `
    <p><strong>Matrícula em academia parece simples — mas o contrato pode esconder armadilhas.</strong> Reajuste sem aviso, multa abusiva e dificuldade para cancelar são problemas reais. Conheça seus direitos antes de colocar o tênis.</p>

    <p>Com a chegada de um novo ano, a promessa de saúde, bem-estar e disposição leva muita gente direto ao balcão de matrícula das academias. E não tem nada de errado nisso — o problema começa quando o entusiasmo fala mais alto do que a atenção ao contrato.</p>

    <p>Reajuste inesperado na mensalidade, multa alta para cancelar, cláusulas que ninguém explicou na hora da venda... Tudo isso pode transformar uma decisão saudável em uma dor de cabeça jurídica. Por isso, antes de assinar qualquer coisa, vale entender o que diz a lei sobre contrato de academia e direitos do consumidor.</p>

    <h2>A academia pode aumentar a mensalidade quando quiser?</h2>

    <p>Não. O reajuste de mensalidade só é permitido se estiver claramente previsto no contrato, com critérios objetivos e transparentes — por exemplo, reajuste anual pelo IPCA ou por outro índice definido previamente.</p>

    <p>Reajuste surpresa, sem aviso prévio, sem justificativa ou sem previsão contratual, é considerado prática abusiva e pode ser contestado. Se isso aconteceu com você, guarde o contrato, o histórico de cobranças e registre sua reclamação.</p>

    <div class="article-callout">
      <strong>Atenção:</strong><br />
      Se a academia aumentou a mensalidade sem aviso e sem previsão contratual clara, o consumidor pode contestar a cobrança e exigir explicações formais.
    </div>

    <h2>E a fidelização? A academia pode cobrar multa se eu cancelar?</h2>

    <p>Pode — mas dentro de limites. A multa por cancelamento antecipado é permitida quando é razoável e proporcional ao tempo que falta para encerrar o período de fidelização.</p>

    <p>O que não é permitido é cobrar um valor tão alto que praticamente inviabiliza o cancelamento. Isso fere o direito de cancelamento de academia e pode ser considerado cláusula abusiva.</p>

    <div class="article-callout">
      <strong>Exemplo prático:</strong><br />
      Em um contrato de 12 meses, se o consumidor já cumpriu boa parte do prazo, a multa deve ser proporcional ao período restante — não ao valor integral do contrato.
    </div>

    <h2>Contratei pela internet. Tenho alguma proteção especial?</h2>

    <p>Sim, e essa é uma das proteções mais importantes para quem assina plano de academia pelo site ou aplicativo: o direito de arrependimento.</p>

    <p>Se a contratação foi feita online, você pode cancelar o contrato em até 7 dias corridos a partir da data da assinatura — sem precisar apresentar nenhuma justificativa e com direito a reembolso integral do valor pago.</p>

    <p>Esse prazo é garantido pelo Código de Defesa do Consumidor e vale para qualquer contratação feita à distância, ou seja, sem que você tenha ido pessoalmente ao estabelecimento para fechar o negócio.</p>

    <h2>Dicas práticas antes de assinar o contrato de academia</h2>

    <p>Antes de colocar a caneta no papel — ou o dedo na tela — preste atenção nesses pontos:</p>

    <ul>
      <li>Leia todas as cláusulas com calma, inclusive as letras miúdas</li>
      <li>Exija uma cópia do contrato</li>
      <li>Verifique as regras de cancelamento e reajuste antes de assumir qualquer compromisso</li>
      <li>Desconfie de promessas verbais: o que vale é o que está no contrato</li>
      <li>Guarde todos os comprovantes de pagamento desde a primeira mensalidade</li>
    </ul>

    <h2>Na hora de cancelar, a academia precisa facilitar</h2>

    <p>Assim como na contratação de qualquer serviço, o cancelamento de academia não pode ser transformado em obstáculo. Exigir documentos desnecessários, criar burocracia excessiva ou dificultar o encerramento do contrato é prática irregular.</p>

    <p>A academia deve oferecer canais acessíveis para o cancelamento — e o processo deve ser simples, direto e sem armadilhas.</p>

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
  subTitle:
    "Foto diferente da realidade, reserva não honrada ou cobrança indevida estão entre os principais problemas enfrentados por hóspedes na alta temporada.",
  excerpt:
    "Foto bonita no site, realidade decepcionante na chegada? Saiba quais são os direitos do hóspede em hotéis e pousadas e o que exigir quando algo dá errado.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-26",
  authorImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  metaTitle: "Direitos do hóspede em hotéis e pousadas: o que exigir",
  metaDescription:
    "Foto diferente da realidade, reserva não honrada ou cobrança indevida? Conheça os direitos do hóspede em hotéis e pousadas e saiba o que exigir.",
  readingTime: "5 min de leitura",
  tags: [
    "Direitos do hóspede",
    "Hotel e pousada",
    "Propaganda enganosa",
    "Direito do consumidor"
  ],
  featured: false,
  content: `
    <p><strong>Foto bonita no site, realidade decepcionante na chegada — isso é mais comum do que parece.</strong> Saiba quais são os direitos do hóspede em hotéis e pousadas e o que exigir quando algo dá errado.</p>

    <p>O verão chegou, as malas estão prontas e a expectativa está lá em cima. Mas junto com a alta temporada, crescem também as reclamações de consumidores que encontram uma realidade bem diferente do que foi anunciado.</p>

    <p>Quarto menor do que parecia nas fotos, piscina interditada, reserva que "sumiu" no sistema ou cobrança surpresa no check-out são situações recorrentes.</p>

    <p>Conhecer os direitos do hóspede em hotéis e pousadas faz toda a diferença para evitar prejuízos e não deixar a viagem virar um problema.</p>

    <h2>1. Propaganda enganosa: quando a foto não corresponde à realidade</h2>

    <p>Fotos antigas, editadas ou que induzem o consumidor ao erro são proibidas pelo Código de Defesa do Consumidor. A publicidade deve refletir exatamente o serviço oferecido.</p>

    <p>Isso vale para anúncios no site do hotel, plataformas de reserva ou redes sociais.</p>

    <p><strong>Exemplos comuns:</strong></p>

    <ul>
      <li>Piscina que parece grande nas fotos, mas é muito menor na prática</li>
      <li>Quarto anunciado como "vista para o mar", mas voltado para outro local</li>
      <li>Fotos antigas de instalações já deterioradas</li>
    </ul>

    <div class="article-callout">
      <strong>O que você pode exigir:</strong><br />
      Acomodação equivalente ao anunciado, desconto proporcional na diária ou cancelamento com devolução integral do valor pago.
    </div>

    <p><strong>Dica prática:</strong> salve prints do anúncio com fotos e descrição antes da viagem. Isso serve como prova.</p>

    <h2>2. Reserva não honrada: pagou e não tem quarto?</h2>

    <p>Isso é ilegal. Uma vez confirmada a reserva e realizado o pagamento, o hotel não pode simplesmente negar a hospedagem.</p>

    <p><strong>O consumidor pode exigir:</strong></p>

    <ul>
      <li>Hospedagem em local de categoria equivalente ou superior, sem custo adicional</li>
      <li>Reembolso de despesas extras (como transporte até outro hotel)</li>
      <li>Eventual indenização pelos danos causados</li>
    </ul>

    <div class="article-callout">
      <strong>Atenção:</strong><br />
      Overbooking ou falha interna não podem ser repassados ao consumidor.
    </div>

    <h2>3. Cobranças indevidas no check-out</h2>

    <p>Toda cobrança precisa ser informada previamente e aceita pelo consumidor.</p>

    <p>Taxas como serviço, limpeza, resort ou diárias extras devem estar claras antes da confirmação da reserva.</p>

    <p>Se surgir um valor inesperado:</p>

    <ul>
      <li>Peça a discriminação detalhada da cobrança</li>
      <li>Questione imediatamente</li>
      <li>Não pague o que não foi previamente acordado</li>
    </ul>

    <div class="article-callout">
      <strong>O que fazer:</strong><br />
      Registre a cobrança, guarde comprovantes e formalize reclamação na plataforma ou nos órgãos de defesa do consumidor.
    </div>

    <h2>4. No-show: a multa pode ser abusiva?</h2>

    <p>No-show ocorre quando o hóspede não comparece. A cobrança é permitida, mas precisa estar claramente informada no momento da reserva.</p>

    <p>Cláusulas que cobram o valor total da estadia em qualquer situação, sem proporcionalidade, podem ser consideradas abusivas.</p>

    <h2>Dicas essenciais antes e durante a hospedagem</h2>

    <ul>
      <li>Guarde prints do anúncio e da confirmação da reserva</li>
      <li>Leia as regras de cancelamento e política de no-show</li>
      <li>Exija comprovantes, recibos ou e-mails formais</li>
      <li>Questione qualquer cobrança não prevista</li>
      <li>Documente problemas com fotos, vídeos e protocolos</li>
    </ul>

    <h2>Problema não resolvido? Procure ajuda</h2>

    <p>Se o hotel ou pousada não resolver a situação, o consumidor pode acionar os canais oficiais</p>

    
  `
},

{
  slug: "direitos-basicos-do-consumidor",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Direitos básicos do consumidor: o que todo cidadão precisa saber antes de comprar",
  subTitle:
    "Produto com defeito, propaganda enganosa ou cobrança indevida estão entre as situações em que o Código de Defesa do Consumidor protege você.",
  excerpt:
    "Produto com defeito, propaganda enganosa ou cobrança indevida? Conheça os direitos básicos do consumidor e saiba como o CDC protege você no dia a dia.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-26",
  authorImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  metaTitle: "Direitos básicos do consumidor: o que você precisa saber",
  metaDescription:
    "Produto com defeito, propaganda enganosa ou cobrança indevida? Conheça os direitos básicos do consumidor e saiba como o CDC protege você no dia a dia.",
  readingTime: "5 min de leitura",
  tags: [
    "Direitos do consumidor",
    "Código de Defesa do Consumidor",
    "Garantia legal",
    "Compras online"
  ],
  featured: true,
  content: `
    <p><strong>Produto com defeito, propaganda enganosa, cobrança indevida — o Código de Defesa do Consumidor garante proteção em todas essas situações.</strong> Conheça os direitos básicos do consumidor e saiba como se proteger no dia a dia.</p>

    <p>Você já devolveu um produto com defeito e a loja se recusou a trocar? Já viu um anúncio com uma oferta incrível que, na hora de comprar, simplesmente "não existia mais"? Já foi cobrado por algo que nunca contratou?</p>

    <p>Se respondeu sim para qualquer uma dessas perguntas, saiba que em todas elas a lei estava do seu lado — e você talvez não soubesse.</p>

    <p>O Código de Defesa do Consumidor, conhecido como CDC, existe exatamente para isso: garantir que o consumidor não fique desamparado diante de abusos.</p>

    <div class="article-callout">
      <strong>Importante:</strong><br />
      Conhecer seus direitos é a principal forma de evitar prejuízos e exigir respeito nas relações de consumo.
    </div>

    <h2>1. Direito à informação clara e verdadeira</h2>

    <p>Antes de fechar qualquer compra ou contrato, você tem o direito de receber todas as informações relevantes sobre o produto ou serviço.</p>

    <p>Preço, validade, características, forma de uso e eventuais riscos devem ser informados de forma clara e acessível.</p>

    <p>O fornecedor não pode esconder condições importantes em letras miúdas ou omitir informações que possam influenciar sua decisão.</p>

    <h2>2. Proteção contra propaganda enganosa</h2>

    <p>Se a empresa prometeu, ela é obrigada a cumprir. A oferta feita em qualquer canal vincula o contrato.</p>

    <p>Isso significa que o consumidor tem direito de receber exatamente o que foi anunciado — seja em site, redes sociais, vitrine ou publicidade.</p>

    <div class="article-callout">
      <strong>Atenção:</strong><br />
      Se a oferta não for cumprida, o consumidor pode exigir o produto, aceitar outro equivalente ou cancelar a compra com devolução do valor pago.
    </div>

    <h2>3. Segurança nos produtos e serviços</h2>

    <p>Todo produto ou serviço colocado no mercado precisa ser seguro para quem utiliza.</p>

    <p>Isso vale para alimentos, eletrônicos, medicamentos, brinquedos e qualquer outro item.</p>

    <p>Se houver risco, o fornecedor deve avisar claramente. Em casos mais graves, o produto deve ser retirado do mercado — como ocorre nos recalls.</p>

    <h2>4. Garantia legal: direito de conserto, troca ou devolução</h2>

    <p>A lei garante um prazo mínimo de garantia, independentemente de qualquer garantia adicional oferecida pela loja.</p>

    <ul>
      <li><strong>Produtos duráveis:</strong> 90 dias de garantia legal</li>
      <li><strong>Produtos não duráveis:</strong> 30 dias de garantia legal</li>
    </ul>

    <p>Se o produto apresentar defeito dentro desse prazo, o consumidor pode exigir solução — seja conserto, troca ou devolução do dinheiro.</p>

    <div class="article-callout">
      <strong>Direito garantido:</strong><br />
      A empresa não pode se recusar a resolver o problema dentro do prazo legal.
    </div>

    <h2>5. Direito a um atendimento digno</h2>

    <p>O consumidor tem direito a ser tratado com respeito em qualquer atendimento.</p>

    <p>Humilhação, grosseria, discriminação ou constrangimento podem gerar indenização por danos morais.</p>

    <p>Esse direito vale para lojas, bancos, operadoras, serviços públicos e qualquer relação de consumo.</p>

    <h2>6. Direito de arrependimento em compras online</h2>

    <p>Compras feitas pela internet, telefone ou aplicativo têm proteção especial.</p>

    <p>O consumidor pode desistir em até 7 dias corridos, sem necessidade de justificativa.</p>

    <p>A devolução deve ser integral, incluindo o frete.</p>

    <div class="article-callout">
      <strong>Atenção:</strong><br />
      A empresa não pode obrigar o consumidor a aceitar crédito ou vale no lugar do dinheiro.
    </div>

    <h2>Por que conhecer seus direitos faz diferença?</h2>

    <p>Quando o consumidor conhece seus direitos, fica muito mais difícil ser enganado.</p>

    <p>E quando mais pessoas exercem esses direitos, o mercado melhora para todos — práticas abusivas diminuem e o respeito passa a ser regra.</p>

    <p><strong>Informação é o melhor instrumento de defesa do consumidor.</strong></p>
  `
},

{
  slug: "atraso-na-entrega-direitos-do-consumidor",
  source: "Diário do Rio",
  category: "Defesa do Consumidor",
  title: "Compra atrasada: conheça seus direitos quando a entrega não chega no prazo",
  subTitle:
    "Atraso na entrega não é apenas um transtorno — gera direitos reais, como cancelamento, reembolso e até indenização.",
  excerpt:
    "Compra atrasada? Saiba o que a lei garante em caso de atraso na entrega: cancelamento, reembolso, abatimento e quando pedir indenização.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-26",
  authorImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  metaTitle: "Atraso na entrega: direitos do consumidor e o que fazer",
  metaDescription:
    "Compra atrasada? Saiba o que a lei garante em caso de atraso na entrega: cancelamento, reembolso, abatimento e quando pedir indenização.",
  readingTime: "5 min de leitura",
  tags: [
    "Atraso na entrega",
    "Direitos do consumidor",
    "Compra online",
    "Reembolso"
  ],
  featured: false,
  content: `
    <p><strong>Pediu, pagou, esperou — e nada.</strong> O atraso na entrega não é apenas um incômodo: ele gera direitos reais para o consumidor, incluindo cancelamento com reembolso total.</p>

    <p>Você fez a compra, anotou o prazo prometido, acompanhou o rastreamento — e a data simplesmente passou sem nenhuma atualização.</p>

    <p>Essa situação é mais comum do que deveria, mas a lei é clara: quando há atraso, a empresa precisa responder. E quem escolhe a solução é o consumidor.</p>

    <div class="article-callout">
      <strong>Importante:</strong><br />
      O prazo informado no momento da compra faz parte do contrato e deve ser cumprido.
    </div>

    <h2>A empresa é obrigada a cumprir o prazo informado</h2>

    <p>Não importa onde o prazo foi divulgado — site, aplicativo, loja física ou anúncio. Se a empresa informou uma data, ela é obrigada a cumprir.</p>

    <p>Mesmo que a loja comunique o atraso depois, o consumidor não é obrigado a aceitar um novo prazo.</p>

    <p>Quando o prazo não é respeitado, caracteriza-se falha na prestação do serviço — e o Código de Defesa do Consumidor garante proteção.</p>

    <h2>Quais são os seus direitos em caso de atraso?</h2>

    <p>Quando a entrega atrasa, você tem o direito de escolher o que fazer. As opções são:</p>

    <h3>1. Cancelar a compra e receber o dinheiro de volta</h3>

    <p>Você pode cancelar o pedido e exigir reembolso total e imediato, incluindo o frete.</p>

    <div class="article-callout">
      <strong>Atenção:</strong><br />
      A loja não pode obrigar você a aceitar crédito ou vale-compra no lugar do dinheiro.
    </div>

    <h3>2. Pedir abatimento no preço</h3>

    <p>Se ainda quiser o produto, é possível negociar um desconto proporcional pelo atraso.</p>

    <h3>3. Manter a compra com novo prazo definido</h3>

    <p>Você pode aceitar um novo prazo, mas exija que ele seja formalizado — com protocolo ou registro.</p>

    <h2>E quando a transportadora diz que tentou entregar?</h2>

    <p>É comum aparecer no sistema: “destinatário ausente”. Mas muitas vezes ninguém esteve no local.</p>

    <p>Nesse caso:</p>

    <ul>
      <li>Registre provas (foto com data e hora)</li>
      <li>Conteste a informação com a loja</li>
      <li>Exija nova entrega sem custo</li>
    </ul>

    <div class="article-callout">
      <strong>Importante:</strong><br />
      O problema da transportadora é responsabilidade da loja, não do consumidor.
    </div>

    <h2>Quando cabe indenização?</h2>

    <p>Nem todo atraso gera indenização, mas em alguns casos ela é possível.</p>

    <p>Exemplos:</p>

    <ul>
      <li>Produto comprado para uma data específica (evento, viagem, trabalho)</li>
      <li>Item essencial que gerou prejuízo financeiro</li>
      <li>Gastos extras causados pelo atraso</li>
    </ul>

    <h2>O que fazer na prática</h2>

    <p>Se sua entrega atrasou, siga esse passo a passo:</p>

    <ol>
      <li>Guarde provas: anúncio com prazo, pedido e pagamento</li>
      <li>Entre em contato com a loja e registre protocolo</li>
      <li>Peça solução por escrito</li>
      <li>Sem resposta? Procure os órgãos de defesa do consumidor</li>
    </ol>

    <h2>Se não resolver, procure ajuda</h2>


  `
}

];