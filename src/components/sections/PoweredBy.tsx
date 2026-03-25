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

export function PoweredBy() {
  const poweredBy = [
    { label: "WhatsApp CRM", icon: <BsWhatsapp className="text-[#25D366]" /> },
    { label: "Google Ads", icon: <BsGoogle className="text-[#4285F4]" /> },
    { label: "SEO Engine", icon: <BsSearch className="text-[#22D3EE]" /> },
    {
      label: "Email Campaigns",
      icon: <BsEnvelopeAt className="text-[#7C6EFA]" />,
    },
    {
      label: "Lead Pipeline",
      icon: <BsGraphUpArrow className="text-[#4ADE80]" />,
    },
    {
      label: "Google Meet",
      icon: <BsCameraVideo className="text-[#EA4335]" />,
    },
    { label: "Meta Ads", icon: <BsMeta className="text-[#0668E1]" /> },
    { label: "Automation Rules", icon: <BsGear className="text-[#FB923C]" /> },
    {
      label: "SES Email",
      icon: <BsLightningCharge className="text-[#F472B6]" />,
    },
    {
      label: "Kanban CRM",
      icon: <BsLayoutTextSidebarReverse className="text-[#7C6EFA]" />,
    },
    { label: "Trigger Engine", icon: <BsBoxes className="text-[#22D3EE]" /> },
    {
      label: "WhatsApp Inbox",
      icon: <BsShieldCheck className="text-[#25D366]" />,
    },
  ];

  return (
    <section className="relative z-10 w-full overflow-hidden py-12 bg-background border-y border-white/5">
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div
          className="flex gap-16 whitespace-nowrap marquee-strip"
          style={{ animation: "marquee 50s linear infinite" }}
        >
          {[...poweredBy, ...poweredBy, ...poweredBy].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#64647A] hover:text-white transition-all duration-300 group cursor-default"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 scale-90 group-hover:scale-110"
                style={{
                  boxShadow: "0 4px 20px -8px rgba(255,255,255,0.1)",
                }}
              >
                {item.icon}
              </div>
              <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
