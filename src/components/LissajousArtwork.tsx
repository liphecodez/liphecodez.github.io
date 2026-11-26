import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

const width = 400;
const height = 310;
const drawDuration = 1800;
const equations = [
  "x(t) = sin(3t + π/2)",
  "y(t) = sin(4t)",
];
const totalCharacters = equations.join("").length;

function lissajousPoints(): Point[] {
  const steps = 720;
  return Array.from({ length: steps + 1 }, (_, index) => {
    const t = (2 * Math.PI * index) / steps;
    return {
      x: width / 2 + 155 * Math.sin(3 * t + Math.PI / 2),
      y: height / 2 - 110 * Math.sin(4 * t),
    };
  });
}

function trace(context: CanvasRenderingContext2D, points: Point[], progress: number) {
  const end = Math.floor((points.length - 1) * progress);
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (let index = 1; index <= end; index++) {
    context.lineTo(points[index].x, points[index].y);
  }
  context.stroke();
}

export function LissajousArtwork() {
  const figure = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [characters, setCharacters] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const element = figure.current;
    const context = canvas.current?.getContext("2d");
    if (!element || !context) return;

    const drawing = context;
    const points = lissajousPoints();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    drawing.setTransform(2, 0, 0, 2, 0, 0);
    drawing.lineJoin = "round";

    function draw(progress: number) {
      drawing.clearRect(0, 0, width, height);
      drawing.strokeStyle = "#a5eeafbf";
      drawing.lineWidth = 1.65;
      trace(drawing, points, progress);
    }

    let frame: number;
    let startedAt: number;
    let previousCount = 0;
    let renderedProgress = 0;

    function finish() {
      window.cancelAnimationFrame(frame);
      draw(1);
      setFinished(true);
    }

    function animate(now: number) {
      startedAt ??= now;
      const elapsed = now - startedAt;
      if (elapsed >= 2650) {
        finish();
        return;
      }
      const progress = Math.min(1, elapsed / drawDuration);
      if (progress !== renderedProgress) {
        draw(progress);
        renderedProgress = progress;
      }
      const count = Math.min(totalCharacters, Math.floor(elapsed / 26));
      if (count !== previousCount) {
        previousCount = count;
        setCharacters(count);
      }
      frame = window.requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (motion.matches) finish();
      else frame = window.requestAnimationFrame(animate);
    });
    observer.observe(element);

    function finishWithReducedMotion() {
      if (!motion.matches) return;
      observer.disconnect();
      finish();
    }

    motion.addEventListener("change", finishWithReducedMotion);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", finishWithReducedMotion);
    };
  }, []);

  return (
    <figure
      ref={figure}
      className="hero-aside hero-curve-artwork"
      aria-label="Curva de Lissajous"
    >
      <div className="hero-curve-plot" aria-hidden="true">
        <canvas ref={canvas} width={width * 2} height={height * 2} />
        <span
          className="hero-curve-initials"
          data-visible={finished || characters >= 9}
        >
          lf<span>.</span>
        </span>
      </div>
      <figcaption className="hero-curve-caption" aria-hidden="true">
        <div className="hero-curve-equations">
          {equations.map((equation, index) => {
            const offset = equations
              .slice(0, index)
              .reduce((sum, line) => sum + line.length, 0);
            const length = Math.max(0, characters - offset);
            return (
              <div key={equation}>
                <span className="hero-curve-equation-size">{equation}</span>
                {!finished && (
                  <span
                    className="terminal-heading-typed"
                    data-typing={characters >= offset && length < equation.length}
                  >
                    {equation.slice(0, length)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {finished && <span className="hero-curve-caption-label">Curva de Lissajous</span>}
      </figcaption>
    </figure>
  );
}
