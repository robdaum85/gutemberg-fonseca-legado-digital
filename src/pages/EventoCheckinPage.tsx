import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  Activity,
  Camera,
  CheckCircle2,
  Clock3,
  Loader2,
  LogOut,
  RefreshCcw,
  Search,
  Shield,
  ShieldAlert,
  UserCheck,
  Users,
  Wifi,
  WifiOff,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";
import { EVENTO_COLORS, EVENTO_GUTEMBERG } from "@/config/evento";
import {
  consultarCodigo,
  consultarPorCpf,
  carregarDashboard,
  extractCodigoFromScan,
  isEventoApiConfigured,
  normalizeCodigo,
  validarCodigo,
  type EventoConsultaResponse,
  type EventoDashboardResponse,
  type EventoDashboardValidacao,
  type EventoValidarResponse,
} from "@/lib/eventoApi";

function onlyDigits(value: string, max: number) {
  return value.replace(/\D/g, "").slice(0, max);
}

function formatCpf(value: string) {
  const digits = onlyDigits(value, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

const STORAGE_KEY = "evento-checkin-fiscal";
const AUTH_STORAGE_KEY = "evento-checkin-auth";
const DEFAULT_CHECKIN_USERS = [
  { login: "admin", senha: "Admin@2026", fiscal: "Administrador" },
  { login: "portaria01", senha: "Gutemberg@01", fiscal: "Portaria 01" },
  { login: "portaria02", senha: "Gutemberg@02", fiscal: "Portaria 02" },
  { login: "portaria03", senha: "Gutemberg@03", fiscal: "Portaria 03" },
  { login: "portaria04", senha: "Gutemberg@04", fiscal: "Portaria 04" },
  { login: "portaria05", senha: "Gutemberg@05", fiscal: "Portaria 05" },
  { login: "portaria06", senha: "Gutemberg@06", fiscal: "Portaria 06" },
];

function getCheckinUsers() {
  const rawUsers = import.meta.env.VITE_EVENTO_CHECKIN_USERS;
  if (!rawUsers) return DEFAULT_CHECKIN_USERS;

  try {
    const users = JSON.parse(rawUsers);
    if (Array.isArray(users) && users.every((user) => user.login && user.senha && user.fiscal)) {
      return users as typeof DEFAULT_CHECKIN_USERS;
    }
  } catch {
    return DEFAULT_CHECKIN_USERS;
  }

  return DEFAULT_CHECKIN_USERS;
}

const CHECKIN_USERS = getCheckinUsers();

type FiscalConfig = {
  fiscal: string;
  portaria: string;
};

type CheckinResult =
  | ({ kind: "consulta"; lookup: "codigo" | "cpf" } & EventoConsultaResponse)
  | ({ kind: "validacao" } & EventoValidarResponse);

export default function EventoCheckinPage() {
  const [searchParams] = useSearchParams();
  const [unlocked, setUnlocked] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [config, setConfig] = useState<FiscalConfig>({ fiscal: "", portaria: "" });
  const [manualCode, setManualCode] = useState("");
  const [cpfQuery, setCpfQuery] = useState("");
  const [result, setResult] = useState<CheckinResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [scannerOn, setScannerOn] = useState(false);
  const [scannerError, setScannerError] = useState("");
  const [dashboard, setDashboard] = useState<EventoDashboardResponse | null>(null);
  const [dashboardError, setDashboardError] = useState("");
  const [lastSync, setLastSync] = useState("");
  const [online, setOnline] = useState(() => navigator.onLine);
  const [now, setNow] = useState(() => new Date());
  const [sessionTotals, setSessionTotals] = useState({ validated: 0, reused: 0 });
  const [localHistory, setLocalHistory] = useState<EventoDashboardValidacao[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scanLockedRef = useRef(false);
  const dashboardRequestRef = useRef(false);
  const resultadoRef = useRef<HTMLDivElement>(null);
  const isReady = unlocked && config.fiscal.trim().length > 0;

  const loadOperationalDashboard = useCallback(async ({ silent = false } = {}) => {
    if (!unlocked || dashboardRequestRef.current || !isEventoApiConfigured()) return;
    dashboardRequestRef.current = true;
    if (!silent) setDashboardError("");
    try {
      const response = await carregarDashboard();
      if (!response.success) {
        setDashboardError(response.message ?? "Não foi possível atualizar os indicadores.");
        return;
      }
      setDashboard(response);
      setDashboardError("");
      setLastSync(new Date().toLocaleTimeString("pt-BR"));
    } catch (err) {
      setDashboardError(err instanceof Error ? err.message : "Falha de conexão com o painel.");
    } finally {
      dashboardRequestRef.current = false;
    }
  }, [unlocked]);

  const operationalTotals = useMemo(() => {
    const participants = dashboard?.participantes ?? [];
    const validated = dashboard?.totalValidados ?? participants.filter((item) => item.status === "VALIDADO").length;
    const registered = dashboard?.totalInscritos ?? 0;
    return {
      registered,
      validated,
      pending: dashboard?.totalPendentes ?? Math.max(0, registered - validated),
      reused: dashboard?.totalReutilizados ?? 0,
    };
  }, [dashboard]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    const codigo = searchParams.get("codigo");
    if (codigo) setManualCode(normalizeCodigo(codigo));

    if (savedAuth) {
      try {
        const auth = JSON.parse(savedAuth);
        const user = CHECKIN_USERS.find((item) => item.login === auth.login);
        if (user) {
          setUnlocked(true);
          setLogin(user.login);
          setConfig((current) => ({ fiscal: current.fiscal || user.fiscal, portaria: user.login }));
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig((current) => ({ ...current, fiscal: parsed.fiscal || current.fiscal }));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (config.fiscal) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ fiscal: config.fiscal }));
    }
  }, [config.fiscal]);

  useEffect(() => {
    return () => {
      scannerRef.current?.stop().catch(() => undefined);
      scannerRef.current?.clear();
    };
  }, []);

  useEffect(() => {
    const clockId = window.setInterval(() => setNow(new Date()), 1000);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.clearInterval(clockId);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    void loadOperationalDashboard();
    const intervalId = window.setInterval(
      () => void loadOperationalDashboard({ silent: true }),
      10_000,
    );
    return () => window.clearInterval(intervalId);
  }, [loadOperationalDashboard, unlocked]);

  useEffect(() => {
    if (isReady && !scannerOn && !scannerRef.current) {
      startScanner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if (result) {
      resultadoRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    const user = CHECKIN_USERS.find(
      (item) =>
        item.login.trim().toLowerCase() === login.trim().toLowerCase() &&
        item.senha === password,
    );

    if (!user) {
      setLoginError("Login ou senha invalidos.");
      return;
    }

    setUnlocked(true);
    setConfig({ fiscal: user.fiscal, portaria: user.login });
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ login: user.login }));
  }

  function logout() {
    stopScanner();
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUnlocked(false);
    setLogin("");
    setPassword("");
    setResult(null);
  }

  async function stopScanner() {
    const scanner = scannerRef.current;
    if (!scanner) return;
    scannerRef.current = null;
    await scanner.stop().catch(() => undefined);
    scanner.clear();
    setScannerOn(false);
  }

  async function startScanner() {
    setScannerError("");

    if (!isEventoApiConfigured()) {
      setScannerError("Configure VITE_EVENTO_API_URL antes de usar a portaria.");
      return;
    }

    try {
      const scanner = new Html5Qrcode("evento-qr-reader", false);
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 260, height: 260 } },
        async (decodedText) => {
          if (scanLockedRef.current) return;
          scanLockedRef.current = true;
          const codigo = extractCodigoFromScan(decodedText);
          await stopScanner();
          setManualCode(codigo);
          await consult(codigo);
        },
        () => undefined,
      );
      setScannerOn(true);
    } catch (err) {
      scannerRef.current?.clear();
      scannerRef.current = null;
      setScannerError("Nao foi possivel abrir a camera. Use a digitacao manual.");
      setScannerOn(false);
    }
  }

  async function consult(codigo = manualCode) {
    const normalized = normalizeCodigo(codigo);
    if (!normalized) return;

    if (scannerOn) await stopScanner();
    setLoading(true);
    setResult(null);
    try {
      const response = await consultarCodigo(normalized);
      setResult({ kind: "consulta", lookup: "codigo", ...response });
    } catch (err) {
      setResult({
        kind: "consulta",
        lookup: "codigo",
        success: false,
        message: err instanceof Error ? err.message : "Erro ao consultar código.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function consultByCpf() {
    const digits = onlyDigits(cpfQuery, 11);
    if (digits.length !== 11) {
      setResult({
        kind: "consulta",
        lookup: "cpf",
        success: false,
        message: "Informe os 11 dígitos do CPF para verificar o cadastro.",
      });
      return;
    }

    if (scannerOn) await stopScanner();
    setLoading(true);
    setResult(null);
    try {
      const response = await consultarPorCpf(digits);
      setResult({ kind: "consulta", lookup: "cpf", ...response });
      if (response.codigo) setManualCode(response.codigo);
    } catch (err) {
      setResult({
        kind: "consulta",
        lookup: "cpf",
        success: false,
        message: err instanceof Error ? err.message : "Erro ao buscar CPF.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function confirmEntry() {
    if (!result?.codigo || !config.fiscal) return;

    setLoading(true);
    try {
      const response = await validarCodigo(result.codigo, config.fiscal, config.portaria);
      setResult({ kind: "validacao", ...response });
      const historyItem: EventoDashboardValidacao = {
        data: response.dataValidacao ?? new Date().toLocaleDateString("pt-BR"),
        hora: response.horaValidacao ?? new Date().toLocaleTimeString("pt-BR"),
        codigo: response.codigo ?? result.codigo,
        resultado: response.resultado,
        nome: response.nome ?? result.nome ?? "",
        fiscal: config.fiscal,
        portaria: config.portaria,
      };
      setLocalHistory((current) => [historyItem, ...current].slice(0, 8));
      if (response.resultado === "VALIDADO_COM_SUCESSO") {
        setSessionTotals((current) => ({ ...current, validated: current.validated + 1 }));
        navigator.vibrate?.(120);
      } else if (response.resultado === "JA_VALIDADO") {
        setSessionTotals((current) => ({ ...current, reused: current.reused + 1 }));
        navigator.vibrate?.([120, 80, 120]);
      }
      void loadOperationalDashboard({ silent: true });
    } catch (err) {
      setResult({
        kind: "validacao",
        success: false,
        resultado: "ERRO",
        message: err instanceof Error ? err.message : "Erro ao validar entrada.",
      });
    } finally {
      setLoading(false);
    }
  }

  function rescan() {
    setResult(null);
    setManualCode("");
    setCpfQuery("");
    scanLockedRef.current = false;
    void startScanner();
  }

  if (!unlocked) {
    return (
      <main
        id="conteudo-principal"
        className="evento-checkin-bg relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-5 text-white"
        style={{ backgroundColor: EVENTO_COLORS.navy, backgroundImage: "url(/hero/herodesktop.jpg)" }}
      >
        <style>{`
          .evento-checkin-bg {
            background-image: image-set(url(/hero/herodesktop.webp) type("image/webp"), url(/hero/herodesktop.jpg) type("image/jpeg"));
          }
        `}</style>
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <form onSubmit={unlock} className="relative my-6 w-full max-w-sm overflow-hidden rounded-lg border border-white/10 bg-white text-zinc-950 shadow-xl">
          <div className="h-2" style={{ backgroundColor: EVENTO_COLORS.yellow }} />
          <div className="p-5">
          <Shield className="mb-4 h-9 w-9" style={{ color: EVENTO_COLORS.green }} />
          <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: EVENTO_COLORS.green }}>
            {EVENTO_GUTEMBERG.name}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold">Portaria do evento</h1>
          <p className="mt-2 text-sm text-zinc-600">
            {EVENTO_GUTEMBERG.date} as {EVENTO_GUTEMBERG.time} - {EVENTO_GUTEMBERG.venue}
          </p>
          {loginError && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
              {loginError}
            </div>
          )}
          <Label htmlFor="checkin-login" className="mt-5 block">Login</Label>
          <Input
            id="checkin-login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            className="mt-2"
            autoComplete="username"
            autoFocus
          />
          <Label htmlFor="checkin-password" className="mt-5 block">Senha</Label>
          <Input
            id="checkin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2"
            autoComplete="current-password"
          />
          <Button type="submit" className="mt-5 w-full text-white" style={{ backgroundColor: EVENTO_COLORS.green }}>
            Entrar
          </Button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main
      id="conteudo-principal"
      className="min-h-screen pb-8 text-zinc-950"
      style={{ backgroundColor: EVENTO_COLORS.lightGray }}
    >
      <header className="sticky top-0 z-30 border-b border-white/10 text-white shadow-lg" style={{ backgroundColor: EVENTO_COLORS.navy }}>
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: EVENTO_COLORS.yellow }}>
              Central operacional de entrada
            </p>
            <h1 className="text-lg font-black sm:text-2xl">{EVENTO_GUTEMBERG.title}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-right">
              <p className="text-xs font-black sm:text-sm">{config.fiscal}</p>
              <p className="text-[10px] text-white/60 sm:text-[11px]">Terminal {config.portaria}</p>
            </div>
            <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${online ? "bg-emerald-500/20 text-emerald-200" : "bg-red-500/25 text-red-100"}`}>
              {online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
              {online ? "Online" : "Sem rede"}
            </span>
            <span className="hidden items-center gap-1 text-sm font-bold md:flex">
              <Clock3 className="h-4 w-4" />
              {now.toLocaleTimeString("pt-BR")}
            </span>
            <Button type="button" variant="outline" size="sm" onClick={logout} className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-3 pt-4 sm:px-6">
        <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <OperationMetric label="Inscritos" value={operationalTotals.registered} icon={<Users />} tone="blue" />
          <OperationMetric label="Entraram" value={operationalTotals.validated} icon={<UserCheck />} tone="green" />
          <OperationMetric label="Aguardando" value={operationalTotals.pending} icon={<Clock3 />} tone="amber" />
          <OperationMetric label="Reutilizações" value={operationalTotals.reused} icon={<ShieldAlert />} tone="red" />
          <OperationMetric label="Nesta sessão" value={sessionTotals.validated} icon={<Activity />} tone="green" />
          <OperationMetric label="Alertas locais" value={sessionTotals.reused} icon={<XCircle />} tone="red" />
        </section>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
          <p>
            Painel sincronizado a cada 10 segundos{lastSync ? ` · Última atualização: ${lastSync}` : ""}
          </p>
          <Button variant="ghost" size="sm" onClick={() => void loadOperationalDashboard()} className="h-8">
            <RefreshCcw className="h-3.5 w-3.5" /> Atualizar agora
          </Button>
        </div>
        {dashboardError && (
          <div className="mt-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
            Os indicadores estão temporariamente sem atualização. A validação individual continua disponível. {dashboardError}
          </div>
        )}

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-5">
          {!isReady && (
            <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">
              Informe o nome do fiscal antes de validar convites.
            </div>
          )}

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-xl font-black">Validar entrada</h2>
              <p className="text-sm text-zinc-500">Leia o QR Code ou localize o inscrito por código ou CPF.</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${scannerOn ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-600"}`}>
              {scannerOn ? "Câmera pronta" : "Câmera pausada"}
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(18rem,1.15fr)_minmax(18rem,.85fr)]">
            <div>
              <div id="evento-qr-reader" className="min-h-[18rem] overflow-hidden rounded-xl border-2 border-zinc-200 bg-zinc-950 sm:min-h-[24rem]" />
              {scannerError && <p className="mt-2 text-sm font-semibold text-red-700">{scannerError}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  onClick={startScanner}
                  disabled={!isReady || scannerOn}
                  className="text-white"
                  style={{ backgroundColor: EVENTO_COLORS.green }}
                >
                  <Camera className="h-4 w-4" />
                  Abrir camera
                </Button>
                <Button variant="outline" onClick={stopScanner} disabled={!scannerOn}>
                  Parar camera
                </Button>
              </div>
            </div>

            <div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <Label htmlFor="manual-code" className="font-black">Código do convite</Label>
              <div className="mt-2 flex gap-2">
                <Input
                  id="manual-code"
                  value={manualCode}
                  onChange={(event) => setManualCode(event.target.value.toUpperCase())}
                  onKeyDown={(event) => event.key === "Enter" && consult()}
                  placeholder="GTFED-A8K3P9"
                  className="h-12 bg-white font-mono text-base font-bold uppercase"
                />
                <Button
                  className="h-12 px-4 text-white"
                  onClick={() => consult()}
                  disabled={!isReady || loading}
                  aria-label="Consultar código"
                  style={{ backgroundColor: EVENTO_COLORS.green }}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  <span className="hidden sm:inline">Buscar</span>
                </Button>
              </div>

              <div className="my-4 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-400">
                <span className="h-px flex-1 bg-zinc-200" /> ou <span className="h-px flex-1 bg-zinc-200" />
              </div>

              <Label htmlFor="cpf-query" className="block font-black">
                CPF do inscrito
              </Label>
              <p className="mt-1 text-xs text-zinc-500">
                Use esta busca quando a pessoa se cadastrou online e não estiver com o QR Code.
              </p>
              <div className="mt-2 flex gap-2">
                <Input
                  id="cpf-query"
                  inputMode="numeric"
                  value={cpfQuery}
                  onChange={(event) => setCpfQuery(formatCpf(event.target.value))}
                  onKeyDown={(event) => event.key === "Enter" && consultByCpf()}
                  placeholder="000.000.000-00"
                  className="h-12 bg-white text-base"
                />
                <Button
                  className="h-12 px-4 text-white"
                  onClick={consultByCpf}
                  disabled={!isReady || loading}
                  aria-label="Buscar por CPF"
                  style={{ backgroundColor: EVENTO_COLORS.green }}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  <span className="hidden sm:inline">Buscar</span>
                </Button>
              </div>
              </div>

              <div ref={resultadoRef}>
                <ResultCard result={result} loading={loading} onConfirm={confirmEntry} onDismiss={rescan} />
              </div>
            </div>
          </div>
        </section>
        <OperationalHistory
          items={[
            ...localHistory,
            ...(dashboard?.ultimasValidacoes ?? []).filter(
              (remote) => !localHistory.some(
                (local) => local.codigo === remote.codigo && local.hora === remote.hora,
              ),
            ),
          ]}
          usingLocalHistory={localHistory.length > 0}
        />
        </div>
      </div>
    </main>
  );
}

function OperationMetric({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: "blue" | "green" | "amber" | "red";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-800",
    green: "bg-emerald-50 text-emerald-800",
    amber: "bg-amber-50 text-amber-800",
    red: "bg-red-50 text-red-800",
  };

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg [&>svg]:h-4 [&>svg]:w-4 ${tones[tone]}`}>
          {icon}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold uppercase tracking-wide text-zinc-500">{label}</p>
          <p className="text-2xl font-black leading-none text-zinc-950">{value}</p>
        </div>
      </div>
    </article>
  );
}

function OperationalHistory({
  items,
  usingLocalHistory,
}: {
  items: EventoDashboardValidacao[];
  usingLocalHistory: boolean;
}) {
  return (
    <aside className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-4 py-4">
        <h2 className="font-black">Últimas movimentações</h2>
        <p className="mt-1 text-xs text-zinc-500">
          {usingLocalHistory ? "Neste terminal e visão geral sincronizada" : "Visão geral de todas as portarias"}
        </p>
      </div>
      <div className="max-h-[48rem] divide-y divide-zinc-100 overflow-y-auto">
        {items.slice(0, 12).map((item, index) => {
          const reused = item.resultado === "JA_VALIDADO";
          return (
            <article className="p-4" key={`${item.codigo}-${item.hora}-${index}`}>
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${reused ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                  {reused ? <ShieldAlert className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black">{item.nome || "Participante"}</p>
                  <p className="mt-0.5 font-mono text-xs text-zinc-500">{item.codigo}</p>
                  <div className="mt-2 flex flex-wrap gap-x-2 text-[11px] text-zinc-500">
                    <span>{item.hora}</span>
                    <span>{item.fiscal || item.portaria}</span>
                  </div>
                  {reused && <p className="mt-1 text-xs font-black text-red-700">Entrada já utilizada</p>}
                </div>
              </div>
            </article>
          );
        })}
        {items.length === 0 && (
          <div className="p-8 text-center text-sm text-zinc-500">
            As validações aparecerão aqui em tempo real.
          </div>
        )}
      </div>
    </aside>
  );
}

function ResultCard({
  result,
  loading,
  onConfirm,
  onDismiss,
}: {
  result: CheckinResult | null;
  loading: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}) {
  if (!result) {
    return (
      <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
        Escaneie um QR Code ou digite o código para consultar.
      </div>
    );
  }

  if (!result.success || result.resultado === "CODIGO_NAO_ENCONTRADO") {
    const isCpfLookup = result.kind === "consulta" && result.lookup === "cpf";
    return (
      <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <XCircle className="mb-2 h-7 w-7" />
        <h2 className="text-xl font-extrabold">
          {isCpfLookup ? "Cadastro não encontrado" : "Código não encontrado"}
        </h2>
        <p className="mt-2 text-sm font-semibold">
          {result.message ?? (isCpfLookup
            ? "Confira o CPF informado antes de realizar um novo cadastro."
            : "Verifique o QR Code ou digite o código manualmente.")}
        </p>
        <Button variant="outline" className="mt-4 w-full" onClick={onDismiss}>
          Escanear proximo
        </Button>
      </div>
    );
  }

  if (result.kind === "validacao" && result.resultado === "VALIDADO_COM_SUCESSO") {
    return (
      <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
        <CheckCircle2 className="mb-2 h-7 w-7" />
        <h2 className="text-xl font-extrabold">Entrada registrada</h2>
        <InfoRows result={result} />
        <Button className="mt-4 h-12 w-full bg-emerald-700 text-base font-black hover:bg-emerald-800" onClick={onDismiss}>
          Próximo convidado
        </Button>
      </div>
    );
  }

  if (result.status === "VALIDADO" || result.resultado === "JA_VALIDADO") {
    return (
      <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <XCircle className="mb-2 h-7 w-7" />
        <h2 className="text-xl font-extrabold">Convite ja utilizado</h2>
        <InfoRows result={result} />
        <Button variant="outline" className="mt-4 w-full" onClick={onDismiss}>
          Escanear proximo
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
      <CheckCircle2 className="mb-2 h-7 w-7" />
      <h2 className="text-xl font-extrabold">Entrada liberada</h2>
      <InfoRows result={result} />
      <Button className="mt-4 w-full bg-emerald-700 hover:bg-emerald-800" onClick={onConfirm} disabled={loading}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Confirmar entrada
      </Button>
    </div>
  );
}

function InfoRows({ result }: { result: CheckinResult }) {
  return (
    <dl className="mt-3 space-y-2 text-sm">
      <div>
        <dt className="font-semibold opacity-70">Nome</dt>
        <dd className="font-bold">{result.nome ?? "-"}</dd>
      </div>
      <div>
        <dt className="font-semibold opacity-70">Código</dt>
        <dd className="font-mono font-bold">{result.codigo ?? "-"}</dd>
      </div>
      {"status" in result && result.status && (
        <div>
          <dt className="font-semibold opacity-70">Status</dt>
          <dd className="font-bold">{result.status}</dd>
        </div>
      )}
      {(result.horaValidacao || result.validadoPor) && (
        <div>
          <dt className="font-semibold opacity-70">Validacao</dt>
          <dd className="font-bold">
            {[result.dataValidacao, result.horaValidacao, result.validadoPor].filter(Boolean).join(" - ")}
          </dd>
        </div>
      )}
    </dl>
  );
}
