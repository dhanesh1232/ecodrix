import {
  Tag,
  IndianRupee,
  Percent,
  Zap,
  MessageSquare,
  ArrowUpDown,
  Receipt,
  RefreshCw,
} from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const pricingPolicyDoc: LegalDoc = {
  slug: "pricing-policy",
  title: "Pricing Policy",
  pill: "Pricing & Charges",
  description:
    "How ECODrIx pricing works — plans, currency, taxes, usage-based add-ons, WhatsApp message pass-through charges, and price changes.",
  intro: `This Pricing Policy explains how ${LEGAL.brand} prices its plans and charges, so there are no surprises. Current prices are always shown on our Pricing page and at checkout; this policy explains the rules behind them.`,
  sections: [
    {
      id: "plans",
      title: "Plans & What's Included",
      icon: Tag,
      body: [
        "We offer tiered plans (including a free tier) with defined quotas across products — contacts, agents, WhatsApp messages, AI calls, automation runs, storage, and more. The exact inclusions for each plan are listed on the Pricing page.",
        {
          note: "Because features and quotas evolve, the Pricing page and checkout are the authoritative source for current inclusions and prices.",
        },
      ],
    },
    {
      id: "currency",
      title: "Currency & Regional Pricing",
      icon: IndianRupee,
      body: [
        "Prices may be displayed in Indian Rupees (INR) or US Dollars (USD) depending on your region and the plan. The currency and amount you will be charged are confirmed at checkout before payment.",
      ],
    },
    {
      id: "taxes",
      title: "Taxes (GST)",
      icon: Receipt,
      body: [
        "Listed prices are exclusive of taxes unless stated otherwise. Applicable Goods and Services Tax (GST) and any other statutory taxes are calculated and added at checkout based on your billing location. A GST-compliant invoice is issued for each payment where applicable.",
      ],
    },
    {
      id: "usage",
      title: "Usage-Based Add-Ons",
      icon: Zap,
      body: [
        "Some resources are metered. If you exceed your plan's included quota, add-on usage may be charged (for example, additional AI calls, storage, bandwidth, or messages).",
        {
          list: [
            "Metered usage is measured by the platform and shown in your billing dashboard.",
            "You can set plan limits or upgrade to a higher tier to change your included quotas.",
          ],
        },
      ],
    },
    {
      id: "whatsapp",
      title: "WhatsApp / Third-Party Pass-Through Charges",
      icon: MessageSquare,
      body: [
        "Sending on the WhatsApp Business API incurs Meta's per-message charges, which are separate from and additional to your ECODrIx plan fee.",
        {
          list: [
            "Since 2025, Meta bills per message by category (marketing, utility, authentication) and region. In India, service replies are generally free within the allowed window.",
            "These charges are set by Meta, passed through to you, and consumed on send — they are non-refundable.",
            "Other third-party costs (e.g., email sending, certain AI providers) may also be passed through where applicable.",
          ],
        },
      ],
    },
    {
      id: "upgrades",
      title: "Upgrades, Downgrades & Proration",
      icon: ArrowUpDown,
      body: [
        {
          list: [
            "Upgrades take effect immediately; we may prorate the difference for the remainder of the current cycle.",
            "Downgrades typically take effect at the next renewal, and reduced quotas apply from then.",
            "Downgrading may cause loss of access to features or data that exceed the lower plan's limits — export first if needed.",
          ],
        },
      ],
    },
    {
      id: "discounts",
      title: "Discounts, Trials & Promotions",
      icon: Percent,
      body: [
        "We may offer trials, annual discounts, or promotional pricing. Promotions are subject to their stated terms and eligibility, cannot be combined unless stated, and may be withdrawn or changed at any time.",
      ],
    },
    {
      id: "changes",
      title: "Price Changes",
      icon: RefreshCw,
      body: [
        "We may change prices. For existing paid subscriptions, we will give reasonable advance notice (via the platform or email) before a price change applies to your next renewal. You can cancel before the change takes effect if you do not accept it.",
        `Questions about pricing or invoices: ${LEGAL.emails.billing}.`,
      ],
    },
  ],
};
