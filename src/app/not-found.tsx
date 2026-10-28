import Link from "next/link";
import { Icon } from "@/components/icons";
import { BrandShell } from "@/components/layout/BrandShell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Unmatched URLs render outside the route groups, so the 404 brings the brand chrome itself.
export default function NotFound() {
  return (
    <BrandShell>
      <section data-tone="subtle" className="py-section bg-background flex flex-1 items-center">
        <div className="mx-auto w-full px-gutter max-w-xl text-center">
          <p className="text-[clamp(64px,10vw,112px)] leading-none font-bold tracking-[-0.04em] text-accent">404</p>
          <h1 className="mt-4 text-[clamp(26px,3vw,34px)] tracking-[-0.02em]">Page not found</h1>
          <p className="mx-auto mt-3 max-w-sm text-[16px] text-muted-foreground">
            This page doesn&apos;t exist or has moved. Start again from the home page or see the platform.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className={cn(buttonVariants(), "group")}>
              Go to the home page
              <Icon name="arrow-right" size={16} variant="line" />
            </Link>
            <Link href="/platform" className={buttonVariants({ variant: "ghost" })}>
              See the platform
            </Link>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
