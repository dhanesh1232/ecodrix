"use client";

/**
 * Plan cards with a monthly / yearly switch. Plans come from the server page
 * (live API, static fallback). Prices are GST-exclusive (founder decision):
 * every paid price says "+ 18% GST". The AI agent is on every plan, so no
 * card is singled out for AI; Growth is the recommended plan and the one
 * every new workspace trials for 7 days.
 */

import { Icon } from "@/components/icons";
import { useState } from "react";
import {
  type PublicPlan,
  formatMoney,
  humaniseFeatures,
  planCtaHref,
  planCtaLabel,
  planDescription,
  yearlyDiscountPct,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

function priceFor(plan: PublicPlan, billing: Billing) {
  if (plan.priceMonthlyUsd == null || plan.priceYearlyUsd == null) return null;
  if (plan.priceMonthlyUsd === 0) return { amount: formatMoney(0, plan.currency), note: "Free, always" };
  if (billing === "yearly") {
    return {
      amount: formatMoney(Math.round(plan.priceYearlyUsd / 12), plan.currency),
      note: `a month, billed ${formatMoney(plan.priceYearlyUsd, plan.currency)} a year`,
    };
  }
  return { amount: formatMoney(plan.priceMonthlyUsd, plan.currency), note: "a month" };
}

export default function PricingPlansSection({
  plans,
  usedFallback,
}: {
  plans: PublicPlan[];
  /** True when the API was unreachable and the static snapshot is in use. */
  usedFallback?: boolean;
}) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const sorted = [...plans].sort((a, b) => a.tier - b.tier);
  const enterprise = sorted.find((p) => p.slug === "enterprise");
  const grid = sorted.filter((p) => p.slug !== "enterprise");
  const ref = sorted.find((p) => (p.priceMonthlyUsd ?? 0) > 0);
  const yearlyPct = ref ? yearlyDiscountPct(ref.priceMonthlyUsd, ref.priceYearlyUsd) : 0;

  return (
    <section aria-label="Plans" className="erix-mk-section pt-10! md:pt-12!">
      <div className="wrapper">
        {usedFallback && (
          <p role="status" className="mx-auto mb-8 flex max-w-3xl items-start gap-3 rounded-[12px] bg-sunken px-4 py-3 text-sm text-foreground">
            <Icon name="info" size={16} variant="solid" className="mt-0.5 shrink-0 text-warning" />
            Live prices couldn&apos;t load, so these are from a recent snapshot. Refresh in a moment for the latest.
          </p>
        )}

        {/* Billing period: native radios drawn as the DS segmented control */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <fieldset className="erix-seg">
            <legend className="sr-only">Billing period</legend>
            {(["monthly", "yearly"] as const).map((b) => (
              <label key={b} className="erix-seg__item">
                <input
                  type="radio"
                  name="billing"
                  value={b}
                  checked={billing === b}
                  onChange={() => setBilling(b)}
                  className="sr-only"
                />
                {b === "monthly" ? "Monthly" : "Yearly"}
              </label>
            ))}
          </fieldset>
          {yearlyPct > 0 && (
            <span className="rounded-[6px] bg-ai-subtle px-2.5 py-0.5 text-[12.5px] font-semibold text-ai">
              Save {yearlyPct}% yearly
            </span>
          )}
        </div>
        <p className="mt-5 text-center text-[15px] font-semibold text-foreground">
          Every new workspace starts with 7 days of Growth.
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
          {grid.map((plan) => {
            const price = priceFor(plan, billing);
            const featured = plan.slug === "growth";
            return (
              <li key={plan.slug} className={cn("erix-mk-plan", featured && "erix-mk-plan--featured")}>
                {featured && <span className="erix-mk-plan__flag">Recommended</span>}
                <h2 className="font-display text-xl font-bold text-foreground">{plan.name}</h2>
                <p className="-mt-2 min-h-10 text-sm text-muted-foreground">{planDescription(plan.slug)}</p>
                {price && (
                  <div>
                    <p className="text-[40px] leading-none font-bold tracking-[-0.035em] text-foreground tabular-nums">
                      {price.amount}
                    </p>
                    <p className="mt-2 text-sm text-subtle">{price.note}</p>
                    {plan.priceMonthlyUsd ? (
                      <p
                        className={cn(
                          "mt-2 w-fit rounded-[6px] px-2 py-0.5 text-[12px] font-semibold",
                          featured ? "bg-white/15 text-white" : "bg-accent-muted text-accent",
                        )}
                      >
                        + 18% GST
                      </p>
                    ) : null}
                  </div>
                )}
                <a href={planCtaHref(plan.slug)} className={cn("group w-full", featured ? "btn-primary" : "btn-ghost")}>
                  {planCtaLabel(plan.slug)}
                  <Icon name="arrow-right" size={16} variant="line" />
                </a>
                <ul className="space-y-2.5 border-t border-border-soft pt-5">
                  {humaniseFeatures(plan).map((f) => (
                    <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-foreground">
                      <Icon
                        name="check"
                        size={15}
                        strokeWidth={2.2}
                        variant="line"
                        className={cn("mt-0.5 shrink-0", featured ? "text-white" : "text-accent")}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        {enterprise && (
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[20px] bg-surface p-6 shadow-[var(--shadow-card)] md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{enterprise.name}</h2>
              <p className="mt-1 text-muted-foreground">{planDescription("enterprise")} Priced with you.</p>
            </div>
            <a href={planCtaHref("enterprise")} className="btn-ghost group shrink-0">
              {planCtaLabel("enterprise")}
              <Icon name="arrow-right" size={16} variant="line" />
            </a>
          </div>
        )}
        <p className="mx-auto mt-8 max-w-[64ch] text-center text-[13.5px] text-subtle">
          Prices exclude 18% GST, which is added on your invoice. WhatsApp messages go out on your own WhatsApp account,
          so Meta bills you directly and ERIX adds no markup.
        </p>
      </div>
    </section>
  );
}
