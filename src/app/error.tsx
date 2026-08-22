"use client";

import { useEffect } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-br-xl bg-error/10 border border-error/30">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="font-display font-bold text-foreground text-2xl mb-3 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted-foreground text-[15px] max-w-sm mx-auto mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or go back to the
          homepage.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="btn-ghost inline-flex items-center gap-2"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
          <a
            href="/"
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Home
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
