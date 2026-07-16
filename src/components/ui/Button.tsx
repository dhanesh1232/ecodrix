"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "ghost" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 font-semibold rounded-full px-7 py-3 transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "text-accent-foreground" +
      " bg-[linear-gradient(135deg,var(--color-brand-blue),var(--color-brand-purple))]" +
      " hover:shadow-[0_0_30px_rgba(43,77,203,0.35)] hover:scale-[1.02]",
    ghost:
      "text-muted-foreground border border-border-strong hover:border-accent hover:text-accent bg-transparent",
    outline:
      "text-accent border border-accent/60 hover:bg-accent hover:text-accent-foreground bg-transparent",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
