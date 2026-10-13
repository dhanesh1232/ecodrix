"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

const columns = {
  Platform: [
    { label: "All tools", href: "/platform" },
    { label: "ERIX CRM", href: "/platform/erix-crm" },
    { label: "ERIX Connect", href: "/platform/erix-connect" },
    { label: "ERIX Flow", href: "/platform/erix-flow" },
    { label: "ERIX LAIE", href: "/platform/erix-laie" },
    { label: "ERIX Storage", href: "/platform/erix-storage" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Founder", href: "/founder" },
    { label: "Blog", href: "/blog" },
    { label: "Compare", href: "/compare" },
    { label: "Join the waitlist", href: "/#contact" },
  ],
  Resources: [
    { label: "Status", href: "https://status.ecodrix.com" },
    { label: "API docs", href: "https://api.ecodrix.com" },
    { label: "Security", href: "/legal/security" },
    { label: "SLA", href: "/legal/sla" },
    { label: "Support", href: "mailto:support@ecodrix.com" },
  ],
  Legal: [
    { label: "Terms of service", href: "/legal/terms" },
    { label: "Privacy policy", href: "/legal/privacy" },
    { label: "Cookie policy", href: "/legal/cookie-policy" },
    { label: "WhatsApp policy", href: "/legal/whatsapp-policy" },
    { label: "Refunds and cancellation", href: "/legal/refund-policy" },
    { label: "All policies", href: "/legal" },
  ],
};

const socials = [
  { label: "ECODrIx on LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/company/ecodrix" },
  { label: "ECODrIx on GitHub", icon: FaGithub, href: "https://github.com/ecodrix" },
  { label: "ECODrIx on Instagram", icon: FaInstagram, href: "https://www.instagram.com/ecodr.ix/" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="wrapper grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2" aria-label="ECODrIx home">
            <Image src="/logo.svg" alt="" width={36} height={36} className="size-9" priority />
            <span className="font-display text-xl font-bold text-foreground">ECODrIx</span>
          </Link>
          <p className="mt-4 max-w-sm text-muted-foreground">
            ERIX is one workspace for Indian businesses: CRM, WhatsApp and email,
            GST invoices and AI automation.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, icon: Icon, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-accent hover:text-accent"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {Object.entries(columns).map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <h2 className="font-sans text-sm font-semibold text-foreground">{title}</h2>
            <ul className="mt-4 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-muted-foreground hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="wrapper flex flex-col gap-3 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} ECODrIx. Made in India.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="mailto:support@ecodrix.com" className="hover:text-accent">
              support@ecodrix.com
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("ecodrix:open-cookie-preferences"))}
              className="hover:text-accent"
            >
              Cookie preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
