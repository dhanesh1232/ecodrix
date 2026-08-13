/**
 * ERIX industry use-case catalog — single source of truth.
 *
 * Drives:
 *  - /erix/[usecase]  → industry landing pages (real estate, healthcare, …)
 *  - /sitemap.xml     → discovery
 *  - JSON-LD          → SoftwareApplication + FAQ + Breadcrumb
 *
 * These pages target high-intent India queries like "crm for real estate india"
 * and "whatsapp crm for clinics" — distinct search intent from the /platform/crm
 * hub, so no canonical conflict. Keep claims factual to ERIX's real features.
 */

export interface UseCase {
  slug: string; // e.g. "real-estate"
  industry: string; // "Real Estate"
  /** SERP description ~150–170 chars. */
  description: string;
  /** AI-liftable one-paragraph intro rendered server-side. */
  intro: string;
  /** The pains this industry feels, framed for the buyer. */
  problems: string[];
  /** How ERIX solves each, mapped to real features. */
  solutions: { title: string; text: string }[];
  /** Outcome/benefit bullets. */
  outcomes: string[];
  faqs: Array<{ q: string; a: string }>;
  searchQueries: string[];
  color: string;
}

export const USE_CASES: UseCase[] = [
  {
    slug: "real-estate",
    industry: "Real Estate",
    description:
      "ERIX is a WhatsApp CRM for real estate agents and agencies in India — capture portal leads, auto-assign, share property updates on WhatsApp, and follow up automatically.",
    intro:
      "Property leads come from portals, ads, and referrals — and go cold fast without instant follow-up. ERIX gives real estate agents and agencies in India a WhatsApp-native CRM that captures every lead, assigns it by location, and keeps buyers engaged with automated WhatsApp updates until they book a site visit.",
    problems: [
      "Leads from multiple property portals scattered across inboxes and spreadsheets.",
      "Slow first response means buyers move to another agent.",
      "No visibility into which agent is handling which lead.",
      "Manual follow-ups drop off once agents get busy with site visits.",
    ],
    solutions: [
      {
        title: "Capture every portal & ad lead",
        text: "Route leads from your website forms, portals, and ad campaigns straight into one ERIX pipeline with source tracking.",
      },
      {
        title: "Auto-assign by location or team",
        text: "Use FLOW automation to assign leads by locality, budget, or round-robin so the right agent responds first.",
      },
      {
        title: "Share properties on WhatsApp",
        text: "Send property photos, brochures, and location pins via the official WhatsApp API from a shared team inbox.",
      },
      {
        title: "Automated follow-up sequences",
        text: "Trigger reminders and nudges so no buyer is forgotten between enquiry and site visit.",
      },
    ],
    outcomes: [
      "Faster first response to portal leads.",
      "No lead lost between enquiry and site visit.",
      "Clear ownership and pipeline visibility across the team.",
      "More site visits booked from the same lead volume.",
    ],
    faqs: [
      {
        q: "Is ERIX a good CRM for real estate in India?",
        a: "Yes. ERIX is a WhatsApp-native CRM built for Indian real estate — portal-lead capture, location-based auto-assignment, WhatsApp property sharing, and automated follow-ups, priced in INR with a 14-day free trial.",
      },
      {
        q: "Can I send property photos and brochures on WhatsApp?",
        a: "Yes. ERIX uses the official Meta WhatsApp Cloud API, so you can send images, PDFs (brochures), and location pins from a shared inbox, with delivery and read tracking.",
      },
      {
        q: "Can leads be auto-assigned to agents?",
        a: "Yes. Using FLOW automation, leads can be assigned by locality, budget band, or round-robin the moment they arrive, so the right agent follows up first.",
      },
      {
        q: "Does it work for both agents and agencies?",
        a: "Yes. Solo agents get a simple pipeline and shared inbox; agencies get team assignment, ownership visibility, and white-label options.",
      },
    ],
    searchQueries: [
      "crm for real estate india",
      "whatsapp crm real estate",
      "real estate lead management software india",
      "property crm india",
    ],
    color: "#2b4dcb",
  },
  {
    slug: "healthcare",
    industry: "Clinics & Healthcare",
    description:
      "ERIX is a WhatsApp CRM for clinics and healthcare practices in India — manage patient enquiries, send appointment reminders on WhatsApp, and reduce no-shows.",
    intro:
      "Clinics juggle patient enquiries across phone, WhatsApp, and walk-ins, and lose revenue to no-shows. ERIX gives clinics and healthcare practices in India one place to manage enquiries, book and confirm appointments, and send automated WhatsApp reminders — cutting no-shows and freeing up front-desk time.",
    problems: [
      "Patient enquiries spread across phone calls, WhatsApp, and the front desk.",
      "High no-show rates because reminders are manual or missed.",
      "No single record of patient interactions and follow-ups.",
      "Front-desk staff overloaded with repetitive scheduling messages.",
    ],
    solutions: [
      {
        title: "One inbox for every enquiry",
        text: "Bring website, WhatsApp, and phone enquiries into a single ERIX inbox with a full interaction history per patient.",
      },
      {
        title: "WhatsApp appointment reminders",
        text: "Automate confirmation and reminder messages on the official WhatsApp API to cut no-shows.",
      },
      {
        title: "Booking & follow-up automation",
        text: "Use FLOW to send pre-visit instructions, post-visit follow-ups, and recall reminders automatically.",
      },
      {
        title: "Meeting links for teleconsults",
        text: "Generate Google Meet links and send them over WhatsApp for online consultations.",
      },
    ],
    outcomes: [
      "Fewer no-shows with automated reminders.",
      "Faster responses to patient enquiries.",
      "Less repetitive work for front-desk staff.",
      "A single, organised record of every patient interaction.",
    ],
    faqs: [
      {
        q: "Can ERIX send WhatsApp appointment reminders?",
        a: "Yes. ERIX sends automated appointment confirmations and reminders via the official Meta WhatsApp Cloud API, which helps clinics reduce no-shows.",
      },
      {
        q: "Is ERIX suitable for a small clinic?",
        a: "Yes. ERIX is built for Indian SMBs, including small clinics — it starts simple with a shared inbox and reminders, and scales as you grow. Pricing is in INR with a free trial.",
      },
      {
        q: "Can it handle teleconsultation links?",
        a: "Yes. ERIX can generate Google Meet links and deliver them to patients over WhatsApp or email for online consultations.",
      },
      {
        q: "Is patient data handled securely?",
        a: "ERIX applies encryption in transit and at rest and role-based access. You remain responsible for handling patient data lawfully; see our Privacy Policy, Security page, and DPA. Avoid storing sensitive clinical data beyond what you're permitted to.",
      },
    ],
    searchQueries: [
      "crm for clinics india",
      "appointment reminder whatsapp",
      "whatsapp crm for doctors",
      "patient management software india",
    ],
    color: "#8d1fae",
  },
  {
    slug: "agencies",
    industry: "Agencies & Resellers",
    description:
      "White-label ERIX for agencies and resellers in India — launch a branded WhatsApp CRM for each client, manage them centrally, and earn recurring revenue.",
    intro:
      "Agencies rebuild the same CRM, WhatsApp, and automation stack for every client — slow, costly, and hard to maintain. With white-label ERIX, you deploy a branded WhatsApp CRM per client in a day, manage them from one place, and turn platform fees into recurring revenue instead of one-off project income.",
    problems: [
      "Rebuilding CRM, WhatsApp, and automation from scratch for each client.",
      "Weeks of setup before a new client goes live.",
      "No central view across all client accounts.",
      "Project-based income with no recurring revenue.",
    ],
    solutions: [
      {
        title: "White-label under your brand",
        text: "Deploy ERIX with your own branding and domain so clients see your agency, not ECODrIx.",
      },
      {
        title: "Per-client isolation",
        text: "Each client gets an isolated workspace and data, with the option of their own database for stronger separation.",
      },
      {
        title: "Central agency dashboard",
        text: "Monitor and manage all client accounts from one console instead of juggling logins.",
      },
      {
        title: "Recurring platform revenue",
        text: "Bill clients a monthly platform fee on top of your services and build predictable MRR.",
      },
    ],
    outcomes: [
      "Launch a new client's stack in a day, not weeks.",
      "Recurring revenue from platform fees.",
      "One console to manage every client.",
      "Consistent, branded delivery across clients.",
    ],
    faqs: [
      {
        q: "Does ERIX support white-label for agencies?",
        a: "Yes. Agencies can deploy ERIX under their own brand and domain, so clients experience your agency's product. It includes per-client workspaces and a central console to manage them all.",
      },
      {
        q: "Can each client have isolated data?",
        a: "Yes. Each client gets an isolated workspace, and you can configure a separate database per client (where offered) for stronger data separation.",
      },
      {
        q: "How do agencies make money with ERIX?",
        a: "Agencies charge clients a recurring monthly platform fee on top of their own services, turning one-off project work into predictable recurring revenue.",
      },
      {
        q: "How fast can I onboard a new client?",
        a: "Because the CRM, WhatsApp, automation, and lead-gen are already built, you can stand up a branded client workspace in about a day rather than weeks of custom setup.",
      },
    ],
    searchQueries: [
      "white label crm india",
      "whatsapp crm reseller india",
      "crm for agencies india",
      "white label whatsapp business platform",
    ],
    color: "#b34fcf",
  },
  {
    slug: "education",
    industry: "Education & Coaching",
    description:
      "ERIX is a WhatsApp CRM for coaching institutes and education businesses in India — capture admission inquiries, automate follow-ups, and collect fees on WhatsApp.",
    intro:
      "Coaching institutes lose admissions because parent inquiries go unanswered on WhatsApp. ERIX gives education businesses a WhatsApp-native CRM that captures every inquiry, sends course details instantly, follows up automatically, and collects fees via payment links on WhatsApp — turning inquiries into enrolled students.",
    problems: [
      "Parent inquiries on WhatsApp get lost when the receptionist is busy.",
      "No follow-up system — parents say 'I'll think about it' and nobody calls back.",
      "Fee collection is manual — chase parents every month for installments.",
      "No visibility into which inquiries converted and which dropped off.",
    ],
    solutions: [
      {
        title: "Instant auto-reply with course details",
        text: "When a parent messages about admissions, ERIX instantly replies with your course brochure, fee structure, and a demo class booking link.",
      },
      {
        title: "Automated follow-up sequences",
        text: "If a parent doesn't enroll after a demo, ERIX sends reminders on Day 1, 3, and 7 with urgency messages like 'Only 10 seats left'.",
      },
      {
        title: "Fee collection on WhatsApp",
        text: "Generate Razorpay payment links and send them on WhatsApp. Monthly fee reminders go out automatically before due dates.",
      },
      {
        title: "Admission pipeline tracking",
        text: "See every inquiry in a pipeline: Inquiry → Demo → Fee Discussion → Enrolled → Dropped. Know exactly where each parent is.",
      },
    ],
    outcomes: [
      "No inquiry lost — every WhatsApp message becomes a tracked lead.",
      "Higher enrollment conversion from automated follow-ups.",
      "Faster fee collection with payment links on WhatsApp.",
      "Clear visibility into admission funnel performance.",
    ],
    faqs: [
      {
        q: "Is ERIX suitable for coaching institutes in India?",
        a: "Yes. ERIX is built for Indian SMBs including coaching centers, tuition institutes, and training academies. It handles admission inquiries, follow-ups, fee collection, and batch communication — all on WhatsApp. Pricing starts in INR with a free trial.",
      },
      {
        q: "Can I send bulk messages to all parents in a batch?",
        a: "Yes. ERIX supports WhatsApp broadcasts using approved templates. Send exam results, holiday announcements, or fee reminders to entire batches at once via the official Meta API.",
      },
      {
        q: "Can parents pay fees through WhatsApp?",
        a: "Yes. Generate a Razorpay or Stripe payment link for any fee amount and send it directly on WhatsApp. When the parent pays, the invoice auto-marks as paid and you get notified.",
      },
      {
        q: "Does it work for multiple branches?",
        a: "Yes. Each branch can have its own pipeline and team members, with a central dashboard for the institute owner to see performance across all locations.",
      },
    ],
    searchQueries: [
      "crm for coaching institute india",
      "whatsapp crm for education",
      "admission management software india",
      "fee collection whatsapp india",
      "coaching center lead management",
    ],
    color: "#059669",
  },
  {
    slug: "d2c-ecommerce",
    industry: "D2C & E-Commerce",
    description:
      "ERIX is a WhatsApp CRM for D2C brands in India — send order updates, recover abandoned carts, collect reviews, and convert COD to prepaid on WhatsApp.",
    intro:
      "Indian D2C brands lose revenue to abandoned carts, ignored emails, and COD returns. ERIX gives e-commerce businesses a WhatsApp-native engagement layer with 98% read rates — send order updates, recover carts, collect reviews, and nudge COD buyers to prepay, all from a unified CRM.",
    problems: [
      "Email order confirmations have 20% open rates — customers miss updates.",
      "Abandoned carts go unrecovered because emails get ignored.",
      "COD orders have high return-to-origin (RTO) rates.",
      "Review collection via email gets 3-5% response rate.",
    ],
    solutions: [
      {
        title: "Order updates on WhatsApp",
        text: "Send order confirmation, shipping updates, and delivery notifications on WhatsApp where customers actually see them (98% read rate).",
      },
      {
        title: "Abandoned cart recovery",
        text: "Trigger a WhatsApp nudge 1 hour after cart abandonment with the product image and a direct checkout link. Recover 10-15% of lost carts.",
      },
      {
        title: "COD to prepaid conversion",
        text: "When a COD order is placed, auto-send: 'Confirm your order or prepay for 10% off' — reducing RTO and improving cash flow.",
      },
      {
        title: "Review collection via WhatsApp",
        text: "Send a review request 2 days after delivery on WhatsApp. Get 3x more reviews than email because customers see it immediately.",
      },
    ],
    outcomes: [
      "5x higher engagement vs email for order communications.",
      "10-15% cart recovery rate from WhatsApp nudges.",
      "Lower RTO with COD confirmation and prepaid incentives.",
      "3x more product reviews from WhatsApp requests.",
    ],
    faqs: [
      {
        q: "Can ERIX integrate with my Shopify store?",
        a: "ERIX receives order events via webhooks from any e-commerce platform including Shopify, WooCommerce, and custom stores. Order placed, shipped, and delivered events trigger automated WhatsApp messages.",
      },
      {
        q: "How does abandoned cart recovery work on WhatsApp?",
        a: "When a customer abandons their cart, ERIX triggers a WhatsApp template message after 1 hour with the product name, image, and a direct checkout link. The timing and message are configurable via FLOW automation.",
      },
      {
        q: "Is this cheaper than other WhatsApp tools for D2C?",
        a: "ERIX includes a full CRM, automation, and multi-channel inbox from ₹2,999/month — most D2C WhatsApp tools charge similar amounts for just messaging. WhatsApp message charges are passed through at Meta's rates with no markup.",
      },
      {
        q: "Can I send personalized product recommendations?",
        a: "Yes. Using FLOW automation, you can trigger personalized messages based on past purchases, browsing behavior, or time since last order — e.g. replenishment reminders after 30 days.",
      },
    ],
    searchQueries: [
      "whatsapp marketing d2c india",
      "abandoned cart recovery whatsapp",
      "whatsapp crm ecommerce india",
      "cod to prepaid whatsapp",
      "d2c customer engagement india",
    ],
    color: "#dc2626",
  },
  {
    slug: "professional-services",
    industry: "Professional Services",
    description:
      "ERIX is a WhatsApp CRM for CAs, lawyers, and consultants in India — manage clients, automate document collection, track projects, and send invoices on WhatsApp.",
    intro:
      "CAs, lawyers, and consultants juggle client communication across WhatsApp, email, and phone — losing documents in inboxes and chasing payments manually. ERIX gives professional services firms a unified client management system where every interaction, document, and invoice lives in one place and routine tasks happen automatically.",
    problems: [
      "Client documents lost across WhatsApp, email, and physical files.",
      "No system to track which clients have pending work and deadlines.",
      "Payment collection is awkward and manual — 'please pay' messages.",
      "Deadline reminders (ITR, GST, compliance) sent manually to each client.",
    ],
    solutions: [
      {
        title: "Client portal for document exchange",
        text: "Give each client a portal where they upload documents and track progress — no more searching through WhatsApp chats for that one PDF.",
      },
      {
        title: "Project pipeline per client",
        text: "Track every engagement in a pipeline: Docs Pending → In Progress → Review → Filed/Delivered. See your entire workload at a glance.",
      },
      {
        title: "Automated deadline reminders",
        text: "Send bulk WhatsApp reminders for ITR deadlines, GST returns, or compliance dates to all relevant clients at once.",
      },
      {
        title: "Invoice + payment link on WhatsApp",
        text: "Generate a professional invoice, attach a Razorpay payment link, and send it on WhatsApp. When the client pays, you're notified instantly.",
      },
    ],
    outcomes: [
      "No more chasing documents — clients upload to their portal.",
      "Clear workload visibility across all engagements.",
      "Faster payment collection with one-click WhatsApp links.",
      "Bulk deadline reminders without manual effort.",
    ],
    faqs: [
      {
        q: "Is ERIX suitable for chartered accountants in India?",
        a: "Yes. ERIX handles the CA workflow: client onboarding, document collection via portal, engagement tracking (ITR, GST, audit), invoicing with GST, and payment collection via Razorpay links on WhatsApp.",
      },
      {
        q: "Can clients upload documents securely?",
        a: "Yes. Each client gets a credentialed portal with email + password login. They upload documents to their project, and you're notified. Files are encrypted in transit and at rest.",
      },
      {
        q: "Can I send bulk reminders for compliance deadlines?",
        a: "Yes. Use WhatsApp broadcasts with approved templates to remind all clients about approaching deadlines (ITR filing, GST returns, etc.) in one go.",
      },
      {
        q: "Does the invoice support GST?",
        a: "Yes. ERIX invoices are GST-compliant with configurable tax rates, GSTIN display, and export in formats compatible with Tally and Zoho Books.",
      },
    ],
    searchQueries: [
      "crm for chartered accountants india",
      "client management software for lawyers",
      "whatsapp crm for consultants",
      "ca practice management software india",
      "invoice software for professionals india",
    ],
    color: "#0d9488",
  },
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return USE_CASES.find((u) => u.slug === slug);
}

export function getUseCaseSlugs(): string[] {
  return USE_CASES.map((u) => u.slug);
}
