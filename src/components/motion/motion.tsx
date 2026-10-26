"use client";

/**
 * Site motion helpers (CSS lives in globals.css → "Motion"). No animation
 * library: scroll-driven CSS, IntersectionObserver, requestAnimationFrame
 * and the Web Animations API. Every helper renders its final state on the
 * server and does nothing under `prefers-reduced-motion: reduce`.
 *
 *   <MotionRoot />                once, in the root layout (route fade, focus,
 *                                 and Reveal for `.erix-reveal` sections)
 *   <Scene steps label>…</Scene>  a looping product scene (parts use `at()`)
 *   <CountUp value="₹29,500" />   counts up when it comes into view
 *   <BlurText> (blur-text.tsx)    server-safe hero headline that sharpens in
 */

import { Pause, Play } from "@/components/icons";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** True when the visitor asked for reduced motion (or there is no DOM). */
export function motionOff(): boolean {
  return (
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// ponytail: soft route changes get an entry fade, not a view transition — switch to React <ViewTransition> once Next's experimental.viewTransition is stable.
/**
 * Reveal (design system v13, marketing only): `.erix-reveal` sections that
 * start below the fold wait hidden and rise in once when they scroll into
 * view. Sections already on screen are never touched, and nothing is hidden
 * without JS, without IntersectionObserver or under reduced motion, so the
 * HTML (and crawlers) always carry every word.
 */
function revealSections(): () => void {
  if (motionOff() || !("IntersectionObserver" in window)) return () => {};
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.remove("is-wait");
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  for (const el of document.querySelectorAll<HTMLElement>(".erix-reveal:not(.is-in)")) {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) continue;
    el.classList.add("is-wait");
    io.observe(el);
  }
  return () => io.disconnect();
}

/**
 * Root effect: a short entry fade on client-side route changes, focus moves
 * to the new page's h1 (like the SaaS shell), and Reveal for the page.
 *
 * Why not View Transitions for route changes: Next 16 only wires them to
 * React's experimental `<ViewTransition>` (`experimental.viewTransition`),
 * and a view transition freezes the old page while the next one loads,
 * which is worst on slow phone networks. Hard loads still crossfade
 * through the CSS `@view-transition` rule.
 */
export function MotionRoot() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    // A client-side route change (not the first load).
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      if (!motionOff()) {
        document.getElementById("main-content")?.animate(
          [
            { opacity: 0, translate: "0 8px" },
            { opacity: 1, translate: "0 0" },
          ],
          { duration: 320, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
      }
      const h1 = location.hash ? null : document.querySelector<HTMLElement>("#main-content h1");
      if (h1) {
        h1.tabIndex = -1;
        h1.focus({ preventScroll: true });
      }
    }
    return revealSections();
  }, [pathname]);

  return null;
}

/**
 * Drives a product scene: sets `--step` 0 → `steps`, holds the finished
 * frame, then loops. Runs only while at least a third of it is on screen,
 * so off-screen and hidden-tab scenes cost nothing. The server HTML (and
 * reduced motion) is the finished frame. A pause button satisfies WCAG
 * 2.2.2 (moving content longer than 5 s can be stopped).
 */
export function Scene({
  steps,
  timing = 1100,
  hold = 3200,
  label,
  className,
  toggleClassName = "ml-auto",
  children,
}: {
  /** Index of the last step. */
  steps: number;
  /** ms each step stays before the next: one number, or one per step
   *  (index = step; step 0, the cleared frame, always lasts 450 ms). */
  timing?: number | number[];
  /** ms the finished frame holds before the loop restarts. */
  hold?: number;
  /** What the scene shows, for screen readers (the parts are hidden). */
  label: string;
  className?: string;
  /** Where the pause button sits under the scene (default: right). */
  toggleClassName?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || paused || motionOff()) return;
    el.dataset.playing = "";
    let step = Number(el.style.getPropertyValue("--step") || steps);
    let timer = 0;
    const wait = (s: number) =>
      s >= steps ? hold : (typeof timing === "number" ? timing : timing[s]) ?? 1100;
    const next = () => {
      step = step >= steps ? 0 : step + 1;
      el.style.setProperty("--step", String(step));
      timer = window.setTimeout(next, step === 0 ? 450 : wait(step));
    };
    const io = new IntersectionObserver(
      ([e]) => {
        clearTimeout(timer);
        if (e.isIntersecting) timer = window.setTimeout(next, step >= steps ? 1200 : wait(step));
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [paused, steps, timing, hold]);

  return (
    <div ref={ref} className={cn("scene flex flex-col", className)} data-paused={paused || undefined}>
      <div role="img" aria-label={label}>
        {children}
      </div>
      <button
        type="button"
        onClick={() => setPaused(!paused)}
        className={cn("scene-toggle relative z-10 mt-2 flex size-8 items-center justify-center rounded-[8px] text-subtle hover:bg-hover hover:text-accent", toggleClassName)}
      >
        {paused ? (
          <Play aria-hidden="true" className="size-3.5" />
        ) : (
          <Pause aria-hidden="true" className="size-3.5" />
        )}
        <span className="sr-only">{paused ? "Play animation" : "Pause animation"}</span>
      </button>
    </div>
  );
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * A number that counts up once, when it scrolls into view. The real value
 * is always in the HTML (crawlers, screen readers, no-JS); the counting
 * digits are an aria-hidden overlay, and the real text keeps its width, so
 * nothing shifts. Already on screen at load → no count (never flashes 0).
 * Keeps ₹, suffixes (+, %), decimals and Indian grouping.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const real = useRef<HTMLSpanElement>(null);
  const live = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = real.current;
    const overlay = live.current;
    const m = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
    if (!el || !overlay || !m || motionOff()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const [, pre, num, post] = m;
    const target = Number(num.replace(/,/g, ""));
    const dp = num.split(".")[1]?.length ?? 0;
    const fmt = (n: number) =>
      pre + n.toLocaleString("en-IN", { minimumFractionDigits: dp, maximumFractionDigits: dp }) + post;
    const show = (text: string | null) => {
      overlay.textContent = text;
      el.style.opacity = text === null ? "" : "0";
    };

    let raf = 0;
    show(fmt(0));
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let t0: number | undefined;
        const tick = (now: number) => {
          t0 ??= now;
          const p = Math.min(1, (now - t0) / 1200);
          show(p < 1 ? fmt(target * easeOutExpo(p)) : null);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      show(null);
    };
  }, [value]);

  return (
    <span className={cn("relative inline-block tabular-nums", className)}>
      <span ref={real}>{value}</span>
      <span ref={live} aria-hidden="true" className="absolute inset-0 whitespace-nowrap" />
    </span>
  );
}
