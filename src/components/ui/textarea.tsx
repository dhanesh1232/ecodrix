import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="control"
      className={cn(
        "flex min-h-32 w-full px-4 py-3 text-sm text-foreground transition-all duration-200 outline-none resize-none",
        "bg-foreground/4 [box-shadow:inset_0_0_0_1px_rgba(15, 23, 42,0.08)]",
        "rounded-none",
        "placeholder:text-muted-foreground",
        "focus-visible:bg-accent/8 focus-visible:[box-shadow:inset_0_0_0_1px_rgba(43, 77, 203,0.5),inset_0_0_20px_rgba(43, 77, 203,0.1)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-invalid:[box-shadow:inset_0_0_0_1px_#ef4444]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
