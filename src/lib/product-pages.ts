/**
 * Detailed sub-pages for each product/infra module.
 * Content sourced from the actual ECODrIx server capabilities.
 * Each product's [slug] dynamic route resolves pages from this data.
 */

export interface SubPage {
  slug: string;
  title: string;
  description: string;
  type: "use-case" | "capability" | "guide" | "comparison";
  sections: { heading: string; body: string }[];
}

/** ── ERIX-CRM sub-pages ── */
export const CRM_PAGES: SubPage[] = [
  // Capabilities
  {
    slug: "lead-pipeline",
    title: "Kanban Lead Pipeline",
    description: "Drag-and-drop pipeline with custom stages, lead scoring, and revenue forecasting.",
    type: "capability",
    sections: [
      { heading: "Custom pipelines and stages", body: "Build unlimited pipelines with your own stages. Drag leads between stages, trigger automations on stage enter/exit (deal_won, deal_lost), and forecast revenue per stage." },
      { heading: "AI lead scoring", body: "Every lead carries a real-time engagement score. Set threshold triggers (score_above, score_below) so automations fire when a lead heats up or goes cold." },
      { heading: "Custom fields and segments", body: "Define custom fields with typed validation and formula support. Save filtered segments and reuse them across campaigns and automations." },
      { heading: "Unified activity timeline", body: "Every call, WhatsApp thread, email, meeting, and automation run appears in one cross-channel timeline per lead." },
    ],
  },
  {
    slug: "client-portal",
    title: "Client Portal & Projects",
    description: "Credentialed client login, project workspaces, document exchange, e-signature.",
    type: "capability",
    sections: [
      { heading: "Credentialed client access", body: "Clients log in with their own email + password. Each client sees only their projects, documents, and message thread — isolated from other clients and your internal notes." },
      { heading: "Project workspaces", body: "Track engagements with milestones, tasks, deadlines, and a document checklist. Progress is visible to both team and client in real-time." },
      { heading: "Document exchange + e-signature", body: "Clients upload documents to their portal. You approve or request revisions. Proposals move through a draft → sent → accepted state machine with a signing ceremony." },
    ],
  },
  {
    slug: "commerce",
    title: "Invoicing & Commerce",
    description: "Proposals, GST-compliant invoices, recurring billing, payment links, and checkout.",
    type: "capability",
    sections: [
      { heading: "Proposals → Invoices", body: "An accepted proposal becomes the source-of-work for an advance invoice. Generate GST-compliant invoices with configurable tax rates and GSTIN display." },
      { heading: "Recurring invoices", body: "Set up recurring billing that fires automatically. Payment reminders go out before due dates over WhatsApp." },
      { heading: "Payment links on WhatsApp", body: "Generate Razorpay/Stripe payment links and send them directly on WhatsApp. When the client pays, the invoice auto-marks as paid." },
      { heading: "Checkout & products", body: "Full checkout flow with products, orders, sessions, coupons, and verification — turn your CRM into a storefront." },
    ],
  },
  {
    slug: "crm-automation",
    title: "CRM Automation Rules",
    description: "23+ triggers, gateways, and 17+ actions in a lightweight visual builder.",
    type: "capability",
    sections: [
      { heading: "Triggers", body: "lead_created, stage_enter/exit, deal_won/lost, tag_added/removed, score thresholds, whatsapp_incoming, instagram_comment/dm, telegram_message, meeting events, payment_captured/failed, invoice_sent/paid/overdue, form_submitted, and custom events." },
      { heading: "Gateways", body: "keyword_match, follow_gate, check_condition (if/else branching), and delay nodes to control flow timing and logic." },
      { heading: "Actions", body: "send_whatsapp, send_instagram_dm, reply_to_comment, send_telegram, send_email, add/remove_tag, move_stage, assign_to, update_field, create_meeting, create_project, ai_reply, ai_summarize, and webhook/internal notifications." },
    ],
  },
  // Use cases
  { slug: "real-estate", title: "ERIX-CRM for Real Estate", description: "Portal lead capture, location-based auto-assign, property sharing on WhatsApp.", type: "use-case", sections: [{ heading: "Capture every portal lead", body: "Leads from property portals, ads, and website forms flow into one pipeline with source tracking. Auto-assign by locality or round-robin so the right agent responds first." }, { heading: "Share properties on WhatsApp", body: "Send property photos, brochures (PDFs), and location pins via the official WhatsApp Cloud API from a shared team inbox." }] },
  { slug: "healthcare", title: "ERIX-CRM for Clinics", description: "Patient inquiries, WhatsApp appointment reminders, teleconsult links.", type: "use-case", sections: [{ heading: "Reduce no-shows", body: "Automated WhatsApp confirmation and reminder messages before every appointment cut no-show rates significantly." }, { heading: "Teleconsult links", body: "Generate Google Meet links and deliver them over WhatsApp for online consultations." }] },
  { slug: "agencies", title: "White-Label CRM for Agencies", description: "Branded per-client deployment, isolated data, recurring revenue.", type: "use-case", sections: [{ heading: "Your brand, isolated data", body: "Deploy under your own domain and branding. Each client gets an isolated workspace with the option of their own database." }, { heading: "Recurring revenue", body: "Charge a monthly platform fee per client. Launch a new client's branded stack in about a day instead of weeks." }] },
  { slug: "education", title: "ERIX-CRM for Coaching Institutes", description: "Admission inquiries, follow-up sequences, fee collection on WhatsApp.", type: "use-case", sections: [{ heading: "Instant admission response", body: "Auto-reply with course brochure and demo booking link the moment a parent messages. Follow-up sequences nudge undecided parents." }, { heading: "Fee collection", body: "Razorpay payment links on WhatsApp with automatic monthly reminders before due dates." }] },
  { slug: "d2c-ecommerce", title: "ERIX-CRM for D2C Brands", description: "Order updates, cart recovery, COD-to-prepaid on WhatsApp.", type: "use-case", sections: [{ heading: "98% open rate", body: "Send order confirmations, shipping and delivery notifications on WhatsApp where customers actually see them." }, { heading: "Recover carts", body: "Trigger a WhatsApp nudge one hour after cart abandonment with the product image and a direct checkout link." }] },
  { slug: "professional-services", title: "ERIX-CRM for CAs & Lawyers", description: "Client portal, document exchange, deadline reminders, GST invoicing.", type: "use-case", sections: [{ heading: "Document portal", body: "Clients upload documents to their portal — no more searching WhatsApp chats for that one PDF." }, { heading: "Bulk deadline reminders", body: "Send WhatsApp reminders for ITR, GST, and compliance deadlines to all relevant clients at once." }] },
];

/** ── ERIX-FLOW sub-pages ── */
export const FLOW_PAGES: SubPage[] = [
  {
    slug: "node-types",
    title: "Automation Node Types",
    description: "30+ internal nodes: source, enrich, validate, AI, CRM, channels, control flow.",
    type: "capability",
    sections: [
      { heading: "Data nodes", body: "source (lead ingestion), enrich, validate_email (MX/DNS), validate_wa (WhatsApp presence), crm_upsert, crm_activity, store_artifact." },
      { heading: "AI nodes", body: "ai_summary, ai_painpoints, ai_personalize — powered by Claude, Gemini, and GPT for content generation inside your flows." },
      { heading: "Channel nodes", body: "email, whatsapp, instagram, facebook, telegram — send through any connected channel with residency-aware routing." },
      { heading: "Control flow", body: "delay, before_event, condition (if/else), reply_pause, approval — plus LAIE agent-pipeline nodes (normalize, decision_maker, enrich, verify, competitor, score, deliver)." },
    ],
  },
  {
    slug: "triggers",
    title: "Flow Triggers",
    description: "Channel messages, meetings, CRM events, forms, and webhooks.",
    type: "capability",
    sections: [
      { heading: "Channel-aware triggers", body: "message.whatsapp, message.instagram, message.facebook, message.telegram, message.email — react to inbound messages on any channel." },
      { heading: "Event triggers", body: "meeting.booked, lead_created, stage_changed, form_submitted, and custom webhook triggers. Fire a named event from anywhere via POST /events/trigger." },
      { heading: "Reliability built-in", body: "Idempotency (claimOnce/releaseClaim), exponential-backoff channel retry (3 attempts, 1s→2s→30s cap), dead-letter queue, frequency caps, and compliance gating." },
    ],
  },
  {
    slug: "custom-nodes",
    title: "Custom Node Marketplace",
    description: "Build, publish, and install automation nodes shared across tenants.",
    type: "capability",
    sections: [
      { heading: "Build once, reuse", body: "Package your custom logic as a node with typed inputs/outputs. Publish it to the marketplace for other tenants to install." },
      { heading: "Real-time run logs", body: "Every flow run streams per-node execution logs over Socket.IO — see exactly what happened at each step, with retries and errors visible." },
    ],
  },
  {
    slug: "zapier-alternative",
    title: "ERIX-FLOW vs Zapier",
    description: "Native CRM + WhatsApp actions, no per-task pricing, real-time logs.",
    type: "comparison",
    sections: [
      { heading: "Native, not connected", body: "Zapier bolts on connectors. ERIX-FLOW has native nodes for your CRM, WhatsApp, email, and LAIE — zero API config, zero connector limits." },
      { heading: "No per-task pricing", body: "Zapier charges per task run. ERIX-FLOW is included in your ECODrIx plan with unlimited runs." },
      { heading: "Real-time observability", body: "See per-node execution logs stream live over Socket.IO. Zapier makes you dig through task history." },
    ],
  },
];

/** ── ERIX-LAIE sub-pages ── */
export const LAIE_PAGES: SubPage[] = [
  {
    slug: "discovery-sources",
    title: "Lead Discovery Sources",
    description: "Google Maps, IndiaMART, TradeIndia, JustDial, Instagram, LinkedIn — own methods only.",
    type: "capability",
    sections: [
      { heading: "8 runnable actors", body: "google-maps (local business discovery), indiamart + tradeindia (B2B), instagram (social resolve, no login), linkedin-enricher (decision-makers via public search), gstin (offline GSTIN decode), deep-crawler (site crawl), web-researcher (AI website analysis)." },
      { heading: "No third-party data vendors", body: "LAIE never uses Hunter, Apollo, or Clearbit. Every email, phone, and social link is discovered through LAIE's own crawling and verification methods — fully defensible and compliant." },
    ],
  },
  {
    slug: "ai-enrichment",
    title: "AI Enrichment Pipeline",
    description: "GBP audit, competitor gap, lifecycle, email finder, research agent, outreach kit.",
    type: "capability",
    sections: [
      { heading: "Selectable enrichment modules", body: "gbp_audit (Google Business Profile), competitor_gap, lifecycle stage, seasonal timing, email_finder (site crawl → pattern + MX/DNS verify), social_links, demo_page, research_agent, and outreach_kit." },
      { heading: "Multi-model AI", body: "Claude Sonnet 4.5 (dossier research), Gemini 2.5 Flash (extraction + vision), GPT-4o (research quality). The best model runs each task." },
      { heading: "Waterfall enrichment", body: "Per-datapoint method waterfall (Clay-style) — email tries site crawl first, then pattern+MX verify. Configurable priority with compute-cost metering." },
    ],
  },
  {
    slug: "relay-fabric",
    title: "Relay Fabric — Distributed Workers",
    description: "Auto-provisioning scraper fleet across Cloudflare, GCP, Lambda, and browser relays.",
    type: "capability",
    sections: [
      { heading: "Multi-tier relay types", body: "cloudflare workers, gcp functions, aws lambda, browser relays, and direct — routed by a tiered proxy manager with health scoring and cooldown tracking." },
      { heading: "Self-healing fleet", body: "Durable relay registry with 5-minute health probes. Stale workers are retired and replaced automatically. Live health streams over Socket.IO." },
      { heading: "Stealth + resilience", body: "Browser pool with adaptive pacing, captcha detection, fingerprint coherence, human-behavior simulation, and stealth patching. Proxy rotation and session warming built in." },
    ],
  },
  {
    slug: "outreach-kits",
    title: "AI Outreach Kits",
    description: "Auto-generated pitch scripts, cold emails, and demo pages per lead.",
    type: "capability",
    sections: [
      { heading: "Personalized at scale", body: "Each outreach kit references the lead's company, detected pain points, and industry context. Niche packs for consultants, copywriters, designers, developers, marketing, and SEO." },
      { heading: "Demo pages as hooks", body: "Generate a personalized before/after demo page for the lead's own website as an outreach hook — then send the pitch on WhatsApp or email." },
    ],
  },
  {
    slug: "developer-sdk",
    title: "Developer SDK & API Gateway",
    description: "Apify-style actor runtime — actors, runs, datasets, schedules, webhooks.",
    type: "capability",
    sections: [
      { heading: "Actor runtime", body: "Process-isolated actor execution with heartbeat monitoring, retry scheduling, and run-status tracking. Run actors inline or via scheduled jobs." },
      { heading: "Datasets & webhooks", body: "Store run output in datasets, schedule recurring runs (cron), and receive webhooks on completion. Auth via scoped Bearer API keys." },
    ],
  },
];

/** ── ERIX-Connect sub-pages ── */
export const CONNECT_PAGES: SubPage[] = [
  {
    slug: "channels",
    title: "Supported Channels",
    description: "WhatsApp, Email (SES), Instagram, Facebook, Telegram, Google Meet, SMS.",
    type: "capability",
    sections: [
      { heading: "Messaging channels", body: "WhatsApp (Meta Cloud API via embedded signup or manual token), Instagram DM, Facebook Messenger, Telegram (bot token), and SMS (Fast2SMS OTP)." },
      { heading: "Email", body: "Managed AWS SES with your own verified domain, or Gmail OAuth. Full template management with Meta-style approval for WhatsApp templates." },
      { heading: "Meetings + payments", body: "Google Meet/Calendar (one-click OAuth) for booking. Per-tenant payment gateways: Razorpay and Stripe, encrypted per-tenant." },
    ],
  },
  {
    slug: "unified-send-api",
    title: "Unified Send API",
    description: "One endpoint, any channel, with fallback and delivery tracking.",
    type: "capability",
    sections: [
      { heading: "Channel-agnostic", body: "POST /send with a channelPreference and fallbackOnFailure — or target a specific channel (/send/whatsapp, /send/email, /send/telegram). Auth via scoped x-connect-key." },
      { heading: "Delivery + usage tracking", body: "Every send is metered per channel. Webhook logs capture delivery status, and the ConversationSDK bridges all channels into one unified inbox." },
    ],
  },
  {
    slug: "whatsapp-api-guide",
    title: "WhatsApp API Integration Guide",
    description: "Connect WhatsApp Business API via Meta embedded signup or manual token.",
    type: "guide",
    sections: [
      { heading: "Two connection methods", body: "Embedded Signup (one-click Meta flow) or manual token (paste your WABA token, WABA ID, and phone number ID)." },
      { heading: "Send your first message", body: "POST to /v1/api/infra/connect/send/whatsapp with your approved template name and parameters. Free-text replies work within the 24-hour session window." },
    ],
  },
  {
    slug: "green-tick",
    title: "WhatsApp Green Tick Verification",
    description: "Get the official verified business badge for WhatsApp.",
    type: "guide",
    sections: [
      { heading: "Eligibility", body: "Active Meta Business account, a real business with web presence, and a compliant message history with a green quality rating." },
      { heading: "Application", body: "Submit through Meta Business Manager → WhatsApp Manager → Phone Numbers → request Official Business Account status." },
    ],
  },
  {
    slug: "whatsapp-broadcast-limits",
    title: "WhatsApp Broadcast Limits",
    description: "Meta's messaging tiers and how to scale your daily volume.",
    type: "guide",
    sections: [
      { heading: "Tier system", body: "Tier 1: 1,000 unique contacts/day → Tier 2: 10,000 → Tier 3: 100,000 → Unlimited. Tiers apply to business-initiated conversations." },
      { heading: "How to tier up", body: "Maintain a high (green) quality rating and send consistently near your current tier limit for 7+ days. Meta upgrades automatically." },
    ],
  },
];

/** ── ERIX-Storage sub-pages ── */
export const STORAGE_PAGES: SubPage[] = [
  {
    slug: "presigned-uploads",
    title: "Presigned Upload URLs",
    description: "Direct-to-R2 uploads with strict per-tenant isolation.",
    type: "capability",
    sections: [
      { heading: "Zero server bandwidth", body: "Client uploads directly to Cloudflare R2 via a time-limited presigned PUT URL. Your server only generates the URL — files never pass through it." },
      { heading: "Tenant isolation", body: "Every file is scoped under tenants/{clientCode}/ with an assertKeyScope guard. Date-sharded keys, folder validation, and quota enforcement built in." },
    ],
  },
  {
    slug: "ai-image-processing",
    title: "AI Image Processing",
    description: "Auto-generated alt text, tags, and CDN transforms for every upload.",
    type: "capability",
    sections: [
      { heading: "CDN transforms", body: "Cloudflare /cdn-cgi/image/ transforms deliver instant resizing and format conversion. Public CDN URL per asset." },
      { heading: "Media metadata", body: "getMediaMeta detects media type and metadata. Files link back to CRM contacts, deals, projects, and conversations." },
    ],
  },
  {
    slug: "quota-metering",
    title: "Quota & Usage Metering",
    description: "Per-tenant storage quotas with R2→Postgres reconciliation.",
    type: "capability",
    sections: [
      { heading: "Auto-provisioned quotas", body: "New tenants get a default 5GB quota. setQuota adjusts it. isOverQuota and isSuspended enforce limits before writes." },
      { heading: "Cron reconciliation", body: "syncUsage reconciles R2 storage against Postgres records (ecodrix_cloud_storage + storage_events) on a cron so usage stats stay accurate." },
    ],
  },
];

/** ── ErixStore sub-pages ── */
export const STORE_PAGES: SubPage[] = [
  {
    slug: "queue-system",
    title: "Distributed Job Queue",
    description: "Priority queues with delay, retry, and dead-letter support.",
    type: "capability",
    sections: [
      { heading: "Priority + delay", body: "Jobs can be delayed (send email in 1 hour) or prioritized (urgent webhooks before batch exports). Powers ERIX-FLOW run execution and background workers." },
      { heading: "Accessed via SDK", body: "Application code uses the @ecodrix/erix-client SDK (HTTP + WebSocket transports) for enqueue, jobs, and queue event handlers." },
    ],
  },
  {
    slug: "cache-pubsub",
    title: "Cache & Pub/Sub",
    description: "Redis-like KV cache with TTL and real-time pub/sub channels.",
    type: "capability",
    sections: [
      { heading: "Key-value cache", body: "Set/get with TTL — used for plan caches (5-min TTL), relay registry version tokens, and idempotency claims across ERIX/LAIE/Flow." },
      { heading: "Pub/Sub fan-out", body: "Channel-based pub/sub feeds directly into Socket.IO rooms for real-time browser updates — conversation messages, flow run progress, relay health." },
    ],
  },
  {
    slug: "rate-limiting",
    title: "Rate Limiting & Locks",
    description: "Token-bucket rate limiting and distributed locks with sub-ms latency.",
    type: "capability",
    sections: [
      { heading: "Token-bucket limiting", body: "Enforce per-tenant and per-endpoint rate limits with sub-millisecond in-memory checks." },
      { heading: "Distributed locks", body: "Atomic counters and distributed locks for tenant-level mutex operations. Persistence via append-only files (AOF) + BGSAVE snapshots." },
    ],
  },
];

/** Get all sub-pages for a product by its key */
export function getProductPages(product: string): SubPage[] {
  switch (product) {
    case "erix-crm": return CRM_PAGES;
    case "erix-flow": return FLOW_PAGES;
    case "erix-laie": return LAIE_PAGES;
    case "erix-connect": return CONNECT_PAGES;
    case "erix-storage": return STORAGE_PAGES;
    case "erix-store": return STORE_PAGES;
    default: return [];
  }
}
