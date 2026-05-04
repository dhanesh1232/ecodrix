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
      className="stat-number font-display font-bold text-5xl lg:text-6xl tracking-tight text-white transition-colors group-hover:text-white"
    >
      {count}
    </span>
  );
}

export function Stats() {
  return (
    <div className="h-proof w-full mx-auto border-y border-[rgba(255,255,255,0.05)] bg-transparent relative z-30 no-collapse">
      {/* Polygon accent lines */}
      <div 
        className="absolute top-0 left-1/4 w-32 h-px opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124,110,250,0.8), transparent)"
        }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-32 h-px opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent)"
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(255,255,255,0.05)] py-2 grid-no-collapse">
        {[
          { target: 50, suffix: "+", label: "businesses onboarded" },
          { target: 6, suffix: "", label: "tools in one platform" },
          { target: 20, suffix: "+", label: "automation triggers" },
          { target: 99, suffix: ".9%", label: "uptime SLA" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-10 px-4 group relative no-collapse"
          >
            {/* Polygon hover effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0 100%)",
                background: "linear-gradient(135deg, rgba(124,110,250,0.05), rgba(34,211,238,0.02))"
              }}
            />
            
            <div className="flex items-baseline gap-1 relative z-10">
              <Counter target={stat.target} />
              <span className="font-display font-medium text-4xl lg:text-5xl text-[#cebfff] transition-colors group-hover:text-primary">
                {stat.suffix}
              </span>
            </div>
            <p className="mt-4 text-[13px] text-text-lo font-medium tracking-wide relative z-10">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
