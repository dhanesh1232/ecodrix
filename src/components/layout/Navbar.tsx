"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Platform", href: "/platform" },
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
          background: scrolled ? "rgba(6, 6, 9, 0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.08)"
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
                width={200}
                height={80}
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
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
                className="text-[13px] font-bold tracking-widest uppercase text-[#888899] hover:text-white transition-all duration-300 relative py-2 overflow-hidden group"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
              className="hidden sm:flex items-center gap-2 h-10 px-6 text-black text-[13px] font-bold uppercase tracking-widest transition-all duration-300 polygon-button group/cta relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
                clipPath:
                  "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
              }}
            >
              <span className="relative z-10 group-hover/cta:text-white transition-colors duration-300">
                Join Waitlist
              </span>
              <ArrowRight
                size={14}
                className="relative z-10 group-hover/cta:text-white group-hover/cta:translate-x-1 transition-all duration-300"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#7C6EFA] to-[#22D3EE] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"
                style={{
                  clipPath:
                    "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                }}
              />
            </a>

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-white polygon-icon"
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
        className="fixed top-0 right-0 bottom-0 w-[300px] z-200 bg-[#0A0A10] border-l border-white/10 p-10 flex flex-col translate-x-full lg:hidden"
      >
        <button
          onClick={() => setOpen(false)}
          className="self-end w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white mb-12 polygon-icon"
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
              className="mob-link text-3xl font-display font-black text-white hover:text-[#7C6EFA] transition-colors"
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
            className="flex items-center justify-center h-14 w-full bg-[#7C6EFA] text-white font-bold polygon-button"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </>
  );
}
