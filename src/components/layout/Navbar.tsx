"use client";

import { ArrowRight, ChevronDown, Menu, X } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { PLATFORM_NAV, PRIMARY_CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { label: "Blog", href: "/blog" },
  { label: "Compare", href: "/compare" },
  { label: "About", href: "/about" },
];

function ModuleIcon({ m, className }: { m: (typeof PLATFORM_NAV)[number]; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-[8px]",
        "ai" in m ? "bg-ai-subtle text-ai" : "bg-accent-muted text-accent",
        className,
      )}
    >
      <m.icon aria-hidden="true" className="size-4" />
    </span>
  );
}

/**
 * Site header. Fixed, with a spacer, so compacting it on scroll never shifts
 * the page. The Platform menu is a native popover (Esc, light dismiss, top
 * layer); the mobile menu is a native modal <dialog> (focus trap, Esc,
 * backdrop, focus returns to the button).
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const platform = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Scrolled = the spacer under the header is no longer fully on screen.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(e.intersectionRatio < 1), {
      threshold: [1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Close both menus after navigating.
  useEffect(() => {
    menu.current?.close();
    if (platform.current?.matches(":popover-open")) platform.current.hidePopover();
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);
  const closePlatform = () => {
    if (platform.current?.matches(":popover-open")) platform.current.hidePopover();
  };

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-16" />
      <header
        role="header"
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200",
          scrolled
            ? "border-border-soft bg-surface/85 backdrop-blur-sm backdrop-saturate-150 md:backdrop-blur-md"
            : "border-transparent bg-surface",
        )}
      >
        <nav
          aria-label="Main"
          role="navigation"
          className={cn(
            "wrapper flex items-center justify-between gap-6 transition-[height] duration-200 ease-out",
            scrolled ? "h-14" : "h-16",
          )}
        >
          <Link href="/" className="flex items-center gap-2" aria-label="ECODrIx home">
            <Image
              src="/logo.svg"
              alt=""
              width={36}
              height={36}
              priority
              className={cn("transition-[width,height] duration-200", scrolled ? "size-8" : "size-9")}
            />
            <span className="font-display text-xl font-bold text-foreground">ERIX</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            <li>
              <button
                type="button"
                popoverTarget="platform-menu"
                aria-expanded={platformOpen}
                aria-controls="platform-menu"
                className={cn(
                  "flex items-center gap-1 rounded-[8px] px-3 py-2 text-[14.5px] font-semibold",
                  isActive("/platform") || platformOpen
                    ? "text-accent"
                    : "text-muted-foreground hover:bg-accent-muted hover:text-foreground",
                )}
              >
                Platform
                <ChevronDown
                  aria-hidden="true"
                  className={cn("size-4 transition-transform duration-200", platformOpen && "rotate-180")}
                />
              </button>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "rounded-[8px] px-3 py-2 text-[14.5px] font-semibold",
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
            <Link href={PRIMARY_CTA.href} className="btn-primary group hidden min-h-10 sm:inline-flex">
              {PRIMARY_CTA.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => {
                menu.current?.showModal();
                setMenuOpen(true);
              }}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex size-11 items-center justify-center rounded-[8px] text-foreground ring-1 ring-border hover:bg-hover lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </nav>

        {/* Platform menu (desktop) */}
        <div
          id="platform-menu"
          ref={platform}
          popover="auto"
          onToggle={(e) => setPlatformOpen(e.newState === "open")}
          className="menu-pop fixed inset-x-0 top-[4.25rem] bottom-auto m-0 mx-auto w-[min(54rem,calc(100vw-2rem))] rounded-[16px] bg-surface p-3 text-foreground shadow-[var(--shadow-lg)]"
        >
          <ul className="grid gap-1 sm:grid-cols-2">
            {PLATFORM_NAV.map((m, i) => (
              <li key={m.key} style={{ "--i": i } as CSSProperties}>
                <Link
                  href={m.href}
                  onClick={closePlatform}
                  className="flex gap-3 rounded-[10px] p-3 hover:bg-hover"
                >
                  <ModuleIcon m={m} />
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
                      {m.name}
                      {m.status !== "live" && <StatusBadge status={m.status} />}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{m.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="flex items-end p-3" style={{ "--i": PLATFORM_NAV.length } as CSSProperties}>
              <Link
                href="/platform"
                onClick={closePlatform}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
              >
                See how it all fits together
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* Mobile menu */}
      <dialog
        id="mobile-menu"
        ref={menu}
        aria-label="Menu"
        onClose={() => setMenuOpen(false)}
        onClick={(e) => e.target === menu.current && menu.current?.close()}
        className="sheet mr-0 ml-auto h-dvh max-h-dvh w-[min(360px,88vw)] max-w-none bg-surface p-0 text-foreground lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-3">
            <span className="font-display text-lg font-bold">Menu</span>
            <button
              type="button"
              onClick={() => menu.current?.close()}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-[8px] ring-1 ring-border hover:bg-hover"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <p className="px-2 text-sm font-semibold text-muted-foreground">Platform</p>
            <ul className="mt-2">
              {PLATFORM_NAV.map((m, i) => (
                <li key={m.key} style={{ "--i": i } as CSSProperties}>
                  <Link
                    href={m.href}
                    onClick={() => menu.current?.close()}
                    className="flex items-center gap-3 rounded-[8px] px-2 py-2.5 hover:bg-hover"
                  >
                    <ModuleIcon m={m} className="size-8" />
                    <span className="font-semibold">{m.name}</span>
                    {m.status !== "live" && <StatusBadge status={m.status} className="ml-auto" />}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6">
              {[{ label: "All of ERIX", href: "/platform" }, ...links].map((l, i) => (
                <li key={l.href} style={{ "--i": PLATFORM_NAV.length + i } as CSSProperties}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={cn(
                      "block rounded-[8px] px-2 py-3 font-display text-xl font-semibold",
                      pathname === l.href ? "bg-accent-muted text-accent" : "hover:bg-hover",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <Link href={PRIMARY_CTA.href} onClick={() => menu.current?.close()} className="btn-primary w-full">
              {PRIMARY_CTA.label}
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
