import { Server, Bell, Info } from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const subprocessorsDoc: LegalDoc = {
  slug: "subprocessors",
  title: "Sub-Processors",
  pill: "Sub-Processors",
  description:
    "The third-party service providers ECODrIx uses to process personal data when delivering the platform, and what each is used for.",
  intro: `To provide the ${LEGAL.brand} platform, we engage the third-party sub-processors below. Each is bound by data-protection terms consistent with our Data Processing Agreement. This list is maintained in good faith and may change as our infrastructure evolves.`,
  sections: [
    {
      id: "list",
      title: "Current Sub-Processors",
      icon: Server,
      body: [
        {
          note: "Verify and finalise this list against your actual production vendors before publishing. Add each provider's data-region and DPA link where available.",
        },
        {
          table: {
            headers: ["Sub-processor", "Purpose", "Region"],
            rows: [
              [
                "Amazon Web Services (AWS)",
                "Cloud hosting, compute, and email delivery (SES)",
                "Global / India",
              ],
              [
                "Cloudflare",
                "CDN, object storage (R2), edge security",
                "Global",
              ],
              [
                "Meta Platforms",
                "WhatsApp Business Cloud API messaging",
                "Global",
              ],
              [
                "Google (Cloud / Vertex AI)",
                "AI features, Calendar/Meet, analytics",
                "Global",
              ],
              [
                "Anthropic (via Vertex AI)",
                "AI outreach and assistance (Claude)",
                "Global",
              ],
              [
                "MongoDB Atlas",
                "Managed database (tenant data)",
                "India / Global",
              ],
              ["Razorpay / Stripe", "Payment processing", "India / Global"],
            ],
          },
        },
      ],
    },
    {
      id: "purpose",
      title: "How We Vet Sub-Processors",
      icon: Info,
      body: [
        "We select providers with recognised security and compliance practices, and we limit the data shared to what each provider needs to deliver its function. Payment card details are handled directly by PCI-DSS-compliant payment processors and are not stored on our servers.",
      ],
    },
    {
      id: "changes",
      title: "Notification of Changes",
      icon: Bell,
      body: [
        `We may add or replace sub-processors as the platform evolves. Where required by our DPA, we will provide notice of material changes so customers can object on reasonable grounds. To subscribe to change notifications, contact ${LEGAL.emails.legal}.`,
      ],
    },
  ],
};
