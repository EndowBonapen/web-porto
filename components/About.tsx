import { about } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";
import Stats from "./Stats";

/**
 * Same bordered-card treatment as the featured project in Projects.tsx —
 * reusing it here rather than inventing a second "boxed content" pattern.
 */
export default function About() {
  return (
    <Section id="about" label="About">
      <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-8">
        <div className="space-y-4">
          {about.map((paragraph, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className="text-base leading-relaxed text-foreground/75">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Evidence for the paragraphs above. */}
        <Reveal delay={about.length * 60}>
          <div className="mt-10">
            <Stats />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
