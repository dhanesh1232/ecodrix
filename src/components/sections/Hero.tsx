"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { HeroCanvas } from "../canvas/HeroCanvas";

// Lazy load GSAP only when needed
let gsap: any;
let ScrollTrigger: any;

const words = [
  "CRM Systems",
  "Automations",
  "WhatsApp API",
  "Email Campaigns",
  "Cloud Storage",
];

const renderGlowText = (text: string) => {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className="glow-char inline-block"
      style={{ transition: "color 0.8s ease-out, text-shadow 0.8s ease-out" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

export function Hero() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    // Defer GSAP loading until after initial render
    const loadAnimations = async () => {
      try {
        const gsapModule = await import("@/lib/gsap");
        gsap = gsapModule.gsap;
        ScrollTrigger = gsapModule.ScrollTrigger;
        setAnimationsReady(true);
      } catch (error) {
        console.error("Failed to load animations:", error);
      }
    };

    // Load animations after a short delay to prioritize initial render
    const timer = setTimeout(loadAnimations, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!animationsReady || !gsap || !ScrollTrigger) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".h-badge",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.1 },
        )
          .fromTo(
            ".h-headline .hl",
            { y: 90, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
            "-=0.3",
          )
          .fromTo(
            ".h-sub",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65 },
            "-=0.3",
          );

        // Word switcher logic
        let currentIndex = 0;
        const switchWord = () => {
          if (!wordRef.current) return;
          const nextIndex = (currentIndex + 1) % words.length;

          gsap.to(wordRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
              if (wordRef.current) {
                wordRef.current.innerText = words[nextIndex];
                gsap.fromTo(
                  wordRef.current,
                  { y: 20, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
                );
              }
              currentIndex = nextIndex;
            },
          });
        };

        const interval = setInterval(switchWord, 3000);

        // Stat counter animation removed from Hero as it is handled by the Stats component

        // Beam breathe
        gsap.to(".h-beam", {
          opacity: 0.75,
          scaleX: 1.08,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        return () => clearInterval(interval);
      }, sectionRef);
      return () => ctx.revert();
    });
    // Local refresh to handle layout shifts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      mm.revert();
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, [animationsReady]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden pt-[12vh] md:pt-[18vh] pb-[8vh] md:pb-[10vh]"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden
      >
        <div
          className="h-beam"
          style={{
            width: "700px",
            height: "480px",
            background:
              "conic-gradient(from 270deg at 50% 0%, transparent 55deg, rgba(124,110,250,0.3) 85deg, rgba(34,211,238,0.12) 115deg, transparent 155deg)",
            filter: "blur(14px)",
            transformOrigin: "50% 0%",
            opacity: 0.9,
          }}
        />
      </div>

      <div
        aria-hidden
        className="absolute top-1/3 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,110,250,0.09) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="absolute inset-0 bg-transparent">
        <HeroCanvas containerRef={sectionRef} />
      </div>

      <div className="relative z-10 text-center px-6 wrapper flex flex-col items-center">
        <div className="h-badge pill mb-2">
          <Star size={9} fill="#7C6EFA" stroke="none" />
          Now in Early Access · Trusted by 50+ Businesses · 99.9% Uptime
        </div>

        <h1
          className="h-headline font-display font-black leading-none"
          style={{
            fontSize: "clamp(2.4rem, 8vw, 5rem)",
            letterSpacing: "-0.04em",
            marginBottom: "16px",
          }}
        >
          <span className="block overflow-hidden">
            <span className="hl block text-white">
              {renderGlowText("One Platform for")}
            </span>
          </span>
          <span className="block overflow-hidden" style={{ height: "1.08em" }}>
            <span ref={wordRef} className="hl block grad-text">
              Every Part of Your Business.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="hl block"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {renderGlowText("Stop Managing Ten Tools.")}
            </span>
          </span>
        </h1>

        <p
          className="h-sub max-w-[600px] leading-relaxed mb-10"
          style={{ color: "#64647A", fontSize: "18px" }}
        >
          CRM, automation, WhatsApp, email marketing, and cloud storage — all in
          one place. Set up in under 15 minutes. No credit card required.
        </p>

        <div className="h-ctas flex flex-col sm:flex-row items-center gap-4 mb-16 relative z-30">
          <button
            onClick={() =>
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative p-px bg-[rgba(255,255,255,0.15)] hover:bg-primary hover:shadow-[0_0_40px_rgba(124,110,250,0.4)] transition-all duration-300 hover:scale-[1.02]"
            style={{
              clipPath:
                "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            }}
          >
            <div
              className="px-8 py-4 bg-background h-full w-full flex items-center gap-2 group-hover:bg-transparent transition-colors duration-300"
              style={{
                clipPath:
                  "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
                Start Free Trial →
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </div>
          </button>

          <button
            onClick={() =>
              document
                .querySelector("#product")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative p-px bg-[rgba(255,255,255,0.15)] hover:bg-cyan hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300"
            style={{
              clipPath:
                "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            }}
          >
            <div
              className="px-8 py-4 bg-background h-full w-full flex items-center gap-3 transition-colors duration-300 group-hover:bg-background/50"
              style={{
                clipPath:
                  "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
              }}
            >
              <span className="text-white font-semibold relative z-10">
                See How It Works ↓
              </span>
            </div>
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #060608)",
        }}
      />
    </section>
  );
}
