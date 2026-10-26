import Image from "next/image";
import Link from "next/link";
import { CookiePrefsButton } from "@/components/legal/CookiePrefsButton";
import { StatusBadge } from "@/components/ui/status-badge";
import { PLATFORM_NAV, PRIMARY_CTA, type ModuleStatus } from "@/lib/site";

type FooterLink = { label: string; href: string; status?: ModuleStatus };

const columns: Record<string, FooterLink[]> = {
  Platform: [
    { label: "All of ERIX", href: "/platform" },
    ...PLATFORM_NAV.map((m) => ({ label: m.name, href: m.href, status: m.status })),
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Founder", href: "/founder" },
    { label: "Blog", href: "/blog" },
    { label: "Compare", href: "/compare" },
    { label: PRIMARY_CTA.label, href: PRIMARY_CTA.href },
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

// Text labels, never other companies' logos (DS brand rule).
const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ecodrix" },
  { label: "GitHub", href: "https://github.com/ecodrix" },
  { label: "Instagram", href: "https://www.instagram.com/ecodr.ix/" },
];

/** The kit's footer: light, product columns, the legal links Indian buyers look for. */
export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-surface">
      <div className="wrapper grid grid-cols-2 gap-x-6 gap-y-10 pt-14 pb-10 lg:grid-cols-6 lg:gap-8">
        <div className="col-span-2">
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="ECODrIx home">
            <Image src="/logo.svg" alt="" width={32} height={32} className="size-8" />
            <span className="font-display text-xl font-bold text-foreground">ECODrIx</span>
          </Link>
          <p className="mt-4 max-w-[30ch] text-[15px] text-muted-foreground">
            ERIX is one workspace for Indian businesses: CRM, WhatsApp and email, GST invoices, AI agents
            and automation.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {socials.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-semibold text-muted-foreground hover:text-foreground"
                >
                  {label}
                  <span className="sr-only"> (ECODrIx, opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {Object.entries(columns).map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <h2 className="font-sans text-[13.5px] font-semibold text-foreground">{title}</h2>
            <ul className="mt-3 space-y-2">
              {links.map((l) => (
                <li key={l.href} className="flex flex-wrap items-center gap-2">
                  <Link href={l.href} className="text-[14px] text-muted-foreground hover:text-foreground">
                    {l.label}
                  </Link>
                  {l.status && l.status !== "live" && <StatusBadge status={l.status} />}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="wrapper">
        <div className="flex flex-col gap-3 border-t border-border-soft py-6 text-[13px] text-subtle md:flex-row md:items-center md:justify-between">
          <p className="text-subtle">© {new Date().getFullYear()} ECODrIx. Made in India.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="mailto:support@ecodrix.com" className="hover:text-foreground">
              support@ecodrix.com
            </a>
            <CookiePrefsButton className="hover:text-foreground" />
          </div>
        </div>
      </div>
    </footer>
  );
}
