import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Zap,
  Code2,
  Rocket,
} from "lucide-react";

const CLIP_CARD =
  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";
const CLIP_ICON =
  "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)";

const milestones = [
  {
    year: "Mar 2024",
    label: "The Spark",
    desc: "Built first WhatsApp automation for a local clinic. Realized every SMB was duct-taping 5–7 tools together.",
    color: "#7C6EFA",
  },
  {
    year: "Sep 2024",
    label: "Architecture",
    desc: "Designed multi-tenant core — isolated databases, custom job queue, event-driven automation engine.",
    color: "#22D3EE",
  },
  {
    year: "Mar 2025",
    label: "Platform Shipped",
    desc: "WhatsApp CRM, booking, payments, email marketing, admin panel live. Published npm packages.",
    color: "#4ADE80",
  },
  {
    year: "Sep 2025",
    label: "AI Engine (LAIE)",
    desc: "Built autonomous lead gen with Claude/GPT-4. Browser automation, proxy rotation, actor runtime.",
    color: "#F59E0B",
  },
  {
    year: "2026",
    label: "Early Access",
    desc: "Onboarding first clients. Public API, component library, and waitlist live.",
    color: "#F472B6",
  },
];

const stats = [
  { value: "10+", label: "Services" },
  { value: "4", label: "npm Packages" },
  { value: "80+", label: "API Endpoints" },
  { value: "5", label: "AI Models" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-background sep-top"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[20%] right-[10%] w-[400px] h-[400px]"
          style={{
            background:
              "radial-gradient(circle, rgba(124,110,250,0.05) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="wrapper relative z-10">
        {/* ── Header ── */}
        <div className="mb-16 max-w-2xl">
          <div className="pill mb-5 text-primary border-primary/20 bg-primary/5">
            <Code2 size={11} />
            The Founder
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] text-white font-display font-black tracking-tight leading-[1.05] mb-5">
            Built solo by someone who{" "}
            <span className="grad-text">felt the pain.</span>
          </h2>
          <p className="text-[#64647A] text-[15px] md:text-lg leading-relaxed">
            ECODrIx started in March 2024 as a personal frustration — managing
            separate tools for CRM, WhatsApp, email, and storage for every
            client. Two years later, it&apos;s a full platform.
          </p>
        </div>

        {/* ── Main layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start relative">
          {/* Left: Founder card + stats */}
          <div
            className="flex flex-col gap-6 lg:sticky lg:top-20"
            style={{ alignSelf: "start" }}
          >
            {/* Founder card */}
            <div
              className="relative p-px"
              style={{
                clipPath: CLIP_CARD,
                background:
                  "linear-gradient(135deg, rgba(124,110,250,0.3), rgba(34,211,238,0.15), rgba(255,255,255,0.05))",
              }}
            >
              <div
                className="bg-[#0A0A10] p-7 md:p-8 flex flex-col gap-6 relative overflow-hidden"
                style={{ clipPath: CLIP_CARD }}
              >
                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 100% 0%, rgba(124,110,250,0.1) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                {/* Avatar + name */}
                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className="relative shrink-0 w-14 h-14 p-px"
                    style={{
                      clipPath: CLIP_ICON,
                      background: "linear-gradient(135deg, #7C6EFA, #22D3EE)",
                    }}
                  >
                    <div
                      className="w-full h-full bg-[#1A1A24] flex items-center justify-center"
                      style={{ clipPath: CLIP_ICON }}
                    >
                      <span className="text-xl font-display font-black text-white">
                        D
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-display font-bold text-lg tracking-tight">
                      Dhanesh Mekalthuru
                    </h3>
                    <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-primary mt-0.5">
                      Founder & Builder
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-[#A8A8B3] text-[14px] leading-relaxed relative z-10 pl-4 border-l-2 border-primary/30 italic">
                  &ldquo;I spent a year managing 5 separate tools for my
                  clients. None talked to each other. So I built the platform I
                  wished existed.&rdquo;
                </blockquote>

                {/* Details */}
                <div className="flex flex-col gap-2.5 relative z-10">
                  <div className="flex items-center gap-2.5 text-[#64647A] text-[13px]">
                    <MapPin size={13} style={{ color: "#F59E0B" }} />
                    <span>Andhra Pradesh, India · Available globally</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#64647A] text-[13px]">
                    <Zap size={13} style={{ color: "#22D3EE" }} />
                    <span>Full-stack engineer · Automation architect</span>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(124,110,250,0.2), transparent)",
                  }}
                />

                {/* Social + est */}
                <div className="flex items-center gap-3 relative z-10">
                  {[
                    {
                      icon: Linkedin,
                      href: "https://www.linkedin.com/in/dhanesh-mekalthuru-5baa9323b",
                      label: "LinkedIn",
                    },
                    {
                      icon: Github,
                      href: "https://github.com/dhanesh1232",
                      label: "GitHub",
                    },
                    {
                      icon: Mail,
                      href: "mailto:dhanesh@ecodrix.com",
                      label: "Email",
                    },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 flex items-center justify-center text-[#64647A] hover:text-primary transition-all duration-300 hover:scale-110"
                      style={{
                        clipPath: CLIP_ICON,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                  <span className="ml-auto text-[#64647A] font-mono text-[9px] uppercase tracking-widest">
                    Est. March 2024
                  </span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center py-3 px-2"
                  style={{
                    clipPath: CLIP_ICON,
                    background: "#0D0D14",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="font-display font-black text-lg grad-text">
                    {s.value}
                  </p>
                  <p className="text-[9px] text-[#64647A] font-mono uppercase tracking-wider mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="relative pl-0 lg:pl-4">
            <p className="text-[#64647A] font-mono text-[10px] uppercase tracking-[0.2em] mb-8">
              March 2024 → Present
            </p>

            {/* Timeline track */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[18px] top-0 bottom-0 w-px"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(124,110,250,0.4), rgba(34,211,238,0.2), transparent)",
                }}
              />

              {milestones.map((m, i) => (
                <div key={i} className="flex gap-5 group mb-2 last:mb-0">
                  {/* Node */}
                  <div className="relative z-10 flex flex-col items-center shrink-0">
                    <div
                      className="w-9 h-9 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        clipPath: CLIP_ICON,
                        background: `${m.color}15`,
                        border: `1px solid ${m.color}40`,
                        boxShadow: `0 0 12px ${m.color}15`,
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          background: m.color,
                          boxShadow: `0 0 6px ${m.color}60`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 p-5 mb-4 transition-all duration-300 group-hover:translate-x-1"
                    style={{
                      clipPath: CLIP_CARD,
                      background: "#0D0D14",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5"
                        style={{
                          clipPath:
                            "polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)",
                          background: `${m.color}12`,
                          border: `1px solid ${m.color}30`,
                          color: m.color,
                        }}
                      >
                        {m.year}
                      </span>
                    </div>
                    <h4 className="text-white font-display font-bold text-[15px] mb-1.5 group-hover:text-primary transition-colors duration-300">
                      {m.label}
                    </h4>
                    <p className="text-[#64647A] text-[13px] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* "Now" indicator */}
              <div className="flex gap-5 items-center">
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div
                    className="w-9 h-9 flex items-center justify-center"
                    style={{
                      clipPath: CLIP_ICON,
                      background: "rgba(124,110,250,0.1)",
                      border: "1px solid rgba(124,110,250,0.4)",
                    }}
                  >
                    <Rocket size={14} className="text-primary" />
                  </div>
                </div>
                <span className="text-[11px] font-mono text-primary tracking-widest uppercase">
                  Building in public →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
