# Portfolio — Endow

Single-page portfolio. Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript.
Monochrome, dark by default, light on toggle.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (also type-checks)
npm run lint
```

## Editing content

**Everything you will want to change lives in [`content/site.ts`](content/site.ts).**
Profile, about, stack, work history, projects, links — all of it. You should
never need to open a component to update the site.

> The content shipped in that file is **placeholder**. The voice and shape are
> right; the facts are invented. Replace it before deploying.

Two things that will break if left as-is:

- `profile.email` — currently `hello@example.com`
- `profile.links.resume` — points at `/resume.pdf`, which does not exist yet.
  Drop the PDF into `public/`, or set the field to `null` to hide the button.

## Changing the background

One word, same file:

```ts
export const background: BackgroundKey = "contour";
//  "grid" | "grain" | "contour" | "dots" | "none"
```

Visit **`/preview`** to compare all four side by side, in both themes. The
variant currently wired up is marked *Currently live*. That page is
`noindex` and blocked in `robots.txt`, so it is safe to keep around.

To add a fifth: write the component in `components/backgrounds/`, give it the
same `BackgroundProps` signature, and add one line to the registry in
[`components/backgrounds/index.tsx`](components/backgrounds/index.tsx).

## Design rules worth keeping

**Two colours only.** `--background` and `--foreground` in
[`app/globals.css`](app/globals.css), swapped by `[data-theme]`. Every other
shade is an opacity of the foreground. Adding a third colour would undo the
whole look.

**Contrast floors** (measured against both themes — light is always tighter):

| Use | Minimum | Ratio |
| --- | --- | --- |
| Any text, any size | `text-foreground/60` | 5.18:1 |
| Icons that carry meaning | `text-foreground/50` | 3.68:1 |
| Decorative only (rules, middots, `aria-hidden`) | anything | — |

Going lighter than `/60` on real text fails WCAG AA. It is tempting in a
monochrome design — build hierarchy with size and spacing instead.

**Geist throughout**, the way `vercel.com` does it — Geist Sans for everything
and Geist Mono for labels, years and tags. With a single family carrying the
page, hierarchy has to come from size, weight and tracking instead. Two
utilities in `globals.css` hold that treatment so it stays consistent:

- `.display` — weight 600, tracking `-0.03em`. Headings, the name, stat numbers.
- `.label` — 11px uppercase mono, tracking `0.14em`. Section titles, years, tags.

Tune either in one place rather than sprinkling `font-semibold tracking-tight`
across components.

**Motion is one-shot.** `Reveal` fades content up once, then stops observing.
Under `prefers-reduced-motion` it is shown outright via CSS, never via JS.

## Deploying

1. Push to GitHub, import the repo on Vercel — it needs no configuration.
2. Set `siteUrl` in `content/site.ts` to the real domain. Canonical URLs, the
   sitemap, and the social preview image are all derived from it.

The social card (`app/opengraph-image.tsx`) and favicon (`app/icon.tsx`) are
generated at build time from the static Geist instances in `assets/`. Those are
committed on purpose: fetching a font over the network would make the build
depend on it, and Satori cannot resolve the weight axis of a variable font, so
static cuts are required.
