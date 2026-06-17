"use client";

import {
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
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
      { label: "All Modules", href: "/platform" },
      { label: "ERIX-CRM", href: "/platform/crm" },
      { label: "WhatsApp API", href: "/platform/whatsapp" },
      { label: "ERIX-FLOW", href: "/platform/automation" },
      { label: "ERIX-LAIE", href: "/platform/lead-intelligence" },
      { label: "ErixStore", href: "/platform/erixstore" },
      { label: "Pricing", href: "/pricing" },
    ],
    Company: [
      { label: "About ECODrIx", href: "/about" },
      { label: "Founder", href: "/founder" },
      { label: "Brands", href: "/brands" },
      { label: "Contact", href: "/#contact" },
      { label: "Support", href: "mailto:support@ecodrix.com" },
      { label: "Careers", href: "mailto:contact@ecodrix.com" },
    ],
    Resources: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/about#security" },
      { label: "Status", href: "https://status.ecodrix.com" },
      { label: "API Docs", href: "https://api.ecodrix.com" },
      { label: "llms.txt", href: "/llms.txt" },
    ],
  };

  return (
    <footer className="relative bg-[#050508] pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Premium Background Ambience */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7C6EFA]/10 blur-[120px] rounded-full pointer-events-none opacity-20"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#22D3EE]/10 blur-[100px] rounded-full pointer-events-none opacity-10"
        aria-hidden="true"
      />

      <div className="wrapper relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <div
              className="flex items-center gap-2 mb-8 group cursor-pointer w-fit"
              onClick={() => nav("#hero")}
            >
              <div className="relative flex items-center">
                <Image
                  src="/logo.png"
                  alt="ECODrIx"
                  width={200}
                  height={80}
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            <p className="text-[#888899] text-lg leading-relaxed mb-10 max-w-md font-medium">
              Unified business infrastructure combining CRM, AI automation,
              WhatsApp, email marketing, and cloud storage — built for growing
              businesses.
            </p>

            <div className="flex flex-wrap gap-4 no-collapse">
              {[
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/dhanesh-mekalthuru-5baa9323b",
                },
                { icon: Github, href: "https://github.com/dhanesh1232" },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/erix.__.after17_59/",
                },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-[#888899] hover:bg-[#7C6EFA] hover:text-white hover:border-[#7C6EFA] transition-all duration-500 hover:-translate-y-1 polygon-icon"
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
                      <ArrowUpRight
                        size={14}
                        className="ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                      />
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
              © 2026 ECODrIx.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="mailto:support@ecodrix.com"
                className="text-[#64647A] hover:text-white text-[11px] font-bold tracking-widest uppercase transition-colors"
              >
                support@ecodrix.com
              </Link>
            </div>
          </div>

          <p className="text-[#444455] text-xs font-bold tracking-widest uppercase order-1 md:order-2 flex items-center gap-2">
            Engineered with{" "}
            <span className="text-[#7C6EFA] animate-pulse">✦</span> by Dhanesh
          </p>
        </div>
      </div>
    </footer>
  );
}
