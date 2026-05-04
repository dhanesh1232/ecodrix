"use client";

import { Check, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

// Minimal plans for homepage - showing only key features
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
      "Basic CRM pipeline",
      "5,000 WhatsApp messages/month",
      "Email campaigns (10k/month)",
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
      "Advanced CRM with lead scoring",
      "25,000 WhatsApp messages/month",
      "Unlimited automation workflows",
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
      "Full CRM suite",
      "100,000 WhatsApp messages/month",
      "White-label option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 bg-background border-t border-white/5">
      <div className="wrapper relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill mb-5 mx-auto bg-primary/5 text-primary border-primary/20">
            Pricing Plans
          </div>
          <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] text-white font-display font-black tracking-tight leading-[1.05] mb-5">
            Start free,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan">
              scale as you grow.
            </span>
          </h2>
          <p className="text-[#64647A] text-lg leading-relaxed">
            14-day free trial on all plans. No credit card required. Cancel anytime.
          </p>
        </div>

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
                clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
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
                  clipPath: "polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)"
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#22D3EE]/5 blur-[60px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
                )}

                <div className="mb-8 relative z-10 no-collapse">
                  <h3 className={`font-mono text-[11px] font-bold uppercase tracking-widest mb-4 ${plan.colorClass}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-display font-black text-white tracking-tighter">
                      {plan.price}
                    </span>
                    <span className="text-[#64647A] text-sm">{plan.period}</span>
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
                          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)"
                        }}
                      >
                        <Check size={12} className={plan.colorClass} />
                      </div>
                      <span className="text-[#E0E0F0] text-[14px] leading-snug">{f}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 mt-6">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1 h-1 bg-[#64647A] rounded-full"></div>
                      <div className="w-1 h-1 bg-[#64647A] rounded-full mx-1"></div>
                      <div className="w-1 h-1 bg-[#64647A] rounded-full"></div>
                    </div>
                    <span className="text-[#64647A] text-[14px] leading-snug italic">
                      and more features...
                    </span>
                  </li>
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

        {/* View All Plans Button */}
        <div className="text-center mt-12">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black font-bold uppercase tracking-widest text-[12px] transition-all duration-300 group polygon-button"
            style={{
              clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)"
            }}
          >
            View All Plans & Features
            <ExternalLink
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <p className="text-[#64647A] text-sm mt-3">
            Compare all features and find the perfect plan for your business
          </p>
        </div>
      </div>
    </section>
  );
}
