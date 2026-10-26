"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Icon } from "@/components/icons";

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
    <section className="erix-mk-section erix-mk-section--subtle flex flex-1 items-center">
      <div className="wrapper max-w-xl text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-[12px] bg-error-subtle text-error">
          <Icon name="triangle-alert" size={24} variant="solid" />
        </span>
        <h1 className="mt-5 text-[clamp(26px,3vw,34px)] tracking-[-0.02em]">This page didn&apos;t load</h1>
        <p className="mx-auto mt-3 max-w-sm text-[16px] text-muted-foreground">
          Something on our side failed while loading it. Try again, or go back to the home page.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary">
            <Icon name="refresh-cw" size={16} variant="line" />
            Try again
          </button>
          <Link href="/" className="btn-ghost">
            Go to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
