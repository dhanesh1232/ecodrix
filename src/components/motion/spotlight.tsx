"use client";

import { useRef, type ComponentPropsWithoutRef, type ElementType, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Spotlight (design system v13): a soft glow and a lit edge follow the mouse
 * across a card. Mouse only, two CSS variables per frame, nothing
 * re-renders; the CSS (`.erix-spot` in globals.css) is off on touch screens
 * and under reduced motion. Feature cards only, never pricing.
 */
export function Spotlight<T extends ElementType = "div">({
  as,
  tone,
  className,
  children,
  ...rest
}: { as?: T; tone?: "ai" } & Omit<ComponentPropsWithoutRef<T>, "as">) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);
  const move = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    });
  };
  return (
    <Tag ref={ref} onPointerMove={move} className={cn("erix-spot", tone && `erix-spot--${tone}`, className)} {...rest}>
      {children}
    </Tag>
  );
}
