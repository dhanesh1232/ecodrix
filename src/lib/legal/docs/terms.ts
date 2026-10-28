import {
  FileText,
  Shield,
  User,
  CreditCard,
  Ban,
  Database,
  Bot,
  Plug,
  AlertTriangle,
  Scale,
  XCircle,
  Gavel,
  RefreshCw,
} from "@/components/icons";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const termsDoc: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  pill: "Master Service Terms",
  description:
    "The agreement for using ECODrIx: accounts, trial and plans, payment, your data, AI agents, liability, ending the service, and Indian law and courts.",
  intro: `These Terms of Service ("Terms") are an agreement between you (and the business you sign up for) and ${LEGAL.entity} ("${LEGAL.brand}", "we", "us"). They cover ecodrix.com, the ERIX console and our products, ERIX and LAIE (together, the "Service").`,
  effectiveDate: "28 October 2026",
  sections: [
    {
      id: "acceptance",
      title: "Accepting These Terms",
      icon: FileText,
      body: [
        "You accept these Terms when you create an account. They include our Privacy Policy, Acceptable Use Policy, WhatsApp Messaging Policy, Refund & Cancellation Policy, Pricing Policy and Data Processing Agreement. If you sign up for a business, you confirm you are allowed to bind it.",
        "If you do not agree, do not use the Service.",
      ],
    },
    {
      id: "service",
      title: "What the Service Is",
      icon: Shield,
      body: [
        {
          list: [
            "ERIX: a CRM, Connect messaging (WhatsApp, email and website chat, plus Instagram, Messenger and Telegram when you connect them), Flow automations and AI agents.",
            "LAIE: lead discovery from public sources such as search engines, business directories and Google Places. LAIE is by invitation only.",
          ],
        },
        "What your plan includes is shown in the console, or in the written offer we send you. We may change features; we will give reasonable notice before removing a paid feature you use.",
      ],
    },
    {
      id: "eligibility",
      title: "Your Account",
      icon: User,
      body: [
        {
          list: [
            "You must be at least 18 years old.",
            "Give accurate details when you sign up and keep them up to date.",
            "Keep your sign-in details safe. You are responsible for what happens in your account.",
            `Tell us at once about any use of your account you did not allow: ${LEGAL.emails.security}.`,
          ],
        },
      ],
    },
    {
      id: "subscriptions",
      title: "Trial, Plans and Payment",
      icon: CreditCard,
      body: [
        {
          list: [
            "A new workspace gets a 7-day trial of the Growth plan. When it ends, the workspace moves to the Free plan. We never charge you automatically at the end of a trial.",
            "We have not published prices yet. If you are a pilot customer, we send you your price in writing before you pay.",
            "Prices are in Indian rupees (INR), plus 18% GST. You pay through Razorpay, monthly or yearly; a yearly plan costs 10 times the monthly price.",
            "Paid plans renew automatically until you cancel.",
            "There is no proration. An upgrade starts at once and you pay the new plan's full price.",
            "Meta bills your WhatsApp Business Account directly for WhatsApp conversation charges. We do not resell or mark up Meta's charges.",
          ],
        },
        {
          note: "Cancelling, downgrading and refunds are covered by our Refund & Cancellation Policy and Pricing Policy.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use",
      icon: Ban,
      body: [
        "Follow our Acceptable Use Policy, our WhatsApp Messaging Policy, Meta's WhatsApp Business policies and the law, including anti-spam and data protection law. You are responsible for what you send and for having the right to contact the people you message.",
      ],
    },
    {
      id: "data",
      title: "Your Data",
      icon: Database,
      body: [
        "You own the data you put into the Service (“Customer Data”). You give us a limited licence to store, process and send it only to provide and secure the Service. Our Data Processing Agreement covers how we handle it.",
        "You are responsible for Customer Data being lawful and accurate, and for getting the consents you need from your contacts.",
        "Export your data before you delete a workspace: an owner or admin can download it from Settings → Workspace → Danger zone. A deleted workspace can be restored on request within 30 days; after that it is erased for good.",
      ],
    },
    {
      id: "ai",
      title: "AI Agents and AI Output",
      icon: Bot,
      body: [
        "AI can be wrong. You are responsible for everything your workspace sends, including replies an AI agent sends for you. Auto-reply is off until you turn it on; while it is off, every AI reply waits in the inbox for a person to approve, edit or dismiss.",
        "Your team can reply in any conversation from the inbox. An AI agent also hands a conversation to your team, and stops replying there for 24 hours, when the customer asks for a person or it cannot help.",
      ],
    },
    {
      id: "third-party",
      title: "Other Companies' Services",
      icon: Plug,
      body: [
        "The Service works with other companies' services, such as Meta (WhatsApp, Instagram, Messenger), Google, Telegram, Razorpay and our AI providers. Their own terms apply to your use of them. We are not responsible for what they do or for their availability, and Meta alone decides about your WhatsApp number, templates and account.",
      ],
    },
    {
      id: "beta",
      title: "Beta Features",
      icon: AlertTriangle,
      body: [
        'Features marked "Beta", "Preview" or "Early access" are provided "as is". They may change, contain faults or be withdrawn.',
      ],
    },
    {
      id: "warranty",
      title: "No Warranties",
      icon: Scale,
      body: [
        'Except where these Terms say otherwise, the Service is provided "as is" and "as available", without warranties of any kind, to the extent the law allows. We do not promise that it will run without interruption or errors.',
        `We do not offer an uptime commitment or service credits on any plan. Live status and past incidents are at ${LEGAL.domain}/status.`,
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: Scale,
      body: [
        "To the extent the law allows, we are not liable for indirect, incidental, special, consequential or punitive losses, or for loss of profit, data, goodwill or business.",
        "Our total liability for anything arising from the Service is limited to the fees you paid us in the 12 months before the event that led to the claim.",
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      icon: Shield,
      body: [
        "You will compensate us for claims, losses and costs (including reasonable legal fees) arising from your Customer Data, your use of the Service, your breach of these Terms or the law, or your infringement of anyone else's rights.",
      ],
    },
    {
      id: "termination",
      title: "Ending the Service",
      icon: XCircle,
      body: [
        "You can stop at any time: cancel your paid plan as described in the Refund & Cancellation Policy, or delete your workspace.",
        "We may suspend or end your access if you break these Terms, do not pay, or put the Service or other people at risk.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      icon: Gavel,
      body: [
        `These Terms are governed by ${LEGAL.governingLaw}. The courts at ${LEGAL.jurisdiction} have exclusive jurisdiction. Before going to court, both sides will first try in good faith to settle the dispute.`,
      ],
    },
    {
      id: "changes",
      title: "Changes to These Terms",
      icon: RefreshCw,
      body: [
        `We may update these Terms. We will tell you about important changes in the console or by email before they apply. If you keep using the Service after a change applies, the new Terms apply to you. Questions: ${LEGAL.emails.legal}.`,
      ],
    },
  ],
};
