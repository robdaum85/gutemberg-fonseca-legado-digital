import { forwardRef, useEffect, useState } from "react";
import QRCode from "qrcode";
import { EVENT } from "@/config/aniversario";

type ConfirmacaoTicketProps = {
  nome: string;
  lideranca: string;
  cupom: string;
};

const ConfirmacaoTicket = forwardRef<HTMLDivElement, ConfirmacaoTicketProps>(
  ({ nome, lideranca, cupom }, ref) => {
    const [qrCodeUrl, setQrCodeUrl] = useState("");

    useEffect(() => {
      const payload = [
        `${EVENT.title}`,
        `Nome: ${nome}`,
        `Liderança: ${lideranca}`,
        `Cupom: ${cupom}`,
        `Data: ${EVENT.dateLabel} - ${EVENT.timeLabel}`,
        `Local: ${EVENT.venue}`,
      ].join("\n");

      QRCode.toDataURL(payload, {
        width: 220,
        margin: 1,
        color: { dark: "#081b4d", light: "#ffffff" },
      })
        .then(setQrCodeUrl)
        .catch(() => setQrCodeUrl(""));
    }, [nome, lideranca, cupom]);

    return (
      <div ref={ref} className="w-[320px] overflow-hidden rounded-3xl bg-white text-slate-900 shadow-xl">
        <div className="bg-primary px-6 py-5 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-white/70">
            Convite confirmado
          </p>
          <h3 className="mt-1 text-lg font-extrabold leading-tight">{EVENT.title}</h3>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Convidado(a)</p>
          <p className="mb-4 text-xl font-extrabold text-primary">{nome}</p>

          <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Data</p>
              <p className="font-bold">{EVENT.dateLabel}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Horário</p>
              <p className="font-bold">{EVENT.timeLabel}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-semibold uppercase text-slate-400">Local</p>
              <p className="font-bold">{EVENT.venue}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-semibold uppercase text-slate-400">Liderança</p>
              <p className="font-bold">{lideranca}</p>
            </div>
          </div>

          {qrCodeUrl && (
            <div className="flex flex-col items-center border-t border-dashed border-slate-200 pt-4">
              <img src={qrCodeUrl} alt="QR code de confirmação" className="h-40 w-40" />
              <p className="mt-2 text-center text-[11px] text-slate-400">
                Apresente este QR code na entrada do evento
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
);

ConfirmacaoTicket.displayName = "ConfirmacaoTicket";

export default ConfirmacaoTicket;
