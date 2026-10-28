/**
 * Motion 2 surfaces that need no JavaScript (design system v13). Server
 * components; keyframes are the `animate-marquee` / `animate-livedot` theme tokens.
 *
 *   <Marquee>   an endless, edge-faded row; pauses on hover and focus;
 *               one static wrapping row under reduced motion
 *   <LiveDot>   a status dot with a soft pulse, always next to a word
 */

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** One copy of the row; the list inside never wraps while it scrolls, and wraps once it stands still. */
const set = "flex flex-none gap-(--mq-gap) [&>ul]:flex-nowrap! [&>ul]:gap-(--mq-gap)! motion-reduce:[&>ul]:flex-wrap!";

export function Marquee({
  children,
  duration = 40,
  gap = 40,
  label,
  className,
}: {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  gap?: number;
  /** Names the region for screen readers. */
  label?: string;
  className?: string;
}) {
  return (
    <div
      role={label ? "region" : undefined}
      aria-label={label}
      className={cn("group/marquee min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]", className)}
      style={{ "--mq-dur": `${duration}s`, "--mq-gap": `${gap}px` } as CSSProperties}
    >
      <div className="flex w-max gap-(--mq-gap) motion-safe:animate-marquee motion-safe:group-[:hover]/marquee:[animation-play-state:paused] motion-safe:group-[:focus-within]/marquee:[animation-play-state:paused]">
        <div className={set}>{children}</div>
        {/* The copy that makes the loop seamless: hidden from assistive tech, gone under reduced motion. */}
        <div className={cn(set, "motion-reduce:hidden!")} aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}

const LD = {
  success: "[--ld:var(--success)]",
  accent: "[--ld:var(--accent)]",
  ai: "[--ld:var(--ai)]",
  warning: "[--ld:var(--warning)]",
} as const;

export function LiveDot({ tone = "success", className }: { tone?: "success" | "accent" | "ai" | "warning"; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-block size-2 flex-none rounded-[9999px] bg-(--ld) motion-safe:after:absolute motion-safe:after:inset-0 motion-safe:after:rounded-[inherit] motion-safe:after:bg-(--ld) motion-safe:after:animate-livedot",
        LD[tone],
        className,
      )}
    />
  );
}
