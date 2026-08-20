"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/site";
import Section from "./Section";
import TechChip from "./TechChip";
import { TECH_ICONS } from "./tech-icons";

// Per-phase transition length. Two phases play back to back on a committed
// swipe (out, then in), so a full change takes roughly 2x this.
const DURATION = 260;
// How far the card travels off/on screen during the animated swap. Bigger
// than DRAG_THRESHOLD on purpose: a release almost always lands short of it,
// so the exit animation continues the drag's own direction rather than
// snapping backward to a smaller number first.
const OFFSET = 120;
const DRAG_THRESHOLD = 50;
const MAX_DRAG = 160;

type Phase = "idle" | "exit" | "enter";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * One project at a time, cycled with prev/next, drag, or touch swipe — not a
 * grid. Meant to keep being the right shape as more projects get added,
 * rather than needing a re-layout every time the count changes.
 *
 * Motion is implemented as a two-step swap rather than a real carousel track:
 * the outgoing card slides out + fades, the index swaps while the incoming
 * card is instantly (invisibly) parked on the opposite edge, then it slides
 * in + fades. That avoids measuring card widths for a true off-canvas track.
 */
export default function Projects() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const pointerStart = useRef(0);
  const busy = useRef(false); // guards against overlapping programmatic transitions
  // A ref, not state — it's read once inside an event handler, never in JSX,
  // so there's no render to synchronize and no need to trigger one.
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  function goTo(dir: 1 | -1) {
    if (busy.current) return;
    busy.current = true;

    if (reduceMotion.current) {
      setIndex((i) => (i + dir + projects.length) % projects.length);
      busy.current = false;
      return;
    }

    setPhase("exit");
    setDragX(dir * -OFFSET);

    window.setTimeout(() => {
      setIndex((i) => (i + dir + projects.length) % projects.length);
      // Instantly (no transition) repositioned on the opposite edge —
      // the entrance animation below is what the user actually sees move.
      setPhase("enter");
      setDragX(dir * OFFSET);

      requestAnimationFrame(() => {
        setPhase("idle");
        setDragX(0);
        busy.current = false;
      });
    }, DURATION);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (busy.current) return;
    setDragging(true);
    pointerStart.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setDragX(clamp(e.clientX - pointerStart.current, -MAX_DRAG, MAX_DRAG));
  }

  function onPointerUp() {
    if (!dragging) return;
    setDragging(false);
    if (dragX <= -DRAG_THRESHOLD) goTo(1);
    else if (dragX >= DRAG_THRESHOLD) goTo(-1);
    else setDragX(0); // short of the threshold — spring back to centre
  }

  const project = projects[index];
  const Icon = TECH_ICONS[project.icon];
  // A live drag must track the pointer with zero lag, and the "enter" repark
  // must be instant (it's invisible, off to the side) — only the settle back
  // to centre (idle) and the committed exit are actually animated.
  const animated = !dragging && phase !== "enter";

  return (
    <Section id="projects" label="Projects">
      {/* Counter and arrows are chrome around the carousel, not part of the
          card — they stay put while whole cards slide through beneath them. */}
      <div className="flex items-center justify-between gap-4">
        <p className="label text-foreground/40">
          {index + 1} / {projects.length}
        </p>

        {projects.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Previous project"
              className="grid h-8 w-8 place-items-center rounded-full border border-foreground/15 text-foreground/60 transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Next project"
              className="grid h-8 w-8 place-items-center rounded-full border border-foreground/15 text-foreground/60 transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Clips the card during its off-centre travel (drag, or the
          exit/enter swap) so it can never push the page wider than the
          viewport — the card itself moves well past the section's edges. */}
      <div className="relative mt-5 overflow-hidden">
        {/* The card is what slides — border, background and all — with
            mouse or a finger, no click required. Release past
            DRAG_THRESHOLD commits a slide; short of it, it springs back. */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            transform: `translateX(${dragX}px)`,
            opacity: phase === "idle" ? 1 : 0,
            transition: animated
              ? `transform ${DURATION}ms ease-out, opacity ${DURATION}ms ease-out`
              : "none",
            touchAction: "pan-y",
          }}
          className="cursor-grab select-none rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 active:cursor-grabbing sm:p-8"
        >
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {Icon && (
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-foreground/10 bg-foreground/[0.03] text-foreground">
                <Icon size={26} />
              </span>
            )}
            <h3 className="display text-xl leading-tight sm:text-2xl">
              {project.title}
            </h3>
          </div>

          <p className="mt-4 max-w-prose text-sm leading-relaxed text-foreground/65 sm:text-base">
            {project.blurb}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((name) => (
              <TechChip key={name} name={name} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
