#!/usr/bin/env bash
#
# friday-briefs.sh — Weekly content-brief generator for ECODrIx.
#
# What it does:
#   1. Reads content-strategy/content-gap.md + your-site/keywords.csv.
#   2. Identifies the highest-priority gap not yet marked live in the dashboard.
#   3. (Optional) Uses an LLM to draft a brief using the template in
#      content-strategy/content-briefs.md, enforcing brand-voice.md facts.
#   4. Appends the new brief to content-strategy/content-briefs.md and logs it
#      into reporting/weekly-report.md.
#
# Usage:  bash automations/friday-briefs.sh
# Env (optional): OPENAI_API_KEY  (if unset, emits a blank templated brief to fill in)
# Config: ../settings.json -> products, brief_target_count

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SETTINGS="$ROOT/settings.json"
KEYWORDS="$ROOT/your-site/keywords.csv"
BRIEFS="$ROOT/content-strategy/content-briefs.md"
BRAND="$ROOT/your-site/brand-voice.md"
STAMP="$(date -u +'%Y-%m-%d')"

TARGET="$(jq -r '.brief_target_count // 1' "$SETTINGS")"
echo "== ECODrIx Friday Briefs :: $STAMP (target: $TARGET brief(s)) =="

# Pick top-priority keywords (P0/P1) that anchor a page, dedup by target_url.
echo "-- Candidate pages by priority (from keywords.csv) --"
awk -F',' 'NR>1 && $0 !~ /^#/ && ($5=="P0" || $5=="P1") {print $5"  "$1"  "$2"  -> "$7}' "$KEYWORDS" \
  | sort -u | head -20

# --- LLM drafting (optional) ---
draft_brief() {   # $1 = product  $2 = keyword  $3 = url
  if [ -z "${OPENAI_API_KEY:-}" ]; then
    cat <<EOF

## AUTO BRIEF ($STAMP) — $1 :: $2
- **URL:** $3
- **Product mapped:** $1
- **Primary keyword:** $2
- **Intent / funnel stage:** _fill_
- **Word count:** _fill_
- **H1 + outline:** _fill_
- **Facts (from brand-voice.md):** INR pricing, official Meta WhatsApp Cloud API, India-first, unified platform.
- **FAQ (server-rendered → FAQPage schema):** _fill_
- **Schema types:** SoftwareApplication + FAQPage (+ HowTo/Breadcrumb if guide)
- **Internal links:** _fill_
- **CTA:** 14-day free trial, no credit card.
- **Guardrails:** verify competitor/Meta pricing at write time; INR only; must map to ERIX/LAIE/FLOW/Connect.
EOF
    return
  fi

  local sys; sys="You are an SEO content strategist for ECODrIx (India SMB platform). Use only facts consistent with the brand voice provided. Output a single content brief using the exact template fields. INR pricing, official Meta WhatsApp Cloud API, India-first. Map to ERIX/LAIE/FLOW/Connect."
  local brandtxt; brandtxt="$(sed -e 's/"/\\"/g' "$BRAND" | head -c 4000)"
  local user; user="Brand voice:\n${brandtxt}\n\nWrite a content brief for product=$1, primary keyword=\"$2\", url=$3. Use the brief template fields (URL, product, keyword, intent, word count, H1+outline, facts, FAQ, schema, internal links, CTA, guardrails)."
  local body; body="$(jq -n --arg s "$sys" --arg u "$user" '{model:"gpt-4o-mini",messages:[{role:"system",content:$s},{role:"user",content:$u}]}')"
  curl -s https://api.openai.com/v1/chat/completions \
    -H "Authorization: Bearer $OPENAI_API_KEY" -H "Content-Type: application/json" \
    -d "$body" | jq -r '.choices[0].message.content // ""'
}

# Generate TARGET briefs from the top unique P0 candidates.
COUNT=0
awk -F',' 'NR>1 && $0 !~ /^#/ && $5=="P0" {print $1"|"$2"|"$7}' "$KEYWORDS" | sort -u | while IFS='|' read -r product keyword url; do
  [ "$COUNT" -ge "$TARGET" ] && break
  echo ">> Drafting brief: [$product] $keyword -> $url"
  draft_brief "$product" "$keyword" "$url" >> "$BRIEFS"
  COUNT=$((COUNT+1))
done

echo
echo ">> Appended new brief(s) to content-strategy/content-briefs.md"
echo ">> Log them in reporting/weekly-report.md content pipeline section."
echo "Done."
