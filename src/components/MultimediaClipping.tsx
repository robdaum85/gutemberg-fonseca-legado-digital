
import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter,
  Share2,
  ExternalLink
} from 'lucide-react';

const MultimediaClipping = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  // Dados dos vídeos - atualizados com os novos IDs do YouTube
  const videos = [
    {
      id: "fC0VS6gZBXw",
      title: "Entrevista RJTV",
      caption: "Entrevista no RJTV – Maio/2025",
    },
    {
      id: "UKt484G9Oe8",
      title: "Ações da SEDCON",
      caption: "TV Rio – Abril/2025",
    },
    {
      id: "mDm-5C9ZNwI",
      title: "Defesa do Consumidor",
      caption: "Band Rio – Março/2025",
    },
  ];

  // Dados do clipping - 65 clippings (22 novos + 43 anteriores)
  const newsClipping = [
    // Notícias da Operação Malha Fina e Expresso do Consumidor - Dezembro 2025
    {
      date: "05/12/2025",
      source: "Bom Dia Rio",
      vehicle: "Televisão",
      title: "14 toneladas de camisas falsificadas do Flamengo apreendidas em Rio das Ostras",
      summary: "Fábrica clandestina interditada pela SEDCON e PROCON-RJ - maior apreensão da história do estado",
      url: "https://imagens.empauta.com/video/eJxzDPcNSHQLKnTMSvYPMAzKdMwt9--2FIqD8sJqyoIjcwJNXMMCQvxDcsxANJJ--2Fm6BhhHupkGR5Z5GYbkp4X5hYeZOztkeSTlu6Y7hpoGRho6VoVluwVGObnkAEYsczg--3D--3D.mp4"
    },
    {
      date: "05/12/2025",
      source: "Jornal BandNews Rio 1ª Edição",
      vehicle: "Rádio",
      title: "Sedcon e Procon-RJ apreendem 14,5 toneladas de produtos falsificados em Rio das Ostras",
      summary: "Maior apreensão de produtos falsificados da história do estado do Rio de Janeiro",
      url: "https://imagens.empauta.com/audio/eJwFwc0KwyAMAOBHGh077JrQ0FUwRTBRcpVScAo79e--2Fp930yzmSh3Bhfy7KVEzvremhLtQBv9pMpkDX3wOoyg35zeo9eXdenJQ60Y2xxBX9KxmCgXSoRD3DhJB8Pcv8BFawfug--3D--3D.mp3"
    },
    {
      date: "05/12/2025",
      source: "CBN Rio",
      vehicle: "Rádio",
      title: "15 toneladas de peças falsificadas apreendidas em Rio das Ostras",
      summary: "Fábrica clandestina interditada pela SEDCON e PROCON-RJ",
      url: "https://imagens.empauta.com/audio/eJwFwTEOgzAMBdADdQGWdnVKQonARBXfwVyAKoSJIaKn5z3MDBb54djcmE2O6dX7rI05TsN1dZmW3ur4gQi7Fp--2Bk0ymQXohEWssTXfkMbt1l--2FUKJN8x9CM7--2BpRXR7Pcb4iIfGw--3D--3D.mp3"
    },
    {
      date: "05/12/2025",
      source: "Diário do Rio",
      vehicle: "Portal de Notícias",
      title: "Operação Malha Fina desmonta fábrica clandestina e faz maior apreensão de produtos falsificados do RJ",
      summary: "Ação em Rio das Ostras resultou na maior apreensão da história do estado",
      url: "https://diariodorio.com/operacao-malha-fina-desmonta-fabrica-clandestina-e-faz-maior-apreensao-de-produtos-falsificados-do-rj/"
    },
    {
      date: "05/12/2025",
      source: "Agenda do Poder",
      vehicle: "Portal de Notícias",
      title: "Maior apreensão do Rio retira 14,5 t de produtos falsificados de circulação",
      summary: "SEDCON e PROCON-RJ realizam operação histórica contra falsificação",
      url: "https://agendadopoder.com.br/maior-apreensao-do-rio-retira-145-t-de-produtos-falsificados-de-circulacao/"
    },
    {
      date: "05/12/2025",
      source: "TV Prefeito",
      vehicle: "Portal de Notícias",
      title: "Maior apreensão de produtos falsificados da história do estado descobre fábrica clandestina em Rio das Ostras",
      summary: "Operação na Região dos Lagos resultou em apreensão recorde",
      url: "https://tvprefeito.com/maior-apreensao-de-produtos-falsificados-da-historia-do-estado-descobre-fabrica-clandestina-em-rio-das-ostras-na-regiao-dos-lagos/"
    },
    {
      date: "04/12/2025",
      source: "Jornal BandNews Rio",
      vehicle: "Rádio",
      title: "Sedcon, Procon-RJ e PM apreendem 11 toneladas de produtos falsificados na Taquara",
      summary: "Operação Malha Fina combate comércio de produtos falsificados",
      url: "https://imagens.empauta.com/audio/eJwNyjkKgDAQAMAvGUGtN--2Bh64JFzYyxFEEIidoKv12qaATeJPaoTAiyCqQtSMwwPRXpv66MtwZCZKGa--2F--2B4KSrW2h--2FNPnlA43I1W8PrsRMYDmckN4bUDtJYY6L--2Bz--2F2Aftix7F.mp3"
    },
    {
      date: "04/12/2025",
      source: "Manchete RJ",
      vehicle: "Portal de Notícias",
      title: "Expresso do Consumidor chega a Campos com emissão de documentos, exame de vista e orientação jurídica",
      summary: "Serviços gratuitos para a população de Campos dos Goytacazes",
      url: "https://mancheterj.com/expresso-do-consumidor-chega-a-campos-com-emissao-de-documentos-exame-de-vista-e-orientacao-juridica/"
    },
    {
      date: "04/12/2025",
      source: "TV Prefeito",
      vehicle: "Portal de Notícias",
      title: "Operação Malha Fina apreende 11,8 toneladas de produtos com indícios de falsificação",
      summary: "Ação na Taquara combate comércio irregular de produtos",
      url: "https://tvprefeito.com/operacao-malha-fina-apreende-118-toneladas-de-produtos-com-indicios-de-falsificacao/"
    },
    {
      date: "04/12/2025",
      source: "Diário do Rio",
      vehicle: "Portal de Notícias",
      title: "Operação Malha Fina apreende 11,8 toneladas de produtos suspeitos de falsificação na Taquara",
      summary: "SEDCON e PROCON-RJ em ação conjunta contra falsificação",
      url: "https://diariodorio.com/operacao-malha-fina-apreende-118-toneladas-de-produtos-suspeitos-de-falsificacao-na-taquara/"
    },
    {
      date: "04/12/2025",
      source: "Agenda do Poder",
      vehicle: "Portal de Notícias",
      title: "Operação Malha Fina apreende 11,8 t de produtos falsificados no Rio",
      summary: "Ação de fiscalização combate comércio de produtos irregulares",
      url: "http://agendadopoder.com.br/operacao-malha-fina-apreende-118-t-de-produtos-falsificados-no-rio/"
    },
    {
      date: "04/12/2025",
      source: "Enfoco",
      vehicle: "Portal de Notícias",
      title: "Toneladas de produtos falsificados são apreendidas no Rio pela Sedcon, Procon-RJ e PM",
      summary: "Operação conjunta retira produtos irregulares de circulação",
      url: "https://enfoco.com.br/noticias/cidades/rio/toneladas-de-produtos-falsificados-sao-apreendidas-no-rio-135316?_=amp"
    },
    {
      date: "03/12/2025",
      source: "Mensageiro RN",
      vehicle: "Portal de Notícias",
      title: "Procon-RJ leva Expresso do Consumidor a Campos com serviços gratuitos nesta quinta",
      summary: "Serviços de atendimento ao consumidor chegam a Campos dos Goytacazes",
      url: "https://mensageironf.com.br/procon-rj-leva-expresso-do-consumidor-a-campos-com-servicos-gratuitos-nesta-quinta/"
    },
    {
      date: "03/12/2025",
      source: "O Dia",
      vehicle: "Portal de Notícias",
      title: "Consumidor recebe atendimento social em Campos através de Expresso do Consumidor",
      summary: "Projeto itinerante leva serviços gratuitos à população",
      url: "https://odia.ig.com.br/campos/2025/12/7174182-consumidor-recebe-atendimento-social-em-campos-atraves-de-expresso.html"
    },
    {
      date: "03/12/2025",
      source: "Capital FM Radio",
      vehicle: "Portal de Notícias",
      title: "Campos dos Goytacazes recebe o Expresso do Consumidor e Consumidor Social",
      summary: "Serviços gratuitos incluem emissão de documentos e orientação jurídica",
      url: "https://capitalfmradio.com.br/campos-dos-goytacazes-recebe-o-expresso-do-consumidor-e-consumidor-social-na-proxima-quinta-feira-04-12/"
    },
    {
      date: "03/12/2025",
      source: "Campos 24 Horas",
      vehicle: "Portal de Notícias",
      title: "Expresso do Consumidor chega a Campos com serviços gratuitos",
      summary: "População de Campos recebe atendimento especializado da SEDCON",
      url: "https://campos24horas.com.br/noticia/600117"
    },
    {
      date: "03/12/2025",
      source: "Atualiza AI 20",
      vehicle: "Portal de Notícias",
      title: "Expresso do Consumidor em Campos: serviços gratuitos e atendimento social",
      summary: "Projeto leva serviços essenciais à população do interior",
      url: "https://atualizaai20.com.br/noticia.php?id=456"
    },
    {
      date: "03/12/2025",
      source: "Folha da Terra Digital",
      vehicle: "Portal de Notícias",
      title: "Procon-RJ leva serviços gratuitos a Campos com Expresso do Consumidor",
      summary: "Atendimento itinerante beneficia consumidores do interior do estado",
      url: "https://folhadaterradigital.com.br/policia/procon/"
    },
    {
      date: "03/12/2025",
      source: "Jornal BandNews Rio 2ª Edição",
      vehicle: "Rádio",
      title: "11 toneladas de produtos falsificados apreendidas na Taquara",
      summary: "Operação Malha Fina combate comércio de produtos irregulares",
      url: "https://imagens.empauta.com/audio/eJwNxUEKgzAQBdArmYgHmOkYE8TAiPmQuUChabs02NPbt3kQKxncSLbH5sKXPS1rSBfkjer6D58kFfvErxQtlKEsKWal--2FzOZzicfjVZnDaOhan6y15iDegjUOvUbm--2BYdvg--3D--3D.mp3"
    },
    {
      date: "02/12/2025",
      source: "ASSERJ",
      vehicle: "Portal de Notícias",
      title: "Retirada imediata: Operação Café Real aponta marcas irregulares",
      summary: "Fiscalização identifica marcas de café com irregularidades",
      url: "https://asserj.com.br/pt/w/retirada-imediata-operacao-cafe-real-aponta-marcas-irregulares"
    },
    {
      date: "02/12/2025",
      source: "Enfoco e Diário do Rio",
      vehicle: "Portal de Notícias",
      title: "11,8 toneladas de produtos com indícios de falsificação apreendidas na Taquara",
      summary: "Operação Malha Fina retira produtos irregulares de circulação",
      url: "https://enfoco.com.br/noticias/cidades/rio/toneladas-de-produtos-falsificados-sao-apreendidas-no-rio-135316"
    },
    // Clippings anteriores
    {
      source: "Dia Online",
      vehicle: "Governador/Defesa do Consumidor",
      title: "Comissão formada após morte de turista apresenta relatório de melhorias no Cristo Redentor",
      summary: "Força-tarefa apresenta medidas para aumentar a segurança e qualidade dos serviços no Cristo Redentor.",
      url: "https://odia.ig.com.br/rio-de-janeiro/2025/04/7030667-comissao-formada-apos-morte-de-turista-apresenta-relatorio-de-melhorias-no-cristo-redentor.html"
    },
    {
      source: "Jornal BandNews Rio 2ª Edição",
      vehicle: "BandNews FM",
      title: "Cristo Redentor terá elevador até novembro, segundo Secretaria de Estado de Defesa do Consumidor",
      summary: "Secretaria anuncia prazo para instalação de elevador para garantir acessibilidade no monumento.",
      url: "https://imagens.empauta.com/audio/eJwFwUEKgCAQAMA3WdDdNbMIBcW29CYWpkTQSfD1zWCLs0--2BuUqtBEpF3njOnMdOdhIC1bSJOazLvWJLwVT0olHXEFyjeXogfZRyCPgfo7sPh0rYWuXxihU4LSX--2FcJB9j.mp"
    },
    {
      source: "AM Post",
      vehicle: "Portal de Notícias",
      title: "Comissão do Cristo Redentor tem segunda reunião após morte de turista",
      summary: "Segunda reunião da comissão discute melhorias na segurança e atendimento aos visitantes.",
      url: "https://ampost.com.br/brasil/comissao-do-cristo-redentor-tem-segunda-reuniao-apos-morte-de-turista/"
    },
    {
      source: "Diário do Rio",
      vehicle: "Portal de Notícias",
      title: "Mais de uma tonelada de alimentos impróprios é descartada em mercados do RJ em uma semana",
      summary: "Ação de fiscalização da SEDCON resulta no descarte de grande quantidade de alimentos inadequados para consumo.",
      url: "https://diariodorio.com/mais-de-uma-tonelada-de-alimentos-improprios-e-descartada-em-mercados-do-rj-em-uma-semana/"
    },
    {
      source: "RJ4News",
      vehicle: "Portal de Notícias",
      title: "Mais de uma tonelada de alimentos impróprios para consumo foram descartados em uma semana",
      summary: "Fiscalização intensiva da Defesa do Consumidor garante qualidade dos alimentos comercializados.",
      url: "https://rj4news.com.br/2025/04/01/mais-de-uma-tonelada-de-alimentos-improprios-para-consumo-foram-descartados-em-uma-semana/"
    },
    {
      source: "Diário Carioca",
      vehicle: "Portal de Notícias",
      title: "Mais de uma tonelada de alimentos irregulares são descartados no RJ",
      summary: "Operação da SEDCON retira do mercado alimentos que apresentavam irregularidades sanitárias.",
      url: "https://www.diariocarioca.com/rio-de-janeiro/mais-de-uma-tonelada-de-alimentos-irregulares-sao-descartados-no-rj/"
    },
    {
      source: "Diário Carioca",
      vehicle: "Portal de Notícias",
      title: "Cristo Redentor: Governo do Rio apresenta avanços para garantir segurança e qualidade dos serviços",
      summary: "Relatório apresenta melhorias implementadas para garantir experiência segura aos visitantes.",
      url: "https://www.diariocarioca.com/rio-de-janeiro/cristo-redentor-governo-do-rio-apresenta-avancos-para-garantir-seguranca-e-qualidade-dos-servicos/"
    },
    {
      source: "A Tribuna RJ",
      vehicle: "Portal de Notícias",
      title: "Fiscalização encontra tonelada de alimentos impróprios no Estado",
      summary: "Ação coordenada identifica e remove do mercado produtos alimentícios inadequados.",
      url: "https://www.atribunarj.com.br/materia/fiscalizacao-encontra-tonelada-de-alimentos-improprios-no-estado"
    },
    {
      source: "G1",
      vehicle: "Portal de Notícias",
      title: "Cristo Redentor vai ter elevador para cadeirantes",
      summary: "Medida visa garantir acessibilidade plena ao monumento para pessoas com deficiência.",
      url: "https://g1.globo.com/google/amp/rj/rio-de-janeiro/noticia/2025/03/31/cristo-redentor-vai-ter-elevador-para-cadeirantes.ghtml"
    },
    {
      source: "Agência Brasil",
      vehicle: "Defesa do Consumidor",
      title: "Força-tarefa do Corcovado promete aumentar segurança para visitantes",
      summary: "Iniciativa coordenada busca implementar melhorias na segurança e qualidade do atendimento.",
      url: "https://agenciabrasil.ebc.com.br/geral/noticia/2025-03/forca-tarefa-do-corcovado-promete-aumentar-seguranca-para-visitantes"
    },
    {
      source: "TV Prefeito",
      vehicle: "Defesa do Consumidor",
      title: "Relatório sobre melhorias no Cristo Redentor após morte de turista é apresentado",
      summary: "Documento detalha ações implementadas para prevenir novos incidentes e melhorar a experiência.",
      url: "https://tvprefeito.com/relatorio-sobre-melhorias-no-cristo-redentor-apos-morte-de-turista-e-apresentado/"
    },
    {
      source: "Jornal de Hoje",
      vehicle: "Defesa do Consumidor",
      title: "Força-tarefa do Corcovado promete aumentar segurança para visitantes",
      summary: "Comissão apresenta medidas concretas para garantir segurança e qualidade no atendimento aos turistas.",
      url: "https://jornalhoje.inf.br/wp/geral/forca-tarefa-do-corcovado-promete-aumentar-seguranca-para-visitantes/"
    },
    {
      source: "Diário do Rio",
      vehicle: "Portal de Notícias",
      title: "Cristo Redentor vai ter elevador para cadeirantes até novembro, garante secretário",
      summary: "Secretário confirma prazo para instalação de equipamento que garantirá acessibilidade completa.",
      url: "https://diariodorio.com/cristo-redentor-vai-ter-elevador-para-cadeirantes-ate-novembro-garante-secretario/"
    },
    // Novos clippings (30)
    {
      source: "Record TV",
      vehicle: "Televisão",
      title: "Aumento na aglomeração foi decisivo para bloqueio do calçadão de Bangu, diz secretário",
      summary: "Secretário explica medidas tomadas para controlar aglomerações em área comercial de Bangu.",
      url: "https://recordtv.r7.com/balanco-geral-manha-rj/videos/aumento-na-aglomeracao-foi-o-fator-decisivo-para-bloqueio-do-calcadao-de-bangu-afirma-secretario-08052020"
    },
    {
      source: "Zona Oeste News",
      vehicle: "Portal de Notícias",
      title: "Bangu ganhará Segurança Presente",
      summary: "Programa de segurança será implementado no bairro para reforçar policiamento comunitário.",
      url: "https://www.zonaoestenews.com.br/2019/06/bangu-ganhara-seguranca-presente/"
    },
    {
      source: "Prefeitura do Rio",
      vehicle: "Portal Oficial",
      title: "Prefeitura do Rio fecha bares clandestinos e encerra evento em Curicica",
      summary: "Ação especial da prefeitura combate estabelecimentos irregulares e eventos não autorizados.",
      url: "https://prefeitura.rio/ordem-publica/em-acao-especial-prefeitura-do-rio-fecha-bares-clandestinos-e-termina-com-evento-que-reunia-cerca-de-60-pessoas-em-curicica/"
    },
    {
      source: "Diário do Nordeste",
      vehicle: "Portal de Notícias",
      title: "Deslizamento em morro do Rio atinge casas e deixa sete famílias desalojadas",
      summary: "Fenômeno natural causa danos a residências e força evacuação de famílias na cidade.",
      url: "https://diariodonordeste.verdesmares.com.br/ultima-hora/pais/deslizamento-em-morro-do-rio-de-janeiro-atinge-casas-e-deixa-sete-familias-desalojadas-1.2974836"
    },
    {
      source: "Yahoo Finanças",
      vehicle: "Portal de Notícias",
      title: "Reunião projeta volta do público aos eventos",
      summary: "Encontro discute estratégias para retomada segura de eventos com presença de público.",
      url: "https://br.financas.yahoo.com/noticias/reuni%C3%A3o-projeta-volta-p%C3%BAblico-aos-052810396.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAHmTlUAMinYV8uKjCGXfof0W8pHaZoZB7G14PRp5JLzKhHQbozmRHVlizSdcGMFtG0kmtX7biysoCKAJ9HhGtEZGaI4429O2v8za56dX6SwFYFclhvSDuGEHvdYnCo9DR7ly-8V08AwKvnkqeWViCv-XM1f5"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo relacionado a atividades no Rio de Janeiro",
      summary: "Conteúdo audiovisual sobre iniciativas e eventos realizados na cidade do Rio de Janeiro.",
      url: "https://d.facebook.com/video_redirect/?src=https%3A%2F%2Fvideo-gig2-1.xx.fbcdn.net%2Fv%2Ft42.9040-2%2F83305479_489472628379159_2575554328198643712_n.mp4%3F_nc_cat%3D111%26ccb%3D1-3%26_nc_sid%3D985c63%26efg%3DeyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9%26_nc_eui2%3DAeGVltPxukJ5pQjkz22yFI099jIEW87zRjD2MgRbzvNGMB7F3BrCxZNGpwNJp_VVIwEOn2eN7bO8jWVmachm9-34%26_nc_ohc%3DXM3abQi-hwwAX-Yu7mU%26_nc_ht%3Dvideo-gig2-1.xx%26oh%3D095320e078c25f51e0f453e084667722%26oe%3D60948885&source=misc&id=1064421067255030&noredirect=0&watermark=0&__tn__=FH"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo sobre ações da prefeitura no Rio",
      summary: "Material audiovisual documentando ações e programas da administração municipal.",
      url: "https://fb.watch/5k7n5sXWKH/"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo sobre eventos no Rio de Janeiro",
      summary: "Registro audiovisual de eventos e atividades realizadas na cidade.",
      url: "https://fb.watch/5k6TqPNu1q/"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo sobre atividades locais",
      summary: "Documentação de atividades comunitárias e locais realizadas na cidade.",
      url: "https://fb.watch/5k6IWPfjMs/"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo sobre iniciativas no Rio",
      summary: "Cobertura audiovisual de iniciativas e projetos desenvolvidos na cidade.",
      url: "https://fb.watch/5k6GnlSt5u/"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo relacionado a ações comunitárias",
      summary: "Material sobre ações comunitárias e programas sociais na cidade do Rio.",
      url: "https://fb.watch/5k66OWsfiV/"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo sobre eventos locais",
      summary: "Registro de eventos locais e atividades comunitárias realizadas na cidade.",
      url: "https://fb.watch/5k6glHLkb9/"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo sobre iniciativas no Rio",
      summary: "Documentação de iniciativas públicas e projetos desenvolvidos na cidade.",
      url: "https://fb.watch/5k6iKHay3W/"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo sobre ações da prefeitura",
      summary: "Material audiovisual sobre ações e programas da administração municipal do Rio.",
      url: "https://www.facebook.com/watch/?v=2711936895593369"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo sobre atividades no Rio",
      summary: "Cobertura de atividades e eventos realizados na cidade do Rio de Janeiro.",
      url: "https://m.facebook.com/watch/?v=222290925765960&_rdr#"
    },
    {
      source: "Prefeitura do Rio",
      vehicle: "Portal Oficial",
      title: "Secretários municipais fazem teste do novo coronavírus no Rio",
      summary: "Gestores municipais realizam testes para Covid-19 como medida preventiva.",
      url: "https://prefeitura.rio/cidade/secretarios-municipais-fazem-o-teste-do-novo-coronavirus-no-rio/"
    },
    {
      source: "O Repórter",
      vehicle: "Portal de Notícias",
      title: "Operação na Estrada de Sepetiba faz notificações e remove vans irregulares",
      summary: "Ação de fiscalização combate transporte irregular na região de Sepetiba.",
      url: "https://oreporter.com/Operacao-na-Estrada-de-Sepetiba-faz-notificacoes-e-remove-vans-irregulares,12822698970.htm"
    },
    {
      source: "ANF",
      vehicle: "Portal de Notícias",
      title: "Rio vai usar sinais de celulares para descobrir aglomeração de pessoas",
      summary: "Tecnologia será utilizada para monitorar e controlar aglomerações na cidade.",
      url: "https://www.anf.org.br/rio-vai-usar-sinais-de-celulares-para-descobrir-aglomeracao-de-pessoas/"
    },
    {
      source: "Diário do Rio",
      vehicle: "Portal de Notícias",
      title: "Prefeitura vai usar sinais de celulares para evitar aglomeração",
      summary: "Sistema de monitoramento por celular será implementado para controle de multidões.",
      url: "https://diariodorio.com/prefeitura-vai-usar-sinais-de-celulares-para-evitar-aglomeracao/"
    },
    {
      source: "Prefeitura do Rio",
      vehicle: "Portal Oficial",
      title: "Prefeitura do Rio vai instalar cabines de desinfecção para a população",
      summary: "Equipamentos de desinfecção serão instalados em pontos estratégicos da cidade.",
      url: "http://prefeitura.rio/cidade/prefeitura-do-rio-vai-instalar-cabines-de-desinfeccao-para-a-populacao-em-pontos-da-cidade/"
    },
    {
      source: "EuRio",
      vehicle: "Portal de Notícias",
      title: "Operação Verão começa na orla do Rio de Janeiro",
      summary: "Início da operação especial para garantir segurança durante a temporada de verão.",
      url: "https://eurio.com.br/noticia/10350/operacao-verao-comeca-na-orla-do-rio-de-janeiro.html"
    },
    {
      source: "Guia Certo USA",
      vehicle: "Portal de Notícias",
      title: "Guarda Municipal Marítima fiscalizará tráfego em mais de 360 praias, rios e lagoas do Rio",
      summary: "Nova força de segurança amplia fiscalização em áreas aquáticas da cidade.",
      url: "https://www.guiacertousa.com/recem-criada-guarda-municipal-maritima-vai-fiscalizar-trafego-em-mais-de-360-praias-rios-e-lagoas-do-rio/"
    },
    {
      source: "Lance!",
      vehicle: "Portal de Notícias",
      title: "Entrevista com Gutemberg Fonseca sobre Covid-19",
      summary: "Secretário concede entrevista sobre medidas de combate à pandemia na cidade.",
      url: "https://www.lance.com.br/futebol-nacional/entrevista-gutemberg-paula-fonseca-covid.html"
    },
    {
      source: "Extra Online",
      vehicle: "Portal de Notícias",
      title: "Aliado da família Bolsonaro deixa prefeitura do Rio para cuidar da campanha de Crivella",
      summary: "Mudança na equipe da prefeitura com foco na campanha eleitoral municipal.",
      url: "https://extra.globo.com/noticias/brasil/aliado-da-familia-bolsonaro-deixa-prefeitura-do-rio-para-cuidar-da-campanha-digital-de-crivella-24673819.html"
    },
    {
      source: "Globo Online",
      vehicle: "Portal de Notícias",
      title: "Secretário de Ordem Pública de Crivella testa positivo para Covid-19",
      summary: "Gutemberg Fonseca confirma teste positivo para coronavirus e entra em isolamento.",
      url: "https://oglobo.globo.com/rio/secretario-de-ordem-publica-de-crivella-gutemberg-fonseca-testa-positivo-para-covid-19-24651878"
    },
    {
      source: "Diário do Rio",
      vehicle: "Portal de Notícias",
      title: "Cidadão sem máscara será barrado no comércio e transporte do Rio",
      summary: "Nova medida obriga uso de máscaras em estabelecimentos comerciais e transporte público.",
      url: "https://diariodorio.com/cidadao-que-nao-usar-mascara-sera-barrado-no-comercio-e-no-transporte-do-rio/"
    },
    {
      source: "Jornal Correio da Manhã",
      vehicle: "Portal de Notícias",
      title: "Gutemberg Fonseca: 'Sou do time que trabalha com a verdade'",
      summary: "Secretário faz declarações sobre transparência e compromisso com a verdade na gestão.",
      url: "https://www.jornalcorreiodamanha.com.br/rio-de-janeiro/3796-gutemberg-fonseca-sou-do-time-que-trabalha-com-a-verdade"
    },
    {
      source: "Prefeitura do Rio",
      vehicle: "Portal Oficial",
      title: "Prefeitura inicia distribuição de máscaras para a população",
      summary: "Campanha municipal distribui máscaras de proteção para os cidadãos cariocas.",
      url: "http://portalpcrjwp.hom.rio.gov.br/prefeitura-inicia-distribuicao-de-mascaras-para-a-populacao/"
    },
    {
      source: "Veja",
      vehicle: "Portal de Notícias",
      title: "Secretários de prefeito do Rio discutem e são apartados por guardas",
      summary: "Discussão entre secretários municipais resulta em intervenção da segurança.",
      url: "https://veja.abril.com.br/politica/secretarios-de-prefeito-do-rio-discutem-e-sao-apartados-por-guardas/"
    },
    {
      source: "Facebook",
      vehicle: "Rede Social",
      title: "Vídeo sobre iniciativas no Rio",
      summary: "Material audiovisual sobre projetos e iniciativas desenvolvidas na cidade.",
      url: "https://fb.watch/5k2lF4gX_8/"
    },
    {
      source: "Dia Online",
      vehicle: "Portal de Notícias",
      title: "SEOP explica contrato que permitiu locação de veículos",
      summary: "Secretaria esclarece detalhes sobre contratação de veículos para operações.",
      url: "https://odia.ig.com.br/colunas/informe-do-dia/2020/04/5905003-seop-explica-contrato-que-permitiu-locacao-de-veiculos.html"
    },
    {
      source: "Agência Brasil",
      vehicle: "Portal de Notícias",
      title: "Rio lança Disk Aglomeração para evitar concentrações de pessoas",
      summary: "Serviço telefônico é criado para denunciar aglomerações durante a pandemia.",
      url: "https://noticias.uol.com.br/ultimas-noticias/agencia-brasil/2020/03/30/rio-lanca-disk-aglomeracao-para-evitar-concentracoes-de-pessoas.htm"
    }
  ];

  // Redes sociais
  const socialMedia = [
    { icon: Instagram, url: "https://www.instagram.com/gutembergpfonseca/", name: "Instagram" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/gutembergfonseca/", name: "LinkedIn" },
    { icon: Facebook, url: "https://www.facebook.com/gutembergpfonseca", name: "Facebook" },
    { icon: Twitter, url: "https://twitter.com/gutopfonseca", name: "Twitter" },
  ];

  const shareNews = (news: typeof newsClipping[0]) => {
    const text = `${news.title} - ${news.source}`;
    const url = news.url;
    
    if (navigator.share) {
      navigator.share({ title: text, url });
    } else {
      navigator.clipboard.writeText(`${text} - ${url}`);
    }
  };

  const nextNewsSlide = () => {
    setCurrentNewsSlide((prev) => (prev + 1) % newsClipping.length);
  };

  const prevNewsSlide = () => {
    setCurrentNewsSlide((prev) => (prev - 1 + newsClipping.length) % newsClipping.length);
  };

  return (
    <section 
      id="multimedia" 
      className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(/lovable-uploads/5118e141-56bb-4600-b3bb-86aec0a70a56.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      <div className="section-container relative z-10">
        <h2 className="section-title">Vídeos, Notícias & Depoimentos</h2>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`space-y-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Galeria de Vídeos */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-primary text-center">Vídeos Institucionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card 
                  key={video.id} 
                  className={`overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        frameBorder="0"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-primary">{video.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{video.caption}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Clipping de Notícias */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-primary text-center">Clipping de Notícias</h3>
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentNewsSlide * 100}%)` }}
                >
                  {newsClipping.map((news, index) => (
                    <Card key={index} className="min-w-full px-4">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-primary text-lg">{news.source}</h4>
                            <p className="text-sm text-gray-500">{news.vehicle}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => shareNews(news)}
                            className="hover:bg-gray-100"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <a 
                          href={news.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          <h5 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                            {news.title}
                            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h5>
                          <p className="text-gray-600">{news.summary}</p>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={prevNewsSlide}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextNewsSlide}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-primary">Siga nas Redes Sociais</h3>
            <div className="flex justify-center space-x-6">
              {socialMedia.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultimediaClipping;
