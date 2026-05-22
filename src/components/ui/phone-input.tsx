"use client";

import * as React from "react";
import PhoneInput from "react-phone-number-input";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";

export interface StyledPhoneProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  error?: boolean;
  className?: string;
  placeholder?: string;
}

/**
 * Custom input field — receives focus on tab
 */
const PhoneInputField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={cn(
      "flex-1 h-full bg-transparent text-sm text-white placeholder:text-[#64647A]",
      "focus:outline-none selection:bg-primary/30 selection:text-white",
      className,
    )}
  />
));
PhoneInputField.displayName = "PhoneInputField";

/**
 * Detect user's country from browser locale/timezone
 */
function detectCountry(): string {
  if (typeof window === "undefined") return "IN";

  try {
    // Try Intl API timezone → country mapping
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzCountryMap: Record<string, string> = {
      "Asia/Kolkata": "IN",
      "Asia/Calcutta": "IN",
      "America/New_York": "US",
      "America/Chicago": "US",
      "America/Denver": "US",
      "America/Los_Angeles": "US",
      "Europe/London": "GB",
      "Europe/Berlin": "DE",
      "Europe/Paris": "FR",
      "Asia/Dubai": "AE",
      "Asia/Singapore": "SG",
      "Australia/Sydney": "AU",
      "Asia/Tokyo": "JP",
      "America/Toronto": "CA",
      "Asia/Shanghai": "CN",
      "Asia/Karachi": "PK",
      "Asia/Dhaka": "BD",
      "Asia/Colombo": "LK",
      "Africa/Lagos": "NG",
      "Africa/Nairobi": "KE",
      "Asia/Riyadh": "SA",
      "Asia/Kuwait": "KW",
      "Asia/Qatar": "QA",
      "Europe/Amsterdam": "NL",
      "Asia/Jakarta": "ID",
      "Asia/Manila": "PH",
      "Asia/Bangkok": "TH",
      "Asia/Kuala_Lumpur": "MY",
    };

    if (tzCountryMap[tz]) return tzCountryMap[tz];

    // Fallback: try navigator.language
    const lang = navigator.language || "";
    const parts = lang.split("-");
    if (parts.length >= 2 && parts[1].length === 2) {
      return parts[1].toUpperCase();
    }
  } catch {
    // Silent fallback
  }

  return "IN";
}

/**
 * Brand-synced phone input with global country selector.
 * - Tab skips country selector, goes directly to number input
 * - Country selector is click-only (tabIndex=-1)
 * - Default country auto-detected from user's locale
 */
export const StyledPhoneInput = React.forwardRef<any, StyledPhoneProps>(
  (
    { className, value, onChange, error, placeholder = "Enter phone number" },
    ref,
  ) => {
    const [defaultCountry, setDefaultCountry] = React.useState<string>("IN");

    React.useEffect(() => {
      setDefaultCountry(detectCountry());
    }, []);

    return (
      <div className="w-full">
        <PhoneInput
          ref={ref}
          international
          defaultCountry={defaultCountry as any}
          value={value}
          onChange={onChange as (value?: string) => void}
          inputComponent={PhoneInputField as any}
          placeholder={placeholder}
          // tabIndex=-1 on country select → tab skips it, only click works
          countrySelectProps={{ tabIndex: -1 }}
          className={cn(
            "phone-input-brand flex items-center w-full h-11 px-4 gap-2 transition-all duration-300",
            "bg-[#0D0D14] [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08)]",
            "[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]",
            "focus-within:[box-shadow:inset_0_0_0_1px_rgba(124,110,250,0.5)]",
            error && "[box-shadow:inset_0_0_0_1px_#ef4444]",
            className,
          )}
        />
      </div>
    );
  },
);

StyledPhoneInput.displayName = "StyledPhoneInput";
