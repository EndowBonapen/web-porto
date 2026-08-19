import { profile } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";

const links = [
  { href: profile.links.linkedin, label: "LinkedIn" },
  { href: profile.links.github, label: "GitHub" },
  ...(profile.links.resume
    ? [{ href: profile.links.resume, label: "Résumé" }]
    : []),
];

export default function Contact() {
  return (
    <Section id="contact" label="Contact">
      <Reveal>
        <a
          href={`mailto:${profile.email}`}
          className="display text-3xl underline decoration-foreground/20 underline-offset-8 transition-colors hover:decoration-foreground sm:text-4xl"
        >
          {profile.email}
        </a>
      </Reveal>

      <Reveal delay={80}>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {links.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="label text-foreground/60 transition-colors hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
