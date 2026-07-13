import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, CheckCircle2, Loader2, Search, Shield, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";
import { EVENTO_COLORS, EVENTO_GUTEMBERG } from "@/config/evento";
import {
  consultarCodigo,
  consultarPorCpf,
  extractCodigoFromScan,
  isEventoApiConfigured,
  normalizeCodigo,
  validarCodigo,
  type EventoConsultaResponse,
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
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const resultadoRef = useRef<HTMLDivElement>(null);
  const isReady = unlocked && config.fiscal.trim().length > 0;

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
    if (!scannerRef.current) return;
    await scannerRef.current.stop().catch(() => undefined);
    scannerRef.current.clear();
    scannerRef.current = null;
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
          const codigo = extractCodigoFromScan(decodedText);
          await stopScanner();
          setManualCode(codigo);
          await consult(codigo);
        },
        () => undefined,
      );
      setScannerOn(true);
    } catch (err) {
      setScannerError("Nao foi possivel abrir a camera. Use a digitacao manual.");
      setScannerOn(false);
    }
  }

  async function consult(codigo = manualCode) {
    const normalized = normalizeCodigo(codigo);
    if (!normalized) return;

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
    } catch (err) {
      setResult({
        kind: "validacao",
        success: false,
        resultado: "ERRO",
        message: err instanceof Error ? err.message : "Erro ao validar entrada.",
      });
    } finally {
      setLoading(false);
      startScanner();
    }
  }

  function rescan() {
    setResult(null);
    startScanner();
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
      className="min-h-screen px-3 py-3 text-zinc-950 sm:px-4 sm:py-5"
      style={{ backgroundColor: EVENTO_COLORS.lightGray }}
    >
      <div className="mx-auto grid max-w-6xl gap-3 sm:gap-5 lg:grid-cols-[22rem_1fr]">
        <aside className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div className="p-3 text-white sm:p-4" style={{ backgroundColor: EVENTO_COLORS.navy }}>
            <p className="text-[11px] font-black uppercase tracking-[0.14em] sm:text-xs" style={{ color: EVENTO_COLORS.yellow }}>
              {EVENTO_GUTEMBERG.title}
            </p>
            <p className="mt-0.5 text-xs font-bold sm:text-sm">{EVENTO_GUTEMBERG.name} {EVENTO_GUTEMBERG.year}</p>
          </div>
          <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-lg font-extrabold sm:text-xl">Check-in</h1>
            <Button type="button" variant="ghost" size="sm" onClick={logout}>
              Sair
            </Button>
          </div>
          <div className="mt-2 rounded-md bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
            <span className="font-semibold text-zinc-500">Fiscal:</span>{" "}
            <span className="font-bold text-zinc-950">{config.fiscal || "-"}</span>
          </div>
          </div>
        </aside>

        <section className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm sm:p-4">
          {!isReady && (
            <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">
              Informe o nome do fiscal antes de validar convites.
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-[1fr_20rem]">
            <div>
              <div id="evento-qr-reader" className="min-h-[15rem] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 sm:min-h-[18rem]" />
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
              <Label htmlFor="manual-code">Código manual</Label>
              <div className="mt-2 flex gap-2">
                <Input
                  id="manual-code"
                  value={manualCode}
                  onChange={(event) => setManualCode(event.target.value.toUpperCase())}
                  placeholder="GTBPAL-A8K3P9"
                />
                <Button
                  size="icon"
                  onClick={() => consult()}
                  disabled={!isReady || loading}
                  aria-label="Consultar código"
                  className="text-white"
                  style={{ backgroundColor: EVENTO_COLORS.green }}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>

              <Label htmlFor="cpf-query" className="mt-4 block">
                Verificar cadastro por CPF
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
                />
                <Button
                  size="icon"
                  onClick={consultByCpf}
                  disabled={!isReady || loading}
                  aria-label="Buscar por CPF"
                  className="text-white"
                  style={{ backgroundColor: EVENTO_COLORS.green }}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>

              <div ref={resultadoRef}>
                <ResultCard result={result} loading={loading} onConfirm={confirmEntry} onDismiss={rescan} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
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
