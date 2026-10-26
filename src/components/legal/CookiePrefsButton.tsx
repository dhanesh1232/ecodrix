"use client";

/** Reopens the cookie banner (CookieConsent listens for this event). */
export function CookiePrefsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("ecodrix:open-cookie-preferences"))}
      className={className}
    >
      Cookie preferences
    </button>
  );
}
