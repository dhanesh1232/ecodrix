/**
 * Motion 2 surfaces that need no JavaScript (design system v13). Server
 * components; the CSS lives in globals.css → "Motion 2".
 *
 *   <Marquee>   an endless, edge-faded row; pauses on hover and focus;
 *               one static wrapping row under reduced motion
 *   <LiveDot>   a status dot with a soft pulse, always next to a word
 */

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

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
      className={cn("erix-marquee", className)}
      style={{ "--mq-dur": `${duration}s`, "--mq-gap": `${gap}px` } as CSSProperties}
    >
      <div className="erix-marquee__track">
        <div className="erix-marquee__set">{children}</div>
        {/* The copy that makes the loop seamless: hidden from assistive tech, gone under reduced motion. */}
        <div className="erix-marquee__set" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}

export function LiveDot({ tone = "success", className }: { tone?: "success" | "accent" | "ai" | "warning"; className?: string }) {
  return <span aria-hidden="true" className={cn("erix-livedot", tone !== "success" && `erix-livedot--${tone}`, className)} />;
}
