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
  subTitle:
    "Foto diferente da realidade, reserva não honrada ou cobrança indevida? Conheça os direitos do hóspede em hotéis e pousadas e saiba o que exigir.",
  excerpt:
    "Foto bonita no site, realidade decepcionante na chegada? Saiba quais são os direitos do hóspede em hotéis e pousadas e o que exigir quando algo dá errado.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-30",
  authorImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  metaTitle: "Viagem de verão: conheça os direitos do hóspede em hotéis e pousadas",
  metaDescription:
    "Foto diferente da realidade, reserva não honrada ou cobrança indevida? Conheça os direitos do hóspede em hotéis e pousadas e saiba o que exigir.",
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
  subTitle:
    "Saiba o que fazer quando a entrega atrasa: conheça seus direitos, as opções de reembolso e como reclamar nos órgãos de defesa do consumidor.",
  excerpt:
    "Saiba o que fazer quando a entrega atrasa: conheça seus direitos, as opções de reembolso e como reclamar nos órgãos de defesa do consumidor.",
  author: "Gutemberg Fonseca",
  role: "Coluna de Defesa do Consumidor",
  date: "2026-03-30",
  authorImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  metaTitle: "Prazo de entrega e atrasos: o que fazer quando a compra não chega",
  metaDescription:
    "Saiba o que fazer quando a entrega atrasa: conheça seus direitos, as opções de reembolso e como reclamar nos órgãos de defesa do consumidor.",
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
  slug: "vagao-feminino-rj-24-horas",
  source: "Portal Pessoal",
  category: "Segurança Pública",
  title: "Vagão feminino RJ 24 horas: o que muda na rotina das mulheres no transporte público",
  subTitle:
    "Vagão feminino RJ agora funciona 24h. Entenda o impacto na rotina e na segurança das mulheres no transporte público.",
  excerpt:
    "Quantas mulheres já passaram por situações constrangedoras no trem ou no metrô? Conheça os avanços e o que muda com o funcionamento 24h do vagão feminino.",
  author: "Gutemberg Fonseca",
  role: "Secretário de Estado de Defesa do Consumidor",
  date: "2025-03-25",
  authorImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  coverImage:
    "https://diariodorio.com/wp-content/uploads/2025/12/cropped-Secretario-de-Estado-de-Defesa-do-Consumidor-Gutemberg-Fonseca--96x96.png",
  metaTitle: "Vagão feminino RJ 24 horas: segurança das mulheres no transporte público",
  metaDescription:
    "Vagão feminino RJ agora funciona 24h. Entenda o impacto na rotina e na segurança das mulheres no transporte público.",
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
}

];