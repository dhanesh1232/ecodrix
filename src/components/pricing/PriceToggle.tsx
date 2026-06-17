"use client";

/**
 * PricingPlansSection
 *
 * Client component that renders the monthly/yearly billing toggle, the
 * 5-plan grid, the Enterprise row, and the Add-Ons section. The data is
 * passed in from the server component (which fetches it with ISR), so this
 * component is purely presentational + interactive (toggle state).
 */

import { useState } from "react";
import {
  Check,
  ArrowRight,
  Plus,
  HardDrive,
  Cpu,
  Sparkles,
  Crown,
} from "lucide-react";
import {
  type PublicPlan,
  type PublicAddon,
  formatUsd,
  yearlyDiscountPct,
  humaniseFeatures,
  planVisualStyle,
  planDescription,
  planCtaLabel,
  planCtaHref,
  groupAddonsByService,
  formatAddonPrice,
} from "@/lib/pricing";

interface Props {
  plans: PublicPlan[];
  addons: PublicAddon[];
  /** True when the API was unreachable and the static snapshot is in use. */
  usedFallback?: boolean;
}

const CLIP_CARD =
  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";
const CLIP_CARD_INNER =
  "polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)";
const CLIP_ICON_INNER =
  "polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)";

type Billing = "monthly" | "yearly";

function priceFor(
  plan: PublicPlan,
  billing: Billing,
): {
  amount: string;
  period: string;
  hint?: string;
} {
  if (plan.slug === "enterprise") {
    return { amount: "Custom", period: "" };
  }
  if (plan.priceMonthlyUsd === 0 && plan.priceYearlyUsd === 0) {
    return { amount: "$0", period: "/forever" };
  }
  if (billing === "yearly") {
    const monthlyEffective = Math.round(plan.priceYearlyUsd / 12);
    return {
      amount: formatUsd(monthlyEffective),
      period: "/month",
      hint: `Billed ${formatUsd(plan.priceYearlyUsd)} yearly`,
    };
  }
  return {
    amount: formatUsd(plan.priceMonthlyUsd),
    period: "/month",
  };
}

function addonIcon(service: string) {
  switch (service) {
    case "cloud_storage":
      return HardDrive;
    case "ai":
      return Cpu;
    case "editor":
      return Sparkles;
    case "platform":
      return Crown;
    default:
      return Plus;
  }
}

export default function PricingPlansSection({
  plans,
  addons,
  usedFallback,
}: Props) {
  const [billing, setBilling] = useState<Billing>("monthly");

  // Stable order: tier ascending. Server already does this, but defensive.
  const sortedPlans = [...plans].sort((a, b) => a.tier - b.tier);

  // Calculate yearly savings from a representative paid plan (Starter) so the
  // toggle always shows a concrete percentage.
  const refPlan =
    sortedPlans.find((p) => p.slug === "starter") ??
    sortedPlans.find((p) => p.priceMonthlyUsd > 0);
  const yearlyPct = refPlan
    ? yearlyDiscountPct(refPlan.priceMonthlyUsd, refPlan.priceYearlyUsd)
    : 17;

  const enterprise = sortedPlans.find((p) => p.slug === "enterprise");
  const gridPlans = sortedPlans.filter((p) => p.slug !== "enterprise");
  const addonGroups = groupAddonsByService(addons);

  return (
    <>
      {/* ── Fallback warning banner ── */}
      {usedFallback && (
        <section className="px-6">
          <div className="wrapper">
            <div
              className="mx-auto max-w-3xl mb-8 flex items-start gap-3 px-4 py-3 text-[13px] text-[#FBBF24] border border-[#FBBF24]/20 bg-[#FBBF24]/5"
              style={{
                clipPath:
                  "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
              }}
              role="status"
            >
              <Sparkles size={14} className="mt-0.5 shrink-0" />
              <span>
                Live pricing is temporarily unavailable. Showing a recent
                snapshot — please refresh in a moment for the latest plans.
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ── Billing toggle ── */}
      <section className="px-6 pb-12">
        <div className="wrapper flex items-center justify-center">
          <div
            className="inline-flex items-center gap-1 p-1 bg-white/5 border border-white/10"
            role="tablist"
            aria-label="Billing period"
            style={{
              clipPath:
                "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
            }}
          >
            <button
              type="button"
              role="tab"
              aria-selected={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-text-lo hover:text-white"
              }`}
              style={{
                clipPath:
                  "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
              }}
            >
              Monthly
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={billing === "yearly"}
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-text-lo hover:text-white"
              }`}
              style={{
                clipPath:
                  "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
              }}
            >
              Yearly
              {yearlyPct > 0 && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 ${
                    billing === "yearly"
                      ? "bg-black/10 text-black"
                      : "bg-[#4ADE80]/15 text-[#4ADE80]"
                  }`}
                >
                  −{yearlyPct}%
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ── Plans grid ── */}
      <section className="pb-24 px-6">
        <div className="wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto grid-no-collapse">
            {gridPlans.map((plan) => {
              const style = planVisualStyle(plan.slug);
              const popular = plan.slug === "growth";
              const features = humaniseFeatures(plan);
              const { amount, period, hint } = priceFor(plan, billing);

              return (
                <div
                  key={plan.slug}
                  className={`group relative p-px transition-colors duration-500 no-collapse ${
                    popular
                      ? "bg-linear-to-br from-[#22D3EE]/50 to-[#7C6EFA]/50"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  style={{ clipPath: CLIP_CARD }}
                >
                  {popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-black z-20 polygon-tag"
                      style={{ backgroundColor: style.color }}
                    >
                      Most Popular
                    </div>
                  )}
                  <div
                    className="bg-[#0A0A10] h-full p-7 relative overflow-hidden flex flex-col no-collapse"
                    style={{ clipPath: CLIP_CARD_INNER }}
                  >
                    {popular && (
                      <div
                        className="absolute top-0 right-0 w-64 h-64 bg-[#22D3EE]/5 blur-[60px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"
                        aria-hidden="true"
                      />
                    )}

                    <div className="mb-6 relative z-10 no-collapse">
                      <h3
                        className={`font-mono text-[11px] font-bold uppercase tracking-widest mb-4 ${style.colorClass}`}
                      >
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-display font-black text-white tracking-tighter">
                          {amount}
                        </span>
                        {period && (
                          <span className="text-[#64647A] text-sm">
                            {period}
                          </span>
                        )}
                      </div>
                      {hint && (
                        <p className="text-[11px] text-[#4ADE80] font-mono mb-2">
                          {hint}
                        </p>
                      )}
                      <p className="text-[#64647A] text-sm leading-relaxed min-h-[44px]">
                        {planDescription(plan.slug)}
                      </p>
                    </div>

                    <div className="h-px bg-white/5 mb-6 w-full" />

                    <ul className="space-y-3 relative z-10 flex-1 mb-8 no-collapse">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 ${style.bgClass} polygon-icon`}
                            style={{ clipPath: CLIP_ICON_INNER }}
                          >
                            <Check size={12} className={style.colorClass} />
                          </div>
                          <span className="text-[#E0E0F0] text-[13px] leading-snug">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={planCtaHref(plan.slug)}
                      className={`w-full py-4 px-6 font-bold uppercase tracking-widest text-[12px] transition-all duration-300 flex items-center justify-center gap-2 group/btn relative z-10 polygon-button ${
                        popular
                          ? "bg-white text-black hover:bg-[#22D3EE] hover:text-black"
                          : "bg-white/5 text-white hover:bg-white hover:text-black border border-white/10 hover:border-white"
                      }`}
                    >
                      {planCtaLabel(plan.slug)}
                      <ArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Enterprise row ── */}
          {enterprise && (
            <div
              className="mt-8 p-px bg-white/10 hover:bg-white/20 transition-colors duration-300"
              style={{ clipPath: CLIP_CARD }}
            >
              <div
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-8 py-7 bg-[#0A0A10]"
                style={{ clipPath: CLIP_CARD_INNER }}
              >
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary mb-2">
                    Enterprise / Custom
                  </div>
                  <p className="text-[#64647A] text-sm leading-relaxed max-w-xl">
                    {planDescription("enterprise")} Dedicated account manager,
                    99.99% SLA, on-prem deployment, and custom contracts.
                  </p>
                </div>
                <a
                  href={planCtaHref("enterprise")}
                  className="group shrink-0 flex items-center gap-2 px-7 py-4 font-bold uppercase tracking-widest text-[12px] text-white border border-white/10 transition-all duration-300 hover:border-white hover:bg-white hover:text-black polygon-button"
                >
                  {planCtaLabel("enterprise")}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Add-Ons ── */}
      {addons.length > 0 && (
        <section className="py-24 px-6 border-t border-white/5">
          <div className="wrapper">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="pill mb-5 mx-auto bg-[#22D3EE]/5 text-[#22D3EE] border-[#22D3EE]/20">
                Add-Ons
              </div>
              <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] text-white font-display font-black tracking-tight leading-[1.05] mb-4">
                Stack on top of any{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan">
                  plan.
                </span>
              </h2>
              <p className="text-[#64647A] text-base leading-relaxed">
                Buy exactly what you need. Available on all plans, including
                Free.
              </p>
            </div>

            <div className="space-y-12 max-w-6xl mx-auto">
              {addonGroups.map((group) => {
                const Icon = addonIcon(group.service);
                return (
                  <div key={group.service}>
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-9 h-9 flex items-center justify-center bg-primary/10 polygon-icon"
                        style={{ clipPath: CLIP_ICON_INNER }}
                      >
                        <Icon size={16} className="text-primary" />
                      </div>
                      <h3 className="font-mono text-[12px] font-bold uppercase tracking-widest text-white">
                        {group.label}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {group.items.map((addon) => (
                        <div
                          key={addon.slug}
                          className="group relative p-px bg-white/10 hover:bg-white/20 transition-colors duration-500 no-collapse"
                          style={{
                            clipPath:
                              "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                          }}
                        >
                          <div
                            className="bg-[#0A0A10] h-full p-6 flex flex-col gap-3 no-collapse"
                            style={{
                              clipPath:
                                "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                            }}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="text-white font-bold text-base mb-1.5 leading-tight">
                                  {addon.name}
                                </h4>
                                <p className="text-[#64647A] text-[13px] leading-relaxed">
                                  {addon.description ?? ""}
                                </p>
                              </div>
                              <span
                                className="shrink-0 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#4ADE80] bg-[#4ADE80]/10 border border-[#4ADE80]/20"
                                style={{
                                  clipPath:
                                    "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
                                }}
                              >
                                All plans
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                              <span className="text-white font-display font-bold text-lg">
                                {formatAddonPrice(addon)}
                              </span>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-[#64647A]">
                                {addon.feature}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
