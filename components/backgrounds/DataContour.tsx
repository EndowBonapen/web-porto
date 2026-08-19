import type { BackgroundProps } from "./types";

const W = 1200;
const H = 800;
const ROWS = 16;

/**
 * Deterministic hash-noise. Math.random() would give a different silhouette on
 * the server than the client and blow up hydration — this returns the same
 * value for the same seed, everywhere, forever.
 */
function noise(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * One ridge = the sum of three gaussians. Real density curves, evaluated at
 * 120 points and stroked as a polyline. Mixing three components per row is
 * what keeps any two rows from sharing a silhouette.
 */
function ridge(row: number): string {
  const baseline = ((row + 1) / (ROWS + 1)) * H;

  const peaks = [0, 1, 2].map((k) => {
    const s = row * 3 + k;
    return {
      mu: 0.12 + noise(s) * 0.76,
      sigma: 0.045 + noise(s + 97) * 0.11,
      amp: 18 + noise(s + 193) * 58,
    };
  });

  const STEPS = 120;
  const points: string[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const u = i / STEPS;
    let y = baseline;
    for (const p of peaks) {
      const t = (u - p.mu) / p.sigma;
      y -= p.amp * Math.exp(-0.5 * t * t);
    }
    points.push(`${(u * W).toFixed(1)} ${y.toFixed(1)}`);
  }

  return `M ${points.join(" L ")}`;
}

/**
 * Variant C — a ridgeline plot (joyplot) used as wallpaper.
 *
 * This is the one that is actually about the person: it is a real chart form,
 * drawn from real distributions, at a size where it reads as texture rather
 * than data. No template ships this, which is exactly the point.
 *
 * Each ridge is filled with the page background so it occludes the rows behind
 * it — that overlap is what makes a ridgeline read as depth instead of noise.
 */
export default function DataContour({ className = "" }: BackgroundProps) {
  const rows = Array.from({ length: ROWS }, (_, i) => i);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 70% at 50% 45%, black 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 70% at 50% 45%, black 25%, transparent 100%)",
        }}
      >
        {/* Back to front, so lower ridges overlap the ones above them. */}
        {rows.map((row) => (
          <path
            key={row}
            d={ridge(row)}
            fill="var(--background)"
            stroke="var(--foreground)"
            strokeWidth={1}
            // Ridges fade toward the top, so the stack recedes into the page.
            strokeOpacity={0.05 + (row / ROWS) * 0.13}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
