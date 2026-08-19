import ThemeToggle from "@/components/ThemeToggle";
import { REGISTRY } from "@/components/backgrounds";
import { background, profile } from "@/content/site";

export const metadata = {
  title: "Background variants — pick one",
  robots: { index: false, follow: false },
};

// Registry order, labelled A–D for the conversation.
const VARIANTS = Object.entries(REGISTRY).map(([key, v], i) => ({
  key,
  letter: "ABCD"[i],
  ...v,
}));

/**
 * The real hero copy, so each variant is judged against actual content
 * rather than lorem ipsum.
 */
function HeroMock() {
  return (
    <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
      <h1 className="display text-6xl leading-none tracking-[-0.045em] sm:text-7xl">
        {profile.name}
      </h1>

      <p className="mt-3 text-xl text-foreground/70 sm:text-2xl">
        Data Analyst &amp; ML Engineer
      </p>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/60 sm:text-base">
        I build the pipelines that move data, the models that read it, and the
        dashboards people actually act on.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <span className="label rounded-full bg-foreground px-5 py-2.5 text-background">
          View work
        </span>
        <span className="label rounded-full border border-foreground/20 px-5 py-2.5 text-foreground/70">
          Résumé
        </span>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <main>
      {/* The theme toggle matters here: a variant has to hold up in both
          themes before it can be chosen. */}
      <div className="fixed right-4 top-4 z-50 flex items-center gap-3 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 backdrop-blur-md">
        <span className="label text-foreground/60">Pick one</span>
        <ThemeToggle />
      </div>

      {VARIANTS.map(({ key, letter, label, note, Component }) => (
        <section
          key={key}
          className="relative isolate flex min-h-screen items-center justify-center overflow-hidden border-b border-foreground/10"
        >
          <Component />

          <div className="absolute left-6 top-6 z-10 max-w-xs">
            {/* 36px counts as large text, so 3:1 is the bar here, not 4.5:1. */}
            <p className="display text-4xl leading-none text-foreground/45">
              {letter}
            </p>
            <p className="label mt-2 text-foreground/60">{label}</p>
            <p className="mt-2 text-xs leading-relaxed text-foreground/60">
              {note}
            </p>
            {/* Shows which one the site is actually wired to right now. */}
            {key === background && (
              <p className="label mt-3 inline-block rounded-full border border-foreground/25 px-2.5 py-1 text-foreground/70">
                Currently live
              </p>
            )}
          </div>

          <HeroMock />
        </section>
      ))}

      <footer className="px-6 py-16 text-center">
        <p className="text-sm text-foreground/60">
          To switch, edit{" "}
          <code className="font-mono text-foreground/80">background</code> in{" "}
          <code className="font-mono text-foreground/80">content/site.ts</code>.
        </p>
      </footer>
    </main>
  );
}
