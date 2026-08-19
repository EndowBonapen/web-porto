import { stats } from "@/content/site";

/**
 * A hairline-divided grid of numbers — 2×2 on phones, one row from tablet up.
 * Four labels side by side at 375px would crush "Pipelines built" into two
 * words per line at an unreadable size, so it wraps to a second row instead.
 *
 * Built as a single bordered container whose grid gaps show the backing
 * colour through, rather than separate boxes — one rule between cells
 * instead of stacked borders per card. It matches how the rest of the page
 * separates things, and sidesteps the grey-card-grid look that reads as
 * template on every other portfolio.
 */
export default function Stats() {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-foreground/10 bg-foreground/10 sm:grid-cols-4">
      {stats.map(({ value, label }) => (
        <li
          key={label}
          className="bg-background px-3 py-6 text-center sm:px-4 sm:py-7"
        >
          <p className="display text-3xl sm:text-4xl">{value}</p>
          <p className="mt-1.5 text-xs leading-snug text-foreground/60">
            {label}
          </p>
        </li>
      ))}
    </ul>
  );
}
