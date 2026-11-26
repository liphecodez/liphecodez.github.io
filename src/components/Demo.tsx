import type { Ref } from "react";
import type { Project } from "../data/projects";
import { TerminalHeading } from "./TerminalHeading";
import { InteractiveDemo, type DemoControls } from "./InteractiveDemo";

export function Demo({
  project,
  controlsRef,
}: {
  project: Project;
  controlsRef?: Ref<DemoControls>;
}) {
  return (
    <section id="demonstracao" className="detail-section">
      <div className="section-heading">
        <span className="eyebrow">Veja o projeto</span>
        <TerminalHeading text="Demonstração" />
      </div>
      {project.demo.kind === "web" ? (
        <InteractiveDemo
          name={project.name}
          demo={project.demo}
          source={project.source}
          controlsRef={controlsRef}
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
