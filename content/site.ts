/**
 * Everything editable about this site lives here.
 * Change content in this file; never in the components.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * HEADS UP — everything below the config block is PLACEHOLDER.
 * It is written in the right voice and shape, but the facts are invented.
 * Replace it before this goes anywhere public.
 * ─────────────────────────────────────────────────────────────────────────
 */

/* ── Config ───────────────────────────────────────────────────────────── */

/**
 * Which background decoration to use. Swap the string, save, done —
 * the four variants are interchangeable by design.
 *
 *   "grid"    A — 1px grid + a glow that follows the cursor
 *   "grain"   B — drifting blurred orbs under film grain
 *   "contour" C — ridgeline plot drawn from gaussian curves
 *   "dots"    D — dot matrix under a vignette
 *   "none"    no decoration at all
 *
 * Compare them any time at /preview.
 */
export const background: BackgroundKey = "none";

export type BackgroundKey = "grid" | "grain" | "contour" | "dots" | "none";

/**
 * Canonical origin. Update this after the first Vercel deploy — canonical
 * URLs and the social preview image are both built from it.
 */
export const siteUrl = "https://endow.vercel.app";

/** Short mark in the top-left of the nav. Initials read better than a full name. */
export const monogram = "EB";

/**
 * Nav links. Each `id` must match the `id` of a <Section> on the page —
 * that pairing is what drives both the anchor jump and the active highlight.
 */
export const nav = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

/* ── Profile ──────────────────────────────────────────────────────────── */

export const profile = {
  /** Shown large in the hero. */
  name: "Endow Bonapen",
  /** Used for <title>, the footer, and structured data. */
  fullName: "Endow Bonapen",
  /** Small line above the name in the hero. Keep it short — it is a nod, not a sentence. */
  greeting: "Hi, it's me",
  /** Path under public/. 3:4 portrait works best with the hero's aspect ratio below. */
  photo: "/photo.png",
  role: "Data & AI/ML Engineer",

  /**
   * Hero paragraph. Two sentences, hard ceiling.
   * Rule of thumb: if this could be pasted onto someone else's portfolio
   * without changing a word, rewrite it.
   */
  intro:
    "Transforming data into insights and intelligent solutions. Building end-to-end solutions across data pipelines, AI models, and interactive analytics.",

  email: "endowbonapen2002@gmail.com",
  links: {
    github: "https://github.com/EndowBonapen/",
    linkedin: "https://www.linkedin.com/in/endowbonapen/",
    /** Drop the PDF at public/resume.pdf, or set to null to hide the button. */
    resume: "/resume.pdf" as string | null,
  },
};

/** About paragraphs. Keep it to two or three — this is not an autobiography. */
export const about = [
  "I graduated in Informatics and have 3+ years of industry experience across Machine Learning, Deep Learning, Data Science, and Data Engineering.",
  "My work sits at the intersection of data and AI — from building data pipelines and automation workflows to developing predictive models, NLP solutions, and computer vision systems. I enjoy turning complex data and problems into practical solutions that make processes smarter and more efficient.",
  "I do my best work in environments where problems are constantly changing, where learning something new is part of the job, and where technology can be used to create meaningful impact.",
];

/**
 * The proof line. Three numbers, and no more — a longer row starts reading
 * as padding rather than evidence.
 *
 * Every one of these has to be true. An inflated number is the fastest way
 * to lose the one reader who actually knows the domain.
 */
export const stats = [
  { value: "3+", label: "Years experience" },
  { value: "20+", label: "Projects completed" },
  { value: "10+", label: "Model deployed" },
  { value: "25+", label: "Data pipelines" },
];

/* ── Stack ────────────────────────────────────────────────────────────── */

/**
 * Grouped into cards, one per category. Each item is looked up by exact
 * string in the TECH_ICONS registry (components/tech-icons.tsx) — items
 * without a matching brand mark there render as a plain text chip instead,
 * which is expected for generic terms like "SQL" or "NLP" that are not
 * themselves a brand.
 */
export const stack = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C++", "C#"],
  },
  { label: "Data Engineering", items: ["Airflow", "Dagster", "dbt", "PySpark"] },
  {
    label: "Databases & Cloud",
    items: [
      "PostgreSQL",
      "MySQL",
      "MSSQL",
      "AWS",
      "Amazon RDS",
      "Amazon S3",
      "Google BigQuery",
      "Google Cloud Platform",
      "Firebase",
    ],
  },
  {
    label: "Backend & Infra",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "OpenAPI",
      ".NET",
      "Git",
      "Docker",
      "Linux",
      "CI/CD",
      "Postman",
      "Grafana",
    ],
  },
  {
    label: "Analysis & Visualization",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Tableau",
      "Google Data Studio",
      "Power BI",
      "Metabase",
    ],
  },
  {
    label: "Machine Learning & AI",
    items: [
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Transformers",
      "BERT",
      "NLP",
      "LangChain",
      "Hugging Face",
      "FAISS",
      "OpenCV",
    ],
  },
];

/* ── Work ─────────────────────────────────────────────────────────────── */

export type Role = {
  org: string;
  title: string;
  /** Free text, so "2024 — Now" and "2022 — 2023" both work. */
  period: string;
  /** One or two lines. Lead with the outcome, not the responsibility. */
  notes: string[];
};

export const work: Role[] = [
  {
    org: "PT Entropi Global Martech (Full Time)",
    title: "Data Engineer & Analyst",
    period: "Feb 2026 — Present",
    notes: [],
  },
  {
    // The one-month gap between Pou Chen ending and Entropi starting —
    // freelance work that fills it, not a break.
    org: "Self Employed",
    title: "Freelance Data Science",
    period: "Jan 2026 — Feb 2026",
    notes: [],
  },
  {
    org: "PT Pou Chen Group Indonesia (Full Time)",
    title: "Data Automation Engineer",
    period: "Oct 2024 — Dec 2025",
    notes: [],
  },
  {
    org: "FGA Digital Talent Scholarship Batch 1",
    title: "Data Science",
    period: "Feb 2024 — Apr 2024",
    notes: [],
  },
  {
    org: "PT United Tractors Tbk (Apprenticeship)",
    title: "Data and Record Management",
    period: "Feb 2023 — Jun 2023",
    notes: [],
  },
  {
    org: "Polres Metro Bekasi Kota (Apprenticeship)",
    title: "IT Support",
    period: "Jan 2019 — May 2019",
    notes: [],
  },
];

/* ── Projects ─────────────────────────────────────────────────────────── */

export type Project = {
  title: string;
  /** What it does, and what changed because it exists. */
  blurb: string;
  tech: string[];
  /** Cover mark shown in the carousel tile — a key into TECH_ICONS (components/tech-icons.tsx). */
  icon: string;
  href?: string;
  repo?: string;
};

/**
 * Shown one at a time in a carousel (components/Projects.tsx), not a grid —
 * built to keep working as more get added, rather than needing re-layout
 * every time the count changes.
 */
export const projects: Project[] = [
  {
    title: "Entropi Creator TikTok Ranking — US & IDN",
    blurb:
      "Built an end-to-end data pipeline to calculate and manage 10+ creator ranking programs across TikTok Agency programs (GO, TAP, and MCN), powering a centralized dashboard for creator performance monitoring and ranking insights.",
    tech: ["Python", "PostgreSQL", "Airflow", "Dagster"],
    icon: "TikTok",
  },
  {
    title: "Entropi Creator TikTok Leads",
    blurb:
      "Built an end-to-end data pipeline to identify, enrich, and rank creator leads based on performance data, enabling the BD team to efficiently discover, evaluate, and reach out to high-potential creators for agency recruitment.",
    tech: ["Python", "PostgreSQL", "Airflow", "Dagster"],
    icon: "TikTok",
  },
  {
    title: "Entropi Creator Performance Analytics",
    blurb:
      "Built an end-to-end creator analytics pipeline that consolidates video and live performance data across GO, TAP, and MCN programs. Engineered creator-level metrics and performance aggregations around GMV and other key KPIs, enabling the team to evaluate creator performance, compare program outcomes, and identify high-performing creators across the agency ecosystem.",
    tech: ["Python", "PostgreSQL", "Airflow", "Dagster"],
    icon: "TikTok",
  },
];
