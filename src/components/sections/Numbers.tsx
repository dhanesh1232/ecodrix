"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const stats = [
  {
    value: 9,
    suffix: "+",
    label: "Services Offered",
    note: "All under one roof",
  },
  { value: 3, suffix: "+", label: "Projects Live", note: "India & UK" },
  { value: 20, suffix: "+", label: "Trigger Types", note: "In ECODrIx engine" },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    note: "Repeat engagement",
  },
];

const process = [
  {
    num: "01",
    color: "#7C6EFA",
    title: "Discovery Call",
    desc: "We understand your goals, existing stack, and what success looks like for your business.",
  },
  {
    num: "02",
    color: "#22D3EE",
    title: "Proposal + Scope",
    desc: "You get a clear project scope, timeline, and fixed pricing — no hidden costs.",
  },
  {
    num: "03",
    color: "#4ADE80",
    title: "Design + Build",
    desc: "We design in Figma, build in code, review together. Iterations are fast.",
  },
  {
    num: "04",
    color: "#FB923C",
    title: "Launch + Hand-off",
    desc: "We deploy, configure your domain, and hand over everything — including source code.",
  },
];

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className="stat-num grad-text font-display font-black"
      style={{ fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)", lineHeight: 1 }}
    >
      {count}
    </span>
  );
}

export function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".stat-cell", {
          y: 24,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-band",
            start: "top 82%",
            toggleActions: "play reset play reset",
          },
        });

        gsap.from(".proc-card", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".proc-grid",
            start: "top 80%",
            toggleActions: "play reset play reset",
          },
        });
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
      id="numbers"
      className="relative py-28 overflow-hidden"
      style={{ background: "#060608" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,110,250,0.3), transparent)",
        }}
      />

      <div className="wrapper relative z-10">
        {/* Stats band */}
        <div
          className="stats-band w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "80px",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-cell"
              style={{
                background: "#0D0D14",
                padding: "36px 28px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: "1px",
                  marginBottom: "6px",
                }}
              >
                <Counter target={s.value} />
                <span
                  className="grad-text font-display font-black"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    marginBottom: "4px",
                  }}
                >
                  {s.suffix}
                </span>
              </div>
              <p
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "13px",
                  marginBottom: "4px",
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  color: "#64647A",
                  fontSize: "11px",
                  fontFamily: "monospace",
                }}
              >
                {s.note}
              </p>
            </div>
          ))}
        </div>

        {/* How We Work */}
        <div className="mb-12">
          <div className="pill mb-5">How We Work</div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#fff",
              letterSpacing: "-0.04em",
            }}
          >
            Simple process. <span className="grad-text">No surprises.</span>
          </h2>
        </div>

        <div
          className="proc-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "12px",
          }}
        >
          {process.map((step, i) => (
            <div
              key={i}
              className="proc-card group relative p-px transition-colors duration-300"
              style={{
                clipPath:
                  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                backgroundColor: "rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${step.color}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.07)";
              }}
            >
              <div
                className="h-full w-full flex flex-col"
                style={{
                  padding: "28px",
                  background: "#0D0D14",
                  clipPath:
                    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "12px",
                    color: step.color,
                    display: "block",
                    marginBottom: "16px",
                  }}
                >
                  {step.num}
                </span>
                <h4
                  style={{
                    fontWeight: 700,
                    color: "#fff",
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    color: "#64647A",
                    fontSize: "13px",
                    lineHeight: 1.65,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,110,250,0.2), transparent)",
        }}
      />
    </section>
  );
}
