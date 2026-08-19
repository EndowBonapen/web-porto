import { Mail } from "lucide-react";
import { profile } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./icons";
import Reveal from "./Reveal";
import Section from "./Section";

// Handles, not full URLs, are what read as an invitation rather than a citation.
const linkedinHandle = profile.links.linkedin
  .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")
  .replace(/\/$/, "");
const githubHandle = profile.links.github
  .replace(/^https?:\/\/(www\.)?github\.com\//, "")
  .replace(/\/$/, "");

const channels = [
  { href: `mailto:${profile.email}`, label: "Email", value: profile.email, Icon: Mail },
  { href: profile.links.linkedin, label: "LinkedIn", value: linkedinHandle, Icon: LinkedinIcon },
  { href: profile.links.github, label: "GitHub", value: githubHandle, Icon: GithubIcon },
];

export default function Contact() {
  return (
    <Section id="contact" label="Contact">
      <Reveal>
        <p className="max-w-md text-sm leading-relaxed text-foreground/65">
          Open to new roles, collaborations, or just talking shop about data.
          Pick whichever of these you actually check.
        </p>
      </Reveal>

      <div className="mt-6 space-y-3">
        {channels.map(({ href, label, value, Icon }, i) => (
          <Reveal key={label} delay={80 + i * 60}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 transition-colors hover:border-foreground/25"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-foreground/10 bg-foreground/[0.03] text-foreground/70 transition-colors group-hover:text-foreground">
                <Icon size={18} />
              </span>
              <span className="flex flex-col overflow-hidden">
                <span className="label text-foreground/45">{label}</span>
                <span className="truncate text-sm font-medium text-foreground sm:text-base">
                  {value}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      {profile.links.resume && (
        <Reveal delay={80 + channels.length * 60}>
          <a
            href={profile.links.resume}
            className="label mt-6 inline-block text-foreground/60 transition-colors hover:text-foreground"
          >
            Download résumé →
          </a>
        </Reveal>
      )}
    </Section>
  );
}
