"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger sibling reveals, in ms. Keep it under ~150 or it reads as lag. */
  delay?: number;
  className?: string;
};

/**
 * Fades content up 12px the first time it enters the viewport, then stops
 * observing. Deliberately one-shot — content that re-animates every time you
 * scroll past it gets irritating fast.
 */
export default function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Reduced motion is handled purely in CSS (see .reveal in globals.css),
    // which keeps setShown confined to the observer callback — a subscription,
    // not a synchronous effect-body write.
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal transition-[opacity,transform] duration-500 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
