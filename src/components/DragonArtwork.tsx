import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

const width = 400;
const height = 310;
const drawDuration = 1800;
const equations = [
  { text: "Tₙ₊₁ = Tₙ · L · inv(rev(Tₙ))", label: "Curva do Dragão" },
  { text: "(x,y) = e^(−0.025t)(sin 2t, sin(3t + π/4))", label: "harmonógrafo" },
];

function dragonPoints(): Point[] {
  let turns: number[] = [];
  for (let fold = 0; fold < 9; fold++) {
    turns = [...turns, 1, ...turns.slice().reverse().map((turn) => -turn)];
  }

  const points = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
  let dx = 1;
  let dy = 0;
  for (const turn of turns) {
    [dx, dy] = [turn * dy, -turn * dx];
    const last = points[points.length - 1];
    points.push({ x: last.x + dx, y: last.y + dy });
  }

  const xs = points.map(({ x }) => x);
  const ys = points.map(({ y }) => y);
  const left = Math.min(...xs);
  const right = Math.max(...xs);
  const top = Math.min(...ys);
  const bottom = Math.max(...ys);
  const scale = Math.min((width - 48) / (right - left), (height - 48) / (bottom - top));

  return points.map(({ x, y }) => ({
    x: width / 2 + (x - (left + right) / 2) * scale,
    y: height / 2 + (y - (top + bottom) / 2) * scale,
  }));
}

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

export function DragonArtwork() {
  const figure = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [characters, setCharacters] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const element = figure.current;
    const context = canvas.current?.getContext("2d");
    if (!element || !context) return;

    const drawing = context;
    const dragon = dragonPoints();
    const harmonograph = harmonographPoints();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    drawing.setTransform(2, 0, 0, 2, 0, 0);
    drawing.lineJoin = "round";

    function draw(progress: number) {
      drawing.clearRect(0, 0, width, height);
      drawing.strokeStyle = "#5d976953";
      drawing.lineWidth = 0.8;
      trace(drawing, harmonograph, progress);
      drawing.strokeStyle = "#a5eeaf";
      drawing.lineWidth = 1.3;
      trace(drawing, dragon, progress);
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
      className="hero-aside dragon-artwork"
      aria-label="Curva do Dragão e harmonógrafo"
    >
      <div className="dragon-plot" aria-hidden="true">
        <canvas ref={canvas} width={width * 2} height={height * 2} />
        <span
          className="dragon-initials"
          data-visible={finished || characters >= 9}
        >
          lf<span>.</span>
        </span>
      </div>
      <figcaption className="dragon-caption" aria-hidden="true">
        {equations.map(({ text, label }) => (
          <div className="dragon-caption-line" key={label}>
            <span className="dragon-caption-size">{text}</span>
            {finished ? (
              <span className="dragon-caption-label">{label}</span>
            ) : (
              <span className="terminal-heading-typed" data-typing={characters < text.length}>
                {text.slice(0, characters)}
              </span>
            )}
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
