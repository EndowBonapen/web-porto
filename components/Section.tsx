import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  /** Must match an entry in `nav` in content/site.ts for the highlight to work. */
  id: string;
  label: string;
  children: ReactNode;
};

/**
 * The one section shell every block on the page uses, so rhythm and column
 * width can never drift between them.
 *
 * `scroll-mt-24` keeps anchor jumps from landing under the fixed nav.
 */
export default function Section({ id, label, children }: Props) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <Reveal>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-foreground/25" />
            <h2 className="label text-foreground/60">{label}</h2>
          </div>
        </Reveal>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
