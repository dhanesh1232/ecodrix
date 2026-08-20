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
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    color: "var(--color-brand-purple)",
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
    color: "var(--color-accent)",
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
    color: "var(--color-success)",
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
    color: "var(--color-warning)",
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
      className={cn(
        "relative bg-background overflow-hidden sep-top",
        isDesktop ? "h-screen min-h-[600px]" : "h-auto",
      )}
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[20%] left-[5%] w-[500px] h-[400px] blur-[100px] bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--color-accent)_7%,transparent)_0%,transparent_65%)]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[350px] blur-[80px] bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-purple)_5%,transparent)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* ── Header ── */}
        <div className="wrapper pt-6 md:pt-8 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-8">
          <div>
            <div className="pill mb-1 text-accent border-accent/20 bg-accent/5">
              <Brain size={11} />
              LAIE — Lead AI Engine
            </div>
            <h2 className="font-display font-black text-foreground leading-[1.05] text-[clamp(1.6rem,3.5vw,2.6rem)] tracking-[-0.04em]">
              AI That Finds Your{" "}
              <span className="grad-text">Next 500 Customers.</span>
            </h2>
            <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed mt-0.5 max-w-[400px]">
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
                  style={{ "--seg": s.color } as React.CSSProperties}
                  className={cn(
                    "h-1.5 rounded-none transition-all duration-500",
                    i === activeIndex ? "w-7" : "w-2",
                    i === activeIndex
                      ? "bg-[var(--seg)] shadow-none"
                      : i < activeIndex
                        ? "bg-[color-mix(in_srgb,var(--seg)_50%,transparent)]"
                        : "bg-foreground/10",
                  )}
                />
              ))}
            </div>
            <span
              style={
                { "--seg": steps[activeIndex].color } as React.CSSProperties
              }
              className="hidden md:inline text-[11px] font-sans font-bold tracking-widest uppercase transition-colors duration-500 text-[var(--seg)]"
            >
              {steps[activeIndex].title}
            </span>
          </div>
        </div>

        {/* ── Card Track ── */}
        <div
          className={cn(
            "flex-1 flex items-stretch",
            isDesktop
              ? "overflow-hidden py-4"
              : "overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide py-6 [-webkit-overflow-scrolling:touch]",
          )}
        >
          <div
            ref={trackRef}
            className={cn(
              "flex items-stretch gap-5 md:gap-6 lg:gap-8 w-max",
              isDesktop
                ? "will-change-transform h-full pl-[max(20px,calc((100vw-1200px)/2+20px))] pr-[calc(100vw/2)]"
                : "pl-5 pr-5",
            )}
          >
            {steps.map((step, i) => {
              const isActive = i === activeIndex;
              const Icon = step.icon;

              return (
                <div
                  key={step.num}
                  style={{ "--c": step.color } as React.CSSProperties}
                  className={cn(
                    "group shrink-0 transition-all duration-500 p-px rounded-none",
                    !isDesktop && "snap-center",
                    isDesktop
                      ? "w-[min(45vw,560px)] h-full"
                      : "w-[min(80vw,340px)] min-h-[380px]",
                    isActive
                      ? "bg-[color-mix(in_srgb,var(--c)_5%,transparent)] shadow-none"
                      : "bg-foreground/5",
                    isDesktop &&
                    (isActive
                      ? "opacity-100 scale-100"
                      : "opacity-60 scale-[0.95]"),
                  )}
                >
                  <div className={cn("h-full w-full relative flex flex-col p-6 md:p-8 lg:p-10 overflow-hidden rounded-none bg-surface", isActive && "hover:border hover:border-accent")}>
                    {/* Corner glow */}
                    <div
                      className={cn(
                        "absolute top-0 right-0 w-40 h-40 pointer-events-none transition-opacity duration-700",
                        isActive
                          ? "bg-[radial-gradient(circle_at_100%_0%,color-mix(in_srgb,var(--c)_8%,transparent)_0%,transparent_70%)]"
                          : "bg-[radial-gradient(circle_at_100%_0%,color-mix(in_srgb,var(--c)_2%,transparent)_0%,transparent_70%)]",
                      )}
                      aria-hidden="true"
                    />

                    {/* Step + badge */}
                    <div className="flex items-center justify-between mb-2 relative z-10">
                      <span className="font-sans text-[11px] font-bold tracking-widest text-[var(--c)]">
                        STEP {step.num}
                      </span>
                      <span className="text-[9px] font-sans px-2.5 py-1 tracking-widest uppercase rounded-none bg-[color-mix(in_srgb,var(--c)_6%,transparent)] border border-[color-mix(in_srgb,var(--c)_14%,transparent)] text-[var(--c)]">
                        {step.badge}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={cn(
                        "mb-2 md:mb-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2 rounded-none text-[var(--c)]",
                      )}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Headline */}
                    <h3 className="font-display font-black text-xl md:text-2xl lg:text-[1.65rem] text-foreground mb-3 relative z-10 tracking-[-0.03em]">
                      {step.headline}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed relative z-10 flex-1">
                      {step.desc}
                    </p>

                    {/* Detail */}
                    <p className="text-[11px] text-subtle leading-relaxed relative z-10 mt-0.5">
                      {step.detail}
                    </p>

                    {/* Metric bar */}
                    <div className="relative z-10 mt-5 md:mt-6 pt-4 border-t border-foreground/5 flex items-end justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display font-black text-2xl md:text-3xl transition-colors duration-500 text-[var(--c)]">
                          {step.metric}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {step.metricLabel}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "h-[2px] w-12 md:w-16 rounded-full transition-all duration-500",
                          isActive
                            ? "bg-[linear-gradient(90deg,var(--c),color-mix(in_srgb,var(--c)_25%,transparent))] shadow-none"
                            : "bg-[color-mix(in_srgb,var(--c)_8%,transparent)]",
                        )}
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
            className="inline-flex items-center gap-2 text-foreground font-semibold text-sm btn-primary"
          >
            <Sparkles size={15} />
            Get Early Access to LAIE
            <ArrowRight size={14} />
          </a>
          <p className="text-[11px] text-muted-foreground">
            Included in all waitlist signups · No extra cost during early access
          </p>
        </div>
      </div>
    </section>
  );
}

export default LaieShowcase;
