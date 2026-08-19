// Server Component — SSR, CSS-only animations, zero JS hydration cost.
import { ArrowRight, Zap } from "lucide-react";

/**
 * 3D perspective-tilted SVG grid with glowing animated pulses.
 * The grid tilts back (rotateX) so the bottom appears closer and
 * the top recedes — like a floor plane extending to the horizon.
 * All animation via CSS keyframes. Renders in initial HTML payload.
 */
function AnimatedGrid() {
  const cellSize = 56;
  const cols = 20;
  const rows = 14;
  const w = cols * cellSize;
  const h = rows * cellSize;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
      style={{ perspective: "1200px", perspectiveOrigin: "50% 35%" }}
    >
      {/* Inner wrapper gets the 3D tilt */}
      <div
        className="absolute inset-[-20%] top-[10%]"
        style={{
          transform: "rotateX(52deg)",
          transformOrigin: "50% 50%",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, black 15%, transparent 68%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, black 15%, transparent 68%)",
        }}
      >
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="g-v-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(37,99,235,0)" />
              <stop offset="40%" stopColor="rgba(37,99,235,0.7)" />
              <stop offset="60%" stopColor="rgba(37,99,235,0.7)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0)" />
            </linearGradient>
            <linearGradient id="g-v-purple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(124,58,237,0)" />
              <stop offset="40%" stopColor="rgba(124,58,237,0.6)" />
              <stop offset="60%" stopColor="rgba(124,58,237,0.6)" />
              <stop offset="100%" stopColor="rgba(124,58,237,0)" />
            </linearGradient>
            <linearGradient id="g-h-blue" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(37,99,235,0)" />
              <stop offset="40%" stopColor="rgba(37,99,235,0.6)" />
              <stop offset="60%" stopColor="rgba(37,99,235,0.6)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0)" />
            </linearGradient>
            <linearGradient id="g-h-red" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(220,38,38,0)" />
              <stop offset="40%" stopColor="rgba(220,38,38,0.4)" />
              <stop offset="60%" stopColor="rgba(220,38,38,0.4)" />
              <stop offset="100%" stopColor="rgba(220,38,38,0)" />
            </linearGradient>
          </defs>

          {/* Static grid — faint dots at every intersection */}
          {Array.from({ length: (cols + 1) * (rows + 1) }, (_, idx) => {
            const col = idx % (cols + 1);
            const row = Math.floor(idx / (cols + 1));
            return (
              <circle
                key={idx}
                cx={col * cellSize}
                cy={row * cellSize}
                r="1"
                fill="var(--color-border)"
                opacity="0.5"
              />
            );
          })}

          {/* Animated vertical glow lines */}
          <line x1={cellSize * 5} y1={0} x2={cellSize * 5} y2={h}
            className="glow-line glow-line-v1" stroke="url(#g-v-blue)" strokeWidth="2" />
          <line x1={cellSize * 10} y1={0} x2={cellSize * 10} y2={h}
            className="glow-line glow-line-v2" stroke="url(#g-v-purple)" strokeWidth="1.5" />
          <line x1={cellSize * 15} y1={0} x2={cellSize * 15} y2={h}
            className="glow-line glow-line-v3" stroke="url(#g-v-blue)" strokeWidth="1.5" />

          {/* Animated horizontal glow lines */}
          <line x1={0} y1={cellSize * 4} x2={w} y2={cellSize * 4}
            className="glow-line glow-line-h1" stroke="url(#g-h-blue)" strokeWidth="2" />
          <line x1={0} y1={cellSize * 8} x2={w} y2={cellSize * 8}
            className="glow-line glow-line-h2" stroke="url(#g-h-red)" strokeWidth="1.5" />
          <line x1={0} y1={cellSize * 11} x2={w} y2={cellSize * 11}
            className="glow-line glow-line-h3" stroke="url(#g-h-blue)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

export function HeroStatic() {
  return (
    <section
      id="hero"
      aria-label="ECODrIx — Your business. One command."
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background aura ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[860px] h-[540px] rounded-full opacity-70 blur-[70px] hero-float bg-[radial-gradient(ellipse_at_center,var(--color-accent-muted)_0%,transparent_70%)]" />
      </div>

      {/* ── 3D Tilted Animated SVG Grid ── */}
      <AnimatedGrid />

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 wrapper flex flex-col items-center my-auto">
        {/* Badge */}
        <div className="pill mb-3 hero-enter">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Early Access Open · Aug 2026
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold hero-enter [animation-delay:100ms] tracking-[-0.04em] leading-[1.05] text-[clamp(2.75rem,8vw,5.5rem)] min-h-[clamp(5.5rem,16vw,12rem)]">
          <span className="block text-foreground">Your Business.</span>
          <span className="block grad-text">One Command.</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-[540px] leading-relaxed mt-3 mb-6 hero-enter text-muted-foreground [animation-delay:220ms] text-[clamp(15px,1.6vw,18px)]">
          CRM, WhatsApp, email, AI lead gen, booking, and cloud storage —
          unified in one platform. Set up in 15 minutes. No credit card.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 hero-enter [animation-delay:350ms]">
          <a href="#contact" className="btn-primary inline-flex items-center gap-2.5 group">
            <Zap size={15} />
            Join the Waitlist
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a href="#services" className="btn-ghost inline-flex items-center gap-2">
            Explore Platform
            <ArrowRight size={14} className="opacity-50" />
          </a>
        </div>

        {/* Feature chips */}
        <div className="flex items-center justify-center gap-2.5 md:gap-3 flex-wrap hero-enter [animation-delay:500ms]">
          {[
            { label: "CRM", color: "var(--color-accent)" },
            { label: "WhatsApp", color: "#25D366" },
            { label: "Email", color: "var(--color-warning)" },
            { label: "AI Engine", color: "var(--color-brand-purple)" },
            { label: "Booking", color: "var(--color-brand-crimson)" },
            { label: "Storage", color: "var(--color-success)" },
          ].map((f, i) => (
            <span
              key={f.label}
              className="hero-node inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-full border border-border bg-surface text-muted-foreground"
              style={{ animationDelay: `${600 + i * 80}ms` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: f.color }} />
              {f.label}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10 bg-[linear-gradient(to_bottom,transparent,var(--color-background))]" />
    </section>
  );
}
