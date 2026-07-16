# Technical SEO — Site Audit (ecodrix.com)

> Stack: Next.js 16.2.5 (App Router, React 19, React Compiler), Tailwind v4, framer-motion + gsap + lenis, deployed on Vercel.
> This audit is scoped to what actually affects ERIX/LAIE/FLOW/Connect discoverability and AI citation — not generic checklist filler.

---

## 1. Crawl & indexability

| Item                             | Expected                                                                      | Check how                             | Status |
| -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------- | :----: |
| `robots.txt` present             | Allows crawl, points to sitemap                                               | `curl https://ecodrix.com/robots.txt` |   ⬜   |
| `sitemap.xml` present            | Lists `/`, `/pricing`, `/erix`, `/laie`, `/flow`, `/connect`, compare pages   | Next.js `app/sitemap.ts`              |   ⬜   |
| Product hubs exist & indexable   | `/erix` `/laie` `/flow` `/connect` return 200, no `noindex`                   | `curl -I` each                        |   ⬜   |
| Canonical tags                   | Self-referential canonical on every money page                                | View source `<link rel=canonical>`    |   ⬜   |
| Trailing-slash / www consistency | One canonical host (`https://ecodrix.com`, no www)                            | Vercel domain config                  |   ⬜   |
| Client-only rendering risk       | Product copy must be in SSR/RSC HTML, not injected only by framer-motion/gsap | View source (not devtools DOM)        |   ⬜   |

**Risk flag — animation libraries:** framer-motion, gsap, and lenis are client-side. If hero/product copy renders only after JS, Google may index thin HTML and AI crawlers (which often don't execute JS) see nothing. **Action:** ensure all product descriptions, FAQ text, and pricing render server-side (RSC/SSG). Animations should decorate already-present text, not supply it.

## 2. Sitemap & routing plan (App Router)

Create `src/app/sitemap.ts` covering:

```
/                         (home)
/pricing                  (INR plans — AI-citable)
/erix                     (WhatsApp CRM hub)
/erix/real-estate         (use case)
/erix/healthcare          (use case)
/laie                     (lead engine hub)
/laie/audit               (free audit lead magnet)
/flow                     (automation hub)
/connect                  (WhatsApp API + integrations hub)
/connect/whatsapp-api-guide
/compare/ecodrix-vs-wati
/compare/ecodrix-vs-aisensy
/compare/ecodrix-vs-interakt
```

Add `app/robots.ts` allowing all, disallowing `/api/`, and referencing the sitemap.

## 3. Core Web Vitals (mobile-first — most Indian SMB traffic is mobile)

| Metric        | Target   | Common offender here                          | Fix                                                       |
| ------------- | -------- | --------------------------------------------- | --------------------------------------------------------- |
| LCP           | < 2.5s   | Large hero + gsap init                        | Prioritize hero text/image via `priority`, defer gsap     |
| INP           | < 200ms  | Heavy JS hydration, framer-motion             | Reduce client components; use RSC; lazy-load animation    |
| CLS           | < 0.1    | Web fonts (Geist), lenis smooth-scroll shifts | `next/font` with fallback metrics; reserve space          |
| TBT / JS size | Minimize | gsap + framer-motion + lenis together         | Audit with `pnpm analyze` (already wired in package.json) |

Run `npm run analyze` (already configured) to find the heaviest client bundles; animation libs are the likely top offenders. Consider loading gsap only on routes that use it.

## 4. On-page essentials per money page

Each of `/erix /laie /flow /connect /pricing` must have:

- Unique `<title>` ≤ 60 chars with product + India intent (e.g., "ERIX — WhatsApp CRM for Indian SMBs | ECODrIx").
- `<meta name="description">` ≤ 155 chars, INR + WhatsApp angle.
- One `<h1>` matching primary keyword.
- Open Graph + Twitter card via Next.js `generateMetadata`.
- Server-rendered FAQ block (drives FAQ schema + AI answers).
- JSON-LD (see `schema.md`).

## 5. Metadata implementation (Next.js pattern)

Use `export const metadata` / `generateMetadata` in each `page.tsx`. Centralize a `siteConfig` (name, url, INR prices, product blurbs from `brand-voice.md`) so titles/descriptions stay consistent and AI-citable.

## 6. Internal linking

- Home links to all four product hubs with descriptive anchor text ("WhatsApp CRM", "AI lead generation", "automation builder", "WhatsApp API").
- Each product hub links to its comparison and use-case pages.
- Comparison pages link back to `/pricing` and the relevant product hub.
- LAIE `/laie/audit` (free audit) links to ERIX signup (lead-magnet → product path).

## 7. Findings log

| Date  | Finding           | Product impact | Severity | Action | Owner |
| ----- | ----------------- | -------------- | :------: | ------ | ----- |
| _tbd_ | _run first crawl_ | —              |    —     | —      | —     |

## 8. Verification commands

```bash
curl -sI https://ecodrix.com/ | head -20
curl -s https://ecodrix.com/robots.txt
curl -s https://ecodrix.com/sitemap.xml | head
# Confirm SSR copy is present without JS:
curl -s https://ecodrix.com/erix | grep -i "whatsapp crm"
```

If the last command returns nothing, product copy is client-only — fix before anything else.
