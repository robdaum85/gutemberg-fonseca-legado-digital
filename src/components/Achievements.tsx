
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';

const Achievements = () => {
  const achievements = [
    {
      title: "Segurança Presente sem Custos Extras",
      description: "Expansão para Tijuca, Ipanema e Leblon com redução de roubos de até 67%"
    },
    {
      title: "Lei Seca Marítima e Rodoviária",
      description: "13 operações realizadas no verão, economia de R$ 24,7 milhões"
    },
    {
      title: "Operação Rota Segura",
      description: "Nova fase da Barreira Fiscal com 300% mais armas apreendidas"
    },
    {
      title: "Expansão do PROCON-RJ",
      description: "7.189 conciliações (66% acima da meta), 40.019 atendimentos"
    },
    {
      title: "Redução de Custos",
      description: "30% de cortes em gratificações; R$ 2,9 milhões economizados"
    },
    {
      title: "Organização Administrativa",
      description: "Implantação de Ouvidoria, Corregedoria e setores de Inteligência"
    }
  ];

  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  return (
    <section id="realizacoes" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title">Principais Realizações</h2>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {achievements.map((achievement, index) => (
            <Card 
              key={index}
              className={`shadow-lg border-t-4 border-t-secondary transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-primary">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-graphite">{achievement.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
