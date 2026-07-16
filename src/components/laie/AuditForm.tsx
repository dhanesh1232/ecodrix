"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ArrowRight, Search, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StyledPhoneInput } from "@/components/ui/phone-input";

/* ──────────────────────────────────────────────────────────────────────
   AuditForm — functional lead capture for the free LAIE audit.
   Submits to the existing public waitlist endpoint, tagged source
   "laie_audit", so the lead lands in the same pipeline as other signups.
   The audited target (website / GBP name) is captured in `company`.
─────────────────────────────────────────────────────────────────────── */

const API_URL =
  process.env.NEXT_PUBLIC_ERIX_SOCKET_URL || "https://api.ecodrix.com";

interface AuditFormData {
  target: string;
  name: string;
  email: string;
  phone: string;
  /** Honeypot — must stay empty. */
  website2: string;
}

export function AuditForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AuditFormData>();

  const onSubmit = async (data: AuditFormData) => {
    // Honeypot: silently succeed for bots without hitting the API.
    if (data.website2) {
      setState("sent");
      return;
    }
    setState("sending");
    setErrorMsg(null);
    try {
      const res = await fetch(`${API_URL}/v1/api/platform/public/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          company: data.target,
          interest: "laie",
          source: "laie_audit",
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && (result.success ?? true)) {
        setState("sent");
        reset();
      } else {
        setState("error");
        setErrorMsg(
          result.message || "Something went wrong. Please try again.",
        );
      }
    } catch {
      setState("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (state === "sent") {
    return (
      <div className="max-w-2xl p-6 flex items-start gap-4 bg-success/6 border border-success/30 rounded-2xl">
        <CheckCircle2 size={22} className="text-success shrink-0 mt-0.5" />
        <div>
          <h3 className="text-foreground font-bold mb-1">
            Audit request received
          </h3>
          <p className="text-subtle text-sm leading-relaxed">
            We&apos;ll run your Google Business Profile and website audit and
            email your prioritized report shortly. Check your inbox (and spam)
            for the full breakdown.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
      <div className="p-4 flex flex-col gap-3 bg-foreground/[0.02] border border-foreground/8 rounded-xl">
        {/* Audit target */}
        <div className="flex items-center gap-2 px-3 bg-foreground/[0.03]">
          <Search size={16} className="text-subtle shrink-0" />
          <Input
            {...register("target", {
              required: "Enter your website or business name",
            })}
            placeholder="yourbusiness.com or Google Business name"
            className="border-0 bg-transparent focus-visible:ring-0"
            aria-label="Website or Google Business name"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            {...register("name", { required: "Required" })}
            placeholder="Your name"
            className="bg-surface border-foreground/8"
            aria-label="Your name"
          />
          <Input
            {...register("email", {
              required: "Required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            })}
            type="email"
            placeholder="you@business.com"
            className="bg-surface border-foreground/8"
            aria-label="Email"
          />
        </div>

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <StyledPhoneInput
              value={field.value}
              onChange={field.onChange}
              error={false}
            />
          )}
        />

        {/* Honeypot (hidden from users) */}
        <input
          {...register("website2")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-accent-foreground text-sm disabled:opacity-60 bg-warning rounded-lg"
        >
          {state === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Requesting…
            </>
          ) : (
            <>
              Run my free audit <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>

      {(errors.target || errors.name || errors.email) && (
        <p className="text-error text-xs mt-2">
          {errors.target?.message ||
            errors.name?.message ||
            errors.email?.message}
        </p>
      )}
      {state === "error" && errorMsg && (
        <p className="text-error text-xs mt-2">{errorMsg}</p>
      )}
      <p className="text-subtle text-xs mt-3">
        No credit card. Full report unlocks with a 14-day ECODrIx trial.
      </p>
    </form>
  );
}
