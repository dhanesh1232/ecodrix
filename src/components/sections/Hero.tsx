"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowRight, Star } from "lucide-react";
import { HeroCanvas } from "../canvas/HeroCanvas";

const words = [
  "Websites",
  "Automations",
  "SaaS Products",
  "WhatsApp CRM",
  "Ad Campaigns",
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

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".h-badge", { y: -20, opacity: 0, duration: 0.6, delay: 0.1 })
          .from(
            ".h-headline .hl",
            { y: 90, opacity: 0, duration: 0.9, stagger: 0.1 },
            "-=0.3",
          )
          .from(".h-sub", { y: 18, opacity: 0, duration: 0.65 }, "-=0.3");

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

        // Stat Counter animation for .h-proof metrics
        gsap.utils.toArray(".stat-number").forEach((el: any) => {
          const target = parseFloat(el.getAttribute("data-target") || "0");
          gsap
            .timeline({
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
              },
            })
            .to(el, {
              innerHTML: target,
              duration: 2.5,
              ease: "power3.out",
              snap: { innerHTML: 1 },
              onUpdate: function () {
                el.innerHTML = Math.round(
                  Number(this.targets()[0].innerHTML),
                ).toString();
              },
            });
        });

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
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden pt-[18vh] pb-[10vh]"
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
          India&apos;s Full-Stack Digital Studio · Est. 2025
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
              {renderGlowText("We Build")}
            </span>
          </span>
          <span className="block overflow-hidden" style={{ height: "1.08em" }}>
            <span ref={wordRef} className="hl block grad-text">
              Websites
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="hl block"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {renderGlowText("That Grow Your Business")}
            </span>
          </span>
        </h1>

        <p
          className="h-sub max-w-[540px] leading-relaxed mb-10"
          style={{ color: "#64647A", fontSize: "18px" }}
        >
          A full-stack digital studio, India — we build websites, run ads,
          automate WhatsApp, run your CRM, and can embed our full SaaS platform
          under your domain.
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
                Explore Our Services
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
                See Platform Demo
              </span>
              <div className="relative flex h-2.5 w-2.5 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22D3EE]"></span>
              </div>
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
