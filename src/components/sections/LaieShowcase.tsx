"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  Search,
  Mail,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Database,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CLIP_CARD =
  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";
const CLIP_ICON =
  "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)";

const steps = [
  {
    icon: Search,
    color: "#22D3EE",
    num: "01",
    title: "Discover",
    headline: "Find Your ICP Automatically",
    desc: "AI scans Google Maps, directories, and social platforms to surface businesses matching your exact ideal customer profile.",
    detail:
      "12+ data sources cross-referenced. No manual list-building. No stale CSVs.",
    badge: "ICP Targeting",
    metric: "12+",
    metricLabel: "Data Sources",
  },
  {
    icon: Database,
    color: "#7C6EFA",
    num: "02",
    title: "Enrich",
    headline: "Complete Lead Profiles in Seconds",
    desc: "Emails, phone numbers, LinkedIn profiles, tech stack, company size — automatically appended to every lead found.",
    detail: "85% verified email accuracy. Enrichment runs in the background.",
    badge: "85% Accuracy",
    metric: "85%",
    metricLabel: "Email Accuracy",
  },
  {
    icon: Mail,
    color: "#4ADE80",
    num: "03",
    title: "Engage",
    headline: "AI-Written Outreach at Scale",
    desc: "Personalized outreach via email and WhatsApp. AI writes context-aware copy for each prospect based on their niche and pain points.",
    detail: "Not mail-merge. Actual per-lead personalization at scale.",
    badge: "AI Copywriting",
    metric: "10×",
    metricLabel: "Faster Outreach",
  },
  {
    icon: TrendingUp,
    color: "#F59E0B",
    num: "04",
    title: "Convert",
    headline: "Close Warm Leads, Not Cold Calls",
    desc: "Leads flow into your CRM pipeline. Sequences handle follow-ups 24/7. You step in only when intent is already established.",
    detail: "Hot leads flagged automatically. You close — LAIE does the rest.",
    badge: "Auto Follow-up",
    metric: "24/7",
    metricLabel: "Always Running",
  },
];

export function LaieShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect desktop for GSAP pin (768px+)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP horizontal scroll — desktop only
  useEffect(() => {
    if (!isDesktop || !sectionRef.current || !trackRef.current) return;

    // Wait for layout to settle
    const timer = setTimeout(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const totalScroll = track.scrollWidth - window.innerWidth;
      if (totalScroll <= 0) return;

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                Math.floor(self.progress * steps.length),
                steps.length - 1,
              );
              setActiveIndex(idx);
            },
          },
        });
      }, section);

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, [isDesktop]);

  // Mobile: track scroll position for active indicator
  useEffect(() => {
    if (isDesktop || !trackRef.current) return;
    const track = trackRef.current;

    const onScroll = () => {
      const scrollLeft = track.scrollLeft;
      const cardWidth = track.scrollWidth / steps.length;
      const idx = Math.min(
        Math.round(scrollLeft / cardWidth),
        steps.length - 1,
      );
      setActiveIndex(idx);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="laie"
      className="relative bg-background overflow-hidden sep-top"
      style={{
        height: isDesktop ? "100vh" : "auto",
        minHeight: isDesktop ? "600px" : "auto",
      }}
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[20%] left-[5%] w-[500px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(124,110,250,0.07) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[400px] h-[350px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* ── Header ── */}
        <div className="wrapper pt-6 md:pt-8 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-8">
          <div>
            <div className="pill mb-3 text-primary border-primary/20 bg-primary/5">
              <Brain size={11} />
              LAIE — Lead AI Engine
            </div>
            <h2
              className="font-display font-black text-white leading-[1.05]"
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                letterSpacing: "-0.04em",
              }}
            >
              AI That Finds Your{" "}
              <span className="grad-text">Next 500 Customers.</span>
            </h2>
            <p className="text-[13px] md:text-sm text-[#64647A] leading-relaxed mt-2 max-w-[400px]">
              Stop cold-calling. LAIE runs the full prospecting pipeline
              automatically. You just close the deals.
            </p>
          </div>

          {/* Progress dots + active label */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className="transition-all duration-500 rounded-sm"
                  style={{
                    width: i === activeIndex ? "28px" : "8px",
                    height: "6px",
                    background:
                      i === activeIndex
                        ? s.color
                        : i < activeIndex
                          ? `${steps[i].color}50`
                          : "rgba(255,255,255,0.08)",
                    boxShadow:
                      i === activeIndex ? `0 0 10px ${s.color}50` : "none",
                  }}
                />
              ))}
            </div>
            <span
              className="hidden md:inline text-[11px] font-mono font-bold tracking-widest uppercase transition-colors duration-500"
              style={{ color: steps[activeIndex].color }}
            >
              {steps[activeIndex].title}
            </span>
          </div>
        </div>

        {/* ── Card Track ── */}
        <div
          className={`flex-1 flex items-stretch ${isDesktop ? "overflow-hidden py-4" : "overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide py-6"}`}
          style={!isDesktop ? { WebkitOverflowScrolling: "touch" } : undefined}
        >
          <div
            ref={trackRef}
            className={`flex items-stretch gap-5 md:gap-6 lg:gap-8 ${isDesktop ? "will-change-transform h-full" : ""}`}
            style={{
              width: "max-content",
              paddingLeft: isDesktop
                ? "max(40px, calc((100vw - 1200px) / 2 + 40px))"
                : "20px",
              paddingRight: isDesktop ? "calc(100vw / 2)" : "20px",
            }}
          >
            {steps.map((step, i) => {
              const isActive = i === activeIndex;
              const Icon = step.icon;

              return (
                <div
                  key={step.num}
                  className={`group shrink-0 transition-all duration-500 ${!isDesktop ? "snap-center" : ""}`}
                  style={{
                    width: isDesktop ? "min(45vw, 560px)" : "min(80vw, 340px)",
                    height: isDesktop ? "100%" : "auto",
                    minHeight: isDesktop ? "auto" : "380px",
                    padding: "1px",
                    clipPath: CLIP_CARD,
                    backgroundColor: isActive
                      ? `${step.color}28`
                      : "rgba(255,255,255,0.05)",
                    boxShadow: isActive
                      ? `0 20px 60px -10px ${step.color}20, inset 0 1px 0 ${step.color}20`
                      : "none",
                    opacity: isDesktop ? (isActive ? 1 : 0.6) : 1,
                    transform: isDesktop
                      ? isActive
                        ? "scale(1)"
                        : "scale(0.97)"
                      : "none",
                  }}
                >
                  <div
                    className="h-full w-full relative flex flex-col p-6 md:p-8 lg:p-10 overflow-hidden"
                    style={{ clipPath: CLIP_CARD, background: "#0D0D14" }}
                  >
                    {/* Corner glow */}
                    <div
                      className="absolute top-0 right-0 w-40 h-40 pointer-events-none transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at 100% 0%, ${step.color}${isActive ? "15" : "05"} 0%, transparent 70%)`,
                      }}
                      aria-hidden="true"
                    />

                    {/* Step + badge */}
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <span
                        className="font-mono text-[11px] font-bold tracking-widest"
                        style={{ color: step.color }}
                      >
                        STEP {step.num}
                      </span>
                      <span
                        className="text-[9px] font-mono px-2.5 py-1 tracking-widest uppercase"
                        style={{
                          clipPath:
                            "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)",
                          background: `${step.color}10`,
                          border: `1px solid ${step.color}30`,
                          color: step.color,
                        }}
                      >
                        {step.badge}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className="mb-5 md:mb-6 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                      style={{
                        clipPath: CLIP_ICON,
                        background: `${step.color}12`,
                        border: `1px solid ${step.color}30`,
                        color: step.color,
                        boxShadow: isActive
                          ? `0 0 20px ${step.color}20`
                          : "none",
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Headline */}
                    <h3
                      className="font-display font-black text-xl md:text-2xl lg:text-[1.65rem] text-white tracking-tight mb-3 relative z-10"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      {step.headline}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] md:text-sm text-[#64647A] leading-relaxed relative z-10 flex-1">
                      {step.desc}
                    </p>

                    {/* Detail */}
                    <p className="text-[11px] text-[#9090a8] leading-relaxed relative z-10 mt-3">
                      {step.detail}
                    </p>

                    {/* Metric bar */}
                    <div className="relative z-10 mt-5 md:mt-6 pt-4 border-t border-white/5 flex items-end justify-between">
                      <div className="flex items-baseline gap-2">
                        <span
                          className="font-display font-black text-2xl md:text-3xl transition-colors duration-500"
                          style={{ color: step.color }}
                        >
                          {step.metric}
                        </span>
                        <span className="text-[10px] text-[#64647A] uppercase tracking-wider">
                          {step.metricLabel}
                        </span>
                      </div>
                      <div
                        className="h-[2px] w-12 md:w-16 rounded-full transition-all duration-500"
                        style={{
                          background: isActive
                            ? `linear-gradient(90deg, ${step.color}, ${step.color}40)`
                            : `${step.color}15`,
                          boxShadow: isActive
                            ? `0 0 8px ${step.color}40`
                            : "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="wrapper text-center py-4 md:py-5 flex flex-col items-center gap-1.5">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-white font-semibold text-sm btn-primary"
          >
            <Sparkles size={15} />
            Get Early Access to LAIE
            <ArrowRight size={14} />
          </a>
          <p className="text-[11px] text-[#64647A]">
            Included in all waitlist signups · No extra cost during early access
          </p>
        </div>
      </div>
    </section>
  );
}

export default LaieShowcase;
