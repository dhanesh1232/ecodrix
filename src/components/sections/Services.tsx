"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  ArrowUpRight,
  Globe,
  Megaphone,
  Target,
  TrendingUp,
  Video,
  Zap,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

const C = {
  purple: "#7C6EFA",
  cyan: "#22D3EE",
  green: "#4ADE80",
  orange: "#FB923C",
  pink: "#F472B6",
};

type Service = {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  features: string[];
  badge?: string;
  span: number; // out of 12
  link: string;
};

const services: Service[] = [
  {
    icon: <Globe size={24} />,
    color: C.purple,
    title: "Website Development",
    description:
      "Custom Next.js / React websites that are fast, SEO-ready, and built to convert. Every pixel is deliberate.",
    features: [
      "Next.js & React",
      "High Performance",
      "SEO Optimized",
      "Responsive Design",
    ],
    span: 7,
    link: "#work",
  },
  {
    icon: <TrendingUp size={24} />,
    color: C.cyan,
    title: "SEO & Organic Growth",
    description:
      "Technical audits, keyword strategy, and rank tracking. We grow traffic that compounds — not spikes.",
    features: ["Technical Audit", "Strategy", "Analytics", "Rank Tracking"],
    span: 5,
    link: "#contact",
  },
  {
    icon: <Megaphone size={24} />,
    color: C.orange,
    title: "Google & Meta Ads",
    description:
      "Performance campaigns across Google, YouTube, and Meta. ROI-focused setup and A/B tested creatives.",
    features: ["Google Ads", "Meta Ads", "ROI Tracking", "A/B Testing"],
    span: 5,
    link: "#contact",
  },
  {
    icon: <BsWhatsapp size={24} />,
    color: C.green,
    title: "WhatsApp Automation",
    description:
      "Trigger reminders, broadcast campaigns, and manage inbox via Meta Cloud API under your brand.",
    features: ["Meta Cloud API", "Broadcasts", "Reminders", "Inbox API"],
    badge: "Powered by ECODrIx",
    span: 7,
    link: "#product",
  },
  {
    icon: <Target size={24} />,
    color: C.purple,
    title: "CRM & Lead Pipeline",
    description:
      "Full Kanban CRM with lead scoring, pipelines, and activity logs. Embedded directly in your product.",
    features: ["Kanban Board", "Lead Scoring", "Analytics", "Activity Logs"],
    badge: "White-Label",
    span: 4,
    link: "#product",
  },
  {
    icon: <Zap size={24} />,
    color: C.cyan,
    title: "Automation Engine",
    description:
      "Trigger-based rules: send WhatsApp, emails, move leads, and assign teams — automatically.",
    features: ["20+ Triggers", "Multi-action", "Sequences", "Auto-Assignment"],
    badge: "ECODrIx Core",
    span: 4,
    link: "#product",
  },
  {
    icon: <Video size={24} />,
    color: C.pink,
    title: "Meeting Integration",
    description:
      "Auto-create Google Meet links when an appointment is confirmed. Delivered via WhatsApp instantly.",
    features: ["OAuth 2.0", "Auto Link", "WhatsApp Sync", "Calendar"],
    span: 4,
    link: "#product",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".srv-header > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".srv-header",
          start: "top 85%",
        },
      });

      gsap.from(".srv-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".srv-grid",
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-32 relative overflow-hidden bg-background"
    >
      <div className="wrapper relative z-10">
        <header className="srv-header mb-20 max-w-3xl">
          <div className="pill mb-4 text-primary border-primary/20 bg-primary/5">
            Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 tracking-tighter">
            We build the systems that <br className="hidden md:block" />
            <span className="bg-linear-to-r from-primary to-cyan bg-clip-text text-transparent">
              Power Your Growth.
            </span>
          </h2>
          <p className="text-lg text-[#64647A] leading-relaxed">
            From high-conversion interfaces to deep automation logic, we provide
            the technical backbone for next-generation businesses.
          </p>
        </header>

        <div className="srv-grid grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} />
          ))}
        </div>
      </div>

      {/* Background radial atmosphere */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ${service.color}15 0%, transparent 65%)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.background = "transparent";
  };

  const nav = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="srv-card group relative p-px cursor-pointer transition-all duration-500"
      onClick={() => nav(service.link)}
      style={{
        gridColumn: `span ${service.span}`,
        clipPath:
          "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
        backgroundColor: "rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${service.color}40`;
        e.currentTarget.style.boxShadow = `0 20px 50px -12px ${service.color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        ref={ref}
        className="h-full w-full relative p-8 lg:p-10 bg-[#0D0D14] overflow-hidden transition-colors duration-500"
        style={{
          clipPath:
            "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* Glow atmosphere inner */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${service.color}10 0%, transparent 50%)`,
          }}
        />

        {/* Icon */}
        <div
          className="mb-10 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 border border-white/5 relative z-10 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
          style={{
            background: `${service.color}15`,
            color: service.color,
            boxShadow: `0 0 30px ${service.color}10`,
          }}
        >
          {service.icon}
        </div>

        {/* Badge */}
        {service.badge && (
          <div
            className="absolute top-10 right-10 text-[10px] font-mono px-3 py-1 rounded-full border z-10"
            style={{
              background: `${service.color}15`,
              borderColor: `${service.color}40`,
              color: service.color,
              letterSpacing: "0.06em",
            }}
          >
            {service.badge}
          </div>
        )}

        <h3 className="text-2xl font-display font-black text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300 relative z-10">
          {service.title}
        </h3>

        <p className="text-[#64647A] text-base leading-relaxed mb-10 group-hover:text-[#888899] transition-colors relative z-10">
          {service.description}
        </p>

        <ul className="space-y-4 mb-2 relative z-10">
          {service.features.map((feat) => (
            <li
              key={feat}
              className="flex items-center gap-3 text-sm text-[#444455] group-hover:text-[#64647A] transition-colors"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: service.color }}
              />
              {feat}
            </li>
          ))}
        </ul>

        {/* Hover arrow */}
        <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 z-10">
          <ArrowUpRight size={24} style={{ color: service.color }} />
        </div>
      </div>
    </div>
  );
}
