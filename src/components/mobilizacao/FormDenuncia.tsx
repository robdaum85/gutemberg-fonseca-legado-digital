import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { openExternalUrl } from "@/lib/security";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const initial = {
  nome: "", whatsapp: "", empresa: "", cidade: "", bairro: "",
  tipo: "", descricao: "",
};

const FormDenuncia = () => {
  const [data, setData] = useState(initial);
  const { toast } = useToast();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required = ["nome","whatsapp","empresa","cidade","bairro","tipo","descricao"] as const;
    if (required.some((k) => !data[k])) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos da denúncia." });
      return;
    }
    const url = buildWhatsAppUrl("DENÚNCIA", {
      Nome: data.nome,
      WhatsApp: data.whatsapp,
      "Empresa/serviço denunciado": data.empresa,
      Cidade: data.cidade,
      Bairro: data.bairro,
      "Tipo de problema": data.tipo,
      Descrição: data.descricao,
    });
    openExternalUrl(url);
    setData(initial);
  };

  return (
    <section id="denuncia" className="py-20 bg-gray-50">
      <div className="section-container max-w-2xl mx-auto">
        <h2 className="section-title">Envie sua denúncia</h2>
        <p className="text-center text-graphite mb-4">
          Seu relato pode ajudar outros consumidores e fortalecer ações de
          fiscalização, orientação e mobilização.
        </p>
        <p className="text-center text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3 mb-8">
          As informações serão enviadas diretamente pelo WhatsApp. Não compartilhe
          dados sensíveis além do necessário.
        </p>
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-5 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="de-nome">Nome *</Label>
              <Input id="de-nome" name="nome" value={data.nome} onChange={onChange} className="mt-2" required />
            </div>
            <div>
              <Label htmlFor="de-whats">WhatsApp *</Label>
              <Input id="de-whats" name="whatsapp" value={data.whatsapp} onChange={onChange} className="mt-2" required />
            </div>
          </div>
          <div>
            <Label htmlFor="de-empresa">Empresa ou serviço denunciado *</Label>
            <Input id="de-empresa" name="empresa" value={data.empresa} onChange={onChange} className="mt-2" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="de-cidade">Cidade *</Label>
              <Input id="de-cidade" name="cidade" value={data.cidade} onChange={onChange} className="mt-2" required />
            </div>
            <div>
              <Label htmlFor="de-bairro">Bairro *</Label>
              <Input id="de-bairro" name="bairro" value={data.bairro} onChange={onChange} className="mt-2" required />
            </div>
          </div>
          <div>
            <Label htmlFor="de-tipo">Tipo de problema *</Label>
            <Input id="de-tipo" name="tipo" value={data.tipo} onChange={onChange} className="mt-2" placeholder="Ex: cobrança indevida, propaganda enganosa…" required />
          </div>
          <div>
            <Label htmlFor="de-desc">Descrição da denúncia *</Label>
            <Textarea id="de-desc" name="descricao" value={data.descricao} onChange={onChange} className="mt-2" rows={5} required />
          </div>
          <Button type="submit" variant="gradient" className="w-full">
            Enviar denúncia pelo WhatsApp
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FormDenuncia;
