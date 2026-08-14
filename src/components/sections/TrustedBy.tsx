"use client";

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
    <div className="w-full py-12 border-y border-border bg-foreground/[0.015] overflow-hidden relative">
      {/* Soft edge fades */}
      <div className="absolute left-0 top-0 w-24 h-full pointer-events-none bg-[linear-gradient(90deg,var(--color-background),transparent)]" />
      <div className="absolute right-0 top-0 w-24 h-full pointer-events-none bg-[linear-gradient(270deg,var(--color-background),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 mb-8 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-sans">
        Trusted by ambitious teams across India & UK
      </div>

      <div className="relative flex justify-center items-center gap-8 md:gap-12 flex-wrap">
        {clients.map((client) => (
          <span
            key={client}
            className="text-lg md:text-xl font-display font-bold text-foreground/25 hover:text-accent transition-colors cursor-default"
          >
            {client}
          </span>
        ))}
      </div>
    </div>
  );
};
