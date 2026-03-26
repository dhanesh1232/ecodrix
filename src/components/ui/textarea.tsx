import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="control"
      className={cn(
        "flex min-h-32 w-full px-4 py-3 text-sm text-white transition-all duration-200 outline-none resize-none",
        "bg-white/4 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08)]",
        "[clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]",
        "placeholder:text-[#64647A]",
        "focus-visible:bg-primary/8 focus-visible:[box-shadow:inset_0_0_0_1px_rgba(124,110,250,0.5),inset_0_0_20px_rgba(124,110,250,0.1)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-invalid:[box-shadow:inset_0_0_0_1px_#ef4444]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
