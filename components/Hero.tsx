import { ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import { profile } from "@/content/site";
import Reveal from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./icons";

const socials = [
  { href: profile.links.github, label: "GitHub", Icon: GithubIcon },
  { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

/**
 * The one deliberate exception to "everything is left-aligned": on phones the
 * photo sits above the text and both are centred; from `sm` up they sit side
 * by side and the text column goes left-aligned, photo on the left.
 *
 * The photo runs in natural colour — the one departure from the site's
 * two-colour rule, kept because a face reads better true-to-life than
 * desaturated.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-center justify-center sm:min-h-screen"
    >
      {/* min-h-screen only from sm: up. Forcing full-viewport height on every
          phone (some run very tall) turned this into a huge dead zone before
          About — mobile just gets comfortable padding instead. */}
      <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-8 px-6 py-16 sm:grid-cols-[13rem_1fr] sm:gap-10 sm:py-32">
        <Reveal className="mx-auto w-40 sm:mx-0 sm:w-full">
          <Image
            src={profile.photo}
            alt={profile.fullName}
            width={1086}
            height={1448}
            priority
            className="w-full rounded-2xl border border-foreground/10 bg-foreground/[0.03]"
          />
        </Reveal>

        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <Reveal delay={60}>
            <p className="text-sm text-foreground/60 sm:text-base">
              {profile.greeting}
            </p>
          </Reveal>

          <Reveal delay={160}>
            {/* Tighter than the base .display tracking — at this size the
                default spacing reads slack, and this is the one place it shows. */}
            <h1 className="mt-1 display text-4xl leading-none tracking-[-0.04em] sm:text-5xl">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={210}>
            <p className="mt-3 text-lg text-foreground/70 sm:text-xl">
              {profile.role}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/60 sm:text-base">
              {profile.intro}
            </p>
          </Reveal>

          <Reveal delay={310}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a
                href="#projects"
                className="label rounded-full bg-foreground px-5 py-2.5 text-background transition-opacity hover:opacity-80"
              >
                View work
              </a>
              {profile.links.resume && (
                <a
                  href={profile.links.resume}
                  className="label rounded-full border border-foreground/20 px-5 py-2.5 text-foreground/70 transition-colors hover:border-foreground/50 hover:text-foreground"
                >
                  Résumé
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={360}>
            <ul className="mt-7 flex items-center justify-center gap-5 sm:justify-start">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="block text-foreground/50 transition-colors hover:text-foreground"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue. Decorative, so it is hidden from assistive tech. */}
      <a
        href="#about"
        aria-hidden
        tabIndex={-1}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/25 transition-colors hover:text-foreground/60"
      >
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
