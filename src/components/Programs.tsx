
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';

const Programs = () => {
  const programs = [
    {
      title: "Educa Consumidor",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      description: "Programa educacional que leva informações sobre direitos do consumidor para escolas e comunidades."
    },
    {
      title: "Fala Consumidor",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      description: "Canal direto de comunicação entre o cidadão e a SEDCON para reclamações e orientações."
    },
    {
      title: "Turiscon",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
      description: "Iniciativa para proteger turistas nas relações de consumo durante sua estadia no Rio de Janeiro."
    },
    {
      title: "EDCON-RJ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Evento anual que reúne especialistas e autoridades para debater e avançar na defesa do consumidor."
    },
    {
      title: "Rota do Consumo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      description: "Mapeamento e fiscalização dos principais polos comerciais do estado, garantindo práticas legais."
    },
    {
      title: "Balcão na Estrada",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "Unidade móvel que leva os serviços da SEDCON aos municípios mais distantes da capital."
    }
  ];

  const resolutions = [
    { number: "02", title: "Estabelece normas para sites de e-commerce", date: "Novembro 2023" },
    { number: "05", title: "Regula práticas em eventos e shows", date: "Janeiro 2024" },
    { number: "08", title: "Estabelece normas para SACs", date: "Março 2024" },
    { number: "11", title: "Regulamenta delivery e aplicativos de entrega", date: "Abril 2024" },
    { number: "16", title: "Normas para marketplaces", date: "Julho 2024" },
    { number: "17", title: "Proteção de dados de consumidores", date: "Agosto 2024" },
  ];

  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("programas");
  
  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  return (
    <section id="programas" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title">Programas & Operações</h2>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-5 py-2 text-sm font-medium border border-primary rounded-l-lg ${
                activeTab === "programas" ? "bg-primary text-white" : "bg-white text-primary"
              }`}
              onClick={() => setActiveTab("programas")}
            >
              Programas
            </button>
            <button
              type="button"
              className={`px-5 py-2 text-sm font-medium border border-primary rounded-r-lg ${
                activeTab === "resolucoes" ? "bg-primary text-white" : "bg-white text-primary"
              }`}
              onClick={() => setActiveTab("resolucoes")}
            >
              Resoluções
            </button>
          </div>
        </div>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>} 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {activeTab === "programas" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <div 
                  key={program.title} 
                  className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {program.icon}
                  <h3 className="text-xl font-bold text-primary mb-2">{program.title}</h3>
                  <p className="text-graphite">{program.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nº</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Título</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Data</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resolutions.map((resolution) => (
                    <tr key={resolution.number} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">{resolution.number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite">{resolution.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite">{resolution.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Programs;
