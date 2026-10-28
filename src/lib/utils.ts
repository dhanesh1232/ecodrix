import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The marketing type scale (`--text-mk-*` in globals.css) are font sizes, not colours;
// without this, `cn("text-mk-h2", "text-white")` would drop the size.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["mk-hero", "mk-hero-lead", "mk-h2", "mk-h3", "mk-cta", "mk-lead", "mk-body", "mk-quote", "mk-quote-lead"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
