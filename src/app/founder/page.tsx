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
    a: "Dhanesh Mekalthuru founded ECODrIx in March 2024. ECODrIx operates the ERIX product suite — ERIX-CRM, ERIX-FLOW, ERIX-LAIE, ErixStore, and Relay Fabric — serving 50+ businesses across India and globally.",
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
    period: "March 2024 — Present",
    desc: "Built ECODrIx from spark to platform. Architected the ERIX subsystem suite and shipped the multi-tenant core, automation engine, and AI lead pipeline.",
    color: "#7C6EFA",
  },
  {
    title: "Architect, ERIX-CRM & ERIX-FLOW",
    period: "September 2024 — Present",
    desc: "Designed the kanban pipeline, conversation inbox, and the visual automation engine with a custom-node marketplace.",
    color: "#22D3EE",
  },
  {
    title: "Creator, ErixStore & Relay Fabric",
    period: "March 2025 — Present",
    desc: "Wrote the proprietary in-memory database server and the auto-provisioning distributed worker engine that powers LAIE.",
    color: "#4ADE80",
  },
  {
    title: "AI & Automation Engineer",
    period: "September 2025 — Present",
    desc: "Integrated Claude and Gemini for lead research, dossier generation, outreach copy, and image description across the platform.",
    color: "#F59E0B",
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
    <main className="bg-background text-white min-h-screen overflow-x-hidden">
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
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden
          style={{
            width: "700px",
            height: "400px",
            background:
              "conic-gradient(from 270deg at 50% 0%, transparent 55deg, rgba(124,110,250,0.18) 85deg, rgba(34,211,238,0.07) 115deg, transparent 155deg)",
            filter: "blur(14px)",
          }}
        />
        <div className="wrapper relative z-10">
          <div className="pill mb-8">
            <Sparkles size={11} />
            Founder profile
          </div>
          <h1
            className="font-display font-black text-white mb-8 max-w-4xl"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 4.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Meet <span className="grad-text">Dhanesh Mekalthuru</span> — founder
            of ECODrIx and the ERIX suite.
          </h1>

          <div className="max-w-3xl space-y-5">
            <p
              className="text-text-lo leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
            >
              Dhanesh Mekalthuru — known online as <strong>Erix</strong> — is a
              full-stack engineer and SaaS founder based in Andhra Pradesh,
              India. He started ECODrIx in March 2024 after a year of building
              client systems that all needed the same stitched-together stack:
              CRM, WhatsApp, email marketing, automation, and storage.
            </p>
            <p
              className="text-text-lo leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
            >
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
                  className="polygon-tag text-text-mid"
                  style={{ background: "rgba(124,110,250,0.08)" }}
                >
                  Also known as: {alias}
                </span>
              ))}
            </div>

            {/* Quick contact */}
            <div className="flex flex-wrap items-center gap-5 pt-6 text-sm">
              <span className="flex items-center gap-2 text-text-lo">
                <MapPin size={14} className="text-primary" />
                Andhra Pradesh, India
              </span>
              <span className="flex items-center gap-2 text-text-lo">
                <Mail size={14} className="text-primary" />
                dhanesh@ecodrix.com
              </span>
              <span className="flex items-center gap-2 text-text-lo">
                <BsWhatsapp size={14} className="text-[#4ADE80]" />
                +91 81439 63821
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── At-a-glance ── */}
      <section className="border-y border-white/5">
        <div className="wrapper">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {[
              { value: "March 2024", label: "ECODrIx founded" },
              { value: "5+", label: "ERIX subsystems shipped" },
              { value: "80+", label: "API endpoints in production" },
              { value: "50+", label: "Businesses served" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-10 px-4"
              >
                <span
                  className="grad-text font-display font-black mb-2 text-center"
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {value}
                </span>
                <span className="text-text-lo text-sm font-medium text-center">
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
          <h2
            className="font-display font-black text-white mb-12"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            What Dhanesh builds.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ROLES.map((r) => (
              <div
                key={r.title}
                className="relative p-px"
                style={{
                  clipPath:
                    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="relative h-full p-7"
                  style={{
                    background: "#0D0D14",
                    clipPath:
                      "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  }}
                >
                  <span
                    className="font-mono text-[10px] font-bold block mb-3 uppercase tracking-widest"
                    style={{ color: r.color }}
                  >
                    {r.period}
                  </span>
                  <h3 className="text-white font-bold text-lg mb-3">
                    {r.title}
                  </h3>
                  <p className="text-text-lo text-sm leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 sep-top" style={{ background: "#060608" }}>
        <div className="wrapper">
          <div className="pill mb-6">Frequently asked</div>
          <h2
            className="font-display font-black text-white mb-12"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Things people ask about Dhanesh.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {FOUNDER_FAQS.map(({ q, a }) => (
              <div key={q} className="p-8 bg-[#0A0A10]">
                <h3 className="text-white font-bold mb-3 text-base">{q}</h3>
                <p className="text-text-lo text-sm leading-relaxed">{a}</p>
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
            <h2
              className="font-display font-black text-white mb-6"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Find Dhanesh online.
            </h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-mid border border-white/8 hover:text-white hover:border-primary/30 transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    clipPath:
                      "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                  }}
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-mid border border-white/8 hover:text-white hover:border-primary/30 transition-colors"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  clipPath:
                    "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                }}
              >
                <ArrowRight size={14} />
                portfolio.ecodrix.com
              </a>
            </div>
            <p className="text-text-lo text-sm leading-relaxed">
              The full developer portfolio — projects, services, FAQs, and
              process — lives at{" "}
              <a
                href={PORTFOLIO_URL}
                className="text-primary underline underline-offset-4"
              >
                portfolio.ecodrix.com
              </a>
              .
            </p>
          </div>

          <div>
            <div className="pill mb-6">Explore</div>
            <h2
              className="font-display font-black text-white mb-6"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                letterSpacing: "-0.04em",
              }}
            >
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
                  className="group flex items-center justify-between p-5 border border-white/8 hover:border-primary/30 transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    clipPath:
                      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                  }}
                >
                  <div>
                    <div className="text-white font-bold text-sm mb-1">
                      {l.title}
                    </div>
                    <div className="text-text-lo text-xs">{l.desc}</div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-text-lo group-hover:text-primary group-hover:translate-x-1 transition-all"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
