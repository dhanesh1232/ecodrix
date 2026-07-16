#!/usr/bin/env bash
#
# wednesday-citations.sh — Weekly AI-visibility check for ECODrIx.
#
# What it does:
#   For each buyer prompt in ai-visibility/buyer-queries.csv, query the AI
#   engines (ChatGPT / Perplexity / Gemini via their APIs) and record whether
#   ECODrIx (ERIX/LAIE/FLOW/Connect) is mentioned/cited, and which sources or
#   competitors were cited instead. Appends findings to ai-visibility/citations.md.
#
# Usage:  bash automations/wednesday-citations.sh
# Env (set only what you have; missing engines are skipped):
#   OPENAI_API_KEY, PERPLEXITY_API_KEY, GEMINI_API_KEY
# Config: ../settings.json -> ai_engines, brand_terms, competitor_terms
#
# Dependency-light: bash + jq + curl + python3 (for JSON body building).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SETTINGS="$ROOT/settings.json"
PROMPTS="$ROOT/ai-visibility/buyer-queries.csv"
LOG="$ROOT/ai-visibility/citations.md"
STAMP="$(date -u +'%Y-%m-%d')"

BRAND_REGEX="$(jq -r '.brand_terms | join("|")' "$SETTINGS")"
COMPETITOR_REGEX="$(jq -r '.competitor_terms | join("|")' "$SETTINGS")"

echo "== ECODrIx Wednesday Citations :: $STAMP =="

# --- helper: query one engine, return raw answer text (or empty on skip/error) ---
ask_openai() {   # $1 = prompt
  [ -n "${OPENAI_API_KEY:-}" ] || { echo ""; return; }
  local body; body="$(jq -n --arg p "$1" '{model:"gpt-4o-mini",messages:[{role:"user",content:$p}]}')"
  curl -s https://api.openai.com/v1/chat/completions \
    -H "Authorization: Bearer $OPENAI_API_KEY" -H "Content-Type: application/json" \
    -d "$body" | jq -r '.choices[0].message.content // ""'
}
ask_perplexity() {   # $1 = prompt
  [ -n "${PERPLEXITY_API_KEY:-}" ] || { echo ""; return; }
  local body; body="$(jq -n --arg p "$1" '{model:"sonar",messages:[{role:"user",content:$p}]}')"
  curl -s https://api.perplexity.ai/chat/completions \
    -H "Authorization: Bearer $PERPLEXITY_API_KEY" -H "Content-Type: application/json" \
    -d "$body" | jq -r '.choices[0].message.content // ""'
}
ask_gemini() {   # $1 = prompt
  [ -n "${GEMINI_API_KEY:-}" ] || { echo ""; return; }
  local body; body="$(jq -n --arg p "$1" '{contents:[{parts:[{text:$p}]}]}')"
  curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
    -H "Content-Type: application/json" -d "$body" \
    | jq -r '.candidates[0].content.parts[0].text // ""'
}

{
  echo ""
  echo "### Citation run — $STAMP"
  echo ""
  echo "| Prompt | Engine | ECODrIx cited? | Competitors cited |"
  echo "|--------|--------|:--------------:|-------------------|"
} >> "$LOG"

# --- iterate prompts (skip header + comment lines) ---
tail -n +1 "$PROMPTS" | grep -v '^#' | grep -v '^prompt,' | while IFS=',' read -r prompt rest; do
  prompt="${prompt%\"}"; prompt="${prompt#\"}"
  [ -z "$prompt" ] && continue

  for engine in $(jq -r '.ai_engines[]' "$SETTINGS"); do
    case "$engine" in
      chatgpt)    answer="$(ask_openai "$prompt")" ;;
      perplexity) answer="$(ask_perplexity "$prompt")" ;;
      gemini)     answer="$(ask_gemini "$prompt")" ;;
      *)          answer="" ;;
    esac

    if [ -z "$answer" ]; then cited="skipped"; comps="-";
    else
      if echo "$answer" | grep -qiE "$BRAND_REGEX"; then cited="YES"; else cited="no"; fi
      comps="$(echo "$answer" | grep -oiE "$COMPETITOR_REGEX" | sort -u | paste -sd ';' - )"
      [ -z "$comps" ] && comps="-"
    fi

    printf '  %-45.45s | %-10s | cited=%s | comps=%s\n' "$prompt" "$engine" "$cited" "$comps"
    echo "| ${prompt} | ${engine} | ${cited} | ${comps} |" >> "$LOG"
  done
done

echo
echo ">> Appended results to ai-visibility/citations.md"
echo ">> Next: update ai-visibility/perception.md with any fact drift, and reporting/seo-dashboard.md scoreboard."
echo "Done."
