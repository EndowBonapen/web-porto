"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { projects } from "@/content/site";
import Section from "./Section";
import TechChip from "./TechChip";
import { TECH_ICONS } from "./tech-icons";

/**
 * One project at a time, cycled with prev/next — not a grid.
 *
 * With three projects today a grid would work, but this is meant to keep
 * being the right shape as more get added later, rather than needing a
 * re-layout (3 columns, then 4, then an awkward 5th) every time one is.
 */
export default function Projects() {
  const [index, setIndex] = useState(0);
  const project = projects[index];
  const Icon = TECH_ICONS[project.icon];

  function prev() {
    setIndex((i) => (i - 1 + projects.length) % projects.length);
  }

  function next() {
    setIndex((i) => (i + 1) % projects.length);
  }

  return (
    <Section id="projects" label="Projects">
      <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="label text-foreground/40">
            {index + 1} / {projects.length}
          </p>

          {projects.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous project"
                className="grid h-8 w-8 place-items-center rounded-full border border-foreground/15 text-foreground/60 transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                className="grid h-8 w-8 place-items-center rounded-full border border-foreground/15 text-foreground/60 transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {Icon && (
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-foreground/10 bg-foreground/[0.03] text-foreground">
              <Icon size={26} />
            </span>
          )}
          <h3 className="display text-xl leading-tight sm:text-2xl">
            {project.title}
          </h3>
        </div>

        <p className="mt-4 max-w-prose text-sm leading-relaxed text-foreground/65 sm:text-base">
          {project.blurb}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((name) => (
            <TechChip key={name} name={name} />
          ))}
        </div>
      </div>
    </Section>
  );
}
