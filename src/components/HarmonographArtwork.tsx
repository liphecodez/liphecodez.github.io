import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

const width = 400;
const height = 310;
const drawDuration = 1800;
const equation = "(x,y) = e^(−0.025t)(sin 2t, sin(3t + π/4))";

function harmonographPoints(): Point[] {
  return Array.from({ length: 1201 }, (_, index) => {
    const t = index / 30;
    const amplitude = Math.exp(-0.025 * t);
    return {
      x: width / 2 + 180 * amplitude * Math.sin(2 * t),
      y: height / 2 - 134 * amplitude * Math.sin(3 * t + Math.PI / 4),
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

export function HarmonographArtwork() {
  const figure = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [characters, setCharacters] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const element = figure.current;
    const context = canvas.current?.getContext("2d");
    if (!element || !context) return;

    const drawing = context;
    const harmonograph = harmonographPoints();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    drawing.setTransform(2, 0, 0, 2, 0, 0);
    drawing.lineJoin = "round";

    function draw(progress: number) {
      drawing.clearRect(0, 0, width, height);
      drawing.strokeStyle = "#a5eeafa6";
      drawing.lineWidth = 1.15;
      trace(drawing, harmonograph, progress);
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
      const count = Math.floor(elapsed / 36);
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
      className="hero-aside harmonograph-artwork"
      aria-label="Harmonógrafo"
    >
      <div className="harmonograph-plot" aria-hidden="true">
        <canvas ref={canvas} width={width * 2} height={height * 2} />
        <span
          className="harmonograph-initials"
          data-visible={finished || characters >= 9}
        >
          lf<span>.</span>
        </span>
      </div>
      <figcaption className="harmonograph-caption" aria-hidden="true">
        <span className="harmonograph-caption-size">{equation}</span>
        {finished ? (
          <span className="harmonograph-caption-label">harmonógrafo</span>
        ) : (
          <span
            className="terminal-heading-typed"
            data-typing={characters < equation.length}
          >
            {equation.slice(0, characters)}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
