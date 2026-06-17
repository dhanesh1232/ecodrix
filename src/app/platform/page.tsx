import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLATFORM_MODULES } from "@/lib/platform-modules";
import {
  getBreadcrumbSchema,
  getItemListSchema,
  getFAQSchema,
  SEO_CONSTANTS,
} from "@/lib/jsonld";

const { BASE_URL, API_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /platform — index page covering every module served by api.ecodrix.com.
   Designed so any organic search about a feature surfaces this page
   (and the per-module landing page beneath it).
─────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Platform Modules | ECODrIx",
  description:
    "Every product inside ECODrIx — CRM, WhatsApp, automation, lead intelligence, email marketing, cloud storage, client portal, ErixStore, and Relay Fabric. One platform, one login, one API.",
  keywords: [
    "ECODrIx platform",
    "ECODrIx products",
    "ECODrIx API",
    "ECODrIx modules",
    "ECODrIx features",
    "unified business platform",
    "CRM WhatsApp automation",
  ],
  alternates: { canonical: `${BASE_URL}/platform` },
  openGraph: {
    title: "Platform Modules | ECODrIx",
    description:
      "Every product inside ECODrIx — CRM, WhatsApp, automation, lead intelligence, email, storage, and more.",
    url: `${BASE_URL}/platform`,
    type: "website",
  },
};

const PLATFORM_FAQS = [
  {
    q: "What does the ECODrIx platform include?",
    a: "ECODrIx includes a CRM with kanban pipeline (ERIX-CRM), WhatsApp Business API and unified inbox, a visual workflow automation engine (ERIX-FLOW), B2B lead intelligence (ERIX-LAIE), email marketing on AWS SES, cloud storage on Cloudflare R2, a meeting scheduler, a branded client portal, the ErixStore in-memory database, and the Relay Fabric distributed worker engine.",
  },
  {
    q: "Is there a public ECODrIx API?",
    a: "Yes. The ECODrIx API is served at https://api.ecodrix.com. It exposes REST endpoints for CRM, conversations, automation flows, lead intelligence, channel connections, storage, and the client portal. Authentication is handled via per-tenant API keys (x-api-key + x-client-code), scoped LAIE keys, or platform session tokens depending on the surface.",
  },
  {
    q: "Can I use just one module of ECODrIx?",
    a: "Yes. While the modules are tightly integrated (a lead in ERIX-CRM can trigger an ERIX-FLOW workflow that sends a WhatsApp template), you can adopt them one at a time. The Free plan includes every module at starter quotas, so you can start with just the CRM or just WhatsApp and expand as you grow.",
  },
  {
    q: "Does ECODrIx offer real-time updates?",
    a: "Yes. ECODrIx exposes a Socket.IO endpoint at wss://api.ecodrix.com that emits real-time events — new conversation messages, message status updates (sent/delivered/read), workflow run progress, LAIE job logs and enrichment completions, relay-fabric health snapshots, and platform notifications.",
  },
];

export default function PlatformIndexPage() {
  return (
    <main className="bg-background text-white min-h-screen overflow-x-hidden">
      {/* JSON-LD: ItemList + FAQ + Breadcrumb */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getItemListSchema(
              PLATFORM_MODULES.map((m) => ({
                name: m.name,
                url: `/platform/${m.slug}`,
                description: m.description,
              })),
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(PLATFORM_FAQS)),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Platform", url: "/platform" },
            ]),
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
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
          <div className="pill mb-8">Platform</div>
          <h1
            className="font-display font-black text-white mb-8 max-w-4xl"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 4.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Every module in <span className="grad-text">ECODrIx.</span>
          </h1>
          <p
            className="text-text-lo max-w-2xl leading-relaxed mb-6"
            style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
          >
            ECODrIx is one platform with many surfaces. Each module is a
            self-contained product, exposed through a clean public API at{" "}
            <a
              href={API_URL}
              className="text-primary underline underline-offset-4"
            >
              api.ecodrix.com
            </a>
            . Pick the ones you need today, scale into the rest tomorrow.
          </p>
        </div>
      </section>

      {/* ── Module grid ── */}
      <section className="py-16 px-6">
        <div className="wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORM_MODULES.map((m) => (
              <Link
                key={m.slug}
                href={`/platform/${m.slug}`}
                className="group relative p-px transition-colors duration-300"
                style={{
                  clipPath:
                    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `${m.color}14`,
                    clipPath:
                      "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  }}
                />
                <div
                  className="relative h-full p-7 flex flex-col"
                  style={{
                    background: "#0D0D14",
                    clipPath:
                      "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  }}
                >
                  <div
                    className="w-1 h-8 mb-5"
                    style={{ background: m.color }}
                  />
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest mb-2"
                    style={{ color: m.color }}
                  >
                    {m.brand}
                  </span>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {m.name}
                  </h3>
                  <p className="text-text-lo text-sm leading-relaxed mb-5 flex-1">
                    {m.tagline}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    {m.apiBase ? (
                      <code
                        className="font-mono text-[10px] text-text-mid"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          padding: "3px 8px",
                        }}
                      >
                        {m.apiBase}
                      </code>
                    ) : (
                      <span />
                    )}
                    <ArrowRight
                      size={16}
                      className="text-text-lo group-hover:text-white group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 sep-top" style={{ background: "#060608" }}>
        <div className="wrapper">
          <div className="pill mb-6">Platform questions</div>
          <h2
            className="font-display font-black text-white mb-12"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            How the platform works.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {PLATFORM_FAQS.map(({ q, a }) => (
              <div key={q} className="p-8 bg-[#0A0A10]">
                <h3 className="text-white font-bold mb-3 text-base">{q}</h3>
                <p className="text-text-lo text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
