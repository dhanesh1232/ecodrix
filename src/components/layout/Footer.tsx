"use client";

import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  MapPin,
} from "lucide-react";

export function Footer() {
  const nav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const footerLinks = {
    Solutions: [
      { label: "AI Automations", href: "#services" },
      { label: "Workspace CRM", href: "#product" },
      { label: "Code Execution", href: "#product" },
      { label: "SaaS Deployment", href: "#product" },
    ],
    Company: [
      { label: "About Us", href: "#work" },
      { label: "Our Process", href: "#services" },
      { label: "Work Showcase", href: "#work" },
      { label: "Careers", href: "#contact" },
    ],
    Support: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Get in Touch", href: "#contact" },
      { label: "Documentation", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-[#050507] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="wrapper relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div
              className="flex items-center gap-2 mb-8 group cursor-pointer"
              onClick={() => nav("#hero")}
            >
              <span className="font-display font-black text-2xl text-white tracking-tighter">
                ECO
              </span>
              <span className="font-display font-black text-2xl bg-linear-to-r from-primary to-cyan bg-clip-text text-transparent tracking-tighter">
                DrIx
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)] mb-1" />
            </div>

            <p className="text-[#888899] text-base leading-relaxed mb-8 max-w-sm">
              We empower startups and enterprises with high-performance digital
              systems, custom CRM logic, and scalable architectural solutions.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-[#64647A]">
                <Mail size={16} className="text-cyan" />
                <span>hello@ecodrix.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#64647A]">
                <MapPin size={16} className="text-primary" />
                <span>Tirupati, AP, India</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#64647A] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-6">
              <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase">
                {title}
              </h4>
              <nav className="flex flex-col gap-4">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        nav(link.href);
                      }
                    }}
                    className="nav-link-line text-sm text-[#64647A] hover:text-white transition-colors duration-300 self-start"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#444455] tracking-tight">
          <p>© 2026 ECODrIx SYSTEMS. ENGINEERED IN INDIA.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">
              SECURITY
            </a>
            <a href="#" className="hover:text-white transition-colors">
              STATUS
            </a>
            <a href="#" className="hover:text-white transition-colors">
              OS ARCHIVE
            </a>
          </div>
          <p className="flex items-center gap-2">
            DESIGNED WITH <span className="text-primary">✦</span> BY Dhanesh
          </p>
        </div>
      </div>
    </footer>
  );
}
