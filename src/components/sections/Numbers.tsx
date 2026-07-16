"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 60,
    suffix: "+",
    label: "API Endpoints",
    note: "One unified platform",
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
    color: "var(--color-accent)",
    title: "Connect Your Business",
    desc: "Onboard in minutes. Import your contacts, connect your WhatsApp number, and set up your pipeline stages. No technical setup required.",
  },
  {
    num: "02",
    color: "var(--color-brand-purple)",
    title: "Build Your Automations",
    desc: "Use our visual workflow builder to create automation rules. When a lead fills a form → send a WhatsApp → schedule a follow-up → notify your team.",
  },
  {
    num: "03",
    color: "var(--color-success)",
    title: "Grow Without Adding Work",
    desc: "As leads come in and deals move through your pipeline, ECODrIx handles the follow-up, tracking, and communication automatically. You focus on closing.",
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
      ([entry]) => setInView(entry.isIntersecting),
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
    let raf: number;
    const duration = 2000;
    const animate = (t: number) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setCount(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className="grad-text font-display font-black leading-none text-[clamp(2.5rem,4.5vw,3.8rem)]"
    >
      {count}
    </span>
  );
}

export function Numbers() {
  return (
    <section
      id="numbers"
      className="relative py-28 overflow-hidden bg-background"
    >
      <div className="wrapper relative z-10">
        {/* Stats band */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border mb-20">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-7 py-9 text-center">
              <div className="flex items-end justify-center gap-px mb-1.5">
                <Counter target={s.value} />
                <span className="grad-text font-display font-black mb-1 text-[clamp(1.8rem,3vw,2.6rem)]">
                  {s.suffix}
                </span>
              </div>
              <p className="text-foreground font-bold text-[13px] mb-1">
                {s.label}
              </p>
              <p className="text-muted-foreground text-[11px] font-mono">
                {s.note}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <div className="pill mb-5">How It Works</div>
          <h2 className="font-display font-black text-foreground tracking-[-0.04em] text-[clamp(2rem,4vw,3rem)]">
            Up and running in <span className="grad-text">3 steps.</span>
          </h2>
        </div>

        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
          {process.map((step) => (
            <div
              key={step.num}
              className="group rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-[0_16px_48px_-8px_var(--color-accent-muted)]"
            >
              {/* Number badge — per-step brand color (data-driven) */}
              <div
                className="inline-flex items-center justify-center w-9 h-9 mb-4 rounded-lg font-mono text-xs font-bold"
                style={{
                  background: `color-mix(in srgb, ${step.color} 14%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${step.color} 28%, transparent)`,
                  color: step.color,
                }}
              >
                {step.num}
              </div>
              <h4 className="font-bold text-foreground text-base mb-2">
                {step.title}
              </h4>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
