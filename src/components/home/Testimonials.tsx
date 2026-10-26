import { MkSection } from "@/components/marketing/kit";

// Quotes and names are exactly as approved; don't edit or add to them.
// Avatars are all blue: purple is for AI only (brand rule).
const quotes = [
  {
    name: "Dhamu",
    role: "Founder, SV Entreprises",
    text: "Site-visit enquiries used to slip through the cracks. Now every lead from our listings gets an instant WhatsApp, a booked visit and a reminder. Our site-visit show-up rate went up noticeably.",
  },
  {
    name: "Pavan",
    role: "Founder, AgroBridge B2B",
    text: "We deal with dealers and bulk buyers across districts. Every order enquiry sits in one pipeline, and our WhatsApp broadcasts to the dealer network go out in minutes, not hours.",
  },
  {
    name: "Mohammad Muzzammel",
    role: "Founder, Nirvisham",
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

function Quote({ q, lead }: { q: (typeof quotes)[number]; lead?: boolean }) {
  return (
    <figure className={`erix-mk-quote h-full ${lead ? "erix-mk-quote--lead" : ""}`}>
      <blockquote>“{q.text}”</blockquote>
      <figcaption>
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full bg-accent-muted text-sm font-bold text-accent"
        >
          {initials(q.name)}
        </span>
        <span>
          <span className="block font-semibold text-foreground">{q.name}</span>
          <span className="block text-sm text-subtle">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Proof: the approved quotes, one large and two beside each other. */
export function Testimonials() {
  const [first, ...rest] = quotes;
  return (
    <MkSection id="proof" tone="subtle" title="What owners tell us">
      <div className="grid gap-4">
        <Quote q={first} lead />
        <div className="erix-mk-quotes">
          {rest.map((q) => (
            <Quote key={q.name} q={q} />
          ))}
        </div>
      </div>
    </MkSection>
  );
}
