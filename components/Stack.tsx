import { stack } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";
import TechChip from "./TechChip";

/**
 * One card per category — the grouping keeps a 44-item list scannable
 * instead of a single undifferentiated wall, while each item still gets its
 * brand icon. Its own top-level Section, deliberately not nested inside
 * About's card.
 */
export default function Stack() {
  return (
    <Section id="stack" label="Stack">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stack.map(({ label, items }, i) => (
          <Reveal
            key={label}
            delay={i * 60}
            className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5"
          >
            <h3 className="label text-foreground/60">{label}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => (
                <TechChip key={item} name={item} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
