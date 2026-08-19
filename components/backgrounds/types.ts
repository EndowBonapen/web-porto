/**
 * Every background variant takes the same props, so swapping the chosen one
 * in layout.tsx is a one-line change.
 *
 * Each renders a full-bleed, aria-hidden, pointer-events-none layer that sits
 * behind page content. None of them introduce a colour — they work purely in
 * opacities of --foreground so they invert cleanly with the theme.
 */
export type BackgroundProps = {
  className?: string;
};
