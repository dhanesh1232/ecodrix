/**
 * Platform module catalog — single source of truth.
 *
 * Drives:
 *  - /platform              → index page
 *  - /platform/[slug]       → individual module pages
 *  - /sitemap.xml           → discovery for search engines
 *  - JSON-LD ItemList       → structured-data graph
 *
 * Each entry maps to a backend domain in `ECOD/server` so any organic search
 * about a feature served by the API surfaces the matching ecodrix landing
 * page.
 */

export interface PlatformModule {
  slug: string;
  brand: string; // e.g. "ERIX-CRM"
  name: string; // human-readable name
  tagline: string;
  /** Used in the SERP description. ~155–170 chars optimal. */
  description: string;
  /** Long-form description for the page body. */
  longDescription: string;
  /** Bullet feature list (also fed into JSON-LD featureList). */
  features: string[];
  /** Endpoint base path on `api.ecodrix.com`, for AEO trust signals. */
  apiBase?: string;
  /** Search queries this page is optimized to answer. */
  searchQueries: string[];
  /** Color used in module card accents — matches existing palette. */
  color: string;
}

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    slug: "crm",
    brand: "ERIX-CRM",
    name: "Sales CRM & Lead Pipeline",
    tagline: "Every lead, every conversation, every deal — in one pipeline.",
    description:
      "ERIX-CRM is the unified sales CRM inside ECODrIx — kanban pipeline, AI lead scoring, activity timeline, and client portal. Built for teams that need visibility and momentum.",
    longDescription:
      "ERIX-CRM is the lead-management heart of the ECODrIx platform. It replaces scattered spreadsheets, multiple inboxes, and disconnected pipeline trackers with a single source of truth. Every lead carries a complete activity timeline (calls, WhatsApp threads, emails, meetings, automation runs) and an AI-driven engagement score that updates in real time. Drag-and-drop kanban stages, custom fields, segmentation, bulk actions, CSV imports, and project + invoice modules ship out of the box. Multi-tenant by design with strict row-level isolation.",
    features: [
      "Kanban pipeline with custom stages and drag-and-drop movement",
      "AI lead scoring based on enrichment + engagement signals",
      "Unified activity timeline (chat, email, calls, automations)",
      "Custom fields, tags, and saved-segment filters",
      "Bulk CSV import, bulk tag/delete, lead deduplication",
      "Project workspaces with milestones, tasks, and team assignments",
      "Client portal with secure messaging and file uploads",
      "Invoice generation and payment-link integration",
    ],
    apiBase: "/v1/api/product/erix/crm/leads",
    searchQueries: [
      "ECODrIx CRM",
      "ERIX CRM",
      "ECODrIx leads pipeline",
      "WhatsApp CRM India",
      "AI lead scoring SaaS",
      "kanban CRM with WhatsApp",
    ],
    color: "#2b4dcb",
  },
  {
    slug: "whatsapp",
    brand: "ECODrIx Conversations",
    name: "WhatsApp Business API & Unified Inbox",
    tagline: "Official Meta Cloud API. Broadcasts, templates, OTPs, inbox.",
    description:
      "Send WhatsApp template campaigns, run OTP delivery, and answer customers from a unified inbox — powered by the official Meta WhatsApp Cloud API and Socket.IO real-time delivery.",
    longDescription:
      "ECODrIx integrates the official Meta WhatsApp Cloud API as a Tech-Provider verified solution. Send transactional, marketing, and authentication template messages with rich media (images, documents, video, location). Conversations stream into a unified inbox alongside Instagram, Facebook Messenger, and Telegram threads, with real-time status (sent / delivered / read) over Socket.IO. Template approval workflows, opt-in management, and webhook signature verification are handled inside the platform — no Twilio middleware required.",
    features: [
      "Official Meta WhatsApp Cloud API (Tech Provider verified)",
      "Template messages — marketing, utility, authentication categories",
      "Rich media support — images, documents, videos, location, contacts",
      "Real-time inbox via Socket.IO (sent/delivered/read tracking)",
      "Multi-channel: WhatsApp, Instagram DM, Messenger, Telegram",
      "Broadcast campaigns to segmented audiences",
      "Webhook signature verification + opt-in/opt-out compliance",
      "OTP delivery with retry + fallback to SMS",
    ],
    apiBase: "/v1/api/product/erix/chat",
    searchQueries: [
      "ECODrIx WhatsApp API",
      "WhatsApp Business API India",
      "Meta Cloud API integration",
      "ECODrIx unified inbox",
      "WhatsApp broadcast SaaS",
    ],
    color: "#25D366",
  },
  {
    slug: "automation",
    brand: "ERIX-FLOW",
    name: "Visual Workflow Automation Engine",
    tagline: "Drag-and-drop nodes. Custom marketplace. Real-time runs.",
    description:
      "ERIX-FLOW is the n8n-style automation engine inside ECODrIx — visual canvas, conditional logic, custom-node marketplace, and real-time run logs across every channel.",
    longDescription:
      "ERIX-FLOW is a visual, node-based workflow execution engine that triggers off webhooks, CRM events, scheduler bookings, payment confirmations, and custom events. Build multi-step automations with conditional branches (if/then), wait nodes, HTTP calls, database queries, WhatsApp / email actions, and loops. Tenants can publish their own custom nodes to a marketplace, install community nodes, and inspect node-level execution logs in real time over Socket.IO. Designed for non-technical users while staying fully programmable for engineers.",
    features: [
      "Visual drag-and-drop canvas with live node previews",
      "20+ built-in triggers (webhooks, forms, CRM stages, scheduler, custom)",
      "Conditional logic, loops, wait nodes, and parallel branches",
      "Native CRM, WhatsApp, email, payments, and database actions",
      "Custom-node marketplace (publish + install)",
      "Real-time run dashboard with per-node logs and retries",
      "Per-tenant secrets vault for credentials",
      "Schedule-based triggers (cron, recurring, time-windows)",
    ],
    apiBase: "/v1/api/product/flow",
    searchQueries: [
      "ECODrIx automation",
      "ERIX-FLOW",
      "ECODrIx n8n alternative",
      "visual workflow SaaS",
      "custom node marketplace automation",
    ],
    color: "#8d1fae",
  },
  {
    slug: "lead-intelligence",
    brand: "ERIX-LAIE",
    name: "B2B Lead Intelligence & Enrichment",
    tagline: "Discover. Enrich. Research. Outreach. On autopilot.",
    description:
      "ERIX-LAIE is the distributed lead-intelligence engine inside ECODrIx — B2B discovery by niche/city, AI enrichment, dossier research, and ready-to-send outreach kits.",
    longDescription:
      "ERIX-LAIE harvests B2B leads at scale across multiple sources, enriches them with verified emails / phones / firmographics, and produces deep AI-generated dossiers per company using Claude and Gemini. Each campaign runs across the Relay Fabric distributed worker network, automatically rotating proxies and provisioning new relay nodes when load spikes. Output flows directly into ERIX-CRM as scored leads, with auto-generated WhatsApp templates and cold-email drafts ready for review.",
    features: [
      "Lead discovery by source / niche / city / industry",
      "AI dossier research powered by Claude and Gemini",
      "Email + phone enrichment with deliverability classification",
      "Auto-generated outreach kits (WhatsApp templates + cold emails)",
      "Direct export pipeline to ERIX-CRM with stage assignment",
      "Tier classification (cold / warm / hot) and ICP fit scoring",
      "Distributed scraping via Relay Fabric (multi-region workers)",
      "Real-time progress logs over Socket.IO",
    ],
    apiBase: "/v1/api/product/laie",
    searchQueries: [
      "ECODrIx LAIE",
      "ERIX-LAIE",
      "B2B lead scraper",
      "AI lead enrichment",
      "lead intelligence SaaS India",
    ],
    color: "#F59E0B",
  },
  {
    slug: "email-marketing",
    brand: "ECODrIx Email",
    name: "Email Marketing on AWS SES",
    tagline: "Drag-and-drop builder. AWS SES delivery. Real analytics.",
    description:
      "Run drip campaigns, broadcasts, and transactional emails powered by AWS SES — drag-and-drop builder, segment targeting, delivery tracking, and A/B tests.",
    longDescription:
      "ECODrIx Email is the marketing-automation surface for outbound and lifecycle email. It uses AWS SES for delivery (10,000 emails/month for ~$1), with a drag-and-drop builder, dynamic merge fields, segment-based targeting from the CRM, A/B subject testing, and delivery / open / click analytics. Drip campaigns can be sequenced inside ERIX-FLOW, and unsubscribe / suppression lists are managed automatically per tenant.",
    features: [
      "Drag-and-drop email builder with mobile-responsive blocks",
      "AWS SES delivery — 10K emails/month for ~$1",
      "Segment-based targeting from ERIX-CRM",
      "A/B subject and content testing",
      "Open / click / bounce / complaint analytics",
      "Drip campaigns chained through ERIX-FLOW",
      "Automatic suppression-list and unsubscribe handling",
      "Custom domains with SPF / DKIM / DMARC verification",
    ],
    searchQueries: [
      "ECODrIx email marketing",
      "AWS SES SaaS",
      "drag-and-drop email builder",
      "email automation India",
    ],
    color: "#F472B6",
  },
  {
    slug: "cloud-storage",
    brand: "ECODrIx Storage",
    name: "Cloud Storage & AI Asset Management",
    tagline: "Cloudflare R2. Presigned URLs. AI image descriptions.",
    description:
      "Secure cloud storage on Cloudflare R2 with presigned uploads, CDN delivery, and AI-generated alt text, tags, and color palettes for every asset.",
    longDescription:
      "ECODrIx Storage runs on Cloudflare R2 with `/cdn-cgi/image/` transforms for instant resizing and format conversion. Direct uploads use presigned URLs so files never touch the API server. Every uploaded image is automatically described by an AI vision model that produces alt text, SEO-friendly titles, descriptive tags, and the dominant color palette — saving hours of manual metadata work. Files are linked back to CRM contacts, deals, projects, and conversations.",
    features: [
      "Cloudflare R2 backed storage (S3-compatible API)",
      "Presigned upload + download URLs (zero server bandwidth)",
      "Auto-generated alt text, titles, tags, and color palettes",
      "Inline image transforms via `/cdn-cgi/image/`",
      "File-to-contact / deal / project / conversation linkage",
      "Per-tenant storage quotas and folder structure",
      "Configurable retention and version history",
    ],
    apiBase: "/v1/api/infra/storage/files",
    searchQueries: [
      "ECODrIx storage",
      "Cloudflare R2 SaaS",
      "AI image alt text generator",
      "ECODrIx file uploads",
    ],
    color: "#4ADE80",
  },
  {
    slug: "client-portal",
    brand: "ERIX-CRM Portal",
    name: "Client Portal & Project Workspace",
    tagline: "Branded portal. Tasks, milestones, and secure chat.",
    description:
      "Give every client a branded portal with project milestones, task lists, secure messaging, and file exchange — invite-only with JWT-secured access.",
    longDescription:
      "The Client Portal turns every project into a shared workspace. Invite a client by email and they receive a one-time link that lets them set a password and log in to their own scoped portal. They see only their projects — milestones, task progress, scheduled deliverables, and a secure two-way message thread with file attachments uploaded straight to R2 via presigned URLs. Internal team-side messages stay private. Authentication uses dedicated portal JWTs separate from your team's session tokens.",
    features: [
      "Invite-only branded client portal per project",
      "Project milestones, tasks, deadlines, and deliverables",
      "Secure two-way messaging with file attachments",
      "Presigned R2 uploads from the client side",
      "Separate portal JWT auth (isolated from team sessions)",
      "Per-client visibility scoping (only their data)",
      "Email + WhatsApp notifications on portal activity",
    ],
    apiBase: "/v1/api/product/erix/portal",
    searchQueries: [
      "client portal SaaS",
      "ECODrIx client portal",
      "agency client workspace",
      "freelancer project portal",
    ],
    color: "#b34fcf",
  },
  {
    slug: "erixstore",
    brand: "ErixStore",
    name: "ErixStore — In-Memory Database",
    tagline: "High-performance queue, cache, pub/sub, locks.",
    description:
      "ErixStore is the proprietary in-memory database powering ECODrIx — queue, cache, pub/sub, distributed locks, rate limiting, and session storage with sub-millisecond latency.",
    longDescription:
      "ErixStore is the in-memory data structure server engineered specifically for ECODrIx workloads. It handles job queues for ERIX-FLOW, caches API responses, brokers pub/sub events for Socket.IO fan-out, holds distributed locks for tenant-level mutex operations, enforces rate limits, and stores session metadata. Persistence is handled through append-only files (AOF) plus periodic background snapshots (BGSAVE) so failover is transparent. Accessed by application code through the `@ecodrix/erix-client` HTTP/WebSocket SDK.",
    features: [
      "Sub-millisecond reads / writes from memory",
      "Append-only file (AOF) durability + BGSAVE snapshots",
      "Distributed queue with priority + delay support",
      "Pub/sub channels for real-time fan-out",
      "Distributed locks and atomic counters",
      "Token-bucket rate limiting",
      "HTTP + WebSocket SDK (`@ecodrix/erix-client`)",
      "Per-tenant namespace isolation",
    ],
    apiBase: "/erix-admin",
    searchQueries: [
      "ErixStore",
      "ECODrIx database",
      "in-memory database SaaS",
      "Redis alternative India",
    ],
    color: "#8d1fae",
  },
  {
    slug: "relay-fabric",
    brand: "Relay Fabric",
    name: "Relay Fabric — Distributed Worker Engine",
    tagline: "Auto-provisioning workers across regions. Self-healing.",
    description:
      "Relay Fabric is the distributed worker engine that auto-provisions, health-checks, and rebalances scraping + AI workers across multiple cloud regions for ERIX-LAIE.",
    longDescription:
      "Relay Fabric is the engine that lets ERIX-LAIE scale lead discovery and enrichment to thousands of concurrent scrape jobs without ever managing servers. It registers worker types, monitors health every 5 minutes, auto-provisions new relay nodes when load spikes, retires stale workers, rotates proxies, and routes jobs based on region affinity. Tuning parameters (retries, timeouts, priority weights) are exposed as live admin endpoints, and the entire fleet emits `automation:relay-health` Socket.IO events for live observability.",
    features: [
      "Auto-provisioning of relay workers across cloud regions",
      "5-minute health probes with auto-retire of stale nodes",
      "Region-aware job routing with priority weighting",
      "Live tuning of retries / timeouts / max concurrency",
      "Socket.IO health stream (`automation:relay-health`)",
      "Built-in proxy rotation for scraping resilience",
      "Admin endpoints for manual provision / retire",
    ],
    apiBase: "/v1/api/product/laie/relays",
    searchQueries: [
      "Relay Fabric",
      "distributed scraper engine",
      "auto-provisioning workers",
      "ECODrIx relay system",
    ],
    color: "#FB923C",
  },
];

/* Helpers ─────────────────────────────────────────────────────────── */

export function getModuleBySlug(slug: string): PlatformModule | undefined {
  return PLATFORM_MODULES.find((m) => m.slug === slug);
}

export function getModuleSlugs(): string[] {
  return PLATFORM_MODULES.map((m) => m.slug);
}
