"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, Activity, Zap, Globe } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "Service Businesses & Clinics",
    category: "Healthcare Automation",
    tag: "WhatsApp CRM",
    description:
      "A healthcare clinic uses ECODrix to capture leads from their website, automatically send a WhatsApp confirmation, book a Google Meet consultation, and follow up via email if the appointment isn't booked within 24 hours. Zero manual effort.",
    techTags: ["WhatsApp API", "CRM Pipeline", "Email Follow-up"],
    color: "var(--color-primary)",
    icon: <Activity size={20} />,
    result: "3x more appointments booked",
    link: "#contact",
  },
  {
    num: "02",
    title: "Digital Agencies & Freelancers",
    category: "Agency Operations",
    tag: "Client CRM",
    description:
      "An agency uses ECODrix as their client CRM. They track projects per client, store deliverables in cloud storage, send automated monthly reports via email, and manage all client communication in one inbox.",
    techTags: ["Cloud Storage", "Email Reports", "Kanban CRM"],
    color: "var(--color-cyan)",
    icon: <Globe size={20} />,
    result: "60% less admin time per client",
    link: "#contact",
  },
  {
    num: "03",
    title: "E-commerce & D2C Brands",
    category: "D2C Growth",
    tag: "Retention Automation",
    description:
      "A D2C brand connects their store to ECODrix. Abandoned cart triggers a WhatsApp message. New customers are added to an email nurture sequence. High-value customers get flagged for personal outreach by the sales team.",
    techTags: ["Automation Engine", "WhatsApp Campaigns", "Email Sequences"],
    color: "var(--color-magenta)",
    icon: <Zap size={20} />,
    result: "25% increase in repeat purchase rate",
    link: "#contact",
  },
];

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  // Removed heavy GSAP animations for better performance

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
            <div className="pill mb-6">Who Uses ECODrix</div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] text-white font-display font-black tracking-tight leading-[1.05]">
              Built for businesses that are{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan">
                done with manual work.
              </span>
            </h2>
          </div>
          <p className="text-[#A8A8B3] text-lg leading-relaxed max-w-sm mb-2">
            Real workflows. Measurable results. See how teams use ECODrix to
            automate operations and close more deals.
          </p>
        </div>

        {/* Project Grid / List */}
        <div className="w-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 grid-no-collapse">
          {projects.map((p, i) => (
            <div
              key={i}
              className="w-card group relative p-px isolate transition-transform duration-500 hover:-translate-y-2 h-full flex flex-col no-collapse"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
              }}
            >
              {/* Inner Background for 1px Border effect */}
              <div
                className="relative flex-1 bg-[#0A0A10] overflow-hidden flex flex-col transition-colors duration-500 group-hover:bg-[#11111A] no-collapse"
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
                <div className="p-8 lg:p-10 flex-1 flex flex-col relative z-10 h-full no-collapse">
                  <div className="flex justify-between items-start mb-8 no-collapse">
                    <span
                      className="font-mono text-[11px] font-bold tracking-widest px-3 py-1.5 bg-white/5 border border-white/10 polygon-tag"
                      style={{ color: p.color }}
                    >
                      {p.num} :: {p.category}
                    </span>
                    <div
                      className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 shadow-xl polygon-icon"
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

                  <div className="flex flex-col gap-6 mt-auto no-collapse">
                    {/* Tech Tags */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-6">
                      <div className="flex flex-wrap gap-2">
                        {p.techTags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono text-[#64647A] px-2 py-1 bg-black/40 border border-white/5 polygon-tag"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Result Badge */}
                    <div className="flex items-center justify-between text-xs font-mono pt-4">
                      <span
                        style={{ color: p.color }}
                        className="flex items-center gap-2"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                          style={{ backgroundColor: p.color }}
                        />
                        {p.result}
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-[#64647A] group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                        style={{ color: p.color }}
                      />
                    </div>
                  </div>
                </div>

                {/* Polygon corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    background: `linear-gradient(225deg, ${p.color}20, transparent)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-32 text-center flex flex-col items-center">
          <p className="text-[#64647A] font-mono text-sm mb-8 uppercase tracking-widest">
            No credit card required · Setup in under 15 minutes
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
                Start Free Trial
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
