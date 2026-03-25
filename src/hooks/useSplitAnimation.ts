"use client";

import { useEffect, RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SplitAnimationOptions {
  sectionRef: RefObject<HTMLElement | null>;
  leftRef: RefObject<HTMLElement | null>;
  rightRef: RefObject<HTMLElement | null>;
  /** Use Y-axis instead of X-axis for mobile-style animation */
  vertical?: boolean;
}

export function useSplitAnimation({
  sectionRef,
  leftRef,
  rightRef,
  vertical = false,
}: SplitAnimationOptions) {
  useEffect(() => {
    if (!sectionRef.current || !leftRef.current || !rightRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        isReduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, isMobile, isReduced } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          isReduced: boolean;
        };

        if (isReduced) {
          gsap.set([leftRef.current, rightRef.current], { opacity: 1, x: 0, y: 0 });
          return;
        }

        const useVertical = vertical || isMobile;
        const offset = useVertical ? 0 : (isDesktop ? 120 : 80);
        const yOffset = useVertical ? 80 : 0;

        const baseConfig = {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play reverse play reverse",
          },
          duration: 0.9,
          ease: "power3.out",
          opacity: 1,
          x: 0,
          y: 0,
        };

        gsap.fromTo(
          leftRef.current,
          { x: useVertical ? 0 : -offset, y: useVertical ? -yOffset : 0, opacity: 0 },
          baseConfig
        );

        gsap.fromTo(
          rightRef.current,
          { x: useVertical ? 0 : offset, y: useVertical ? yOffset : 0, opacity: 0 },
          { ...baseConfig, delay: 0.1 }
        );
      }
    );

    return () => {
      mm.revert();
    };
  }, [sectionRef, leftRef, rightRef, vertical]);
}
