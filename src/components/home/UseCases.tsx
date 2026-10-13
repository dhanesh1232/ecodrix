import { HeartPulse, Building2, ShoppingBag } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const cases = [
  {
    icon: HeartPulse,
    title: "Clinics and service businesses",
    body: "A website enquiry gets a WhatsApp confirmation, a booked slot and a reminder the day before. If nobody books in 24 hours, a follow-up goes out on its own.",
  },
  {
    icon: Building2,
    title: "Real estate and sales teams",
    body: "Leads from listings and ads land in one pipeline. Site visits are confirmed on WhatsApp, and the team sees who is hot, who is cold and who needs a call.",
  },
  {
    icon: ShoppingBag,
    title: "D2C and local brands",
    body: "New customers join a welcome sequence, repeat buyers get offers on WhatsApp, and big orders are flagged for a personal call.",
  },
];

export function UseCases() {
  return (
    <section aria-labelledby="usecases-title" className="section-pad bg-background">
      <div className="wrapper">
        <SectionHeading
          id="usecases-title"
          eyebrow="Who it's for"
          title="Made for teams that sell on WhatsApp"
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {cases.map((c) => (
            <li key={c.title} className="card p-6">
              <c.icon aria-hidden="true" className="size-6 text-accent" />
              <h3 className="mt-4 text-lg">{c.title}</h3>
              <p className="mt-2 text-muted-foreground">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
