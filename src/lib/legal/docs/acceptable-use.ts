import { AlertOctagon, Ban, Bug, Gauge, MessageSquareWarning, Scale, ShieldAlert, UserX } from "@/components/icons";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const acceptableUseDoc: LegalDoc = {
  slug: "acceptable-use",
  title: "Acceptable Use Policy",
  pill: "Acceptable Use",
  description:
    "The rules for using ECODrIx: content and conduct that is not allowed, anti-spam rules for WhatsApp, email and other channels, and what we do about abuse.",
  intro: `This Acceptable Use Policy ("AUP") sets out what you may and may not do when using ${LEGAL.brand}. It applies to every user and is part of our Terms of Service. Breaking it can lead to suspension or termination.`,
  effectiveDate: "29 October 2026",
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
            "Owned by someone else, where you have no right to use or share it.",
            "Impersonating another person or business, or misleading about who a message is from.",
            "Threatening the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign States, or public order.",
            "Promoting online games that are not permitted under Indian law.",
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
            "Reselling or sublicensing the Service without our written permission.",
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
        "Messages you send through ERIX (WhatsApp, email, website chat, Instagram, Messenger and Telegram) must follow anti-spam law and each platform's policies:",
        {
          list: [
            "Obtain valid opt-in/consent before sending marketing messages; honour opt-outs promptly.",
            "Comply with the WhatsApp Business Messaging Policy and Meta's Commerce and Business policies (see our WhatsApp Messaging Policy).",
            "Do not send unsolicited bulk messages, misleading sender information, or prohibited message categories.",
            "Follow Indian law on unsolicited commercial messages, and the equivalent law in any other country you message.",
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
        "Automations, AI replies, API access and messaging have rate limits that keep the Service stable for everyone. Use that harms the Service for others may be slowed down or suspended.",
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
        "If what you store or send breaks the law, you may also face penalties under the Information Technology Act, 2000 and other Indian law, and where the law requires an offence to be reported, we report it to the authorities.",
      ],
    },
  ],
};
