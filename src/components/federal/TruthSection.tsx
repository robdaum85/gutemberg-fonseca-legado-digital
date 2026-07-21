import { useEffect, useMemo, useState } from "react";
import { Reveal } from "./FederalMotion";
import { truthItems, type TruthItem, type TruthStatus } from "@/data/truthItems";

const statusLabels: Record<TruthStatus, string> = {
  false: "Falso",
  misleading: "Enganoso",
  "out-of-context": "Fora de contexto",
  true: "Verdadeiro",
  "under-review": "Em verificação",
};

function formatDate(value: string | null) {
  if (!value) return "Data pendente";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeZone: "America/Sao_Paulo" }).format(new Date(value));
}

function TruthSources({ item }: { item: TruthItem }) {
  return <ul className="truth-sources">{item.sources.map((source) => <li key={source.label}>{source.url ? <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a> : <span>{source.label}</span>}<small>{formatDate(source.publishedAt)}</small></li>)}</ul>;
}

export function TruthCard({ item, index, onOpen }: { item: TruthItem; index: number; onOpen: (item: TruthItem) => void }) {
  const [expanded, setExpanded] = useState(false);
  return <Reveal as="article" className="truth-card" direction="up" delay={index * 80}>
    <div className="truth-card-top"><span className={`truth-status truth-status--${item.status}`}>{statusLabels[item.status]}</span>{import.meta.env.DEV && !item.isApproved ? <span className="content-provisional">Conteúdo provisório</span> : null}</div>
    <h3>{item.claim}</h3>
    <p>{item.summary}</p>
    <div className="truth-dates"><span>Alegação: {formatDate(item.claimDate)}</span><span>Revisão: {formatDate(item.reviewedAt)}</span></div>
    <button className="truth-open truth-open--desktop" type="button" onClick={() => onOpen(item)}>Ver checagem completa</button>
    <button className="truth-open truth-open--mobile" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? "Ocultar detalhes" : "Abrir detalhes"}</button>
    {expanded ? <div className="truth-accordion"><p>{item.explanation}</p><h4>Fontes</h4><TruthSources item={item}/></div> : null}
  </Reveal>;
}

export function TruthDetailsModal({ item, onClose }: { item: TruthItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [item, onClose]);

  if (!item) return null;
  return <div className="truth-modal" role="dialog" aria-modal="true" aria-labelledby="truth-modal-title">
    <button className="truth-modal-backdrop" type="button" aria-label="Fechar detalhes" onClick={onClose}/>
    <aside className="truth-modal-panel">
      <button className="truth-modal-close" type="button" onClick={onClose}>Fechar ×</button>
      <span className={`truth-status truth-status--${item.status}`}>{statusLabels[item.status]}</span>
      <h3 id="truth-modal-title">{item.claim}</h3>
      <p className="truth-modal-summary">{item.summary}</p>
      <p>{item.explanation}</p>
      <dl><div><dt>Data da alegação</dt><dd>{formatDate(item.claimDate)}</dd></div><div><dt>Última revisão</dt><dd>{formatDate(item.reviewedAt)}</dd></div></dl>
      <h4>Fontes consultadas</h4><TruthSources item={item}/>
      {import.meta.env.DEV && !item.isApproved ? <span className="content-provisional">Não publicar — aprovação pendente</span> : null}
    </aside>
  </div>;
}

export function TruthSection() {
  const [filter, setFilter] = useState<"all" | TruthStatus>("all");
  const [selected, setSelected] = useState<TruthItem | null>(null);
  const availableItems = useMemo(() => import.meta.env.DEV ? truthItems : truthItems.filter((item) => item.isApproved), []);
  const filteredItems = filter === "all" ? availableItems : availableItems.filter((item) => item.status === filter);

  return <section className="truth-section" id="verdade" aria-labelledby="truth-title"><div className="shell">
    <Reveal className="section-editorial-head" direction="up"><span className="section-kicker">Informação com responsabilidade</span><h2 id="truth-title">Conheça a <em>Verdade</em></h2><p>Checagens documentadas, contexto acessível e fontes identificadas antes de qualquer publicação.</p></Reveal>
    <div className="section-filter-scroll" role="group" aria-label="Filtrar checagens"><button className={filter === "all" ? "is-active" : ""} type="button" onClick={() => setFilter("all")}>Todos</button>{(Object.keys(statusLabels) as TruthStatus[]).map((status) => <button className={filter === status ? "is-active" : ""} type="button" key={status} onClick={() => setFilter(status)}>{statusLabels[status]}</button>)}</div>
    {filteredItems.length ? <div className="truth-grid">{filteredItems.map((item, index) => <TruthCard item={item} index={index} onOpen={setSelected} key={item.id}/>)}</div> : <p className="section-empty">Nenhuma checagem aprovada para publicação.</p>}
    <Reveal className="truth-submit" direction="fade"><p>Possui documento ou informação relevante para uma verificação?</p><a className="btn btn--outline-n" href="#contato">Enviar informação para verificação</a></Reveal>
  </div><TruthDetailsModal item={selected} onClose={() => setSelected(null)}/></section>;
}
