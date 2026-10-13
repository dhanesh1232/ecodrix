"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Platform", href: "/platform" },
  { label: "Blog", href: "/blog" },
  { label: "Compare", href: "/compare" },
  { label: "About", href: "/about" },
];

/**
 * Site header. The mobile menu is a native <dialog>: focus trap, Escape to
 * close and the backdrop come from the platform.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu after navigating.
  useEffect(() => {
    menu.current?.close();
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-surface/95 backdrop-blur transition-colors",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <nav aria-label="Main" className="wrapper flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2" aria-label="ECODrIx home">
          <Image src="/logo.svg" alt="" width={36} height={36} className="size-9" priority />
          <span className="font-display text-xl font-bold text-foreground">ECODrIx</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-[15px] font-semibold",
                  isActive(l.href)
                    ? "text-accent"
                    : "text-muted-foreground hover:bg-accent-muted hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/#contact" className="btn-primary hidden min-h-10 sm:inline-flex">
            Join the waitlist
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => menu.current?.showModal()}
            aria-label="Open menu"
            className="flex size-10 items-center justify-center rounded-md border border-border text-foreground hover:border-accent lg:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
        </div>
      </nav>

      <dialog
        ref={menu}
        aria-label="Menu"
        onClick={(e) => e.target === menu.current && menu.current?.close()}
        className="ml-auto mr-0 h-dvh max-h-dvh w-[min(320px,85vw)] max-w-none bg-surface p-6 text-foreground backdrop:bg-[rgba(18,21,29,0.48)] lg:hidden"
      >
        <div className="flex h-full flex-col">
          <button
            type="button"
            onClick={() => menu.current?.close()}
            aria-label="Close menu"
            className="flex size-10 items-center justify-center self-end rounded-md border border-border hover:border-accent"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
          <ul className="mt-8 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-3 font-display text-2xl font-semibold",
                    isActive(l.href) ? "bg-accent-muted text-accent" : "hover:bg-accent-muted",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            onClick={() => menu.current?.close()}
            className="btn-primary mt-auto w-full"
          >
            Join the waitlist
          </Link>
        </div>
      </dialog>
    </header>
  );
}
