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
      "flex-1 h-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
      "focus:outline-none selection:bg-accent/30 selection:text-accent-foreground",
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
            "phone-input-brand flex items-center w-full h-11 px-4 gap-2 rounded-lg transition-all duration-200",
            "bg-elevated border border-border-strong",
            "hover:border-accent/40",
            "focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25",
            error && "border-error ring-2 ring-error/25",
            className,
          )}
        />
      </div>
    );
  },
);

StyledPhoneInput.displayName = "StyledPhoneInput";
