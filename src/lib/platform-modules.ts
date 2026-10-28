/**
 * Platform module catalog: one entry per /platform/{slug} page.
 *
 * Drives:
 *  - /platform/[module]  → the module page (components/platform/ModulePage)
 *  - /platform           → JSON-LD ItemList
 *  - /sitemap.xml        → discovery (slugs only)
 *
 * Copy follows the design system's product page (what is live in v1.0 and
 * what comes in which version) and ECOD/docs/VERSION_PLAN.md. Anything not
 * live carries its status word. Status matches PLATFORM_NAV in lib/site.ts:
 * Store is coming soon, LAIE is invite-only.
 */

import type { ModuleStatus } from "@/lib/site";

export interface PlatformModule {
  slug: string;
  brand: string;
  /** Short name for lists and JSON-LD. */
  name: string;
  /** Page title (the root template adds " | ECODrIx"); ≤ 50 characters. */
  title: string;
  /** The h1 under the brand pill. */
  tagline: string;
  /** Meta description and JSON-LD; 120–160 characters. */
  description: string;
  /** Hero paragraph. */
  longDescription: string;
  features: { title: string; body: string }[];
  steps: string[];
  faqs: { q: string; a: string }[];
  status: ModuleStatus;
  /** AI / automation module (purple, brand rule). */
  ai?: boolean;
  searchQueries: string[];
  category: "product" | "infrastructure";
}

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    slug: "erix-crm",
    brand: "ERIX CRM",
    name: "ERIX CRM: pipeline, bookings and GST invoices",
    title: "ERIX CRM: pipeline, bookings and GST invoices",
    tagline: "Every enquiry, from first chat to paid invoice",
    category: "product",
    status: "live",
    description:
      "ERIX CRM keeps every enquiry on one board: contacts, pipeline, forms, bookings, proposals, projects and GST invoices with Razorpay payment links, priced in INR.",
    longDescription:
      "Enquiries from your form links, booking page and chats land in your pipeline. Move deals in one drag, book appointments in Indian time, send proposals your client accepts on a phone, and send GST invoices with your own Razorpay payment link.",
    features: [
      { title: "A pipeline for your trade", body: "Stages made for your business type, with the total deal value in rupees on every column." },
      { title: "Form links that fill the pipeline", body: "Share a hosted form link on WhatsApp or in your Instagram bio. Every answer becomes a contact in your first stage." },
      { title: "Bookings in IST", body: "Your hours, gaps and notice period. Two people can never book the same slot." },
      { title: "Proposals that become invoices", body: "Your client accepts on a phone, and the proposal becomes an advance GST invoice." },
      { title: "GST invoices and payment links", body: "CGST and SGST or IGST worked out for you, numbered by financial year, paid through your Razorpay." },
      { title: "Projects and a client portal", body: "Tasks, documents your client signs first and you sign after, and a page where they follow the work." },
    ],
    steps: [
      "Pick your business type. A real estate agent starts with Inquiry → Site Visit Scheduled → Site Visit Done → Shortlisted → Token Paid → Agreement Signed → Closed or Lost. Clinics, coaching institutes, online stores and agencies get their own stages.",
      "Share your form and booking links on WhatsApp, in your Instagram bio or on your Google Business Profile. Each enquiry lands in the first stage of your pipeline.",
      "Chat from the inbox, drag the card forward and send a proposal. Once it's accepted, it becomes a GST invoice with a payment link.",
      "The invoice turns Paid by itself when the money lands in your Razorpay account.",
    ],
    faqs: [
      {
        q: "Do I need a website to use ERIX CRM?",
        a: "No. ERIX hosts your lead forms and booking page. Share the links on WhatsApp, in your Instagram bio or on your Google Business Profile, and every enquiry lands in your contacts.",
      },
      {
        q: "Does ERIX work out GST for me?",
        a: "Yes. Add your GSTIN once. A buyer in your state gets CGST and SGST, a buyer in another state gets IGST, based on the place of supply, and invoice numbers run per financial year, such as INV/26-27/0001.",
      },
      {
        q: "Can my staff use it on a phone?",
        a: "Yes. Contacts, the pipeline, forms, bookings and the inbox all fit a phone screen. Each person gets a role, so staff can work leads without touching your settings.",
      },
      {
        q: "Where does the money from a payment link go?",
        a: "Into your own Razorpay account. You connect your keys under Connect → Payments, and ERIX marks the invoice paid when Razorpay confirms the payment.",
      },
    ],
    searchQueries: ["ECODrIx CRM", "ERIX CRM", "WhatsApp CRM India", "CRM with GST invoices", "kanban CRM with WhatsApp"],
  },
  {
    slug: "erix-connect",
    brand: "ERIX Connect",
    name: "ERIX Connect: WhatsApp, Instagram, email and chat",
    title: "ERIX Connect: WhatsApp, Instagram, email and chat",
    tagline: "One inbox for every channel your customers use",
    category: "infrastructure",
    status: "live",
    description:
      "ERIX Connect puts the official WhatsApp Business API, Instagram DMs, email and website chat in one live inbox. Meta bills you directly, with no ERIX markup.",
    longDescription:
      "Connect your own WhatsApp Business account through Meta's signup, link Instagram and email, and add the chat widget to your website with one line. Every conversation arrives live in one inbox, on the right contact, on your computer and your phone.",
    features: [
      { title: "Your own WhatsApp account", body: "Official WhatsApp Business API through Meta's Embedded Signup. Meta bills you directly, and ERIX adds no markup." },
      { title: "Templates and broadcasts", body: "Approved templates, broadcasts and the 24-hour reply window handled for you." },
      { title: "Instagram DMs and email", body: "Instagram DMs, and email sent from your own domain, all on the customer's contact." },
      { title: "Website chat with ticks", body: "One line to embed, your colours and logo. ✓ sent, ✓✓ delivered and blue ✓✓ read, just like WhatsApp." },
      { title: "An inbox that shows what needs you", body: "Unread counts, a Needs you list for handed-over chats, and AI drafts that show where the answer came from." },
      { title: "Calendar and payments", body: "Google Calendar and Meet for bookings, and your own Razorpay for payment links." },
    ],
    steps: [
      "Connect WhatsApp with Meta's Embedded Signup, using your own WhatsApp Business account.",
      "Link Instagram and your email domain, and paste the one-line chat snippet onto your website.",
      "Reply from one inbox. Your answer goes back on the channel the customer used.",
      "Send broadcasts with templates WhatsApp has approved.",
    ],
    faqs: [
      {
        q: "Is this the official WhatsApp API?",
        a: "Yes. ERIX connects to Meta's WhatsApp Business Platform. Your message templates need WhatsApp's approval before you can broadcast them.",
      },
      {
        q: "Who pays for WhatsApp messages?",
        a: "Your business pays Meta directly, because you connect your own WhatsApp Business account. ERIX adds no markup to Meta's charges.",
      },
      {
        q: "What is WhatsApp's 24-hour window?",
        a: "When a customer messages you, you can reply with anything for 24 hours. Each new message from them opens a fresh 24 hours. After that, WhatsApp allows only approved templates, and ERIX keeps track of the window for you.",
      },
      {
        q: "Can I put the chat on my own website?",
        a: "Yes. Paste one line of code, then set the name, greeting, colour, position and logo in ERIX. Only the domains you list can show the chat; any other site is refused.",
      },
    ],
    searchQueries: ["ECODrIx connect", "ERIX Connect", "WhatsApp API India", "WhatsApp shared inbox", "Instagram DM automation India"],
  },
  {
    slug: "erix-flow",
    brand: "ERIX Flow",
    name: "ERIX Flow: automations that follow up for you",
    title: "ERIX Flow: automations that follow up for you",
    tagline: "Follow-ups that run on their own, with you in control",
    category: "product",
    status: "live",
    ai: true,
    description:
      "ERIX Flow runs your follow-ups: messages on any channel, waits, Wait for a reply, approvals and AI replies, starting from templates made for your industry.",
    longDescription:
      "Start from a template such as Welcome Journey or Appointment Reminders, or build your own: pick what starts it, add steps and switch it on. Anything risky waits for a person to approve, and every contact keeps a history of its runs.",
    features: [
      { title: "Starts on what happens", body: "A new lead, a stage change, a won or lost deal, a tag, a form, an inbound message, a payment or a booking." },
      { title: "Wait for a reply", body: "Pause until the customer answers, then carry on down Replied or No reply, each with its own next step." },
      { title: "AI reply", body: "Let the AI agent answer inside an automation, from your own knowledge. It drafts for a person by default." },
      { title: "Approvals before it acts", body: "Before money or a customer message goes out, the run waits for someone on your team to approve it." },
      { title: "Templates for your industry", body: "Welcome messages, appointment reminders and follow-ups, ready to switch on." },
      { title: "A run history on every contact", body: "Each run and what it did shows on the contact, live as it happens." },
    ],
    steps: [
      "Open ERIX Flow → Automations and start from a template, or choose New automation.",
      "Choose what starts it, such as a new lead, a form submitted or a meeting booked.",
      "Add steps: send on WhatsApp or email, wait, Wait for a reply, ask for approval, AI reply or update the contact.",
      "Switch it on, and follow each run on the contact's history.",
    ],
    faqs: [
      {
        q: "Can I check a message before it goes out?",
        a: "Yes. Put an approval step before the message. The run waits until someone on your team approves or rejects it.",
      },
      {
        q: "What can't ERIX Flow do yet?",
        a: "Webhooks, schedules, branches beyond Replied and No reply, loops and connected apps are coming soon, in version 1.2. Today, automations start on events inside ERIX.",
      },
      {
        q: "Is ERIX Flow a separate product?",
        a: "No. ERIX Flow is part of ERIX and open to every workspace, on the same contacts and inbox.",
      },
    ],
    searchQueries: ["ECODrIx automation", "ERIX Flow", "WhatsApp automation India", "follow-up automation", "no-code automation India"],
  },
  {
    slug: "erix-storage",
    brand: "ERIX Storage",
    name: "ERIX Storage: files kept with the right client",
    title: "ERIX Storage: files kept with the right client",
    tagline: "Files kept with the client they belong to",
    category: "infrastructure",
    status: "live",
    description:
      "ERIX Storage keeps files inside each client's project: quotations to sign, documents your client sees in a portal, share links. A Storage page is coming soon.",
    longDescription:
      "ERIX Storage is live inside projects. Upload quotations, work orders, floor plans and photos to a project. Your client sees them in their own portal, signs what needs signing, and both signatures land on the PDF with an audit seal. A standalone Storage page is coming soon.",
    features: [
      { title: "Files on the project", body: "PDF, Word, PNG and JPG files, up to 100 MB each, kept on the project they belong to." },
      { title: "Ask for a signature", body: "Your client signs first, then you. Their name goes on the signature stamp." },
      { title: "Click-to-sign with a seal", body: "Every signature is stamped with the signer's name and the date, plus an audit seal of the signed file." },
      { title: "The client sees only theirs", body: "Each client sees only the project you invited them to, on a page that works on a phone." },
      { title: "Share links", body: "Send a file as a link instead of another WhatsApp attachment." },
      { title: "Separate for every workspace", body: "Every workspace's files are kept in a space of their own, and storage limits are checked before each upload." },
    ],
    steps: [
      "Create a project under ERIX CRM → Active projects.",
      "Choose Documents, then Upload file.",
      "Choose Ask for signature on a file and add your client as the signer.",
      "Your client signs in their portal, then you sign. The status changes by itself.",
    ],
    faqs: [
      {
        q: "Is this an Aadhaar eSign?",
        a: "No. It's click-to-sign: each signature is stamped on the PDF with the signer's name and the date, with an audit seal. It suits quotations, work orders and service agreements. For papers that must be Aadhaar-signed, stamped or registered, use the official route.",
      },
      {
        q: "What can my client see?",
        a: "Only the project you invited them to: its progress, tasks, your documents to view and sign, and messages to you.",
      },
      {
        q: "Is there a separate Storage page?",
        a: "Not yet. Today your files live inside projects, next to the client they belong to. A standalone Storage page is coming soon.",
      },
      {
        q: "What happens when my storage is full?",
        a: "Uploading tells you the workspace's storage is full and suggests deleting files you no longer need. Talk to us if you need more.",
      },
    ],
    searchQueries: ["ECODrIx storage", "client document portal India", "e-sign quotation India"],
  },
  {
    slug: "erix-laie",
    brand: "ERIX LAIE",
    name: "ERIX LAIE: lead research, invite only",
    title: "ERIX LAIE: lead research, invite only",
    tagline: "Find and research new leads",
    category: "product",
    status: "invite",
    ai: true,
    description:
      "ERIX LAIE is an invite-only lead engine for Indian SMBs. It finds businesses like your best customers, checks contact details and drafts outreach for review.",
    longDescription:
      "LAIE is in an invite-only beta. It looks for businesses that match the customer you describe, checks their contact details, and drafts first messages that wait for your review before anything is sent.",
    features: [
      { title: "Describe your customer", body: "Tell LAIE the kind of business and the city you sell to." },
      { title: "Matches to review", body: "Businesses that fit are listed for you to look through, not dumped into your CRM." },
      { title: "Details checked", body: "Contact details are checked before a lead moves on." },
      { title: "Outreach drafted", body: "First messages are drafted for you. Nothing is sent until you review them." },
    ],
    steps: [
      "Join the waitlist and choose Finding new leads (LAIE) as what you want to use first.",
      "If your workspace is invited, our team sets LAIE up with you.",
    ],
    faqs: [
      {
        q: "How do I get access to LAIE?",
        a: "LAIE is invite-only while it's in beta. Join the waitlist and pick Finding new leads (LAIE), and we'll reach out if your workspace is a fit.",
      },
      {
        q: "Does LAIE send messages by itself?",
        a: "No. It drafts outreach, and nothing goes to a prospect until you review it.",
      },
    ],
    searchQueries: ["ECODrIx LAIE", "ERIX LAIE", "lead research India", "B2B lead finder India"],
  },
];

/* ── Helpers ─────────────────────────────────────────────────────── */

export function getModuleBySlug(slug: string): PlatformModule | undefined {
  return PLATFORM_MODULES.find((m) => m.slug === slug);
}

export function getModuleSlugs(): string[] {
  return PLATFORM_MODULES.map((m) => m.slug);
}
