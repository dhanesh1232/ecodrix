"use client";

import { useState, useEffect } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { useForm, Controller } from "react-hook-form";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
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

// ─── Brand constants ──────────────────────────────────────────────────────────
const CLIP_CARD =
  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";
const CLIP_ICON =
  "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)";
const CLIP_BTN =
  "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)";

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
  { icon: BarChart3, title: "CRM Engine", color: "#7C6EFA" },
  { icon: Zap, title: "Automations", color: "#22D3EE" },
  { icon: MessageCircle, title: "WhatsApp", color: "#25D366" },
  { icon: Send, title: "Email", color: "#F59E0B" },
  { icon: Video, title: "Meetings", color: "#EA4335" },
  { icon: Bot, title: "LAIE AI", color: "#A78BFA" },
  { icon: Package, title: "Job Queue", color: "#06B6D4" },
  { icon: Cloud, title: "Storage", color: "#3B82F6" },
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
    fetch(`${API_URL}/api/waitlist`)
      .then((r) => r.json())
      .then((d) => {
        if (d.data?.total) setWaitlistCount(d.data.total);
      })
      .catch(() => {});
  }, []);

  const onSubmit = async (data: FormData) => {
    setState("sending");
    try {
      const res = await fetch(`${API_URL}/api/waitlist`, {
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
      className="relative sep-top py-20 lg:py-28 overflow-hidden"
      style={{ background: "#060608" }}
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[30%] left-[20%] w-[600px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(124,110,250,0.07) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[350px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124, 110, 250, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 110, 250, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="wrapper relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="pill mb-5 text-primary border-primary/20 bg-primary/5 mx-auto">
            <Rocket size={11} />
            Early Access · Limited Spots
          </div>
          <h2
            className="font-display font-black text-white mb-5 tracking-tighter"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            Join the <span className="grad-text">Waitlist.</span>
          </h2>
          <p className="text-[15px] md:text-lg text-[#64647A] leading-relaxed max-w-xl mx-auto">
            Get early access to the full ECODrIx + LAIE platform. Be among the
            first to automate your business end-to-end.
          </p>

          {/* Live counter */}
          {waitlistCount > 0 && (
            <div
              className="mt-6 inline-flex items-center gap-3 px-5 py-2.5"
              style={{
                clipPath: CLIP_BTN,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm text-[#8888A0]">
                <span className="text-white font-display font-bold">
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
              className="group flex items-center gap-2 px-3 py-2 transition-all duration-300 hover:scale-105"
              style={{
                clipPath: CLIP_ICON,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <f.icon
                size={13}
                style={{ color: f.color }}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-[11px] font-mono text-[#8888A0] tracking-wide">
                {f.title}
              </span>
            </div>
          ))}
        </div>

        {/* ── Main content: Form + Side panel ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] gap-4 max-w-5xl mx-auto">
          {/* Form panel — polygon styled */}
          <div
            className="transition-all duration-500"
            style={{
              clipPath: CLIP_CARD,
              background: "#0A0A10",
              border: "1px solid rgba(124,110,250,0.15)",
            }}
          >
            <div className="p-6 sm:p-8 lg:p-10" style={{ clipPath: CLIP_CARD }}>
              {state === "sent" ? (
                /* ── Success state ── */
                <div className="text-center py-12 space-y-5">
                  <div
                    className="w-20 h-20 flex items-center justify-center mx-auto"
                    style={{
                      clipPath: CLIP_ICON,
                      background: "rgba(74, 222, 128, 0.1)",
                      border: "1px solid rgba(74, 222, 128, 0.3)",
                    }}
                  >
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white">
                    You&apos;re on the list!
                  </h3>
                  <div
                    className="inline-flex items-center gap-3 px-6 py-3"
                    style={{
                      clipPath: CLIP_BTN,
                      background: "rgba(124,110,250,0.1)",
                      border: "1px solid rgba(124,110,250,0.3)",
                    }}
                  >
                    <span className="text-sm text-[#8888A0]">Position:</span>
                    <span className="text-3xl font-mono font-black text-primary">
                      #{position}
                    </span>
                  </div>
                  <p className="text-[#64647A] text-sm max-w-sm mx-auto leading-relaxed">
                    We&apos;ll reach out when it&apos;s your turn. Early signups
                    get priority access and exclusive launch pricing.
                  </p>

                  {/* Referral */}
                  {referralCode && (
                    <div
                      className="mt-6 p-5 max-w-sm mx-auto text-left"
                      style={{
                        clipPath: CLIP_CARD,
                        background: "#0D0D14",
                        border: "1px solid rgba(124,110,250,0.2)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Share2 size={14} className="text-primary" />
                        <span className="text-sm font-display font-bold text-white">
                          Move up the queue
                        </span>
                      </div>
                      <p className="text-[11px] text-[#64647A] mb-3">
                        Each friend who joins bumps you up 3 positions.
                      </p>
                      <div className="flex items-center gap-2">
                        <div
                          className="flex-1 px-3 py-2 overflow-hidden"
                          style={{
                            clipPath: CLIP_ICON,
                            background: "#060608",
                            border: "1px solid rgba(124,110,250,0.25)",
                          }}
                        >
                          <span className="text-[11px] font-mono text-primary truncate block">
                            {typeof window !== "undefined"
                              ? `${window.location.origin}?ref=${referralCode}`
                              : ""}
                          </span>
                        </div>
                        <button
                          onClick={copyReferralLink}
                          className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-bold text-primary transition-all duration-300 hover:scale-105"
                          style={{
                            clipPath: CLIP_ICON,
                            background: "rgba(124,110,250,0.1)",
                            border: "1px solid rgba(124,110,250,0.3)",
                          }}
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
                    className="text-primary text-sm hover:underline mt-4 inline-flex items-center gap-1 font-mono"
                  >
                    <ArrowRight size={12} className="rotate-180" /> Back
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="mb-1">
                    <h3 className="text-xl font-display font-black text-white">
                      Reserve your spot
                    </h3>
                    <p className="text-[13px] text-[#64647A] mt-1">
                      No credit card required. We&apos;ll notify you when access
                      opens.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-[#64647A] uppercase text-[10px] tracking-[0.12em] font-mono font-bold">
                        Full Name *
                      </Label>
                      <Input
                        {...register("name", { required: "Required" })}
                        placeholder="John Doe"
                        className="bg-[#0D0D14] border-white/8 focus:border-primary/50 transition-colors"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-[10px] font-mono">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#64647A] uppercase text-[10px] tracking-[0.12em] font-mono font-bold">
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
                        className="bg-[#0D0D14] border-white/8 focus:border-primary/50 transition-colors"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-[10px] font-mono">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-[#64647A] uppercase text-[10px] tracking-[0.12em] font-mono font-bold">
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
                      <Label className="text-[#64647A] uppercase text-[10px] tracking-[0.12em] font-mono font-bold">
                        Company
                      </Label>
                      <Input
                        {...register("company")}
                        placeholder="Your company"
                        className="bg-[#0D0D14] border-white/8 focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#64647A] uppercase text-[10px] tracking-[0.12em] font-mono font-bold">
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
                          <SelectTrigger className="bg-[#0D0D14] border-white/8 focus:border-primary/50">
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
                      <p className="text-red-400 text-[10px] font-mono">
                        {errors.interest.message}
                      </p>
                    )}
                  </div>

                  {/* Submit button — brand polygon style */}
                  <button
                    type="submit"
                    disabled={state !== "idle"}
                    className="w-full group relative overflow-hidden mt-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      clipPath: CLIP_BTN,
                      background:
                        state === "sending"
                          ? "rgba(124,110,250,0.4)"
                          : "linear-gradient(135deg, #7C6EFA, #22D3EE)",
                      padding: "16px 24px",
                    }}
                  >
                    {/* Shimmer effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                        animation: "none",
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2 font-display font-bold text-white text-[15px]">
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

          {/* ── Side panel — polygon styled ── */}
          <div
            style={{
              clipPath: CLIP_CARD,
              background: "#0A0A10",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="p-6 sm:p-7 flex flex-col h-full"
              style={{ clipPath: CLIP_CARD }}
            >
              {/* Contact info */}
              <div className="space-y-5 mb-7">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "contact@ecodrix.com",
                    href: "mailto:contact@ecodrix.com",
                    color: "#7C6EFA",
                  },
                  {
                    icon: BsWhatsapp,
                    label: "WhatsApp",
                    value: "Message us →",
                    href: "https://wa.me/918143963821",
                    color: "#25D366",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Andhra Pradesh · India",
                    sub: "Available globally · IST",
                    color: "#F59E0B",
                  },
                ].map(({ icon: Icon, label, value, href, sub, color }) => (
                  <div key={label} className="flex gap-3 items-start group">
                    <div
                      className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{
                        clipPath: CLIP_ICON,
                        background: `${color}12`,
                        border: `1px solid ${color}25`,
                      }}
                    >
                      <Icon size={14} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#64647A] font-mono uppercase tracking-[0.15em] mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-[13px] text-white/90 hover:text-primary transition-colors duration-300"
                        >
                          {value}
                        </a>
                      ) : (
                        <>
                          <p className="text-[13px] text-white/90">{value}</p>
                          {sub && (
                            <p className="text-[10px] text-[#64647A] mt-0.5">
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
              <div
                className="h-px w-full mb-6"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(124,110,250,0.3), transparent)",
                }}
              />

              {/* Benefits */}
              <div className="mb-7">
                <p className="text-[9px] text-[#64647A] font-mono uppercase tracking-[0.15em] mb-4">
                  Early access includes
                </p>
                <div className="space-y-3">
                  {[
                    {
                      text: "Priority onboarding",
                      icon: Rocket,
                      color: "#4ADE80",
                    },
                    {
                      text: "Exclusive launch pricing",
                      icon: Sparkles,
                      color: "#F59E0B",
                    },
                    {
                      text: "Direct founder support",
                      icon: Users,
                      color: "#22D3EE",
                    },
                    {
                      text: "Full API + SDK access",
                      icon: Package,
                      color: "#7C6EFA",
                    },
                  ].map(({ text, icon: Icon, color }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                        style={{
                          clipPath: CLIP_ICON,
                          background: `${color}12`,
                          border: `1px solid ${color}25`,
                        }}
                      >
                        <Icon size={11} style={{ color }} />
                      </div>
                      <span className="text-[13px] text-white/80">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="mt-auto flex gap-2">
                {[
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/dhanesh-ecodrix",
                  },
                  { icon: Github, href: "https://github.com/dhanesh1232" },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/erix.dhanesh/",
                  },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center text-[#64647A] hover:text-primary transition-all duration-300 hover:scale-110"
                    style={{
                      clipPath: CLIP_ICON,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
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
