import {
  ShieldCheck,
  Lock,
  KeyRound,
  Network,
  HardDrive,
  Eye,
  Bug,
  Bell,
} from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const securityDoc: LegalDoc = {
  slug: "security",
  title: "Security",
  pill: "Security Practices",
  description:
    "How ECODrIx protects your data — encryption, access controls, tenant isolation, monitoring, backups, and vulnerability disclosure.",
  intro: `Security is foundational to ${LEGAL.brand}. This page summarises the technical and organisational measures we use to protect the platform and your data. It supports our Privacy Policy and Data Processing Agreement.`,
  sections: [
    {
      id: "encryption",
      title: "Encryption",
      icon: Lock,
      body: [
        {
          list: [
            "Data encrypted in transit using TLS.",
            "Data encrypted at rest using industry-standard algorithms (e.g., AES-256).",
            "Sensitive credentials and external connection secrets are encrypted before storage.",
          ],
        },
      ],
    },
    {
      id: "access",
      title: "Access Control",
      icon: KeyRound,
      body: [
        {
          list: [
            "Role-based access control (RBAC) within the platform.",
            "Principle of least privilege for internal administrative access.",
            "Support for strong authentication; multi-factor authentication where available.",
          ],
        },
      ],
    },
    {
      id: "isolation",
      title: "Multi-Tenant Isolation",
      icon: Network,
      body: [
        "The platform is multi-tenant by design with logical isolation between organisations. Customers may also configure their own database (where offered) for stronger data separation.",
      ],
    },
    {
      id: "infrastructure",
      title: "Infrastructure Security",
      icon: ShieldCheck,
      body: [
        "We build on reputable cloud infrastructure (e.g., AWS, Cloudflare) that maintains recognised certifications. Network controls, rate limiting, and anomaly detection help protect against abuse and attacks.",
      ],
    },
    {
      id: "backups",
      title: "Backups & Resilience",
      icon: HardDrive,
      body: [
        "We perform regular backups and design for resilience and recovery. Durability mechanisms (such as write-ahead logging and snapshots in our infrastructure layer) support recovery from failures.",
      ],
    },
    {
      id: "monitoring",
      title: "Monitoring & Logging",
      icon: Eye,
      body: [
        "We maintain audit logs and monitoring to detect suspicious activity, support incident investigation, and improve reliability.",
      ],
    },
    {
      id: "disclosure",
      title: "Responsible Disclosure",
      icon: Bug,
      body: [
        `We appreciate responsible disclosure of security issues. Please report vulnerabilities to ${LEGAL.emails.security} with enough detail to reproduce. Do not access data that is not yours or disrupt the Service while testing. We will acknowledge reports and work to remediate confirmed issues promptly.`,
      ],
    },
    {
      id: "incident",
      title: "Incident Response",
      icon: Bell,
      body: [
        "We maintain an incident-response process and will notify affected customers and authorities of security incidents as required by applicable law, including the DPDP Act and CERT-In directions where relevant.",
      ],
    },
  ],
};
