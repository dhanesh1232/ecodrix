"use client";

import * as React from "react";
import PhoneInput from "react-phone-number-input";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";

type Size = "sm" | "md" | "lg";
type Variant = "default" | "ghost" | "filled";
type IconPosition = "left" | "right";

export interface StyledPhoneProps extends Omit<
  React.ComponentProps<typeof PhoneInput>,
  "onChange" | "value"
> {
  value?: string;
  onChange?: (value: string | undefined) => void;
  size?: Size;
  variant?: Variant;
  error?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  className?: string;
  country?: string;
  helperText?: string;
}

/**
 * Inner input so we can reuse shadcn input text styles and sizes.
 */
const CustomPhoneInputField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { size?: Size }
>(({ size = "md", className, ...inputProps }, ref) => {
  return (
    <input
      ref={ref}
      {...inputProps}
      data-slot="input"
      className={cn(
        "text-white placeholder:text-[#64647A] selection:bg-primary selection:text-white w-full bg-transparent text-sm",
        "focus-visible:ring-0 focus-visible:outline-none border-none h-full",
        className,
      )}
    />
  );
});
CustomPhoneInputField.displayName = "CustomPhoneInputField";

export const StyledPhoneInput = React.forwardRef<any, StyledPhoneProps>(
  (
    {
      className,
      value,
      onChange,
      size = "md",
      variant = "default",
      error,
      success,
      icon,
      iconPosition = "left",
      country = "IN",
      helperText,
      ...props
    },
    ref,
  ) => {
    // ... (rest of props)

    return (
      <div className="w-full space-y-1.5">
        <div className="relative w-full">
          {icon && iconPosition === "left" && (
            <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2">
              {icon}
            </div>
          )}
          <PhoneInput
            {...props}
            ref={ref}
            international
            defaultCountry={country as any}
            value={value && !value.startsWith("+") ? `+${value}` : value}
            onChange={onChange}
            inputComponent={CustomPhoneInputField as any}
            placeholder="Enter phone number"
            countrySelectProps={{ tabIndex: -1 }}
            className={cn(
              "PhoneInput flex w-full items-center gap-2 px-4 py-0 transition-all duration-200 outline-none",
              "bg-white/4 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08)]",
              "[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]",
              "focus-within:bg-primary/8 focus-within:[box-shadow:inset_0_0_0_1px_rgba(124,110,250,0.5),inset_0_0_20px_rgba(124,110,250,0.1)]",
              error ? "[box-shadow:inset_0_0_0_1px_#ef4444]" : "",
              size === "sm" ? "h-9" : size === "lg" ? "h-12" : "h-11",
              className,
            )}
          />
          {icon && iconPosition === "right" && (
            <div className="text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2">
              {icon}
            </div>
          )}
        </div>

        {helperText && (
          <p
            className={cn(
              "text-[11px]",
              error
                ? "text-destructive"
                : success
                  ? "text-primary/60"
                  : "text-muted-foreground",
            )}
          >
            {helperText}
          </p>
        )}
        <style jsx>{`
          /* react-phone-number-input → shadcn-ish look */
          .PhoneInput {
            /* container classes already handled by Tailwind in className */
          }

          .PhoneInputCountry {
            display: flex;
            align-items: center;
            gap: 0.375rem; /* 6px aka gap-1.5 */
            padding-right: 0.5rem; /* pr-2 */
            border-right-width: 1px;
            border-color: transparent;
          }

          .PhoneInputCountrySelect {
            background-color: transparent;
            color: hsl(var(--foreground));
            font-size: 0.75rem; /* text-xs */
            border: none;
            cursor: pointer;
          }
          .PhoneInputCountrySelect:focus {
            outline: none;
            box-shadow: none;
          }

          .PhoneInputCountryIcon {
            width: 1.25rem; /* w-5 */
            height: 1rem; /* h-4 */
            border-radius: 2px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }

          /* The arrow inside react-phone-number-input is usually an img or svg, 
             depending on version it might be hidden or exist. 
             If it exists, we style or hide it. 
             The reference code applied classes but let's be safe with standards. */
          .PhoneInputCountrySelectArrow {
            color: hsl(var(--muted-foreground));
            margin-left: 0.25rem;
            opacity: 0.5;
          }
        `}</style>
      </div>
    );
  },
);

StyledPhoneInput.displayName = "StyledPhoneInput";
