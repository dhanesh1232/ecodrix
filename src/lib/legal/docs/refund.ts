import {
  RotateCcw,
  Calendar,
  XCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  Mail,
} from "@/components/icons";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const refundDoc: LegalDoc = {
  slug: "refund-policy",
  title: "Refund & Cancellation Policy",
  pill: "Billing & Refunds",
  description:
    "Cancel an ECODrIx plan any time: access runs to the end of the paid period. No refunds for partial periods; refunds only for duplicate or wrong charges.",
  intro: `This policy explains how cancelling and refunds work for paid ${LEGAL.brand} plans. It is part of our Terms of Service.`,
  effectiveDate: "28 October 2026",
  sections: [
    {
      id: "cancellation",
      title: "Cancel Any Time",
      icon: XCircle,
      body: [
        "You can cancel at any time. Cancelling stops the next renewal. Your plan keeps working until the end of the period you have paid for, and then the workspace moves to the Free plan.",
        {
          list: [
            "In the console: open Billing → Plans, choose the Free plan and confirm “Downgrade to Free”.",
            `If your workspace does not show plan choices (plans our team set up for you), email ${LEGAL.emails.billing} and we will cancel it for you.`,
          ],
        },
      ],
    },
    {
      id: "no-partial",
      title: "No Refunds for Partial Periods",
      icon: Calendar,
      body: [
        "We do not refund unused days or months, on monthly or yearly plans. This includes switching to a lower paid plan: that change applies at once, and the unused days on your old plan are not refunded.",
      ],
    },
    {
      id: "refunds",
      title: "When We Refund",
      icon: RotateCcw,
      body: [
        "We refund only:",
        {
          list: [
            "a duplicate charge (you were charged twice for the same thing), or",
            "a wrong charge (an amount we should not have taken).",
          ],
        },
        `Email ${LEGAL.emails.billing} with the Razorpay payment ID from your receipt or from Billing → Payments.`,
      ],
    },
    {
      id: "process",
      title: "How Refunds Are Paid",
      icon: Clock,
      body: [
        "We refund approved amounts through Razorpay, to the payment method you used. The money usually reaches you 5–7 business days after we approve the refund, depending on your bank.",
      ],
    },
    {
      id: "trial",
      title: "Trial and Free Plan",
      icon: Calendar,
      body: [
        "A new workspace gets a 7-day trial of the Growth plan, then moves to the Free plan. We never charge you automatically at the end of the trial, so there is nothing to refund.",
      ],
    },
    {
      id: "whatsapp",
      title: "WhatsApp Charges",
      icon: MessageSquare,
      body: [
        "Meta bills your WhatsApp Business Account directly for WhatsApp conversation charges. We do not collect them, so we cannot refund them; contact Meta about those charges.",
      ],
    },
    {
      id: "chargebacks",
      title: "Chargebacks",
      icon: AlertCircle,
      body: [
        "Please contact us first; most billing problems are quick to fix. If you raise a chargeback without contacting us, we may suspend your account until it is resolved.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      icon: Mail,
      body: [
        `Billing and refund questions: ${LEGAL.emails.billing}, ${LEGAL.supportHours}. We reply ${LEGAL.supportReply}.`,
        `${LEGAL.entity}, ${LEGAL.address}.`,
      ],
    },
  ],
};
