// Server Component — SEO-first, all content in DOM, animations are CSS-only
import { ArrowRight, Zap } from "lucide-react";

export function HeroStatic() {
  return (
    <section
      id="hero"
      aria-label="ECODrIx — Your business. One command."
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background — light, brand-tinted, no dark vignette ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft brand aura, top-center */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[860px] h-[540px] rounded-full opacity-70 blur-[70px] hero-float bg-[radial-gradient(ellipse_at_center,var(--color-accent-muted)_0%,transparent_70%)]" />
        {/* Faint grid, masked to fade at the edges */}
        <div className="absolute inset-0 opacity-50 [background-size:64px_64px] bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_30%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_30%,transparent_75%)]" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 wrapper flex flex-col items-center my-auto">
        {/* Badge */}
        <div className="pill mb-3 hero-enter">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Early Access Open · June 2026
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

      {/* Bottom fade into the page canvas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10 bg-[linear-gradient(to_bottom,transparent,var(--color-background))]" />
    </section>
  );
}
