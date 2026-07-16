"use client";

import { useEffect, useRef, useState } from "react";

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
    const duration = 1800;

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
      className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground tabular-nums"
      style={{ minWidth: `${String(target).length}ch` }}
    >
      {count}
    </span>
  );
}

export function Stats() {
  return (
    <div className="w-full border-y border-border relative z-30">
      <div className="wrapper grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {[
          { target: 60, suffix: "+", label: "API Endpoints" },
          { target: 6, suffix: "", label: "Tools in One Platform" },
          { target: 20, suffix: "+", label: "Automation Triggers" },
          { target: 99, suffix: ".9%", label: "Uptime SLA" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-10 px-4 group"
          >
            <div className="flex items-baseline gap-0.5">
              <Counter target={stat.target} />
              <span className="font-display font-medium text-3xl md:text-4xl text-accent-hover">
                {stat.suffix}
              </span>
            </div>
            <p className="mt-3 text-[13px] text-subtle font-medium tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
