import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

export const metadata: Metadata = {
  title: "About",
  description:
    "ECODrIx is a unified business infrastructure platform founded in March 2024 in India. We help businesses automate operations, manage customers, and scale growth.",
  alternates: { canonical: "https://ecodrix.com/about" },
};

const stats = [
  { value: "2024", label: "Founded" },
  { value: "50+", label: "Businesses onboarded" },
  { value: "6", label: "Tools in one platform" },
  { value: "99.9%", label: "Uptime SLA" },
];

const values = [
  {
    num: "01",
    color: "var(--color-accent)",
    title: "Build for real businesses",
    desc: "We use our own platform daily. Every feature we ship solves a problem we've faced ourselves.",
  },
  {
    num: "02",
    color: "var(--color-brand-purple)",
    title: "Simple over clever",
    desc: "Powerful features shouldn't require a manual. If it takes more than 5 minutes to set up, we redesign it.",
  },
  {
    num: "03",
    color: "var(--color-success)",
    title: "Honest about what we are",
    desc: "We're an early-stage startup, actively building and iterating. We don't pretend to be something we're not.",
  },
  {
    num: "04",
    color: "#F472B6",
    title: "Customer success is our success",
    desc: "We respond to every support request personally. Your growth is the only metric that matters to us.",
  },
];

const products = [
  {
    name: "CRM & Lead Pipeline",
    desc: "Kanban pipeline with lead scoring, activity logs, and revenue forecasting.",
    color: "var(--color-accent)",
  },
  {
    name: "WhatsApp Business API",
    desc: "Official Meta Cloud API for broadcasts, templates, and unified inbox.",
    color: "var(--color-success)",
  },
  {
    name: "Automation Engine",
    desc: "20+ triggers, multi-step sequences, conditional logic — no code required.",
    color: "var(--color-brand-purple)",
  },
  {
    name: "Email Marketing",
    desc: "Powered by AWS SES. Drag-and-drop builder, segmentation, and analytics.",
    color: "#F472B6",
  },
  {
    name: "Cloud Storage",
    desc: "Secure file management linked directly to contacts and deals.",
    color: "#FB923C",
  },
  {
    name: "Meeting Scheduler",
    desc: "Google Calendar integration with automatic Meet link generation via WhatsApp.",
    color: "var(--color-accent)",
  },
];

const stack = [
  "Next.js",
  "Node.js",
  "TypeScript",
  "MongoDB",
  "AWS EC2",
  "AWS SES",
  "AWS S3",
  "AWS CloudFront",
  "Meta WhatsApp API",
  "Google OAuth",
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[700px] h-[400px] blur-[14px] bg-[conic-gradient(from_270deg_at_50%_0%,transparent_55deg,rgba(43,77,203,0.18)_85deg,rgba(141,31,174,0.07)_115deg,transparent_155deg)]"
          aria-hidden
        />
        <div className="wrapper relative z-10">
          <div className="pill mb-8">About ECODrIx</div>
          <h1 className="font-display font-black text-foreground mb-8 max-w-3xl text-[clamp(2.6rem,7vw,4.5rem)] tracking-[-0.04em] leading-[1.05]">
            We got tired of paying for{" "}
            <span className="grad-text">10 different tools.</span>
          </h1>
          <div className="max-w-2xl space-y-5">
            <p className="text-subtle leading-relaxed text-[clamp(1rem,2vw,1.1rem)]">
              ECODrIx started in 2025 when we were building digital systems for
              clients across India. Every client needed the same stack — a CRM,
              WhatsApp automation, email campaigns, and a place to store files.
              They were paying for 5–10 separate tools that didn't talk to each
              other.
            </p>
            <p className="text-subtle leading-relaxed text-[clamp(1rem,2vw,1.1rem)]">
              So we built it once, properly, and made it available as a
              platform. ECODrIx is that platform — unified business
              infrastructure for growing teams.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-foreground/5">
        <div className="wrapper">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-foreground/5">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-10 px-4"
              >
                <span className="grad-text font-display font-black mb-2 text-[clamp(2rem,4vw,3rem)] tracking-[-0.04em]">
                  {value}
                </span>
                <span className="text-subtle text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 px-6">
        <div className="wrapper">
          <div className="pill mb-6">Mission</div>
          <div className="p-px rounded-2xl bg-[linear-gradient(135deg,rgba(43,77,203,0.3),rgba(141,31,174,0.1))]">
            <div className="px-10 py-10 rounded-2xl bg-surface">
              <p className="text-foreground font-display font-bold leading-relaxed text-[clamp(1.2rem,2.5vw,1.6rem)] tracking-[-0.02em]">
                Empower businesses to automate operations and scale growth —
                without needing a technical team or expensive enterprise
                software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we build ── */}
      <section className="py-24 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Platform</div>
          <h2 className="font-display font-black text-foreground mb-4 text-[clamp(2rem,4vw,3rem)] tracking-[-0.04em]">
            What we build.
          </h2>
          <p className="text-subtle mb-14 max-w-xl leading-relaxed">
            One platform that replaces the tools most growing businesses are
            stitching together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5">
            {products.map(({ name, desc, color }) => (
              <div
                key={name}
                className="p-8 bg-background hover:bg-surface transition-colors duration-200"
                style={{ "--bar": color } as React.CSSProperties}
              >
                <div className="w-1 h-8 mb-6 bg-[var(--bar)]" />
                <h3 className="text-foreground font-bold text-base mb-3">
                  {name}
                </h3>
                <p className="text-subtle text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work ── */}
      <section className="py-24 px-6">
        <div className="wrapper">
          <div className="pill mb-6">Values</div>
          <h2 className="font-display font-black text-foreground mb-14 text-[clamp(2rem,4vw,3rem)] tracking-[-0.04em]">
            How we work.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map(({ num, color, title, desc }) => (
              <div
                key={num}
                className="group relative p-px rounded-2xl transition-colors duration-300 bg-foreground/6"
                style={{ "--tile": color } as React.CSSProperties}
              >
                {/* hover tint — uses the card's accent color at low opacity */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-[0.09] transition-opacity duration-300 pointer-events-none bg-[var(--tile)]" />
                <div className="relative h-full p-8 rounded-2xl bg-surface">
                  <span className="font-sans text-[11px] font-bold block mb-5 text-[var(--tile)]">
                    {num}
                  </span>
                  <h3 className="text-foreground font-bold text-lg mb-3">
                    {title}
                  </h3>
                  <p className="text-subtle text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built on AWS ── */}
      <section className="py-24 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Infrastructure</div>
          <h2 className="font-display font-black text-foreground mb-5 text-[clamp(2rem,4vw,3rem)] tracking-[-0.04em]">
            Built on AWS.
          </h2>
          <p className="text-subtle mb-12 max-w-2xl leading-relaxed">
            ECODrIx runs on AWS infrastructure — EC2 for compute, SES for email
            delivery, S3 for storage, and CloudFront for global content
            delivery. Designed for reliability, security, and scale.
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 font-sans text-[12px] text-subtle border border-foreground/8 transition-colors duration-200 hover:text-foreground hover:border-accent/30 rounded-lg bg-foreground/3"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-24 px-6">
        <div className="wrapper">
          <div className="p-px rounded-2xl bg-foreground/6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-10 py-12 rounded-2xl bg-surface">
              <div>
                <h2 className="font-display font-black text-foreground mb-3 text-[clamp(1.6rem,3vw,2.2rem)] tracking-[-0.04em]">
                  Want to talk to the founder?
                </h2>
                <p className="text-subtle text-sm leading-relaxed max-w-md">
                  We're an early-stage startup. Reach out directly — we respond
                  to every message personally.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="mailto:contact@ecodrix.com"
                  className="group flex items-center gap-2 px-7 py-3.5 font-semibold text-sm text-accent-foreground rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(43,77,203,0.3)] bg-[linear-gradient(135deg,var(--color-brand-blue),var(--color-brand-purple))]"
                >
                  <Mail size={14} />
                  Email us
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
                <a
                  href="https://wa.me/918143963821"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-7 py-3.5 font-semibold text-sm text-foreground border border-foreground/10 transition-all duration-300 hover:border-success/40 hover:text-success rounded-xl bg-foreground/4"
                >
                  <BsWhatsapp size={14} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
