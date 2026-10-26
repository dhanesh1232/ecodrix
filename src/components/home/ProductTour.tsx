import type { GlyphName } from "@/components/icons";
import { FeatureSplit, MkSection } from "@/components/marketing/kit";
import { SegTabs } from "@/components/marketing/seg-tabs";
import {
  AiScreen,
  BookingScreen,
  FlowScreen,
  InboxScreen,
  InvoiceScreen,
  PipelineScreen,
} from "@/components/scenes/screens";

/** Every point is a live v1.0 behaviour (docs/modules/*.md). */
const stops = [
  {
    id: "inbox",
    label: "Inbox",
    icon: "inbox" as GlyphName,
    screen: <InboxScreen />,
    title: "Every channel in one inbox",
    body: "WhatsApp, Instagram, email and your website chat land in one list, each on the right contact. Reply from the office PC or your phone.",
    points: [
      "Official WhatsApp Business API, with templates and the 24-hour window handled",
      "Ticks you already know: ✓ sent, ✓✓ delivered, blue ✓✓ read",
      "AI drafts show where the answer came from. Send it, or edit first",
    ],
    href: "/platform/erix-connect",
    link: "Explore ERIX Connect",
  },
  {
    id: "ai",
    label: "AI agent",
    icon: "sparkles" as GlyphName,
    ai: true,
    screen: <AiScreen />,
    title: "An agent that learns your business",
    body: "Add your price list, hours and FAQs as knowledge, give the agent a persona, and choose how far it goes. Anything risky waits on one Approvals page.",
    points: [
      "Website pages count too: up to 50 from your sitemap, refreshed weekly",
      "Drafts and held actions arrive on Approvals live, no refresh",
      "If it can't reply, the chat is marked Needs you, with the reason",
    ],
    href: "/platform#agents",
    link: "See how the agent works",
  },
  {
    id: "pipeline",
    label: "Pipeline",
    icon: "square-kanban" as GlyphName,
    screen: <PipelineScreen />,
    title: "Drag a deal, see the money move",
    body: "Start with stages made for your industry. Every enquiry becomes a contact, with its chats, bookings and invoices on one timeline.",
    points: [
      "Stage totals in rupees, on desktop and on your phone",
      "Moving a deal to a stage can start an automation",
      "Forms and booking pages fill the pipeline by themselves",
    ],
    href: "/platform/erix-crm",
    link: "Explore ERIX CRM",
  },
  {
    id: "invoices",
    label: "Invoices",
    icon: "receipt" as GlyphName,
    screen: <InvoiceScreen />,
    title: "GST invoices that get paid",
    body: "CGST and SGST in the same state, IGST across states, numbered by financial year. Send it on WhatsApp or email with a Razorpay payment link.",
    points: [
      "Marked Paid the moment the money lands, live",
      "PDF and payment link sent on WhatsApp or email",
      "A proposal your client accepts on their phone becomes an advance invoice",
    ],
    href: "/platform/erix-crm",
    link: "Explore ERIX CRM",
  },
  {
    id: "automations",
    label: "Automations",
    icon: "workflow" as GlyphName,
    ai: true,
    screen: <FlowScreen />,
    title: "Follow-ups that run on their own",
    body: "Start from a template: welcome messages, appointment reminders, a nudge when nobody replies. Anything risky waits for your approval.",
    points: [
      "Starts on a new lead, a stage change, a form, a payment or a booking",
      "Send on WhatsApp or email, then wait for a reply: Replied or No reply",
      "Every run shows step by step, live",
    ],
    href: "/platform/erix-flow",
    link: "Explore ERIX Flow",
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: "calendar-check" as GlyphName,
    screen: <BookingScreen />,
    title: "Bookings without the back-and-forth",
    body: "Share a booking page or a form link. Visitors pick a free slot in Indian time, and the enquiry lands in your pipeline.",
    points: [
      "Your hours, gaps and notice period, all in IST",
      "Two people can never book the same slot",
      "Reschedule or confirm requests from the dashboard",
    ],
    href: "/platform/erix-crm",
    link: "Explore ERIX CRM",
  },
];

export function ProductTour() {
  return (
    <MkSection
      id="tour"
      tone="subtle"
      title="The screens your team will use every day"
      lead="Redrawn from the real ERIX app. Tap through what happens after an enquiry comes in."
    >
      <SegTabs
        label="ERIX product tour"
        tabs={stops.map((s) => ({
          id: s.id,
          label: s.label,
          icon: s.icon,
          panel: (
            <FeatureSplit
              module={s.label}
              icon={s.icon}
              ai={s.ai}
              title={s.title}
              points={s.points}
              link={{ href: s.href, label: s.link }}
              visual={s.screen}
            >
              {s.body}
            </FeatureSplit>
          ),
        }))}
      />
    </MkSection>
  );
}
