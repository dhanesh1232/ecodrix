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
  { label: "SEO Engine", icon: BsSearch, color: "#22D3EE" },
  { label: "Email Campaigns", icon: BsEnvelopeAt, color: "#7C6EFA" },
  { label: "Lead Pipeline", icon: BsGraphUpArrow, color: "#4ADE80" },
  { label: "Google Meet", icon: BsCameraVideo, color: "#EA4335" },
];

const row2 = [
  { label: "Meta Ads", icon: BsMeta, color: "#0668E1" },
  { label: "Automation Rules", icon: BsGear, color: "#FB923C" },
  { label: "SES Email", icon: BsLightningCharge, color: "#F472B6" },
  { label: "Kanban CRM", icon: BsLayoutTextSidebarReverse, color: "#7C6EFA" },
  { label: "Trigger Engine", icon: BsBoxes, color: "#22D3EE" },
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
    <div
      className="inline-flex items-center gap-2.5 px-4 py-2.5 shrink-0"
      style={{
        clipPath:
          "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="w-7 h-7 flex items-center justify-center shrink-0"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
          background: `${color}10`,
          border: `1px solid ${color}20`,
        }}
      >
        <Icon size={13} style={{ color }} />
      </div>
      <span className="text-[11px] font-mono text-[#8888A0] tracking-wide whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export function PoweredBy() {
  return (
    <section className="relative z-10 w-full overflow-hidden py-7 bg-background border-y border-white/5 no-collapse">
      {/* Edge fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #060608, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #060608, transparent)" }}
      />

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

      <style>{`
        .marquee-track {
          width: 100%;
          overflow: hidden;
        }
        .marquee-slide {
          display: flex;
          gap: 12px;
          width: max-content;
        }
        .marquee-left {
          animation: scrollLeft 35s linear infinite;
        }
        .marquee-right {
          animation: scrollRight 35s linear infinite;
        }
        .marquee-track:hover .marquee-slide {
          animation-play-state: paused;
        }
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-left, .marquee-right {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
