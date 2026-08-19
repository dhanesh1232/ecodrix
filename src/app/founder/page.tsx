import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Sparkles,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import {
  getPersonSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  SEO_CONSTANTS,
} from "@/lib/jsonld";

const { BASE_URL, PORTFOLIO_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /founder — the canonical entity page for "Who is Dhanesh Mekalthuru?".
   Designed to win knowledge-panel and AI-answer-engine queries.
─────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Dhanesh Mekalthuru — Founder of ECODrIx",
  description:
    "Dhanesh Mekalthuru (Erix) is the founder and CEO of ECODrIx — a unified business infrastructure platform powering ERIX-CRM, ERIX-FLOW, ERIX-LAIE, ErixStore, and Relay Fabric.",
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
    color: "var(--color-accent)",
  },
  {
    title: "Architect, ERIX-CRM & ERIX-FLOW",
    period: "November 2025 — Present",
    desc: "Designed the kanban pipeline, conversation inbox, and the visual automation engine with a custom-node marketplace.",
    color: "var(--color-brand-purple)",
  },
  {
    title: "Creator, ErixStore & Relay Fabric",
    period: "August 2025 — Present",
    desc: "Wrote the proprietary in-memory database server and the auto-provisioning distributed worker engine that powers LAIE.",
    color: "var(--color-success)",
  },
  {
    title: "AI & Automation Engineer",
    period: "November 2025 — Present",
    desc: "Integrated Claude and Gemini for lead research, dossier generation, outreach copy, and image description across the platform.",
    color: "var(--color-warning)",
  },
];

const SOCIALS = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/dhanesh-ecodrix/",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/dhanesh1232",
    label: "GitHub",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/erix.dhanesh/",
    label: "Instagram",
  },
];

const ALIASES = ["Dhanesh Mekalthuru", "Dhanesh M.", "Erix", "erix.dhanesh"];

export default function FounderPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      {/* JSON-LD payloads — Person + FAQPage + Breadcrumb */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPersonSchema()),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(FOUNDER_FAQS)),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Founder", url: "/founder" },
            ]),
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[700px] h-[400px] blur-[14px] bg-[conic-gradient(from_270deg_at_50%_0%,transparent_55deg,rgba(43,77,203,0.18)_85deg,rgba(141,31,174,0.07)_115deg,transparent_155deg)]"
          aria-hidden
        />
        <div className="wrapper relative z-10">
          <div className="pill mb-8">
            <Sparkles size={11} />
            Founder profile
          </div>
          <h1 className="font-display font-black text-foreground mb-8 max-w-4xl text-[clamp(2.6rem,7vw,4.5rem)] tracking-[-0.04em] leading-[1.05]">
            Meet <span className="grad-text">Dhanesh Mekalthuru</span> — founder
            of ECODrIx and the ERIX suite.
          </h1>

          <div className="max-w-3xl space-y-5">
            <p className="text-subtle leading-relaxed text-[clamp(1rem,2vw,1.15rem)]">
              Dhanesh Mekalthuru — known online as <strong>Erix</strong> — is a
              full-stack engineer and SaaS founder based in Andhra Pradesh,
              India. He started ECODrIx in August 2025 after a year of building
              client systems that all needed the same stitched-together stack:
              CRM, WhatsApp, email marketing, automation, and storage.
            </p>
            <p className="text-subtle leading-relaxed text-[clamp(1rem,2vw,1.15rem)]">
              Two years later, that frustration is a platform. ECODrIx now
              serves 50+ businesses with the ERIX suite — ERIX-CRM, ERIX-FLOW
              visual automation, ERIX-LAIE lead intelligence, ErixStore
              in-memory database, and Relay Fabric distributed worker engine.
            </p>

            {/* Aliases — explicit text for entity disambiguation */}
            <div className="flex flex-wrap gap-2 pt-4">
              {ALIASES.map((alias) => (
                <span
                  key={alias}
                  className="polygon-tag text-muted-foreground bg-accent/8"
                >
                  Also known as: {alias}
                </span>
              ))}
            </div>

            {/* Quick contact */}
            <div className="flex flex-wrap items-center gap-5 pt-6 text-sm">
              <span className="flex items-center gap-2 text-subtle">
                <MapPin size={14} className="text-accent" />
                Andhra Pradesh, India
              </span>
              <span className="flex items-center gap-2 text-subtle">
                <Mail size={14} className="text-accent" />
                dhanesh@ecodrix.com
              </span>
              <span className="flex items-center gap-2 text-subtle">
                <BsWhatsapp size={14} className="text-success" />
                +91 81439 63821
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── At-a-glance ── */}
      <section className="border-y border-foreground/5">
        <div className="wrapper">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-foreground/5">
            {[
              { value: "August 2025", label: "ECODrIx founded" },
              { value: "5+", label: "ERIX subsystems shipped" },
              { value: "80+", label: "API endpoints in production" },
              { value: "50+", label: "Businesses served" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-10 px-4"
              >
                <span className="grad-text font-display font-black mb-2 text-center text-[clamp(1.4rem,3vw,2.4rem)] tracking-[-0.04em]">
                  {value}
                </span>
                <span className="text-subtle text-sm font-medium text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles & timeline ── */}
      <section className="py-24 px-6">
        <div className="wrapper">
          <div className="pill mb-6">Roles</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(2rem,4vw,3rem)] tracking-[-0.04em]">
            What Dhanesh builds.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ROLES.map((r) => (
              <div
                key={r.title}
                className="relative p-px rounded-none bg-foreground/6"
                style={{ "--tile": r.color } as React.CSSProperties}
              >
                <div className="relative h-full p-7 rounded-none bg-surface">
                  <span className="font-sans text-[10px] font-bold block mb-3 uppercase tracking-widest text-[var(--tile)]">
                    {r.period}
                  </span>
                  <h3 className="text-foreground font-bold text-lg mb-3">
                    {r.title}
                  </h3>
                  <p className="text-subtle text-sm leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Frequently asked</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(2rem,4vw,3rem)] tracking-[-0.04em]">
            Things people ask about Dhanesh.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
            {FOUNDER_FAQS.map(({ q, a }) => (
              <div key={q} className="p-8 bg-surface">
                <h3 className="text-foreground font-bold mb-3 text-base">
                  {q}
                </h3>
                <p className="text-subtle text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-links + socials ── */}
      <section className="py-24 px-6">
        <div className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="pill mb-6">Elsewhere</div>
            <h2 className="font-display font-black text-foreground mb-6 text-[clamp(1.6rem,3vw,2.2rem)] tracking-[-0.04em]">
              Find Dhanesh online.
            </h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground border border-foreground/8 hover:text-foreground hover:border-accent/30 transition-colors rounded-none bg-foreground/3"
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground border border-foreground/8 hover:text-foreground hover:border-accent/30 transition-colors rounded-none bg-foreground/3"
              >
                <ArrowRight size={14} />
                portfolio.ecodrix.com
              </a>
            </div>
            <p className="text-subtle text-sm leading-relaxed">
              The full developer portfolio — projects, services, FAQs, and
              process — lives at{" "}
              <a
                href={PORTFOLIO_URL}
                className="text-accent underline underline-offset-4"
              >
                portfolio.ecodrix.com
              </a>
              .
            </p>
          </div>

          <div>
            <div className="pill mb-6">Explore</div>
            <h2 className="font-display font-black text-foreground mb-6 text-[clamp(1.6rem,3vw,2.2rem)] tracking-[-0.04em]">
              The ECODrIx ecosystem.
            </h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  href: "/brands",
                  title: "ERIX brands",
                  desc: "ERIX-CRM, ERIX-FLOW, ERIX-LAIE, ErixStore, Relay Fabric.",
                },
                {
                  href: "/platform",
                  title: "Platform modules",
                  desc: "Every product served by api.ecodrix.com.",
                },
                {
                  href: "/about",
                  title: "About ECODrIx",
                  desc: "The company, mission, infrastructure, and stack.",
                },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between p-5 border border-foreground/8 hover:border-accent/30 transition-colors rounded-none bg-foreground/[0.02]"
                >
                  <div>
                    <div className="text-foreground font-bold text-sm mb-1">
                      {l.title}
                    </div>
                    <div className="text-subtle text-xs">{l.desc}</div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-subtle group-hover:text-accent group-hover:translate-x-1 transition-all"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
