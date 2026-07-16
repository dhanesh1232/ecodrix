import {
  MessageCircle,
  CheckCircle2,
  Ban,
  BellOff,
  FileText,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const whatsappPolicyDoc: LegalDoc = {
  slug: "whatsapp-policy",
  title: "WhatsApp Messaging Policy",
  pill: "WhatsApp & Meta Compliance",
  description:
    "Rules for using WhatsApp Business messaging through ECODrIx Connect — consent, opt-outs, message categories, and Meta policy compliance.",
  intro: `${LEGAL.brand} provides access to the official Meta WhatsApp Business Cloud API through Connect. When you send WhatsApp messages via our platform, you must comply with this policy, the WhatsApp Business Messaging Policy, Meta's Commerce and Business policies, and applicable law. This protects your number, your recipients, and the platform.`,
  sections: [
    {
      id: "official",
      title: "Official API Only",
      icon: CheckCircle2,
      body: [
        "We use the official Meta WhatsApp Business Cloud API. We do not support or permit unofficial, grey-route, or modified WhatsApp clients. Your WhatsApp Business Account and phone number are subject to Meta's review, quality ratings, and enforcement.",
      ],
    },
    {
      id: "consent",
      title: "Opt-In & Consent",
      icon: MessageCircle,
      body: [
        "You must obtain valid opt-in before messaging a person on WhatsApp, and keep records of consent.",
        {
          list: [
            "Clearly identify your business and state that the person will receive WhatsApp messages.",
            "Collect opt-in through a lawful, unambiguous action (e.g., form, checkbox, or explicit request).",
            "Do not message people who have not opted in or who are outside a valid service window.",
          ],
        },
      ],
    },
    {
      id: "optout",
      title: "Opt-Out & Honouring Requests",
      icon: BellOff,
      body: [
        "You must offer an easy way to opt out and honour opt-out and stop requests promptly. Continuing to message after opt-out violates this policy and Meta's rules.",
      ],
    },
    {
      id: "templates",
      title: "Message Templates & Categories",
      icon: FileText,
      body: [
        "Business-initiated messages require Meta-approved templates in the correct category:",
        {
          list: [
            "Marketing: promotions and offers (requires opt-in; higher scrutiny).",
            "Utility: transaction or account updates related to an existing interaction.",
            "Authentication: one-time passcodes and verification.",
          ],
        },
        "Submitting templates in the wrong category, or including prohibited content, can lead to rejection or account penalties.",
      ],
    },
    {
      id: "prohibited",
      title: "Prohibited Use",
      icon: Ban,
      body: [
        {
          list: [
            "Spam, unsolicited bulk messaging, or purchased/scraped contact lists without consent.",
            "Content prohibited by Meta's Commerce Policy (e.g., illegal products, restricted goods).",
            "Deceptive, fraudulent, or misleading messaging and sender identity.",
            "Harassment, hate speech, or content that endangers others.",
          ],
        },
      ],
    },
    {
      id: "quality",
      title: "Quality Rating & Limits",
      icon: ShieldAlert,
      body: [
        "Meta assigns quality ratings and messaging limits to your number based on recipient feedback (e.g., blocks and reports). Poor quality can reduce your limits or cause restrictions. Send relevant, consented, well-formatted messages to maintain a healthy rating.",
      ],
    },
    {
      id: "responsibility",
      title: "Your Responsibility & Enforcement",
      icon: AlertTriangle,
      body: [
        "You are solely responsible for your messaging content, consent basis, and compliance. Meta's decisions about your number, templates, and account are outside our control.",
        `Violations of this policy may lead to feature suspension or account termination under our Terms and AUP. Questions: ${LEGAL.emails.support}.`,
      ],
    },
  ],
};
