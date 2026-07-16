import {
  Info,
  Eye,
  Share2,
  Lock,
  Globe,
  Clock,
  UserCheck,
  Cookie,
  Baby,
  RefreshCw,
  Mail,
} from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const privacyDoc: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  pill: "Privacy & Data Protection",
  description:
    "How ECODrIx collects, uses, shares, and protects personal data across ERIX, LAIE, FLOW, and Connect — aligned with India's DPDP Act 2023 and the GDPR.",
  intro: `This Privacy Policy explains how ${LEGAL.entity} ("${LEGAL.brand}", "we", "us") collects, uses, discloses, and safeguards personal data when you use our website and platform (ERIX, LAIE, FLOW, Connect and related services). It is designed to meet India's Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000 and its rules, and — where applicable — the EU/UK GDPR.`,
  sections: [
    {
      id: "roles",
      title: "Our Role: Controller vs Processor",
      icon: Info,
      body: [
        "We handle personal data in two distinct roles, and this Policy applies to both.",
        {
          list: [
            "As a data fiduciary/controller: for data about our own account holders, website visitors, and prospects (e.g., your name, email, billing details).",
            "As a data processor: for the customer data you upload into the platform (your leads, contacts, conversations). You remain the controller of that data; we process it only on your instructions under our Terms and Data Processing Agreement.",
          ],
        },
      ],
    },
    {
      id: "collection",
      title: "Information We Collect",
      icon: Info,
      body: [
        { subheading: "Information you provide" },
        {
          list: [
            "Account and profile data: name, email, phone number, company name, role, password.",
            "Billing data: billing name, address, GSTIN, and payment metadata (card/UPI details are handled by our payment processors, not stored by us).",
            "Content and customer data: leads, contacts, messages, files, and other data you or your team enter into ERIX/LAIE/FLOW.",
            "Communications: support tickets, emails, and feedback you send us.",
          ],
        },
        { subheading: "Information collected automatically" },
        {
          list: [
            "Usage and log data: pages viewed, features used, automation runs, IP address, device and browser type, timestamps.",
            "Cookies and similar technologies (see our Cookie Policy).",
          ],
        },
        { subheading: "Information from third parties" },
        {
          list: [
            "Connected channels you authorise (e.g., Meta WhatsApp Business, Google, email providers).",
            "Publicly available business data enriched by LAIE for lead-generation features you run.",
          ],
        },
      ],
    },
    {
      id: "usage",
      title: "How We Use Information",
      icon: Eye,
      body: [
        {
          list: [
            "Provide, operate, secure, and improve the platform and its products.",
            "Process transactions, manage subscriptions, and send billing information.",
            "Send service communications: technical notices, updates, security alerts, and support.",
            "Provide AI-assisted features (e.g., lead research, smart replies, auto-responses) using vetted AI providers.",
            "Detect, prevent, and address fraud, abuse, and security incidents.",
            "Comply with legal obligations and enforce our agreements.",
            "With your consent, send marketing communications you can opt out of at any time.",
          ],
        },
      ],
    },
    {
      id: "legal-basis",
      title: "Legal Bases for Processing",
      icon: UserCheck,
      body: [
        "Where the DPDP Act or GDPR applies, we rely on one or more of the following bases:",
        {
          list: [
            "Performance of a contract (to deliver the services you sign up for).",
            "Consent (for marketing, certain cookies, and specific processing — withdrawable anytime).",
            "Legitimate interests (to secure, improve, and operate our services, balanced against your rights).",
            "Legal obligation (tax, accounting, and regulatory requirements).",
          ],
        },
      ],
    },
    {
      id: "sharing",
      title: "How We Share Information",
      icon: Share2,
      body: [
        "We do not sell your personal data. We share it only as follows:",
        {
          list: [
            "Sub-processors and service providers who help us run the platform (hosting, storage, messaging, payments, AI). See our Sub-processors page for the current list.",
            "Connected services you authorise, to deliver the integrations you enable.",
            "Legal and safety: when required by law, court order, or to protect rights, safety, and property.",
            "Business transfers: in a merger, acquisition, or asset sale, subject to this Policy.",
          ],
        },
      ],
    },
    {
      id: "transfers",
      title: "International Data Transfers",
      icon: Globe,
      body: [
        "We are based in India and use reputable global infrastructure providers. Where personal data is transferred across borders, we use safeguards such as contractual protections and provider commitments consistent with the DPDP Act and, where applicable, GDPR transfer mechanisms.",
      ],
    },
    {
      id: "retention",
      title: "Data Retention",
      icon: Clock,
      body: [
        "We retain personal data for as long as your account is active or as needed to provide the services, then for the period required to meet legal, tax, and accounting obligations. Customer data you upload is retained per your instructions and deleted after account closure subject to the timelines in our Terms and DPA.",
      ],
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: UserCheck,
      body: [
        "Subject to applicable law, you may:",
        {
          list: [
            "Access, correct, update, or complete your personal data.",
            "Request erasure of your personal data.",
            "Withdraw consent where processing is based on consent.",
            "Nominate another individual to exercise your rights in the event of death or incapacity (DPDP Act).",
            "Lodge a grievance with our Grievance Officer, and escalate to the Data Protection Board of India or your local authority.",
          ],
        },
        {
          note: `To exercise these rights, email ${LEGAL.emails.privacy}. If we act as a processor for data you access through another business's account, we will refer your request to that business (the controller).`,
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: Cookie,
      body: [
        "We use cookies and similar technologies for essential functionality, analytics, and (with consent) marketing. See our Cookie Policy for details and how to manage preferences.",
      ],
    },
    {
      id: "security",
      title: "Data Security",
      icon: Lock,
      body: [
        "We apply reasonable technical and organisational measures — including encryption in transit and at rest, access controls, and monitoring — to protect personal data. See our Security page for details. No method of transmission or storage is 100% secure; we notify affected users and authorities of breaches as required by law.",
      ],
    },
    {
      id: "children",
      title: "Children's Privacy",
      icon: Baby,
      body: [
        "The platform is intended for businesses and is not directed at children. We do not knowingly collect personal data from children below the age of 18 without verifiable parental/guardian consent as required by the DPDP Act. If you believe a child has provided us data, contact us for removal.",
      ],
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      icon: RefreshCw,
      body: [
        "We may update this Policy from time to time. Material changes will be notified via the platform or email, and the “Last updated” date above will change. Continued use after changes take effect constitutes acceptance.",
      ],
    },
    {
      id: "contact",
      title: "Contact & Grievance Officer",
      icon: Mail,
      body: [
        `Privacy questions: ${LEGAL.emails.privacy}. Data Protection Officer: ${LEGAL.emails.dpo}.`,
        `Grievance Officer (per the IT Act, 2000 and DPDP Act, 2023): ${LEGAL.grievanceOfficer}, ${LEGAL.emails.grievance}.`,
        `${LEGAL.entity}, ${LEGAL.registeredAddress}.`,
      ],
    },
  ],
};
