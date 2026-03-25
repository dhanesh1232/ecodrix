"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Menu, X } from "lucide-react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    const items = menuRef.current.querySelectorAll(".mob-link");
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        menuRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.4, ease: "power3.out" },
      );
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          delay: 0.15,
          ease: "power2.out",
          duration: 0.5,
        },
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, {
        y: "-100%",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [open]);

  const nav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "64px",
          display: "flex",
          alignItems: "center",
          transition:
            "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(6,6,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
        }}
      >
        <div
          className="wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              nav("#hero");
            }}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: "#fff",
                letterSpacing: "-0.04em",
              }}
            >
              ECO
            </span>
            <span
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                background: "linear-gradient(135deg, #7C6EFA, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.04em",
              }}
            >
              DrIx
            </span>
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#7C6EFA",
                marginLeft: "2px",
                boxShadow: "0 0 8px rgba(124,110,250,0.8)",
                animation: "pulse 2s infinite",
              }}
            />
          </a>

          {/* Desktop links */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "36px" }}
            className="hidden md:flex"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  nav(l.href);
                }}
                className="nav-link-line text-sm font-medium text-[#64647A] transition-colors duration-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                nav("#contact");
              }}
              className="hidden md:flex items-center justify-center transition-all duration-300"
              style={{
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                background: "rgba(124,110,250,0.12)",
                boxShadow: "inset 0 0 0 1px rgba(124,110,250,0.25)",
                clipPath:
                  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                color: "#A89EFD",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(124,110,250,0.2)";
                el.style.color = "#fff";
                el.style.boxShadow = "inset 0 0 0 1px rgba(124,110,250,0.4)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(124,110,250,0.12)";
                el.style.color = "#A89EFD";
                el.style.boxShadow = "inset 0 0 0 1px rgba(124,110,250,0.25)";
              }}
            >
              Let&apos;s Talk
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden"
              aria-label="menu"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={menuRef}
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(6,6,8,0.97)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          transform: "translateY(-100%)",
        }}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => {
              e.preventDefault();
              nav(l.href);
            }}
            className="mob-link"
            style={{
              fontSize: "36px",
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 800,
              color: "#fff",
              textDecoration: "none",
              letterSpacing: "-0.04em",
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLAnchorElement;
              el.style.color = "#A89EFD";
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLAnchorElement;
              el.style.color = "#fff";
            }}
          >
            {l.label}
          </a>
        ))}
        <button
          className="mt-4 transition-all duration-300"
          onClick={() => nav("#contact")}
          style={{
            padding: "14px 28px",
            fontSize: "16px",
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(135deg, #7C6EFA, #22D3EE)",
            clipPath:
              "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
          }}
        >
          Let&apos;s Talk →
        </button>
      </div>
    </>
  );
}
