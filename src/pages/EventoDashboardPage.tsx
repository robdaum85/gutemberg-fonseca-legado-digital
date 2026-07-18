import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  RefreshCcw,
  Search,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventoHero } from "@/components/evento/EventoHero";
import { EventoCadastroRapido } from "@/components/evento/EventoCadastroRapido";
import { EVENTO_COLORS, EVENTO_GUTEMBERG } from "@/config/evento";
import {
  carregarDashboard,
  isEventoApiConfigured,
  type EventoDashboardParticipante,
  type EventoDashboardResponse,
} from "@/lib/eventoApi";

const emptyDashboard: EventoDashboardResponse = {
  success: false,
  totalInscritos: 0,
  totaisPorData: [],
  participantes: [],
};

export default function EventoDashboardPage() {
  const [data, setData] = useState<EventoDashboardResponse>(emptyDashboard);
  const requestInFlightRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [lastSync, setLastSync] = useState("");

  async function load({ silent = false } = {}) {
    if (requestInFlightRef.current) return;
    if (!isEventoApiConfigured()) {
      setError("Configure VITE_EVENTO_API_URL para carregar o dashboard.");
      return;
    }

    requestInFlightRef.current = true;
    if (!silent) {
      setError("");
      setLoading(true);
    }

    try {
      const response = await carregarDashboard();
      if (!response.success) {
        if (!silent) setError(response.message ?? "Erro ao carregar dashboard.");
        return;
      }

      setData({
        ...emptyDashboard,
        ...response,
        participantes: response.participantes ?? [],
        totaisPorData:
          response.totaisPorData ?? buildTotalsByDate(response.participantes ?? []),
      });
      setLastSync(
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    } catch (err) {
      if (!silent) setError(err instanceof Error ? err.message : "Erro ao carregar dashboard.");
    } finally {
      requestInFlightRef.current = false;
      if (!silent) setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    const intervalId = window.setInterval(() => void load({ silent: true }), 15000);
    return () => window.clearInterval(intervalId);
  }, []);

  const visibleParticipants = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");

    return [...data.participantes]
      .filter((participante) => {
        if (!term) return true;
        return [
          participante.nome,
          participante.telefone,
          participante.bairro,
          participante.cidade,
          participante.dataCadastro,
        ].some((value) => (value ?? "").toLocaleLowerCase("pt-BR").includes(term));
      })
      .sort(
        (a, b) =>
          registrationTimestamp(b.dataCadastro, b.horaCadastro) -
          registrationTimestamp(a.dataCadastro, a.horaCadastro),
      );
  }, [data.participantes, search]);

  useEffect(() => setPage(1), [pageSize, search]);

  const totalPages = Math.max(1, Math.ceil(visibleParticipants.length / pageSize));
  const pagedParticipants = useMemo(
    () => visibleParticipants.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize, visibleParticipants],
  );

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  return (
    <main
      id="conteudo-principal"
      className="min-h-screen pb-8 text-zinc-950"
      style={{ backgroundColor: EVENTO_COLORS.lightGray }}
    >
      <EventoHero variant="compact" theme="light" />
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-5">
        <header
          className="rounded-xl border border-white/10 p-5 text-white shadow-sm sm:p-6"
          style={{ backgroundColor: EVENTO_COLORS.navy }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p
                className="text-xs font-black uppercase tracking-[0.16em]"
                style={{ color: EVENTO_COLORS.yellow }}
              >
                {EVENTO_GUTEMBERG.title}
              </p>
              <h1 className="mt-1 text-2xl font-black sm:text-3xl">Lista de participantes</h1>
              <p className="mt-1 text-sm text-white/75">
                Todos os cadastros da planilha para conferência da equipe
              </p>
            </div>
            <div className="text-right">
              <Button
                onClick={() => void load()}
                disabled={loading}
                variant="outline"
                className="border-white bg-white text-zinc-950 hover:bg-zinc-100"
              >
                <RefreshCcw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
                Atualizar
              </Button>
              <p className="mt-2 text-xs text-white/60">
                Atualização automática a cada 15s{lastSync ? ` · Última: ${lastSync}` : ""}
              </p>
            </div>
          </div>
        </header>

        {error && (
          <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total de inscritos"
            value={data.totalInscritos}
            icon={<Users className="h-6 w-6" />}
          />
          {data.totaisPorData.map((item) => (
            <SummaryCard
              key={item.data}
              label={item.data === "Sem data" ? item.data : `Inscritos em ${item.data}`}
              value={item.total}
              icon={<CalendarDays className="h-6 w-6" />}
            />
          ))}
        </section>

        <section className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold">Participantes</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {visibleParticipants.length} de {data.totalInscritos} exibidos
                </p>
              </div>
              <label className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar nome, telefone ou local"
                  className="pl-9"
                />
              </label>
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-5 py-3">Nome</th>
                  <th className="px-5 py-3">Telefone</th>
                  <th className="px-5 py-3">Data do cadastro</th>
                  <th className="px-5 py-3">Bairro / Cidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pagedParticipants.map((participante) => (
                  <ParticipantRow key={participante.id} participante={participante} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-zinc-100 md:hidden">
            {pagedParticipants.map((participante) => (
              <ParticipantCard key={participante.id} participante={participante} />
            ))}
          </div>

          {visibleParticipants.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-zinc-500">
              Nenhum participante encontrado.
            </p>
          )}

          {visibleParticipants.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-zinc-200 bg-zinc-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm text-zinc-600">
                Exibir
                <select
                  value={pageSize}
                  onChange={(event) => setPageSize(Number(event.target.value))}
                  className="h-9 rounded-md border border-input bg-white px-2 text-sm"
                  aria-label="Participantes por página"
                >
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                por página
              </label>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="text-sm font-semibold text-zinc-600">
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  >
                    Próxima
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
      <EventoCadastroRapido onRegistered={() => void load()} />
    </main>
  );
}

function registrationTimestamp(data?: string, hora?: string) {
  const [day, month, year] = (data ?? "").split("/").map(Number);
  const [hour = 0, minute = 0, second = 0] = (hora ?? "").split(":").map(Number);
  if (!day || !month || !year) return 0;
  return new Date(year, month - 1, day, hour, minute, second).getTime();
}

function buildTotalsByDate(participantes: EventoDashboardParticipante[]) {
  const totals = new Map<string, number>();
  participantes.forEach((participante) => {
    const date = participante.dataCadastro || "Sem data";
    totals.set(date, (totals.get(date) ?? 0) + 1);
  });

  return Array.from(totals, ([data, total]) => ({ data, total })).sort(
    (a, b) => registrationTimestamp(b.data) - registrationTimestamp(a.data),
  );
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-blue-50 p-3 text-blue-800">{icon}</span>
        <div>
          <p className="text-sm font-semibold text-zinc-500">{label}</p>
          <p className="text-3xl font-extrabold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ParticipantRow({ participante }: { participante: EventoDashboardParticipante }) {
  return (
    <tr>
      <td className="px-5 py-4 font-bold">{participante.nome}</td>
      <td className="px-5 py-4">
        <PhoneLink telefone={participante.telefone ?? ""} />
      </td>
      <td className="px-5 py-4 text-zinc-600">
        {participante.dataCadastro || "—"}
        {participante.horaCadastro && (
          <span className="ml-1 text-xs text-zinc-400">às {participante.horaCadastro}</span>
        )}
      </td>
      <td className="px-5 py-4 text-zinc-600">
        {[participante.bairro, participante.cidade].filter(Boolean).join(" / ") || "—"}
      </td>
    </tr>
  );
}

function ParticipantCard({ participante }: { participante: EventoDashboardParticipante }) {
  return (
    <article className="p-4">
      <h3 className="text-lg font-extrabold">{participante.nome}</h3>
      <div className="mt-3 space-y-2 text-sm text-zinc-600">
        <p className="flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0 text-zinc-400" />
          <PhoneLink telefone={participante.telefone ?? ""} />
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-zinc-400" />
          {participante.dataCadastro || "Data não informada"}
          {participante.horaCadastro ? ` às ${participante.horaCadastro}` : ""}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-zinc-400" />
          {[participante.bairro, participante.cidade].filter(Boolean).join(" / ") ||
            "Local não informado"}
        </p>
      </div>
    </article>
  );
}

function PhoneLink({ telefone }: { telefone: string }) {
  const digits = telefone.replace(/\D/g, "");
  if (!digits) return <span>—</span>;
  return (
    <a className="font-semibold text-blue-800 hover:underline" href={`tel:${digits}`}>
      {telefone}
    </a>
  );
}
