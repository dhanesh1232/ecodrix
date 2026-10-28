"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";

// The root error boundary ships with every page, so its icons load only if
// it's ever shown (the icon set is large).
const Icon = dynamic(() => import("@/components/icons").then((m) => m.Icon), { ssr: false });

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
    <section data-tone="subtle" className="py-section bg-background flex flex-1 items-center">
      <div className="mx-auto w-full px-gutter max-w-xl text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-[12px] bg-error-subtle text-error">
          <Icon name="triangle-alert" size={24} variant="solid" />
        </span>
        <h1 className="mt-5 text-[clamp(26px,3vw,34px)] tracking-[-0.02em]">This page didn&apos;t load</h1>
        <p className="mx-auto mt-3 max-w-sm text-[16px] text-muted-foreground">
          Something on our side failed while loading it. Try again, or go back to the home page.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className={buttonVariants()}>
            <Icon name="refresh-cw" size={16} variant="line" />
            Try again
          </button>
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Go to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
