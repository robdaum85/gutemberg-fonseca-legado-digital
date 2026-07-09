import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENTO_COLORS, EVENTO_GUTEMBERG } from "@/config/evento";
import { carregarDashboard, isEventoApiConfigured, type EventoDashboardResponse } from "@/lib/eventoApi";

const emptyDashboard: EventoDashboardResponse = {
  success: false,
  totalInscritos: 0,
  totalValidados: 0,
  totalPendentes: 0,
  percentualComparecimento: 0,
  ultimasValidacoes: [],
  tentativasInvalidas: 0,
  convitesReutilizados: 0,
};

export default function EventoDashboardPage() {
  const [data, setData] = useState<EventoDashboardResponse>(emptyDashboard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    if (!isEventoApiConfigured()) {
      setError("Configure VITE_EVENTO_API_URL para carregar o dashboard.");
      return;
    }

    setLoading(true);
    try {
      const response = await carregarDashboard();
      setData(response);
      if (!response.success) setError(response.message ?? "Erro ao carregar dashboard.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main
      id="conteudo-principal"
      className="min-h-screen px-5 py-6 text-zinc-950"
      style={{ backgroundColor: EVENTO_COLORS.lightGray }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="rounded-lg border border-white/10 p-5 text-white shadow-sm"
          style={{ backgroundColor: EVENTO_COLORS.navy }}
        >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: EVENTO_COLORS.yellow }}>
              {EVENTO_GUTEMBERG.title}
            </p>
            <h1 className="mt-1 text-3xl font-black">Dashboard do evento</h1>
            <p className="mt-1 text-sm text-white/75">
              {EVENTO_GUTEMBERG.name} {EVENTO_GUTEMBERG.year} - {EVENTO_GUTEMBERG.date} as {EVENTO_GUTEMBERG.time} - {EVENTO_GUTEMBERG.venue}
            </p>
          </div>
          <Button onClick={load} disabled={loading} variant="outline" className="border-white bg-white text-zinc-950 hover:bg-zinc-100">
            <RefreshCcw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            Atualizar
          </Button>
        </div>
        </div>

        {error && (
          <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Total de inscritos" value={data.totalInscritos} />
          <Metric label="Validados" value={data.totalValidados} tone="green" />
          <Metric label="Pendentes" value={data.totalPendentes} tone="amber" />
          <Metric label="Comparecimento" value={`${data.percentualComparecimento}%`} />
        </section>

        <section className="mt-4 grid gap-4 sm:grid-cols-2">
          <Metric label="Tentativas invalidas" value={data.tentativasInvalidas} tone="red" />
          <Metric label="Convites reutilizados" value={data.convitesReutilizados} tone="red" />
        </section>

        <section className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 p-4">
            <h2 className="text-xl font-extrabold">Ultimas validacoes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-4 py-3">Hora</th>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Resultado</th>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Fiscal</th>
                  <th className="px-4 py-3">Portaria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.ultimasValidacoes.map((log, index) => (
                  <tr key={`${log.codigo}-${log.hora}-${index}`}>
                    <td className="px-4 py-3 font-semibold">{log.data} {log.hora}</td>
                    <td className="px-4 py-3 font-mono">{log.codigo}</td>
                    <td className="px-4 py-3 font-bold">{log.resultado}</td>
                    <td className="px-4 py-3">{log.nome}</td>
                    <td className="px-4 py-3">{log.fiscal}</td>
                    <td className="px-4 py-3">{log.portaria}</td>
                  </tr>
                ))}
                {data.ultimasValidacoes.length === 0 && (
                  <tr>
                    <td className="px-4 py-8 text-center text-zinc-500" colSpan={6}>
                      Nenhum log registrado ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  tone?: "neutral" | "green" | "amber" | "red";
}) {
  const colors = {
    neutral: "border-zinc-200 bg-white text-zinc-950",
    green: "border-emerald-200 bg-emerald-50 text-emerald-900",
    amber: "border-yellow-200 bg-yellow-50 text-yellow-950",
    red: "border-red-200 bg-red-50 text-red-900",
  };

  return (
    <div className={`rounded-lg border p-5 shadow-sm ${colors[tone]}`}>
      <p className="text-sm font-semibold opacity-70">{label}</p>
      <p className="mt-2 text-3xl font-extrabold">{value}</p>
    </div>
  );
}
