/**
 * Platform module catalog — maps to the actual server product surface.
 *
 * Organization mirrors the server:
 *   Products: erix-crm, erix-flow, erix-laie
 *   Infra: erix-connect, erix-storage, erix-store, relay-fabric
 *
 * Drives:
 *  - /platform          → index page (cards)
 *  - /platform/[slug]   → individual module pages
 *  - /sitemap.xml       → discovery
 *  - JSON-LD            → structured data
 */

export interface PlatformModule {
  slug: string;
  brand: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  apiBase?: string;
  searchQueries: string[];
  category: "product" | "infrastructure";
}

export const PLATFORM_MODULES: PlatformModule[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // PRODUCTS
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "erix-crm",
    brand: "ERIX-CRM",
    name: "Sales CRM & Lead Pipeline",
    tagline: "Every lead, every conversation, every deal — in one pipeline.",
    category: "product",
    description:
      "ERIX-CRM is the unified sales CRM inside ECODrIx — kanban pipeline, AI lead scoring, WhatsApp inbox, activity timeline, project management, invoicing, and client portal.",
    longDescription:
      "ERIX-CRM replaces scattered spreadsheets, multiple inboxes, and disconnected pipeline trackers with a single source of truth. Every lead carries a complete activity timeline (calls, WhatsApp threads, emails, meetings, automation runs) and an AI-driven engagement score. Drag-and-drop kanban stages, custom fields, segmentation, bulk actions, project workspaces with tasks and milestones, proposal → invoice lifecycle, and a credentialed client portal with secure messaging.",
    features: [
      "Kanban pipeline with custom stages and drag-and-drop",
      "AI lead scoring based on enrichment + engagement signals",
      "Unified activity timeline (WhatsApp, email, calls, automations)",
      "Custom fields, tags, and saved-segment filters",
      "Project workspaces with milestones, tasks, and team assignments",
      "Proposal → Invoice lifecycle with payment links",
      "Client portal with email+password login, dual messaging thread",
      "Commerce: checkout, invoices, proposals, project documents",
    ],
    apiBase: "/v1/api/product/erix/crm",
    searchQueries: [
      "ECODrIx CRM", "ERIX CRM", "WhatsApp CRM India",
      "AI lead scoring SaaS", "kanban CRM with WhatsApp",
    ],
  },
  {
    slug: "erix-flow",
    brand: "ERIX-FLOW",
    name: "Visual Workflow Automation Engine",
    tagline: "Drag-and-drop nodes. Custom marketplace. Real-time runs.",
    category: "product",
    description:
      "ERIX-FLOW is the n8n-style visual automation engine — drag-and-drop canvas with conditional logic, CRM/LAIE/AI nodes, custom-node marketplace, and real-time execution logs.",
    longDescription:
      "ERIX-FLOW triggers off webhooks, CRM events, scheduler bookings, payment confirmations, and custom events. Build multi-step automations with conditional branches, wait nodes, HTTP calls, WhatsApp/email actions, and loops. Tenants publish custom nodes to a marketplace. Real-time per-node execution logs stream over Socket.IO. Integrates natively with ERIX-CRM leads, ERIX-LAIE campaigns, and ERIX-Connect channels.",
    features: [
      "Visual drag-and-drop canvas with live node previews",
      "20+ built-in triggers (webhooks, forms, CRM stages, scheduler, custom)",
      "Conditional logic, loops, wait nodes, and parallel branches",
      "Native CRM, WhatsApp, email, payments, and AI actions",
      "Custom-node marketplace (publish + install)",
      "Real-time run dashboard with per-node logs and retries",
      "Per-tenant secrets vault for credentials",
      "Schedule-based triggers (cron, recurring, time-windows)",
    ],
    apiBase: "/v1/api/product/flow",
    searchQueries: [
      "ECODrIx automation", "ERIX-FLOW", "n8n alternative India",
      "visual workflow SaaS", "no-code automation builder",
    ],
  },
  {
    slug: "erix-laie",
    brand: "ERIX-LAIE",
    name: "B2B Lead Intelligence & Enrichment",
    tagline: "Discover. Enrich. Research. Outreach. On autopilot.",
    category: "product",
    description:
      "ERIX-LAIE is the distributed lead intelligence engine — B2B discovery, AI enrichment with Claude/Gemini, dossier research, outreach-kit generation, and direct CRM export. Powered by Relay Fabric (auto-provisioning worker fleet).",
    longDescription:
      "ERIX-LAIE harvests B2B leads at scale, enriches them with verified emails/phones/firmographics, and produces deep AI-generated dossiers using Claude and Gemini. Campaigns run across the Relay Fabric distributed worker network with automatic proxy rotation and multi-region provisioning. Output flows directly into ERIX-CRM as scored leads with auto-generated WhatsApp templates and cold-email drafts. SDK gateway for developers with actors, runs, datasets, schedules, and webhooks.",
    features: [
      "Lead discovery by source / niche / city / industry",
      "AI dossier research powered by Claude and Gemini",
      "Email + phone enrichment with deliverability classification",
      "Auto-generated outreach kits (WhatsApp + cold emails)",
      "Direct export pipeline to ERIX-CRM with stage assignment",
      "Developer SDK gateway (actors, runs, datasets, schedules)",
      "Relay Fabric: auto-provisioning workers across cloud regions",
      "Relay Fabric: 5-min health probes, proxy rotation, region-aware routing",
      "Real-time progress logs over Socket.IO",
    ],
    apiBase: "/v1/api/product/laie",
    searchQueries: [
      "ECODrIx LAIE", "ERIX-LAIE", "B2B lead scraper",
      "AI lead enrichment", "lead intelligence SaaS India",
      "Relay Fabric", "distributed scraper engine",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // INFRASTRUCTURE
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "erix-connect",
    brand: "ERIX-Connect",
    name: "Multi-Channel Messaging Gateway",
    tagline: "One API. Every channel. WhatsApp, email, Instagram, Meet, SMS.",
    category: "infrastructure",
    description:
      "ERIX-Connect is the unified messaging infrastructure — WhatsApp Cloud API, email (AWS SES), Instagram DM, Telegram, Google Meet, payments, all from one send endpoint with delivery tracking and webhook logs.",
    longDescription:
      "ERIX-Connect abstracts multi-channel messaging. One POST routes to WhatsApp (Meta Cloud API), email (AWS SES with DKIM/SPF), Instagram, Telegram, or SMS with automatic failover. Channel template management (Meta approval flow for WhatsApp, email templates), API key system for external access, payment gateway integration (Razorpay per-tenant), advanced webhook logs, batch operations, OAuth2 flows, and Google Meet booking — all unified under one infrastructure layer.",
    features: [
      "WhatsApp Cloud API (Meta Tech Provider verified)",
      "Email delivery via AWS SES with custom domains + DKIM/SPF",
      "Instagram DM + Facebook Messenger + Telegram",
      "Google Meet booking with auto-link generation",
      "Unified send API — one endpoint, any channel",
      "Per-tenant API keys for external access (x-connect-key)",
      "Payment gateway (Razorpay per-tenant, webhook verification)",
      "Advanced: webhook logs, analytics, batch, usage, OAuth2",
    ],
    apiBase: "/v1/api/infra/connect",
    searchQueries: [
      "ECODrIx connect", "ERIX-Connect", "unified messaging API",
      "WhatsApp API India", "multi-channel messaging gateway",
    ],
  },
  {
    slug: "erix-storage",
    brand: "ERIX-Storage",
    name: "Cloud Storage & CDN",
    tagline: "Cloudflare R2. Presigned URLs. AI image descriptions.",
    category: "infrastructure",
    description:
      "ERIX-Storage runs on Cloudflare R2 with CDN delivery, presigned uploads, AI-generated alt text/tags/color palettes, per-tenant quotas, and bandwidth tracking.",
    longDescription:
      "ERIX-Storage uses Cloudflare R2 with `/cdn-cgi/image/` transforms for instant resizing. Direct uploads via presigned URLs (zero server bandwidth). AI vision model auto-generates alt text, titles, tags, and color palettes. Files link to CRM contacts, deals, projects, conversations. Developer API with per-tenant keys, bandwidth metering, and folder structure.",
    features: [
      "Cloudflare R2 storage (S3-compatible API)",
      "Presigned upload + download URLs (zero server bandwidth)",
      "Auto-generated alt text, titles, tags, color palettes (AI)",
      "Inline image transforms via /cdn-cgi/image/",
      "File-to-contact / deal / project / conversation linkage",
      "Per-tenant storage quotas and bandwidth tracking",
      "Developer API with tenant API key access",
    ],
    apiBase: "/v1/api/infra/storage",
    searchQueries: [
      "ECODrIx storage", "Cloudflare R2 SaaS",
      "AI image alt text generator", "CDN file hosting India",
    ],
  },
  {
    slug: "erix-store",
    brand: "ErixStore",
    name: "In-Memory Database Server",
    tagline: "Queue, cache, pub/sub, locks — sub-millisecond.",
    category: "infrastructure",
    description:
      "ErixStore is the proprietary in-memory database powering ECODrIx — job queues, caching, pub/sub events, distributed locks, rate limiting, and session storage with sub-millisecond latency.",
    longDescription:
      "ErixStore handles job queues for ERIX-FLOW, caches API responses, brokers pub/sub events for Socket.IO fan-out, holds distributed locks for tenant-level mutex operations, enforces rate limits, and stores session metadata. Persistence via append-only files (AOF) + periodic background snapshots (BGSAVE). Accessed through the @ecodrix/erix-client HTTP/WebSocket SDK. Per-tenant namespace isolation.",
    features: [
      "Sub-millisecond reads/writes from memory",
      "Append-only file (AOF) durability + BGSAVE snapshots",
      "Distributed queue with priority + delay support",
      "Pub/sub channels for real-time fan-out (Socket.IO)",
      "Distributed locks and atomic counters",
      "Token-bucket rate limiting",
      "HTTP + WebSocket SDK (@ecodrix/erix-client)",
      "Per-tenant namespace isolation",
    ],
    apiBase: "@ecodrix/erix-client",
    searchQueries: [
      "ErixStore", "in-memory database SaaS",
      "Redis alternative India", "job queue server",
    ],
  },
];

/* ── Helpers ─────────────────────────────────────────────────────── */

export function getModuleBySlug(slug: string): PlatformModule | undefined {
  return PLATFORM_MODULES.find((m) => m.slug === slug);
}

export function getModuleSlugs(): string[] {
  return PLATFORM_MODULES.map((m) => m.slug);
}

export function getProductModules(): PlatformModule[] {
  return PLATFORM_MODULES.filter((m) => m.category === "product");
}

export function getInfraModules(): PlatformModule[] {
  return PLATFORM_MODULES.filter((m) => m.category === "infrastructure");
}
