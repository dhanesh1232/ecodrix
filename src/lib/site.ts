import {
  Database,
  FolderOpen,
  Inbox,
  KanbanSquare,
  Radar,
  Sparkles,
  Workflow,
  type IconComponent,
} from "@/components/icons";

/**
 * Site-wide navigation data: the one main call to action and the Platform
 * menu. Used by the navbar, footer, home page and /platform.
 */

/**
 * The main call to action, everywhere on the site. Signups aren't open yet,
 * so it leads to the waitlist. When the founder opens signups, change it to:
 *   { label: "Start free", href: "https://console.ecodrix.com/auth/register" }
 */
export const PRIMARY_CTA = {
  label: "Join the waitlist",
  href: "/#contact",
} as const;

/**
 * The second action: a WhatsApp chat. This is the ECODrIx number already
 * published on /about ("Want to talk to the founder?"); don't invent another.
 */
export const WHATSAPP_CTA = {
  label: "Chat on WhatsApp",
  href: "https://wa.me/918143963821",
} as const;

export type ModuleStatus = "live" | "soon" | "invite";

export const STATUS_LABEL: Record<ModuleStatus, string> = {
  live: "Live",
  soon: "Coming soon",
  invite: "Invite only",
};

/**
 * The Platform menu. `ai` marks AI/automation (purple, brand rule). Status
 * follows ECOD/docs/VERSION_PLAN.md: v1.0 is live, ERIX Store is coming
 * soon, LAIE is an invite-only beta. Voice isn't launched, so it isn't here.
 */
export const PLATFORM_NAV = [
  {
    key: "crm",
    icon: KanbanSquare,
    name: "ERIX CRM",
    href: "/platform/erix-crm",
    summary: "Contacts, pipeline, bookings, proposals and GST invoices.",
    status: "live",
  },
  {
    key: "connect",
    icon: Inbox,
    name: "ERIX Connect",
    href: "/platform/erix-connect",
    summary: "One inbox for WhatsApp, Instagram, email and website chat.",
    status: "live",
  },
  {
    key: "agents",
    icon: Sparkles,
    name: "AI agents",
    href: "/platform#agents",
    summary: "Answers from your knowledge, books, and hands off to you.",
    status: "live",
    ai: true,
  },
  {
    key: "flow",
    icon: Workflow,
    name: "ERIX Flow",
    href: "/platform/erix-flow",
    summary: "Follow-ups and reminders that run on their own.",
    status: "live",
    ai: true,
  },
  {
    key: "storage",
    icon: FolderOpen,
    name: "ERIX Storage",
    href: "/platform/erix-storage",
    summary: "Files kept with the client and project they belong to.",
    status: "live",
  },
  {
    key: "laie",
    icon: Radar,
    name: "ERIX LAIE",
    href: "/platform/erix-laie",
    summary: "Finds and researches new leads for you to review.",
    status: "invite",
    ai: true,
  },
  {
    key: "store",
    icon: Database,
    name: "ERIX Store",
    href: "/platform/erix-store",
    summary: "The data engine under ERIX, for developers.",
    status: "soon",
  },
] as const satisfies readonly {
  key: string;
  icon: IconComponent;
  name: string;
  href: string;
  summary: string;
  status: ModuleStatus;
  ai?: boolean;
}[];
