import { ArrowLeft } from "lucide-react";

export function MoldurasHeader({ backHref = "/", backLabel = "Voltar ao site" }: { backHref?: string; backLabel?: string }) {
  return (
    <header className="frames-header">
      <div className="frames-shell frames-header-inner">
        <a className="frames-brand" href="/" aria-label="Página inicial de Gutemberg Fonseca">
          <img src="/images/federal/brand/logo-navbar-2255-horizontal.png" alt="Gutemberg Fonseca 2255" width="1000" height="500"/>
        </a>
        <a className="frames-back" href={backHref}><ArrowLeft aria-hidden="true"/>{backLabel}</a>
      </div>
    </header>
  );
}
