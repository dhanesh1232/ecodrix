"use client";

import { useRef, useState } from "react";
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
  purple: "#2b4dcb",
  cyan: "#8d1fae",
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
    title: "CRM & Lead Pipeline",
    description:
      "Track every lead from first contact to closed deal. Kanban-style pipeline, activity logs, contact history, and lead scoring — all in one view. No more spreadsheets.",
    features: [
      "Kanban Board",
      "Lead Scoring",
      "Activity Logs",
      "Revenue Forecast",
    ],
    span: 7,
    link: "#product",
  },
  {
    icon: <Zap size={24} />,
    color: C.cyan,
    title: "AI Automation Engine",
    description:
      "Build workflows with 20+ triggers. Automatically follow up with leads, assign tasks, send messages, and update your CRM based on what your customers do.",
    features: [
      "20+ Triggers",
      "Conditional Logic",
      "Schedule Sends",
      "Auto-Assign",
    ],
    badge: "ECODrIx Core",
    span: 5,
    link: "#product",
  },
  {
    icon: <BsWhatsapp size={24} />,
    color: C.green,
    title: "WhatsApp Business Messaging",
    description:
      "Send and receive WhatsApp messages from your CRM. Use approved templates, run campaigns, and respond to customers — all without switching apps.",
    features: [
      "Meta Cloud API",
      "Template Campaigns",
      "Inbox Management",
      "Broadcast Lists",
    ],
    badge: "Powered by Meta",
    span: 5,
    link: "#product",
  },
  {
    icon: <Megaphone size={24} />,
    color: C.orange,
    title: "Email Marketing",
    description:
      "Design and send email campaigns to segmented lists. Track opens, clicks, and conversions. Powered by AWS SES for reliable, high-volume delivery.",
    features: [
      "Campaign Builder",
      "List Segmentation",
      "Open/Click Tracking",
      "AWS SES",
    ],
    span: 7,
    link: "#contact",
  },
  {
    icon: <Target size={24} />,
    color: C.purple,
    title: "Cloud Storage",
    description:
      "Store client documents, proposals, media, and assets — organized by contact or project. Accessible to your whole team, always.",
    features: [
      "Organized Files",
      "Team Access",
      "Link Sharing",
      "Secure Uploads",
    ],
    span: 4,
    link: "#contact",
  },
  {
    icon: <TrendingUp size={24} />,
    color: C.cyan,
    title: "Chatbot & AI Assistant",
    description:
      "Deploy a trained chatbot on your website or WhatsApp to qualify leads, answer FAQs, and book appointments — even when your team is offline.",
    features: [
      "Lead Qualification",
      "FAQ Handling",
      "Appointment Booking",
      "AI-Powered",
    ],
    badge: "AI-Powered",
    span: 4,
    link: "#product",
  },
  {
    icon: <Video size={24} />,
    color: C.pink,
    title: "Meeting Integration",
    description:
      "Auto-create Google Meet links when an appointment is confirmed. Delivered via WhatsApp instantly. Zero manual scheduling.",
    features: ["OAuth 2.0", "Auto Link", "WhatsApp Sync", "Calendar"],
    span: 4,
    link: "#product",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="py-32 relative overflow-hidden bg-background"
    >
      <div className="wrapper relative z-10">
        <header className="srv-header mb-20 max-w-3xl">
          <div className="pill mb-4 text-accent border-accent/20 bg-accent/5">
            What&apos;s Inside
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6 tracking-tighter">
            Everything You Need,{" "}
            <span className="bg-linear-to-r from-accent to-brand-purple bg-clip-text text-transparent">
              Nothing You Don&apos;t.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Six fully integrated tools under one roof. No separate logins, no
            duct-tape integrations, no hidden costs.
          </p>
        </header>

        <div className="srv-grid grid grid-cols-1 md:grid-cols-12 gap-2.5 lg:gap-5">
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} />
          ))}
        </div>
      </div>

      {/* Background radial atmosphere */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"
        aria-hidden="true"
      />
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    setIsHovered(false);
  };

  const nav = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`srv-card group relative p-px cursor-pointer transition-all duration-500 col-span-1 rounded-none ${service.span === 7
        ? "lg:col-span-7 md:col-span-6"
        : service.span === 5
          ? "lg:col-span-5 md:col-span-6"
          : "lg:col-span-4 md:col-span-6"
        }`}
      onClick={() => nav(service.link)}
      style={{
        backgroundColor: isHovered
          ? `color-mix(in srgb, ${service.color} 40%, transparent)`
          : "var(--color-border)",
        boxShadow: isHovered
          ? `0 20px 50px -12px color-mix(in srgb, ${service.color} 25%, transparent)`
          : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={ref}
        className="h-full w-full relative p-8 lg:p-10 bg-surface overflow-hidden transition-colors duration-500 rounded-none"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* Glow atmosphere inner */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${service.color}5 0%, transparent 50%)`,
          }}
        />

        {/* Icon */}
        <div
          className="mb-10 w-16 h-16 rounded-none flex items-center justify-center text-3xl transition-all duration-500 border border-foreground/5 relative z-10 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
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
            className="absolute top-10 right-10 text-[10px] font-sans px-3 py-1 rounded-full border z-10"
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

        <h3 className={`text-2xl font-display font-black text-foreground mb-4 tracking-tight group-hover:text-[${service.color}] transition-all duration-300 relative z-10`}>
          {service.title}
        </h3>

        <p className="text-muted-foreground text-base leading-relaxed mb-10 group-hover:text-muted-foreground transition-colors relative z-10">
          {service.description}
        </p>

        <ul className="space-y-4 mb-2 relative z-10">
          {service.features.map((feat) => (
            <li
              key={feat}
              className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-muted-foreground transition-colors"
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
