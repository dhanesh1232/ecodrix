"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, Activity, Zap, Globe } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "Nirvisham Clinic",
    category: "Healthcare Automation",
    tag: "WhatsApp CRM",
    description:
      "Built a highly resilient appointment automation system. Integrated WhatsApp confirmations, dynamic Google Meet generation, and a centralized CRM pipeline to handle operations with zero manual follow-ups.",
    techTags: ["ECODrIx Engine", "Meta API", "Google Meet"],
    color: "var(--color-primary)",
    icon: <Activity size={20} />,
    stat: "42+ Daily Bookings",
    link: "#",
  },
  {
    num: "02",
    title: "Phoenix Export Business",
    category: "Global Supply Chain",
    tag: "Enterprise Portal",
    description:
      "Architected a secure, multi-tenant supplier and vendor dashboard. Enabling real-time tracking of international shipments, automated invoicing, and complex tiered access controls across borders.",
    techTags: ["Next.js 15", "PostgreSQL", "Edge Functions"],
    color: "var(--color-cyan)",
    icon: <Globe size={20} />,
    stat: "12 Countries Active",
    link: "#",
  },
  {
    num: "03",
    title: "The Pathfinder Agency",
    category: "Digital Design Studio",
    tag: "Immersive Web Experience",
    description:
      "Engineered a high-performance, visually striking interactive portfolio. Leveraged advanced WebGL, deeply nested GSAP timelines, and bespoke scroll kinematics to secure an absolute premium feel.",
    techTags: ["React Fiber", "GSAP 3", "Tailwind CSS"],
    color: "var(--color-magenta)",
    icon: <Zap size={20} />,
    stat: "Awwwards Nominee",
    link: "#",
  },
];

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".w-head > *", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".w-head", start: "top 85%" },
        });
        gsap.from(".w-card", {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".w-list", start: "top 80%" },
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 overflow-hidden bg-background"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-1/2 -top-[200px] -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="wrapper relative z-10 max-w-7xl mx-auto">
        <div className="w-head mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="pill mb-6">Our Work</div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] text-white font-display font-black tracking-tight leading-[1.05]">
              Projects we&apos;re{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan">
                proud of.
              </span>
            </h2>
          </div>
          <p className="text-[#A8A8B3] text-lg leading-relaxed max-w-sm mb-2">
            Real clients. Measurable results. Discover how we engineer
            completely bespoke digital solutions.
          </p>
        </div>

        {/* Project Grid / List */}
        <div className="w-list grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="w-card group relative p-px rounded-bl-3xl isolate transition-transform duration-500 hover:-translate-y-2 h-full flex flex-col"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))"
              }}
            >
              {/* Inner Background for 1px Border effect */}
              <div
                className="relative flex-1 bg-[#0A0A10] overflow-hidden flex flex-col transition-colors duration-500 group-hover:bg-[#11111A]"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
                }}
              >
                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${p.color}, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="p-8 lg:p-10 flex-1 flex flex-col relative z-10 h-full">
                  <div className="flex justify-between items-start mb-8">
                    <span
                      className="font-mono text-[11px] font-bold tracking-widest px-3 py-1.5 rounded-sm bg-white/5 border border-white/10"
                      style={{ color: p.color }}
                    >
                      {p.num} :: {p.category}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-xl"
                      style={{ color: p.color }}
                    >
                      {p.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                    {p.title}
                  </h3>

                  <p className="text-[#888899] text-sm leading-relaxed mb-8 flex-1">
                    {p.description}
                  </p>

                  <div className="flex flex-col gap-6 mt-auto">
                    {/* Tech & Stat */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-6">
                      <div className="flex flex-wrap gap-2">
                        {p.techTags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono text-[#64647A] px-2 py-1 bg-black/40 rounded border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stat / Interaction Footer */}
                    <div className="flex items-center justify-between text-xs font-mono pt-4">
                      <span
                        style={{ color: p.color }}
                        className="flex items-center gap-2"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                          style={{ backgroundColor: p.color }}
                        />
                        {p.stat}
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-[#64647A] group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                        style={{ color: p.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-32 text-center flex flex-col items-center">
          <p className="text-[#64647A] font-mono text-sm mb-8 uppercase tracking-widest">
            More projects in progress — Launching 2026
          </p>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative p-px bg-white/10 hover:bg-primary hover:shadow-[0_0_40px_rgba(124,110,250,0.4)] transition-all duration-300 hover:scale-[1.02] inline-block"
            style={{
              clipPath:
                "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            }}
          >
            <div
              className="px-10 py-5 bg-surface-1 h-full w-full flex items-center justify-center gap-3 group-hover:bg-transparent transition-colors duration-300"
              style={{
                clipPath:
                  "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2 text-white font-semibold tracking-wide">
                Start a Project With Us
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </span>
            </div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
