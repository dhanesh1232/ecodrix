import {
  ArrowRight,
  FolderOpen,
  Inbox,
  KanbanSquare,
  Radar,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";

/**
 * The product, one card per tool. Blue = the workspace, purple = the AI and
 * automation tools (brand rule), so Flow and LAIE are marked as such.
 */
const tools = [
  {
    name: "ERIX CRM",
    href: "/platform/erix-crm",
    icon: KanbanSquare,
    summary: "Your pipeline, contacts and deals in one place.",
    points: ["Kanban pipeline with lead scoring", "GST invoices with CGST, SGST or IGST", "Projects, proposals and a client portal"],
  },
  {
    name: "ERIX Connect",
    href: "/platform/erix-connect",
    icon: Inbox,
    summary: "One inbox for WhatsApp, Instagram and email.",
    points: ["Official WhatsApp Business API", "Approved templates and broadcasts", "Every reply logged on the lead"],
  },
  {
    name: "ERIX Flow",
    href: "/platform/erix-flow",
    icon: Workflow,
    ai: true,
    summary: "Automations that follow up for you.",
    points: ["Start on any lead event or a schedule", "Send, wait, branch and ask for approval", "AI replies, with you in control"],
  },
  {
    name: "ERIX LAIE",
    href: "/platform/erix-laie",
    icon: Radar,
    ai: true,
    summary: "Find and research new leads.",
    points: ["Businesses that match your ideal customer", "Contact details checked and filled in", "Outreach drafted for you to review"],
  },
  {
    name: "ERIX Storage",
    href: "/platform/erix-storage",
    icon: FolderOpen,
    summary: "Files kept with the client they belong to.",
    points: ["Documents per client and project", "Secure share links", "Proposals signed online"],
  },
] as const;

export function Platform() {
  return (
    <section aria-labelledby="platform-title" className="section-pad bg-background">
      <div className="wrapper">
        <SectionHeading
          id="platform-title"
          eyebrow="The platform"
          title="Everything you need to win and keep customers"
          intro="Five tools that share one customer record, so nothing gets copied between apps and every team sees the same history."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <li key={t.name} className="card flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span
                  className={`flex size-10 items-center justify-center rounded-[8px] ${
                    "ai" in t ? "bg-ai-subtle text-ai" : "bg-accent-muted text-accent"
                  }`}
                >
                  <t.icon aria-hidden="true" className="size-5" />
                </span>
                {"ai" in t && (
                  <span className="ai-chip">
                    <Sparkles aria-hidden="true" className="size-3" /> AI
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-xl">{t.name}</h3>
              <p className="mt-1.5 text-muted-foreground">{t.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={t.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
              >
                Explore {t.name}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          ))}
          <li className="card flex flex-col justify-center bg-[var(--blue-50)] p-6">
            <h3 className="text-xl">Not sure where to start?</h3>
            <p className="mt-1.5 text-muted-foreground">
              Join the waitlist and tell us how you sell today. We’ll set ERIX up around it.
            </p>
            <Link href="/#contact" className="btn-primary mt-6 self-start">
              Join the waitlist
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
