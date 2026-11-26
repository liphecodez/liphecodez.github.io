import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type State = Point & { z: number };

const width = 400;
const height = 310;
const drawDuration = 1800;
const equations = [
  "dx/dt = 10(y − x)",
  "dy/dt = x(28 − z) − y",
  "dz/dt = xy − (8/3)z",
];
const totalCharacters = equations.join("").length;

function derivative({ x, y, z }: State): State {
  return { x: 10 * (y - x), y: x * (28 - z) - y, z: x * y - (8 / 3) * z };
}

function advance(point: State, slope: State, step: number): State {
  return {
    x: point.x + step * slope.x,
    y: point.y + step * slope.y,
    z: point.z + step * slope.z,
  };
}

function lorenzPoints(): Point[] {
  const step = 0.008;
  const points: Point[] = [];
  let point: State = { x: 1, y: 1, z: 1 };
  for (let index = 0; index < 5000; index++) {
    const k1 = derivative(point);
    const k2 = derivative(advance(point, k1, step / 2));
    const k3 = derivative(advance(point, k2, step / 2));
    const k4 = derivative(advance(point, k3, step));
    point = advance(
      point,
      {
        x: k1.x + 2 * k2.x + 2 * k3.x + k4.x,
        y: k1.y + 2 * k2.y + 2 * k3.y + k4.y,
        z: k1.z + 2 * k2.z + 2 * k3.z + k4.z,
      },
      step / 6,
    );

    if (index >= 400) {
      points.push({ x: width / 2 + 8 * point.x, y: height - 8 - 5.6 * point.z });
    }
  }
  return points;
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

export function LorenzArtwork() {
  const figure = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [characters, setCharacters] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const element = figure.current;
    const context = canvas.current?.getContext("2d");
    if (!element || !context) return;

    const drawing = context;
    const points = lorenzPoints();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    drawing.setTransform(2, 0, 0, 2, 0, 0);
    drawing.lineJoin = "round";

    function draw(progress: number) {
      drawing.clearRect(0, 0, width, height);
      drawing.strokeStyle = "#a5eeafa6";
      drawing.lineWidth = 1.15;
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
      className="hero-aside lorenz-artwork"
      aria-label="Atrator de Lorenz"
    >
      <div className="lorenz-plot" aria-hidden="true">
        <canvas ref={canvas} width={width * 2} height={height * 2} />
        <span
          className="lorenz-initials"
          data-visible={finished || characters >= 9}
        >
          lf<span>.</span>
        </span>
      </div>
      <figcaption className="lorenz-caption" aria-hidden="true">
        <div className="lorenz-equations">
          {equations.map((equation, index) => {
            const offset = equations
              .slice(0, index)
              .reduce((sum, line) => sum + line.length, 0);
            const length = Math.max(0, characters - offset);
            return (
              <div key={equation}>
                <span className="lorenz-equation-size">{equation}</span>
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
        {finished && <span className="lorenz-caption-label">Atrator de Lorenz</span>}
      </figcaption>
    </figure>
  );
}
