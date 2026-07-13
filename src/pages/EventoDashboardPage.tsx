import { useEffect, useMemo, useState } from "react";
import { Camera, CheckCircle2, RefreshCcw, Save, Search, Video } from "lucide-react";
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
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("todos");
  const [category, setCategory] = useState("todas");

  function resetWithResponse(response: EventoDashboardResponse) {
    const normalized = normalizeDashboard(response);
    setData(normalized);
    setDrafts(
      Object.fromEntries(normalized.participantes.map((participante) => [participante.id, draftFrom(participante)])),
    );
  }

  async function load() {
    setError("");
    if (!isEventoApiConfigured()) {
      setError("Configure VITE_EVENTO_API_URL para carregar o dashboard.");
      return;
    }

    setLoading(true);
    try {
      const response = await carregarDashboard();
      if (!response.success) {
        setError(response.message ?? "Erro ao carregar dashboard.");
        return;
      }
      resetWithResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
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
    setDrafts((current) => ({
      ...current,
      [participanteId]: {
        ...(current[participanteId] ?? { fotoRealizada: false, videoRealizado: false }),
        [field]: value,
      },
    }));
  }

  async function save(participante: EventoDashboardParticipante) {
    const draft = drafts[participante.id] ?? draftFrom(participante);
    setError("");
    setSavingIds((current) => new Set(current).add(participante.id));

    try {
      const response = await atualizarMidiaParticipante(
        participante.id,
        draft.fotoRealizada,
        draft.videoRealizado,
      );
      if (!response.success) {
        setError(response.message ?? `Não foi possível atualizar ${participante.nome}.`);
        return;
      }

      const normalized = normalizeDashboard(response);
      setData(normalized);
      setDrafts((current) => {
        const next = { ...current };
        normalized.participantes.forEach((item) => {
          if (!next[item.id] || item.id === participante.id) next[item.id] = draftFrom(item);
        });
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : `Erro ao atualizar ${participante.nome}.`);
    } finally {
      setSavingIds((current) => {
        const next = new Set(current);
        next.delete(participante.id);
        return next;
      });
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
      .sort((a, b) => {
        const rank = { pendente: 0, parcial: 1, validado: 2 };
        const aProgress = progressOf(drafts[a.id] ?? draftFrom(a));
        const bProgress = progressOf(drafts[b.id] ?? draftFrom(b));
        return rank[aProgress] - rank[bProgress] || a.nome.localeCompare(b.nome, "pt-BR");
      });
  }, [category, data.participantes, drafts, filter, search]);

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
            <Button onClick={load} disabled={loading} variant="outline" className="border-white bg-white text-zinc-950 hover:bg-zinc-100">
              <RefreshCcw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
              Atualizar
            </Button>
          </div>
        </header>

        {error && (
          <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
                {visibleParticipants.map((participante) => (
                  <ParticipantRow
                    key={participante.id}
                    participante={participante}
                    draft={drafts[participante.id] ?? draftFrom(participante)}
                    saving={savingIds.has(participante.id)}
                    onChange={updateDraft}
                    onSave={save}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-zinc-100 lg:hidden">
            {visibleParticipants.map((participante) => (
              <ParticipantCard
                key={participante.id}
                participante={participante}
                draft={drafts[participante.id] ?? draftFrom(participante)}
                saving={savingIds.has(participante.id)}
                onChange={updateDraft}
                onSave={save}
              />
            ))}
          </div>

          {visibleParticipants.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-zinc-500">Nenhum participante encontrado.</p>
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
  onChange: (id: string, field: keyof Draft, value: boolean) => void;
  onSave: (participante: EventoDashboardParticipante) => void;
};

function ParticipantRow({ participante, draft, saving, onChange, onSave }: ParticipantProps) {
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
      <td className="px-4 py-4 text-right"><SaveButton dirty={dirty} saving={saving} onClick={() => onSave(participante)} /></td>
    </tr>
  );
}

function ParticipantCard({ participante, draft, saving, onChange, onSave }: ParticipantProps) {
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
      <SaveButton dirty={dirty} saving={saving} onClick={() => onSave(participante)} className="mt-4 w-full" />
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

function SaveButton({ dirty, saving, onClick, className = "" }: { dirty: boolean; saving: boolean; onClick: () => void; className?: string }) {
  return (
    <Button size="sm" disabled={!dirty || saving} onClick={onClick} className={className} style={dirty ? { backgroundColor: EVENTO_COLORS.green } : undefined}>
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
