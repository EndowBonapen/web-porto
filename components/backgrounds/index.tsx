import type { ComponentType } from "react";
import { background, type BackgroundKey } from "@/content/site";
import DataContour from "./DataContour";
import DotMatrix from "./DotMatrix";
import GrainOrb from "./GrainOrb";
import GridSpotlight from "./GridSpotlight";
import type { BackgroundProps } from "./types";

/**
 * The registry. Adding a fifth variant later means writing the component and
 * adding one line here — nothing else in the app needs to know about it.
 */
export const REGISTRY: Record<
  Exclude<BackgroundKey, "none">,
  { label: string; note: string; Component: ComponentType<BackgroundProps> }
> = {
  grid: {
    label: "Grid + Spotlight",
    note: "Move your cursor — the glow follows it.",
    Component: GridSpotlight,
  },
  grain: {
    label: "Grain + Orb",
    note: "Closest to Hazlan. Grain is what kills the digital look.",
    Component: GrainOrb,
  },
  contour: {
    label: "Data Contour",
    note: "A real ridgeline plot. Drawn from gaussian curves.",
    Component: DataContour,
  },
  dots: {
    label: "Dot Matrix",
    note: "The quietest. Reads as paper, not decoration.",
    Component: DotMatrix,
  },
};

/**
 * Renders whichever variant `background` in content/site.ts points at.
 * Pass `variant` to override — that is how /preview shows all four at once.
 */
export default function Background({
  variant,
  className,
}: BackgroundProps & { variant?: BackgroundKey }) {
  const key = variant ?? background;
  if (key === "none") return null;

  const { Component } = REGISTRY[key];
  return <Component className={className} />;
}
