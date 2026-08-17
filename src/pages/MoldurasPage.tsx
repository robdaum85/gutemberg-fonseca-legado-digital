import { ArrowRight, ImagePlus, LockKeyhole } from "lucide-react";
import { activePhotoFrames } from "@/config/photoFrames";
import { MoldurasHeader } from "@/components/molduras/MoldurasHeader";
import { useCampaignAnalytics } from "@/lib/campaignAnalytics";
import { useSeo } from "@/lib/useSeo";
import "./MoldurasPage.css";

const SITE_URL = "https://gutembergfonseca.com.br";

export default function MoldurasPage() {
  useCampaignAnalytics();
  useSeo({
    title: "Molduras de campanha | Gutemberg Fonseca",
    description: "Escolha uma moldura oficial, personalize com sua foto e compartilhe seu apoio. O processamento acontece no seu próprio dispositivo.",
    canonical: `${SITE_URL}/molduras`,
    extraJsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Molduras de campanha",
      url: `${SITE_URL}/molduras`,
      numberOfItems: activePhotoFrames.length,
    },
  });

  return (
    <div className="frames-page">
      <MoldurasHeader/>
      <main id="conteudo-principal" tabIndex={-1}>
        <section className="frames-catalog-hero">
          <div className="frames-shell">
            <span className="frames-eyebrow"><ImagePlus/>Molduras oficiais</span>
            <h1>Mostre que você também <em>faz parte</em></h1>
            <p>Escolha uma campanha, adicione sua foto e compartilhe o resultado nas suas redes sociais.</p>
            <span className="frames-privacy"><LockKeyhole/>Suas fotos são processadas somente no seu aparelho.</span>
          </div>
        </section>
        <section className="frames-catalog" aria-labelledby="frames-catalog-title">
          <div className="frames-shell">
            <h2 className="sr-only" id="frames-catalog-title">Molduras disponíveis</h2>
            <div className="frames-catalog-grid">
              {activePhotoFrames.map((frame) => (
                <article className="frames-card" key={frame.slug}>
                  <a className="frames-card-preview" href={`/molduras/${frame.slug}`} aria-label={`Usar moldura de ${frame.candidateName}`}>
                    <span aria-hidden="true"/><img src={frame.frameSrc} alt="" width={frame.output.width} height={frame.output.height}/>
                  </a>
                  <div className="frames-card-body">
                    <span>{frame.office}</span>
                    <h3>{frame.candidateName} <strong>{frame.candidateNumber}</strong></h3>
                    <p>{frame.description}</p>
                    <a className="frame-button frame-button--secondary" href={`/molduras/${frame.slug}`} data-campaign-event="photo_frame_select" data-campaign-label={frame.candidateName}>Usar esta moldura<ArrowRight/></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="frames-footer"><div className="frames-shell"><strong>Gutemberg Fonseca 2255</strong><span>O Defensor do Consumidor</span></div></footer>
    </div>
  );
}
