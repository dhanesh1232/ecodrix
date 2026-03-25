"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function GlowGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const dots = containerRef.current.querySelectorAll(".grid-dot");
    if (!dots.length) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(dots, {
        opacity: () => Math.random() * 0.8 + 0.1,
        duration: () => 1.5 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.1, from: "random" },
      });
    });

    return () => mm.revert();
  }, []);

  const cellSize = 40;
  const cols = Math.ceil(1280 / cellSize) + 2;
  const rows = Math.ceil(900 / cellSize) + 2;

  const dots: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.75) {
        dots.push({ x: c * cellSize, y: r * cellSize });
      }
    }
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* SVG Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke="rgba(108,99,255,0.07)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Glowing Dots */}
      {dots.map((dot, i) => (
        <div
          key={i}
          className="grid-dot absolute opacity-40"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: "#6C63FF",
            boxShadow: "0 0 6px 2px rgba(108,99,255,0.6)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Radial gradient overlay - fades grid at edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, #0A0A0F 80%)",
        }}
      />
    </div>
  );
}
