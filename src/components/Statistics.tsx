
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCountUp } from '@/hooks/useCountUp';
import { useState, useEffect } from 'react';
import { Users, Scale, HandCoins, Package, MapPin, Bus, Building2, Shield, Check } from 'lucide-react';

interface AnimatedStatProps {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  enabled: boolean;
}

const AnimatedStat = ({ end, decimals = 0, prefix, suffix, enabled }: AnimatedStatProps) => {
  const count = useCountUp({ end, decimals, duration: 2500, enabled });
  
  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals).replace('.', ',');
    }
    return num.toLocaleString('pt-BR');
  };

  return (
    <div className="flex justify-center items-baseline gap-1">
      {prefix && (
        <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {prefix}
        </span>
      )}
      <span className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent tabular-nums">
        {formatNumber(count)}
      </span>
      {suffix && (
        <span className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
          {suffix}
        </span>
      )}
    </div>
  );
};

const Statistics = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setIsVisible(true);
      setHasAnimated(true);
    }
  }, [isIntersecting, hasAnimated]);

  const mainStats = [
    {
      number: 470000,
      displayNumber: "470.000",
      prefix: "+",
      label: "consumidores atendidos",
      icon: Users,
      decimals: 0
    },
    {
      number: 65.8,
      displayNumber: "65,8",
      prefix: "R$",
      suffix: "mi",
      label: "em multas aplicadas",
      icon: Scale,
      decimals: 1
    },
    {
      number: 40,
      displayNumber: "40",
      prefix: "R$",
      suffix: "mi",
      label: "renegociados por mais de 9.000 famílias",
      icon: HandCoins,
      decimals: 0
    },
    {
      number: 160,
      displayNumber: "160",
      prefix: "+",
      suffix: "ton",
      label: "de produtos irregulares apreendidos",
      icon: Package,
      decimals: 0
    }
  ];

  const achievements = [
    {
      icon: MapPin,
      title: "Mutirão de Renegociação de Dívidas",
      description: "Em apenas um ano, a Secretaria de Defesa do Consumidor e o Procon-RJ levaram os mutirões de renegociação de dívidas a 18 municípios, passando por todas as regiões do estado e também pela capital.",
      highlight: "Mais de R$ 40 milhões renegociados, representando uma grande economia no bolso dos consumidores."
    },
    {
      icon: Bus,
      title: "Expresso do Consumidor + Consumidor Social",
      description: "O Expresso do Consumidor é uma estrutura itinerante e totalmente acessível que oferece orientação jurídica gratuita, atendimento técnico e recebe reclamações e denúncias.",
      highlight: "O Consumidor Social leva serviços essenciais: emissão de 2ª via do título de eleitor, CPF, Carteira do Idoso e ID Jovem."
    },
    {
      icon: Building2,
      title: "Nova Sede Inclusiva",
      description: "A nova sede da SEDCON e do Procon-RJ na Cidade Nova é a estrutura pública mais inclusiva do Brasil, pensada para acolher todo tipo de público com conforto e acessibilidade.",
      features: [
        "Estacionamento adaptado para PCD",
        "Rampas de acesso e piso tátil",
        "CDC em Braile e atendimento em Libras",
        "Espaço para cão-guia",
        "Sala sensorial para mães com filhos autistas",
        "18 novas viaturas para fiscalização"
      ]
    },
    {
      icon: Shield,
      title: "Fiscalização e Apreensões",
      description: "A SEDCON e o Procon-RJ já apreenderam mais de 160 toneladas de produtos irregulares em todo o estado: café adulterado, bebidas contrafeitas, roupas, calçados e acessórios falsificados.",
      highlight: "Recorde de 1.100 ações de fiscalização realizadas, protegendo a saúde e segurança do consumidor."
    }
  ];
  
  return (
    <section id="numeros" className="py-20 bg-muted/30">
      <div className="section-container">
        <h2 className="section-title">Resultados que Transformam</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
          Resultados que demonstram a efetividade das ações da Secretaria de Estado de Defesa do Consumidor e do PROCON-RJ em todo o estado do Rio de Janeiro.
        </p>
        
        {/* Main Stats Grid */}
        <div 
          ref={ref as React.RefObject<HTMLDivElement>} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {mainStats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-card p-6 rounded-xl shadow-lg text-center transition-all duration-700 transform hover:shadow-xl hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <AnimatedStat 
                end={stat.number}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
                enabled={hasAnimated}
              />
              <p className="text-muted-foreground mt-3 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`bg-card p-6 rounded-xl shadow-lg transition-all duration-700 transform hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 4) * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <achievement.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-3">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {achievement.description}
                  </p>
                  
                  {achievement.highlight && (
                    <p className="text-sm font-medium text-foreground bg-secondary/20 p-3 rounded-lg border-l-4 border-secondary">
                      {achievement.highlight}
                    </p>
                  )}
                  
                  {achievement.features && (
                    <ul className="space-y-2 mt-3">
                      {achievement.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
