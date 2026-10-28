import { Package, Zap, Receipt, LifeBuoy } from "@/components/icons";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const shippingDoc: LegalDoc = {
  slug: "shipping-and-delivery",
  title: "Shipping and Delivery Policy",
  pill: "Delivery",
  description:
    "ERIX is an online service, so nothing is shipped. This explains when your access starts, where to get your GST invoice, and what to do if access does not start.",
  intro: `This policy explains how ${LEGAL.brand} delivers what you buy.`,
  effectiveDate: "28 October 2026",
  sections: [
    {
      id: "digital",
      title: "Nothing Is Shipped",
      icon: Package,
      body: [
        "ERIX and LAIE are online software services that you use in your browser. We do not ship physical goods, so there are no shipping charges and no delivery address.",
      ],
    },
    {
      id: "access",
      title: "When Access Starts",
      icon: Zap,
      body: [
        {
          list: [
            "Free plan and trial: as soon as your workspace is created.",
            "Paid plan or credits: as soon as Razorpay confirms your payment.",
          ],
        },
      ],
    },
    {
      id: "invoices",
      title: "Invoices",
      icon: Receipt,
      body: [
        "Every payment gets a GST invoice, which you can download from Billing → Payments in the console.",
      ],
    },
    {
      id: "problems",
      title: "If Access Does Not Start",
      icon: LifeBuoy,
      body: [
        `If you paid and your plan or credits have not changed, email ${LEGAL.emails.billing} with the Razorpay payment ID. For anything else, email ${LEGAL.emails.support}. We are available ${LEGAL.supportHours} and reply ${LEGAL.supportReply}.`,
      ],
    },
  ],
};
