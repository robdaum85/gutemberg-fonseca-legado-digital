import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const initial = {
  nome: "", cidade: "", bairro: "", whatsapp: "",
  atuacao: "", redes: "", mensagem: "",
};

const FormLideranca = () => {
  const [data, setData] = useState(initial);
  const { toast } = useToast();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.nome || !data.cidade || !data.bairro || !data.whatsapp || !data.atuacao) {
      toast({ title: "Campos obrigatórios", description: "Preencha nome, cidade, bairro, WhatsApp e área de atuação." });
      return;
    }
    const url = buildWhatsAppUrl("LIDERANÇA", {
      Nome: data.nome,
      Cidade: data.cidade,
      Bairro: data.bairro,
      WhatsApp: data.whatsapp,
      "Área de atuação": data.atuacao,
      "Redes sociais": data.redes,
      Mensagem: data.mensagem,
    });
    window.open(url, "_blank");
    setData(initial);
  };

  return (
    <section id="lideranca" className="py-20 bg-white">
      <div className="section-container max-w-2xl mx-auto">
        <h2 className="section-title">Seja uma liderança do consumidor</h2>
        <p className="text-center text-graphite mb-8">
          Se você deseja mobilizar sua comunidade, bairro ou cidade em defesa dos
          consumidores, cadastre-se como liderança.
        </p>
        <form onSubmit={onSubmit} className="bg-gray-50 p-8 rounded-lg shadow-lg space-y-5 border border-gray-200">
          <div>
            <Label htmlFor="li-nome">Nome *</Label>
            <Input id="li-nome" name="nome" value={data.nome} onChange={onChange} className="mt-2" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="li-cidade">Cidade *</Label>
              <Input id="li-cidade" name="cidade" value={data.cidade} onChange={onChange} className="mt-2" required />
            </div>
            <div>
              <Label htmlFor="li-bairro">Bairro *</Label>
              <Input id="li-bairro" name="bairro" value={data.bairro} onChange={onChange} className="mt-2" required />
            </div>
          </div>
          <div>
            <Label htmlFor="li-whats">WhatsApp *</Label>
            <Input id="li-whats" name="whatsapp" value={data.whatsapp} onChange={onChange} className="mt-2" required />
          </div>
          <div>
            <Label htmlFor="li-atuacao">Área de atuação *</Label>
            <Input id="li-atuacao" name="atuacao" value={data.atuacao} onChange={onChange} className="mt-2" placeholder="Ex: bairro, associação, igreja, comércio…" required />
          </div>
          <div>
            <Label htmlFor="li-redes">Redes sociais</Label>
            <Input id="li-redes" name="redes" value={data.redes} onChange={onChange} className="mt-2" placeholder="@seu_instagram, Facebook…" />
          </div>
          <div>
            <Label htmlFor="li-msg">Mensagem</Label>
            <Textarea id="li-msg" name="mensagem" value={data.mensagem} onChange={onChange} className="mt-2" rows={3} />
          </div>
          <Button type="submit" variant="gradient" className="w-full">
            Enviar cadastro de liderança
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FormLideranca;
