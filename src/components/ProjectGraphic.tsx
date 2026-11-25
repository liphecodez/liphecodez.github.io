type Props = { variant: string; compact?: boolean };

// Ilustrações conceituais do portfólio, sem representar interfaces ou fases reais.
export function ProjectGraphic({ variant, compact = false }: Props) {
  return (
    <div
      className={`project-graphic graphic-${variant} ${compact ? "compact" : ""}`}
      aria-hidden="true"
    >
      <div className="graphic-top">
        <span>
          {variant === "nci"
            ? "SISTEMA / INTEGRAÇÃO"
            : variant === "lab-rats"
              ? "LÓGICA / INTERAÇÃO"
              : "DADOS / ORDENAÇÃO"}
        </span>
        <span>LB</span>
      </div>
      {variant === "nci" ? (
        <div className="system-map">
          <div className="map-node">Participantes</div>
          <div className="map-line" />
          <div className="map-pair">
            <div className="map-node">Atividades</div>
            <span>+</span>
            <div className="map-node">Frequência</div>
          </div>
          <div className="map-line" />
          <div className="map-node map-accent">Indicadores FMR</div>
        </div>
      ) : variant === "algorithm-visualizer" ? (
        <div className="sort-bars">
          {[35, 63, 44, 82, 55, 95, 70, 39, 76, 58, 88, 100].map(
            (height, i) => (
              <span key={i} style={{ height: `${height}%` }} />
            ),
          )}
        </div>
      ) : (
        <div className="puzzle-grid">
          {Array.from({ length: 35 }, (_, i) => (
            <span
              key={i}
              className={
                i === 16
                  ? "grid-player"
                  : [9, 10, 17, 24, 26].includes(i)
                    ? "grid-wall"
                    : i === 12 || i === 29
                      ? "grid-portal"
                      : ""
              }
            />
          ))}
        </div>
      )}
      <span className="graphic-caption">
        Diagrama conceitual · não é uma captura do projeto
      </span>
    </div>
  );
}
