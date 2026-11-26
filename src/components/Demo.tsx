import type { Project } from "../data/projects";
import { InteractiveDemo } from "./InteractiveDemo";

export function Demo({ project }: { project: Project }) {
  return (
    <section id="demonstracao" className="detail-section">
      <div className="section-heading">
        <span className="eyebrow">Veja o projeto</span>
        <h2>Demonstração</h2>
      </div>
      {project.demo.kind === "web" ? (
        <InteractiveDemo
          name={project.name}
          demo={project.demo}
          source={project.source}
        />
      ) : (
        <div className="demo-placeholder">
          <span className="demo-symbol" aria-hidden="true">
            [ + ]
          </span>
          <h3>Registros reais, em breve</h3>
          <p>{project.demo.note}</p>
          {project.source && (
            <a
              className="text-link"
              href={project.source}
              target="_blank"
              rel="noreferrer"
            >
              Consultar o projeto no GitHub
            </a>
          )}
        </div>
      )}
      {project.media.length > 0 && (
        <div className="media-gallery">
          {project.media.map((media) => (
            <figure key={media.src}>
              {media.kind === "image" ? (
                <img src={media.src} alt={media.description} loading="lazy" />
              ) : (
                <video
                  controls
                  preload="none"
                  src={media.src}
                  aria-label={media.description}
                />
              )}
              <figcaption>{media.description}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
