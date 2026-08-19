"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { nav } from "@/content/site";

export default function Nav() {
  const [active, setActive] = useState("");
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      // The rule under the nav only appears once you've left the hero, so the
      // first screen stays uninterrupted.
      setLifted(y > 24);
      // Back at the top: nothing is being read, so highlight nothing.
      if (y < window.innerHeight * 0.4) setActive("");
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Collapse the root to a thin band across the middle of the viewport.
    // Whichever section crosses that band is the one actually being read —
    // far steadier than comparing scroll offsets by hand.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        lifted
          ? "border-foreground/10 bg-background/70"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-3xl items-center px-6 py-4">
        {/* An invisible spacer the same width as ThemeToggle, so the link
            list sits in the middle of the bar rather than the middle of the
            leftover space next to the toggle. */}
        <div className="w-8" aria-hidden />

        <ul className="flex flex-1 items-center justify-center gap-3 sm:gap-6">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`label transition-colors ${
                  active === item.id
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  );
}
