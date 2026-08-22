"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Globe,
  Users,
  Zap,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Activity,
  Terminal,
  Star,
  Quote,
} from "lucide-react";

const pillars = [
  {
    id: "growth",
    icon: Globe,
    color: "var(--color-brand-purple)",
    title: "Websites, SEO & Campaigns",
    desc: "From custom Next.js applications to targeted Meta + Google Ads. We build high-performance digital assets that rank on search engines and convert cold traffic into booked appointments.",
    tags: ["Next.js", "Technical SEO", "Google/Meta Ads"],
  },
  {
    id: "crm",
    icon: Users,
    color: "var(--color-accent)",
    title: "Sales CRM & Lead Pipeline",
    desc: "A full Kanban CRM equipped with algorithmic lead scoring, custom stages, activity logs, and revenue forecasting. Replaces disjointed third-party tools with one integrated, blazing-fast system.",
    tags: ["Kanban Board", "Lead Scoring", "Revenue Forecast"],
  },
  {
    id: "automation",
    icon: Zap,
    color: "var(--color-success)",
    title: "WhatsApp & Automations",
    desc: "Send WhatsApp templates via Meta Cloud API, auto-schedule Google Meet consultations, and fire intelligent AWS SES email campaigns using our powerful 20+ trigger automation engine.",
    tags: ["WhatsApp Inbox", "Google Meet", "AWS SES Campaigns"],
  },
  {
    id: "saas",
    icon: GitBranch,
    color: "var(--color-cat-meeting)",
    title: "True White-Label SaaS",
    desc: "We can deploy this entire infrastructure as a multi-tenant SaaS under your brand. Every client gets an isolated MongoDB database, dedicated API keys, and custom domain configuration.",
    tags: ["Multi-Tenant", "Isolated DB", "Custom Domains"],
  },
];

export function ProductSpotlight() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Intersection Observer to detect which left-side text block is in the center of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveStep(index);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Removed heavy GSAP animations for better performance

  return (
    <section
      ref={containerRef}
      id="product"
      className="relative bg-background border-t border-accent/15 min-h-full"
    >
      <div className="wrapper relative z-10 h-full">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="md:hidden pt-20 pb-10">
          <div className="pill mb-4">Enterprise Engine</div>
          <h2 className="text-4xl text-foreground font-display font-black tracking-tight leading-tight mb-4">
            Everything your <span className="grad-text">innovation</span> needs.
          </h2>
          <p className="text-muted-foreground text-lg">
            From your first landing page to a fully white-labeled multi-tenant
            SaaS product.
          </p>
        </div>

        <div className="flex flex-col md:flex-row relative h-full min-h-full">
          {/* LEFT: Scrolling Text Blocks */}
          <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col pb-[30vh] pt-0 md:pt-[20vh] relative">
            {/* Desktop Header */}
            <div className="hidden md:block mb-32 shrink-0 relative z-10">
              <div className="pill mb-5 border-foreground/[0.08] bg-foreground/[0.02]">
                Enterprise Engine
              </div>
              <h2 className="text-3xl sm:text-4xl text-foreground font-display font-black tracking-tight leading-[1.05] mb-5">
                Everything your <span className="grad-text">innovation</span>{" "}
                needs.
              </h2>
              <p className="text-muted-foreground text-base leading-relax max-w-[400px]">
                Four steps. Zero silos. We combine bespoke web development with
                a production-grade backend engine.
              </p>
            </div>

            {/* The Track Line */}
            <div className="hidden md:block absolute left-[-20px] top-[20vh] bottom-[30vh] w-[2px] bg-linear-to-b from-transparent via-foreground/5 to-transparent" />
            <div
              className="hidden md:block absolute left-[-20px] w-[2px] h-[100px] bg-accent shadow-[0_0_15px_var(--color-accent)] transition-all duration-700 ease-out rounded-full"
              style={{
                top: `calc(20vh + ${activeStep * 300}px + 100px)`,
              }}
            />

            {pillars.map((pillar, i) => {
              const isActive = activeStep === i;
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                    return;
                  }}
                  data-index={i}
                  style={{ "--c": pillar.color } as React.CSSProperties}
                  className={`step-block relative min-h-[50vh] flex flex-col justify-center py-10 px-8 transition-all duration-700 ease-out mb-10 ${isActive
                    ? "opacity-100 translate-x-[10px]"
                    : "opacity-25 translate-x-0"
                    } hover:border-[var(--c)]`}
                >
                  {/* Geometric Background & Border */}
                  <div
                    className={`absolute inset-0 border border-foreground/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-700 z-[-1] rounded-none ${isActive
                      ? "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-accent)_5%,transparent)_0%,color-mix(in_srgb,var(--color-brand-purple)_2%,transparent)_100%)]"
                      : "bg-transparent"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute inset-[1px] bg-surface rounded-none" />
                    )}
                  </div>

                  {isActive && (
                    <div
                      className="absolute inset-0 bg-accent/20 blur-[60px] opacity-20 z-[-2] pointer-events-none"
                      aria-hidden="true"
                    />
                  )}

                  <div className="w-14 h-14 flex items-center justify-center mb-8 transition-all duration-500 relative">
                    <div
                      className={`absolute inset-0 rounded-none ${isActive
                        ? "bg-[color-mix(in_srgb,var(--c)_8%,transparent)] border border-[color-mix(in_srgb,var(--c)_25%,transparent)]"
                        : "bg-foreground/[0.02] border border-foreground/5"
                        }`}
                    />
                    <Icon
                      size={26}
                      className={`relative z-10 ${isActive ? "text-[var(--c)]" : "text-muted-foreground"
                        }`}
                    />
                  </div>

                  <h3 className="text-3xl text-foreground font-display font-bold tracking-tight mb-5 relative z-10">
                    {pillar.title}
                  </h3>

                  <p className="text-muted-foreground text-[15px] leading-[1.8] mb-8 max-w-[420px] relative z-10">
                    {pillar.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 text-[11px] font-sans tracking-wider transition-colors duration-500 relative"
                      >
                        <div
                          className={`absolute inset-0 rounded-none ${isActive
                            ? "bg-foreground/5 border border-foreground/10"
                            : "bg-transparent border border-foreground/[0.03]"
                            }`}
                        />
                        <span className="relative z-10 text-accent">{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Sticky Visual Container */}
          <div className="hidden md:flex w-[55%] lg:w-[60%] sticky top-6 h-screen max-h-[900px] items-center justify-end pl-12 lg:pl-20 py-20 pointer-events-none self-start">
            <div className="relative w-full h-[600px] bg-linear-to-br from-elevated to-surface shadow-[0_0_80px_color-mix(in_srgb,var(--color-accent)_8%,transparent)] isolate p-px rounded-none">
              <div className="absolute inset-px bg-surface overflow-hidden rounded-none">
                {/* Premium Glow effect behind the container */}
                <div
                  className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent pointer-events-none -z-10"
                  aria-hidden="true"
                />

                <div className="absolute top-0 left-0 right-0 h-10 border-b border-foreground/5 bg-foreground/5 backdrop-blur-md flex items-center justify-between px-5 z-20">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-none bg-error opacity-80 shadow-[0_0_10px_var(--color-error)]" />
                    <div className="w-3 h-3 rounded-none bg-warning opacity-80 shadow-[0_0_10px_var(--color-warning)]" />
                    <div className="w-3 h-3 rounded-none bg-accent opacity-80 shadow-[0_0_10px_var(--color-accent)]" />
                  </div>
                  <div className="font-sans text-[10px] text-muted-foreground tracking-widest uppercase">
                    ECODrIx Workspace
                  </div>
                </div>

                {/* View 0: Web & SEO */}
                <VisualWrapper active={activeStep === 0}>
                  <div className="p-10 h-full flex flex-col pt-16 relative">
                    <div
                      className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-brand-purple)_5%,transparent)_0%,transparent_70%)] pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="flex justify-between items-end mb-10 relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse shadow-[0_0_10px_var(--color-brand-purple)]" />
                          <p className="text-brand-purple font-sans text-xs uppercase tracking-widest">
                            Live Metrics
                          </p>
                        </div>
                        <p className="text-foreground text-5xl font-display font-bold tabular-nums tracking-tight">
                          <MetricCounter
                            value={142590}
                            active={activeStep === 0}
                          />
                        </p>
                        <p className="text-muted-foreground text-sm mt-1 uppercase tracking-widest">
                          Organic Visitors / mo
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-sans flex items-center gap-1 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-purple)_20%,transparent)]">
                          <Activity size={12} /> +24.8%
                        </span>
                      </div>
                    </div>
                    {/* Fake Code / Traffic Graph */}
                    <div className="flex-1 border border-foreground/5 bg-elevated/50 backdrop-blur-sm rounded-none flex items-end p-6 gap-4 relative z-10 shadow-[inset_0_0_40px_color-mix(in_srgb,var(--color-brand-purple)_2%,transparent)]">
                      <AnimatedBars active={activeStep === 0} />
                    </div>
                  </div>
                </VisualWrapper>

                {/* View 1: CRM Kanban */}
                <VisualWrapper active={activeStep === 1}>
                  <div className="p-8 h-full pt-20 flex gap-5 overflow-hidden bg-[radial-gradient(ellipse_at_bottom_right,color-mix(in_srgb,var(--color-accent)_10%,transparent),transparent_50%)]">
                    {/* Column 1 */}
                    <div className="flex-1 bg-foreground/[0.02] backdrop-blur-md p-5 border border-foreground/5 flex flex-col gap-4 shadow-[inset_0_0_20px_color-mix(in_srgb,var(--color-foreground)_1%,transparent)] h-max pb-10 relative z-10 rounded-none">
                      <div className="flex items-center justify-between">
                        <p className="text-accent font-sans text-[11px] font-semibold uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
                          Inbound
                        </p>
                        <span className="text-muted-foreground text-xs font-sans bg-foreground/5 px-2 py-0.5 rounded">
                          2
                        </span>
                      </div>
                      {/* Cards */}
                      <AnimatedKanbanCard
                        title="Dr. Sharma Clinic"
                        source="Website Inquiry"
                        score={85}
                        active={activeStep === 1}
                        delay={0.1}
                        color="var(--color-accent)"
                      />
                      <AnimatedKanbanCard
                        title="Apollo Diagnostics"
                        source="Meta Ad Lead"
                        score={40}
                        active={activeStep === 1}
                        delay={0.3}
                        color="var(--color-cat-email)"
                        dim
                      />
                    </div>
                    {/* Column 2 */}
                    <div className="flex-1 bg-foreground/[0.02] backdrop-blur-md p-5 border border-foreground/5 flex flex-col gap-4 shadow-[inset_0_0_20px_color-mix(in_srgb,var(--color-foreground)_1%,transparent)] h-max mt-6 pb-12 relative z-10 rounded-none">
                      <div className="flex items-center justify-between">
                        <p className="text-brand-purple font-sans text-[11px] font-semibold uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple shadow-[0_0_8px_var(--color-brand-purple)]" />
                          Consulted
                        </p>
                        <span className="text-muted-foreground text-xs font-sans bg-foreground/5 px-2 py-0.5 rounded">
                          1
                        </span>
                      </div>
                      {/* Cards */}
                      <AnimatedKanbanCard
                        title="City Health"
                        source="Proposal Sent"
                        score={92}
                        active={activeStep === 1}
                        delay={0.5}
                        color="var(--color-cat-automation)"
                      />
                    </div>
                  </div>
                </VisualWrapper>

                {/* View 2: Automation Trigger Code */}
                <VisualWrapper active={activeStep === 2}>
                  <div className="p-0 h-full flex flex-col pt-12 bg-[radial-gradient(ellipse_at_bottom_right,color-mix(in_srgb,var(--color-accent)_10%,transparent),transparent_50%)]">
                    <div className="px-6 py-3 border-b border-foreground/5 bg-surface flex items-center gap-3">
                      <div className="px-2 py-1 bg-success/10 text-success rounded text-[10px] font-sans font-bold">
                        POST
                      </div>
                      <p className="text-muted-foreground font-sans text-xs">
                        api/v1/workflows/trigger
                      </p>
                    </div>
                    <div className="flex-1 relative p-8 font-sans text-sm leading-[1.8] overflow-hidden bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-success)_3%,transparent)_0%,transparent_100%)]">
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-background border-r border-foreground/5 flex flex-col items-center py-8 text-[11px] text-muted-foreground gap-2 select-none">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <span key={i}>{i + 1}</span>
                        ))}
                      </div>
                      <div className="pl-6">
                        <span className="text-brand-purple">await</span>{" "}
                        <span className="text-brand-purple">ECOD</span>.
                        <span className="text-warning">trigger</span>({"{"}
                        <br />
                        &nbsp;&nbsp;
                        <span className="text-muted-foreground">
                          event:
                        </span>{" "}
                        <span className="text-success">
                          &apos;appointment.confirmed&apos;
                        </span>
                        ,<br />
                        &nbsp;&nbsp;
                        <span className="text-muted-foreground">
                          payload:
                        </span>{" "}
                        {"{"}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-muted-foreground">
                          contact:
                        </span>{" "}
                        <span className="text-success">
                          &apos;+91 98765 43210&apos;
                        </span>
                        ,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-muted-foreground">
                          name:
                        </span>{" "}
                        <span className="text-success">
                          &apos;Dr. Sharma&apos;
                        </span>
                        <br />
                        &nbsp;&nbsp;{"}"},<br />
                        &nbsp;&nbsp;
                        <span className="text-muted-foreground">
                          actions:
                        </span>{" "}
                        [<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-success">
                          &apos;generate_meet_link&apos;
                        </span>
                        ,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-success">
                          &apos;send_whatsapp_template&apos;
                        </span>
                        <br />
                        &nbsp;&nbsp;]
                        <br />
                        {"}"});
                        <br />
                        <span className="inline-block w-2.5 h-4 bg-brand-purple animate-pulse mt-1 shadow-[0_0_8px_var(--color-brand-purple)]" />
                      </div>

                      {/* Floating Execution Toast */}
                      <AutomationSequence active={activeStep === 2} />
                    </div>
                  </div>
                </VisualWrapper>

                {/* View 3: SaaS Provisioning */}
                <VisualWrapper active={activeStep === 3}>
                  <div className="p-8 h-full pt-20 flex flex-col bg-surface relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col items-center justify-center mb-10 relative z-10 text-center">
                      <div
                        className="absolute w-32 h-32 bg-brand-purple/20 rounded-full blur-2xl pointer-events-none"
                        aria-hidden="true"
                      />
                      <div className="w-16 h-16 rounded-none bg-linear-to-br from-brand-purple to-accent p-px mb-4 shadow-[0_0_30px_rgba(244,114,182,0.3)]">
                        <div className="w-full h-full bg-foreground rounded-none flex items-center justify-center">
                          <GitBranch size={24} className="text-[var(--color-cat-meeting)]" />
                        </div>
                      </div>
                      <p className="text-foreground font-display text-xl font-bold tracking-tight">
                        Tenant Architecture
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        us-east-1 (N. Virginia)
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-1 relative z-10">
                      {[
                        {
                          l: "Isolated RLS Database",
                          v: "Postgre SQL",
                          c: "var(--color-brand-purple)",
                          icon: <Globe size={14} />,
                        },
                        {
                          l: "API Auth",
                          v: "sk_live_9f8a...",
                          c: "var(--color-accent)",
                          icon: <GitBranch size={14} />,
                        },
                        {
                          l: "Custom Domain",
                          v: "app.client.com",
                          c: "var(--color-brand-purple)",
                          icon: <Globe size={14} />,
                        },
                        {
                          l: "Edge Functions",
                          v: "Deployed",
                          c: "var(--color-accent)",
                          icon: <Zap size={14} />,
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          style={{ "--c": item.c } as React.CSSProperties}
                          className="bg-elevated/60 backdrop-blur-md border border-foreground/5 p-4 flex flex-col justify-center relative overflow-hidden group hover:border-foreground/10 transition-colors rounded-none"
                        >
                          <div className="absolute -right-4 -top-4 w-12 h-12 bg-foreground/5 rounded-full blur-[10px] group-hover:bg-foreground/10 transition-colors" />
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-muted-foreground">
                              {item.icon}
                            </div>
                            <p className="text-muted-foreground text-xs font-sans">
                              {item.l}
                            </p>
                          </div>
                          <p className="font-sans text-[13px] tracking-wide text-[var(--c)]">
                            {item.v}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 relative z-10">
                      <button className="w-full relative overflow-hidden bg-linear-to-br from-accent to-brand-purple text-accent-foreground border-none py-4 font-sans text-[13px] hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-accent)_50%,transparent)] transition-all font-bold group cursor-pointer rounded-none">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Deploy New Tenant{" "}
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </span>
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out z-0" />
                      </button>
                    </div>
                  </div>
                </VisualWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper to cross-fade visuals without unmounting
function VisualWrapper({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${active ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
    >
      {children}
    </div>
  );
}

function MetricCounter({ value, active }: { value: number; active: boolean }) {
  // Simplified counter - no heavy GSAP animation
  return <>{active ? value.toLocaleString() : "0"}</>;
}

function AnimatedBars({ active }: { active: boolean }) {
  const heights = [30, 45, 25, 60, 40, 75, 55, 90, 85, 100];

  // Simplified bars - no heavy GSAP animation
  return (
    <>
      {heights.map((h, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end group h-full">
          <div
            className="w-full bg-linear-to-t from-brand-purple/5 to-brand-purple/60 rounded-t-sm transition-[height] duration-500 ease-out group-hover:to-brand-purple relative opacity-80 group-hover:opacity-100"
            style={{ height: active ? `${h}%` : "0%" }}
          >
            <div className="w-full h-[2px] bg-brand-purple shadow-[0_0_10px_var(--color-brand-purple)] absolute top-0" />
          </div>
        </div>
      ))}
    </>
  );
}

function AnimatedKanbanCard({
  title,
  source,
  score,
  active,
  delay = 0,
  color = "var(--color-accent)",
  dim = false,
}: {
  title: string;
  source: string;
  score: number;
  active: boolean;
  delay?: number;
  color?: string;
  dim?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Simplified animation - no heavy GSAP
  return (
    <div
      ref={cardRef}
      style={{ "--c": color } as React.CSSProperties}
      className={`bg-elevated p-5 border border-foreground/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative cursor-default hover:-translate-y-1 group rounded-none transition-all duration-500 ease-out ${active ? (dim ? "opacity-50" : "opacity-100") : "opacity-30"
        } ${active ? "translate-x-0" : "-translate-x-[20px]"}`}
    >
      <div className="w-8 h-8 absolute -top-3 -right-3 flex items-center justify-center border-4 border-elevated transition-all group-hover:scale-110 rounded-none bg-[linear-gradient(135deg,var(--c),color-mix(in_srgb,var(--c)_85%,transparent))] shadow-[0_0_20px_color-mix(in_srgb,var(--c)_25%,transparent)]">
        <span className="text-foreground text-[10px] font-bold">{score}</span>
      </div>
      <p className="text-foreground text-[13px] font-semibold mb-1">{title}</p>
      <p className="text-muted-foreground text-[11px] mb-4 flex items-center gap-1.5">
        <Globe size={12} /> {source}
      </p>
      <div className="w-full bg-foreground h-1.5 mb-1 overflow-hidden rounded-none">
        <div
          className="h-full bg-[var(--c)] shadow-[0_0_10px_color-mix(in_srgb,var(--color-foreground)_10%,transparent)] transition-all duration-1000 ease-out"
          style={{ width: active ? `${score}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function AutomationSequence({ active }: { active: boolean }) {
  const [stages, setStages] = useState([false, false, false]);

  useEffect(() => {
    if (active) {
      const timers = [
        setTimeout(() => setStages([true, false, false]), 800),
        setTimeout(() => setStages([true, true, false]), 1800),
        setTimeout(() => setStages([true, true, true]), 2800),
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      setStages([false, false, false]);
    }
  }, [active]);

  return (
    <div className="absolute bottom-8 right-8 bg-elevated/90 backdrop-blur-md p-5 rounded-none border border-foreground/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4 min-w-[220px]">
      <div
        className={`flex items-center gap-3 transition-all duration-500 ${stages[0] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      >
        <CheckCircle2
          size={16}
          className="text-success drop-shadow-[0_0_5px_var(--color-success)]"
        />
        <span className="text-foreground text-xs font-sans">
          Meet link generated
        </span>
      </div>
      <div
        className={`flex items-center gap-3 transition-all duration-500 delay-200 ${stages[1] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      >
        <CheckCircle2
          size={16}
          className="text-success drop-shadow-[0_0_5px_var(--color-success)]"
        />
        <span className="text-foreground text-xs font-sans">
          WhatsApp message sent
        </span>
      </div>
      <div
        className={`flex items-center gap-3 transition-all duration-500 delay-500 ${stages[2] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      >
        {!stages[2] ? (
          <div className="w-4 h-4 rounded-full border-2 border-brand-purple border-t-transparent animate-spin shadow-[0_0_10px_var(--color-brand-purple)]" />
        ) : (
          <CheckCircle2
            size={16}
            className="text-success drop-shadow-[0_0_5px_var(--color-success)]"
          />
        )}
        <span className="text-foreground text-xs font-sans">
          {stages[2] ? "CRM Record Updated" : "Updating CRM record..."}
        </span>
      </div>
    </div>
  );
}
