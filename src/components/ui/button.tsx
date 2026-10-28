import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

// ponytail: the ui/ primitives (accordion, badge, button, navigation-menu, separator, sheet, tabs) were ported by hand from the shadcn radix-nova registry, because `shadcn add` with iconLibrary "erix" emits broken imports (an npm package named `cn`, IconPlaceholder) — use the CLI again once components.json has an icon library it supports.

/**
 * shadcn Button (radix-nova), restyled to the ERIX marketing kit: 8px corners,
 * 44px touch height, verb labels; solid buttons carry the 1px top highlight
 * (shadow-btn). `on-dark:` re-themes them inside a navy band or the blue
 * featured tile: the main action turns white, the second one glass.
 */
// Press: a 2% squeeze in 90ms, then a soft spring back.
const solid =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md px-5 text-[15px] font-[650] transition-[color,background-color,box-shadow,scale] duration-[var(--dur-fast),var(--dur-fast),var(--dur-fast),360ms] ease-[ease-out,ease-out,ease-out,var(--ease-soft-spring)] active:[scale:0.98] active:duration-[var(--dur-fast),var(--dur-fast),var(--dur-fast),90ms] motion-safe:focus-visible:animate-focus";

const variants = cva("[&_svg]:pointer-events-none [&_svg]:shrink-0", {
  variants: {
    variant: {
      primary: cn(
        solid,
        "bg-accent text-white shadow-btn hover:bg-accent-hover",
        "on-dark:bg-white on-dark:text-blue-800 on-dark:hover:bg-blue-50",
        // The featured tile keeps the top highlight; only navy bands swap the shadow.
        "[&:where(.band-navy_*):not(.surface-light_*)]:shadow-[inset_0_-1px_0_rgba(11,27,100,0.08),0_1px_2px_rgba(0,0,0,0.2)]",
      ),
      ghost: cn(
        solid,
        "bg-surface-white text-foreground shadow-[0_0_0_1px_var(--border),var(--shadow-xs)] hover:bg-background hover:shadow-[0_0_0_1px_var(--border-mid),var(--shadow-xs)]",
        "on-dark:bg-[rgba(255,255,255,0.08)] on-dark:text-white on-dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] on-dark:hover:bg-[rgba(255,255,255,0.14)]",
      ),
      /** Quiet text button: header items, icon buttons. */
      plain:
        "inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold text-muted-foreground hover:bg-hover hover:text-foreground",
    },
    size: {
      default: "",
      sm: "min-h-10! px-3.5! text-[14px]!",
      lg: "min-h-12 rounded-lg px-[22px] text-[15.5px]",
      icon: "size-11 shrink-0",
    },
  },
  defaultVariants: { variant: "primary", size: "default" },
});

// cva only joins classes; merge them so a size (lg: 12px corners, 15.5px) beats the base it overrides
// even when `buttonVariants()` is used on its own as a className.
const buttonVariants = (props?: VariantProps<typeof variants>) => cn(variants(props));

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
