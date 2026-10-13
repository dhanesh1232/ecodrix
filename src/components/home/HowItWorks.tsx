import { BadgeIndianRupee, Languages, MessageCircle, Receipt } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    title: "Connect your channels",
    body: "Link your WhatsApp Business number, Instagram and email domain. Every new enquiry lands as a lead, with the chat attached.",
  },
  {
    title: "Set up your pipeline and follow-ups",
    body: "Start from a template for your industry. Flow sends the confirmations, reminders and nudges you send by hand today.",
  },
  {
    title: "Reply, follow up and get paid",
    body: "Your team works from one inbox. Send a GST invoice with a payment link, and see every rupee against the lead.",
  },
];

const india = [
  { icon: MessageCircle, title: "WhatsApp first", body: "Templates, broadcasts and the 24-hour reply window handled for you." },
  { icon: Receipt, title: "GST-ready invoices", body: "CGST and SGST in the same state, IGST across states, with your GSTIN." },
  { icon: BadgeIndianRupee, title: "Rupees, not dollars", body: "Indian number grouping, Razorpay payment links and pricing in INR." },
  { icon: Languages, title: "India's working day", body: "Reminders, reports and quiet hours run on Indian time." },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="section-pad border-y border-border bg-surface">
      <div className="wrapper grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            id="how-title"
            eyebrow="How it works"
            title="Live in an afternoon, not a quarter"
          />
          <ol className="mt-10 space-y-8">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-white"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg">{s.title}</h3>
                  <p className="mt-1.5 text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[8px] bg-background p-6 md:p-8">
          <h3 className="text-2xl">Built for how India sells</h3>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {india.map((f) => (
              <li key={f.title}>
                <f.icon aria-hidden="true" className="size-5 text-accent" />
                <p className="mt-3 font-semibold text-foreground">{f.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
