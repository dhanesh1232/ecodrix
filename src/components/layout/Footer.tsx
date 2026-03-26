"use client";

import { Instagram, Linkedin, Github, Mail, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const nav = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const footerLinks = {
    Platform: [
      { label: "AI Solutions", href: "#services" },
      { label: "Lead Engine", href: "#product" },
      { label: "Integrations", href: "#product" },
      { label: "Deployment", href: "#product" },
    ],
    Company: [
      { label: "Showcase", href: "#work" },
      { label: "Process", href: "#services" },
      { label: "About", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
    Resources: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Status", href: "#" },
      { label: "Security", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-[#050508] pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Premium Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7C6EFA]/10 blur-[120px] rounded-full pointer-events-none opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#22D3EE]/10 blur-[100px] rounded-full pointer-events-none opacity-10" />

      <div className="wrapper relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <div
              className="flex items-center gap-2 mb-8 group cursor-pointer w-fit"
              onClick={() => nav("#hero")}
            >
              <span className="font-display font-black text-3xl text-white tracking-tighter">
                ECO
              </span>
              <span className="font-display font-black text-3xl bg-linear-to-r from-[#7C6EFA] to-[#22D3EE] bg-clip-text text-transparent tracking-tighter">
                DrIx
              </span>
              <div className="w-2 h-2 rounded-full bg-[#7C6EFA] shadow-[0_0_12px_rgba(124,110,250,0.8)] mb-1" />
            </div>

            <p className="text-[#888899] text-lg leading-relaxed mb-10 max-w-md font-medium">
              We engineer high-performance digital systems and AI-driven 
              automations for the next generation of startups.
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/dhanesh-mekalthuru-5baa9323b" },
                { icon: Github, href: "https://github.com/dhanesh1232" },
                { icon: Instagram, href: "https://www.instagram.com/erix.__.after17_59/" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#888899] hover:bg-[#7C6EFA] hover:text-white hover:border-[#7C6EFA] transition-all duration-500 hover:-translate-y-1"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-1">
              <h4 className="text-white font-bold text-[13px] tracking-[0.2em] uppercase mb-8 opacity-50">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          nav(link.href);
                        }
                      }}
                      className="text-[#888899] hover:text-white text-[15px] font-medium transition-colors duration-300 flex items-center group"
                    >
                      {link.label}
                      <ArrowUpRight size={14} className="ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-2 md:order-1">
            <p className="text-[#444455] text-xs font-bold tracking-widest uppercase">
              © 2026 ECODrIx SYSTEMS.
            </p>
            <div className="flex items-center gap-6">
              <Link href="mailto:contact@ecodrix.com" className="text-[#64647A] hover:text-white text-[11px] font-bold tracking-widest uppercase transition-colors">
                contact@ecodrix.com
              </Link>
            </div>
          </div>

          <p className="text-[#444455] text-xs font-bold tracking-widest uppercase order-1 md:order-2 flex items-center gap-2">
            Engineered with <span className="text-[#7C6EFA] animate-pulse">✦</span> by Dhanesh
          </p>
        </div>
      </div>
    </footer>
  );
}
