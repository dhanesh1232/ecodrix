import Link from "next/link";
import { Icon } from "@/components/icons";
import { CtaBand, MkSection, WhatsAppCta } from "@/components/marketing/kit";
import { StatusBadge } from "@/components/ui/status-badge";
import { pageMetadata } from "@/lib/seo";
import { PLATFORM_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About ECODrIx, the team behind ERIX",
  description:
    "ECODrIx is an Indian software company founded in August 2025. It builds ERIX: one workspace for CRM, WhatsApp, email, GST invoices, AI agents and automation.",
  path: "/about",
});

// Kept exactly as published; don't add numbers here.
const stats = [
  { value: "2025", label: "Founded" },
  { value: "50+", label: "Businesses onboarded" },
  { value: "6", label: "Tools in one platform" },
  { value: "99.9%", label: "Uptime SLA" },
];

const values = [
  {
    title: "Build for real businesses",
    desc: "We use our own platform daily. Every feature we ship solves a problem we've faced ourselves.",
  },
  {
    title: "Simple over clever",
    desc: "Powerful features shouldn't require a manual. If it takes more than 5 minutes to set up, we redesign it.",
  },
  {
    title: "Honest about what we are",
    desc: "We're an early-stage startup, actively building and iterating. We don't pretend to be something we're not.",
  },
  {
    title: "Customer success is our success",
    desc: "We respond to every support request personally. Your growth is the only metric that matters to us.",
  },
];

const stack = [
  "Next.js",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Google Cloud Run",
  "Cloud SQL",
  "AWS SES",
  "Cloudflare R2",
  "Meta WhatsApp API",
  "Google OAuth",
];

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* ── Story ── */}
      <section className="erix-mk-section erix-mk-section--subtle pt-12! md:pt-16!">
        <div className="wrapper grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <h1 className="text-[clamp(38px,5.4vw,60px)] leading-[1.04] tracking-[-0.035em]">
              We got tired of paying for 10 different tools.
            </h1>
            <div className="mt-6 max-w-[60ch] space-y-4 text-[clamp(16px,1.5vw,19px)] leading-relaxed">
              <p>
                ECODrIx started in 2025 when we were building digital systems for clients across India. Every client
                needed the same stack: a CRM, WhatsApp automation, email campaigns and a place to store files. They were
                paying for 5–10 separate tools that didn&apos;t talk to each other.
              </p>
              <p>
                So we built it once, properly, and made it available as a platform. That platform is ERIX: one
                workspace for growing Indian businesses.
              </p>
            </div>
          </div>
          <figure className="self-end rounded-[16px] bg-surface p-7 shadow-[var(--shadow-card)] md:p-9">
            <blockquote className="font-display text-[clamp(22px,2.4vw,30px)] leading-snug font-semibold tracking-[-0.015em] text-foreground">
              “Empower businesses to automate operations and scale growth, without needing a technical team or expensive
              enterprise software.”
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold text-accent">Our mission</figcaption>
          </figure>
        </div>
      </section>

      {/* ── At a glance ── */}
      <section aria-label="ECODrIx at a glance" className="bg-surface py-12 md:py-16">
        <dl className="wrapper grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-1 text-[15px] text-muted-foreground">{s.label}</dt>
              <dd className="order-1 text-[clamp(32px,3.6vw,44px)] leading-none font-bold tracking-[-0.03em] text-foreground">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── What we build ── */}
      <MkSection
        id="build"
        tone="subtle"
        title="One platform instead of a stack of tools"
        lead="ERIX replaces the tools most growing businesses stitch together, and every part shares the same customer record."
      >
        <ul className="grid gap-x-10 md:grid-cols-2">
          {PLATFORM_NAV.map((m) => (
            <li key={m.key} className="border-t border-border">
              <Link href={m.href} className="group -mx-3 flex items-start gap-4 rounded-[12px] px-3 py-5 hover:bg-hover">
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-[11px]",
                    "ai" in m ? "bg-ai-subtle text-ai" : "bg-accent-muted text-accent",
                  )}
                >
                  <m.icon variant="duo" className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 text-[17px] font-semibold text-foreground">
                    {m.name}
                    {m.status !== "live" && <StatusBadge status={m.status} />}
                  </span>
                  <span className="mt-1 block text-[15px] text-muted-foreground">{m.summary}</span>
                </span>
                <Icon name="arrow-right" size={16} variant="line" className="mt-3 shrink-0 text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </MkSection>

      {/* ── How we work ── */}
      <MkSection id="values" title="Four things we hold ourselves to">
        <ol className="grid gap-x-16 gap-y-10 md:grid-cols-2">
          {values.map((v, i) => (
            <li key={v.title} className="grid grid-cols-[48px_1fr] gap-4">
              <span className="text-[28px] leading-none font-bold tracking-[-0.03em] text-accent">0{i + 1}</span>
              <div>
                <h3 className="font-sans text-[19px] font-semibold tracking-normal">{v.title}</h3>
                <p className="mt-2 text-[16px] text-muted-foreground">{v.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </MkSection>

      {/* ── Infrastructure ── */}
      <MkSection
        id="infra"
        tone="subtle"
        title="Built on Google Cloud"
        lead="The API runs on Google Cloud Run with PostgreSQL on Cloud SQL, background jobs on dedicated workers, email through AWS SES and files on Cloudflare R2. Designed for reliability, security and scale."
      >
        <ul className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <li key={t} className="rounded-[8px] bg-surface px-3 py-1.5 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
              {t}
            </li>
          ))}
        </ul>
      </MkSection>

      {/* ── Contact ── */}
      <CtaBand
        title="Want to talk to the founder?"
        lead={
          <p className="text-inherit">
            We&apos;re an early-stage startup. Reach out directly; we respond to every message personally.{" "}
            <Link href="/founder" className="link-on-dark underline underline-offset-4">
              Meet Dhanesh
            </Link>
            .
          </p>
        }
        actions={
          <>
            <a href="mailto:contact@ecodrix.com" className="btn-primary btn-lg">
              <Icon name="mail" size={16} variant="line" /> Email us
            </a>
            <WhatsAppCta lg />
          </>
        }
      />
    </div>
  );
}
