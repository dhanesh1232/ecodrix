import {
  ShieldCheck,
  Lock,
  KeyRound,
  Network,
  UserCheck,
  HardDrive,
  Eye,
  Bug,
  Bell,
} from "@/components/icons";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const securityDoc: LegalDoc = {
  slug: "security",
  title: "Security",
  pill: "Security Practices",
  description:
    "How ECODrIx protects your data: hosting, encryption, sign-in, workspace isolation, staff access, backups, monitoring, breach handling and how to report a flaw.",
  intro: `This page describes how ${LEGAL.brand} protects ERIX and the data in it, as things stand today. It supports our Privacy Policy and Data Processing Agreement.`,
  effectiveDate: "28 October 2026",
  sections: [
    {
      id: "infrastructure",
      title: "Where ERIX Runs",
      icon: ShieldCheck,
      body: [
        {
          list: [
            "Google Cloud: our database and background jobs in Mumbai, India; our API servers in the United States (Iowa), moving to Mumbai.",
            "Vercel: ecodrix.com and the ERIX console.",
            "Cloudflare R2: files.",
          ],
        },
        "Our API limits how fast requests can come in, so floods and password guessing are slowed down.",
      ],
    },
    {
      id: "encryption",
      title: "Encryption",
      icon: Lock,
      body: [
        {
          list: [
            "All traffic to ecodrix.com, the console and our API is encrypted with TLS.",
            "Our cloud providers encrypt stored data at rest.",
            "The credentials a workspace uses to connect its channels (for example, WhatsApp access tokens) are encrypted with AES-256-GCM before we store them.",
            "Passwords are stored only as scrypt hashes.",
          ],
        },
      ],
    },
    {
      id: "access",
      title: "Sign-In and Permissions",
      icon: KeyRound,
      body: [
        {
          list: [
            "You sign in with a password, or with Google, GitHub or LinkedIn.",
            "We do not offer two-factor sign-in yet. Sensitive actions, such as revealing or rotating an API key or setting a password, need a one-time code we email to you.",
            "Each team member has a role (owner, admin, agent or viewer) that limits what they can see and do. Only owners and admins can export data, and only the owner can delete the workspace.",
            "Settings → Account → Security shows your signed-in devices; you can sign out one device or all of them.",
          ],
        },
      ],
    },
    {
      id: "isolation",
      title: "Keeping Workspaces Apart",
      icon: Network,
      body: [
        "Many businesses share ERIX. Every record belongs to one workspace, and our data layer limits every database query to the signed-in workspace, so one workspace cannot read another's data.",
      ],
    },
    {
      id: "staff",
      title: "Staff Access",
      icon: UserCheck,
      body: [
        "Only staff on our approved list can use our admin tools, each with a role; read-only staff cannot change anything. Signing in as a workspace to help a customer is limited to our most senior admin role, lasts at most one hour, and every use is logged.",
      ],
    },
    {
      id: "backups",
      title: "Backups",
      icon: HardDrive,
      body: [
        "The database is backed up every day at 03:00 IST, and the last 7 backups are kept. Point-in-time recovery lets us restore it to a moment between backups.",
      ],
    },
    {
      id: "monitoring",
      title: "Monitoring and Logs",
      icon: Eye,
      body: [
        "We keep server logs for 180 days to investigate problems and incidents. Our systems email our team when errors, failed scheduled jobs or webhook failures need a person. Live status and past incidents are on our status page.",
      ],
    },
    {
      id: "disclosure",
      title: "Reporting a Vulnerability",
      icon: Bug,
      body: [
        `Report security flaws to ${LEGAL.emails.security}, with enough detail for us to reproduce them. While testing, do not access data that is not yours and do not disrupt the Service. We will acknowledge your report and work to fix confirmed issues quickly.`,
      ],
    },
    {
      id: "incident",
      title: "If Something Goes Wrong",
      icon: Bell,
      body: [
        "If a breach affects a customer's data, we tell that customer without undue delay and within 48 hours of confirming it. We report incidents to CERT-In within 6 hours of noticing them, as Indian law requires, and notify the Data Protection Board and the people affected as the DPDP Act and its Rules require.",
      ],
    },
  ],
};
