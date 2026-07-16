"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X, Check, ShieldCheck } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
   CookieConsent — GDPR/DPDP-friendly consent banner wired to Google
   Consent Mode v2. Analytics + marketing default to "denied" (set in
   layout head); this component updates consent based on the user's choice
   and remembers it. Essential cookies are always on.

   Reopen from anywhere with:
     window.dispatchEvent(new Event("ecodrix:open-cookie-preferences"))
─────────────────────────────────────────────────────────────────────── */

const STORAGE_KEY = "ecodrix_cookie_consent";
const CONSENT_VERSION = 1;

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
  const [visible, setVisible] = useState(false);
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

  const acceptAll = useCallback(() => {
    persist({ analytics: true, marketing: true });
    setVisible(false);
    setShowPrefs(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    persist({ analytics: false, marketing: false });
    setVisible(false);
    setShowPrefs(false);
  }, []);

  const savePreferences = useCallback(() => {
    persist({ analytics, marketing });
    setVisible(false);
    setShowPrefs(false);
  }, [analytics, marketing]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-300 p-4 sm:p-6"
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-4xl bg-surface border border-foreground/10 p-6 shadow-2xl rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 hidden sm:flex items-center justify-center rounded-lg bg-brand-purple/10 border border-brand-purple/30">
            <Cookie size={18} className="text-brand-purple" />
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
                className="text-brand-purple underline decoration-brand-purple/30 hover:decoration-brand-purple/60"
              >
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="text-brand-purple underline decoration-brand-purple/30 hover:decoration-brand-purple/60"
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
            <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:items-center">
              <button
                onClick={acceptAll}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-accent-foreground text-sm font-semibold bg-[linear-gradient(135deg,var(--color-brand-purple),var(--color-brand-blue))] hover:shadow-[0_0_24px_rgba(43,77,203,0.3)] transition-shadow"
              >
                <Check size={15} /> Accept all
              </button>
              <button
                onClick={rejectNonEssential}
                className="inline-flex items-center justify-center px-5 py-2.5 text-foreground text-sm font-semibold border border-foreground/15 hover:border-foreground/30 transition-colors"
              >
                Reject non-essential
              </button>
              {showPrefs ? (
                <button
                  onClick={savePreferences}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-brand-purple text-sm font-semibold hover:text-foreground transition-colors"
                >
                  <ShieldCheck size={15} /> Save preferences
                </button>
              ) : (
                <button
                  onClick={() => setShowPrefs(true)}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-muted-foreground text-sm font-semibold hover:text-foreground transition-colors"
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
      className={`flex items-start justify-between gap-4 p-3 rounded-lg border border-foreground/8 bg-foreground/2 ${
        disabled ? "opacity-70" : "cursor-pointer hover:border-foreground/15"
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
          className="block w-10 h-5 rounded-full bg-foreground/10 peer-checked:bg-brand-purple/70 transition-colors"
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
