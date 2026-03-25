"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionDecorProps {
  side?: "left" | "right" | "both";
  className?: string;
}

export const SectionDecor = ({ side = "both", className }: SectionDecorProps) => {
  const lineMotif = (
    <div className="flex flex-col gap-1.5 opacity-20">
      <div className="w-12 h-1 bg-white" />
      <div className="w-12 h-1 bg-white" />
      <div className="w-12 h-1 bg-white" />
    </div>
  );

  const dotsMotif = (
    <div className="grid grid-cols-2 gap-2 opacity-10">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="w-1 h-1 bg-white rounded-full" />
      ))}
    </div>
  );

  return (
    <div className={cn("absolute inset-y-0 w-full pointer-events-none z-0 overflow-hidden", className)}>
      {(side === "left" || side === "both") && (
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12">
          {lineMotif}
          <div className="h-32 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
          {dotsMotif}
        </div>
      )}
      
      {(side === "right" || side === "both") && (
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12">
          {dotsMotif}
          <div className="h-32 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
          {lineMotif}
        </div>
      )}

      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 blur-[150px] rounded-full" />
    </div>
  );
};
