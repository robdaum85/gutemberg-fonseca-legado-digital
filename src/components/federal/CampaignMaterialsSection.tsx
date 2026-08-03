import { useMemo } from "react";
import { Reveal } from "./FederalMotion";
import { campaignMaterials, type CampaignMaterial } from "@/data/campaignMaterials";

function MaterialPicture({ material }: { material: CampaignMaterial }) {
  return <picture className="material-picture"><source type="image/avif" srcSet={material.thumbnailAvif}/><source type="image/webp" srcSet={material.thumbnailWebp}/><img src={material.thumbnailWebp} alt={material.thumbnailAlt} width={640} height={420} loading="lazy" decoding="async"/></picture>;
}

export function CampaignMaterialsSection() {
  const materials = useMemo(
    () => (import.meta.env.DEV ? campaignMaterials : campaignMaterials.filter((material) => material.isApproved)).slice(0, 3),
    [],
  );

  return <section className="materials-section materials-section--simple" id="materiais" aria-labelledby="materials-title"><div className="shell materials-simple-grid">
    <Reveal className="section-editorial-head" direction="left"><span className="section-kicker">Conteúdo para compartilhar</span><h2 id="materials-title">Materiais</h2><p>Peças oficiais para apoiar, divulgar e levar nossas propostas a mais pessoas.</p></Reveal>
    {materials.length ? <div className="materials-grid">{materials.map((material, index) => <Reveal as="article" className="material-card" direction="up" delay={index * 80} key={material.id}><MaterialPicture material={material}/><div className="material-card-body"><span>{material.category}</span><h3>{material.title}</h3><p>{material.format} · {material.dimensions}</p>{material.isApproved ? <a className="material-download" href={material.downloadUrl} download>Baixar</a> : <span className="material-status">Em preparação</span>}</div></Reveal>)}</div> : <p className="section-empty">Os primeiros materiais serão publicados em breve.</p>}
  </div></section>;
}
