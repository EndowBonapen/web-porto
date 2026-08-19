"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Stateless by design.
 *
 * The inline script in layout.tsx already put the right value on
 * <html data-theme>, and CSS in globals.css decides which icon that value
 * shows. So this component holds no state, runs no effect, and can never
 * render an icon that disagrees with the page — which is exactly the bug
 * a useState/useEffect version invites during hydration.
 */
export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";

    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or storage disabled — the swap still holds for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="grid h-8 w-8 place-items-center rounded-full border border-foreground/15 text-foreground/60 transition-colors hover:border-foreground/40 hover:text-foreground"
    >
      <Sun size={14} className="theme-icon-sun" />
      <Moon size={14} className="theme-icon-moon" />
    </button>
  );
}
