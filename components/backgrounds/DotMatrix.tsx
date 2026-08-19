import type { BackgroundProps } from "./types";

/**
 * Variant D — a 1px dot matrix under a soft vignette.
 *
 * The quietest of the four. Reads as paper texture rather than decoration,
 * which makes it the safest bet if the content should carry everything.
 */
export default function DotMatrix({ className = "" }: BackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "radial-gradient(var(--foreground) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 95%)",
        }}
      />
      {/* Vignette — pulls the eye to the centre column. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, var(--background) 100%)",
        }}
      />
    </div>
  );
}
