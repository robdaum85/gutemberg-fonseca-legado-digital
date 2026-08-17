import { Navigate, useParams } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { MoldurasHeader } from "@/components/molduras/MoldurasHeader";
import { PhotoFrameEditor } from "@/components/molduras/PhotoFrameEditor";
import { getPhotoFrame } from "@/config/photoFrames";
import { useCampaignAnalytics } from "@/lib/campaignAnalytics";
import { useSeo } from "@/lib/useSeo";
import "./MoldurasPage.css";

const SITE_URL = "https://gutembergfonseca.com.br";

function MolduraEditorContent({ slug }: { slug: string }) {
  const frame = getPhotoFrame(slug)!;
  useCampaignAnalytics();
  useSeo({
    title: `${frame.title} — ${frame.candidateName} ${frame.candidateNumber}`,
    description: frame.description,
    canonical: `${SITE_URL}/molduras/${frame.slug}`,
    image: `${SITE_URL}${frame.frameSrc}`,
    breadcrumbs: [
      { name: "Início", url: SITE_URL },
      { name: "Molduras", url: `${SITE_URL}/molduras` },
      { name: `${frame.candidateName} ${frame.candidateNumber}`, url: `${SITE_URL}/molduras/${frame.slug}` },
    ],
  });

  return (
    <div className="frames-page" style={{ "--frame-primary": frame.colors.primary, "--frame-secondary": frame.colors.secondary, "--frame-accent": frame.colors.accent } as React.CSSProperties}>
      <MoldurasHeader backHref="/molduras" backLabel="Ver todas as molduras"/>
      <main id="conteudo-principal" tabIndex={-1}>
        <section className="frame-tool-hero">
          <div className="frames-shell frame-tool-hero-inner">
            <div><span>{frame.title}</span><h1>Crie sua foto de apoio</h1><p>{frame.description}</p></div>
            <span className="frame-tool-candidate"><small>{frame.office}</small><strong>{frame.candidateName}</strong><b>{frame.candidateNumber}</b></span>
          </div>
        </section>
        <section className="frame-tool-area">
          <div className="frames-shell"><div className="frame-tool-card"><PhotoFrameEditor frame={frame}/></div></div>
        </section>
        <section className="frame-local-note"><div className="frames-shell"><LockKeyhole/><div><strong>Privacidade desde o início</strong><p>A composição acontece inteiramente no navegador. A foto escolhida não é enviada, armazenada ou compartilhada sem sua ação.</p></div></div></section>
      </main>
      <footer className="frames-footer"><div className="frames-shell frames-footer-editor"><span>{frame.legalLines.map((line) => <small key={line}>{line}</small>)}</span></div></footer>
    </div>
  );
}
export default function MolduraEditorPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug || !getPhotoFrame(slug)) return <Navigate to="/molduras" replace/>;
  return <MolduraEditorContent slug={slug}/>;
}
