import { useEffect, useRef, useState } from "react";
import { Copy, Download, QrCode } from "lucide-react";
import QRCode from "qrcode";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EVENTO_COLORS, EVENTO_GUTEMBERG } from "@/config/evento";

type SuccessState = {
  nome?: string;
  codigo?: string;
  qrcodeUrl?: string;
};

export default function EventoSucessoPage() {
  const { state } = useLocation();
  const data = (state ?? {}) as SuccessState;
  const [qrDataUrl, setQrDataUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!data.qrcodeUrl || !canvasRef.current) return;

    QRCode.toCanvas(canvasRef.current, data.qrcodeUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: EVENTO_COLORS.navy,
        light: "#ffffff",
      },
    });

    QRCode.toDataURL(data.qrcodeUrl, { width: 720, margin: 2 }).then(setQrDataUrl);
  }, [data.qrcodeUrl]);

  async function copyCode() {
    if (data.codigo) await navigator.clipboard.writeText(data.codigo);
  }

  function downloadQr() {
    if (!qrDataUrl || !data.codigo) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `qr-code-${data.codigo}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  if (!data.codigo || !data.qrcodeUrl) {
    return (
      <main id="conteudo-principal" className="flex min-h-screen items-center justify-center bg-zinc-50 px-5">
        <div className="max-w-md rounded-lg border border-zinc-200 bg-white p-6 text-center shadow-sm">
          <QrCode className="mx-auto mb-4 h-10 w-10" style={{ color: EVENTO_COLORS.navy }} />
          <h1 className="text-2xl font-extrabold">Credencial nao encontrada</h1>
          <p className="mt-3 text-sm text-zinc-600">
            Esta tela precisa ser aberta logo apos o cadastro.
          </p>
          <Button asChild className="mt-5 text-white" style={{ backgroundColor: EVENTO_COLORS.green }}>
            <Link to="/evento">Fazer cadastro</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main
      id="conteudo-principal"
      className="evento-sucesso-bg relative min-h-screen bg-cover bg-center bg-no-repeat px-5 py-8 text-zinc-950"
      style={{ backgroundColor: EVENTO_COLORS.navy, backgroundImage: "url(/hero/heromobile.jpg)" }}
    >
      <style>{`
        .evento-sucesso-bg {
          background-image: image-set(url(/hero/heromobile.webp) type("image/webp"), url(/hero/heromobile.jpg) type("image/jpeg"));
        }
      `}</style>
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      <section className="relative mx-auto max-w-xl overflow-hidden rounded-lg border border-white/20 bg-white text-center shadow-2xl">
        <div className="px-5 pt-6 text-white md:px-8" style={{ backgroundColor: EVENTO_COLORS.navy }}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <QrCode className="h-7 w-7" style={{ color: EVENTO_COLORS.yellow }} />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: EVENTO_COLORS.yellow }}>
            {EVENTO_GUTEMBERG.title}
          </p>
          <h1 className="mt-2 text-3xl font-black">Cadastro realizado com sucesso!</h1>
          <p className="mt-3 pb-6 text-sm text-white/78">
            {EVENTO_GUTEMBERG.name} {EVENTO_GUTEMBERG.year} - {EVENTO_GUTEMBERG.date} as {EVENTO_GUTEMBERG.time}
          </p>
        </div>

        <div className="p-5 md:p-8">
          <p className="text-zinc-600">
            Apresente este QR Code na entrada do evento. Um print desta tela tambem
            funciona.
          </p>

          <div className="mt-6 rounded-md border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-500">Nome</p>
            <p className="text-lg font-bold">{data.nome}</p>
            <p className="mt-4 text-sm font-semibold text-zinc-500">Seu código</p>
            <p className="break-all font-mono text-2xl font-black" style={{ color: EVENTO_COLORS.green }}>
              {data.codigo}
            </p>
          </div>

          <div className="my-6 flex justify-center">
            <div className="rounded-lg border-4 bg-white p-3" style={{ borderColor: EVENTO_COLORS.yellow }}>
              <canvas ref={canvasRef} width={280} height={280} aria-label="QR Code do convite" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" onClick={copyCode}>
              <Copy className="h-4 w-4" />
              Copiar código
            </Button>
            <Button onClick={downloadQr} className="text-white" style={{ backgroundColor: EVENTO_COLORS.green }}>
              <Download className="h-4 w-4" />
              Baixar QR Code
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
