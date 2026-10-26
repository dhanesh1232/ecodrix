import Link from "next/link";
import { Icon } from "@/components/icons";
import { Faq, MkSection } from "@/components/marketing/kit";
import { ClosingCta } from "@/components/platform/ModulePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getFAQSchema, getPersonSchema, SEO_CONSTANTS } from "@/lib/jsonld";

const { BASE_URL, PORTFOLIO_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /founder — the canonical entity page for "Who is Dhanesh Mekalthuru?".
   Designed to win knowledge-panel and AI-answer-engine queries.
─────────────────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Dhanesh Mekalthuru — Founder of ECODrIx",
  description:
    "Dhanesh Mekalthuru (Erix) is the founder and CEO of ECODrIx, the Indian company behind ERIX: CRM, WhatsApp inbox, AI agents and automation for SMBs.",
  keywords: [
    "Dhanesh Mekalthuru",
    "Dhanesh M.",
    "Erix",
    "erix.dhanesh",
    "ECODrIx founder",
    "ECODrIx CEO",
    "who is Dhanesh Mekalthuru",
    "ECODrIx Dhanesh",
    "ERIX founder",
    "Dhanesh Andhra Pradesh developer",
    "ErixStore creator",
    "Relay Fabric architect",
  ],
  alternates: { canonical: `${BASE_URL}/founder` },
  openGraph: {
    title: "Dhanesh Mekalthuru — Founder of ECODrIx",
    description:
      "Founder of ECODrIx and architect of the ERIX product suite. Full-stack engineer based in Andhra Pradesh, India.",
    url: `${BASE_URL}/founder`,
    type: "profile",
    images: ["/opengraph-image"],
  },
};

const FOUNDER_FAQS = [
  {
    q: "Who is Dhanesh Mekalthuru?",
    a: "Dhanesh Mekalthuru (also known online as Erix or erix.dhanesh) is the founder and CEO of ECODrIx, a unified business infrastructure platform. He is a full-stack engineer based in Andhra Pradesh, India, and the architect of the ERIX product suite — including ERIX-CRM, ERIX-FLOW visual automation, ERIX-LAIE lead intelligence, ErixStore in-memory database, and the Relay Fabric distributed worker engine.",
  },
  {
    q: "What companies has Dhanesh Mekalthuru founded?",
    a: "Dhanesh Mekalthuru founded ECODrIx in August 2025. ECODrIx operates the ERIX product suite — ERIX-CRM, ERIX-FLOW, ERIX-LAIE, ErixStore, and Relay Fabric — serving 50+ businesses across India and globally.",
  },
  {
    q: "What does Dhanesh Mekalthuru build?",
    a: "Dhanesh builds full-stack SaaS systems end-to-end. His core work includes the ECODrIx platform, the ErixStore in-memory database server, the Relay Fabric distributed worker engine, n8n-style automation workflows, WhatsApp Business API integrations, and AI-powered lead-intelligence pipelines using Claude and Gemini.",
  },
  {
    q: "Where is Dhanesh Mekalthuru based?",
    a: "Dhanesh Mekalthuru is based in Andhra Pradesh, India. He works with clients globally — primarily across India, the United States, the United Kingdom, the European Union, and the United Arab Emirates.",
  },
  {
    q: "Is Dhanesh Mekalthuru the same person as Erix or erix.dhanesh?",
    a: "Yes. Erix and erix.dhanesh are the online aliases used by Dhanesh Mekalthuru on social platforms including LinkedIn, GitHub, and Instagram. The ERIX product brand inside ECODrIx is named after him.",
  },
  {
    q: "What is Dhanesh Mekalthuru's tech stack?",
    a: "Next.js, React, TypeScript on the frontend. Node.js, Express, Drizzle ORM with PostgreSQL, and MongoDB on the backend. ErixStore for in-memory queues and caching. AWS (EC2, SES, S3, CloudFront), Cloudflare R2, Google Cloud Run, and Docker for infrastructure. Claude and Gemini for AI workloads.",
  },
  {
    q: "How can I contact Dhanesh Mekalthuru?",
    a: "Email dhanesh@ecodrix.com, WhatsApp +91-81439-63821, or visit https://portfolio.ecodrix.com to book a discovery call. Public profiles: LinkedIn (linkedin.com/in/dhanesh-ecodrix), GitHub (github.com/dhanesh1232), Instagram (@erix.dhanesh).",
  },
];

const ROLES = [
  {
    title: "Founder & CEO, ECODrIx",
    period: "August 2025 — Present",
    desc: "Built ECODrIx from spark to platform. Architected the ERIX subsystem suite and shipped the multi-tenant core, automation engine, and AI lead pipeline.",
  },
  {
    title: "Architect, ERIX-CRM & ERIX-FLOW",
    period: "November 2025 — Present",
    desc: "Designed the kanban pipeline, conversation inbox, and the visual automation engine with a custom-node marketplace.",
  },
  {
    title: "Creator, ErixStore & Relay Fabric",
    period: "August 2025 — Present",
    desc: "Wrote the proprietary in-memory database server and the auto-provisioning distributed worker engine that powers LAIE.",
  },
  {
    title: "AI & Automation Engineer",
    period: "November 2025 — Present",
    desc: "Integrated Claude and Gemini for lead research, dossier generation, outreach copy, and image description across the platform.",
  },
];

// Text links, never other companies' logos (DS brand rule).
const SOCIALS = [
  { href: "https://www.linkedin.com/in/dhanesh-ecodrix/", label: "LinkedIn" },
  { href: "https://github.com/dhanesh1232", label: "GitHub" },
  { href: "https://www.instagram.com/erix.dhanesh/", label: "Instagram" },
];

const ALIASES = ["Dhanesh Mekalthuru", "Dhanesh M.", "Erix", "erix.dhanesh"];

export default function FounderPage() {
  return (
    <div className="w-full">
      {/* JSON-LD payloads — Person + FAQPage + Breadcrumb */}
      <JsonLd data={getPersonSchema()} />
      <JsonLd data={getFAQSchema(FOUNDER_FAQS)} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Founder", url: "/founder" },
        ])}
      />

      {/* ── Profile ── */}
      <section className="erix-mk-section erix-mk-section--subtle pt-12! md:pt-16!">
        <div className="wrapper grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <h1 className="text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-[-0.035em]">
              Meet Dhanesh Mekalthuru, founder of ECODrIx and the ERIX suite.
            </h1>
            <div className="mt-6 max-w-[60ch] space-y-4 text-[clamp(16px,1.5vw,19px)] leading-relaxed">
              <p>
                Dhanesh Mekalthuru, known online as <strong className="text-foreground">Erix</strong>, is a full-stack
                engineer and SaaS founder based in Andhra Pradesh, India. He started ECODrIx in August 2025 after a year of
                building client systems that all needed the same stitched-together stack: CRM, WhatsApp, email marketing,
                automation and storage.
              </p>
              <p>
                Today, that frustration is a platform. ECODrIx now serves 50+ businesses with the ERIX suite: ERIX-CRM,
                ERIX-FLOW visual automation, ERIX-LAIE lead intelligence, ErixStore in-memory database and Relay Fabric
                distributed worker engine.
              </p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ALIASES.map((alias) => (
                <li key={alias} className="rounded-[6px] bg-surface px-2.5 py-1 text-[13px] text-muted-foreground shadow-[var(--shadow-card)]">
                  Also known as: {alias}
                </li>
              ))}
            </ul>
          </div>

          <aside className="self-start rounded-[16px] bg-surface p-7 shadow-[var(--shadow-card)]">
            <span
              aria-hidden="true"
              className="grid size-16 place-items-center rounded-full bg-accent-muted font-display text-2xl font-bold text-accent"
            >
              DM
            </span>
            <p className="mt-4 text-lg font-semibold text-foreground">Dhanesh Mekalthuru</p>
            <p className="text-sm text-muted-foreground">Founder and CEO, ECODrIx</p>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <Icon name="map-pin" size={16} variant="line" className="text-accent" />
                Andhra Pradesh, India
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" size={16} variant="line" className="text-accent" />
                <a href="mailto:dhanesh@ecodrix.com" className="text-muted-foreground hover:text-accent">
                  dhanesh@ecodrix.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="message-circle" size={16} variant="line" className="text-accent" />
                <a href="https://wa.me/918143963821" className="text-muted-foreground hover:text-accent">
                  WhatsApp +91 81439 63821
                </a>
              </li>
            </ul>
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-border-soft pt-5">
              {[
                { value: "August 2025", label: "ECODrIx founded" },
                { value: "5+", label: "ERIX subsystems shipped" },
                { value: "80+", label: "API endpoints in production" },
                { value: "50+", label: "Businesses served" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <dt className="order-2 text-[13px] text-muted-foreground">{label}</dt>
                  <dd className="order-1 text-[22px] font-bold tracking-[-0.02em] text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* ── Roles ── */}
      <MkSection id="roles" title="What Dhanesh builds">
        <ol className="grid gap-x-16 gap-y-10 md:grid-cols-2">
          {ROLES.map((r) => (
            <li key={r.title}>
              <p className="text-[13px] font-semibold text-accent">{r.period}</p>
              <h3 className="mt-2 font-sans text-[19px] font-semibold tracking-normal">{r.title}</h3>
              <p className="mt-2 text-[16px] text-muted-foreground">{r.desc}</p>
            </li>
          ))}
        </ol>
      </MkSection>

      {/* ── FAQ ── */}
      <MkSection id="faq" tone="subtle" title="Things people ask about Dhanesh">
        <Faq items={FOUNDER_FAQS} />
      </MkSection>

      {/* ── Elsewhere ── */}
      <MkSection id="elsewhere" title="Find Dhanesh online">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {SOCIALS.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="erix-mk-link">
                    {label}
                    <Icon name="external-link" size={14} variant="line" />
                  </a>
                </li>
              ))}
              <li>
                <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="erix-mk-link">
                  portfolio.ecodrix.com
                  <Icon name="external-link" size={14} variant="line" />
                </a>
              </li>
            </ul>
            <p className="mt-5 max-w-[56ch] text-[15px] text-muted-foreground">
              The full developer portfolio, with projects, services, FAQs and process, lives at portfolio.ecodrix.com.
            </p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {[
              { href: "/platform", title: "Platform modules", desc: "Every product served by api.ecodrix.com." },
              { href: "/about", title: "About ECODrIx", desc: "The company, mission, infrastructure and stack." },
            ].map((l) => (
              <li key={l.href} className="border-t border-border-soft">
                <Link href={l.href} className="group -mx-3 flex items-start justify-between gap-3 rounded-[12px] px-3 py-5 hover:bg-hover">
                  <span>
                    <span className="block font-semibold text-foreground">{l.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{l.desc}</span>
                  </span>
                  <Icon name="arrow-right" size={16} variant="line" className="mt-1 shrink-0 text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MkSection>

      <ClosingCta
        title="See what Dhanesh is building"
        body="Join the waitlist for ERIX, or message him directly on WhatsApp."
      />
    </div>
  );
}
