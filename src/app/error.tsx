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
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative z-10">
        <div
          className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="font-display font-bold text-white text-2xl mb-3 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-[#64647A] text-[15px] max-w-sm mx-auto mb-8 leading-relaxed">
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
