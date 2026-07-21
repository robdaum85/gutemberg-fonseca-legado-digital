import { useEffect, useMemo, useRef } from "react";
import { ParallaxLayer, Reveal } from "./FederalMotion";
import { bolsonaroRelationshipItems, type BolsonaroRelationshipItem } from "@/data/bolsonaroRelationshipItems";

function relationshipDate(value: string | null) {
  if (!value) return "Data pendente";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "America/Sao_Paulo" }).format(new Date(value));
}

function RelationshipPicture({ item }: { item: BolsonaroRelationshipItem }) {
  return <picture className="alliance-picture"><source type="image/avif" srcSet={item.imageAvif}/><source type="image/webp" srcSet={item.imageWebp}/><img src={item.imageWebp} alt={item.imageAlt} width={960} height={640} loading="lazy" decoding="async"/></picture>;
}

export function BolsonaroAllianceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => import.meta.env.DEV ? bolsonaroRelationshipItems : bolsonaroRelationshipItems.filter((item) => item.isApproved), []);
  const galleryItems = items.filter((item) => item.mediaType === "gallery" || item.mediaType === "timeline");
  const testimonyItems = items.filter((item) => item.mediaType === "video" || item.mediaType === "testimonial");

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = timeline.getBoundingClientRect();
      const viewportPoint = window.innerHeight * 0.72;
      const progress = Math.max(0, Math.min((viewportPoint - rect.top) / Math.max(rect.height, 1), 1));
      timeline.style.setProperty("--timeline-progress", `${progress}`);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <section className="alliance-section" id="bolsonaro" aria-labelledby="alliance-title"><div className="shell">
    <Reveal className="alliance-heading" direction="up"><span className="section-kicker">Gutemberg e a família Bolsonaro</span><h2 id="alliance-title">Confiança, diálogo e compromisso com o Brasil</h2><p>Somente registros documentados, contextualizados e aprovados são exibidos publicamente nesta seção.</p></Reveal>
    {items.length ? <>
      <div className="alliance-gallery" aria-label="Galeria de registros documentais">{galleryItems.map((item, index) => <Reveal as="article" className="alliance-gallery-card" direction={index % 2 ? "right" : "left"} delay={index * 100} key={item.id}><ParallaxLayer className="alliance-media-parallax" speed={0.035} maxMovement={24} ariaHidden={false}><RelationshipPicture item={item}/></ParallaxLayer><div><span>{item.person}</span><small>{relationshipDate(item.date)} · {item.location}</small><p>{item.description}</p>{item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{item.sourceLabel}</a> : <em>{item.sourceLabel}</em>}{import.meta.env.DEV && !item.isApproved ? <b className="content-provisional">Conteúdo provisório</b> : null}</div></Reveal>)}</div>
      <div className="alliance-timeline" ref={timelineRef}><span className="alliance-timeline-progress" aria-hidden="true"/>{items.map((item, index) => <Reveal as="article" className="alliance-timeline-item" direction="up" delay={index * 90} key={`timeline-${item.id}`}><span className="alliance-timeline-dot" aria-hidden="true"/><time>{relationshipDate(item.date)}</time><h3>{item.person}</h3><strong>{item.location}</strong><p>{item.description}</p><small>{item.sourceLabel}</small></Reveal>)}</div>
      <div className="alliance-testimonies"><Reveal direction="up"><h3>Vídeos e depoimentos</h3><p>Registros audiovisuais exigem fonte pública, autorização e aprovação editorial.</p></Reveal>{testimonyItems.length ? <div>{testimonyItems.map((item) => <Reveal as="article" className="alliance-testimony" direction="right" key={`testimony-${item.id}`}><RelationshipPicture item={item}/><h4>{item.person}</h4><p>{item.description}</p><span>{item.sourceLabel}</span>{import.meta.env.DEV && !item.isApproved ? <b className="content-provisional">Conteúdo provisório</b> : null}</Reveal>)}</div> : <p className="section-empty section-empty--dark">Nenhum vídeo ou depoimento aprovado para publicação.</p>}</div>
    </> : <p className="section-empty section-empty--dark">Nenhum registro documental aprovado para publicação.</p>}
  </div></section>;
}
