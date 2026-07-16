import {
  Activity,
  Gauge,
  Wrench,
  MinusCircle,
  BadgePercent,
  LifeBuoy,
} from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const slaDoc: LegalDoc = {
  slug: "sla",
  title: "Service Level Agreement",
  pill: "Uptime & Support SLA",
  description:
    "ECODrIx uptime commitments, how availability is measured, exclusions, support response targets, and service credits for eligible paid plans.",
  intro: `This Service Level Agreement ("SLA") describes our target availability and support commitments for the ${LEGAL.brand} platform. SLA commitments and service credits apply to eligible paid plans as specified on the Pricing page; free and beta features are excluded.`,
  sections: [
    {
      id: "uptime",
      title: "Uptime Commitment",
      icon: Activity,
      body: [
        "We target the monthly uptime percentage associated with your plan tier. Higher tiers carry stronger commitments.",
        {
          table: {
            headers: ["Plan tier", "Monthly uptime target"],
            rows: [
              ["Free / Beta", "No SLA (best effort)"],
              ["Growth", "99.0%"],
              ["Scale", "99.9%"],
              ["Enterprise", "99.99% (or as contracted)"],
            ],
          },
        },
        {
          note: "Confirm these tiers/targets against your current Pricing page before publishing.",
        },
      ],
    },
    {
      id: "measurement",
      title: "How Availability Is Measured",
      icon: Gauge,
      body: [
        'Availability is calculated per calendar month as the percentage of time the core platform is reachable, excluding the exclusions below. "Downtime" means a sustained, verified inability to access core functionality attributable to us.',
      ],
    },
    {
      id: "maintenance",
      title: "Scheduled Maintenance",
      icon: Wrench,
      body: [
        "We may perform scheduled maintenance, ideally during low-traffic windows, with advance notice where practical. Scheduled maintenance is not counted as downtime.",
      ],
    },
    {
      id: "exclusions",
      title: "Exclusions",
      icon: MinusCircle,
      body: [
        "The SLA does not cover unavailability caused by:",
        {
          list: [
            "Factors outside our reasonable control (force majeure, internet or ISP failures).",
            "Third-party services and providers (e.g., Meta/WhatsApp, payment processors, your integrations).",
            "Your misuse, misconfiguration, or breach of the Terms/AUP.",
            "Free, trial, beta, or preview features.",
            "Suspension for non-payment or policy violations.",
          ],
        },
      ],
    },
    {
      id: "credits",
      title: "Service Credits",
      icon: BadgePercent,
      body: [
        "If we miss the uptime target for your eligible plan in a given month, you may request service credits applied to a future invoice. Credits are the sole and exclusive remedy for missed uptime targets.",
        {
          list: [
            "Request credits within 30 days of the incident by emailing " +
              LEGAL.emails.support +
              ".",
            "Credits are calculated as a percentage of that month's fee based on the shortfall, per your plan's terms.",
            "Credits do not apply to third-party pass-through charges.",
          ],
        },
      ],
    },
    {
      id: "support",
      title: "Support Response Targets",
      icon: LifeBuoy,
      body: [
        "Support channels and response targets vary by plan (e.g., community, email, priority, dedicated). We aim to acknowledge issues promptly and prioritise by severity, with faster targets on higher tiers.",
        `General support: ${LEGAL.emails.support}.`,
      ],
    },
  ],
};
