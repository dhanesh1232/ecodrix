"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CTO @ FintechFlow",
    content: "The Ecodrix team didn't just build a website; they delivered a full-scale lead generation engine. Our conversion rate tripled within two months of launching the new platform.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Sarah Chen",
    role: "Founder @ NexaHealth",
    content: "The Kanban CRM integration was a game-changer for us. Being able to track every single lead from the first WhatsApp click to the final consultation has automated 70% of our manual work.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Marcus Thorne",
    role: "Director @ Global Logistics",
    content: "True white-label SaaS capabilities allowed us to spin up 50+ isolated tenant environments in record time. The architectural stability is unmatched in the market today.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".test-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".test-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="py-32 relative overflow-hidden bg-background"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan/5 blur-[120px] rounded-full -z-10" />

      <div className="wrapper relative z-10">
        <header className="test-header mb-20 text-center max-w-2xl mx-auto">
          <div className="pill mb-6 mx-auto bg-white/5 border-white/10 uppercase tracking-widest text-[10px] font-mono">
            Client Success
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] text-white font-display font-black tracking-tight leading-[1.05] mb-6">
            Trusted by the world&apos;s <span className="grad-text">boldest</span> teams.
          </h2>
          <p className="text-[#64647A] text-lg">
            Don&apos;t just take our word for it. Here is how our tech engine is
            powering growth across industries.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="test-card group relative p-1 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Card Background & Clip-path */}
              <div
                className="absolute inset-0 bg-white/5 border border-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 z-0"
                style={{
                  clipPath:
                    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                }}
              />
              
              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>

                <Quote className="text-white/10 mb-6 absolute top-8 right-8" size={60} />

                <p className="text-white/80 text-lg leading-relaxed mb-10 flex-1 relative z-10 italic">
                  &quot;{t.content}&quot;
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white/5 p-px">
                     <img 
                      src={t.image} 
                      alt={t.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-bold text-base">
                      {t.name}
                    </h4>
                    <p className="text-primary font-mono text-[10px] uppercase tracking-widest">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div 
                className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
