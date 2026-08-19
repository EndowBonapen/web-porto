"use client";

import { useEffect, useRef } from "react";

/**
 * A 2px reading-progress bar pinned to the top of the viewport.
 *
 * Width is driven by a transform rather than an actual width change, so the
 * browser can composite it without a layout pass on every scroll frame.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    function update() {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      el!.style.transform = `scaleX(${progress})`;
    }

    function schedule() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-0.5">
      <div
        ref={ref}
        className="h-full origin-left bg-foreground/50"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
