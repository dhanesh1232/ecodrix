// Server Component - renders immediately without JavaScript
import { ArrowRight, Star } from "lucide-react";

export function HeroStatic() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden pt-[12vh] md:pt-[18vh] pb-[8vh] md:pb-[10vh]"
    >
      {/* Modern gradient background with depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary gradient orb - top left */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 110, 250, 0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Cyan gradient orb - top right */}
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 211, 238, 0.35) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Accent gradient orb - bottom center */}
        <div
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, rgba(168, 158, 253, 0.3) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124, 110, 250, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 110, 250, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial vignette for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(6, 6, 8, 0.4) 60%, #060608 100%)",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 wrapper flex flex-col items-center">
        <div className="h-badge pill mb-2">
          <Star size={9} fill="#7C6EFA" stroke="none" />
          Now in Early Access · Trusted by 50+ Businesses · 99.9% Uptime
        </div>

        <h1
          className="h-headline font-display font-black leading-none text-white"
          style={{
            fontSize: "clamp(2.4rem, 8vw, 5rem)",
            letterSpacing: "-0.04em",
            marginBottom: "16px",
          }}
        >
          <span className="block">ECODrIx: One Platform for</span>
          <span className="block grad-text">Every Part of Your Business.</span>
          <span className="block" style={{ color: "rgba(255,255,255,0.6)" }}>
            Stop Managing Ten Tools.
          </span>
        </h1>

        <p
          className="h-sub max-w-[600px] leading-relaxed mb-10"
          style={{ color: "#64647A", fontSize: "18px" }}
        >
          CRM, automation, WhatsApp, email marketing, and cloud storage — all in
          one place. Set up in under 15 minutes. No credit card required.
        </p>

        <div className="h-ctas flex flex-col sm:flex-row items-center gap-4 mb-16 relative z-30">
          <a
            href="#services"
            className="group relative p-px bg-[rgba(255,255,255,0.15)] hover:bg-primary hover:shadow-[0_0_40px_rgba(124,110,250,0.4)] transition-all duration-300 hover:scale-[1.02]"
            style={{
              clipPath:
                "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            }}
          >
            <div
              className="px-8 py-4 bg-background h-full w-full flex items-center gap-2 group-hover:bg-transparent transition-colors duration-300"
              style={{
                clipPath:
                  "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
                Start Free Trial
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </div>
          </a>

          <a
            href="#product"
            className="group relative p-px bg-[rgba(255,255,255,0.15)] hover:bg-cyan hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300"
            style={{
              clipPath:
                "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            }}
          >
            <div
              className="px-8 py-4 bg-background h-full w-full flex items-center gap-3 transition-colors duration-300 group-hover:bg-background/50"
              style={{
                clipPath:
                  "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
              }}
            >
              <span className="text-white font-semibold relative z-10">
                See How It Works ↓
              </span>
            </div>
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #060608)",
        }}
      />
    </section>
  );
}
