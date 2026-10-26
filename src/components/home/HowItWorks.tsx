import { FeatureSplit, MkSection, Steps } from "@/components/marketing/kit";
import { CountUp } from "@/components/motion/motion";

export function HowItWorks() {
  return (
    <MkSection id="how" title="Live in an afternoon, not a quarter">
      <Steps
        items={[
          {
            title: "Connect your channels",
            text: "Link your WhatsApp Business number, Instagram, email and website chat. Every new enquiry lands as a lead, with the chat attached.",
          },
          {
            title: "Teach the agent, pick your follow-ups",
            text: "Add your price list, hours and FAQs. Start from a pipeline and automations made for your industry: the confirmations, reminders and nudges you send by hand today.",
          },
          {
            title: "Reply, follow up and get paid",
            text: "Your team works from one inbox. Send a GST invoice with a payment link, and see every rupee against the lead.",
          },
        ]}
      />
    </MkSection>
  );
}

/** The GST maths the invoices do, both ways. Same facts as before, on a subtle band. */
export function BuiltForIndia() {
  return (
    <MkSection id="india" tone="subtle">
      <FeatureSplit
        module="Built for India"
        icon="indian-rupee"
        title="Made for how India sells"
        headingLevel="h2"
        points={[
          "WhatsApp first: templates, broadcasts and the 24-hour reply window handled for you",
          "GST-ready invoices: CGST and SGST in the same state, IGST across states, with your GSTIN",
          "Rupees, not dollars: Indian number grouping, Razorpay payment links and pricing in INR",
          "India's working day: reminders, reports and quiet hours run on Indian time",
        ]}
        visual={
          <div className="rounded-[16px] bg-surface p-5 shadow-[var(--shadow-card)] md:p-6">
            <p className="text-[15px] font-semibold text-foreground">One booking advance, two places of supply</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Same state", rows: [["Amount", "₹25,000"], ["CGST 9%", "₹2,250"], ["SGST 9%", "₹2,250"]] },
                { title: "Another state", rows: [["Amount", "₹25,000"], ["IGST 18%", "₹4,500"]] },
              ].map((c) => (
                <div key={c.title} className="flex flex-col rounded-[12px] bg-background p-4">
                  <p className="text-[13px] font-semibold text-accent">{c.title}</p>
                  <dl className="mt-3 mb-3 space-y-1.5 text-sm text-muted-foreground">
                    {c.rows.map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <dt>{k}</dt>
                        <dd className="tabular-nums">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-auto flex justify-between border-t border-border pt-3 text-xl font-bold text-foreground">
                    <span>Total</span>
                    <CountUp value="₹29,500" />
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-xs text-muted-foreground">INV/26-27/0042 · numbered per financial year</p>
          </div>
        }
      />
    </MkSection>
  );
}
