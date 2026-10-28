"use client";

import { useRef, type ComponentPropsWithoutRef, type ElementType, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Spotlight (design system v13): a soft glow and a lit edge follow the mouse
 * across a card. Mouse only, two CSS variables per frame, nothing
 * re-renders; the glow and edge (`::before` / `::after`) only exist on
 * hover-capable screens without reduced motion. Feature cards only, never pricing.
 */
const spot = [
  "relative isolate",
  // No pseudo-elements unless the screen can hover and motion is allowed.
  "before:content-none after:content-none [@media(hover:hover)]:motion-safe:before:content-[''] [@media(hover:hover)]:motion-safe:after:content-['']",
  "before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-300 before:ease-out",
  "before:bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,0),color-mix(in_srgb,var(--spot)_9%,transparent),transparent_60%)]",
  // The lit edge: a 1px ring masked out of a second glow.
  "after:pointer-events-none after:absolute after:inset-0 after:z-2 after:rounded-[inherit] after:p-px after:opacity-0 after:transition-opacity after:duration-300 after:ease-out",
  "after:bg-[radial-gradient(280px_circle_at_var(--mx,50%)_var(--my,0),color-mix(in_srgb,var(--spot)_70%,transparent),transparent_70%)]",
  "after:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
  "hover:before:opacity-100 hover:after:opacity-100",
].join(" ");

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
    <Tag ref={ref} onPointerMove={move} className={cn(spot, tone === "ai" ? "[--spot:var(--ai)]" : "[--spot:var(--accent)]", className)} {...rest}>
      {children}
    </Tag>
  );
}
