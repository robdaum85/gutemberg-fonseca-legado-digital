import { useMemo, useState } from "react";
import { Reveal } from "./FederalMotion";
import { campaignMaterials, type CampaignMaterial, type CampaignMaterialCategory } from "@/data/campaignMaterials";

const categories: CampaignMaterialCategory[] = ["Instagram", "Stories", "WhatsApp", "Impressos", "Vídeos", "Documentos", "Marca"];

export function MaterialFilters({ active, onChange }: { active: "Todos" | CampaignMaterialCategory; onChange: (category: "Todos" | CampaignMaterialCategory) => void }) {
  return <div className="section-filter-scroll material-filters" role="group" aria-label="Filtrar materiais"><button className={active === "Todos" ? "is-active" : ""} type="button" onClick={() => onChange("Todos")}>Todos</button>{categories.map((category) => <button className={active === category ? "is-active" : ""} type="button" onClick={() => onChange(category)} key={category}>{category}</button>)}</div>;
}

function MaterialPicture({ material }: { material: CampaignMaterial }) {
  return <picture className="material-picture"><source type="image/avif" srcSet={material.thumbnailAvif}/><source type="image/webp" srcSet={material.thumbnailWebp}/><img src={material.thumbnailWebp} alt={material.thumbnailAlt} width={640} height={420} loading="lazy" decoding="async"/></picture>;
}

export function CampaignMaterialCard({ material, index }: { material: CampaignMaterial; index: number }) {
  const localFile = material.downloadUrl.startsWith("/");
  return <Reveal as="article" className="material-card" direction="up" delay={(index % 4) * 70}>
    <MaterialPicture material={material}/>
    <div className="material-card-body"><div><span>{material.category}</span>{import.meta.env.DEV && !material.isApproved ? <b className="content-provisional">Provisório</b> : null}</div><h3>{material.title}</h3><dl><div><dt>Formato</dt><dd>{material.format}</dd></div><div><dt>Tamanho</dt><dd>{material.size}</dd></div><div><dt>Dimensões</dt><dd>{material.dimensions}</dd></div><div><dt>Data</dt><dd>{material.date ?? "Pendente"}</dd></div></dl>{material.isApproved ? <a className="material-download" href={material.downloadUrl} {...(localFile ? { download: "" } : {})}>Baixar material</a> : <button className="material-download" type="button" disabled>Aguardando aprovação</button>}</div>
  </Reveal>;
}

export function CampaignMaterialsSection() {
  const [activeCategory, setActiveCategory] = useState<"Todos" | CampaignMaterialCategory>("Todos");
  const availableMaterials = useMemo(() => import.meta.env.DEV ? campaignMaterials : campaignMaterials.filter((material) => material.isApproved), []);
  const featured = availableMaterials.find((material) => material.isFeatured);
  const filtered = availableMaterials.filter((material) => !material.isFeatured && (activeCategory === "Todos" || material.category === activeCategory));

  return <section className="materials-section" id="materiais" aria-labelledby="materials-title"><div className="shell">
    <Reveal className="section-editorial-head" direction="up"><span className="section-kicker">Conteúdo para compartilhar</span><h2 id="materials-title">Baixe o <em>Material</em></h2><p>Arquivos oficiais serão liberados somente depois da aprovação editorial e jurídica.</p></Reveal>
    <MaterialFilters active={activeCategory} onChange={setActiveCategory}/>
    {featured && (activeCategory === "Todos" || activeCategory === featured.category) ? <Reveal as="article" className="material-featured" direction="fade"><MaterialPicture material={featured}/><div><span>Kit em destaque</span><h3>{featured.title}</h3><p>Pacote ZIP com materiais organizados para diferentes canais e formatos.</p><dl><div><dt>Formato</dt><dd>{featured.format}</dd></div><div><dt>Tamanho</dt><dd>{featured.size}</dd></div></dl>{featured.isApproved ? <a className="btn btn--yellow" href={featured.downloadUrl} download>Baixar kit completo</a> : <button className="btn btn--yellow" type="button" disabled>Kit aguardando aprovação</button>}{import.meta.env.DEV && !featured.isApproved ? <b className="content-provisional">Não publicar</b> : null}</div></Reveal> : null}
    {filtered.length ? <div className="materials-grid">{filtered.map((material, index) => <CampaignMaterialCard material={material} index={index} key={material.id}/>)}</div> : <p className="section-empty">Nenhum material aprovado nesta categoria.</p>}
  </div></section>;
}
