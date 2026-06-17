// Server Component — SEO-first, all content in DOM, animations are CSS-only
import { ArrowRight, Zap } from "lucide-react";

export function HeroStatic() {
  return (
    <section
      id="hero"
      aria-label="ECODrIx — Your business. One command."
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden min-h-[94vh] md:min-h-[92vh]"
    >
      {/* ── Animated beam network background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gradient orbs */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-25 hero-float"
          style={{
            background:
              "radial-gradient(circle, rgba(124,110,250,0.45) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full opacity-20 hero-float-reverse"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(ellipse, rgba(168,158,253,0.3) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* Animated beam lines — CSS only */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.3]"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C6EFA" stopOpacity="0" />
              <stop offset="50%" stopColor="#7C6EFA" stopOpacity="1" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="1" />
              <stop offset="100%" stopColor="#7C6EFA" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Diagonal beams that pulse */}
          <line
            x1="10%"
            y1="20%"
            x2="45%"
            y2="50%"
            stroke="url(#beam1)"
            strokeWidth="1"
            className="hero-beam"
            style={{ animationDelay: "0s" }}
          />
          <line
            x1="90%"
            y1="15%"
            x2="55%"
            y2="50%"
            stroke="url(#beam2)"
            strokeWidth="1"
            className="hero-beam"
            style={{ animationDelay: "1.5s" }}
          />
          <line
            x1="15%"
            y1="80%"
            x2="45%"
            y2="55%"
            stroke="url(#beam1)"
            strokeWidth="1"
            className="hero-beam"
            style={{ animationDelay: "3s" }}
          />
          <line
            x1="85%"
            y1="85%"
            x2="55%"
            y2="55%"
            stroke="url(#beam2)"
            strokeWidth="1"
            className="hero-beam"
            style={{ animationDelay: "4.5s" }}
          />
          <line
            x1="5%"
            y1="50%"
            x2="40%"
            y2="48%"
            stroke="url(#beam1)"
            strokeWidth="0.5"
            className="hero-beam"
            style={{ animationDelay: "2s" }}
          />
          <line
            x1="95%"
            y1="50%"
            x2="60%"
            y2="48%"
            stroke="url(#beam2)"
            strokeWidth="0.5"
            className="hero-beam"
            style={{ animationDelay: "3.5s" }}
          />
        </svg>

        {/* Floating node dots at beam endpoints — larger + glowing */}
        <div
          className="absolute top-[20%] left-[10%] w-3 h-3 rounded-full hero-pulse"
          style={{
            background: "rgba(124,110,250,0.8)",
            boxShadow: "0 0 14px rgba(124,110,250,0.6)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute top-[15%] right-[10%] w-3 h-3 rounded-full hero-pulse"
          style={{
            background: "rgba(34,211,238,0.8)",
            boxShadow: "0 0 14px rgba(34,211,238,0.6)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[15%] w-2.5 h-2.5 rounded-full hero-pulse"
          style={{
            background: "rgba(124,110,250,0.7)",
            boxShadow: "0 0 10px rgba(124,110,250,0.5)",
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute bottom-[15%] right-[15%] w-2.5 h-2.5 rounded-full hero-pulse"
          style={{
            background: "rgba(34,211,238,0.7)",
            boxShadow: "0 0 10px rgba(34,211,238,0.5)",
            animationDelay: "4.5s",
          }}
        />
        <div
          className="absolute top-[50%] left-[5%] w-2 h-2 rounded-full hero-pulse"
          style={{
            background: "rgba(124,110,250,0.6)",
            boxShadow: "0 0 8px rgba(124,110,250,0.4)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-[50%] right-[5%] w-2 h-2 rounded-full hero-pulse"
          style={{
            background: "rgba(34,211,238,0.6)",
            boxShadow: "0 0 8px rgba(34,211,238,0.4)",
            animationDelay: "3.5s",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,110,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,110,250,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(6,6,8,0.5) 65%, #060608 100%)",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 wrapper flex flex-col items-center">
        {/* Badge */}
        <div className="pill mb-2 hero-enter" style={{ animationDelay: "0ms" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Early Access Open · Launching June 2026
        </div>

        {/* ── Headline — the centerpiece ── */}
        <h1
          className="font-display font-black text-white hero-enter"
          style={{
            fontSize: "clamp(3rem, 9.5vw, 6.5rem)",
            letterSpacing: "-0.05em",
            lineHeight: 1.0,
            animationDelay: "120ms",
            // Reserve vertical space matching the line-height so the font
            // swap from system fallback to Space Grotesk doesn't reflow
            // and contribute to Cumulative Layout Shift.
            minHeight: "clamp(6rem, 19vw, 13rem)",
          }}
        >
          <span className="block">Your Business.</span>
          <span className="block relative">
            <span className="grad-text">One Command.</span>
            {/* Decorative underline beam */}
            <span
              className="absolute -bottom-3 left-[5%] right-[5%] h-[3px] rounded-full hero-line-grow"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #7C6EFA, #22D3EE, transparent)",
                boxShadow: "0 0 12px rgba(124,110,250,0.4)",
                animationDelay: "800ms",
              }}
            />
          </span>
        </h1>

        {/* Sub copy */}
        <p
          className="max-w-[520px] leading-relaxed mt-7 mb-9 hero-enter"
          style={{
            color: "#8888A0",
            fontSize: "clamp(15px, 1.8vw, 18px)",
            animationDelay: "250ms",
          }}
        >
          CRM, WhatsApp, email, AI lead gen, booking, and storage — unified. Set
          up in 15 minutes. No credit card.
        </p>

        {/* ── CTA row ── */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 mb-14 hero-enter"
          style={{ animationDelay: "400ms" }}
        >
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 group"
          >
            <Zap size={15} />
            Join the Waitlist
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
          <a
            href="#services"
            className="btn-ghost inline-flex items-center gap-2"
          >
            Explore Platform
            <ArrowRight size={14} className="rotate-90" />
          </a>
        </div>

        {/* ── Floating feature nodes — arranged in an arc ── */}
        <div
          className="relative w-full max-w-[680px] h-[60px] md:h-[70px] hero-enter"
          style={{ animationDelay: "550ms" }}
        >
          <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            {[
              { label: "CRM", color: "#7C6EFA" },
              { label: "WhatsApp", color: "#25D366" },
              { label: "Email", color: "#F59E0B" },
              { label: "AI Engine", color: "#22D3EE" },
              { label: "Booking", color: "#F472B6" },
              { label: "Storage", color: "#4ADE80" },
            ].map((f, i) => (
              <span
                key={f.label}
                className="hero-node inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-medium tracking-wide"
                style={{
                  color: f.color,
                  background: `${f.color}08`,
                  border: `1px solid ${f.color}20`,
                  clipPath:
                    "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
                  animationDelay: `${650 + i * 100}ms`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: f.color,
                    boxShadow: `0 0 6px ${f.color}60`,
                  }}
                />
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #060608)",
        }}
      />

      {/* ── CSS animations — no JS, SEO safe ── */}
      <style>{`
        .hero-enter {
          opacity: 0;
          transform: translateY(24px);
          animation: heroEnter 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-node {
          opacity: 0;
          transform: translateY(12px) scale(0.9);
          animation: heroNode 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-line-grow {
          transform: scaleX(0);
          animation: heroLineGrow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-beam {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: heroBeam 6s ease-in-out infinite;
        }

        .hero-pulse {
          animation: heroPulse 3s ease-in-out infinite;
        }

        .hero-float {
          animation: heroFloat 8s ease-in-out infinite;
        }

        .hero-float-reverse {
          animation: heroFloat 8s ease-in-out infinite reverse;
        }

        @keyframes heroEnter {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroNode {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes heroLineGrow {
          to { transform: scaleX(1); }
        }

        @keyframes heroBeam {
          0% { stroke-dashoffset: 200; opacity: 0; }
          20% { opacity: 1; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          80% { opacity: 0; }
          100% { stroke-dashoffset: -200; opacity: 0; }
        }

        @keyframes heroPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.8); }
        }

        @keyframes heroFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, -20px); }
        }

        /* Mobile: disable the infinite SVG / orb / dot animations to free
           up the main thread. They are decorative — not load-bearing. */
        @media (max-width: 767px) {
          .hero-beam, .hero-pulse, .hero-float, .hero-float-reverse {
            animation: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-enter, .hero-node, .hero-line-grow { animation: none; opacity: 1; transform: none; }
          .hero-beam, .hero-pulse, .hero-float, .hero-float-reverse { animation: none; }
        }
      `}</style>
    </section>
  );
}
