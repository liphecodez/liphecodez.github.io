import { useEffect, useRef, useState } from "react";

export function TerminalHeading({
  as: Heading = "h2",
  text,
  intro,
  id,
  className = "",
}: {
  as?: "h1" | "h2";
  text: string;
  intro?: readonly string[];
  id?: string;
  className?: string;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const element = heading.current;
    if (!element) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lines = [...(intro ?? []), text];
    let timer: number;

    function erase(index: number, count: number) {
      setTyped(lines[index].slice(0, count));
      if (count > 0) {
        timer = window.setTimeout(() => erase(index, count - 1), 30);
      } else {
        timer = window.setTimeout(() => type(index + 1, 1), 150);
      }
    }

    function type(index: number, count: number) {
      const line = lines[index];
      setTyped(line.slice(0, count));
      if (count < line.length) {
        timer = window.setTimeout(() => type(index, count + 1), 58);
      } else if (index < lines.length - 1) {
        timer = window.setTimeout(() => erase(index, count - 1), 750);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (motion.matches) {
        setTyped(text);
      } else {
        type(0, 1);
      }
    });
    observer.observe(element);

    function finishWithReducedMotion() {
      if (!motion.matches) return;
      observer.disconnect();
      window.clearTimeout(timer);
      setTyped(text);
    }

    motion.addEventListener("change", finishWithReducedMotion);
    return () => {
      motion.removeEventListener("change", finishWithReducedMotion);
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [intro, text]);

  return (
    <Heading
      ref={heading}
      id={id}
      aria-label={text}
      className={`terminal-heading ${className}`}
    >
      <span className="terminal-heading-final" aria-hidden="true">
        {text}
      </span>
      <span
        className="terminal-heading-typed"
        data-typing={typed !== text}
        aria-hidden="true"
      >
        {typed}
      </span>
    </Heading>
  );
}
