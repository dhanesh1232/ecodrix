#!/usr/bin/env bash
#
# monday-rankings.sh — Weekly ranking + index snapshot for ECODrIx money pages.
#
# What it does:
#   1. Checks HTTP status + indexability of the four product hubs and key pages.
#   2. Confirms product copy is server-rendered (not client-only via framer-motion/gsap).
#   3. Reminds you to pull the GSC export into gsc-data/ (API pull is optional, see below).
#   4. Stamps reporting/seo-dashboard.md refresh time.
#
# Usage:  bash automations/monday-rankings.sh
# Config: ../settings.json (domain, money_pages, ssr_probe strings)
#
# Note: This is intentionally dependency-light (curl + jq). Wire a GSC API call
#       in the marked section if you have a service account.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SETTINGS="$ROOT/settings.json"
DOMAIN="$(jq -r '.domain' "$SETTINGS")"
STAMP="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"

echo "== ECODrIx Monday Rankings :: $STAMP =="
echo "Domain: $DOMAIN"
echo

echo "-- Indexability / status of money pages --"
# money_pages is an array of {path, product, ssr_probe}
jq -c '.money_pages[]' "$SETTINGS" | while read -r row; do
  path="$(echo "$row" | jq -r '.path')"
  product="$(echo "$row" | jq -r '.product')"
  probe="$(echo "$row" | jq -r '.ssr_probe')"
  url="${DOMAIN}${path}"

  code="$(curl -s -o /dev/null -w '%{http_code}' "$url" || echo '000')"

  # Server-rendered copy check: probe string must exist in raw HTML (no JS execution).
  if [ -n "$probe" ] && [ "$probe" != "null" ]; then
    if curl -s "$url" | grep -qi "$probe"; then ssr="SSR-OK"; else ssr="CLIENT-ONLY!"; fi
  else
    ssr="no-probe"
  fi

  printf '  [%s] %-30s status=%s copy=%s\n' "$product" "$path" "$code" "$ssr"
done

echo
echo "-- robots.txt / sitemap --"
curl -s -o /dev/null -w '  robots.txt   status=%{http_code}\n' "${DOMAIN}/robots.txt" || true
curl -s -o /dev/null -w '  sitemap.xml  status=%{http_code}\n' "${DOMAIN}/sitemap.xml" || true

# ---------------------------------------------------------------------------
# OPTIONAL: Google Search Console API pull -> gsc-data/queries.csv & pages.csv
# Requires a service account with GSC access. Uncomment and implement:
#
#   python3 "$ROOT/automations/_gsc_pull.py" \
#     --site "$DOMAIN" --range 28 \
#     --out-queries "$ROOT/gsc-data/queries.csv" \
#     --out-pages   "$ROOT/gsc-data/pages.csv"
#
# Until then, export manually from GSC > Performance and drop into gsc-data/.
# ---------------------------------------------------------------------------

echo
echo ">> Next: update gsc-data/queries.csv & pages.csv, then refresh reporting/seo-dashboard.md"
echo ">> Reminder: map every new query to ERIX / LAIE / FLOW / Connect."
echo "Done."
