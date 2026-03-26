import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full px-4 py-3 text-sm text-white transition-all duration-200 outline-none",
        "bg-white/4 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08)]",
        "[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]",
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

export { Input }
