import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import type { Project } from "../data/projects";

type WebDemo = Extract<Project["demo"], { kind: "web" }>;
type Status = "idle" | "loading" | "ready" | "error";
export type DemoControls = { openFullscreen: () => void };

function embeddedStatus(document: Document, engine: WebDemo["engine"]) {
  if (!document.querySelector("canvas")) return "error";

  // Both published shells expose their startup state in the document.
  const status = document.getElementById("status");
  if (engine === "godot") {
    const notice = document.getElementById("status-notice");
    if (notice?.textContent?.trim()) return "error";
    return status ? "loading" : "ready";
  }

  if (status?.hidden) return "ready";
  return status?.textContent?.includes("Carregando") ? "loading" : "error";
}

export function InteractiveDemo({
  name,
  demo,
  source,
  controlsRef,
}: {
  name: string;
  demo: WebDemo;
  source?: string;
  controlsRef?: Ref<DemoControls>;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [fullscreenMessage, setFullscreenMessage] = useState("");
  const container = useRef<HTMLDivElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const startButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const active = status === "loading" || status === "ready";

  useEffect(() => {
    const frame = container.current;
    const viewport = iframe.current;
    if (demo.engine !== "raylib" || !frame || !viewport) return;

    const observer = new ResizeObserver(([{ contentRect }]) => {
      // Raylib needs the canvas to keep its logical size for pointer hit testing.
      const scale = Math.min(
        contentRect.width / viewport.offsetWidth,
        contentRect.height / viewport.offsetHeight,
      );
      frame.style.setProperty("--demo-scale", String(scale));
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [active, demo.engine]);

  useEffect(() => {
    if (status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("error"), 75_000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  useEffect(() => {
    if (status !== "loading" || !documentLoaded) return;

    function checkStatus() {
      const document = iframe.current?.contentDocument;
      // A different origin owns its loading and runtime error UI.
      const result = document
        ? embeddedStatus(document, demo.engine)
        : "ready";
      if (result !== "loading") setStatus(result);
    }

    checkStatus();
    const interval = window.setInterval(checkStatus, 200);
    return () => window.clearInterval(interval);
  }, [demo.engine, documentLoaded, status]);

  useEffect(() => {
    if (status === "idle" && restoreFocus.current) {
      startButton.current?.focus({ preventScroll: true });
      restoreFocus.current = false;
    }
  }, [status]);

  function start() {
    setDocumentLoaded(false);
    setFullscreenMessage("");
    setStatus("loading");
  }

  function close() {
    if (document.fullscreenElement === container.current) {
      void document.exitFullscreen().catch(() => {});
    }
    restoreFocus.current = true;
    setFullscreenMessage("");
    setStatus("idle");
  }

  async function fullscreen() {
    try {
      if (!container.current?.requestFullscreen) throw new Error();
      await container.current.requestFullscreen();
      iframe.current?.focus({ preventScroll: true });
    } catch {
      setFullscreenMessage(
        "Tela cheia indisponível. Use a demonstração nesta página.",
      );
    }
  }

  useImperativeHandle(controlsRef, () => ({
    openFullscreen() {
      if (!active) start();
      void fullscreen();
    },
  }));

  return (
    <div className="interactive-demo">
      <ul className="feature-list mb-6">
        {demo.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>
      <div ref={container} className="demo-frame" data-engine={demo.engine}>
        {active ? (
          <iframe
            ref={iframe}
            src={demo.url}
            title={`Demonstração de ${name}`}
            allow="fullscreen; autoplay 'none'"
            allowFullScreen
            onLoad={() => setDocumentLoaded(true)}
            onError={() => setStatus("error")}
          />
        ) : (
          <button
            ref={startButton}
            type="button"
            className="button button-primary"
            onClick={start}
          >
            {status === "error" ? "Tentar novamente" : "Iniciar demonstração"}
          </button>
        )}
        <div className="demo-status" role="status">
          {status === "loading" && "Carregando demonstração…"}
          {status === "error" &&
            "A demonstração não carregou. Tente novamente ou abra em outra aba."}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-5">
        {active && (
          <>
            {status === "ready" && (
              <button type="button" className="text-link" onClick={fullscreen}>
                Tela cheia
              </button>
            )}
            <button type="button" className="text-link" onClick={close}>
              Encerrar demonstração
            </button>
          </>
        )}
        <a className="text-link" href={demo.url} target="_blank" rel="noreferrer">
          Abrir em outra aba
        </a>
        {source && (
          <a className="text-link" href={source} target="_blank" rel="noreferrer">
            Código-fonte
          </a>
        )}
      </div>
      {fullscreenMessage && (
        <p role="status" className="text-muted mt-3">{fullscreenMessage}</p>
      )}
    </div>
  );
}
