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
    color: "#22D3EE",
    title: "Websites, SEO & Campaigns",
    desc: "From custom Next.js applications to targeted Meta + Google Ads. We build high-performance digital assets that rank on search engines and convert cold traffic into booked appointments.",
    tags: ["Next.js", "Technical SEO", "Google/Meta Ads"],
  },
  {
    id: "crm",
    icon: Users,
    color: "#7C6EFA",
    title: "Sales CRM & Lead Pipeline",
    desc: "A full Kanban CRM equipped with algorithmic lead scoring, custom stages, activity logs, and revenue forecasting. Replaces disjointed third-party tools with one integrated, blazing-fast system.",
    tags: ["Kanban Board", "Lead Scoring", "Revenue Forecast"],
  },
  {
    id: "automation",
    icon: Zap,
    color: "#4ADE80",
    title: "WhatsApp & Automations",
    desc: "Send WhatsApp templates via Meta Cloud API, auto-schedule Google Meet consultations, and fire intelligent AWS SES email campaigns using our powerful 20+ trigger automation engine.",
    tags: ["WhatsApp Inbox", "Google Meet", "AWS SES Campaigns"],
  },
  {
    id: "saas",
    icon: GitBranch,
    color: "#F472B6",
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

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            once: true,
          },
        },
      );
    }, containerRef);

    // Initial refresh to handle already-scrolled states
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="product"
      className="relative bg-background border-t border-[rgba(124,110,250,0.15)] min-h-full"
    >
      <div className="wrapper relative z-10 h-full">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="md:hidden pt-20 pb-10">
          <div className="pill mb-4">Enterprise Engine</div>
          <h2 className="text-4xl text-white font-display font-black tracking-tight leading-tight mb-4">
            Everything your <span className="grad-text">innovation</span> needs.
          </h2>
          <p className="text-[#64647A] text-lg">
            From your first landing page to a fully white-labeled multi-tenant
            SaaS product.
          </p>
        </div>

        <div className="flex flex-col md:flex-row relative h-full min-h-full">
          {/* LEFT: Scrolling Text Blocks */}
          <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col pb-[30vh] pt-0 md:pt-[20vh] relative">
            {/* Desktop Header */}
            <div className="hidden md:block mb-32 shrink-0 relative z-10">
              <div className="pill mb-5 border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
                Enterprise Engine
              </div>
              <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] text-white font-display font-black tracking-tight leading-[1.05] mb-5">
                Everything your <span className="grad-text">innovation</span>{" "}
                needs.
              </h2>
              <p className="text-[#64647A] text-[clamp(1rem,1.5vw,1.1rem)] leading-relax max-w-[400px]">
                Four steps. Zero silos. We combine bespoke web development with
                a production-grade backend engine.
              </p>
            </div>

            {/* The Track Line */}
            <div className="hidden md:block absolute left-[-20px] top-[20vh] bottom-[30vh] w-[2px] bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.05)] to-transparent" />
            <div
              className="hidden md:block absolute left-[-20px] w-[2px] bg-primary shadow-[0_0_15px_var(--color-primary)] transition-all duration-700 ease-out rounded-full"
              style={{
                top: `calc(20vh + ${activeStep * 300}px + 100px)`,
                height: "100px",
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
                  className="step-block relative min-h-[50vh] flex flex-col justify-center py-10 px-8 transition-all duration-700 ease-out mb-10"
                  style={{
                    opacity: isActive ? 1 : 0.25,
                    transform: isActive ? "translateX(10px)" : "translateX(0)",
                  }}
                >
                  {/* Geometric Background & Border (Polygon Brand Style) */}
                  <div
                    className="absolute inset-0 bg-background border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-700 z-[-1]"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(124,110,250,0.05) 0%, rgba(34,211,238,0.02) 100%)"
                        : "transparent",
                    }}
                  >
                    {isActive && (
                      <div
                        className="absolute inset-[1px] bg-[#0A0A10]"
                        style={{
                          clipPath:
                            "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                        }}
                      />
                    )}
                  </div>

                  {isActive && (
                    <div className="absolute inset-0 bg-primary/20 blur-[60px] opacity-20 z-[-2] pointer-events-none" />
                  )}

                  <div className="w-14 h-14 flex items-center justify-center mb-8 transition-all duration-500 relative">
                    <div
                      className="absolute inset-0 bg-white/5 border border-white/10"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                        background: isActive
                          ? `${pillar.color}15`
                          : "rgba(255,255,255,0.02)",
                        borderColor: isActive
                          ? `${pillar.color}40`
                          : "rgba(255,255,255,0.05)",
                      }}
                    />
                    <Icon
                      size={26}
                      color={isActive ? pillar.color : "#64647A"}
                      className="relative z-10"
                    />
                  </div>

                  <h3 className="text-3xl text-white font-display font-bold tracking-tight mb-5 relative z-10">
                    {pillar.title}
                  </h3>

                  <p className="text-[#A8A8B3] text-[15px] leading-[1.8] mb-8 max-w-[420px] relative z-10">
                    {pillar.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 text-[11px] font-mono tracking-wider transition-colors duration-500 relative"
                      >
                        <div
                          className="absolute inset-0 border border-white/5"
                          style={{
                            clipPath:
                              "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                            background: isActive
                              ? "rgba(255,255,255,0.05)"
                              : "transparent",
                            borderColor: isActive
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(255,255,255,0.03)",
                          }}
                        />
                        <span
                          className="relative z-10"
                          style={{ color: isActive ? "#E0E0F0" : "#64647A" }}
                        >
                          {tag}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Sticky Visual Container */}
          <div className="hidden md:flex w-[55%] lg:w-[60%] sticky top-6 h-screen max-h-[900px] items-center justify-end pl-12 lg:pl-20 py-20 pointer-events-none self-start">
            <div
              className="relative w-full h-[600px] bg-linear-to-br from-[#1C1A27] to-[#0A0A10] shadow-[0_0_80px_rgba(124,110,250,0.08)] isolate p-px"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)",
              }}
            >
              <div
                className="absolute inset-px bg-[#0A0A10] overflow-hidden"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)",
                }}
              >
                {/* Premium Glow effect behind the container */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent pointer-events-none -z-10" />

                <div className="absolute top-0 left-0 right-0 h-10 border-b border-[rgba(255,255,255,0.05)] bg-white/5 backdrop-blur-md flex items-center justify-between px-5 z-20">
                  <div className="flex gap-2">
                    <div
                      className="w-3 h-3 bg-[#EF4444] opacity-80 shadow-[0_0_10px_#EF4444]"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%)",
                      }}
                    />
                    <div
                      className="w-3 h-3 bg-[#EAB308] opacity-80 shadow-[0_0_10px_#EAB308]"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%)",
                      }}
                    />
                    <div
                      className="w-3 h-3 bg-primary opacity-80 shadow-[0_0_10px_var(--color-primary)]"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%)",
                      }}
                    />
                  </div>
                  <div className="font-mono text-[10px] text-[#64647A] tracking-widest uppercase">
                    ECODrIx Workspace
                  </div>
                </div>

                {/* View 0: Web & SEO */}
                <VisualWrapper active={activeStep === 0}>
                  <div className="p-10 h-full flex flex-col pt-16 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)] pointer-events-none" />
                    <div className="flex justify-between items-end mb-10 relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse shadow-[0_0_10px_#22D3EE]" />
                          <p className="text-[#22D3EE] font-mono text-xs uppercase tracking-widest">
                            Live Metrics
                          </p>
                        </div>
                        <p className="text-white text-5xl font-display font-bold tabular-nums tracking-tight">
                          <MetricCounter
                            value={142590}
                            active={activeStep === 0}
                          />
                        </p>
                        <p className="text-[#64647A] text-sm mt-1 uppercase tracking-widest">
                          Organic Visitors / mo
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="px-3 py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-xs font-mono flex items-center gap-1 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                          <Activity size={12} /> +24.8%
                        </span>
                      </div>
                    </div>
                    {/* Fake Code / Traffic Graph */}
                    <div className="flex-1 border border-white/5 bg-[#11111A]/50 backdrop-blur-sm rounded-2xl flex items-end p-6 gap-4 relative z-10 shadow-[inner_0_0_40px_rgba(34,211,238,0.02)]">
                      <AnimatedBars active={activeStep === 0} />
                    </div>
                  </div>
                </VisualWrapper>

                {/* View 1: CRM Kanban */}
                <VisualWrapper active={activeStep === 1}>
                  <div className="p-8 h-full pt-20 flex gap-5 overflow-hidden bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,110,250,0.1),transparent_50%)]">
                    {/* Column 1 */}
                    <div
                      className="flex-1 bg-white/[0.02] backdrop-blur-md p-5 border border-white/5 flex flex-col gap-4 shadow-[inset_0_0_20px_rgba(255,255,255,0.01)] h-max pb-10 relative z-10"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[#7C6EFA] font-mono text-[11px] font-semibold uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7C6EFA] shadow-[0_0_8px_#7C6EFA]" />
                          Inbound
                        </p>
                        <span className="text-[#64647A] text-xs font-mono bg-white/5 px-2 py-0.5 rounded">
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
                        color="#7C6EFA"
                      />
                      <AnimatedKanbanCard
                        title="Apollo Diagnostics"
                        source="Meta Ad Lead"
                        score={40}
                        active={activeStep === 1}
                        delay={0.3}
                        color="#FB923C"
                        dim
                      />
                    </div>
                    {/* Column 2 */}
                    <div
                      className="flex-1 bg-white/[0.02] backdrop-blur-md p-5 border border-white/5 flex flex-col gap-4 shadow-[inset_0_0_20px_rgba(255,255,255,0.01)] h-max mt-6 pb-12 relative z-10"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-cyan font-mono text-[11px] font-semibold uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
                          Consulted
                        </p>
                        <span className="text-[#64647A] text-xs font-mono bg-white/5 px-2 py-0.5 rounded">
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
                        color="#22D3EE"
                      />
                    </div>
                  </div>
                </VisualWrapper>

                {/* View 2: Automation Trigger Code */}
                <VisualWrapper active={activeStep === 2}>
                  <div className="p-0 h-full flex flex-col pt-12 bg-black">
                    <div className="px-6 py-3 border-b border-white/5 bg-[#0D0D14] flex items-center gap-3">
                      <div className="px-2 py-1 bg-[#4ADE80]/10 text-[#4ADE80] rounded text-[10px] font-mono font-bold">
                        POST
                      </div>
                      <p className="text-[#A8A8B3] font-mono text-xs">
                        api/v1/workflows/trigger
                      </p>
                    </div>
                    <div className="flex-1 relative p-8 font-mono text-sm leading-[1.8] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.03)_0%,transparent_100%)]">
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#0a0a0f] border-r border-white/5 flex flex-col items-center py-8 text-[11px] text-[#444] gap-2 select-none">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <span key={i}>{i + 1}</span>
                        ))}
                      </div>
                      <div className="pl-6">
                        <span className="text-[#F472B6]">await</span>{" "}
                        <span className="text-[#22D3EE]">ECOD</span>.
                        <span className="text-[#EAB308]">trigger</span>({"{"}
                        <br />
                        &nbsp;&nbsp;
                        <span className="text-[#A8A8B3]">event:</span>{" "}
                        <span className="text-[#4ADE80]">
                          &apos;appointment.confirmed&apos;
                        </span>
                        ,<br />
                        &nbsp;&nbsp;
                        <span className="text-[#A8A8B3]">payload:</span> {"{"}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-[#A8A8B3]">contact:</span>{" "}
                        <span className="text-[#4ADE80]">
                          &apos;+91 98765 43210&apos;
                        </span>
                        ,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-[#A8A8B3]">name:</span>{" "}
                        <span className="text-[#4ADE80]">
                          &apos;Dr. Sharma&apos;
                        </span>
                        <br />
                        &nbsp;&nbsp;{"}"},<br />
                        &nbsp;&nbsp;
                        <span className="text-[#A8A8B3]">actions:</span> [<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-[#4ADE80]">
                          &apos;generate_meet_link&apos;
                        </span>
                        ,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-[#4ADE80]">
                          &apos;send_whatsapp_template&apos;
                        </span>
                        <br />
                        &nbsp;&nbsp;]
                        <br />
                        {"}"});
                        <br />
                        <span className="inline-block w-2.5 h-4 bg-[#22D3EE] animate-pulse mt-1 shadow-[0_0_8px_#22D3EE]" />
                      </div>

                      {/* Floating Execution Toast */}
                      <AutomationSequence active={activeStep === 2} />
                    </div>
                  </div>
                </VisualWrapper>

                {/* View 3: SaaS Provisioning */}
                <VisualWrapper active={activeStep === 3}>
                  <div className="p-8 h-full pt-20 flex flex-col bg-[#0D0D14] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                    <div className="flex flex-col items-center justify-center mb-10 relative z-10 text-center">
                      <div className="absolute w-32 h-32 bg-[#F472B6]/20 rounded-full blur-2xl pointer-events-none" />
                      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#F472B6] to-[#7C6EFA] p-px mb-4 shadow-[0_0_30px_rgba(244,114,182,0.3)]">
                        <div className="w-full h-full bg-[#111] rounded-2xl flex items-center justify-center">
                          <GitBranch size={24} color="#F472B6" />
                        </div>
                      </div>
                      <p className="text-white font-display text-xl font-bold tracking-tight">
                        Tenant Architecture
                      </p>
                      <p className="text-[#64647A] text-sm mt-1">
                        us-east-1 (N. Virginia)
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-1 relative z-10">
                      {[
                        {
                          l: "Isolated DB",
                          v: "MongoDB Cluster",
                          c: "var(--color-cyan)",
                          icon: <Globe size={14} />,
                        },
                        {
                          l: "API Auth",
                          v: "sk_live_9f8a...",
                          c: "var(--color-primary)",
                          icon: <GitBranch size={14} />,
                        },
                        {
                          l: "Custom Domain",
                          v: "app.client.com",
                          c: "var(--color-cyan)",
                          icon: <Globe size={14} />,
                        },
                        {
                          l: "Edge Functions",
                          v: "Deployed",
                          c: "var(--color-primary)",
                          icon: <Zap size={14} />,
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="bg-[#1A1A24]/60 backdrop-blur-md border border-white/5 p-4 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors"
                          style={{
                            clipPath:
                              "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
                          }}
                        >
                          <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/5 rounded-full blur-[10px] group-hover:bg-white/10 transition-colors" />
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-[#A8A8B3]">{item.icon}</div>
                            <p className="text-[#A8A8B3] text-xs font-mono">
                              {item.l}
                            </p>
                          </div>
                          <p
                            className="font-mono text-[13px] tracking-wide"
                            style={{ color: item.c }}
                          >
                            {item.v}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 relative z-10">
                      <button
                        className="w-full relative overflow-hidden bg-gradient-to-br from-primary to-cyan text-white border-none py-4 font-mono text-[13px] hover:shadow-[0_0_30px_rgba(124,110,250,0.5)] transition-all font-bold group cursor-pointer"
                        style={{
                          clipPath:
                            "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Deploy New Tenant{" "}
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out z-0" />
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
      className="absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none"
      style={{ opacity: active ? 1 : 0, zIndex: active ? 10 : 0 }}
    >
      {children}
    </div>
  );
}

function MetricCounter({ value, active }: { value: number; active: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef({ val: 0 });

  useEffect(() => {
    if (active) {
      gsap.to(countRef.current, {
        val: value,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => setDisplayValue(Math.floor(countRef.current.val)),
      });
    } else {
      countRef.current.val = 0;
      setDisplayValue(0);
    }
  }, [active, value]);

  return <>{displayValue.toLocaleString()}</>;
}

function AnimatedBars({ active }: { active: boolean }) {
  const heights = [30, 45, 25, 60, 40, 75, 55, 90, 85, 100];
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (active) {
      gsap.fromTo(
        barRefs.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          stagger: 0.05,
          ease: "elastic.out(1, 0.5)",
          transformOrigin: "bottom",
        },
      );
    }
  }, [active]);

  return (
    <>
      {heights.map((h, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end group h-full">
          <div
            ref={(el) => {
              barRefs.current[i] = el;
            }}
            className="w-full bg-linear-to-t from-[#22D3EE]/5 to-[#22D3EE]/60 rounded-t-sm transition-all duration-300 group-hover:to-[#22D3EE] relative opacity-80 group-hover:opacity-100"
            style={{ height: `${h}%` }}
          >
            <div className="w-full h-[2px] bg-[#22D3EE] shadow-[0_0_10px_#22D3EE] absolute top-0" />
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
  color = "#7C6EFA",
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
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: dim ? 0.5 : 1,
          x: 0,
          duration: 0.6,
          delay,
          ease: "power2.out",
        },
      );
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: `${score}%`,
          duration: 1.5,
          delay: delay + 0.3,
          ease: "power2.out",
        },
      );
    }
  }, [active, delay, score, dim]);

  return (
    <div
      ref={cardRef}
      className="bg-[#1A1A24] p-5 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative cursor-default hover:-translate-y-1 transition-transform group"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
        opacity: 0,
      }}
    >
      <div
        className="w-8 h-8 absolute -top-3 -right-3 flex items-center justify-center border-4 border-[#1A1A24] shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all group-hover:scale-110"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          boxShadow: `0 0 20px ${color}40`,
        }}
      >
        <span className="text-white text-[10px] font-bold">{score}</span>
      </div>
      <p className="text-white text-[13px] font-semibold mb-1">{title}</p>
      <p className="text-[#64647A] text-[11px] mb-4 flex items-center gap-1.5">
        <Globe size={12} /> {source}
      </p>
      <div
        className="w-full bg-[#111] h-1.5 mb-1 overflow-hidden"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 2px), calc(100% - 2px) 100%, 0 100%)",
        }}
      >
        <div
          ref={progressRef}
          className="h-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
          style={{ background: color, width: "0%" }}
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
    <div className="absolute bottom-8 right-8 bg-[#1A1A24]/90 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4 min-w-[220px]">
      <div
        className={`flex items-center gap-3 transition-all duration-500 ${stages[0] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      >
        <CheckCircle2
          size={16}
          color="#4ADE80"
          className="drop-shadow-[0_0_5px_#4ADE80]"
        />
        <span className="text-white text-xs font-sans">
          Meet link generated
        </span>
      </div>
      <div
        className={`flex items-center gap-3 transition-all duration-500 delay-200 ${stages[1] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      >
        <CheckCircle2
          size={16}
          color="#4ADE80"
          className="drop-shadow-[0_0_5px_#4ADE80]"
        />
        <span className="text-white text-xs font-sans">
          WhatsApp message sent
        </span>
      </div>
      <div
        className={`flex items-center gap-3 transition-all duration-500 delay-500 ${stages[2] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      >
        {!stages[2] ? (
          <div className="w-4 h-4 rounded-full border-2 border-[#22D3EE] border-t-transparent animate-spin shadow-[0_0_10px_#22D3EE]" />
        ) : (
          <CheckCircle2
            size={16}
            color="#4ADE80"
            className="drop-shadow-[0_0_5px_#4ADE80]"
          />
        )}
        <span className="text-white text-xs font-sans">
          {stages[2] ? "CRM Record Updated" : "Updating CRM record..."}
        </span>
      </div>
    </div>
  );
}
