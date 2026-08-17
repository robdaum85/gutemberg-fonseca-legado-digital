import { ArrowRight, ImagePlus, LockKeyhole } from "lucide-react";
import { activePhotoFrames } from "@/config/photoFrames";
import "./PhotoFramesSection.css";

export function PhotoFramesSection() {
  const featured = activePhotoFrames[0];
  if (!featured) return null;

  return (
    <section className="photo-frames-section" id="molduras" aria-labelledby="photo-frames-title">
      <div className="shell photo-frames-section-grid">
        <div className="photo-frames-section-copy">
          <span className="section-kicker">Mostre seu apoio</span>
          <h2 id="photo-frames-title">Faça sua foto com a <em>moldura oficial</em></h2>
          <p>Escolha uma foto, ajuste o enquadramento e baixe o resultado pronto para publicar nas suas redes sociais.</p>
          <span className="photo-frames-privacy"><LockKeyhole aria-hidden="true"/> Sua foto não sai do seu aparelho.</span>
          <a className="btn btn--yellow" href={`/molduras/${featured.slug}`} data-campaign-event="photo_frame_open" data-campaign-label="Criar foto com moldura">
            <ImagePlus aria-hidden="true"/>Criar minha foto<ArrowRight aria-hidden="true"/>
          </a>
        </div>
        <a className="photo-frames-featured" href={`/molduras/${featured.slug}`} aria-label={`Criar foto com a moldura de ${featured.candidateName}`} data-campaign-event="photo_frame_open" data-campaign-label="Prévia da moldura">
          <span className="photo-frames-featured-photo" aria-hidden="true"/>
          <img src={featured.frameSrc} alt={`Moldura ${featured.title} de ${featured.candidateName} ${featured.candidateNumber}`} width={featured.output.width} height={featured.output.height} loading="lazy" decoding="async"/>
          <span className="photo-frames-featured-action">Usar esta moldura<ArrowRight aria-hidden="true"/></span>
        </a>
      </div>
    </section>
  );
}
