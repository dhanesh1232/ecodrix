import {
  RotateCcw,
  Calendar,
  XCircle,
  CreditCard,
  Clock,
  AlertCircle,
  Mail,
} from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const refundDoc: LegalDoc = {
  slug: "refund-policy",
  title: "Refund & Cancellation Policy",
  pill: "Billing & Refunds",
  description:
    "How subscription cancellations, refunds, free trials, and prorations work at ECODrIx — including non-refundable third-party message charges.",
  intro: `This Refund & Cancellation Policy explains how billing, cancellations, and refunds work for paid ${LEGAL.brand} subscriptions. It forms part of our Terms of Service.`,
  sections: [
    {
      id: "trial",
      title: "Free Trial & Free Plan",
      icon: Calendar,
      body: [
        "We offer a free plan and/or a time-limited free trial so you can evaluate the platform before paying. No charges apply during a free trial unless you upgrade or exceed free quotas that require a paid add-on.",
        "If you do not upgrade, your account moves to the free plan or is paused at the end of the trial — you are not charged automatically without a selected paid plan.",
      ],
    },
    {
      id: "billing",
      title: "Billing Cycles",
      icon: CreditCard,
      body: [
        {
          list: [
            "Monthly plans are billed each month on your signup date.",
            "Annual plans are billed once for the year, typically at a discount versus monthly.",
            "Subscriptions renew automatically until cancelled.",
            "All fees are exclusive of applicable taxes (e.g., GST), which are added at checkout.",
          ],
        },
      ],
    },
    {
      id: "cancellation",
      title: "How to Cancel",
      icon: XCircle,
      body: [
        `You can cancel anytime from your account billing settings, or by emailing ${LEGAL.emails.billing}.`,
        {
          list: [
            "Cancellation stops the next renewal; your plan stays active until the end of the current paid period.",
            "After the period ends, your account moves to the free plan or is deactivated, and premium features stop.",
            "You are responsible for exporting your data before deactivation (see Terms and DPA).",
          ],
        },
      ],
    },
    {
      id: "refunds",
      title: "Refund Eligibility",
      icon: RotateCcw,
      body: [
        { subheading: "Monthly plans" },
        "Monthly fees are generally non-refundable once a billing period has started, as you retain access for the full period.",
        { subheading: "Annual plans" },
        "Annual plans may be eligible for a prorated refund of unused full months if you cancel due to a material, unresolved fault in the Service, at our reasonable discretion.",
        { subheading: "Discretionary refunds" },
        "We may grant refunds in cases of accidental duplicate charges, proven billing errors, or where required by law.",
      ],
    },
    {
      id: "non-refundable",
      title: "Non-Refundable Items",
      icon: AlertCircle,
      body: [
        {
          list: [
            "Third-party pass-through charges already incurred — notably Meta's WhatsApp per-message charges, which are consumed on send and cannot be reversed.",
            "One-time setup, onboarding, or professional-services fees, once work has begun.",
            "Add-on usage (AI calls, storage, messages) already consumed.",
            "Amounts for periods already elapsed on monthly plans.",
          ],
        },
      ],
    },
    {
      id: "process",
      title: "Refund Process & Timelines",
      icon: Clock,
      body: [
        `To request a refund, email ${LEGAL.emails.billing} with your account details and reason. We aim to respond within 5 business days.`,
        "Approved refunds are returned to the original payment method via our payment processor. Depending on your bank or provider, it may take 5–10 business days to reflect.",
      ],
    },
    {
      id: "chargebacks",
      title: "Chargebacks",
      icon: AlertCircle,
      body: [
        "Please contact us first — most issues are resolved quickly. Initiating a chargeback without contacting us may result in suspension of your account pending resolution.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      icon: Mail,
      body: [
        `Billing and refund queries: ${LEGAL.emails.billing}. ${LEGAL.entity}, ${LEGAL.registeredAddress}.`,
      ],
    },
  ],
};
