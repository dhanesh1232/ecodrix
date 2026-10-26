import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { BrowserFrame, Faq, FeatureSplit, MkHero, MkSection, PrimaryCta, WhatsAppCta } from "@/components/marketing/kit";
import { ClosingCta } from "@/components/platform/ModulePage";
import { AiScreen, FlowScreen, InboxScreen, PipelineScreen } from "@/components/scenes/screens";
import { TimelineScene } from "@/components/scenes/timeline-scene";
import { JsonLd } from "@/components/seo/JsonLd";
import { StatusBadge } from "@/components/ui/status-badge";
import { getBreadcrumbSchema, getFAQSchema, getItemListSchema, SEO_CONSTANTS } from "@/lib/jsonld";
import { PLATFORM_MODULES } from "@/lib/platform-modules";
import { pageMetadata } from "@/lib/seo";
import { PLATFORM_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

const { API_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /platform — index page covering every module served by api.ecodrix.com.
   Designed so any organic search about a feature surfaces this page
   (and the per-module landing page beneath it).
─────────────────────────────────────────────────────────────────────── */

export const metadata = {
  ...pageMetadata({
    title: "ERIX platform: CRM, inbox, AI and automation",
    description:
      "Every module in ERIX by ECODrIx: CRM, the WhatsApp and Instagram inbox, AI agents, automation and storage on one customer record, plus what's coming next.",
    path: "/platform",
  }),
  keywords: [
    "ECODrIx platform",
    "ECODrIx products",
    "ECODrIx API",
    "ECODrIx modules",
    "ECODrIx features",
    "unified business platform",
    "CRM WhatsApp automation",
  ],
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
    a: "Yes. While the modules are tightly integrated (a lead in ERIX-CRM can trigger an ERIX-FLOW workflow that sends a WhatsApp template), you can adopt them one at a time: start with just the CRM or just WhatsApp and expand as you grow.",
  },
  {
    q: "Does ECODrIx offer real-time updates?",
    a: "Yes. ECODrIx exposes a Socket.IO endpoint at wss://api.ecodrix.com that emits real-time events — new conversation messages, message status updates (sent/delivered/read), workflow run progress, LAIE job logs and enrichment completions, relay-fabric health snapshots, and platform notifications.",
  },
];

/** The live v1.0 modules, each with a coded mock of its real screen. Every
 *  line is a shipped behaviour (ECOD/docs/modules/*.md, VERSION_PLAN v1.0). */
const deepDives: {
  id: string;
  name: string;
  href: string;
  linkLabel: string;
  ai?: boolean;
  title: string;
  lead: string;
  points: string[];
  icon: "layout-dashboard" | "inbox" | "sparkles" | "workflow";
  screen: ReactNode;
}[] = [
  {
    id: "erix-crm",
    icon: "layout-dashboard",
    name: "ERIX CRM",
    href: "/platform/erix-crm",
    linkLabel: "Explore ERIX CRM",
    title: "Every enquiry becomes a contact with its whole story",
    lead: "Chats, bookings, proposals and invoices sit on one record, so anyone on the team can pick up where the last person stopped.",
    points: [
      "Pipeline board with stages made for your industry, totals in rupees",
      "Forms and booking pages that add contacts by themselves",
      "Appointments in IST, with no double bookings",
      "Proposals accepted on a phone turn into advance invoices",
      "Projects with tasks, documents, e-sign and a client portal",
      "GST invoices (CGST + SGST or IGST) with Razorpay payment links",
    ],
    screen: <PipelineScreen />,
  },
  {
    id: "erix-connect",
    icon: "inbox",
    name: "ERIX Connect",
    href: "/platform/erix-connect",
    linkLabel: "Explore ERIX Connect",
    title: "One inbox for every channel your customers use",
    lead: "WhatsApp, Instagram, email and your website chat arrive in one list, live, each on the right contact.",
    points: [
      "Official WhatsApp Business API on your own account: Meta bills you, no ERIX markup",
      "Templates, broadcasts and the 24-hour window handled; Instagram DMs and email next to WhatsApp",
      "A chat widget for your website, with WhatsApp-style ticks",
      "Google Calendar and Meet, and Razorpay for payments",
      "Threads matched to contacts by phone, then email",
    ],
    screen: <InboxScreen />,
  },
  {
    id: "agents",
    icon: "sparkles",
    name: "AI agents",
    href: "/#agents",
    linkLabel: "See the agent at work",
    ai: true,
    title: "Agents that answer from your knowledge and ask before they act",
    lead: "Give the agent your price list, hours, FAQs and listings. It answers what it knows, drafts the rest, and hands sensitive chats to your team.",
    points: [
      "Knowledge base for price lists, hours, FAQs and listings",
      "A persona that sounds like your business, replying in the customer's language",
      "Starts in Suggest: it drafts and a person sends, until you raise its autonomy",
      "Money, refunds, complaints and medical questions go to a person",
      "Monthly limits, a pause button and usage you can see",
    ],
    screen: <AiScreen />,
  },
  {
    id: "erix-flow",
    icon: "workflow",
    name: "ERIX Flow",
    href: "/platform/erix-flow",
    linkLabel: "Explore ERIX Flow",
    ai: true,
    title: "Automations that follow up for you, with you in control",
    lead: "Start from a template and switch it on. Confirmations, reminders and nudges go out on time, and anything risky waits for approval.",
    points: [
      "Templates for welcome messages, appointment reminders and follow-ups",
      "Starts on a new lead, a stage change, a form, a message, a payment or a booking",
      "Send on WhatsApp or email, wait, or wait for a reply (Replied or No reply)",
      "Approval steps for anything risky",
      "Every run visible step by step, live",
    ],
    screen: <FlowScreen />,
  },
];

const more = PLATFORM_NAV.filter((m) => m.key === "storage" || m.key === "laie" || m.key === "store");
const moreCopy: Record<string, string> = {
  storage: "Files kept with the client and project they belong to: documents, secure share links and proposals signed online.",
  laie: "Finds businesses that match your ideal customer, checks their contact details and drafts outreach for you to review.",
  store: "The data engine that runs ERIX's queues and live updates, opening to developers later.",
};

export default function PlatformIndexPage() {
  const agents = deepDives.find((d) => d.id === "agents")!;
  const rest = deepDives.filter((d) => d.id !== "agents");
  const split = (d: (typeof deepDives)[number], flip?: boolean) => (
    <FeatureSplit
      key={d.id}
      module={d.name}
      icon={d.icon}
      ai={d.ai}
      title={d.title}
      points={d.points}
      link={{ href: d.href, label: d.linkLabel }}
      visual={d.screen}
      flip={flip}
    >
      {d.lead}
    </FeatureSplit>
  );

  return (
    <div className="w-full">
      {/* JSON-LD: ItemList + FAQ + Breadcrumb */}
      <JsonLd
        data={getItemListSchema(
          PLATFORM_MODULES.map((m) => ({ name: m.name, url: `/platform/${m.slug}`, description: m.description })),
        )}
      />
      <JsonLd data={getFAQSchema(PLATFORM_FAQS)} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Platform", url: "/platform" },
        ])}
      />

      <MkHero
        title="One customer record. Every tool around it."
        lead="ERIX CRM, Connect, Flow and the AI agents share one contact, so a chat, a booking, an invoice and a follow-up all land on the same record. Start with what you need today; the rest is already connected."
        actions={
          <>
            <PrimaryCta lg />
            <WhatsAppCta lg />
          </>
        }
        visual={
          <BrowserFrame>
            <TimelineScene />
          </BrowserFrame>
        }
      />

      {/* ── Module map ── */}
      <MkSection
        id="modules"
        title="Pick one. They all share the same contact."
        lead="Live means you can use it in ERIX today. Coming soon and invite-only are marked."
      >
        <ul className="grid gap-x-10 md:grid-cols-2">
          {PLATFORM_NAV.map((m) => (
            <li key={m.key} className="border-t border-border-soft">
              <Link href={m.href} className="group -mx-3 flex items-start gap-4 rounded-[12px] px-3 py-5 hover:bg-hover">
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-[11px]",
                    "ai" in m ? "bg-ai-subtle text-ai" : "bg-accent-muted text-accent",
                  )}
                >
                  <m.icon variant="duo" className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 text-[17px] font-semibold text-foreground">
                    {m.name}
                    <StatusBadge status={m.status} />
                  </span>
                  <span className="mt-1 block text-[15px] text-muted-foreground">{m.summary}</span>
                </span>
                <Icon name="arrow-right" size={16} variant="line" className="mt-3 shrink-0 text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </MkSection>

      {/* ── Live modules, each with its screen ── */}
      <MkSection id="live" tone="subtle" title="The live modules, screen by screen">
        {rest.slice(0, 2).map((d, i) => split(d, i % 2 === 1))}
      </MkSection>

      <MkSection id="agents" tone="navy">
        {split(agents)}
      </MkSection>

      <MkSection id="automation" tone="subtle">
        {split(rest[2], true)}
      </MkSection>

      {/* ── Also in ERIX ── */}
      <MkSection id="more" title="Storage, lead research and the engine underneath">
        <ul className="grid gap-x-10 md:grid-cols-3">
          {more.map((m) => (
            <li key={m.key} className="border-t border-border-soft pt-6 pb-2">
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-[11px]",
                    "ai" in m ? "bg-ai-subtle text-ai" : "bg-accent-muted text-accent",
                  )}
                >
                  <m.icon variant="duo" className="size-5" />
                </span>
                <StatusBadge status={m.status} />
              </span>
              <h3 className="mt-4 font-sans text-[18px] font-semibold tracking-normal">{m.name}</h3>
              <p className="mt-1.5 text-[15px] text-muted-foreground">{moreCopy[m.key]}</p>
              <Link href={m.href} className="erix-mk-link group mt-4">
                About {m.name}
                <Icon name="arrow-right" size={14} variant="line" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-12 flex items-start gap-3 rounded-[16px] bg-background p-6 text-foreground">
          <Icon name="plug" size={20} variant="duo" className="mt-0.5 shrink-0 text-accent" />
          <span>
            <span className="font-semibold">For developers:</span> the same modules through one public API at{" "}
            <a href={API_URL} className="text-accent underline underline-offset-4">
              api.ecodrix.com
            </a>
            , with keys per workspace.
          </span>
        </p>
      </MkSection>

      {/* ── FAQ ── */}
      <MkSection id="faq" tone="subtle" title="How the platform works">
        <Faq items={PLATFORM_FAQS} />
      </MkSection>

      <ClosingCta
        title="Not sure where to start?"
        body="Join the waitlist and tell us how you sell today. We'll set ERIX up around it."
      />
    </div>
  );
}
