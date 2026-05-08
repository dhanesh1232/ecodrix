"use client";

import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Founder @ NexaClinic",
    content:
      "ECODrIx replaced three tools we were paying for separately. Our WhatsApp follow-ups are fully automated now and we haven't missed a single appointment confirmation in weeks.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  },
  {
    name: "Rohan Sharma",
    role: "Director @ GrowthStack Agency",
    content:
      "The Kanban CRM is genuinely the best part. Every lead from every channel lands in one place, scores automatically, and the team gets notified. We closed 40% more deals last quarter.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
  },
  {
    name: "Ananya Kapoor",
    role: "Co-founder @ ThreadsD2C",
    content:
      "We set up the abandoned cart WhatsApp automation in under an hour. It recovered 18% of our lost carts in the first month. The email sequence on top of that was just extra.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 relative overflow-hidden bg-background"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan/5 blur-[120px] rounded-full -z-10" aria-hidden="true" />

      <div className="wrapper relative z-10">
        <header className="test-header mb-20 text-center max-w-2xl mx-auto">
          <div className="pill mb-6 mx-auto bg-white/5 border-white/10 uppercase tracking-widest text-[10px] font-mono">
            Early Users
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] text-white font-display font-black tracking-tight leading-[1.05] mb-6">
            Trusted by{" "}
            <span className="grad-text">growing businesses.</span>
          </h2>
          <p className="text-[#64647A] text-lg">
            Here&apos;s how real teams are using ECODrIx to automate work and close more deals.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 grid-no-collapse">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="test-card group relative p-1 transition-all duration-500 hover:-translate-y-2 no-collapse"
            >
              {/* Card Background & Clip-path - Enhanced Polygon Style */}
              <div
                className="absolute inset-0 bg-white/5 border border-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 z-0"
                style={{
                  clipPath:
                    "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                }}
              />

              {/* Polygon glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                aria-hidden="true"
                style={{
                  clipPath:
                    "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                  background: "linear-gradient(135deg, rgba(124,110,250,0.1), rgba(34,211,238,0.05))",
                }}
              />

              <div className="relative z-10 p-8 flex flex-col h-full no-collapse">
                {/* Rating */}
                <div className="flex gap-1 mb-6 no-collapse">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>

                <Quote
                  className="text-white/10 mb-6 absolute top-8 right-8"
                  size={60}
                />

                <p className="text-white/80 text-lg leading-relaxed mb-10 flex-1 relative z-10 italic no-collapse">
                  &quot;{t.content}&quot;
                </p>

                <div className="flex items-center gap-4 mt-auto no-collapse">
                  <div 
                    className="relative w-12 h-12 overflow-hidden border border-white/10 bg-white/5 p-px"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)"
                    }}
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)"
                      }}
                    />
                  </div>
                  <div className="no-collapse">
                    <h4 className="text-white font-display font-bold text-base">
                      {t.name}
                    </h4>
                    <p className="text-primary font-mono text-[10px] uppercase tracking-widest">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Polygon Corner */}
              <div
                className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100"
                style={{ 
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                  background: "linear-gradient(135deg, rgba(124,110,250,0.1), transparent)"
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
