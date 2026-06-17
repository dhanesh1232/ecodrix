import type { Metadata } from "next";
import {
  ArrowRight,
  Zap,
  Shield,
  Users,
  Star,
  Clock,
  Headphones,
} from "lucide-react";
import { getFAQSchema } from "@/lib/jsonld";
import {
  fetchPublicPlans,
  FALLBACK_PLANS,
  FALLBACK_ADDONS,
} from "@/lib/pricing";
import PricingPlansSection from "@/components/pricing/PriceToggle";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for ECODrIx. Start free, scale as you grow. CRM, WhatsApp automation, AI, editor, cloud storage, workflows — all in one platform.",
  alternates: { canonical: "https://ecodrix.com/pricing" },
};

// ISR: regenerate the page every 5 minutes. Matches the server-side cache TTL
// for `/api/platform/plans/public`, so users always see fresh pricing without
// hammering the backend.
export const revalidate = 300;

const benefits = [
  {
    icon: Star,
    title: "Start for Free",
    description:
      "Every product is included in the Free plan — CRM, AI, editor, workflows, cloud storage, and LAIE. Build your stack before you pay anything.",
    planName: "Free",
  },
  {
    icon: Zap,
    title: "Scale Your Growth",
    description:
      "Lead scoring, larger AI quotas, custom branding, custom domains, collaborator seats, and 99% SLA. Built for teams pushing real volume.",
    planName: "Growth",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description:
      "White-label deployment, dedicated infrastructure, on-prem options, custom contracts, and 99.99% uptime SLA with a dedicated account manager.",
    planName: "Enterprise",
  },
  {
    icon: Clock,
    title: "Save Time Daily",
    description:
      "Automate repetitive tasks, streamline customer communication, and focus on what matters most — growing your business and serving customers better.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description:
      "From community support on Free to a dedicated account manager on Enterprise, our team is here to help you ship and scale with confidence.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Built for teams of every size. Share contacts, collaborate on docs, and ensure everyone stays aligned with shared pipelines and real-time updates.",
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
    a: "Yes. Every paid plan includes a 14-day free trial — no credit card required. The Free plan is forever free.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the end of your billing period.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You can export all your data at any time. After cancellation, data is retained for 30 days before being permanently deleted.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes. Annual billing saves you roughly 17% — about 2 months free per year. Toggle the switch above to see yearly pricing.",
  },
  {
    q: "What is included on the Free plan?",
    a: "Up to 100 contacts, 1 agent, 1,000 WhatsApp messages, 5 LAIE audits, 1 GB storage, and 1 active workflow — every product is available, just at smaller quotas.",
  },
  {
    q: "Can I buy add-ons without upgrading?",
    a: "Yes. Add-ons stack on top of any plan, including Free. Buy exactly the capacity or feature you need without changing tiers.",
  },
  {
    q: "Do you support white-labeling?",
    a: "White-label is included on the Enterprise plan and is available as a stand-alone add-on for $99/month on any other plan.",
  },
];

export default async function PricingPage() {
  const data = await fetchPublicPlans();
  const usedFallback = data === null;
  const plans = data?.plans ?? FALLBACK_PLANS;
  const addons = data?.addons ?? FALLBACK_ADDONS;

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

      {/* ── Hero ── */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
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
            Start free. Upgrade when you outgrow it. Cancel anytime, no
            questions asked.
          </p>

          {/* trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {trust.map(({ icon: Icon, label }, i) => (
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

      {/* ── Plans + Add-ons (client-rendered for toggle interactivity) ── */}
      <PricingPlansSection
        plans={plans}
        addons={addons}
        usedFallback={usedFallback}
      />

      {/* ── Benefits ── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="wrapper">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="pill mb-5 mx-auto bg-primary/5 text-primary border-primary/20">
              Why Choose ECODrIx
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
            {faqs.map(({ q, a }, i) => (
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
            Free forever plan. No credit card. Setup in under 15 minutes.
          </p>
          <a
            href="https://app.ecodrix.com/auth/signup"
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 font-bold uppercase tracking-widest text-[13px] text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,110,250,0.35)] bg-linear-to-r from-primary to-cyan polygon-button"
            style={{
              clipPath:
                "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            }}
          >
            Start for Free
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
