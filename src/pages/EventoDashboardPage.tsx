import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, CheckCircle2, ChevronLeft, ChevronRight, RefreshCcw, Save, Search, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { EventoHero } from "@/components/evento/EventoHero";
import { EVENTO_COLORS, EVENTO_GUTEMBERG } from "@/config/evento";
import {
  atualizarMidiaParticipante,
  carregarDashboard,
  isEventoApiConfigured,
  type EventoDashboardParticipante,
  type EventoDashboardResponse,
  type EventoMidiaUpdateResponse,
} from "@/lib/eventoApi";

type Draft = {
  fotoRealizada: boolean;
  videoRealizado: boolean;
};

type Filter = "todos" | "pendentes" | "parciais" | "validados";

const emptyDashboard: EventoDashboardResponse = {
  success: false,
  totalInscritos: 0,
  totalFotos: 0,
  totalVideos: 0,
  totalValidados: 0,
  totalPendentes: 0,
  percentualConcluido: 0,
  participantes: [],
};

function normalizeDashboard(response: EventoDashboardResponse): EventoDashboardResponse {
  return {
    ...emptyDashboard,
    ...response,
    participantes: response.participantes ?? [],
    totalFotos: response.totalFotos ?? 0,
    totalVideos: response.totalVideos ?? 0,
    percentualConcluido: response.percentualConcluido ?? 0,
  };
}

function draftFrom(participante: EventoDashboardParticipante): Draft {
  return {
    fotoRealizada: participante.fotoRealizada,
    videoRealizado: participante.videoRealizado,
  };
}

function progressOf(draft: Draft) {
  if (draft.fotoRealizada && draft.videoRealizado) return "validado";
  if (draft.fotoRealizada || draft.videoRealizado) return "parcial";
  return "pendente";
}

export default function EventoDashboardPage() {
  const [data, setData] = useState<EventoDashboardResponse>(emptyDashboard);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const dataRef = useRef<EventoDashboardResponse>(emptyDashboard);
  const draftsRef = useRef<Record<string, Draft>>({});
  const requestInFlightRef = useRef(false);
  const savingIdsRef = useRef<Set<string>>(new Set());
  const mutationVersionRef = useRef(0);
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("todos");
  const [category, setCategory] = useState("todas");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [lastSync, setLastSync] = useState("");

  function applyResponse(
    response: EventoDashboardResponse,
    preserveDrafts: boolean,
    forceServerIds = new Set<string>(),
  ) {
    const normalized = normalizeDashboard(response);
    const previousById = new Map(dataRef.current.participantes.map((item) => [item.id, item]));
    const nextDrafts: Record<string, Draft> = {};

    normalized.participantes.forEach((participante) => {
      const previous = previousById.get(participante.id);
      const currentDraft = draftsRef.current[participante.id];
      const preserveLocal = preserveDrafts && previous && currentDraft && !forceServerIds.has(participante.id);

      nextDrafts[participante.id] = {
        fotoRealizada:
          preserveLocal && currentDraft.fotoRealizada !== previous.fotoRealizada
            ? currentDraft.fotoRealizada
            : participante.fotoRealizada,
        videoRealizado:
          preserveLocal && currentDraft.videoRealizado !== previous.videoRealizado
            ? currentDraft.videoRealizado
            : participante.videoRealizado,
      };
    });

    dataRef.current = normalized;
    draftsRef.current = nextDrafts;
    setData(normalized);
    setDrafts(nextDrafts);
    setLastSync(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  }

  async function load({ preserveDrafts = true, silent = false } = {}) {
    if (requestInFlightRef.current || savingIdsRef.current.size > 0) return;
    if (!isEventoApiConfigured()) {
      setError("Configure VITE_EVENTO_API_URL para carregar o dashboard.");
      return;
    }

    requestInFlightRef.current = true;
    const mutationVersionAtStart = mutationVersionRef.current;
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
      if (mutationVersionAtStart !== mutationVersionRef.current) return;
      applyResponse(response, preserveDrafts);
    } catch (err) {
      if (!silent) setError(err instanceof Error ? err.message : "Erro ao carregar dashboard.");
    } finally {
      requestInFlightRef.current = false;
      if (!silent) setLoading(false);
    }
  }

  useEffect(() => {
    void load({ preserveDrafts: false });
    const intervalId = window.setInterval(() => {
      void load({ preserveDrafts: true, silent: true });
    }, 15000);
    return () => window.clearInterval(intervalId);
  }, []);

  function updateDraft(participanteId: string, field: keyof Draft, value: boolean) {
    const participante = data.participantes.find((item) => item.id === participanteId);
    if (
      value === false &&
      participante?.[field] === true &&
      !window.confirm(`Deseja desfazer a confirmação de ${field === "fotoRealizada" ? "foto" : "vídeo"} de ${participante.nome}?`)
    ) {
      return;
    }
    const nextDrafts = {
      ...draftsRef.current,
      [participanteId]: {
        ...(draftsRef.current[participanteId] ?? { fotoRealizada: false, videoRealizado: false }),
        [field]: value,
      },
    };
    draftsRef.current = nextDrafts;
    setDrafts(nextDrafts);
  }

  function applySavedMedia(
    response: EventoMidiaUpdateResponse,
    participante: EventoDashboardParticipante,
    draft: Draft,
  ) {
    // Compatibilidade com o backend anterior, que devolvia o dashboard inteiro.
    if (response.participantes) {
      applyResponse(response as EventoDashboardResponse, true, new Set([participante.id]));
      return;
    }

    const fotoRealizada = response.fotoRealizada ?? draft.fotoRealizada;
    const videoRealizado = response.videoRealizado ?? draft.videoRealizado;
    const participantes = dataRef.current.participantes.map((item) =>
      item.id === participante.id
        ? {
            ...item,
            fotoRealizada,
            videoRealizado,
            statusMidia: response.statusMidia ?? (fotoRealizada && videoRealizado ? "VALIDADO" : "PENDENTE"),
            dataAtualizacao: response.dataAtualizacao ?? item.dataAtualizacao,
            horaAtualizacao: response.horaAtualizacao ?? item.horaAtualizacao,
          }
        : item,
    );
    const totalFotos = participantes.filter((item) => item.fotoRealizada).length;
    const totalVideos = participantes.filter((item) => item.videoRealizado).length;
    const totalValidados = participantes.filter((item) => item.fotoRealizada && item.videoRealizado).length;
    const nextData: EventoDashboardResponse = {
      ...dataRef.current,
      success: true,
      participantes,
      totalFotos,
      totalVideos,
      totalValidados,
      totalPendentes: participantes.length - totalValidados,
      percentualConcluido: participantes.length
        ? Math.round((totalValidados / participantes.length) * 1000) / 10
        : 0,
    };
    const nextDrafts = {
      ...draftsRef.current,
      [participante.id]: { fotoRealizada, videoRealizado },
    };

    dataRef.current = nextData;
    draftsRef.current = nextDrafts;
    setData(nextData);
    setDrafts(nextDrafts);
    setLastSync(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  }

  async function save(participante: EventoDashboardParticipante) {
    const draft = draftsRef.current[participante.id] ?? draftFrom(participante);
    setError("");
    mutationVersionRef.current += 1;
    const nextSavingIds = new Set(savingIdsRef.current).add(participante.id);
    savingIdsRef.current = nextSavingIds;
    setSavingIds(nextSavingIds);

    try {
      const changes: Partial<Draft> = {};
      if (draft.fotoRealizada !== participante.fotoRealizada) changes.fotoRealizada = draft.fotoRealizada;
      if (draft.videoRealizado !== participante.videoRealizado) changes.videoRealizado = draft.videoRealizado;
      if (Object.keys(changes).length === 0) return;

      const response = await atualizarMidiaParticipante(participante.id, changes);
      if (!response.success) {
        setError(response.message ?? `Não foi possível atualizar ${participante.nome}.`);
        return;
      }

      applySavedMedia(response, participante, draft);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Erro ao atualizar ${participante.nome}.`);
    } finally {
      const next = new Set(savingIdsRef.current);
      next.delete(participante.id);
      savingIdsRef.current = next;
      setSavingIds(next);
    }
  }

  const categories = useMemo(
    () => Array.from(new Set(data.participantes.map((item) => item.categoria).filter(Boolean))).sort(),
    [data.participantes],
  );

  const visibleParticipants = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    return [...data.participantes]
      .filter((participante) => {
        const draft = drafts[participante.id] ?? draftFrom(participante);
        const progress = progressOf(draft);
        const matchesSearch =
          !term ||
          participante.nome.toLocaleLowerCase("pt-BR").includes(term) ||
          participante.convidadoPor.toLocaleLowerCase("pt-BR").includes(term);
        const matchesFilter =
          filter === "todos" ||
          (filter === "pendentes" && progress !== "validado") ||
          (filter === "parciais" && progress === "parcial") ||
          (filter === "validados" && progress === "validado");
        const matchesCategory = category === "todas" || participante.categoria === category;
        return matchesSearch && matchesFilter && matchesCategory;
      })
      // Manter a posição visual estável ao marcar Foto/Vídeo. Ordenar pelo
      // andamento fazia o participante mudar de lugar antes mesmo de salvar,
      // dando a impressão de que o nome havia sido alterado.
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  }, [category, data.participantes, drafts, filter, search]);

  useEffect(() => {
    setPage(1);
  }, [category, filter, pageSize, search]);

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
        <header className="rounded-xl border border-white/10 p-5 text-white shadow-sm sm:p-6" style={{ backgroundColor: EVENTO_COLORS.navy }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: EVENTO_COLORS.yellow }}>
                {EVENTO_GUTEMBERG.title}
              </p>
              <h1 className="mt-1 text-2xl font-black sm:text-3xl">Controle de foto e vídeo</h1>
              <p className="mt-1 text-sm text-white/75">
                {EVENTO_GUTEMBERG.date} às {EVENTO_GUTEMBERG.time} — {EVENTO_GUTEMBERG.venue}
              </p>
            </div>
            <div className="text-right">
              <Button onClick={() => void load({ preserveDrafts: true })} disabled={loading} variant="outline" className="border-white bg-white text-zinc-950 hover:bg-zinc-100">
                <RefreshCcw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
                Atualizar
              </Button>
              <p className="mt-2 text-xs text-white/60">
                Sincronização automática a cada 15s{lastSync ? ` · Última: ${lastSync}` : ""}
              </p>
            </div>
          </div>
        </header>

        {error && (
          <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-6 hidden gap-3 lg:grid lg:grid-cols-5">
          <Metric label="Total de inscritos" value={data.totalInscritos} />
          <Metric label="Fotos realizadas" value={data.totalFotos} tone="blue" icon={<Camera />} />
          <Metric label="Vídeos realizados" value={data.totalVideos} tone="blue" icon={<Video />} />
          <Metric label="Validados" value={data.totalValidados} tone="green" icon={<CheckCircle2 />} />
          <Metric label="Pendentes" value={data.totalPendentes} tone="amber" />
        </section>

        <section className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 p-4 sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold">Participantes</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {visibleParticipants.length} de {data.totalInscritos} exibidos · {data.percentualConcluido}% concluído
                </p>
              </div>
              <div className="grid w-full gap-2 sm:w-auto sm:grid-cols-[minmax(220px,1fr)_auto_auto]">
                <label className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar participante"
                    className="pl-9"
                  />
                </label>
                <select
                  value={filter}
                  onChange={(event) => setFilter(event.target.value as Filter)}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  aria-label="Filtrar por andamento"
                >
                  <option value="todos">Todos</option>
                  <option value="pendentes">Pendentes</option>
                  <option value="parciais">Parciais</option>
                  <option value="validados">Validados</option>
                </select>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  aria-label="Filtrar por status do participante"
                >
                  <option value="todas">Todos os status</option>
                  {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[940px] text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-4 py-3">Participante</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Quem convidou</th>
                  <th className="px-4 py-3 text-center">Foto</th>
                  <th className="px-4 py-3 text-center">Vídeo</th>
                  <th className="px-4 py-3">Andamento</th>
                  <th className="px-4 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pagedParticipants.map((participante) => (
                  <ParticipantRow
                    key={participante.id}
                    participante={participante}
                    draft={drafts[participante.id] ?? draftFrom(participante)}
                    saving={savingIds.has(participante.id)}
                    blocked={savingIds.size > 0 && !savingIds.has(participante.id)}
                    onChange={updateDraft}
                    onSave={save}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-zinc-100 lg:hidden">
            {pagedParticipants.map((participante) => (
              <ParticipantCard
                key={participante.id}
                participante={participante}
                draft={drafts[participante.id] ?? draftFrom(participante)}
                saving={savingIds.has(participante.id)}
                blocked={savingIds.size > 0 && !savingIds.has(participante.id)}
                onChange={updateDraft}
                onSave={save}
              />
            ))}
          </div>

          {visibleParticipants.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-zinc-500">Nenhum participante encontrado.</p>
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
                  <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>
                    Próxima
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

type ParticipantProps = {
  participante: EventoDashboardParticipante;
  draft: Draft;
  saving: boolean;
  blocked: boolean;
  onChange: (id: string, field: keyof Draft, value: boolean) => void;
  onSave: (participante: EventoDashboardParticipante) => void;
};

function ParticipantRow({ participante, draft, saving, blocked, onChange, onSave }: ParticipantProps) {
  const dirty = draft.fotoRealizada !== participante.fotoRealizada || draft.videoRealizado !== participante.videoRealizado;
  return (
    <tr className="align-middle">
      <td className="px-4 py-4">
        <p className="font-bold">{participante.nome}</p>
        {participante.dataAtualizacao && <p className="mt-0.5 text-xs font-normal text-zinc-400">Atualizado em {participante.dataAtualizacao} às {participante.horaAtualizacao}</p>}
      </td>
      <td className="px-4 py-4">{participante.categoria || "—"}</td>
      <td className="max-w-48 truncate px-4 py-4 text-zinc-600" title={participante.convidadoPor}>{participante.convidadoPor || "—"}</td>
      <td className="px-4 py-4 text-center"><MediaCheckbox label={`Foto de ${participante.nome}`} checked={draft.fotoRealizada} onChange={(value) => onChange(participante.id, "fotoRealizada", value)} /></td>
      <td className="px-4 py-4 text-center"><MediaCheckbox label={`Vídeo de ${participante.nome}`} checked={draft.videoRealizado} onChange={(value) => onChange(participante.id, "videoRealizado", value)} /></td>
      <td className="px-4 py-4"><ProgressBadge draft={draft} /></td>
      <td className="px-4 py-4 text-right"><SaveButton dirty={dirty} saving={saving} blocked={blocked} onClick={() => onSave(participante)} /></td>
    </tr>
  );
}

function ParticipantCard({ participante, draft, saving, blocked, onChange, onSave }: ParticipantProps) {
  const dirty = draft.fotoRealizada !== participante.fotoRealizada || draft.videoRealizado !== participante.videoRealizado;
  return (
    <article className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-extrabold">{participante.nome}</h3>
          <p className="mt-0.5 text-xs font-semibold text-zinc-500">{participante.categoria || "Sem status"}</p>
          {participante.convidadoPor && <p className="mt-1 text-xs text-zinc-500">Convidado por: {participante.convidadoPor}</p>}
          {participante.dataAtualizacao && <p className="mt-1 text-xs text-zinc-400">Atualizado em {participante.dataAtualizacao} às {participante.horaAtualizacao}</p>}
        </div>
        <ProgressBadge draft={draft} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <MediaCard label="Foto" icon={<Camera />} checked={draft.fotoRealizada} onChange={(value) => onChange(participante.id, "fotoRealizada", value)} />
        <MediaCard label="Vídeo" icon={<Video />} checked={draft.videoRealizado} onChange={(value) => onChange(participante.id, "videoRealizado", value)} />
      </div>
      <SaveButton dirty={dirty} saving={saving} blocked={blocked} onClick={() => onSave(participante)} className="mt-4 w-full" />
    </article>
  );
}

function MediaCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Checkbox aria-label={label} checked={checked} onCheckedChange={(value) => onChange(value === true)} className="h-5 w-5" />;
}

function MediaCard({ label, icon, checked, onChange }: { label: string; icon: React.ReactNode; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${checked ? "border-emerald-300 bg-emerald-50" : "border-zinc-200 bg-zinc-50"}`}>
      <Checkbox checked={checked} onCheckedChange={(value) => onChange(value === true)} className="h-5 w-5" />
      <span className="flex items-center gap-2 font-bold">{icon}{label}</span>
    </label>
  );
}

function ProgressBadge({ draft }: { draft: Draft }) {
  const progress = progressOf(draft);
  const config = {
    pendente: { label: "Pendente", className: "border-amber-200 bg-amber-50 text-amber-900" },
    parcial: { label: draft.fotoRealizada ? "Falta vídeo" : "Falta foto", className: "border-blue-200 bg-blue-50 text-blue-900" },
    validado: { label: "Validado", className: "border-emerald-200 bg-emerald-50 text-emerald-900" },
  }[progress];
  return <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-black ${config.className}`}>{config.label}</span>;
}

function SaveButton({ dirty, saving, blocked, onClick, className = "" }: { dirty: boolean; saving: boolean; blocked: boolean; onClick: () => void; className?: string }) {
  return (
    <Button size="sm" disabled={!dirty || saving || blocked} onClick={onClick} className={className} style={dirty ? { backgroundColor: EVENTO_COLORS.green } : undefined}>
      {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {saving ? "Salvando..." : dirty ? "Salvar" : "Salvo"}
    </Button>
  );
}

function Metric({ label, value, tone = "neutral", icon }: { label: string; value: string | number; tone?: "neutral" | "green" | "amber" | "blue"; icon?: React.ReactNode }) {
  const colors = {
    neutral: "border-zinc-200 bg-white text-zinc-950",
    green: "border-emerald-200 bg-emerald-50 text-emerald-900",
    amber: "border-yellow-200 bg-yellow-50 text-yellow-950",
    blue: "border-blue-200 bg-blue-50 text-blue-950",
  };
  return (
    <div className={`rounded-lg border p-4 shadow-sm ${colors[tone]}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold opacity-70">{label}</p>
        {icon && <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>}
      </div>
      <p className="mt-2 text-3xl font-extrabold">{value}</p>
    </div>
  );
}
