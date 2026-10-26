"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X, Check, ShieldCheck } from "@/components/icons";
import { CONSENT_STORAGE_KEY as STORAGE_KEY, CONSENT_VERSION } from "@/lib/legal/consent";

/* ──────────────────────────────────────────────────────────────────────
   CookieConsent — GDPR/DPDP-friendly consent banner wired to Google
   Consent Mode v2. Analytics + marketing default to "denied" (set in
   layout head); this component updates consent based on the user's choice
   and remembers it. Essential cookies are always on.

   The banner is in the server HTML. Until hydration, CSS shows it only
   when the head boot script found no stored choice (<html
   data-consent="ask">), so it paints with the page rather than seconds
   later; after hydration React owns visibility.

   Reopen from anywhere with:
     window.dispatchEvent(new Event("ecodrix:open-cookie-preferences"))
─────────────────────────────────────────────────────────────────────── */

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  version: number;
  ts: number;
}

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function applyConsent(c: { analytics: boolean; marketing: boolean }) {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  });
}

function persist(c: { analytics: boolean; marketing: boolean }) {
  const state: ConsentState = {
    ...c,
    version: CONSENT_VERSION,
    ts: Date.now(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — consent applies for the session only */
  }
  applyConsent(c);
}

export function CookieConsent() {
  // null until hydrated: the boot script and CSS decide; then React does.
  const [visible, setVisible] = useState<boolean | null>(null);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  // On mount: re-apply stored consent, or show the banner for new visitors.
  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
      applyConsent(existing);
      setVisible(false);
    } else {
      setVisible(true);
    }

    const open = () => {
      const cur = readConsent();
      if (cur) {
        setAnalytics(cur.analytics);
        setMarketing(cur.marketing);
      }
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener("ecodrix:open-cookie-preferences", open);
    return () =>
      window.removeEventListener("ecodrix:open-cookie-preferences", open);
  }, []);

  const close = useCallback(() => {
    delete document.documentElement.dataset.consent;
    setVisible(false);
    setShowPrefs(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ analytics: true, marketing: true });
    close();
  }, [close]);

  const rejectNonEssential = useCallback(() => {
    persist({ analytics: false, marketing: false });
    close();
  }, [close]);

  const savePreferences = useCallback(() => {
    persist({ analytics, marketing });
    close();
  }, [analytics, marketing, close]);

  if (visible === false) return null;

  return (
    <div
      data-cookie-banner=""
      data-open={visible ? "" : undefined}
      className="fixed inset-x-0 bottom-0 z-300 p-3 sm:p-6"
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-4 shadow-[var(--shadow-lg)] sm:p-5">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 hidden sm:flex items-center justify-center rounded-md bg-accent-muted border border-accent-border">
            <Cookie size={18} className="text-accent" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h2 className="text-foreground font-bold text-base">
                We value your privacy
              </h2>
              <button
                onClick={rejectNonEssential}
                aria-label="Reject non-essential cookies and close"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              We use essential cookies to run ECODrIx, and — with your consent —
              analytics and marketing cookies to improve it. Read our{" "}
              <Link
                href="/legal/cookie-policy"
                className="text-accent underline hover:text-accent-hover"
              >
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="text-accent underline hover:text-accent-hover"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* Preferences */}
            {showPrefs && (
              <div className="mt-5 space-y-3">
                <ConsentRow
                  title="Strictly necessary"
                  desc="Required for authentication, security, and core features. Always on."
                  checked
                  disabled
                />
                <ConsentRow
                  title="Analytics"
                  desc="Helps us understand usage so we can improve the platform."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <ConsentRow
                  title="Marketing"
                  desc="Used to measure campaigns and show relevant content."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <button
                onClick={acceptAll}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover"
              >
                <Check size={15} /> Accept all
              </button>
              <button
                onClick={rejectNonEssential}
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-border-strong px-4 text-sm font-semibold text-foreground hover:border-accent hover:text-accent"
              >
                Reject non-essential
              </button>
              {showPrefs ? (
                <button
                  onClick={savePreferences}
                  className="inline-flex min-h-10 items-center justify-center gap-2 px-3 text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  <ShieldCheck size={15} /> Save preferences
                </button>
              ) : (
                <button
                  onClick={() => setShowPrefs(true)}
                  className="inline-flex min-h-10 items-center justify-center px-3 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Manage preferences
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start justify-between gap-4 p-3 rounded-md border border-foreground/8 bg-foreground/2 ${disabled ? "opacity-70" : "cursor-pointer hover:border-foreground/15"
        } transition-colors`}
    >
      <span>
        <span className="block text-foreground text-sm font-semibold">
          {title}
        </span>
        <span className="block text-muted-foreground text-xs mt-0.5">
          {desc}
        </span>
      </span>
      <span className="relative shrink-0 mt-1">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span
          className="block w-10 h-5 rounded-full bg-foreground/10 peer-checked:bg-accent transition-colors"
          aria-hidden
        />
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-surface transition-transform peer-checked:translate-x-5"
          aria-hidden
        />
      </span>
    </label>
  );
}
