import { useMemo } from "react";
import { Reveal } from "./FederalMotion";
import { bolsonaroRelationshipItems, type BolsonaroRelationshipItem } from "@/data/bolsonaroRelationshipItems";

function relationshipDate(value: string | null) {
  if (!value) return "Data a confirmar";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "America/Sao_Paulo" }).format(new Date(value));
}

function RelationshipPicture({ item }: { item: BolsonaroRelationshipItem }) {
  return <picture className="alliance-picture"><source type="image/avif" srcSet={item.imageAvif}/><source type="image/webp" srcSet={item.imageWebp}/><img src={item.imageWebp} alt={item.imageAlt} width={960} height={640} loading="lazy" decoding="async"/></picture>;
}

export function BolsonaroAllianceSection() {
  const records = useMemo(
    () => (import.meta.env.DEV ? bolsonaroRelationshipItems : bolsonaroRelationshipItems.filter((item) => item.isApproved))
      .filter((item) => item.mediaType === "gallery" || item.mediaType === "timeline")
      .slice(0, 2),
    [],
  );

  return <section className="alliance-section alliance-section--simple" id="bolsonaro" aria-labelledby="alliance-title"><div className="shell alliance-simple-grid">
    <Reveal className="alliance-heading" direction="left"><span className="section-kicker">Alianças</span><h2 id="alliance-title">Diálogo e compromisso com o Brasil</h2><p>Relações construídas com respeito, confiança e objetivos comuns para defender o cidadão.</p></Reveal>
    {records.length ? <div className="alliance-gallery" aria-label="Registros de alianças">{records.map((item, index) => <Reveal as="article" className="alliance-gallery-card" direction="up" delay={index * 100} key={item.id}><RelationshipPicture item={item}/><div><span>{item.person}</span><small>{relationshipDate(item.date)} · {item.location}</small><p>{item.description}</p></div></Reveal>)}</div> : <p className="section-empty section-empty--dark">Novos registros serão publicados em breve.</p>}
  </div></section>;
}
