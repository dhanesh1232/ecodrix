"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const clients = [
  "Nirvisham Clinic",
  "Phoenix",
  "TechFlow",
  "Lumina Cloud",
  "Zenith Agency",
  "Pulse Media",
];

export const TrustedBy = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const totalWidth = marquee.scrollWidth / 2;

    gsap.to(marquee, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div className="w-full py-12 border-y border-white/5 bg-white/1 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">
        Trusted by ambitious teams across India & UK
      </div>

      <div className="relative flex whitespace-nowrap">
        <div
          ref={marqueeRef}
          className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24"
        >
          {[...clients, ...clients].map((client, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl font-display font-bold text-white/20 hover:text-white/40 transition-colors cursor-default"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
