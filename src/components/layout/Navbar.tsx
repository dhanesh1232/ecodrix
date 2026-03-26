"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Product", href: "#product" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
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
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              nav("#hero");
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <span className="font-display font-black text-2xl text-white tracking-tighter">
                ECO
              </span>
              <span className="font-display font-black text-2xl bg-linear-to-r from-[#7C6EFA] to-[#22D3EE] bg-clip-text text-transparent tracking-tighter">
                DrIx
              </span>
              <div className="absolute -right-2 top-1 w-1.5 h-1.5 rounded-full bg-[#7C6EFA] shadow-[0_0_12px_rgba(124,110,250,0.8)] animate-pulse" />
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
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                nav("#contact");
              }}
              className="hidden sm:flex items-center gap-2 h-10 px-6 bg-white text-black text-[13px] font-bold uppercase tracking-widest rounded-full hover:bg-[#7C6EFA] hover:text-white transition-all duration-300"
            >
              Start Project <ArrowRight size={14} />
            </a>

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
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
        className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm opacity-0 invisible transition-all duration-300 lg:hidden"
      />

      {/* Mobile Menu Content */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 bottom-0 w-[300px] z-[200] bg-[#0A0A10] border-l border-white/10 p-10 flex flex-col translate-x-full lg:hidden"
      >
        <button
          onClick={() => setOpen(false)}
          className="self-end w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white mb-12"
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
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              nav("#contact");
            }}
            className="flex items-center justify-center h-14 w-full bg-[#7C6EFA] text-white font-bold rounded-2xl"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </>
  );
}
