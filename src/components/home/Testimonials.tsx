import { SectionHeading } from "./SectionHeading";

const quotes = [
  {
    name: "Dhamu",
    role: "Founder, SV Entreprises",
    tone: "bg-accent-muted text-accent",
    text: "Site-visit enquiries used to slip through the cracks. Now every lead from our listings gets an instant WhatsApp, a booked visit and a reminder. Our site-visit show-up rate went up noticeably.",
  },
  {
    name: "Pavan",
    role: "Founder, AgroBridge B2B",
    tone: "bg-ai-subtle text-ai",
    text: "We deal with dealers and bulk buyers across districts. Every order enquiry sits in one pipeline, and our WhatsApp broadcasts to the dealer network go out in minutes, not hours.",
  },
  {
    name: "Mohammad Muzzammel",
    role: "Founder, Nirvisham",
    tone: "bg-error-subtle text-error",
    text: "Patient follow-ups and appointment confirmations run on their own now. Our front desk stopped chasing reminders, and we haven't missed a consultation booking in weeks.",
  },
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function Testimonials() {
  return (
    <section aria-labelledby="quotes-title" className="section-pad border-t border-border bg-surface">
      <div className="wrapper">
        <SectionHeading id="quotes-title" eyebrow="Early customers" title="What owners tell us" />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <li key={q.name}>
              <figure className="card flex h-full flex-col p-6">
                <blockquote className="flex-1 text-foreground leading-relaxed">“{q.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`flex size-10 items-center justify-center rounded-full font-display text-sm font-bold ${q.tone}`}
                  >
                    {initials(q.name)}
                  </span>
                  <span>
                    <span className="block font-semibold text-foreground">{q.name}</span>
                    <span className="block text-sm text-muted-foreground">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
