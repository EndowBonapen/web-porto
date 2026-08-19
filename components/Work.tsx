import { work } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Work() {
  return (
    <Section id="work" label="Work">
      <ol>
        {work.map((role, i) => (
          <li key={`${role.org}-${role.period}`}>
            <Reveal
              delay={i * 60}
              className="grid gap-3 border-t border-foreground/10 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              {/* Mono for the period so the dates form a clean left rail.
                  11rem fits the longest real period ("Oct 2024 — Dec 2025")
                  on one line — narrower and "Present" wraps to a second row. */}
              <p className="label whitespace-nowrap pt-1 text-foreground/60">
                {role.period}
              </p>

              <div>
                {/* Organisation leads; the job title reads as metadata under
                    it. Previously the title was the larger of the two, which
                    inverted the hierarchy. */}
                <h3 className="display text-base text-foreground">{role.org}</h3>
                <p className="mt-0.5 text-sm text-foreground/60">{role.title}</p>

                {role.notes.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {role.notes.map((note) => (
                      <li
                        key={note}
                        className="text-sm leading-relaxed text-foreground/65"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
