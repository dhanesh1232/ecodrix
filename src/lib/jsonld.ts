/**
 * JSON-LD schema utilities for ECODrIx.
 *
 * These structured data payloads help search engines, AI assistants, and
 * answer-engines (Google, Bing, Perplexity, ChatGPT, Claude) understand the
 * site's identity and surface rich results — sitelinks search box, knowledge
 * panel entries, FAQ rich results, breadcrumb trails, and product cards.
 *
 * Spec: https://schema.org
 *   - Organization | WebSite | SoftwareApplication
 *   - Person       | FAQPage | BreadcrumbList
 *   - Product      | Service | ItemList
 */

const BASE_URL = "https://ecodrix.com";
const PORTFOLIO_URL = "https://portfolio.ecodrix.com";
const APP_URL = "https://app.ecodrix.com";
const API_URL = "https://api.ecodrix.com";

/* ──────────────────────────────────────────────────────────────────────
   Identity graph — every schema below references the same canonical IDs.
   This stitches the entire ecosystem (org + person + brands + products)
   into one disambiguated cluster the search engines can confidently rank.
─────────────────────────────────────────────────────────────────────── */

const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const PERSON_ID = `${BASE_URL}/#dhanesh`;
const SOFTWARE_ID = `${BASE_URL}/#platform`;

const SAME_AS = [
  PORTFOLIO_URL,
  "https://www.linkedin.com/in/dhanesh-ecodrix/",
  "https://www.linkedin.com/in/dhanesh-mekalthuru-5baa9323b",
  "https://github.com/dhanesh1232",
  "https://www.instagram.com/erix.dhanesh/",
];

/* ──────────────────────────────────────────────────────────────────────
   Organization — the canonical identity of ECODrIx.
─────────────────────────────────────────────────────────────────────── */

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "ECODrIx",
    alternateName: ["ECODrIx Platform", "ECODrix", "ECO DrIx", "ERIX Suite"],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/logo.png`,
    description:
      "ECODrIx is a unified business infrastructure platform combining CRM, AI automation, WhatsApp messaging, email marketing, and cloud storage. It powers the ERIX-CRM, ERIX-FLOW, ERIX-LAIE, ErixStore, and Relay Fabric subsystems — built for growing businesses across India and worldwide.",
    foundingDate: "2024-03",
    areaServed: "Worldwide",
    email: "contact@ecodrix.com",
    knowsLanguage: ["en", "hi", "te"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@ecodrix.com",
        url: `${BASE_URL}/#contact`,
        availableLanguage: ["English", "Hindi", "Telugu"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@ecodrix.com",
      },
      {
        "@type": "ContactPoint",
        contactType: "technical support",
        email: "dev@ecodrix.com",
      },
    ],
    founder: { "@id": PERSON_ID },
    employee: [{ "@id": PERSON_ID }],
    brand: [
      {
        "@type": "Brand",
        name: "ERIX-CRM",
        description:
          "Unified lead pipeline, conversation inbox, and client portal communication software.",
      },
      {
        "@type": "Brand",
        name: "ERIX-FLOW",
        description:
          "Visual node-based workflow automation engine with custom-node marketplace.",
      },
      {
        "@type": "Brand",
        name: "ERIX-LAIE",
        description:
          "Distributed B2B lead generation, scraping, enrichment, and AI-research platform.",
      },
      {
        "@type": "Brand",
        name: "ErixStore",
        description:
          "High-performance in-memory database, queue, cache, and pub/sub server.",
      },
      {
        "@type": "Brand",
        name: "Relay Fabric",
        description:
          "Distributed worker engine executing AI research and scraper campaigns across regions.",
      },
    ],
    sameAs: SAME_AS,
  };
}

/* ──────────────────────────────────────────────────────────────────────
   WebSite — enables Google "sitelinks search box" + answer-engine indexing.
─────────────────────────────────────────────────────────────────────── */

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "ECODrIx",
    alternateName: "ECODrIx Platform",
    url: BASE_URL,
    description:
      "Build Smarter. Grow Faster. Unified business infrastructure platform combining CRM, AI automation, WhatsApp, email marketing, and cloud storage.",
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/platform?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ──────────────────────────────────────────────────────────────────────
   SoftwareApplication — the platform itself, with offer + rating.
─────────────────────────────────────────────────────────────────────── */

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: "ECODrIx Platform",
    alternateName: ["ECODrIx", "ERIX Platform"],
    url: BASE_URL,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "CRM",
    operatingSystem: "Web, iOS, Android",
    softwareVersion: "1.0",
    description:
      "Unified business infrastructure platform combining CRM, AI automation, WhatsApp Business API, email marketing, and cloud storage. Helps businesses automate operations and scale growth — without enterprise-software complexity.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      description:
        "Free plan available — every product included with starter quotas. Paid tiers from ₹2,999/month.",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/pricing`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "CRM & Lead Pipeline (kanban, lead scoring, AI enrichment)",
      "WhatsApp Business API (Meta Cloud API, broadcasts, templates)",
      "Email Marketing (AWS SES, drag-and-drop builder, segmentation)",
      "Workflow Automation Engine (visual canvas, custom-node marketplace)",
      "B2B Lead Intelligence (LAIE — discovery, enrichment, outreach)",
      "Cloud Storage (Cloudflare R2, presigned URLs, AI image description)",
      "Meeting Scheduler (Google Calendar + Meet integration)",
      "Client Portal (project tasks, milestones, secure messaging)",
      "Real-time Chat (Socket.IO, multi-channel inbox)",
      "Analytics & Reporting (pipeline conversion, revenue forecast)",
    ],
    screenshot: `${BASE_URL}/logo.png`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    creator: { "@id": PERSON_ID },
    sameAs: SAME_AS,
  };
}

/* ──────────────────────────────────────────────────────────────────────
   Person — Dhanesh Mekalthuru. Critical for "who is …" knowledge-panel
   queries on Google, Bing, ChatGPT, and Perplexity.
─────────────────────────────────────────────────────────────────────── */

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Dhanesh Mekalthuru",
    alternateName: [
      "Dhanesh M.",
      "Erix",
      "erix.dhanesh",
      "Dhanesh Reddy",
      "Dhanesh M Reddy",
    ],
    url: PORTFOLIO_URL,
    mainEntityOfPage: PORTFOLIO_URL,
    image: `${PORTFOLIO_URL}/og-card.png`,
    jobTitle: "Founder & CEO",
    description:
      "Dhanesh Mekalthuru (also known as Erix) is the founder of ECODrIx, a unified business infrastructure platform. He is a full-stack engineer and SaaS architect who designed the ERIX suite — including ERIX-CRM, ERIX-FLOW visual automation, ERIX-LAIE lead intelligence, the ErixStore in-memory database, and the Relay Fabric distributed worker engine.",
    email: "mailto:dhanesh@ecodrix.com",
    telephone: "+91-81439-63821",
    nationality: { "@type": "Country", name: "India" },
    address: {
      "@type": "PostalAddress",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    worksFor: { "@id": ORG_ID },
    founder: { "@id": ORG_ID },
    knowsAbout: [
      "SaaS Architecture",
      "Multi-tenant Systems",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "MongoDB",
      "ErixStore",
      "Relay Fabric",
      "AI Automation",
      "n8n Workflows",
      "WhatsApp Cloud API",
      "Meta Business API",
      "AWS SES",
      "Cloudflare R2",
      "Stripe Payments",
      "Razorpay",
      "Web Scraping",
      "Lead Generation",
      "SEO Engineering",
      "Growth Systems",
      "Distributed Workers",
    ],
    sameAs: SAME_AS,
  };
}

/* ──────────────────────────────────────────────────────────────────────
   FAQPage — Answer-Engine Optimization (AEO).
   Use for "who is", "what is", "how does" intent on key pages.
─────────────────────────────────────────────────────────────────────── */

export function getFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/* ──────────────────────────────────────────────────────────────────────
   BreadcrumbList — improves SERP appearance and crawl hints.
─────────────────────────────────────────────────────────────────────── */

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/* ──────────────────────────────────────────────────────────────────────
   Product / SoftwareApplication module — used by /platform/[slug] pages.
─────────────────────────────────────────────────────────────────────── */

export interface ModuleSchemaInput {
  slug: string;
  name: string;
  brand: string;
  description: string;
  features: string[];
  category?: string;
}

export function getModuleSchema(m: ModuleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/platform/${m.slug}`,
    name: m.name,
    alternateName: m.brand,
    url: `${BASE_URL}/platform/${m.slug}`,
    applicationCategory: m.category ?? "BusinessApplication",
    operatingSystem: "Web",
    description: m.description,
    featureList: m.features,
    publisher: { "@id": ORG_ID },
    creator: { "@id": PERSON_ID },
    isPartOf: { "@id": SOFTWARE_ID },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      url: `${BASE_URL}/pricing`,
    },
  };
}

/* ──────────────────────────────────────────────────────────────────────
   ItemList — used by /platform index page to enumerate all modules.
─────────────────────────────────────────────────────────────────────── */

export function getItemListSchema(
  items: Array<{ name: string; url: string; description: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
      name: item.name,
      description: item.description,
    })),
  };
}

/* ──────────────────────────────────────────────────────────────────────
   Constants exported so other modules can reuse the canonical URLs.
─────────────────────────────────────────────────────────────────────── */

export const SEO_CONSTANTS = {
  BASE_URL,
  PORTFOLIO_URL,
  APP_URL,
  API_URL,
  ORG_ID,
  PERSON_ID,
  WEBSITE_ID,
  SOFTWARE_ID,
};
