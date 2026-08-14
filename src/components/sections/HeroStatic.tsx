// Server Component — SEO-first, all content in DOM, animations are CSS-only
import { ArrowRight, Zap } from "lucide-react";

/**
 * Inline SVG grid with glowing animated lines that travel along paths.
 * - Pure CSS animation (no JS, no hydration cost)
 * - Renders server-side in the HTML for instant paint
 * - Uses stroke-dasharray + stroke-dashoffset animation for the "traveling light" effect
 * - Masked at edges so it fades naturally into the background
 */
function GlowGrid() {
  // Grid config
  const cols = 18;
  const rows = 12;
  const cellSize = 64;
  const w = cols * cellSize;
  const h = rows * cellSize;

  // Generate vertical and horizontal line paths
  const verticals = Array.from({ length: cols + 1 }, (_, i) => i * cellSize);
  const horizontals = Array.from({ length: rows + 1 }, (_, i) => i * cellSize);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 72%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 72%)",
      }}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] min-w-[1100px]"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Static grid lines — very faint */}
        {verticals.map((x) => (
          <line
            key={`v-${x}`}
            x1={x} y1={0} x2={x} y2={h}
            stroke="var(--color-border)"
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}
        {horizontals.map((y) => (
          <line
            key={`h-${y}`}
            x1={0} y1={y} x2={w} y2={y}
            stroke="var(--color-border)"
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}

        {/* Glowing animated lines traveling along grid paths */}
        {/* Vertical glowing lines — travel top to bottom */}
        <line
          x1={cellSize * 4} y1={0} x2={cellSize * 4} y2={h}
          className="glow-line glow-line-v1"
          stroke="url(#glow-blue)" strokeWidth="1.5"
        />
        <line
          x1={cellSize * 9} y1={0} x2={cellSize * 9} y2={h}
          className="glow-line glow-line-v2"
          stroke="url(#glow-purple)" strokeWidth="1.5"
        />
        <line
          x1={cellSize * 14} y1={0} x2={cellSize * 14} y2={h}
          className="glow-line glow-line-v3"
          stroke="url(#glow-blue)" strokeWidth="1.5"
        />

        {/* Horizontal glowing lines — travel left to right */}
        <line
          x1={0} y1={cellSize * 3} x2={w} y2={cellSize * 3}
          className="glow-line glow-line-h1"
          stroke="url(#glow-purple)" strokeWidth="1.5"
        />
        <line
          x1={0} y1={cellSize * 7} x2={w} y2={cellSize * 7}
          className="glow-line glow-line-h2"
          stroke="url(#glow-blue)" strokeWidth="1.5"
        />
        <line
          x1={0} y1={cellSize * 10} x2={w} y2={cellSize * 10}
          className="glow-line glow-line-h3"
          stroke="url(#glow-crimson)" strokeWidth="1"
        />

        {/* Gradient defs for glow colors */}
        <defs>
          <linearGradient id="glow-blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(37,99,235,0)" />
            <stop offset="50%" stopColor="rgba(37,99,235,0.6)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0)" />
          </linearGradient>
          <linearGradient id="glow-purple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(124,58,237,0)" />
            <stop offset="50%" stopColor="rgba(124,58,237,0.5)" />
            <stop offset="100%" stopColor="rgba(124,58,237,0)" />
          </linearGradient>
          <linearGradient id="glow-crimson" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(220,38,38,0)" />
            <stop offset="50%" stopColor="rgba(220,38,38,0.35)" />
            <stop offset="100%" stopColor="rgba(220,38,38,0)" />
          </linearGradient>
        </defs>
      </svg>
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
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft brand aura */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[860px] h-[540px] rounded-full opacity-70 blur-[70px] hero-float bg-[radial-gradient(ellipse_at_center,var(--color-accent-muted)_0%,transparent_70%)]" />
      </div>

      {/* ── SVG Animated Glow Grid ── */}
      <GlowGrid />

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
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2.5 group"
          >
            <Zap size={15} />
            Join the Waitlist
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
          <a
            href="#services"
            className="btn-ghost inline-flex items-center gap-2"
          >
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
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: f.color }}
              />
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
