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
    color: "#7C6EFA",
    title: "Build for real businesses",
    desc: "We use our own platform daily. Every feature we ship solves a problem we've faced ourselves.",
  },
  {
    num: "02",
    color: "#22D3EE",
    title: "Simple over clever",
    desc: "Powerful features shouldn't require a manual. If it takes more than 5 minutes to set up, we redesign it.",
  },
  {
    num: "03",
    color: "#4ADE80",
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
    color: "#7C6EFA",
  },
  {
    name: "WhatsApp Business API",
    desc: "Official Meta Cloud API for broadcasts, templates, and unified inbox.",
    color: "#4ADE80",
  },
  {
    name: "Automation Engine",
    desc: "20+ triggers, multi-step sequences, conditional logic — no code required.",
    color: "#22D3EE",
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
    color: "#7C6EFA",
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
    <main className="bg-background text-white min-h-screen overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden
          style={{
            width: "700px",
            height: "400px",
            background:
              "conic-gradient(from 270deg at 50% 0%, transparent 55deg, rgba(124,110,250,0.18) 85deg, rgba(34,211,238,0.07) 115deg, transparent 155deg)",
            filter: "blur(14px)",
          }}
        />
        <div className="wrapper relative z-10">
          <div className="pill mb-8">About ECODrIx</div>
          <h1
            className="font-display font-black text-white mb-8 max-w-3xl"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 4.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            We got tired of paying for{" "}
            <span className="grad-text">10 different tools.</span>
          </h1>
          <div className="max-w-2xl space-y-5">
            <p
              className="text-text-lo leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)" }}
            >
              ECODrIx started in 2025 when we were building digital systems for
              clients across India. Every client needed the same stack — a CRM,
              WhatsApp automation, email campaigns, and a place to store files.
              They were paying for 5–10 separate tools that didn't talk to each
              other.
            </p>
            <p
              className="text-text-lo leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)" }}
            >
              So we built it once, properly, and made it available as a
              platform. ECODrIx is that platform — unified business
              infrastructure for growing teams.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/5">
        <div className="wrapper">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-10 px-4"
              >
                <span
                  className="grad-text font-display font-black mb-2"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {value}
                </span>
                <span className="text-text-lo text-sm font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 px-6">
        <div className="wrapper">
          <div className="pill mb-6">Mission</div>
          <div
            className="p-px"
            style={{
              clipPath:
                "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
              background:
                "linear-gradient(135deg, rgba(124,110,250,0.3), rgba(34,211,238,0.1))",
            }}
          >
            <div
              className="px-10 py-10"
              style={{
                background: "#0D0D14",
                clipPath:
                  "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
              }}
            >
              <p
                className="text-white font-display font-bold leading-relaxed"
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Empower businesses to automate operations and scale growth —
                without needing a technical team or expensive enterprise
                software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we build ── */}
      <section className="py-24 px-6 sep-top" style={{ background: "#060608" }}>
        <div className="wrapper">
          <div className="pill mb-6">Platform</div>
          <h2
            className="font-display font-black text-white mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            What we build.
          </h2>
          <p className="text-text-lo mb-14 max-w-xl leading-relaxed">
            One platform that replaces the tools most growing businesses are
            stitching together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {products.map(({ name, desc, color }) => (
              <div
                key={name}
                className="p-8 bg-[#060608] hover:bg-surface-1 transition-colors duration-200"
              >
                <div className="w-1 h-8 mb-6" style={{ background: color }} />
                <h3 className="text-white font-bold text-base mb-3">{name}</h3>
                <p className="text-text-lo text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work ── */}
      <section className="py-24 px-6">
        <div className="wrapper">
          <div className="pill mb-6">Values</div>
          <h2
            className="font-display font-black text-white mb-14"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            How we work.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map(({ num, color, title, desc }) => (
              <div
                key={num}
                className="group relative p-px transition-colors duration-300"
                style={{
                  clipPath:
                    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
              >
                {/* hover tint — uses the card's accent color at low opacity */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `${color}18`,
                    clipPath:
                      "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  }}
                />
                <div
                  className="relative h-full p-8"
                  style={{
                    background: "#0D0D14",
                    clipPath:
                      "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  }}
                >
                  <span
                    className="font-mono text-[11px] font-bold block mb-5"
                    style={{ color }}
                  >
                    {num}
                  </span>
                  <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                  <p className="text-text-lo text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built on AWS ── */}
      <section className="py-24 px-6 sep-top" style={{ background: "#060608" }}>
        <div className="wrapper">
          <div className="pill mb-6">Infrastructure</div>
          <h2
            className="font-display font-black text-white mb-5"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Built on AWS.
          </h2>
          <p className="text-text-lo mb-12 max-w-2xl leading-relaxed">
            ECODrIx runs on AWS infrastructure — EC2 for compute, SES for email
            delivery, S3 for storage, and CloudFront for global content
            delivery. Designed for reliability, security, and scale.
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 font-mono text-[12px] text-text-lo border border-white/8 transition-colors duration-200 hover:text-white hover:border-primary/30"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  clipPath:
                    "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                }}
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
          <div
            className="p-px"
            style={{
              clipPath:
                "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-10 py-12"
              style={{
                background: "#0D0D14",
                clipPath:
                  "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
              }}
            >
              <div>
                <h2
                  className="font-display font-black text-white mb-3"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  Want to talk to the founder?
                </h2>
                <p className="text-text-lo text-sm leading-relaxed max-w-md">
                  We're an early-stage startup. Reach out directly — we respond
                  to every message personally.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="mailto:contact@ecodrix.com"
                  className="group flex items-center gap-2 px-7 py-3.5 font-semibold text-sm text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,110,250,0.3)]"
                  style={{
                    clipPath:
                      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                    background: "linear-gradient(135deg, #7C6EFA, #22D3EE)",
                  }}
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
                  className="group flex items-center gap-2 px-7 py-3.5 font-semibold text-sm text-white border border-white/10 transition-all duration-300 hover:border-[#4ADE80]/40 hover:text-[#4ADE80]"
                  style={{
                    clipPath:
                      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <BsWhatsapp size={14} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
