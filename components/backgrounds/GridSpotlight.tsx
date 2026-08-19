"use client";

import { useEffect, useRef } from "react";
import type { BackgroundProps } from "./types";

/**
 * Variant A — a 1px technical grid, lit by a soft radial glow that trails
 * the cursor. The grid alone reads as graph paper; the glow is what stops it
 * feeling like a wireframe.
 *
 * Cursor position is written straight to CSS custom properties inside a rAF,
 * so tracking never triggers a React re-render.
 */
export default function GridSpotlight({ className = "" }: BackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Touch devices have no cursor to follow — leave the glow parked centre-top.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    function onMove(e: MouseEvent) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el!.getBoundingClientRect();
        el!.style.setProperty("--x", `${e.clientX - rect.left}px`);
        el!.style.setProperty("--y", `${e.clientY - rect.top}px`);
      });
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ ["--x" as string]: "50%", ["--y" as string]: "30%" }}
    >
      {/* Grid. Masked to fade out at the edges so it never hits a hard border. */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px),
                            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
        }}
      />
      {/* Spotlight. */}
      <div
        className="absolute inset-0 opacity-[0.06] transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(500px circle at var(--x) var(--y), var(--foreground), transparent 70%)",
        }}
      />
    </div>
  );
}
