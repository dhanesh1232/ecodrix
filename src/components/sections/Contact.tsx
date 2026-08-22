"use client";

import { useState, useEffect } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { useForm, Controller } from "react-hook-form";
import {
  Mail,
  MapPin,
  Sparkles,
  Zap,
  BarChart3,
  MessageCircle,
  Send,
  Video,
  Bot,
  Package,
  Cloud,
  Users,
  CheckCircle2,
  ArrowRight,
  Rocket,
  Copy,
  Share2,
} from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StyledPhoneInput } from "@/components/ui/phone-input";

const API_URL =
  process.env.NEXT_PUBLIC_ERIX_SOCKET_URL || "https://api.ecodrix.com";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
}

const interests = [
  { value: "full_platform", label: "Full Platform (CRM + Automations)" },
  { value: "crm", label: "CRM & Lead Pipeline" },
  { value: "whatsapp", label: "WhatsApp Automation" },
  { value: "email", label: "Email Marketing" },
  { value: "meet", label: "Google Meet Scheduling" },
  { value: "laie", label: "AI Lead Generation (LAIE)" },
  { value: "other", label: "Other / Custom" },
];

const features = [
  { icon: BarChart3, title: "CRM Engine", color: "var(--color-accent)" },
  { icon: Zap, title: "Automations", color: "var(--color-brand-purple)" },
  { icon: MessageCircle, title: "WhatsApp", color: "var(--color-cat-whatsapp)" },
  { icon: Send, title: "Email", color: "var(--color-warning)" },
  { icon: Video, title: "Meetings", color: "var(--color-cat-meeting)" },
  { icon: Bot, title: "LAIE AI", color: "var(--color-brand-purple)" },
  { icon: Package, title: "Job Queue", color: "var(--color-brand-purple)" },
  { icon: Cloud, title: "Storage", color: "var(--color-accent)" },
];

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [position, setPosition] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [waitlistCount, setWaitlistCount] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [referredBy, setReferredBy] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferredBy(ref);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/v1/api/platform/public/waitlist`)
      .then((r) => r.json())
      .then((d) => {
        if (d.data?.total) setWaitlistCount(d.data.total);
      })
      .catch(() => { });
  }, []);

  const onSubmit = async (data: FormData) => {
    setState("sending");
    try {
      const res = await fetch(`${API_URL}/v1/api/platform/public/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "ecodrix_website",
          referral: referredBy || undefined,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setState("sent");
        setPosition(result.data.position);
        setReferralCode(result.data.referralCode || null);
        reset();
      } else {
        setState("idle");
        alert(result.message || "Something went wrong");
      }
    } catch {
      setState("idle");
      alert("Network error. Please try again.");
    }
  };

  const copyReferralLink = () => {
    if (!referralCode) return;
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative sep-top py-20 lg:py-28 overflow-hidden bg-background"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-[600px] h-[400px] blur-[100px] bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--color-accent)_7%,transparent)_0%,transparent_65%)]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[350px] blur-[80px] bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-purple)_5%,transparent)_0%,transparent_60%)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.012] bg-[linear-gradient(color-mix(in_srgb,var(--color-accent)_30%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-accent)_30%,transparent)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <div className="wrapper relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="pill mb-5 text-accent border-accent/20 bg-accent/5 mx-auto">
            <Rocket size={11} />
            Early Access · Limited Spots
          </div>
          <h2 className="font-display font-black text-foreground mb-5 tracking-tighter text-3xl sm:text-4xl">
            Join the <span className="grad-text">Waitlist.</span>
          </h2>
          <p className="text-[15px] md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Get early access to the full ECODrIx + LAIE platform. Be among the
            first to automate your business end-to-end.
          </p>

          {/* Live counter */}
          {waitlistCount > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-none bg-elevated border border-border">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-display font-bold">
                  {waitlistCount}
                </span>{" "}
                people already waiting
              </span>
            </div>
          )}
        </div>

        {/* ── Features strip ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-3xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              style={{ "--c": f.color } as React.CSSProperties}
              className="group flex items-center gap-2 px-3 py-2 transition-all duration-300 hover:scale-105 rounded-none bg-elevated border border-border"
            >
              <f.icon
                size={13}
                className="text-[var(--c)] transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-[11px] font-sans text-muted-foreground tracking-wide">
                {f.title}
              </span>
            </div>
          ))}
        </div>

        {/* ── Main content: Form + Side panel ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] gap-4 max-w-5xl mx-auto">
          {/* Form panel */}
          <div className="transition-all duration-500 rounded-none bg-surface border border-accent/15">
            <div className="p-6 sm:p-8 lg:p-10 rounded-none">
              {state === "sent" ? (
                /* ── Success state ── */
                <div className="text-center py-12 space-y-5">
                  <div className="w-20 h-20 flex items-center justify-center mx-auto rounded-none bg-success/10 border border-success/30">
                    <CheckCircle2 size={32} className="text-success" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-foreground">
                    You&apos;re on the list!
                  </h3>
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-none bg-accent/10 border border-accent/30">
                    <span className="text-sm text-muted-foreground">
                      Position:
                    </span>
                    <span className="text-3xl font-sans font-black text-accent">
                      #{position}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                    We&apos;ll reach out when it&apos;s your turn. Early signups
                    get priority access and exclusive launch pricing.
                  </p>

                  {/* Referral */}
                  {referralCode && (
                    <div className="mt-6 p-5 max-w-sm mx-auto text-left rounded-none bg-surface border border-accent/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Share2 size={14} className="text-accent" />
                        <span className="text-sm font-display font-bold text-foreground">
                          Move up the queue
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mb-3">
                        Each friend who joins bumps you up 3 positions.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 overflow-hidden rounded-none bg-background border border-accent/25">
                          <span className="text-[11px] font-sans text-accent truncate block">
                            {typeof window !== "undefined"
                              ? `${window.location.origin}?ref=${referralCode}`
                              : ""}
                          </span>
                        </div>
                        <button
                          onClick={copyReferralLink}
                          className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-sans font-bold text-accent transition-all duration-300 hover:scale-105 rounded-none bg-accent/10 border border-accent/30"
                        >
                          <Copy size={11} />
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setState("idle");
                      setPosition(null);
                      setReferralCode(null);
                    }}
                    className="text-accent text-sm hover:underline mt-4 inline-flex items-center gap-1 font-sans"
                  >
                    <ArrowRight size={12} className="rotate-180" /> Back
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="mb-1">
                    <h3 className="text-xl font-display font-black text-foreground">
                      Reserve your spot
                    </h3>
                    <p className="text-[13px] text-muted-foreground mt-1">
                      No credit card required. We&apos;ll notify you when access
                      opens.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground uppercase text-[10px] tracking-[0.12em] font-sans font-bold">
                        Full Name *
                      </Label>
                      <Input
                        {...register("name", { required: "Required" })}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-error text-[10px] font-sans">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground uppercase text-[10px] tracking-[0.12em] font-sans font-bold">
                        Email *
                      </Label>
                      <Input
                        {...register("email", {
                          required: "Required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email",
                          },
                        })}
                        type="email"
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="text-error text-[10px] font-sans">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground uppercase text-[10px] tracking-[0.12em] font-sans font-bold">
                        Phone
                      </Label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <StyledPhoneInput
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.phone}
                          />
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground uppercase text-[10px] tracking-[0.12em] font-sans font-bold">
                        Company
                      </Label>
                      <Input
                        {...register("company")}
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground uppercase text-[10px] tracking-[0.12em] font-sans font-bold">
                      What interests you most? *
                    </Label>
                    <Controller
                      name="interest"
                      control={control}
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your interest..." />
                          </SelectTrigger>
                          <SelectContent>
                            {interests.map((i) => (
                              <SelectItem key={i.value} value={i.value}>
                                {i.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.interest && (
                      <p className="text-error text-[10px] font-sans">
                        {errors.interest.message}
                      </p>
                    )}
                  </div>

                  {/* Submit button — brand gradient */}
                  <button
                    type="submit"
                    disabled={state !== "idle"}
                    className={`w-full group relative overflow-hidden mt-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-none px-6 py-4 ${state === "sending"
                      ? "bg-accent/40"
                      : "bg-[linear-gradient(135deg,var(--color-accent),var(--color-brand-purple))]"
                      }`}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(105deg,transparent_40%,color-mix(in_srgb,var(--color-foreground)_15%,transparent)_50%,transparent_60%)]" />
                    <span className="relative z-10 flex items-center justify-center gap-2 font-display font-bold text-accent-foreground text-[15px]">
                      {state === "idle" && (
                        <>
                          <Sparkles size={16} />
                          Join Waitlist
                          <ArrowRight
                            size={15}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </>
                      )}
                      {state === "sending" && (
                        <>
                          <span className="animate-spin">⏳</span> Joining...
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Side panel ── */}
          <div className="rounded-none bg-surface border border-border">
            <div className="p-6 sm:p-7 flex flex-col h-full rounded-none">
              {/* Contact info */}
              <div className="space-y-5 mb-7">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "contact@ecodrix.com",
                    href: "mailto:contact@ecodrix.com",
                    color: "var(--color-accent)",
                  },
                  {
                    icon: BsWhatsapp,
                    label: "WhatsApp",
                    value: "Message us →",
                    href: "https://wa.me/918143963821",
                    color: "var(--color-cat-whatsapp)",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Andhra Pradesh · India",
                    sub: "Available globally · IST",
                    color: "var(--color-warning)",
                  },
                ].map(({ icon: Icon, label, value, href, sub, color }) => (
                  <div
                    key={label}
                    style={{ "--c": color } as React.CSSProperties}
                    className="flex gap-3 items-start group"
                  >
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 rounded-none bg-[color-mix(in_srgb,var(--c)_7%,transparent)] border border-[color-mix(in_srgb,var(--c)_15%,transparent)]">
                      <Icon size={14} className="text-[var(--c)]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground font-sans uppercase tracking-[0.15em] mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-[13px] text-foreground/90 hover:text-accent transition-colors duration-300"
                        >
                          {value}
                        </a>
                      ) : (
                        <>
                          <p className="text-[13px] text-foreground/90">
                            {value}
                          </p>
                          {sub && (
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {sub}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px w-full mb-6 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-accent)_30%,transparent),transparent)]" />

              {/* Benefits */}
              <div className="mb-7">
                <p className="text-[9px] text-muted-foreground font-sans uppercase tracking-[0.15em] mb-4">
                  Early access includes
                </p>
                <div className="space-y-3">
                  {[
                    {
                      text: "Priority onboarding",
                      icon: Rocket,
                      color: "var(--color-success)",
                    },
                    {
                      text: "Exclusive launch pricing",
                      icon: Sparkles,
                      color: "var(--color-warning)",
                    },
                    {
                      text: "Direct founder support",
                      icon: Users,
                      color: "var(--color-brand-purple)",
                    },
                    {
                      text: "Full API + SDK access",
                      icon: Package,
                      color: "var(--color-accent)",
                    },
                  ].map(({ text, icon: Icon, color }) => (
                    <div
                      key={text}
                      style={{ "--c": color } as React.CSSProperties}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 rounded-none bg-[color-mix(in_srgb,var(--c)_7%,transparent)] border border-[color-mix(in_srgb,var(--c)_15%,transparent)]">
                        <Icon size={11} className="text-[var(--c)]" />
                      </div>
                      <span className="text-[13px] text-foreground/80">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="mt-auto flex gap-2">
                {[
                  {
                    icon: FaLinkedin,
                    href: "https://www.linkedin.com/company/ecodrix",
                  },
                  { icon: FaGithub, href: "https://github.com/ecodrix" },
                  {
                    icon: FaInstagram,
                    href: "https://www.instagram.com/ecodr.ix/",
                  },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110 rounded-none bg-elevated border border-border"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
