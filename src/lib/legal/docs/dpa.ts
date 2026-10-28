import {
  FileCheck,
  Users,
  ListChecks,
  Server,
  Lock,
  Globe,
  Bell,
  Baby,
  Trash2,
  ClipboardCheck,
} from "@/components/icons";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const dpaDoc: LegalDoc = {
  slug: "dpa",
  title: "Data Processing Agreement",
  pill: "DPA · Processor Terms",
  description:
    "How ECODrIx processes personal data for businesses that use ERIX and LAIE: our duties as data processor under the DPDP Act, breaches, deletion and audits.",
  intro: `This Data Processing Agreement ("DPA") is part of the Terms of Service between ${LEGAL.entity} ("we", the data processor) and the business that uses ${LEGAL.brand} ("you", the data fiduciary). It covers the personal data in your workspace that we process for you, under India's Digital Personal Data Protection Act, 2023 (DPDP Act).`,
  effectiveDate: "28 October 2026",
  sections: [
    {
      id: "roles",
      title: "Roles",
      icon: Users,
      body: [
        "For the personal data in your workspace (“Customer Data”), you are the data fiduciary and we are your data processor. We process it only on your instructions. Your instructions are these Terms and the way you set up and use the Service.",
      ],
    },
    {
      id: "scope",
      title: "What We Process",
      icon: FileCheck,
      body: [
        {
          list: [
            "Purpose: to provide ERIX and LAIE to you.",
            "Duration: while you use the Service, plus the deletion periods below.",
            "What we do with it: store it, send and receive messages on your channels, run your automations and AI agents, and find leads, as you set up.",
            "Whose data: your contacts, leads, customers and team members.",
            "What data: contact details, conversations and messages, files, and anything else you choose to store.",
          ],
        },
      ],
    },
    {
      id: "obligations",
      title: "Our Duties",
      icon: ListChecks,
      body: [
        {
          list: [
            "Process Customer Data only on your instructions, unless the law requires otherwise; if it does, we tell you where the law allows.",
            "Make sure everyone who can access Customer Data is bound to keep it confidential.",
            "Keep the security measures below in place.",
            "Help you answer the people whose data you hold. ERIX lets you export your workspace data and erase one contact's personal data yourself.",
            "Give you the information you reasonably need to show you comply with the DPDP Act.",
          ],
        },
      ],
    },
    {
      id: "subprocessors",
      title: "Sub-Processors",
      icon: Server,
      body: [
        "You allow us to use sub-processors to run the Service. Our Sub-processors page lists every one, with what it does, what data it handles and where. We update that page before we start using a new sub-processor; you can object on reasonable grounds.",
      ],
    },
    {
      id: "security",
      title: "Security Measures",
      icon: Lock,
      body: [
        {
          list: [
            "Data travels encrypted with TLS. Our cloud providers encrypt it at rest.",
            "The credentials you use to connect your channels are encrypted with AES-256-GCM before we store them. Passwords are stored only as scrypt hashes.",
            "Every record belongs to one workspace, and every database query is limited to the signed-in workspace.",
            "Our staff accounts are on an approved list with roles. Signing in as a workspace is limited to our most senior admin role, lasts at most one hour, and every use is logged.",
            "The database is backed up daily, the last 7 backups are kept, and it can be restored to a point in time.",
          ],
        },
        "Our Security page describes these measures in more detail.",
      ],
    },
    {
      id: "transfers",
      title: "Where Data Is Processed",
      icon: Globe,
      body: [
        "Our database and background jobs run in Mumbai, India. Some processing happens outside India: our API servers currently run in the United States and are moving to Mumbai, and our AI providers process in the United States. Our Privacy Policy and Sub-processors page give the full list.",
      ],
    },
    {
      id: "breach",
      title: "Personal Data Breaches",
      icon: Bell,
      body: [
        `If a breach affects your Customer Data, we tell you without undue delay and within 48 hours of confirming it, with the information we have to help you notify the Data Protection Board and the people affected. We also report incidents to CERT-In within 6 hours of noticing them, as Indian law requires. Security contact: ${LEGAL.emails.security}.`,
      ],
    },
    {
      id: "children",
      title: "Children's Data",
      icon: Baby,
      body: [
        "If your workspace holds data about children (under 18), for example as a clinic or a school, you must get verifiable consent from a parent or guardian where the DPDP Act requires it, before you put that data into ERIX.",
      ],
    },
    {
      id: "deletion",
      title: "Deleting Data",
      icon: Trash2,
      body: [
        {
          list: [
            "When you delete your workspace, we keep it for 30 days so it can be restored on request, then erase it. If you choose “Delete permanently”, we erase it at once.",
            "Database backups that still hold the data expire within 7 days after it is erased.",
            "Export your data before you delete: Settings → Workspace → Danger zone → Export all data.",
          ],
        },
      ],
    },
    {
      id: "audits",
      title: "Audits",
      icon: ClipboardCheck,
      body: [
        `With reasonable written notice and under confidentiality, we will provide relevant documents and answer reasonable audit questions to show we meet this DPA. To get this DPA as a signed document, write to ${LEGAL.emails.legal}.`,
      ],
    },
  ],
};
