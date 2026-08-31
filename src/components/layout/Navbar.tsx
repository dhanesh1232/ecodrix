"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { label: "Platform", href: "/platform" },
  { label: "Blogs", href: "/blog" },
  { label: "Compare", href: "/compare" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current) return;
    const items = menuRef.current.querySelectorAll(".mob-link");

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, visibility: "visible", duration: 0.3 });
      gsap.fromTo(menuRef.current, { x: "100%" }, { x: "0%", duration: 0.5, ease: "power4.out" });
      gsap.fromTo(items, { x: 40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, delay: 0.2, ease: "back.out(1.2)", duration: 0.5 });
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => { if (overlayRef.current) overlayRef.current.style.visibility = "hidden"; } });
    }
  }, [open]);

  const nav = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      // Hash scroll on same page
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      // Client-side navigation — no full reload
      router.push(href);
    }
  };

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 left-0 right-0 z-[100] flex items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "h-[72px] bg-[rgba(8,10,14,0.85)] backdrop-blur-xl border-b border-[var(--border)]"
            : "h-[88px] bg-transparent border-b border-transparent"
        )}
      >
        <div className="wrapper flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.svg"
              alt="ECODrIx"
              width={120}
              height={48}
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-black text-xl tracking-tight text-foreground">ECODrIx</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((l) => {
              const isActive = pathname === l.href || pathname?.startsWith(l.href + "/");
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={cn(
                    "group text-[13px] font-display font-semibold tracking-wide transition-colors duration-300 relative",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className={cn(
                    "py-1 relative after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent",
                    "after:transition-transform after:duration-500 after:ease-out",
                    isActive
                      ? "after:scale-x-100 after:origin-left"
                      : "after:scale-x-0 after:origin-right group-hover:after:origin-left group-hover:after:scale-x-100",
                  )}>
                    {l.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              onClick={(e) => { if (window.location.pathname === "/") { e.preventDefault(); nav("#contact"); } }}
              className="hidden text-foreground md:inline-flex items-center gap-2 py-2.5 px-5 text-[var(--canvas)] text-sm font-semibold bg-accent hover:bg-accent-hover transition-colors duration-200 group/cta"
            >
              Join Waitlist
              <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform duration-300" />
            </Link>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-surface border border-border text-foreground hover:border-accent transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm opacity-0 invisible transition-all duration-300 lg:hidden"
      />

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 bottom-0 w-[300px] z-[200] bg-surface border-l border-[var(--border-mid)] p-10 flex flex-col translate-x-full lg:hidden"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="self-end w-11 h-11 flex items-center justify-center bg-surface border border-border text-foreground mb-12 hover:border-accent transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col gap-6">
          {links.map((l) => {
            const isActive = pathname === l.href || pathname?.startsWith(l.href + "/");
            return (
              <Link
                key={l.label}
                href={l.href}
                className={cn(
                  "mob-link text-3xl font-display font-bold transition-colors flex items-center gap-3",
                  isActive ? "text-accent" : "text-foreground hover:text-accent",
                )}
              >
                {isActive && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto">
          <Link
            href="/#contact"
            onClick={(e) => { if (window.location.pathname === "/") { e.preventDefault(); nav("#contact"); } }}
            className="flex items-center justify-center h-14 w-full bg-accent text-[var(--canvas)] font-semibold hover:bg-accent-hover transition-colors"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </>
  );
}
