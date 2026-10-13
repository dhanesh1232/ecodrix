import { Mail, MessageCircle, Sparkles, Globe } from "lucide-react";

/**
 * A static picture of the ERIX dashboard, drawn with the product's own
 * tokens (banner, solid stat tiles, lead table). Decorative: the hero text
 * already says what it shows, so it's one labelled image for screen readers.
 */
const leads = [
  { name: "Rohan Mehta", detail: "3BHK, Baner", source: "WhatsApp", icon: MessageCircle, stage: "Site visit", tone: "primary", value: "₹1,85,000" },
  { name: "Dr. Kavya Iyer", detail: "Clinic software", source: "Website", icon: Globe, stage: "Proposal", tone: "warning", value: "₹64,500" },
  { name: "Arjun Traders", detail: "Bulk order", source: "Email", icon: Mail, stage: "Won", tone: "success", value: "₹2,33,000" },
] as const;

const toneClass = {
  primary: "bg-accent-muted text-accent",
  warning: "bg-warning-subtle text-warning",
  success: "bg-success-subtle text-success",
} as const;

export function ProductPreview() {
  return (
    <div
      role="img"
      aria-label="Preview of the ERIX dashboard: pipeline value, automated WhatsApp replies, and a list of leads from WhatsApp, the website and email."
      className="relative mx-auto w-full max-w-xl"
    >
      <div aria-hidden="true" className="card overflow-hidden p-0 shadow-[var(--shadow-lg)]">
        {/* Banner — tonal blue, the logo's swoosh and dot as decoration */}
        <div className="brand-gradient relative overflow-hidden px-5 py-5 text-on-hero">
          <svg viewBox="0 0 200 80" className="absolute -right-6 -top-4 h-28 w-56 opacity-90">
            <path d="M10 70 C 70 10, 140 5, 195 40" fill="none" stroke="var(--hero-swoosh)" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <span className="absolute right-6 bottom-5 size-2.5 rounded-full bg-[var(--hero-dot)]" />
          <p className="text-[13px] text-on-hero-muted">Good morning, Priya</p>
          <p className="mt-1 font-display text-xl font-semibold text-on-hero">3 leads need a reply</p>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4">
          <div className="rounded-[8px] bg-[var(--brand-blue)] p-3 text-white">
            <p className="text-[11px] text-on-hero-muted">Pipeline</p>
            <p className="mt-1 font-display text-lg font-bold tabular-nums text-white">₹4,82,500</p>
          </div>
          <div className="rounded-[8px] bg-[var(--brand-purple)] p-3 text-white">
            <p className="flex items-center gap-1 text-[11px] text-white/85">
              <Sparkles className="size-3" /> Auto-replies
            </p>
            <p className="mt-1 font-display text-lg font-bold tabular-nums text-white">128</p>
          </div>
          <div className="rounded-[8px] border border-border bg-surface p-3">
            <p className="text-[11px] text-muted-foreground">Follow-ups due</p>
            <p className="mt-1 font-display text-lg font-bold tabular-nums text-foreground">7</p>
          </div>
        </div>

        <div className="mx-4 mb-4 overflow-hidden rounded-[8px] border border-border">
          <div className="grid grid-cols-[1.4fr_1fr_0.9fr] bg-[var(--blue-50)] px-3 py-2 text-[11px] font-semibold text-[var(--blue-800)]">
            <span>Lead</span>
            <span>Stage</span>
            <span className="text-right">Value</span>
          </div>
          {leads.map((l) => (
            <div key={l.name} className="grid grid-cols-[1.4fr_1fr_0.9fr] items-center border-t border-border px-3 py-2.5">
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-foreground">{l.name}</span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <l.icon className="size-3" /> {l.source} · {l.detail}
                </span>
              </span>
              <span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${toneClass[l.tone]}`}>{l.stage}</span>
              </span>
              <span className="text-right text-[13px] font-semibold tabular-nums text-foreground">{l.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
