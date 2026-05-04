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
  // Removed heavy GSAP marquee animation for better performance
  return (
    <div className="w-full py-12 border-y border-white/5 bg-white/1 overflow-hidden relative no-collapse">
      {/* Polygon decorative elements */}
      <div 
        className="absolute left-0 top-0 w-32 h-full opacity-10 pointer-events-none"
        aria-hidden="true"
        style={{
          clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
          background: "linear-gradient(90deg, rgba(124,110,250,0.1), transparent)"
        }}
      />
      <div 
        className="absolute right-0 top-0 w-32 h-full opacity-10 pointer-events-none"
        aria-hidden="true"
        style={{
          clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)",
          background: "linear-gradient(270deg, rgba(34,211,238,0.1), transparent)"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 mb-8 text-center text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono no-collapse">
        Trusted by ambitious teams across India & UK
      </div>

      {/* Static client list - no animation for better performance */}
      <div className="relative flex justify-center items-center gap-8 md:gap-12 flex-wrap no-collapse">
        {clients.map((client, i) => (
          <span
            key={i}
            className="text-lg md:text-xl font-display font-bold text-white/20 hover:text-white/40 transition-colors cursor-default relative no-collapse"
          >
            <span className="relative z-10">{client}</span>
            {/* Polygon highlight on hover */}
            <div 
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
              style={{
                clipPath: "polygon(0 20%, 100% 0, 100% 80%, 0 100%)",
                background: "linear-gradient(135deg, rgba(124,110,250,0.1), rgba(34,211,238,0.05))"
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
