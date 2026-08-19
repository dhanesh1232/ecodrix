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
  formatMoney,
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

type Billing = "monthly" | "yearly";

function priceFor(
  plan: PublicPlan,
  billing: Billing,
): {
  amount: string;
  period: string;
  hint?: string;
} {
  // Custom / contact-sales pricing: no published number (Enterprise).
  if (plan.priceMonthlyUsd == null || plan.priceYearlyUsd == null) {
    return { amount: "Custom", period: "" };
  }
  if (plan.priceMonthlyUsd === 0 && plan.priceYearlyUsd === 0) {
    return {
      amount: formatMoney(0, plan.currency),
      period: "/forever",
    };
  }
  if (billing === "yearly") {
    const monthlyEffective = Math.round(plan.priceYearlyUsd / 12);
    return {
      amount: formatMoney(monthlyEffective, plan.currency),
      period: "/month",
      hint: `Billed ${formatMoney(plan.priceYearlyUsd, plan.currency)} yearly`,
    };
  }
  return {
    amount: formatMoney(plan.priceMonthlyUsd, plan.currency),
    period: "/month",
  };
}

function addonIcon(service: string) {
  switch (service) {
    case "cloud_storage":
      return HardDrive;
    case "ai":
      return Cpu;
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
    sortedPlans.find((p) => (p.priceMonthlyUsd ?? 0) > 0);
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
              className="mx-auto max-w-3xl mb-8 flex items-start gap-3 px-4 py-3 text-[13px] text-warning border border-warning/20 bg-warning/5 rounded-none"
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
            className="inline-flex items-center gap-1 p-1 bg-foreground/5 border border-foreground/10 rounded-full"
            role="tablist"
            aria-label="Billing period"
          >
            <button
              type="button"
              role="tab"
              aria-selected={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors rounded-full ${billing === "monthly"
                ? "bg-accent text-accent-foreground"
                : "text-subtle hover:text-foreground"
                }`}
            >
              Monthly
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={billing === "yearly"}
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 rounded-full ${billing === "yearly"
                ? "bg-accent text-accent-foreground"
                : "text-subtle hover:text-foreground"
                }`}
            >
              Yearly
              {yearlyPct > 0 && (
                <span
                  className={`text-[10px] font-sans px-1.5 py-0.5 ${billing === "yearly"
                    ? "bg-accent-foreground/20 text-accent-foreground"
                    : "bg-success/15 text-success"
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
                  className={`group relative p-px transition-colors duration-500 no-collapse rounded-none ${popular
                    ? "bg-linear-to-br from-brand-purple/50 to-accent/50"
                    : "bg-foreground/10 hover:bg-foreground/20"
                    }`}
                >
                  {popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground z-20 rounded-full bg-[var(--tag-bg)]"
                      style={{ "--tag-bg": style.color } as React.CSSProperties}
                    >
                      Most Popular
                    </div>
                  )}
                  <div className="bg-surface h-full p-7 relative overflow-hidden flex flex-col no-collapse rounded-none">
                    {popular && (
                      <div
                        className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 blur-[60px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"
                        aria-hidden="true"
                      />
                    )}

                    <div className="mb-6 relative z-10 no-collapse">
                      <h3
                        className={`font-sans text-[11px] font-bold uppercase tracking-widest mb-4 ${style.colorClass}`}
                      >
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-display font-black text-foreground tracking-tighter">
                          {amount}
                        </span>
                        {period && (
                          <span className="text-muted-foreground text-sm">
                            {period}
                          </span>
                        )}
                      </div>
                      {hint && (
                        <p className="text-[11px] text-success font-sans mb-2">
                          {hint}
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm leading-relaxed min-h-[44px]">
                        {planDescription(plan.slug)}
                      </p>
                    </div>

                    <div className="h-px bg-foreground/5 mb-6 w-full" />

                    <ul className="space-y-3 relative z-10 flex-1 mb-8 no-collapse">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 rounded-none ${style.bgClass}`}
                          >
                            <Check size={12} className={style.colorClass} />
                          </div>
                          <span className="text-muted-foreground text-[13px] leading-snug">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={planCtaHref(plan.slug)}
                      className={`w-full py-4 px-6 rounded-none font-bold uppercase tracking-widest text-[12px] transition-all duration-300 flex items-center justify-center gap-2 group/btn relative z-10 ${popular
                        ? "bg-accent text-accent-foreground hover:bg-accent-hover"
                        : "bg-surface text-foreground border border-border-strong hover:bg-accent hover:text-accent-foreground hover:border-accent"
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
            <div className="mt-8 p-px bg-foreground/10 hover:bg-foreground/20 transition-colors duration-300 rounded-none">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-8 py-7 bg-surface rounded-none">
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
                    Enterprise / Custom
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                    {planDescription("enterprise")} Dedicated account manager,
                    99.99% SLA, on-prem deployment, and custom contracts.
                  </p>
                </div>
                <a
                  href={planCtaHref("enterprise")}
                  className="group shrink-0 flex items-center gap-2 px-7 py-4 rounded-none font-bold uppercase tracking-widest text-[12px] text-foreground border border-border-strong transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
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
        <section className="py-24 px-6 border-t border-foreground/5">
          <div className="wrapper">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="pill mb-5 mx-auto bg-brand-purple/5 text-brand-purple border-brand-purple/20">
                Add-Ons
              </div>
              <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] text-foreground font-display font-black tracking-tight leading-[1.05] mb-4">
                Stack on top of any{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-brand-purple">
                  plan.
                </span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
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
                      <div className="w-9 h-9 flex items-center justify-center bg-accent/10 rounded-none">
                        <Icon size={16} className="text-accent" />
                      </div>
                      <h3 className="font-sans text-[12px] font-bold uppercase tracking-widest text-foreground">
                        {group.label}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {group.items.map((addon) => (
                        <div
                          key={addon.slug}
                          className="group relative p-px bg-foreground/10 hover:bg-foreground/20 transition-colors duration-500 no-collapse rounded-none"
                        >
                          <div className="bg-surface h-full p-6 flex flex-col gap-3 no-collapse rounded-">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="text-foreground font-bold text-base mb-1.5 leading-tight">
                                  {addon.name}
                                </h4>
                                <p className="text-muted-foreground text-[13px] leading-relaxed">
                                  {addon.description ?? ""}
                                </p>
                              </div>
                              <span className="shrink-0 px-2 py-0.5 text-[9px] font-sans font-bold uppercase tracking-widest text-success bg-success/10 border border-success/20 rounded-none">
                                All plans
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-3 border-t border-foreground/5">
                              <span className="text-foreground font-display font-bold text-lg">
                                {formatAddonPrice(addon)}
                              </span>
                              <span className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground">
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
