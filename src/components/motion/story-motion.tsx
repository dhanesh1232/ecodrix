"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";
import { useHydrated } from "./motion";

/**
 * The story's rail (framer-motion `useScroll`): the line fills as the visitor
 * reads down the chapters, and the chapter crossing the middle of the screen
 * gets `data-current` (its dot turns the logo's red), the ones above it
 * `data-seen`. Server HTML, no-JS and reduced motion get a full, still line.
 */
export function StoryRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const live = hydrated && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });

  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const chapters = [...root.querySelectorAll<HTMLElement>("[data-chapter]")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const at = chapters.indexOf(e.target as HTMLElement);
          chapters.forEach((c, i) => {
            if (i <= at) c.dataset.seen = "";
            if (i === at) c.dataset.current = "";
            else delete c.dataset.current;
          });
        }
      },
      // A thin band across the middle of the screen.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const c of chapters) io.observe(c);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative pl-11 max-[900px]:pl-8">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-0.5 rounded-[2px] bg-border max-[900px]:left-[7px]" />
      <m.span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[11px] w-0.5 origin-top rounded-[2px] bg-[linear-gradient(180deg,var(--blue-300),var(--accent))] max-[900px]:left-[7px]"
        style={live ? { scaleY: scrollYProgress } : undefined}
      />
      {children}
    </div>
  );
}

/**
 * A chapter's product visual, tied to scroll: it rises, settles at full size
 * as it reaches the middle of the screen, and drifts up as it leaves.
 * Transform only (the screens keep their real colours, so text contrast
 * never drops); nothing moves on the server, without JS or under reduced
 * motion.
 */
export function StoryVisual({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const live = hydrated && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [64, 0, -32]);
  const scale = useTransform(scrollYProgress, [0, 0.42], [0.94, 1]);

  return (
    <m.div ref={ref} className="relative min-w-0" style={live ? { y, scale } : undefined}>
      {children}
    </m.div>
  );
}
