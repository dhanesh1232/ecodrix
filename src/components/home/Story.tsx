import { type Chapter, Story } from "@/components/marketing/story";
import { AgentScene } from "@/components/scenes/agent-scene";
import { LazyScreen } from "@/components/scenes/lazy-screen";
import { ArrivalScene } from "@/components/scenes/story-scenes";

/**
 * Home: one enquiry's life, told down a rail. Every chapter is a live v1.0
 * behaviour (DS product.md, ECOD/docs/modules/*.md); the screens are redrawn
 * from the SaaS. No voice, no Sheets or Gmail, no prices.
 */
const chapters: Chapter[] = [
  {
    id: "message",
    marker: "9:42 pm",
    markerIcon: "moon",
    module: "ERIX Connect",
    icon: "inbox",
    title: "A message arrives after you've closed",
    body: "Rohan asks about a 3BHK on your WhatsApp. Minutes later, someone on your website chat wants a 2BHK near Wakad. Both land in one ERIX inbox, live, on your phone and on the office PC.",
    points: ["WhatsApp, Instagram DMs, email and website chat in one list", "Unread counts and a chime, no refreshing"],
    visual: <ArrivalScene />,
  },
  {
    id: "agent",
    marker: "9:42 pm",
    markerIcon: "moon",
    module: "AI agent",
    ai: true,
    title: "The agent answers from what you taught it",
    body: "It reads your listings, price list and hours, and replies on its own only when the answer is there. A discount request isn't, so it writes a draft and waits for you. A refund always goes to a person.",
    points: ["Starts in Suggest: it drafts, you send", "Every answer shows where it came from", "Money and sensitive topics go to your team"],
    visual: <AgentScene />,
  },
  {
    id: "contact",
    marker: "9:43 pm",
    markerIcon: "moon",
    module: "ERIX Connect",
    icon: "users",
    title: "One customer, one record, every channel",
    body: "Every chat lands on the right contact, matched by phone, then email, so one customer is one record across WhatsApp, Instagram, email and website chat. Your team replies from the inbox and watches the ticks turn from sent to delivered to read.",
    visual: <LazyScreen name="inbox" />,
  },
  {
    id: "pipeline",
    marker: "9:44 pm",
    markerIcon: "moon",
    module: "ERIX CRM",
    icon: "square-kanban",
    title: "The lead moves on your pipeline",
    body: "Rohan becomes a deal in Site visit booked, with the chat attached. Stage totals update in rupees, and moving a card can start an automation.",
    link: { href: "/platform/erix-crm/lead-pipeline", label: "Contacts and pipeline" },
    visual: <LazyScreen name="pipeline" />,
  },
  {
    id: "visit",
    marker: "Sat, 11:30 am",
    markerIcon: "calendar-check",
    module: "ERIX CRM",
    icon: "calendar-check",
    title: "The visit is booked, without phone tag",
    body: "Rohan picks a free slot on your booking page, in IST, and two people can never take the same one. The visit lands on your Google Calendar and a WhatsApp reminder goes out before it. Online meetings get a Google Meet link.",
    visual: <LazyScreen name="booking" />,
  },
  {
    id: "paid",
    marker: "Mon, 11:31 am",
    markerIcon: "indian-rupee",
    module: "ERIX CRM",
    icon: "receipt",
    title: "Proposal, GST invoice, paid",
    body: "Rohan accepts your proposal on his phone and it becomes an advance invoice: CGST and SGST worked out, numbered for the financial year, sent on WhatsApp with a Razorpay payment link. It turns Paid the moment the money lands.",
    link: { href: "/platform/erix-crm/commerce", label: "Proposals, invoices and payment links" },
    visual: <LazyScreen name="invoice" />,
  },
  {
    id: "follow-up",
    marker: "Tue, 10:00 am",
    markerIcon: "clock",
    module: "ERIX Flow",
    ai: true,
    icon: "workflow",
    title: "Flow follows up with everyone else",
    body: "Not every enquiry books. Flow sends a welcome on WhatsApp, waits up to a day for a reply, and takes the No reply branch to send a follow-up. Anything that touches money waits for your approval.",
    link: { href: "/platform/erix-flow", label: "Explore ERIX Flow" },
    visual: <LazyScreen name="flow" />,
  },
  {
    id: "morning",
    marker: "8:30 am",
    markerIcon: "sun",
    module: "Overview",
    icon: "layout-dashboard",
    title: "Your morning, on one screen",
    body: "Open ERIX with your tea: the pipeline in lakhs, the drafts and automations waiting for you, unread chats and today's visits. The work happened while you were away, and nothing that needed you went out without you.",
    visual: <LazyScreen name="overview" />,
  },
];

export function HomeStory() {
  return (
    <Story
      id="story"
      kicker={<p className="text-sm/5 font-semibold text-accent on-dark:text-on-navy-link">A day with ERIX</p>}
      title="One enquiry, from a 9:42 pm message to a paid invoice"
      lead="Follow Rohan's question about a flat through every part of ERIX. The screens are redrawn from the real app."
      chapters={chapters}
    />
  );
}
