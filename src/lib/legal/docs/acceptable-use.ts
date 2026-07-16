import {
  ShieldAlert,
  Ban,
  MessageSquareWarning,
  Bug,
  Scale,
  UserX,
  Gauge,
  AlertOctagon,
} from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const acceptableUseDoc: LegalDoc = {
  slug: "acceptable-use",
  title: "Acceptable Use Policy",
  pill: "Acceptable Use",
  description:
    "The rules for using ECODrIx responsibly — prohibited content and conduct, anti-spam and messaging compliance, and enforcement.",
  intro: `This Acceptable Use Policy ("AUP") sets out what you may and may not do when using ${LEGAL.brand}. It applies to all users and forms part of our Terms of Service. Violations may lead to suspension or termination.`,
  sections: [
    {
      id: "responsibility",
      title: "Your Responsibility",
      icon: Scale,
      body: [
        "You are responsible for all activity in your account and for ensuring your team, content, and contact lists comply with this AUP and applicable law. You must have a lawful basis and, where required, consent to contact the people you message or email through the platform.",
      ],
    },
    {
      id: "prohibited-content",
      title: "Prohibited Content",
      icon: Ban,
      body: [
        "You must not use the Service to store, send, or promote content that is:",
        {
          list: [
            "Unlawful, defamatory, obscene, or that sexualises or endangers minors.",
            "Hateful, harassing, or that incites violence or discrimination.",
            "Fraudulent, deceptive, or promoting scams, pyramid/Ponzi schemes, or illegal goods.",
            "Infringing on intellectual property, privacy, or publicity rights.",
            "Malware, phishing, or otherwise harmful code or links.",
          ],
        },
      ],
    },
    {
      id: "prohibited-conduct",
      title: "Prohibited Conduct",
      icon: UserX,
      body: [
        {
          list: [
            "Attempting to access accounts, data, or systems without authorisation.",
            "Reverse engineering, scraping, or circumventing security or rate limits of the Service.",
            "Reselling or sublicensing the Service except as expressly permitted (e.g., approved white-label).",
            "Interfering with or disrupting the integrity or performance of the Service.",
            "Using the Service to build a competing product by copying our software.",
          ],
        },
      ],
    },
    {
      id: "messaging",
      title: "Anti-Spam & Messaging Compliance",
      icon: MessageSquareWarning,
      body: [
        "Messaging (WhatsApp, email, SMS) must follow anti-spam laws and platform policies:",
        {
          list: [
            "Obtain valid opt-in/consent before sending marketing messages; honour opt-outs promptly.",
            "Comply with the WhatsApp Business Messaging Policy and Meta's Commerce and Business policies (see our WhatsApp Messaging Policy).",
            "Do not send unsolicited bulk messages, misleading sender information, or prohibited message categories.",
            "Respect applicable telemarketing and DND/TRAI regulations in India and equivalent laws elsewhere.",
          ],
        },
        {
          note: "Repeated policy violations can cause Meta to restrict or ban your WhatsApp number — a consequence outside our control.",
        },
      ],
    },
    {
      id: "data-protection",
      title: "Data Protection Obligations",
      icon: ShieldAlert,
      body: [
        "You must handle personal data you upload lawfully, including providing required notices to and obtaining consents from your contacts, and honouring their data-protection rights. Do not upload sensitive personal data unless permitted and adequately safeguarded.",
      ],
    },
    {
      id: "fair-use",
      title: "Fair Use & System Integrity",
      icon: Gauge,
      body: [
        "Automated features, API access, and messaging are subject to fair-use limits and rate limits to protect platform stability. Excessive or abusive usage that degrades the Service for others may be throttled or suspended.",
      ],
    },
    {
      id: "security-research",
      title: "Security & Vulnerability Reporting",
      icon: Bug,
      body: [
        `We welcome responsible disclosure. Report suspected vulnerabilities to ${LEGAL.emails.security}. Do not access data that is not yours, disrupt the Service, or exfiltrate data while testing.`,
      ],
    },
    {
      id: "enforcement",
      title: "Reporting & Enforcement",
      icon: AlertOctagon,
      body: [
        `Report abuse to ${LEGAL.emails.abuse}. We may investigate suspected violations and, at our discretion, remove content, throttle, suspend, or terminate accounts, and cooperate with law enforcement. Serious violations may result in immediate termination without refund.`,
      ],
    },
  ],
};
