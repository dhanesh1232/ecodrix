/**
 * Coded mocks of the real ERIX screens (redrawn from the SaaS: inbox with an
 * AI draft, Approvals, the pipeline board, an invoice, an automation, the
 * public booking page). Shared by the home product tour and /platform.
 * Each loops only while on screen (Scene); data is example data.
 */

import {
  CheckCheck,
  CheckCircle2,
  Clock,
  Link2,
  MessageCircle,
  Send,
  Sparkles,
  UserRound,
  Workflow,
  Zap,
  type IconComponent,
} from "@/components/icons";
import type { CSSProperties, ReactNode } from "react";
import { Scene } from "@/components/motion/motion";
import { LiveDot } from "@/components/motion/surface";
import { cn } from "@/lib/utils";
import type { ScreenKey } from "@/lib/product-pages";
import { AppFrame, Avatar, Bubble, Channel, Pill, at } from "./parts";

const box = "rounded-[10px] bg-surface shadow-[var(--shadow-card)]";

/** A ring that "presses" a button for one step. */
function Press({ show }: { show: CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      style={show}
      className="scene-in scene-pop pointer-events-none absolute -inset-1 rounded-[6px] ring-2 ring-accent"
    />
  );
}

/* ── Inbox ─────────────────────────────────────────────────────────────── */

const threads = [
  { name: "Rohan Mehta", ch: "whatsapp", text: "Is a site visit free? And what…", time: "12:03 pm", active: true },
  { name: "Ananya Rao", ch: "instagram", text: "Do you have 2BHKs near Wakad?", time: "11:40 am", unread: 2 },
  { name: "Anita Desai", ch: "email", text: "Re: Payment for INV/26-27/0039", time: "10:12 am" },
  { name: "Website visitor", ch: "web", text: "I want to cancel my visit", time: "9:55 am", needsYou: true },
] as const;

export function InboxScreen() {
  return (
    <Scene
      steps={6}
      timing={[0, 1400, 2200, 700, 900, 900]}
      label="The ERIX inbox: WhatsApp, Instagram, email and website chat threads in one list. A customer asks about a site visit and a price; the AI drafts an answer from the business's knowledge, a person sends it, and the ticks turn from sent to delivered to read."
    >
      <AppFrame
        title="Inbox"
        nav={0}
        className="h-[25rem]"
        action={
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-success">
            <LiveDot /> Live
          </span>
        }
      >
        <div className="flex h-full">
          <ul className="hidden w-[38%] shrink-0 border-r border-border bg-surface md:block">
            {threads.map((t) => (
              <li
                key={t.name}
                className={cn(
                  "border-b border-border px-3 py-2.5",
                  "active" in t && "bg-accent-muted shadow-[inset_2px_0_0_var(--accent)]",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[12px] font-semibold text-foreground">{t.name}</span>
                  <span className="shrink-0 text-[10px] text-subtle">{t.time}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <span className="truncate text-[11px] text-muted-foreground">{t.text}</span>
                  {"unread" in t && (
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                      {t.unread}
                    </span>
                  )}
                  {"needsYou" in t && <Pill tone="warning">Needs you</Pill>}
                </div>
                <Channel name={t.ch} className="mt-1" />
              </li>
            ))}
          </ul>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
              <Avatar name="Rohan Mehta" className="size-7" />
              <span className="text-[12px] font-semibold text-foreground">Rohan Mehta</span>
              <Channel name="whatsapp" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden bg-background p-3">
              <p className="mx-auto rounded-[6px] bg-surface px-2.5 py-0.5 text-[10px] text-subtle">Today</p>
              <Bubble show={at(1)} time="12:03 pm">
                Is a site visit free? And what does a 2BHK in Vijay Nagar cost?
              </Bubble>
              <div className="stack w-full">
                <div
                  style={at(2, 4)}
                  className="scene-in ml-auto w-[88%] rounded-[10px] border border-[var(--purple-500)] bg-ai-subtle px-3 py-2"
                >
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-ai">
                    <Sparkles aria-hidden="true" className="size-3" /> AI draft · 94% confident
                  </span>
                  <p className="mt-1 text-[12px] text-foreground">
                    Site visits are free. A 2BHK in Vijay Nagar starts from ₹48,00,000.
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">Based on: Office hours and prices</p>
                  <span className="mt-2 flex gap-2">
                    <span className="relative inline-flex items-center gap-1 rounded-[6px] bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
                      <Send aria-hidden="true" className="size-3" /> Send
                      <Press show={at(3, 4)} />
                    </span>
                    <span className="rounded-[6px] border border-border-strong bg-surface px-2.5 py-1 text-[11px] font-semibold text-foreground">
                      Edit
                    </span>
                  </span>
                </div>
                <Bubble side="out" show={at(4)} time="12:04 pm" ticks={4} className="self-start">
                  Site visits are free. A 2BHK in Vijay Nagar starts from ₹48,00,000.
                </Bubble>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-border bg-surface p-2.5">
              <span className="flex-1 truncate rounded-[6px] border border-border-strong px-2.5 py-1.5 text-[11px] text-subtle">
                Message via WhatsApp…
              </span>
              <span className="flex size-7 items-center justify-center rounded-[6px] bg-accent text-white">
                <Send aria-hidden="true" className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </AppFrame>
    </Scene>
  );
}

/* ── AI: knowledge + approvals ─────────────────────────────────────────── */

export function AiScreen() {
  return (
    <Scene
      steps={5}
      timing={[0, 1300, 1300, 1500, 900]}
      label="ERIX AI: a new knowledge source is read and becomes ready, the latest draft shows the source it came from, and on the Approvals page the sales agent's request to create a ₹5,000 draft proposal is approved by a person. Nothing is sent to the customer."
    >
      <AppFrame title="Approvals" nav={1} className="h-[25rem]">
        <div className="grid h-full gap-3 overflow-hidden p-3 sm:p-4 md:grid-cols-[1fr_1.5fr]">
          <div className={cn(box, "hidden p-3 md:block")}>
            <p className="text-[12px] font-semibold text-foreground">AI knowledge</p>
            <ul className="mt-2 space-y-2 text-[11px]">
              <li className="flex items-center justify-between gap-2">
                <span className="truncate text-foreground">Office hours and prices</span>
                <Pill tone="success">Ready</Pill>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="truncate text-foreground">Baner listing</span>
                <span className="stack justify-items-end">
                  <Pill tone="primary" className="scene-in" style={at(0, 2)}>
                    Reading
                  </Pill>
                  <Pill tone="success" className="scene-in scene-pop" style={at(2)}>
                    Ready
                  </Pill>
                </span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="truncate text-foreground">Refund policy</span>
                <Pill tone="success">Ready</Pill>
              </li>
            </ul>
            <p className="mt-4 text-[11px] text-muted-foreground">Latest draft</p>
            <p className="mt-1 rounded-[6px] border border-border-strong px-2 py-1.5 text-[11px] text-foreground">
              Is parking included?
            </p>
            <p style={at(3)} className="scene-in mt-2 text-[11px] text-muted-foreground">
              From: <span className="font-semibold text-foreground">Baner listing</span>
            </p>
          </div>
          <div className="min-w-0 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-[10px] bg-[var(--brand-purple)] p-2.5 text-white">
                <p className="text-[10px] text-white/85">AI drafts to review</p>
                <p className="mt-1 font-display text-xl font-bold text-white">2</p>
              </div>
              <div className="rounded-[10px] bg-[var(--brand-blue)] p-2.5 text-white">
                <p className="text-[10px] text-white/85">Automations on hold</p>
                <p className="stack mt-1 font-display text-xl font-bold text-white">
                  <span className="scene-in" style={at(0, 5)}>1</span>
                  <span className="scene-in" style={at(5)}>0</span>
                </p>
              </div>
            </div>
            <div className={cn(box, "p-3")}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12px] font-semibold text-foreground">Sales agent: qualify a new enquiry</span>
                <span className="stack">
                  <Pill tone="warning" icon={Clock} className="scene-in" style={at(0, 5)}>
                    Waiting for approval
                  </Pill>
                  <Pill tone="success" icon={CheckCircle2} className="scene-in scene-pop" style={at(5)}>
                    Approved
                  </Pill>
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-muted-foreground">Contact: Meera Iyer</p>
              <div className="mt-2 rounded-[10px] border border-[var(--purple-500)] bg-ai-subtle p-2.5 text-[11px]">
                <p className="flex items-center gap-1 font-semibold text-foreground">
                  <Sparkles aria-hidden="true" className="size-3 text-ai" /> The AI agent wants to: Create proposal
                  (draft)
                </p>
                <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-muted-foreground">
                  <dt>Title</dt>
                  <dd className="text-foreground">Legal document check</dd>
                  <dt>Amount</dt>
                  <dd className="text-foreground">₹5,000</dd>
                </dl>
              </div>
              <div className="stack mt-3 w-full">
                <span style={at(0, 5)} className="scene-in flex flex-wrap justify-end gap-2">
                  <span className="rounded-[6px] border border-error px-2.5 py-1 text-[11px] font-semibold text-error">
                    Stop
                  </span>
                  <span className="relative rounded-[6px] bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
                    Approve
                    <Press show={at(4, 5)} />
                  </span>
                </span>
                <p style={at(5)} className="scene-in text-right text-[11px] text-success">
                  Proposal drafted. Nothing was sent to the customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AppFrame>
    </Scene>
  );
}

/* ── Pipeline ──────────────────────────────────────────────────────────── */

function Column({
  name,
  dot,
  count,
  total,
  className,
  children,
}: {
  name: string;
  dot: string;
  count: ReactNode;
  total: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col rounded-[12px] bg-sunken p-1.5", className)}>
      <div className="flex items-center justify-between gap-1 px-1 pb-2 text-[11px] font-semibold text-foreground">
        <span className="flex min-w-0 items-center gap-1.5">
          <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", dot)} />
          <span className="truncate">{name}</span>
          <span className="text-subtle">{count}</span>
        </span>
        <span className="shrink-0 tabular-nums text-muted-foreground">{total}</span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Deal({ name, detail, value, className, style, children }: {
  name: string;
  detail: string;
  value: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div style={style} className={cn(box, "relative p-2.5", className)}>
      <p className="truncate text-[12px] font-semibold text-foreground">{name}</p>
      <p className="truncate text-[11px] text-muted-foreground">{detail}</p>
      <p className="mt-1 text-[11px] font-semibold tabular-nums text-foreground">{value}</p>
      {children}
    </div>
  );
}

const swap = (a: string, b: string, step: number) => (
  <span className="stack">
    <span className="scene-in" style={at(0, step)}>{a}</span>
    <span className="scene-in" style={at(step)}>{b}</span>
  </span>
);

export function PipelineScreen() {
  return (
    <Scene
      steps={3}
      timing={[0, 1300, 1300, 1500]}
      label="The ERIX pipeline board for a real estate business: Rohan Mehta's ₹1,85,000 deal is dragged from Enquiry to Site visit booked, the stage totals update, and a reminder automation is scheduled."
    >
      <AppFrame
        title="Pipeline · Real estate"
        nav={2}
        className="h-[25rem]"
        action={
          <span className="flex gap-1 text-[11px]">
            <span className="rounded-[6px] px-2 py-1 text-muted-foreground">List</span>
            <span className="rounded-[6px] bg-accent px-2 py-1 font-semibold text-white">Board</span>
          </span>
        }
      >
        <div className="grid h-full grid-cols-2 items-start gap-2.5 overflow-hidden p-3 sm:p-4 lg:grid-cols-3">
          <Column name="Enquiry" dot="bg-[var(--blue-500)]" count={swap("2", "1", 2)} total={swap("₹3,05,000", "₹1,20,000", 2)}>
            <Deal name="Meera Iyer" detail="2BHK, Wakad" value="₹1,20,000" />
            <Deal name="Rohan Mehta" detail="3BHK, Baner" value="₹1,85,000" style={at(0, 2)} className="scene-in">
              <span
                aria-hidden="true"
                style={at(1, 2)}
                className="scene-in pointer-events-none absolute inset-0 rounded-[10px] shadow-[var(--shadow-md)] ring-2 ring-accent"
              />
            </Deal>
          </Column>
          <Column name="Site visit booked" dot="bg-accent" count={swap("1", "2", 2)} total={swap("₹1,25,000", "₹3,10,000", 2)}>
            <Deal name="Ravi Kumar" detail="Plot, Hinjewadi" value="₹1,25,000" />
            <Deal name="Rohan Mehta" detail="3BHK, Baner" value="₹1,85,000" style={at(2)} className="scene-in scene-x border-accent-border">
              <Pill tone="ai" icon={Workflow} className="scene-in mt-1.5" style={at(3)}>
                Reminder set
              </Pill>
            </Deal>
          </Column>
          <Column name="Shortlisted" dot="bg-[var(--purple-500)]" count="1" total="₹2,40,000" className="hidden lg:flex">
            <Deal name="Isha Shah" detail="Villa, Baner" value="₹2,40,000" />
          </Column>
        </div>
      </AppFrame>
    </Scene>
  );
}

/* ── Invoice ───────────────────────────────────────────────────────────── */

export function InvoiceScreen() {
  return (
    <Scene
      steps={4}
      timing={[0, 1400, 1400, 1400, 1600]}
      label="An ERIX GST invoice for ₹29,500: ₹25,000 plus 9% CGST and 9% SGST. A Razorpay payment link is created, the invoice is sent on WhatsApp, and it turns Paid when the money lands."
    >
      <AppFrame
        title="Invoice INV/26-27/0042"
        nav={3}
        className="h-[25rem]"
        action={
          <span className="stack justify-items-end">
            <Pill className="scene-in" style={at(0, 2)}>Draft</Pill>
            <Pill tone="primary" icon={Send} className="scene-in" style={at(2, 4)}>Sent</Pill>
            <Pill tone="success" icon={CheckCircle2} className="scene-in scene-pop" style={at(4)}>Paid</Pill>
          </span>
        }
      >
        <div className="grid h-full gap-3 overflow-hidden p-3 sm:p-4 md:grid-cols-[1fr_1.25fr]">
          <div className="hidden space-y-2.5 text-[11px] md:block">
            <div>
              <p className="text-muted-foreground">Bill to</p>
              <p className="mt-1 rounded-[6px] border border-border-strong bg-surface px-2 py-1.5 text-foreground">Rohan Mehta</p>
            </div>
            <div>
              <p className="text-muted-foreground">Place of supply</p>
              <p className="mt-1 rounded-[6px] border border-border-strong bg-surface px-2 py-1.5 text-foreground">27 · Maharashtra</p>
              <p className="mt-1 text-subtle">Same state as yours: CGST + SGST. Another state: IGST.</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="relative inline-flex items-center gap-1 rounded-[6px] border border-border-strong bg-surface px-2 py-1 font-semibold text-foreground">
                <Link2 aria-hidden="true" className="size-3" /> Create payment link
                <Press show={at(1, 2)} />
              </span>
              <span className="relative inline-flex items-center gap-1 rounded-[6px] border border-border-strong bg-surface px-2 py-1 font-semibold text-foreground">
                <MessageCircle aria-hidden="true" className="size-3" /> Send on WhatsApp
                <Press show={at(2, 3)} />
              </span>
            </div>
          </div>
          <div className={cn(box, "flex flex-col p-3 text-[11px]")}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[13px] font-bold text-foreground">Sharma Realty</p>
                <p className="text-subtle">Pune · GSTIN 27ABCDE1234F1Z5</p>
              </div>
              <p className="font-display text-[13px] font-bold text-foreground">TAX INVOICE</p>
            </div>
            <div className="mt-2.5 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-y border-border py-2 text-muted-foreground">
              <span className="text-foreground">Booking advance, 3BHK Baner</span>
              <span className="tabular-nums text-foreground">₹25,000</span>
              <span>CGST 9%</span>
              <span className="tabular-nums">₹2,250</span>
              <span>SGST 9%</span>
              <span className="tabular-nums">₹2,250</span>
            </div>
            <p className="mt-2 flex justify-between text-[13px] font-semibold text-foreground">
              <span>Total</span>
              <span className="tabular-nums">₹29,500</span>
            </p>
            <p className="mt-1 text-subtle">Rupees Twenty Nine Thousand Five Hundred Only</p>
            <div className="stack mt-auto w-full pt-2">
              <p style={at(1, 4)} className="scene-in flex items-center gap-1 text-accent">
                <Link2 aria-hidden="true" className="size-3" /> Razorpay payment link ready
              </p>
              <p style={at(4)} className="scene-in flex items-center gap-1 font-semibold text-success">
                <CheckCircle2 aria-hidden="true" className="size-3" /> Paid ₹29,500, marked the moment it landed
              </p>
            </div>
          </div>
        </div>
      </AppFrame>
    </Scene>
  );
}

/* ── Automation (Flow) ─────────────────────────────────────────────────── */

function Node({
  icon: Icon,
  kicker,
  title,
  ai,
  status,
  className,
}: {
  icon: IconComponent;
  kicker: string;
  title: string;
  ai?: boolean;
  status?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(box, "flex min-w-0 items-center gap-2 p-2", className)}>
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-[6px]",
          ai ? "bg-ai-subtle text-ai" : "bg-accent-muted text-accent",
        )}
      >
        <Icon aria-hidden="true" className="size-3.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] text-subtle">{kicker}</span>
        <span className="block truncate text-[11px] font-semibold text-foreground">{title}</span>
      </span>
      {status}
    </div>
  );
}

const done = (step: number) => (
  <CheckCircle2 aria-hidden="true" style={at(step)} className="scene-in scene-pop size-3.5 shrink-0 text-success" />
);
const line = "mx-auto h-3 w-px bg-border-strong @min-[36rem]:mx-0 @min-[36rem]:h-px @min-[36rem]:w-4 @min-[36rem]:shrink-0";

export function FlowScreen() {
  return (
    <Scene
      steps={5}
      timing={[0, 1000, 1100, 1600, 1100, 1400]}
      label="An ERIX automation: when a new contact is added, a WhatsApp welcome message is sent, then it waits up to a day for a reply. Nobody replied, so a follow-up goes out. Each step shows as done, live."
    >
      <AppFrame
        title="New enquiry follow-up"
        nav={4}
        className="h-[25rem]"
        action={
          <Pill tone="success">
            <LiveDot className="mr-0.5" /> On
          </Pill>
        }
      >
        <div className="@container flex h-full flex-col justify-center gap-4 p-3 sm:p-5">
          <div className="flex flex-col @min-[36rem]:flex-row @min-[36rem]:items-center">
            <Node icon={Zap} kicker="When" title="New contact added" status={done(1)} className="@min-[36rem]:w-[24%]" />
            <span aria-hidden="true" className={line} />
            <Node icon={MessageCircle} kicker="Send WhatsApp" title="Welcome message" status={done(2)} className="@min-[36rem]:w-[24%]" />
            <span aria-hidden="true" className={line} />
            <Node
              icon={Clock}
              kicker="Wait for a reply"
              title="Up to 1 day"
              ai
              className="@min-[36rem]:w-[24%]"
              status={
                <span className="stack">
                  <Pill tone="warning" className="scene-in" style={at(3, 4)}>Waiting</Pill>
                  {done(4)}
                </span>
              }
            />
            <span aria-hidden="true" className={line} />
            <div className="flex min-w-0 flex-col gap-2 @min-[36rem]:flex-1">
              <Node icon={UserRound} kicker="Replied" title="Update contact: Interested" className="opacity-60" />
              <Node icon={MessageCircle} kicker="No reply" title="Send a follow-up" status={done(5)} className="border-accent-border" />
            </div>
          </div>
          <div className={cn(box, "flex flex-wrap items-center justify-between gap-2 p-2.5 text-[11px]")}>
            <span className="text-foreground">
              Run · <span className="font-semibold">Rohan Mehta</span>
              <span className="text-subtle"> · started 9:42 pm</span>
            </span>
            <span className="stack justify-items-end">
              <Pill tone="primary" className="scene-in" style={at(0, 5)}>Running</Pill>
              <Pill tone="success" icon={CheckCheck} className="scene-in scene-pop" style={at(5)}>Done</Pill>
            </span>
          </div>
        </div>
      </AppFrame>
    </Scene>
  );
}

/* ── Booking page (what the customer sees) ─────────────────────────────── */

const days = [
  ["Tue", "27"],
  ["Wed", "28"],
  ["Thu", "29"],
  ["Fri", "30"],
  ["Sat", "31"],
] as const;
const slots = ["10:00 am", "10:45 am", "11:30 am", "12:15 pm"];

export function BookingScreen() {
  return (
    <Scene
      steps={3}
      timing={[0, 1200, 1300, 1500]}
      label="An ERIX booking page: the visitor picks Saturday 31 October and the 11:30 am slot in India Standard Time; 12:15 pm is already taken. The booking is confirmed, a WhatsApp reminder will follow, and it appears in the owner's upcoming appointments."
    >
      <div className="surface-light grid h-[25rem] overflow-hidden rounded-[12px] bg-background text-foreground shadow-[var(--shadow-lg)] md:grid-cols-[1.35fr_1fr]">
        <div className="flex min-w-0 flex-col bg-surface p-4">
          <p className="text-[11px] text-subtle">Sharma Realty</p>
          <p className="font-display text-[17px] font-bold text-foreground">Book a site visit</p>
          <p className="text-[11px] text-muted-foreground">30 minutes · at the project site</p>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {days.map(([d, n]) => (
              <span key={n} className="relative rounded-[6px] border border-border py-1.5 text-center text-[10px] text-muted-foreground">
                {d}
                <span className="block text-[13px] font-semibold text-foreground">{n}</span>
                {n === "31" && (
                  <span
                    aria-hidden="true"
                    style={at(1)}
                    className="scene-in scene-pop absolute -inset-px rounded-[6px] border-2 border-accent bg-accent-muted/40"
                  />
                )}
              </span>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {slots.map((s) => (
              <span
                key={s}
                className={cn(
                  "relative rounded-[6px] border py-2 text-center text-[11px] font-semibold",
                  s === "12:15 pm" ? "border-border text-subtle line-through" : "border-border-strong text-foreground",
                )}
              >
                {s === "12:15 pm" ? "12:15 pm · booked" : s}
                {s === "11:30 am" && (
                  <span
                    aria-hidden="true"
                    style={at(2)}
                    className="scene-in scene-pop absolute -inset-px flex items-center justify-center rounded-[6px] bg-accent text-white"
                  >
                    11:30 am
                  </span>
                )}
              </span>
            ))}
          </div>
          <div className="stack mt-auto w-full pt-3">
            <p style={at(0, 3)} className="scene-in text-[10px] text-subtle">
              Times in India Standard Time
            </p>
            <p
              style={at(3)}
              className="scene-in flex items-start gap-1.5 rounded-[10px] bg-success-subtle p-2 text-[11px] text-success"
            >
              <CheckCircle2 aria-hidden="true" className="mt-px size-3.5 shrink-0" />
              <span>
                <span className="font-semibold">Booked: Sat 31 Oct, 11:30 am IST.</span> We&apos;ll send a WhatsApp
                reminder before your visit.
              </span>
            </p>
          </div>
        </div>
        <div className="hidden min-w-0 border-l border-border p-4 md:block">
          <p className="text-[12px] font-semibold text-foreground">Appointments · Upcoming</p>
          <ul className="mt-2 space-y-2 text-[11px]">
            <li className={cn(box, "p-2")}>
              <p className="font-semibold text-foreground">Meera Iyer</p>
              <p className="text-muted-foreground">Site visit · Fri 30 Oct, 10:00 am</p>
            </li>
            <li style={at(3)} className={cn(box, "scene-in scene-x border-accent-border p-2")}>
              <p className="flex items-center justify-between gap-1 font-semibold text-foreground">
                Rohan Mehta <Pill tone="success">Confirmed</Pill>
              </p>
              <p className="text-muted-foreground">Site visit · Sat 31 Oct, 11:30 am</p>
            </li>
          </ul>
        </div>
      </div>
    </Scene>
  );
}

/* ── Project documents + click-to-sign (CRM projects / Storage) ──────── */

const docStatus = (
  <span className="stack justify-items-end">
    <Pill tone="warning" icon={Clock} className="scene-in" style={at(0, 2)}>
      Waiting for Ananya
    </Pill>
    <Pill tone="primary" className="scene-in" style={at(2, 4)}>
      Your turn to sign
    </Pill>
    <Pill tone="success" icon={CheckCircle2} className="scene-in scene-pop" style={at(4)}>
      Signed
    </Pill>
  </span>
);

export function DocumentsScreen() {
  return (
    <Scene
      steps={4}
      timing={[0, 1300, 1400, 1100, 1600]}
      label="A project in ERIX with its documents. The client signs the quotation in her portal, then the business signs; the file turns Signed with an audit seal. Other files are shared with the client."
    >
      <AppFrame title="2BHK interiors, Vijay Nagar" nav={2} className="h-[25rem]" action={<Pill tone="success">Active</Pill>}>
        <div className="grid h-full gap-3 overflow-hidden p-3 sm:p-4 md:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0 space-y-2.5">
            <div className={cn(box, "p-3")}>
              <p className="flex justify-between text-[11px] text-muted-foreground">
                <span>Overall progress</span>
                <span>2 of 5 tasks done</span>
              </p>
              <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-background">
                <span className="block h-full w-2/5 rounded-full bg-accent" />
              </span>
            </div>
            <p className="pt-1 text-[12px] font-semibold text-foreground">Documents</p>
            <div className={cn(box, "relative p-3")}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="truncate text-[12px] font-semibold text-foreground">Quotation 2BHK interiors.pdf</span>
                {docStatus}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Client signs first, then you</p>
              <span className="relative mt-2 inline-flex">
                <span style={at(2, 4)} className="scene-in rounded-[6px] bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
                  Sign
                </span>
                <Press show={at(3, 4)} />
              </span>
            </div>
            <div className={cn(box, "flex items-center justify-between gap-2 p-3")}>
              <span className="truncate text-[12px] text-foreground">Floor plan.png</span>
              <Pill>Shared with client</Pill>
            </div>
            <div className={cn(box, "flex items-center justify-between gap-2 p-3")}>
              <span className="truncate text-[12px] text-foreground">Work order.pdf</span>
              <Pill tone="success" icon={CheckCircle2}>Signed</Pill>
            </div>
          </div>
          <div className={cn(box, "hidden min-w-0 flex-col p-3 md:flex")}>
            <p className="text-[12px] font-semibold text-foreground">Client portal</p>
            <p className="mt-1 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
              Ananya Rao <Pill tone="success">Active</Pill>
            </p>
            <ul className="mt-3 space-y-2 text-[11px]">
              <li style={at(2)} className="scene-in rounded-[10px] bg-background p-2 text-foreground">
                Ananya signed the quotation on her phone
              </li>
              <li style={at(4)} className="scene-in rounded-[10px] bg-success-subtle p-2 text-success">
                You signed. Audit seal added to the PDF.
              </li>
            </ul>
            <p className="mt-auto pt-3 text-[10px] text-subtle">Click-to-sign with an audit seal. Not Aadhaar eSign.</p>
          </div>
        </div>
      </AppFrame>
    </Scene>
  );
}

/* ── Lead research (LAIE, invite-only) ─────────────────────────────────── */

const prospects = ["Dental clinic · Benz Circle", "Dental clinic · Labbipet", "Dental clinic · Patamata"];

export function LeadsScreen() {
  return (
    <Scene
      steps={4}
      timing={[0, 1200, 1100, 1100, 1600]}
      label="ERIX LAIE, invite only: a search for dental clinics in Vijayawada lists matching businesses, their contact details are checked one by one, and a drafted outreach message waits for the owner's review."
    >
      <AppFrame title="Lead research" nav={1} className="h-[25rem]" action={<Pill tone="primary">Invite only</Pill>}>
        <div className="flex h-full flex-col gap-3 overflow-hidden p-3 sm:p-4">
          <p className="rounded-[6px] border border-border-strong bg-surface px-2.5 py-1.5 text-[12px] text-foreground">
            Dental clinics in Vijayawada
          </p>
          <ul className="space-y-2">
            {prospects.map((p, i) => (
              <li key={p} className={cn(box, "flex items-center justify-between gap-2 p-2.5")}>
                <span className="truncate text-[12px] font-semibold text-foreground">{p}</span>
                <span className="stack justify-items-end">
                  <Pill tone="primary" className="scene-in" style={at(0, i + 1)}>Checking</Pill>
                  <Pill tone="success" icon={CheckCircle2} className="scene-in scene-pop" style={at(i + 1)}>
                    Details checked
                  </Pill>
                </span>
              </li>
            ))}
          </ul>
          <div
            style={at(4)}
            className="scene-in mt-auto rounded-[10px] border border-[var(--purple-500)] bg-ai-subtle p-3"
          >
            <p className="flex items-center gap-1 text-[11px] font-semibold text-ai">
              <Sparkles aria-hidden="true" className="size-3" /> Outreach drafted
            </p>
            <p className="mt-1 text-[12px] text-foreground">
              Three first messages are ready. Nothing is sent until you review them.
            </p>
            <span className="mt-2 inline-flex rounded-[6px] bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
              Review
            </span>
          </div>
        </div>
      </AppFrame>
    </Scene>
  );
}

/* ── The engine underneath (ERIX Store, coming soon) ───────────────────── */

const engineEvents = [
  ["queue", "A job added to a queue and run once", "Done"],
  ["cache", "A value read straight from memory", "Hit"],
  ["lock", "A lock held so two workers never clash", "Held"],
  ["event", "A message published to its subscribers", "Delivered"],
] as const;

export function EngineScreen() {
  return (
    <Scene
      steps={4}
      timing={1100}
      hold={3200}
      label="ERIX Store, coming soon: an engine for queues, an in-memory cache, locks and publish-subscribe messages, shown as a live list of events."
    >
      <div className="surface-light h-[25rem] overflow-hidden rounded-[12px] bg-[var(--mk-navy)] p-4 font-mono shadow-[var(--shadow-lg)]">
        <p className="flex items-center justify-between text-[11px] text-[var(--blue-200)]">
          <span>erix-store · live</span>
          <Pill tone="warning">Coming soon</Pill>
        </p>
        <ul className="mt-4 space-y-3">
          {engineEvents.map(([kind, text, result], i) => (
            <li
              key={kind}
              style={at(i + 1)}
              className="scene-in rounded-[10px] border border-[color-mix(in_srgb,var(--ink-inverse)_14%,transparent)] p-3"
            >
              <p className="flex items-center justify-between gap-2 text-[11px]">
                <span className="text-[var(--blue-200)]">{kind}</span>
                <span className="text-[var(--ink-inverse)]">{result}</span>
              </p>
              <p className="mt-1 font-sans text-[12px] text-[var(--ink-inverse)]">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Scene>
  );
}

/* ── WhatsApp broadcast (CRM → Connect) ────────────────────────────────── */

export function BroadcastScreen() {
  return (
    <Scene
      steps={4}
      timing={[0, 1300, 1300, 1500, 1600]}
      label="An ERIX WhatsApp broadcast: the Diwali offer template, approved by WhatsApp, goes to the 1,186 customers tagged diwali, and the broadcast finishes. Meta bills the business directly, with no ERIX markup."
    >
      <AppFrame title="New broadcast" nav={0} className="h-[25rem]">
        <div className="flex h-full flex-col gap-3 overflow-hidden p-3 sm:p-4">
          <div className={cn(box, "p-3")}>
            <p className="text-[11px] text-subtle">Template · approved by WhatsApp</p>
            <p className="mt-1 text-[12px] font-semibold text-foreground">diwali_offer</p>
            <p className="mt-1 rounded-[10px] bg-background p-2 text-[12px] text-foreground">
              Silk sarees from ₹2,499, this week only. Reply here to see the colours.
            </p>
          </div>
          <div className={cn(box, "p-3")}>
            <p className="text-[11px] text-subtle">Audience</p>
            <p className="mt-1 text-[12px] text-foreground">
              Deal status <span className="font-semibold">All contacts</span> · Tag <span className="font-semibold">diwali</span>
            </p>
            <p style={at(1)} className="scene-in mt-2 flex flex-wrap items-center gap-2 text-[12px] text-foreground">
              <Pill tone="primary">1,186 will get this</Pill>
            </p>
          </div>
          <div className={cn(box, "mt-auto p-3")}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-foreground">Diwali festive offer</span>
              <span className="stack justify-items-end">
                <Pill className="scene-in" style={at(0, 2)}>Ready</Pill>
                <Pill tone="primary" icon={Send} className="scene-in" style={at(2, 4)}>Sending</Pill>
                <Pill tone="success" icon={CheckCircle2} className="scene-in scene-pop" style={at(4)}>Sent</Pill>
              </span>
            </div>
            <span className="mt-2.5 block h-1.5 overflow-hidden rounded-full bg-background">
              <span className="stack block h-full">
                <span style={at(2, 3)} className="scene-in block h-full w-1/3 rounded-full bg-accent" />
                <span style={at(3, 4)} className="scene-in block h-full w-2/3 rounded-full bg-accent" />
                <span style={at(4)} className="scene-in block h-full w-full rounded-full bg-success" />
              </span>
            </span>
            <p className="mt-2 text-[11px] text-subtle">Your own WhatsApp account: Meta bills you directly, no ERIX markup.</p>
          </div>
        </div>
      </AppFrame>
    </Scene>
  );
}

/** Screen by key, for data-driven pages (module pages, sub-pages). */
export const SCREENS: Record<ScreenKey, () => ReactNode> = {
  pipeline: PipelineScreen,
  inbox: InboxScreen,
  invoice: InvoiceScreen,
  flow: FlowScreen,
  booking: BookingScreen,
  ai: AiScreen,
  documents: DocumentsScreen,
  leads: LeadsScreen,
  engine: EngineScreen,
};
