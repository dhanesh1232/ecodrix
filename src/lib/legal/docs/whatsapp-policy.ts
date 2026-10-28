import {
  AlertTriangle,
  Ban,
  BellOff,
  Bot,
  CheckCircle2,
  Clock,
  FileText,
  MessageCircle,
  ShieldAlert,
  UserCheck,
} from "@/components/icons";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const whatsappPolicyDoc: LegalDoc = {
  slug: "whatsapp-policy",
  title: "WhatsApp Messaging Policy",
  pill: "WhatsApp & Meta Compliance",
  description:
    "Rules for WhatsApp through ERIX Connect: your own WhatsApp Business Account, opt-in, STOP and START, the 24-hour window, templates and AI agents.",
  intro: `${LEGAL.brand} connects your business to WhatsApp through Meta's official WhatsApp Business Cloud API, in ERIX Connect. When you message people on WhatsApp through ERIX, follow this policy, the WhatsApp Business Messaging Policy, Meta's Commerce and Business policies and the law. This protects your number, the people you message and the platform.`,
  effectiveDate: "29 October 2026",
  sections: [
    {
      id: "official",
      title: "Official API Only",
      icon: CheckCircle2,
      body: [
        "ERIX uses Meta's official WhatsApp Business Cloud API (the Graph API). We do not support unofficial, grey-route or modified WhatsApp apps.",
      ],
    },
    {
      id: "account",
      title: "Your Own WhatsApp Business Account",
      icon: MessageCircle,
      body: [
        "Each workspace connects its own WhatsApp Business Account, through Meta's embedded signup or with its own access token. Meta reviews the account and number, sets quality ratings and messaging limits, and bills that account directly for conversation charges. We do not resell or mark up Meta's charges.",
        "Keep your WhatsApp Business profile accurate and up to date, with a way for customers to reach your support (an email address, website or phone number), as Meta requires. Do not pretend to be another business.",
      ],
    },
    {
      id: "consent",
      title: "Opt-In",
      icon: UserCheck,
      body: [
        "Message only people who have agreed to hear from your business on WhatsApp.",
        {
          list: [
            "When a contact messages your number first, or replies START, ERIX records that as their opt-in, with the time.",
            "When a contact ticks a consent box on an ERIX form whose wording names WhatsApp, ERIX records that consent too.",
            "ERIX automations and broadcasts send a WhatsApp template only to contacts with one of these records.",
            "For contacts you import or add yourself, ERIX has no record of consent. Collect opt-in yourself, keep your own proof of it, and be ready to show it if Meta or the contact asks.",
            "An opt-in request must name your business and say the person will get WhatsApp messages.",
          ],
        },
      ],
    },
    {
      id: "optout",
      title: "STOP and START",
      icon: BellOff,
      body: [
        "When a contact sends only STOP (or UNSUBSCRIBE, STOP ALL, or the same word in a supported Indian language), ERIX opts them out of marketing on every channel at once and sends them one confirmation. ERIX then skips marketing messages to them; service messages, such as replies, reminders and invoices, still go. When they send START or SUBSCRIBE, they are opted back in.",
        "Meta requires you to respect every request to stop, whether it comes on WhatsApp or anywhere else. If someone asks you to stop in other words, or by phone, email or in person, stop messaging them yourself and remove them from your lists.",
      ],
    },
    {
      id: "window",
      title: "The 24-Hour Window",
      icon: Clock,
      body: [
        "You can send free-form messages, including AI replies, only within 24 hours of the contact's last message to you. Outside that window you must use a Meta-approved template. ERIX blocks free-form messages outside the window.",
      ],
    },
    {
      id: "templates",
      title: "Message Templates",
      icon: FileText,
      body: [
        "Templates need Meta's approval, in the right category:",
        {
          list: [
            "Marketing: promotions and offers (needs opt-in; Meta checks these more strictly).",
            "Utility: updates about an order, booking, account or other existing interaction.",
            "Authentication: one-time passcodes and verification.",
          ],
        },
        "Templates in the wrong category, or with content Meta does not allow, can be rejected or lead to penalties on your account.",
      ],
    },
    {
      id: "ai",
      title: "AI Agents on WhatsApp",
      icon: Bot,
      body: [
        "An ERIX AI agent answers only for your business, from your own information and instructions. It is not a general-purpose assistant.",
        {
          list: [
            "Auto-reply is off until you turn it on. While it is off, every AI reply waits in the inbox for a person to approve, edit or dismiss.",
            "With auto-reply on, the agent sends on its own only replies it is confident about and that are backed by your business information, plus short answers to greetings and thanks; the rest wait for a person.",
            "Your team can reply in any conversation from the inbox at any time.",
            "The agent hands a conversation to your team, stops replying there for 24 hours and marks it “Needs you” in the inbox when the customer asks for a person or it cannot help, when the message is about a topic you set to “Always send to a person”, or after 10 automatic replies in an hour.",
          ],
        },
        "Meta allows automated replies only with a prompt, clear way to reach a person. The handoff above gives customers that inside the chat; make sure someone on your team answers conversations marked “Needs you”.",
        "Neither we nor our AI providers use your WhatsApp messages to train AI models.",
      ],
    },
    {
      id: "prohibited",
      title: "Not Allowed",
      icon: Ban,
      body: [
        {
          list: [
            "Spam, unsolicited bulk messages, or bought or scraped contact lists without consent.",
            "Anything Meta's Commerce Policy prohibits, such as illegal or restricted goods.",
            "Deceptive, fraudulent or misleading messages, or a false sender identity.",
            "Harassment, hate speech, or content that puts others in danger.",
            "Asking people to send, or sending, full card numbers, bank account numbers, identity document numbers or other sensitive identifiers.",
            "Sending or asking for health information, or offering telemedicine, where the law requires safeguards that WhatsApp does not provide. Clinics should check this before sharing reports or test results on WhatsApp.",
            "Forwarding or sharing anything from one customer's chat with another customer.",
          ],
        },
      ],
    },
    {
      id: "quality",
      title: "Quality Rating and Limits",
      icon: ShieldAlert,
      body: [
        "Meta rates your number's quality from how people respond, for example when they block or report you. A low rating can reduce your messaging limits or restrict your number. Send relevant messages, to people who agreed to them, to keep a good rating.",
      ],
    },
    {
      id: "responsibility",
      title: "Your Responsibility and Enforcement",
      icon: AlertTriangle,
      body: [
        "You are responsible for what you send, for having consent, and for following Meta's rules. Meta's decisions about your number, templates and account are outside our control.",
        `If you break this policy, we may suspend features or close your account under our Terms and Acceptable Use Policy. Questions: ${LEGAL.emails.support}.`,
      ],
    },
  ],
};
