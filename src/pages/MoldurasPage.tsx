import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ImagePlus, LockKeyhole } from "lucide-react";
import { activePhotoFrames, CAMPAIGN_LEGAL_DISCLAIMER, formatAlly, getPhotoFrame, type PhotoFrameDefinition } from "@/config/photoFrames";
import { MoldurasHeader } from "@/components/molduras/MoldurasHeader";
import { PhotoFrameEditor } from "@/components/molduras/PhotoFrameEditor";
import { useCampaignAnalytics } from "@/lib/campaignAnalytics";
import { useSeo } from "@/lib/useSeo";
import "./MoldurasPage.css";

const SITE_URL = "https://gutembergfonseca.com.br";

export default function MoldurasPage() {
  const { slug: slugFromRoute } = useParams<{ slug: string }>();
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(() => getPhotoFrame(slugFromRoute)?.slug);
  const editorRef = useRef<HTMLDivElement>(null);
  const selectedFrame = getPhotoFrame(selectedSlug);

  useCampaignAnalytics();

  useEffect(() => {
    if (slugFromRoute && getPhotoFrame(slugFromRoute)) setSelectedSlug(slugFromRoute);
  }, [slugFromRoute]);

  useEffect(() => {
    if (selectedFrame) {
      window.history.replaceState(null, "", `/molduras/${selectedFrame.slug}`);
      editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.history.replaceState(null, "", "/molduras");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFrame?.slug]);

  const seoTitle = selectedFrame
    ? `${selectedFrame.title} | Molduras de campanha`
    : "Molduras de campanha | Gutemberg Fonseca";
  const seoDescription = selectedFrame?.description
    ?? "Escolha uma moldura oficial, personalize com sua foto e compartilhe seu apoio. O processamento acontece no seu próprio dispositivo.";

  useSeo({
    title: seoTitle,
    description: seoDescription,
    canonical: selectedFrame ? `${SITE_URL}/molduras/${selectedFrame.slug}` : `${SITE_URL}/molduras`,
    image: selectedFrame ? `${SITE_URL}${selectedFrame.frameSrc}` : undefined,
    extraJsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Molduras de campanha",
      url: `${SITE_URL}/molduras`,
      numberOfItems: activePhotoFrames.length,
    },
  });

  const handleSelect = (frame: PhotoFrameDefinition) => setSelectedSlug(frame.slug);
  const handleBackToGallery = () => setSelectedSlug(undefined);

  return (
    <div className="frames-page">
      <MoldurasHeader />
      <main id="conteudo-principal" tabIndex={-1}>
        <section className="frames-catalog-hero">
          <div className="frames-shell">
            <span className="frames-eyebrow"><ImagePlus aria-hidden="true"/>Molduras oficiais</span>
            <h1>Mostre que você também <em>faz parte</em></h1>
            <p>Escolha o candidato que você quer apoiar, adicione sua foto e compartilhe o resultado nas suas redes sociais.</p>
            <span className="frames-privacy"><LockKeyhole aria-hidden="true"/>Suas fotos são processadas somente no seu aparelho.</span>
          </div>
        </section>

        <section className="frames-catalog" aria-labelledby="frames-catalog-title">
          <div className="frames-shell">
            <h2 className="sr-only" id="frames-catalog-title">Molduras disponíveis</h2>
            <div className="frames-catalog-grid">
              {activePhotoFrames.map((frame) => (
                <button
                  type="button"
                  key={frame.slug}
                  className={`frames-card ${selectedFrame?.slug === frame.slug ? "is-selected" : ""}`}
                  onClick={() => handleSelect(frame)}
                  data-campaign-event="photo_frame_select"
                  data-campaign-label={frame.title}
                >
                  <span className="frames-card-preview">
                    <img src={frame.frameSrc} alt="" width={frame.output.width} height={frame.output.height} loading="lazy" decoding="async"/>
                  </span>
                  <span className="frames-card-body">
                    <strong>{frame.title}</strong>
                    {frame.allies.length > 0 && (
                      <span className="frames-card-allies">{frame.allies.map((ally) => formatAlly(ally)).join(" · ")}</span>
                    )}
                    <span className="frames-card-cta">Usar esta moldura<ArrowRight aria-hidden="true"/></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {selectedFrame && (
          <section className="frame-tool-area" ref={editorRef} aria-labelledby="frame-tool-title">
            <div
              className="frames-shell"
              style={{ "--frame-primary": selectedFrame.colors.primary, "--frame-secondary": selectedFrame.colors.secondary, "--frame-accent": selectedFrame.colors.accent } as React.CSSProperties}
            >
              <button type="button" className="frame-tool-back" onClick={handleBackToGallery}>
                <ArrowLeft aria-hidden="true"/>Escolher outra moldura
              </button>
              <div className="frame-tool-card">
                <div className="frame-tool-heading">
                  <span id="frame-tool-title">{selectedFrame.title}</span>
                  <h2>Crie sua foto de apoio</h2>
                  {selectedFrame.allies.length > 0 && (
                    <p className="frame-tool-allies">{selectedFrame.allies.map((ally) => formatAlly(ally)).join(" · ")}</p>
                  )}
                </div>
                <PhotoFrameEditor frame={selectedFrame}/>
              </div>
              <p className="frame-tool-note"><LockKeyhole aria-hidden="true"/>A composição acontece inteiramente no navegador. Sua foto não é enviada, armazenada ou compartilhada sem sua ação.</p>
            </div>
          </section>
        )}
      </main>
      <footer className="frames-footer">
        <div className="frames-shell frames-footer-inner">
          <span><strong>Gutemberg Fonseca 2255</strong> — O Defensor do Consumidor</span>
          <span className="frames-footer-legal">{CAMPAIGN_LEGAL_DISCLAIMER.join(" · ")}</span>
        </div>
      </footer>
    </div>
  );
}
