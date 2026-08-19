import { ArrowUpRight } from "lucide-react";
import { featured, projects, type Project } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";

/** Prefer a live demo over a repo when both exist. */
function linkFor(project: Project) {
  return project.href ?? project.repo;
}

/**
 * Metadata, not decoration — plain mono text rather than coloured pills,
 * so it stays consistent with how the Stack section treats tool names.
 */
function Tech({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1">
      {items.map((item) => (
        <li key={item} className="label text-foreground/60">
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * One large card, then compact rows. The uniform grid where every project
 * carries equal weight is the single clearest tell of a template — this says
 * outright which piece is worth being judged on.
 */
export default function Projects() {
  const featuredHref = linkFor(featured);

  return (
    <Section id="projects" label="Projects">
      <Reveal>
        <a
          href={featuredHref}
          target="_blank"
          rel="noreferrer"
          className="group block rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-foreground/25 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="display text-2xl leading-tight sm:text-3xl">
              {featured.title}
            </h3>
            <ArrowUpRight
              size={20}
              className="mt-1 shrink-0 text-foreground/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          </div>

          <p className="mt-4 max-w-prose text-sm leading-relaxed text-foreground/65">
            {featured.blurb}
          </p>

          <div className="mt-6">
            <Tech items={featured.tech} />
          </div>
        </a>
      </Reveal>

      <ul className="mt-10">
        {projects.map((project, i) => {
          const href = linkFor(project);

          return (
            <li key={project.title}>
              <Reveal delay={i * 60}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid gap-2 border-t border-foreground/10 py-5 transition-colors hover:border-foreground/25"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-base text-foreground/90 transition-colors group-hover:text-foreground">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 self-center text-foreground/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/70"
                    />
                  </div>

                  <p className="max-w-prose text-sm leading-relaxed text-foreground/60">
                    {project.blurb}
                  </p>

                  <div className="mt-1">
                    <Tech items={project.tech} />
                  </div>
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
