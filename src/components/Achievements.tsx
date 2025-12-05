import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';
const Achievements = () => {
  const achievements = [{
    title: "Segurança Presente sem Custos Extras",
    description: "Expansão para Tijuca, Ipanema e Leblon com redução de roubos de até 67%",
    image: "/lovable-uploads/424487f0-dee5-4f8e-bdab-8e3e234b08c7.png",
    stats: "67% redução"
  }, {
    title: "Lei Seca Marítima e Rodoviária",
    description: "13 operações realizadas no verão, economia de R$ 24,7 milhões",
    image: "/lovable-uploads/5118e141-56bb-4600-b3bb-86aec0a70a56.png",
    stats: "R$ 24,7 milhões"
  }, {
    title: "Operação Rota Segura",
    description: "Nova fase da Barreira Fiscal com 300% mais armas apreendidas",
    image: "/lovable-uploads/a097c447-657b-430a-8653-0e7ce0db1524.png",
    stats: "300% aumento"
  }, {
    title: "Expansão do PROCON-RJ",
    description: "7.189 conciliações (66% acima da meta), 40.019 atendimentos",
    image: "/lovable-uploads/c003fb8b-1544-42bc-881b-af1b83f1ac15.png",
    stats: "40.019 atendimentos"
  }, {
    title: "Redução de Custos",
    description: "30% de cortes em gratificações; R$ 2,9 milhões economizados",
    image: "/lovable-uploads/424487f0-dee5-4f8e-bdab-8e3e234b08c7.png",
    stats: "R$ 2,9 milhões"
  }, {
    title: "Organização Administrativa",
    description: "Implantação de Ouvidoria, Corregedoria e setores de Inteligência",
    image: "/lovable-uploads/5118e141-56bb-4600-b3bb-86aec0a70a56.png",
    stats: "3 novos setores"
  }];
  const {
    ref,
    isIntersecting
  } = useIntersectionObserver({
    threshold: 0.1
  });
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);
  return <section id="realizacoes" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title">Principais Realizações</h2>
        
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {achievements.map((achievement, index) => <Card key={index} className={`group relative overflow-hidden shadow-xl border-0 bg-white transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{
          transitionDelay: `${index * 100}ms`
        }}>
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img src={achievement.image} alt={achievement.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gradient-primary text-primary px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    {achievement.stats}
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-primary leading-tight group-hover:bg-gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {achievement.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-base text-graphite leading-relaxed">
                  {achievement.description}
                </CardDescription>
                
                {/* Decorative Element */}
                <div className="mt-4 h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 group-hover:w-24" />
              </CardContent>
            </Card>)}
        </div>

        {/* Stats Summary */}
        
      </div>
    </section>;
};
export default Achievements;