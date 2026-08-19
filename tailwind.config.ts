import type { Config } from "tailwindcss";

/**
 * ECODrIx Design System — Tailwind Configuration
 *
 * Principles:
 * 1. Engineered restraint — dark-first, minimal chrome, depth from content
 * 2. One accent rule — Blue (#2563EB) is interactive. Purple/Red are brand marks only.
 * 3. Density scales — marketing is spacious, dashboard is compact. Same tokens, different application.
 * 4. Typography contrast — heavy display (Syne 700) vs light body (Inter 400). The gap IS the brand.
 * 5. Zero decoration — no gradients-for-gradients-sake, no shadows-for-depth. Borders + surface steps.
 */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Color System ─────────────────────────────────────────────── */
      colors: {
        // Brand blue — full scale. Only 500-600 used as interactive accent.
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // ← PRIMARY ACCENT
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Purple — brand mark only (logo, badges). Never buttons.
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#7c3aed", // ← BRAND MARK
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        // Red — errors + brand mark (logo tricolor). Never decorative.
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626", // ← ERROR / BRAND MARK
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        // Semantic
        success: { DEFAULT: "#10b981", muted: "rgba(16,185,129,0.1)" },
        warning: { DEFAULT: "#f59e0b", muted: "rgba(245,158,11,0.1)" },
        // Surfaces — referenced via CSS variables for theme switching
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        elevated: "var(--elevated)",
        overlay: "var(--overlay)",
        // Text
        ink: "var(--ink)",
        "ink-secondary": "var(--ink-secondary)",
        "ink-muted": "var(--ink-muted)",
        "ink-disabled": "var(--ink-disabled)",
        // Borders
        hairline: "var(--hairline)",
        "hairline-strong": "var(--hairline-strong)",
        // Accent
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          muted: "var(--accent-muted)",
          fg: "var(--accent-fg)",
        },
      },

      /* ── Typography ───────────────────────────────────────────────── */
      fontFamily: {
        display: ["var(--font-syne)", "Syne", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Display scale — Syne, bold, tight
        "display-xl": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["2.75rem", { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-md": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["1.75rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        // Title scale — Inter, semibold
        "title-lg": ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "title-md": ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "600" }],
        "title-sm": ["1rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        // Body scale — Inter, regular/light
        "body-lg": ["1.0625rem", { lineHeight: "1.65", letterSpacing: "0", fontWeight: "400" }],
        "body-md": ["0.9375rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        // Utility
        label: ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.06em", fontWeight: "600" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "400" }],
        "data": ["1.5rem", { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "700" }],
      },

      /* ── Spacing (4px base) ───────────────────────────────────────── */
      spacing: {
        "0.5": "2px",
        "1": "4px",
        "1.5": "6px",
        "2": "8px",
        "2.5": "10px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "14": "56px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
        "section": "96px",
        "section-sm": "64px",
      },

      /* ── Border Radius — Zero everywhere (BMW sharp geometry) ───── */
      borderRadius: {
        none: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "9999px", /* only exception: circular avatars/dots */
      },

      /* ── Shadows ──────────────────────────────────────────────────── */
      boxShadow: {
        // Minimal — depth from surface-color, not shadow.
        "sm": "0 1px 2px 0 rgba(0,0,0,0.03)",
        "DEFAULT": "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.03)",
        "md": "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)",
        "lg": "0 10px 15px -3px rgba(0,0,0,0.06), 0 4px 6px -4px rgba(0,0,0,0.03)",
        "overlay": "0 20px 40px -8px rgba(0,0,0,0.12)",
      },

      /* ── Max Widths ───────────────────────────────────────────────── */
      maxWidth: {
        "content": "1140px",
        "content-wide": "1320px",
        "prose": "640px",
        "dashboard": "1440px",
      },

      /* ── Animation ────────────────────────────────────────────────── */
      transitionDuration: {
        "fast": "100ms",
        "DEFAULT": "150ms",
        "medium": "200ms",
        "slow": "300ms",
      },
      transitionTimingFunction: {
        "productive": "cubic-bezier(0.2, 0, 0.38, 0.9)",
        "expressive": "cubic-bezier(0.4, 0.14, 0.3, 1)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
