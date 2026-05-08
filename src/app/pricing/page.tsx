import type { Metadata } from "next";
import {
  Check,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Star,
  Clock,
  Headphones,
} from "lucide-react";
import { getFAQSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for ECODrix. Start free, scale as you grow. CRM, WhatsApp automation, email marketing, and cloud storage — all in one platform.",
  alternates: { canonical: "https://ecodrix.com/pricing" },
};

const plans = [
  {
    name: "Starter",
    price: "₹2,999",
    period: "/month",
    description: "For small teams getting started with automation.",
    color: "#7C6EFA",
    colorClass: "text-[#7C6EFA]",
    bgClass: "bg-[#7C6EFA]/10",
    features: [
      "Up to 1,000 contacts",
      "2 team members",
      "5,000 WhatsApp messages/month",
      "Basic CRM pipeline",
      "5 automation workflows",
      "Email campaigns (10k/month)",
      "1 GB cloud storage",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    price: "₹7,999",
    period: "/month",
    description: "For growing businesses that need more power.",
    color: "#22D3EE",
    colorClass: "text-[#22D3EE]",
    bgClass: "bg-[#22D3EE]/10",
    features: [
      "Up to 10,000 contacts",
      "10 team members",
      "25,000 WhatsApp messages/month",
      "Advanced CRM with lead scoring",
      "Unlimited automation workflows",
      "Email campaigns (100k/month)",
      "10 GB cloud storage",
      "Meeting scheduler",
      "Priority support",
      "Custom fields & reports",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "₹19,999",
    period: "/month",
    description: "For established teams that need full control.",
    color: "#4ADE80",
    colorClass: "text-[#4ADE80]",
    bgClass: "bg-[#4ADE80]/10",
    features: [
      "Unlimited contacts",
      "Unlimited team members",
      "100,000 WhatsApp messages/month",
      "Full CRM suite",
      "Unlimited automation workflows",
      "Email campaigns (unlimited)",
      "100 GB cloud storage",
      "White-label option",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const benefits = [
  {
    icon: Star,
    title: "Perfect for Startups",
    description:
      "Get started quickly with essential CRM and automation tools. Ideal for small teams who need to organize contacts and automate basic workflows without complexity.",
    planName: "Starter",
  },
  {
    icon: Zap,
    title: "Scale Your Growth",
    description:
      "Advanced features like lead scoring, unlimited workflows, and priority support. Perfect for growing businesses that need more power and sophisticated automation.",
    planName: "Growth",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description:
      "Full control with white-labeling, API access, and dedicated support. Built for established teams who need complete customization and enterprise-grade features.",
    planName: "Business",
  },
  {
    icon: Clock,
    title: "Save Time Daily",
    description:
      "Automate repetitive tasks, streamline customer communication, and focus on what matters most - growing your business and serving customers better.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description:
      "From email support on Starter to dedicated support on Business plans, our team is here to help you succeed with personalized assistance.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Built for teams of all sizes. Share contacts, collaborate on deals, and ensure everyone stays aligned with shared pipelines and real-time updates.",
  },
];
const trust = [
  { icon: Shield, label: "SOC 2 compliant infrastructure" },
  { icon: Zap, label: "99.9% uptime SLA" },
  { icon: Users, label: "50+ businesses onboarded" },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes. Every plan starts with a 14-day free trial. No credit card required.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade at any time. Changes take effect immediately.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You can export all your data at any time. After cancellation, data is retained for 30 days.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes. Annual billing saves you 2 months — roughly 17% off. Contact us to switch.",
  },
  {
    q: "Is WhatsApp included in all plans?",
    a: "Yes. WhatsApp messaging is included in all plans. Message limits vary by plan.",
  },
  {
    q: "Do you support white-labeling?",
    a: "White-label is available on the Business plan and above. Your brand, your domain.",
  },
];

export default function PricingPage() {
  return (
    <div className="w-full">
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(faqs)),
        }}
      />
      
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden="true"
          style={{
            width: "700px",
            height: "400px",
            background:
              "conic-gradient(from 270deg at 50% 0%, transparent 55deg, rgba(124,110,250,0.18) 85deg, rgba(34,211,238,0.07) 115deg, transparent 155deg)",
            filter: "blur(14px)",
          }}
        />
        <div className="wrapper relative z-10 text-center">
          <div className="pill mb-6 mx-auto">Pricing</div>
          <h1
            className="font-display font-black text-white mb-6"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 4.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Simple, transparent <span className="grad-text">pricing.</span>
          </h1>
          <p
            className="text-text-lo max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
          >
            Start with a 14-day free trial. No credit card required. Cancel
            anytime.
          </p>

          {/* trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {trust.map(({ icon: Icon, label }: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 text-text-lo"
                style={{ fontSize: "13px" }}
              >
                <Icon size={14} className="text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="pb-24 px-6">
        <div className="wrapper">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto grid-no-collapse">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`group relative p-px transition-colors duration-500 no-collapse ${
                  plan.popular
                    ? "bg-linear-to-br from-[#22D3EE]/50 to-[#7C6EFA]/50"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                style={{
                  clipPath:
                    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-black z-20 polygon-tag"
                    style={{ backgroundColor: plan.color }}
                  >
                    Most Popular
                  </div>
                )}
                <div
                  className="bg-[#0A0A10] h-full p-8 relative overflow-hidden flex flex-col no-collapse"
                  style={{
                    clipPath:
                      "polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)",
                  }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#22D3EE]/5 blur-[60px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
                  )}

                  <div className="mb-8 relative z-10 no-collapse">
                    <h3
                      className={`font-mono text-[11px] font-bold uppercase tracking-widest mb-4 ${plan.colorClass}`}
                    >
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl font-display font-black text-white tracking-tighter">
                        {plan.price}
                      </span>
                      <span className="text-[#64647A] text-sm">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-[#64647A] text-sm leading-relaxed min-h-[48px]">
                      {plan.description}
                    </p>
                  </div>

                  <div className="h-px bg-white/5 mb-8 w-full" />

                  <ul className="space-y-4 relative z-10 flex-1 mb-10 no-collapse">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 ${plan.bgClass} polygon-icon`}
                          style={{
                            clipPath:
                              "polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)",
                          }}
                        >
                          <Check size={12} className={plan.colorClass} />
                        </div>
                        <span className="text-[#E0E0F0] text-[14px] leading-snug">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/#contact"
                    className={`w-full py-4 px-6 font-bold uppercase tracking-widest text-[12px] transition-all duration-300 flex items-center justify-center gap-2 group/btn relative z-10 polygon-button ${
                      plan.popular
                        ? "bg-white text-black hover:bg-[#22D3EE] hover:text-black"
                        : "bg-white/5 text-white hover:bg-white hover:text-black border border-white/10 hover:border-white"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise row */}
          <div
            className="mt-8 p-px bg-white/10 hover:bg-white/20 transition-colors duration-300"
            style={{
              clipPath:
                "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
            }}
          >
            <div
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-8 py-7 bg-[#0A0A10]"
              style={{
                clipPath:
                  "polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)",
              }}
            >
              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary mb-2">
                  Enterprise / Custom
                </div>
                <p className="text-[#64647A] text-sm leading-relaxed max-w-xl">
                  Dedicated infrastructure, custom SLA, white-label deployment,
                  and on-premise options. Built around your requirements.
                </p>
              </div>
              <a
                href="mailto:contact@ecodrix.com"
                className="group shrink-0 flex items-center gap-2 px-7 py-4 font-bold uppercase tracking-widest text-[12px] text-white border border-white/10 transition-all duration-300 hover:border-white hover:bg-white hover:text-black polygon-button"
              >
                Contact Us
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="wrapper">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="pill mb-5 mx-auto bg-primary/5 text-primary border-primary/20">
              Why Choose ECODrix
            </div>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] text-white font-display font-black tracking-tight leading-[1.05] mb-5">
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan">
                your success.
              </span>
            </h2>
            <p className="text-[#64647A] text-lg leading-relaxed">
              Every plan is designed to help you grow, with features that scale
              with your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="group relative p-px bg-white/10 hover:bg-white/20 transition-colors duration-500 no-collapse"
                style={{
                  clipPath:
                    "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                }}
              >
                <div
                  className="bg-[#0A0A10] h-full p-6 relative overflow-hidden flex flex-col no-collapse"
                  style={{
                    clipPath:
                      "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                  }}
                >
                  <div className="mb-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center mb-4 bg-primary/10 polygon-icon"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
                      }}
                    >
                      <benefit.icon size={20} className="text-primary" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                      {benefit.title}
                    </h3>
                    {benefit.planName && (
                      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary mb-3">
                        {benefit.planName} Plan
                      </div>
                    )}
                  </div>
                  <p className="text-[#64647A] text-sm leading-relaxed flex-1">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sep-top py-24 px-6" style={{ background: "#060608" }}>
        <div className="wrapper">
          <div className="pill mb-6">FAQ</div>
          <h2
            className="font-display font-black text-white mb-16"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Common questions.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {faqs.map(({ q, a }: any, i) => (
              <div key={i} className="p-8 bg-[#0A0A10]">
                <h4 className="text-white font-bold mb-3 text-base">{q}</h4>
                <p className="text-text-lo text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-24 px-6 text-center">
        <div className="wrapper max-w-2xl mx-auto">
          <h2
            className="font-display font-black text-white mb-5"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Ready to get started?
          </h2>
          <p className="text-text-lo mb-10 leading-relaxed">
            14-day free trial. No credit card. Setup in under 15 minutes.
          </p>
          <a
            href="/#contact"
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 font-bold uppercase tracking-widest text-[13px] text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,110,250,0.35)] bg-linear-to-r from-primary to-cyan polygon-button"
            style={{
              clipPath:
                "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            }}
          >
            Start Free Trial
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </section>
    </div>
  );
}
