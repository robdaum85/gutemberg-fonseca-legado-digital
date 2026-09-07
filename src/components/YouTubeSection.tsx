import { ArrowUpRight, Youtube } from "lucide-react";
import "./YouTubeSection.css";

const videos = [
  { id: "UA4S9apjiPE", title: "A má fé dos combustíveis!", url: "https://www.youtube.com/shorts/UA4S9apjiPE" },
  { id: "h-C_WSXUR-8", title: "Eu e Romário nos conhecemos há muitos anos.", url: "https://www.youtube.com/watch?v=h-C_WSXUR-8" },
  { id: "VKqt929MaCg", title: "Quem é Gutemberg Fonseca?!", url: "https://www.youtube.com/shorts/VKqt929MaCg" },
] as const;

export default function YouTubeSection() {
  return (
    <section className="youtube-section" id="youtube" aria-labelledby="youtube-title">
      <div className="youtube-section__inner">
        <div className="youtube-section__heading">
          <Youtube aria-hidden="true" />
          <p>No canal do Gutemberg</p>
          <h2 id="youtube-title">Fez e Faz</h2>
          <p>Assista aos vídeos e acompanhe de perto as histórias, os encontros e a defesa dos seus direitos. Acesse o canal e inscreva-se para conhecer mais.</p>
        </div>
        <div className="youtube-section__videos">
          {videos.map((video) => (
            <article className="youtube-section__video" key={video.id}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <div>
                <h3>{video.title}</h3>
                <a href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`Assistir no YouTube: ${video.title} (abre em nova aba)`}>
                  Assistir no YouTube <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <a className="youtube-section__channel" href="https://www.youtube.com/@gutembergpfonseca" target="_blank" rel="noopener noreferrer">
          <Youtube aria-hidden="true" /> Acessar o canal e conhecer mais <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
