"use client";

import { useLenis } from "@/hooks/useLenis";

/**
 * Side-effect-only component: initialises Lenis smooth scroll and wires it
 * to GSAP ScrollTrigger. Renders nothing — exists purely to let page.tsx
 * stay a Server Component so crawlers receive fully hydrated HTML.
 */
export function LenisProvider() {
  useLenis();
  return null;
}
