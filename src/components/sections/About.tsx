import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Zap,
  Code2,
  Rocket,
} from "lucide-react";

const milestones = [
  {
    year: "Aug 2025",
    label: "The Spark",
    desc: "Started as a freelance studio — building web apps, automations, and WhatsApp integrations for SMB clients across India.",
    color: "var(--color-accent)",
  },
  {
    year: "Nov 2025",
    label: "Architecture",
    desc: "Every client needed the same stack. Designed multi-tenant core — isolated databases, job queue, event-driven engine — to serve all of them from one platform.",
    color: "var(--color-brand-purple)",
  },
  {
    year: "Feb 2026",
    label: "Platform Shipped",
    desc: "WhatsApp CRM, booking, payments, email marketing, admin panel live. Migrated freelance clients onto the platform. Published npm packages.",
    color: "var(--color-success)",
  },
  {
    year: "May 2026",
    label: "AI Engine (LAIE)",
    desc: "Transitioned from freelance services to product. Built autonomous lead gen with Claude/GPT-4 — browser automation, proxy rotation, actor runtime.",
    color: "var(--color-warning)",
  },
  {
    year: "Aug 2026",
    label: "Early Access Beta",
    desc: "Public beta live. No longer taking freelance clients — fully product-first. API, SDK, and waitlist open.",
    color: "var(--color-cat-meeting)",
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
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] blur-[80px] bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_5%,transparent)_0%,transparent_65%)]" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] blur-[60px] bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-purple)_4%,transparent)_0%,transparent_60%)]" />
      </div>

      <div className="wrapper relative z-10">
        {/* ── Header ── */}
        <div className="mb-16 max-w-2xl">
          <div className="pill mb-5 text-accent border-accent/20 bg-accent/5">
            <Code2 size={11} />
            The Founder
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] text-foreground font-display font-black tracking-tight leading-[1.05] mb-5">
            Built solo by someone who{" "}
            <span className="grad-text">felt the pain.</span>
          </h2>
          <p className="text-muted-foreground text-[15px] md:text-lg leading-relaxed">
            ECODrIx started in August 2025 as a personal frustration — managing
            separate tools for CRM, WhatsApp, email, and storage for every
            client. Two years later, it&apos;s a full platform.
          </p>
        </div>

        {/* ── Main layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start relative">
          {/* Left: Founder card + stats */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-20 self-start">
            {/* Founder card */}
            <div className="relative p-px rounded-none bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-accent)_30%,transparent),color-mix(in_srgb,var(--color-brand-purple)_15%,transparent),color-mix(in_srgb,var(--color-foreground)_5%,transparent))]">
              <div className="bg-surface p-7 md:p-8 flex flex-col gap-6 relative overflow-hidden rounded-none">
                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,color-mix(in_srgb,var(--color-accent)_10%,transparent)_0%,transparent_70%)]"
                  aria-hidden="true"
                />

                {/* Avatar + name */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative shrink-0 w-14 h-14 p-px rounded-none bg-[linear-gradient(135deg,var(--color-accent),var(--color-brand-purple))]">
                    <div className="w-full h-full bg-elevated flex items-center justify-center rounded-none">
                      <span className="text-xl font-display font-black text-foreground">
                        D
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-foreground font-display font-bold text-lg tracking-tight">
                      Founder & CEO
                    </h3>
                    <p className="text-[10px] font-sans uppercase tracking-[0.15em] text-accent mt-0.5">
                      Founder & Builder
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground text-[14px] leading-relaxed relative z-10 pl-4 border-l-2 border-accent/30 italic">
                  &ldquo;I spent a year managing 5 separate tools for my
                  clients. None talked to each other. So I built the platform I
                  wished existed.&rdquo;
                </blockquote>

                {/* Details */}
                <div className="flex flex-col gap-2.5 relative z-10">
                  <div className="flex items-center gap-2.5 text-muted-foreground text-[13px]">
                    <MapPin size={13} className="text-warning" />
                    <span>Andhra Pradesh, India · Available globally</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground text-[13px]">
                    <Zap size={13} className="text-brand-purple" />
                    <span>Full-stack engineer · Automation architect</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-accent)_20%,transparent),transparent)]" />

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
                      className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110 rounded-none bg-foreground/[0.03] border border-foreground/[0.08]"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                  <span className="ml-auto text-muted-foreground font-sans text-[9px] uppercase tracking-widest">
                    Est. August 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center py-3 px-2 rounded-none bg-surface border border-foreground/[0.06]"
                >
                  <p className="font-display font-black text-lg grad-text">
                    {s.value}
                  </p>
                  <p className="text-[9px] text-muted-foreground font-sans uppercase tracking-wider mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="relative pl-0 lg:pl-4">
            <p className="text-muted-foreground font-sans text-[10px] uppercase tracking-[0.2em] mb-8">
              August 2025 → Present
            </p>

            {/* Timeline track */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-0 bottom-0 w-px bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-accent)_40%,transparent),color-mix(in_srgb,var(--color-brand-purple)_20%,transparent),transparent)]" />

              {milestones.map((m, i) => (
                <div
                  key={i}
                  style={{ "--c": m.color } as React.CSSProperties}
                  className="flex gap-5 group mb-2 last:mb-0"
                >
                  {/* Node */}
                  <div className="relative z-10 flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 flex items-center justify-center transition-all duration-300 group-hover:scale-110 rounded-none bg-[color-mix(in_srgb,var(--c)_8%,transparent)] border border-[color-mix(in_srgb,var(--c)_25%,transparent)] shadow-none">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--c)] shadow-none" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 p-5 mb-4 transition-all duration-300 group-hover:translate-x-1 rounded-none bg-surface border border-foreground/5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[9px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 rounded-none bg-[color-mix(in_srgb,var(--c)_7%,transparent)] border border-[color-mix(in_srgb,var(--c)_19%,transparent)] text-[var(--c)]">
                        {m.year}
                      </span>
                    </div>
                    <h4 className="text-foreground font-display font-bold text-[15px] mb-1.5 group-hover:text-accent transition-colors duration-300">
                      {m.label}
                    </h4>
                    <p className="text-muted-foreground text-[13px] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* "Now" indicator */}
              <div className="flex gap-5 items-center">
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div className="w-9 h-9 flex items-center justify-center rounded-none bg-accent/10 border border-accent/40">
                    <Rocket size={14} className="text-accent" />
                  </div>
                </div>
                <span className="text-[11px] font-sans text-accent tracking-widest uppercase">
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
