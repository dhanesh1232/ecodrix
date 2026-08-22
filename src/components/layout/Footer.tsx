"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import Link from "next/link";
import { BrandWordmark } from "./WordMark";

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
      { label: "Compare", href: "/compare" },
      { label: "Pricing", href: "/pricing" },
    ],
    Company: [
      { label: "About ECODrIx", href: "/about" },
      { label: "Founder", href: "/founder" },
      { label: "Contact", href: "/#contact" },
      { label: "Support", href: "mailto:support@ecodrix.com" },
      { label: "Careers", href: "mailto:contact@ecodrix.com" },
    ],
    Resources: [
      { label: "Status", href: "https://status.ecodrix.com" },
      { label: "API Docs", href: "https://api.ecodrix.com" },
      { label: "Security", href: "/legal/security" },
      { label: "SLA", href: "/legal/sla" },
      { label: "llms.txt", href: "/llms.txt" },
    ],
    Legal: [
      { label: "All Legal & Policies", href: "/legal" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
      { label: "Acceptable Use", href: "/legal/acceptable-use" },
      { label: "WhatsApp Policy", href: "/legal/whatsapp-policy" },
      { label: "Refund & Cancellation", href: "/legal/refund-policy" },
      { label: "Pricing Policy", href: "/legal/pricing-policy" },
      { label: "DPA", href: "/legal/dpa" },
      { label: "Sub-processors", href: "/legal/subprocessors" },
    ],
  };

  const brand = "ECODrIx";
  return (
    <footer aria-label="footer-block" className="footer-surface">
      <div className="relative bg-transparent pt-12 pb-12 overflow-hidden border-t border-border">
        {/* Premium Background Ambience */}
        <div
          className="absolute -top-24 left-1/3 w-[600px] h-[360px] bg-accent/20 blur-[150px] rounded-full pointer-events-none opacity-40"
          aria-hidden="true"
        />

        <div className="max-w-full px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 lg:gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div
                className="flex items-center gap-2 mb-8 group cursor-pointer w-fit"
                onClick={() => nav("#hero")}
              >
                <div className="relative flex items-center">
                  <Image
                    src="/logo.svg"
                    alt="ECODrIx"
                    width={160}
                    height={100}
                    className="h-20 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md font-medium">
                Unified business infrastructure combining CRM, AI automation,
                WhatsApp, email marketing, and cloud storage, built for growing
                businesses.
              </p>

              <div className="flex flex-wrap gap-4 no-collapse">
                {[
                  {
                    icon: FaLinkedin,
                    href: "https://www.linkedin.com/company/ecodrix",
                  },
                  { icon: FaGithub, href: "https://github.com/ecodrix" },
                  {
                    icon: FaInstagram,
                    href: "https://www.instagram.com/ecodr.ix/",
                  },
                ].map(({ icon: Icon, href }, i) => (
                  <Link
                    aria-label="navigation-to-social-media"
                    key={i}
                    href={href}
                    target="_blank"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-transparent border border-accent text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 hover:-translate-y-1"
                  >
                    <Icon size={20} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="lg:col-span-1">
                <h4 className="text-foreground font-bold text-[11px] tracking-[0.2em] mb-4">
                  {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith("#")) {
                            e.preventDefault();
                            nav(link.href);
                          }
                        }}
                        className="text-muted-foreground hover:text-foreground text-[15px] font-medium transition-colors duration-300 flex items-center group"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-linear-to-r from-transparent via-accent to-transparent" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-2 md:order-1">
              <p className="text-muted-foreground text-xs font-bold tracking-widest">
                © 2026 ECODrIx.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="mailto:support@ecodrix.com"
                  className="text-muted-foreground hover:text-foreground text-[11px] font-bold tracking-widest transition-colors"
                >
                  support@ecodrix.com
                </Link>
              </div>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new Event("ecodrix:open-cookie-preferences"),
                  )
                }
                className="text-muted-foreground hover:text-foreground text-[11px] font-bold tracking-widest transition-colors"
              >
                Cookie Preferences
              </button>
            </div>

            <p className="text-muted-foreground text-xs font-bold tracking-widest order-1 md:order-2 flex items-center gap-2">
              Engineered with{" "}
              <span className="text-accent animate-pulse">✦</span> in India
            </p>
          </div>
        </div>
      </div>
      {/* Oversized interactive brand wordmark — grayscale → gradient on hover */}
      <div className="w-full overflow-hidden bg-transparent px-4 sm:px-6 pb-4">
        <BrandWordmark text={brand} />
      </div>
    </footer>
  );
}
