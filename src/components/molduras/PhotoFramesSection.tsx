import { ArrowRight, ImagePlus, LockKeyhole } from "lucide-react";
import { featuredPhotoFrames } from "@/config/photoFrames";
import "./PhotoFramesSection.css";

export function PhotoFramesSection() {
  const previewFrames = featuredPhotoFrames;
  if (previewFrames.length === 0) return null;

  return (
    <section className="photo-frames-section" id="molduras" aria-labelledby="photo-frames-title">
      <div className="shell photo-frames-section-grid">
        <div className="photo-frames-section-copy">
          <span className="section-kicker">Mostre seu apoio</span>
          <h2 id="photo-frames-title">Faça sua foto com a <em>moldura oficial</em></h2>
          <p>Escolha entre {featuredPhotoFrames.length} molduras — Gutemberg e os candidatos que ele apoia —, adicione sua foto e baixe o resultado pronto para publicar nas suas redes sociais.</p>
          <span className="photo-frames-privacy"><LockKeyhole aria-hidden="true"/> Sua foto não sai do seu aparelho.</span>
          <a className="btn btn--yellow" href="/molduras" data-campaign-event="photo_frame_open" data-campaign-label="Ver todas as molduras">
            <ImagePlus aria-hidden="true"/>Escolher minha moldura<ArrowRight aria-hidden="true"/>
          </a>
        </div>
        <a className="photo-frames-featured" href="/molduras" aria-label="Ver todas as molduras disponíveis" data-campaign-event="photo_frame_open" data-campaign-label="Prévia da galeria">
          <span className="photo-frames-featured-grid">
            {previewFrames.map((frame) => (
              <img key={frame.slug} src={frame.frameSrc} alt="" width={frame.output.width} height={frame.output.height} loading="lazy" decoding="async"/>
            ))}
          </span>
          <span className="photo-frames-featured-action">Ver todas<ArrowRight aria-hidden="true"/></span>
        </a>
      </div>
    </section>
  );
}
