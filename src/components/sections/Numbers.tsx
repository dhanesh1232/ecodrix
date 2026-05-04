"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Businesses Onboarded",
    note: "Across India & growing",
  },
  {
    value: 6,
    suffix: "",
    label: "Tools, One Platform",
    note: "No switching apps",
  },
  {
    value: 20,
    suffix: "+",
    label: "Automation Triggers",
    note: "In ECODrIx engine",
  },
  {
    value: 99,
    suffix: ".9%",
    label: "Uptime SLA",
    note: "SOC 2 compliant arch",
  },
];

const process = [
  {
    num: "01",
    color: "#7C6EFA",
    title: "Connect Your Business",
    desc: "Onboard in minutes. Import your contacts, connect your WhatsApp number, and set up your pipeline stages. No technical setup required.",
  },
  {
    num: "02",
    color: "#22D3EE",
    title: "Build Your Automations",
    desc: "Use our visual workflow builder to create automation rules. When a lead fills a form → send a WhatsApp → schedule a follow-up → notify your team.",
  },
  {
    num: "03",
    color: "#4ADE80",
    title: "Grow Without Adding Work",
    desc: "As leads come in and deals move through your pipeline, ECODrix handles the follow-up, tracking, and communication automatically. You focus on closing.",
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

  // Removed heavy GSAP animations for better performance

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
        {/* Stats band - Enhanced Polygon Style */}
        <div className="stats-band w-full grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 overflow-hidden mb-20 no-collapse"
             style={{
               clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)"
             }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-cell no-collapse"
              style={{
                background: "#0D0D14",
                padding: "36px 28px",
                textAlign: "center",
                clipPath: i === 0 
                  ? "polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)"
                  : i === stats.length - 1
                  ? "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)"
                  : "none"
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
                className="no-collapse"
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

        {/* How It Works */}
        <div className="mb-12">
          <div className="pill mb-5">How It Works</div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#fff",
              letterSpacing: "-0.04em",
            }}
          >
            Up and running in <span className="grad-text">3 steps.</span>
          </h2>
        </div>

        <div
          className="proc-grid grid-no-collapse"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "12px",
          }}
        >
          {process.map((step, i) => (
            <div
              key={i}
              className="proc-card group relative p-px transition-colors duration-300 no-collapse"
              style={{
                clipPath:
                  "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
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
                className="h-full w-full flex flex-col no-collapse"
                style={{
                  padding: "28px",
                  background: "#0D0D14",
                  clipPath:
                    "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                }}
              >
                {/* Polygon number badge */}
                <div 
                  className="inline-flex items-center justify-center w-8 h-8 mb-4"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                    background: `${step.color}20`,
                    border: `1px solid ${step.color}40`
                  }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "12px",
                      color: step.color,
                      fontWeight: "bold"
                    }}
                  >
                    {step.num}
                  </span>
                </div>
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
