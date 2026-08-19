"use client";

import {
  BsWhatsapp,
  BsGoogle,
  BsShieldCheck,
  BsLightningCharge,
  BsEnvelopeAt,
  BsLayoutTextSidebarReverse,
  BsGear,
  BsMeta,
  BsSearch,
  BsGraphUpArrow,
  BsCameraVideo,
  BsBoxes,
} from "react-icons/bs";

const row1 = [
  { label: "WhatsApp CRM", icon: BsWhatsapp, color: "#25D366" },
  { label: "Google Ads", icon: BsGoogle, color: "#4285F4" },
  { label: "SEO Engine", icon: BsSearch, color: "var(--color-brand-purple)" },
  {
    label: "Email Campaigns",
    icon: BsEnvelopeAt,
    color: "var(--color-accent)",
  },
  {
    label: "Lead Pipeline",
    icon: BsGraphUpArrow,
    color: "var(--color-success)",
  },
  { label: "Google Meet", icon: BsCameraVideo, color: "#EA4335" },
];

const row2 = [
  { label: "Meta Ads", icon: BsMeta, color: "#0668E1" },
  { label: "Automation Rules", icon: BsGear, color: "#FB923C" },
  { label: "SES Email", icon: BsLightningCharge, color: "#F472B6" },
  {
    label: "Kanban CRM",
    icon: BsLayoutTextSidebarReverse,
    color: "var(--color-accent)",
  },
  {
    label: "Trigger Engine",
    icon: BsBoxes,
    color: "var(--color-brand-purple)",
  },
  { label: "WhatsApp Inbox", icon: BsShieldCheck, color: "#25D366" },
];

function MarqueeItem({
  label,
  icon: Icon,
  color,
}: {
  label: string;
  icon: any;
  color: string;
}) {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 shrink-0 rounded-none border border-border bg-foreground/[0.02]">
      <div
        className="w-7 h-7 flex items-center justify-center shrink-0 rounded-none"
        style={{
          background: `color-mix(in srgb, ${color} 10%, transparent)`,
          border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
          color,
        }}
      >
        <Icon size={13} />
      </div>
      <span className="text-[11px] font-sans text-muted-foreground tracking-wide whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export function PoweredBy() {
  return (
    <section className="relative z-10 w-full overflow-hidden py-7 bg-background border-y border-foreground/5 no-collapse">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none bg-[linear-gradient(90deg,var(--color-background),transparent)]" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none bg-[linear-gradient(270deg,var(--color-background),transparent)]" />

      {/* Row 1 — slides left */}
      <div className="marquee-track mb-3">
        <div className="marquee-slide marquee-left">
          {[...row1, ...row1, ...row1, ...row1].map((item, i) => (
            <MarqueeItem key={`r1-${i}`} {...item} />
          ))}
        </div>
      </div>

      {/* Row 2 — slides right */}
      <div className="marquee-track">
        <div className="marquee-slide marquee-right">
          {[...row2, ...row2, ...row2, ...row2].map((item, i) => (
            <MarqueeItem key={`r2-${i}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
