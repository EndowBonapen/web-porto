import type { BackgroundProps } from "./types";

// Monochrome film grain. feTurbulence gives coloured noise by default, so it
// is desaturated in-filter — otherwise faint RGB speckle creeps into a design
// that is supposed to have no colour at all.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Variant B — two large blurred orbs drifting slowly, with film grain on top.
 *
 * This is the closest relative to Hazlan's reference, minus the clashing
 * orange-and-blue. The grain is what does the real work: a pure CSS blur reads
 * as obviously digital, and breaking it up with noise is what stops the whole
 * thing looking machine-generated.
 */
export default function GrainOrb({ className = "" }: BackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -left-[10%] top-[5%] h-[420px] w-[420px] animate-[drift-a_28s_ease-in-out_infinite] rounded-full bg-foreground opacity-[0.07] blur-[110px]" />
      <div className="absolute -right-[5%] bottom-[10%] h-[360px] w-[360px] animate-[drift-b_34s_ease-in-out_infinite] rounded-full bg-foreground opacity-[0.05] blur-[110px]" />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
    </div>
  );
}
