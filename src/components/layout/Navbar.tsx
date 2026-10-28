"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { CONTACT_CTA } from "@/lib/site";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS, type NavSection, sectionOf } from "./nav-data";

// Both menus load on demand, so neither costs a phone anything on first
// load: the phone sheet (Radix Dialog + Accordion) on the first touch of its
// button, the desktop NavigationMenu once a wide screen is idle.
const MobileNav = dynamic(() => import("./MobileNav"), { ssr: false });
const DesktopNav = dynamic(() => import("./DesktopNav"), { ssr: false });

/* ── Header ──────────────────────────────────────────────────────────── */

/**
 * Site header on the shadcn NavigationMenu (Radix): four sections, each a
 * panel that enters with framer-motion. A pill glides to the open section
 * and the logo's red dot marks the current one (both `layoutId`). Fixed,
 * translucent, and 8px tighter once the page scrolls; a spacer holds its
 * height, so compacting never shifts the page. Phones get a Sheet with an
 * Accordion. Without JavaScript the menus become plain links and the menu
 * button jumps to the footer's site map (globals.css, `scripting`).
 */
export function Navbar({
  icons,
}: {
  /** Drawn by the server (layout.tsx), so the header ships no icon data. */
  icons: { chevron: ReactNode; arrow: ReactNode; menu: ReactNode };
}) {
  const path = usePathname();
  // false until the desktop menu is wanted; a section key when a placeholder
  // had keyboard focus (focus moves to the real trigger).
  const [desktop, setDesktop] = useState<boolean | NavSection>(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuWanted, setMenuWanted] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closedByNav = useRef(false);
  const current = sectionOf(path);

  // Scrolled = the spacer under the header is no longer fully on screen.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(e.intersectionRatio < 1), { threshold: [1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Wide screens: fetch the desktop menu when the browser is idle.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    let idle = 0;
    const load = () => {
      if (!wide.matches) return;
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
      idle = ric(() => setDesktop((d) => d || true));
    };
    load();
    wide.addEventListener("change", load);
    return () => {
      wide.removeEventListener("change", load);
      (window.cancelIdleCallback ?? clearTimeout)(idle);
    };
  }, []);

  // Navigating closes the phone menu.
  const [lastPath, setLastPath] = useState(path);
  if (lastPath !== path) {
    setLastPath(path);
    setMenuOpen(false);
  }

  // The sheet is opened by our own button (not a Radix Trigger), so say
  // where focus goes when it closes: back to the button, or, after a link
  // in it was followed, to the link's #target or the new page's heading.
  const onMenuClosed = (e: Event) => {
    e.preventDefault();
    const hash = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const target = closedByNav.current && (hash || document.querySelector<HTMLElement>("#main-content h1"));
    closedByNav.current = false;
    if (target) {
      if (!target.matches("a, button, input, select, textarea, [tabindex]")) target.tabIndex = -1;
      target.focus({ preventScroll: true });
    } else menuButton.current?.focus();
  };

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-[3.75rem]" />
      <header
        data-scrolled={scrolled || undefined}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-transparent bg-surface/80 backdrop-blur-md backdrop-saturate-150",
          "transition-[background-color,border-color,box-shadow] duration-150 ease-in-out",
          "data-[scrolled]:border-border-soft data-[scrolled]:bg-surface/88 data-[scrolled]:shadow-[0_1px_12px_-4px_rgba(11,27,100,0.12)]",
        )}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-7xl px-gutter flex items-center gap-3 transition-[height] duration-150 ease-in-out lg:gap-6",
            scrolled ? "h-[3.25rem]" : "h-[3.75rem]",
          )}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/logo.svg"
              alt=""
              width={32}
              height={32}
              priority
              className={cn("transition-[width,height] duration-300", scrolled ? "size-7" : "size-8")}
            />
            <span className="font-display text-[19px] font-bold tracking-[-0.02em] text-foreground">ERIX</span>
            {/* The visible word starts the link's name (WCAG 2.5.3, label in name). */}
            <span className="sr-only">by ECODrIx, home</span>
          </Link>

          {/* Wide screens: the Radix menu loads once the page is idle (or on
              first hover/focus); until then these same-looking buttons hold
              its place, so nothing shifts. Phones never load it. */}
          <div className="js-only hidden lg:block">
            {desktop ? (
              <DesktopNav path={path} current={current} focusKey={desktop === true ? undefined : desktop} />
            ) : (
              <ul className="flex items-center gap-0.5" aria-label="Main">
                {NAV_SECTIONS.map((s) => (
                  <li key={s.key}>
                    <button
                      type="button"
                      aria-expanded={false}
                      onPointerEnter={() => setDesktop(true)}
                      onFocus={() => setDesktop(s.key)}
                      className={cn(
                        "relative inline-flex h-9 items-center gap-1 rounded-[8px] px-3 text-[14.5px] font-semibold text-muted-foreground hover:text-foreground",
                        current === s.key && "text-foreground",
                      )}
                    >
                      {s.label}
                      {icons.chevron}
                      {current === s.key && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-[calc(50%-2.5px)] size-[5px] rounded-full bg-[var(--hero-dot)]"
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Without JavaScript the menus can't open: plain links instead. */}
          <nav aria-label="Main" className="nojs-lg hidden items-center gap-1">
            {[
              { label: "Platform", href: "/platform" },
              { label: "Industries", href: "/#verticals" },
              { label: "Blog", href: "/blog" },
              { label: "About", href: "/about" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-[8px] px-3 py-2 text-[14.5px] font-semibold text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <Link href={CONTACT_CTA.href} className={cn(buttonVariants({ size: "sm" }), "group px-3.5 sm:px-4")}>
              {CONTACT_CTA.label}
              {icons.arrow}
            </Link>
            <button
              ref={menuButton}
              type="button"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onPointerEnter={() => setMenuWanted(true)}
              onTouchStart={() => setMenuWanted(true)}
              onFocus={() => setMenuWanted(true)}
              onClick={() => {
                setMenuWanted(true);
                setMenuOpen(true);
              }}
              className="js-only flex size-11 items-center justify-center rounded-[8px] text-foreground hover:bg-hover lg:hidden"
            >
              {icons.menu}
            </button>
            <Link
              href="#site-map"
              className="nojs-sm hidden size-11 items-center justify-center rounded-[8px] text-foreground"
            >
              {icons.menu}
              <span className="sr-only">Site map</span>
            </Link>
          </div>
        </div>
      </header>
      {menuWanted && (
        <MobileNav
          open={menuOpen}
          onOpenChange={setMenuOpen}
          onNavigate={() => (closedByNav.current = true)}
          onCloseAutoFocus={onMenuClosed}
          path={path}
          current={current}
        />
      )}
    </>
  );
}
