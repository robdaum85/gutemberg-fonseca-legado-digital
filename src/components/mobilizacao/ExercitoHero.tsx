import { Button } from "@/components/ui/button";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ExercitoHero = () => {
  return (
    <section id="exercito" className="py-20 bg-primary text-white">
      <div className="section-container text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-poppins">
          Faça parte do{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Exército do Consumidor.
          </span>
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-10 max-w-3xl mx-auto">
          Consumidor unido tem força. Participe, denuncie abusos, mobilize sua
          comunidade e ajude a construir uma rede de defesa dos direitos do
          consumidor.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="gradient"
            size="lg"
            onClick={() => scrollTo("apoiador")}
          >
            Quero ser apoiador
          </Button>
          <Button
            variant="gradient"
            size="lg"
            onClick={() => scrollTo("lideranca")}
          >
            Quero ser liderança
          </Button>
          <Button
            variant="gradient"
            size="lg"
            onClick={() => scrollTo("denuncia")}
          >
            Fazer uma denúncia
          </Button>
        </div>
        <p className="mt-10 text-sm opacity-75 italic">
          "Nenhum consumidor sozinho. A mobilização começa com você."
        </p>
      </div>
    </section>
  );
};

export default ExercitoHero;
