import { useRef, type PointerEvent } from "react";

export function Planet() {
  const ref = useRef<HTMLButtonElement>(null);

  function tilt(event: PointerEvent<HTMLButtonElement>) {
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    node.style.setProperty("--tilt-x", `${(-y * 16).toFixed(2)}deg`);
    node.style.setProperty("--tilt-y", `${(x * 20).toFixed(2)}deg`);
  }

  function reset() {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--tilt-x", "10deg");
    node.style.setProperty("--tilt-y", "-16deg");
  }

  return (
    <div className="planet-well">
      <button
      ref={ref}
      type="button"
      className="planet-stage"
      onPointerMove={tilt}
      onPointerLeave={reset}
      onClick={() => document.getElementById("practice")?.scrollIntoView()}
      aria-label="The CDXI planet. Continue to the practice."
    >
      <span className="planet-glow" aria-hidden="true" />
      <span className="planet-ring" aria-hidden="true" />
      <span className="planet-body" aria-hidden="true">
        <span className="planet-surface" />
        <span className="planet-shade" />
      </span>
      </button>
    </div>
  );
}
