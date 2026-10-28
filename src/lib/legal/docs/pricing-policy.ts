import {
  Tag,
  IndianRupee,
  CreditCard,
  Calendar,
  Zap,
  MessageSquare,
  ArrowUpDown,
  RefreshCw,
} from "@/components/icons";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const pricingPolicyDoc: LegalDoc = {
  slug: "pricing-policy",
  title: "Pricing Policy",
  pill: "Pricing & Charges",
  description:
    "How ECODrIx charges: prices in writing for pilots, INR plus 18% GST, monthly or yearly through Razorpay, trial, credits, plan changes and WhatsApp charges.",
  intro: `This Pricing Policy explains the rules behind what ${LEGAL.brand} charges, so there are no surprises.`,
  effectiveDate: "28 October 2026",
  sections: [
    {
      id: "plans",
      title: "Prices",
      icon: Tag,
      body: [
        "We have not published prices yet. If you are a pilot customer, we send you your plan and price in writing before you pay.",
        "What your plan includes is shown in the console under Billing.",
      ],
    },
    {
      id: "currency",
      title: "INR and GST",
      icon: IndianRupee,
      body: [
        "All prices are in Indian rupees (INR). 18% GST is added on top.",
        "Every payment gets a GST invoice (numbered ERIX/YY-YY/NNNNN, SAC 998315), which you can download from Billing → Payments in the console.",
      ],
    },
    {
      id: "billing",
      title: "Billing Cycles",
      icon: CreditCard,
      body: [
        {
          list: [
            "You pay through Razorpay, monthly or yearly.",
            "A yearly plan costs 10 times the monthly price.",
            "Plans renew automatically until you cancel (see our Refund & Cancellation Policy).",
          ],
        },
      ],
    },
    {
      id: "trial",
      title: "Trial",
      icon: Calendar,
      body: [
        "A new workspace gets a 7-day trial of the Growth plan. When it ends, the workspace moves to the Free plan. We never charge you automatically at the end of a trial.",
      ],
    },
    {
      id: "usage",
      title: "Allowances and Credits",
      icon: Zap,
      body: [
        "Each plan comes with monthly allowances, for example AI replies. If your plan allows it, use beyond an allowance is paid from credits you buy in advance under Billing → Credits. Otherwise that use stops until the allowance resets or you upgrade.",
        "Credits are priced in INR, plus 18% GST, and you see the price before you pay.",
      ],
    },
    {
      id: "whatsapp",
      title: "WhatsApp Charges",
      icon: MessageSquare,
      body: [
        "Sending on the WhatsApp Business API costs money, charged by Meta, not by us.",
        {
          list: [
            "Meta charges per message, by category (marketing, utility, authentication) and by the recipient's country. In India, service replies within the customer service window are generally free.",
            "Meta bills these charges directly to your workspace's WhatsApp Business Account. They are not part of your ERIX bill, and we do not resell or mark them up.",
          ],
        },
      ],
    },
    {
      id: "upgrades",
      title: "Upgrades and Downgrades",
      icon: ArrowUpDown,
      body: [
        {
          list: [
            "Upgrade: the new plan starts at once and you pay its full price. There is no proration.",
            "Downgrade to Free: applies at the end of your paid period. You keep your current plan until then.",
            "Switch to a lower paid plan: applies at once, when you pay for the new plan. Unused days on your old plan are not refunded.",
          ],
        },
      ],
    },
    {
      id: "changes",
      title: "Price Changes",
      icon: RefreshCw,
      body: [
        "If we change the price of a plan you pay for, we will tell you by email before your next renewal at the new price. You can cancel before the change applies.",
        `Questions about prices or invoices: ${LEGAL.emails.billing}.`,
      ],
    },
  ],
};
