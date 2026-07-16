import {
  FileCheck,
  Users,
  ListChecks,
  Server,
  Lock,
  Globe,
  Bell,
  Trash2,
  ClipboardCheck,
} from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const dpaDoc: LegalDoc = {
  slug: "dpa",
  title: "Data Processing Agreement",
  pill: "DPA · Processor Terms",
  description:
    "The terms under which ECODrIx processes personal data on behalf of its business customers, aligned with the DPDP Act 2023 and GDPR Article 28.",
  intro: `This Data Processing Agreement ("DPA") forms part of the Terms of Service between ${LEGAL.entity} ("Processor") and the customer ("Controller"). It governs our processing of personal data contained in Customer Data on your behalf and reflects obligations under India's DPDP Act, 2023 and, where applicable, GDPR Article 28.`,
  sections: [
    {
      id: "roles",
      title: "Roles of the Parties",
      icon: Users,
      body: [
        "For Customer Data you upload and process through the platform, you are the Controller (data fiduciary) and ECODrIx is the Processor (data processor). We process such data only on your documented instructions, which include your configuration and use of the Service.",
      ],
    },
    {
      id: "scope",
      title: "Scope & Subject Matter",
      icon: FileCheck,
      body: [
        {
          list: [
            "Subject matter: processing of personal data to provide the ECODrIx platform.",
            "Duration: for the term of your subscription plus retention periods stated below.",
            "Nature & purpose: hosting, storage, transmission, enrichment, automation, and messaging as configured by you.",
            "Categories of data subjects: your contacts, leads, customers, and personnel.",
            "Types of personal data: contact details, communications, and other data you choose to store.",
          ],
        },
      ],
    },
    {
      id: "obligations",
      title: "Processor Obligations",
      icon: ListChecks,
      body: [
        {
          list: [
            "Process personal data only on your documented instructions, unless required by law (in which case we notify you where permitted).",
            "Ensure persons authorised to process data are bound by confidentiality.",
            "Implement appropriate technical and organisational security measures (see Security page).",
            "Assist you, taking into account the nature of processing, with data-subject requests and your compliance obligations.",
            "Make available information necessary to demonstrate compliance.",
          ],
        },
      ],
    },
    {
      id: "subprocessors",
      title: "Sub-Processors",
      icon: Server,
      body: [
        "You authorise us to engage sub-processors to provide the Service. We maintain a current list on our Sub-processors page and impose data-protection terms on them no less protective than this DPA. We will give notice of intended changes so you may object on reasonable grounds.",
      ],
    },
    {
      id: "security",
      title: "Security Measures",
      icon: Lock,
      body: [
        "We maintain measures including encryption in transit and at rest, access controls, network security, logging, and regular review. Details are described on our Security page, which forms part of this DPA.",
      ],
    },
    {
      id: "transfers",
      title: "International Transfers",
      icon: Globe,
      body: [
        "Where we transfer personal data across borders, we implement lawful transfer mechanisms and contractual safeguards consistent with the DPDP Act and, where applicable, GDPR.",
      ],
    },
    {
      id: "breach",
      title: "Personal Data Breach Notification",
      icon: Bell,
      body: [
        `We will notify you without undue delay after becoming aware of a personal data breach affecting your Customer Data, and provide information reasonably available to help you meet your notification obligations. Security contact: ${LEGAL.emails.security}.`,
      ],
    },
    {
      id: "deletion",
      title: "Return & Deletion of Data",
      icon: Trash2,
      body: [
        "On termination, you may export Customer Data for a limited period. After that period, we will delete or anonymise Customer Data except where retention is required by law, and back-ups are purged on our routine cycle.",
      ],
    },
    {
      id: "audits",
      title: "Audits",
      icon: ClipboardCheck,
      body: [
        `On reasonable prior written notice and subject to confidentiality, we will provide relevant documentation and respond to reasonable audit requests to demonstrate compliance with this DPA. To request this DPA as a countersigned document, contact ${LEGAL.emails.legal}.`,
      ],
    },
  ],
};
