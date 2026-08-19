"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dhamu",
    role: "Founder · SV 'Entreprise's",
    content:
      "Site-visit enquiries used to slip through the cracks. Now every lead from our listings gets an instant WhatsApp, auto-books a visit, and reminds the buyer — our site-visit show-up rate went up noticeably.",
    rating: 5,
  },
  {
    name: "Pavan",
    role: "Founder @ AgroBridge B2B",
    content:
      "We deal with dealers and bulk buyers across districts. ECODrIx keeps every order enquiry in one pipeline and our WhatsApp broadcasts to the dealer network go out in minutes, not hours.",
    rating: 5,
  },
  {
    name: "Mohammad Muzzammel",
    role: "Founder @ Nirvisham",
    content:
      "Patient follow-ups and appointment confirmations run on their own now. Our front desk stopped chasing reminders, and we haven't missed a consultation booking in weeks.",
    rating: 5,
  },
];

/** Initials from a name — up to two letters. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Inline SVG monogram avatar on a brand gradient — no external image. */
function Avatar({ name }: { name: string }) {
  const id = `tavatar-${name.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-12 h-12 shrink-0"
      role="img"
      aria-label={name}
    >
      <defs>
        <linearGradient
          id={id}
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--color-brand-blue)" />
          <stop offset="100%" stopColor="var(--color-brand-purple)" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill={`url(#${id})`} />
      <text
        x="24"
        y="25"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-roboto), system-ui, sans-serif"
        fontWeight="700"
        fontSize="17"
        fill="var(--color-accent-foreground)"
      >
        {initials(name)}
      </text>
    </svg>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 relative overflow-hidden bg-background"
    >
      {/* Background Ambience */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="wrapper relative z-10">
        <header className="test-header mb-20 text-center max-w-2xl mx-auto">
          <div className="pill mb-6 mx-auto bg-foreground/5 border-foreground/10 uppercase tracking-widest text-[10px] font-sans">
            Early Users
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] text-foreground font-display font-black tracking-tight leading-[1.05] mb-6">
            Trusted by <span className="grad-text">growing businesses.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Here&apos;s how real teams are using ECODrIx to automate work and
            close more deals.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 grid-no-collapse">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative rounded-none border border-border bg-surface p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-[0_20px_50px_-12px_var(--color-accent-muted)]"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>

              <Quote
                className="text-foreground/10 mb-6 absolute top-8 right-8"
                size={60}
              />

              <p className="text-foreground/80 text-lg leading-relaxed mb-10 flex-1 relative z-10 italic">
                &quot;{t.content}&quot;
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <Avatar name={t.name} />
                <div>
                  <h4 className="text-foreground font-display font-bold text-base">
                    {t.name}
                  </h4>
                  <p className="text-accent font-sans text-[10px] uppercase tracking-widest">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
