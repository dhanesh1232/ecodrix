"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lenis and its React wrapper (~9 KB) load once the page is idle on a mouse
// or trackpad device (so the very first wheel turn is already smooth), or on
// the first mouse move or wheel if that comes sooner. Touch-only phones never
// load it, and it never competes with the first paint.
const LenisRoot = dynamic(() => import("./lenis-root"), { ssr: false });

/**
 * Smooth wheel and trackpad scrolling (Lenis, founder's call 27 Oct). It only
 * smooths wheel and trackpad, so it loads on mouse/trackpad devices only;
 * touch keeps native scrolling (`syncTouch: false`), which protects
 * low-end Android, and keyboard scrolling and find-in-page stay native.
 * Never mounted under `prefers-reduced-motion: reduce` or
 * `<html data-motion="off">`, and taken down if reduced motion is turned on.
 */
export function SmoothScroll() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const allowed = () => !reduce.matches && document.documentElement.dataset.motion !== "off";
    const want = (e: Event) => {
      if (e.type === "pointermove" && (e as PointerEvent).pointerType !== "mouse") return;
      stop();
      if (allowed()) setOn(true);
    };
    const events = ["wheel", "pointermove"] as const;
    let idle = 0;
    const stop = () => {
      events.forEach((t) => window.removeEventListener(t, want));
      if (!idle) return;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
    events.forEach((t) => window.addEventListener(t, want, { passive: true }));
    // Mouse or trackpad device: load as soon as the page is idle, so the first
    // scroll is smooth instead of switching to smooth halfway through.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const go = () => {
        idle = 0;
        stop();
        if (allowed()) setOn(true);
      };
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(go, { timeout: 2500 })
        : window.setTimeout(go, 1200);
    }
    const onChange = () => setOn((was) => was && allowed());
    reduce.addEventListener("change", onChange);
    return () => {
      stop();
      reduce.removeEventListener("change", onChange);
    };
  }, []);

  return on ? <LenisRoot /> : null;
}
