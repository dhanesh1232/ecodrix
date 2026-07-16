import {
  FileText,
  Shield,
  User,
  CreditCard,
  Ban,
  Database,
  Plug,
  AlertTriangle,
  Scale,
  XCircle,
  Gavel,
  RefreshCw,
} from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const termsDoc: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  pill: "Master Service Terms",
  description:
    "The agreement governing your use of the ECODrIx platform — accounts, subscriptions, acceptable use, data ownership, liability, and termination.",
  intro: `These Terms of Service ("Terms") are a binding agreement between you (and the organisation you represent) and ${LEGAL.entity} ("${LEGAL.brand}", "we", "us") governing access to and use of our website, platform, and products (ERIX, LAIE, FLOW, Connect, ErixStore) (the "Service"). By creating an account or using the Service, you agree to these Terms.`,
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: FileText,
      body: [
        "By accessing or using the Service, you confirm you have read, understood, and agree to be bound by these Terms and our Privacy Policy, Acceptable Use Policy, and other referenced policies. If you use the Service on behalf of an organisation, you represent that you are authorised to bind that organisation.",
        "If you do not agree, do not use the Service.",
      ],
    },
    {
      id: "service",
      title: "Description of Service",
      icon: Shield,
      body: [
        "ECODrIx is a unified business platform including a CRM (ERIX), a lead-generation engine (LAIE), automation (FLOW), integrations (Connect), and supporting infrastructure. Features, quotas, and availability depend on your subscription plan.",
        "We may add, modify, or discontinue features. We will give reasonable notice of material adverse changes to paid features.",
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility & Accounts",
      icon: User,
      body: [
        {
          list: [
            "You must be at least 18 years old and able to form a binding contract.",
            "You agree to provide accurate registration information and keep it current.",
            "You are responsible for safeguarding your credentials and all activity under your account.",
            "You must notify us promptly of any unauthorised use at " +
              LEGAL.emails.security +
              ".",
          ],
        },
      ],
    },
    {
      id: "subscriptions",
      title: "Plans, Billing & Taxes",
      icon: CreditCard,
      body: [
        {
          list: [
            "Paid plans are billed in advance on a monthly or annual cycle as shown at checkout and on our Pricing page.",
            "Fees are exclusive of taxes; applicable GST and other taxes are added as required by law.",
            "Subscriptions renew automatically unless cancelled before the renewal date.",
            "Usage beyond plan quotas (e.g., messages, AI calls, storage) may incur add-on charges.",
            "Third-party pass-through costs (such as Meta's WhatsApp message charges) are billed in addition to platform fees.",
          ],
        },
        {
          note: "Cancellations and refunds are governed by our Refund & Cancellation Policy and Pricing Policy.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use",
      icon: Ban,
      body: [
        "You must comply with our Acceptable Use Policy and all applicable laws, including anti-spam, telemarketing, and data-protection laws, and the WhatsApp Business and Meta messaging policies. You are solely responsible for the content you send and the consent basis for contacting recipients.",
      ],
    },
    {
      id: "data",
      title: "Your Data & Ownership",
      icon: Database,
      body: [
        "You retain all rights to the data you upload (“Customer Data”). You grant us a limited licence to host, process, and transmit Customer Data solely to provide and secure the Service.",
        "You are responsible for the legality, accuracy, and appropriateness of Customer Data and for obtaining all necessary consents from your contacts. Our processing of Customer Data is governed by our Data Processing Agreement.",
      ],
    },
    {
      id: "third-party",
      title: "Third-Party Services & Integrations",
      icon: Plug,
      body: [
        "The Service integrates with third parties (e.g., Meta/WhatsApp, Google, payment processors, AI providers). Your use of those services is subject to their terms, and we are not responsible for their acts, omissions, or availability. Disabling a required integration may limit functionality.",
      ],
    },
    {
      id: "beta",
      title: "Early Access / Beta Features",
      icon: AlertTriangle,
      body: [
        'Features labelled "Beta", "Preview", or "Early Access" are provided "as is", may change or be withdrawn, and may contain defects. They are excluded from any SLA and warranties to the fullest extent permitted by law.',
      ],
    },
    {
      id: "warranty",
      title: "Disclaimers & Warranties",
      icon: Scale,
      body: [
        'Except as expressly stated, the Service is provided "as is" and "as available" without warranties of any kind, whether express, implied, or statutory, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant uninterrupted or error-free operation.',
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: Scale,
      body: [
        "To the maximum extent permitted by law, ECODrIx and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or loss of profits, data, goodwill, or business.",
        "Our aggregate liability arising out of or relating to the Service will not exceed the total fees you paid to us in the twelve (12) months preceding the event giving rise to the claim.",
      ],
    },
    {
      id: "indemnity",
      title: "Indemnification",
      icon: Shield,
      body: [
        "You agree to indemnify and hold harmless ECODrIx from claims, damages, and expenses (including reasonable legal fees) arising from your Customer Data, your use of the Service, your violation of these Terms or applicable law, or your infringement of any third-party rights.",
      ],
    },
    {
      id: "termination",
      title: "Suspension & Termination",
      icon: XCircle,
      body: [
        "You may cancel at any time as described in the Refund & Cancellation Policy. We may suspend or terminate access for breach of these Terms, non-payment, or risk to the Service or others.",
        "On termination, your right to use the Service ends. We will make Customer Data available for export for a limited period, after which it may be deleted per our retention practices.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law & Disputes",
      icon: Gavel,
      body: [
        `These Terms are governed by ${LEGAL.governingLaw}. Subject to applicable law, the courts at ${LEGAL.jurisdiction} have exclusive jurisdiction, and the parties will attempt good-faith resolution before initiating proceedings.`,
      ],
    },
    {
      id: "changes",
      title: "Changes to These Terms",
      icon: RefreshCw,
      body: [
        `We may update these Terms. Material changes will be notified via the platform or email. Continued use after the effective date constitutes acceptance. Questions: ${LEGAL.emails.legal}.`,
      ],
    },
  ],
};
