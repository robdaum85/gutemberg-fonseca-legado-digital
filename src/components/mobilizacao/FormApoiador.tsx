import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const initial = { nome: "", cidade: "", bairro: "", whatsapp: "", mensagem: "" };

const FormApoiador = () => {
  const [data, setData] = useState(initial);
  const { toast } = useToast();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.nome || !data.cidade || !data.bairro || !data.whatsapp) {
      toast({ title: "Campos obrigatórios", description: "Preencha nome, cidade, bairro e WhatsApp." });
      return;
    }
    const url = buildWhatsAppUrl("APOIADOR", {
      Nome: data.nome,
      Cidade: data.cidade,
      Bairro: data.bairro,
      WhatsApp: data.whatsapp,
      Mensagem: data.mensagem,
    });
    window.open(url, "_blank");
    setData(initial);
  };

  return (
    <section id="apoiador" className="py-20 bg-gray-50">
      <div className="section-container max-w-2xl mx-auto">
        <h2 className="section-title">Quero apoiar essa causa</h2>
        <p className="text-center text-graphite mb-8">
          Cadastre-se como apoiador e receba informações, campanhas, ações e conteúdos
          importantes sobre defesa do consumidor.
        </p>
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-5 border border-gray-200">
          <div>
            <Label htmlFor="ap-nome">Nome *</Label>
            <Input id="ap-nome" name="nome" value={data.nome} onChange={onChange} className="mt-2" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ap-cidade">Cidade *</Label>
              <Input id="ap-cidade" name="cidade" value={data.cidade} onChange={onChange} className="mt-2" required />
            </div>
            <div>
              <Label htmlFor="ap-bairro">Bairro *</Label>
              <Input id="ap-bairro" name="bairro" value={data.bairro} onChange={onChange} className="mt-2" required />
            </div>
          </div>
          <div>
            <Label htmlFor="ap-whats">WhatsApp *</Label>
            <Input id="ap-whats" name="whatsapp" value={data.whatsapp} onChange={onChange} className="mt-2" placeholder="(00) 00000-0000" required />
          </div>
          <div>
            <Label htmlFor="ap-msg">Mensagem (opcional)</Label>
            <Textarea id="ap-msg" name="mensagem" value={data.mensagem} onChange={onChange} className="mt-2" rows={3} />
          </div>
          <Button type="submit" variant="gradient" className="w-full">
            Enviar como apoiador
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FormApoiador;
