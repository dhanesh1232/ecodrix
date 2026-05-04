"use client";

import { useEffect, useRef, useState } from "react";
import { loadLenis } from "@/lib/dynamic-imports";
import { ScrollTrigger } from "@/lib/gsap";
import type Lenis from "lenis";

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number;

    // Lazy load Lenis after initial render
    loadLenis()
      .then((LenisModule) => {
        const LenisConstructor = LenisModule.default;
        lenis = new LenisConstructor({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        });

        lenisRef.current = lenis;
        setIsLoaded(true);

        function raf(time: number) {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        lenis.on("scroll", ScrollTrigger.update);
      })
      .catch((error) => {
        console.error("Failed to load Lenis:", error);
      });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis?.destroy();
    };
  }, []);

  return lenisRef.current;
};

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number;

    // Lazy load Lenis after initial render
    loadLenis()
      .then((LenisModule) => {
        const LenisConstructor = LenisModule.default;
        lenis = new LenisConstructor();

        function raf(time: number) {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // GSAP ScrollTrigger Integration
        lenis.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value) {
            return arguments.length ? lenis!.scrollTo(value!) : lenis!.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: document.body.style.transform ? "transform" : "fixed",
        });
      })
      .catch((error) => {
        console.error("Failed to load Lenis:", error);
      });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
