import { TECH_ICONS } from "./tech-icons";

/**
 * One pill per technology. Items with a brand mark in TECH_ICONS show it in
 * its official colour — the one deliberate exception to the site's two-colour
 * rule, scoped to this one section. Items without a mark (SQL, NLP, BERT,
 * Transformers, FAISS, CI/CD — concepts and libraries with no public logo)
 * fall back to a plain text pill rather than a guessed or generic icon.
 */
export default function TechChip({ name }: { name: string }) {
  const Icon = TECH_ICONS[name];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 text-sm text-foreground/75">
      {Icon && <Icon size={15} />}
      {name}
    </span>
  );
}
