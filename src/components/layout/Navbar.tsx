"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Platform", href: "/platform" },
  { label: "Compare", href: "/compare" },
  { label: "Brands", href: "/brands" },
  { label: "Founder", href: "/founder" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current) return;

    const items = menuRef.current.querySelectorAll(".mob-link");

    if (open) {
      document.body.style.overflow = "hidden";
      // Overlay fade in
      gsap.to(overlayRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.3,
      });
      // Menu slide in
      gsap.fromTo(
        menuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power4.out" },
      );
      // Items reveal
      gsap.fromTo(
        items,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          delay: 0.2,
          ease: "back.out(1.2)",
          duration: 0.5,
        },
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (overlayRef.current)
            overlayRef.current.style.visibility = "hidden";
        },
      });
    }
  }, [open]);

  const nav = (href: string) => {
    setOpen(false);
    if (!href.startsWith("#")) {
      window.location.href = href;
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: scrolled ? "72px" : "88px",
          display: "flex",
          alignItems: "center",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          background: scrolled ? "rgba(255, 255, 255, 0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(15, 23, 42, 0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="wrapper flex items-center justify-between w-full">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              nav("/");
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative flex items-center">
              <Image
                src="/logo.png"
                alt="ECODrIx"
                width={120}
                height={48}
                className="h-12 w-[120px] object-contain transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  nav(l.href);
                }}
                className="text-[13px] font-semibold tracking-wide text-muted-foreground hover:text-foreground transition-all duration-300 relative py-2 overflow-hidden group"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href="/#contact"
              onClick={(e) => {
                // Smooth scroll only when already on the home page
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  nav("#contact");
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-full text-accent-foreground text-sm font-semibold bg-[linear-gradient(135deg,var(--color-brand-blue),var(--color-brand-purple))] hover:shadow-[0_0_24px_rgba(43,77,203,0.3)] hover:scale-[1.02] transition-all duration-300 group/cta"
            >
              Join Waitlist
              <ArrowRight
                size={14}
                className="group-hover/cta:translate-x-1 transition-transform duration-300"
              />
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-surface border border-border text-foreground hover:border-accent transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-150 bg-black/60 backdrop-blur-sm opacity-0 invisible transition-all duration-300 lg:hidden"
      />

      {/* Mobile Menu Content */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 bottom-0 w-[300px] z-200 bg-surface border-l border-foreground/10 p-10 flex flex-col translate-x-full lg:hidden"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="self-end w-11 h-11 flex items-center justify-center rounded-lg bg-surface border border-border text-foreground mb-12 hover:border-accent transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                nav(l.href);
              }}
              className="mob-link text-3xl font-display font-black text-foreground hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="mt-auto">
          <a
            href="/#contact"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                nav("#contact");
              }
            }}
            className="flex items-center justify-center h-14 w-full rounded-full bg-[linear-gradient(135deg,var(--color-brand-blue),var(--color-brand-purple))] text-accent-foreground font-semibold"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </>
  );
}
