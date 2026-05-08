import { Github, Linkedin, Mail, MapPin, Zap } from "lucide-react";

const milestones = [
  {
    year: "2022",
    label: "Started building",
    desc: "First WhatsApp automation system for a local clinic.",
  },
  {
    year: "2023",
    label: "Identified the gap",
    desc: "Businesses were duct-taping 5–7 tools together. None talked to each other.",
  },
  {
    year: "2024",
    label: "Started ECODrIx",
    desc: "Began architecting the unified platform — CRM, automation, messaging in one place.",
  },
  {
    year: "2025",
    label: "Early Access",
    desc: "Onboarded first 50+ businesses. Building toward full launch.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-background border-t border-white/5"
    >
      <div className="wrapper">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="pill mb-5 text-primary border-primary/20 bg-primary/5">
            The Founder
          </div>
          <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] text-white font-display font-black tracking-tight leading-[1.05] mb-5">
            Built by someone who{" "}
            <span className="bg-linear-to-r from-primary to-cyan bg-clip-text text-transparent">
              felt the pain.
            </span>
          </h2>
          <p className="text-[#64647A] text-lg leading-relaxed">
            ECODrIx started as a personal frustration — managing separate tools
            for CRM, WhatsApp, email, and storage for every client. There had to
            be a better way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-16 items-start grid-no-collapse">
          {/* Founder Card - Enhanced Polygon Style */}
          <div 
            className="p-px bg-linear-to-br from-primary/30 via-cyan/10 to-white/5 no-collapse"
            style={{
              clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
            }}
          >
            <div 
              className="bg-[#0A0A10] p-8 flex flex-col gap-7 no-collapse"
              style={{
                clipPath: "polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)"
              }}
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-5 no-collapse">
                <div 
                  className="relative shrink-0 w-16 h-16 p-px bg-linear-to-br from-primary to-cyan"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)"
                  }}
                >
                  <div 
                    className="w-full h-full bg-[#1A1A24] flex items-center justify-center"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)"
                    }}
                  >
                    <span className="text-2xl font-display font-black text-white">
                      D
                    </span>
                  </div>
                </div>
                <div className="no-collapse">
                  <h3 className="text-white font-display font-bold text-xl tracking-tight">
                    Dhanesh Mekalthuru
                  </h3>
                  <p className="text-primary font-mono text-[11px] uppercase tracking-widest mt-1">
                    Founder & Builder — ECODrIx
                  </p>
                </div>
              </div>

              {/* Bio */}
              <blockquote className="text-[#A8A8B3] text-[15px] leading-relaxed border-l-2 border-primary/40 pl-4 italic no-collapse">
                &ldquo;I spent two years managing 5 separate tools for my
                clients — a CRM here, WhatsApp there, email somewhere else. None
                of them talked to each other. ECODrIx is the platform I built to
                solve that.&rdquo;
              </blockquote>

              {/* Details */}
              <div className="flex flex-col gap-3 no-collapse">
                <div className="flex items-center gap-3 text-[#64647A] text-sm">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span>Andhra Pradesh, India · Available globally</span>
                </div>
                <div className="flex items-center gap-3 text-[#64647A] text-sm">
                  <Zap size={14} className="text-cyan shrink-0" />
                  <span>Full-stack engineer · Automation architect</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5" />

              {/* Social links */}
              <div className="flex items-center gap-3 no-collapse">
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
                    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-[#64647A] hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-colors polygon-icon"
                  >
                    <Icon size={16} />
                  </a>
                ))}
                <span className="ml-auto text-[#444455] font-mono text-[10px] uppercase tracking-widest">
                  Est. 2024
                </span>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="flex flex-col gap-0 pt-4 no-collapse">
            <p className="text-[#444455] font-mono text-[11px] uppercase tracking-[0.2em] mb-8">
              Origin Story
            </p>
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-5 group no-collapse">
                {/* Timeline spine */}
                <div className="flex flex-col items-center no-collapse">
                  <div 
                    className="w-10 h-10 shrink-0 flex items-center justify-center border border-white/10 bg-white/5 group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors duration-300 polygon-icon"
                  >
                    <span className="text-primary font-mono font-bold text-[10px]">
                      {m.year}
                    </span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-white/10 my-2 min-h-[32px]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8 pt-1 no-collapse">
                  <p className="text-white font-bold text-[15px] mb-1 group-hover:text-primary transition-colors duration-300">
                    {m.label}
                  </p>
                  <p className="text-[#64647A] text-sm leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
