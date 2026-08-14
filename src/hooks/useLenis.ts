"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll — BMW-inspired precision scrolling.
 *
 * Parameters tuned for "engineered" feel:
 * - duration 1.0 (snappy, not floaty — BMW's UI transitions are quick + decisive)
 * - lerp 0.1 (tighter interpolation = more responsive, less "sliding on ice")
 * - wheelMultiplier 1 (natural, no amplification)
 * - Disabled on mobile (native scroll is already optimized by iOS/Android)
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip on mobile — native momentum scroll is better on touch devices
    if (window.innerWidth < 768 || "ontouchstart" in window) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => {
        // Custom cubic-bezier approximation: fast start, precise deceleration
        // Feels like BMW — decisive acceleration, controlled stop
        return 1 - Math.pow(1 - t, 3);
      },
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;

    // Sync with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // RAF loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Refresh ScrollTrigger after layout settles
    const timer = setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
