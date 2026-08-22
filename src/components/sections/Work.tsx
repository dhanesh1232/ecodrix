"use client";

import { ArrowUpRight, Activity, Zap, Globe } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "Service Businesses & Clinics",
    category: "Healthcare Automation",
    tag: "WhatsApp CRM",
    description:
      "A healthcare clinic uses ECODrIx to capture leads from their website, automatically send a WhatsApp confirmation, book a Google Meet consultation, and follow up via email if the appointment isn't booked within 24 hours. Zero manual effort.",
    techTags: ["WhatsApp API", "CRM Pipeline", "Email Follow-up"],
    color: "var(--color-accent)",
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
      "An agency uses ECODrIx as their client CRM. They track projects per client, store deliverables in cloud storage, send automated monthly reports via email, and manage all client communication in one inbox.",
    techTags: ["Cloud Storage", "Email Reports", "Kanban CRM"],
    color: "var(--color-brand-purple)",
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
      "A D2C brand connects their store to ECODrIx. Abandoned cart triggers a WhatsApp message. New customers are added to an email nurture sequence. High-value customers get flagged for personal outreach by the sales team.",
    techTags: ["Automation Engine", "WhatsApp Campaigns", "Email Sequences"],
    color: "var(--color-brand-crimson)",
    icon: <Zap size={20} />,
    result: "25% increase in repeat purchase rate",
    link: "#contact",
  },
];

export function Work() {
  return (
    <section id="work" className="relative py-32 overflow-hidden bg-background">
      <div
        className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 -top-[200px] -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="wrapper relative z-10 max-w-7xl mx-auto">
        <div className="w-head mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="pill mb-6">Who Uses ECODrIx</div>
            <h2 className="text-4xl sm:text-5xl text-foreground font-display font-black tracking-tight leading-[1.05]">
              Built for businesses that are{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-brand-purple">
                done with manual work.
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mb-2">
            Real workflows. Measurable results. See how teams use ECODrIx to
            automate operations and close more deals.
          </p>
        </div>

        {/* Project Grid / List */}
        <div className="w-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 grid-no-collapse">
          {projects.map((p, i) => (
            <div
              key={i}
              style={{ "--c": p.color } as React.CSSProperties}
              className={`group hover:bg-[color-mix(in_srgb,var(--c)_10%,transparent)] relative p-px isolate transition-transform duration-500 hover:-translate-y-2 h-full flex flex-col no-collapse rounded-none shadow-md bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-foreground)_5%,transparent),color-mix(in_srgb,var(--color-foreground)_1%,transparent))]`}
            >
              {/* Inner Background for 1px Border effect */}
              <div className="relative bg-inherit flex-1 overflow-hidden flex flex-col transition-colors duration-500 no-collapse rounded-none">
                {/* Content */}
                <div className="p-8 lg:p-10 flex-1 flex flex-col relative z-10 h-full no-collapse">
                  <div className="flex justify-between items-start mb-8 no-collapse">
                    <span className="font-sans text-[11px] font-bold tracking-widest px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-none text-[var(--c)]">
                      {p.num} :: {p.category}
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center bg-foreground/5 border border-foreground/10 text-[var(--c)]">
                      {p.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-accent transition-all">
                    {p.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                    {p.description}
                  </p>

                  <div className="flex flex-col gap-6 mt-auto no-collapse">
                    {/* Tech Tags */}
                    <div className="flex items-center justify-between border-t border-foreground/5 pt-6">
                      <div className="flex flex-wrap gap-2">
                        {p.techTags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-sans text-muted-foreground px-2 py-1 bg-foreground/5 border border-foreground/5 rounded-none"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Result Badge */}
                    <div className="flex items-center justify-between text-xs font-sans pt-4">
                      <span className="flex items-center gap-2 text-[var(--c)]">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0 bg-[var(--c)]" />
                        {p.result}
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-[var(--c)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-16 text-center flex flex-col items-center">
          <p className="text-muted-foreground font-sans text-sm mb-8 uppercase tracking-widest">
            No credit card required · Setup in under 15 minutes
          </p>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative p-px bg-foreground/10 hover:bg-accent transition-all duration-300 hover:scale-[1.02] inline-block rounded-none"
          >
            <div className="px-10 py-2.5 bg-surface h-full w-full flex items-center justify-center gap-3 group-hover:bg-transparent transition-colors duration-300 rounded-none">
              <span className="relative z-10 flex items-center gap-2 text-foreground group-hover:text-foreground font-semibold tracking-wide">
                Join Waitlist
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </span>
            </div>
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
