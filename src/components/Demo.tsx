import { useRef, useState } from "react";
import type { Project } from "../data/projects";

export function Demo({ project }: { project: Project }) {
  const [started, setStarted] = useState(false);
  const [message, setMessage] = useState("");
  const container = useRef<HTMLDivElement>(null);
  const url = project.demo.url;

  async function fullscreen() {
    try {
      if (!container.current?.requestFullscreen) throw new Error("unsupported");
      await container.current.requestFullscreen();
    } catch {
      setMessage(
        "Tela cheia indisponível neste navegador. Use o link para abrir a demonstração em outra aba.",
      );
    }
  }

  return (
    <section id="demonstracao" className="detail-section">
      <div className="section-heading">
        <span className="eyebrow">Veja o projeto</span>
        <h2>Demonstração</h2>
      </div>
      {url && project.demo.kind === "web" ? (
        <div>
          <p className="mb-6 text-muted">
            A aplicação só será carregada ao iniciar. A versão web pode não
            funcionar em todos os dispositivos.
          </p>
          <div ref={container} className="demo-frame">
            {started ? (
              <iframe
                src={url}
                title={`Demonstração de ${project.name}`}
                allow="fullscreen; autoplay; gamepad"
                allowFullScreen
                onError={() =>
                  setMessage(
                    "Não foi possível carregar a demonstração. Consulte o código-fonte ou tente abrir em outra aba.",
                  )
                }
              />
            ) : (
              <button
                className="button button-primary"
                onClick={() => setStarted(true)}
              >
                Iniciar demonstração
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-4 mt-5">
            <button
              className="text-link"
              onClick={fullscreen}
              disabled={!started}
            >
              Tela cheia
            </button>
            <a
              className="text-link"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              Abrir em outra aba
            </a>
            {started && (
              <button className="text-link" onClick={() => setStarted(false)}>
                Encerrar demonstração
              </button>
            )}
          </div>
          <p className="mt-4 text-muted">
            Se a execução não iniciar, abra em outra aba ou consulte o{" "}
            {project.source ? (
              <a className="text-link" href={project.source}>
                código-fonte
              </a>
            ) : (
              "material do projeto"
            )}
            .
          </p>
          <p role="status" className="text-muted mt-3">
            {message}
          </p>
        </div>
      ) : (
        <div className="demo-placeholder">
          <span className="demo-symbol" aria-hidden="true">
            {project.demo.kind === "web" ? "[ >_ ]" : "[ + ]"}
          </span>
          <h3>
            {project.demo.kind === "web"
              ? "Versão web em uma próxima etapa"
              : "Registros reais, em breve"}
          </h3>
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
