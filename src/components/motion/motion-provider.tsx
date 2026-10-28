"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

const features = () => import("./motion-features").then((m) => m.default);

/**
 * framer-motion for the whole site, kept off the critical path: `m.*`
 * components render plain HTML first and the animation features arrive in
 * their own chunk once the page is interactive (`strict` forbids the heavy
 * `motion.*` components). `reducedMotion="user"` turns transform and layout
 * animation off for visitors who ask for less motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={features} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
