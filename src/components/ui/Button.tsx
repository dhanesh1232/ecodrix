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
    "relative inline-flex items-center justify-center gap-2 font-semibold rounded-full px-7 py-3 transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "text-white" +
      " bg-[linear-gradient(135deg,#6C63FF,#00D4FF)]" +
      " hover:shadow-[0_0_30px_rgba(108,99,255,0.5)] hover:scale-[1.03]",
    ghost:
      "text-text-muted border border-white/20 hover:border-primary hover:text-primary bg-transparent",
    outline:
      "text-primary border border-primary/60 hover:bg-primary hover:text-white bg-transparent",
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
