"use client";

import { useEffect, useRef } from "react";

export function HeroCanvas({
  containerRef,
}: {
  containerRef?: React.RefObject<HTMLElement | null>;
}) {
  // Simplified static background - no heavy canvas animations
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Static geometric background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/20"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-24 h-24 border border-cyan/20"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)"
          }}
        />
        <div 
          className="absolute bottom-1/3 left-1/2 w-20 h-20 border border-primary/15"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
          }}
        />
      </div>
    </div>
  );
}
