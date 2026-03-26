"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BsWhatsapp } from "react-icons/bs";
import { useForm, Controller } from "react-hook-form";
import { Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StyledPhoneInput } from "@/components/ui/phone-input";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".c-head > *",
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: ".c-head", start: "top 85%" },
          },
        );
        gsap.fromTo(
          [".c-form-panel", ".c-info-panel"],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: ".c-grid", start: "top 80%" },
          },
        );
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    setState("sending");
    try {
      const socketUrl =
        process.env.NEXT_PUBLIC_ERIX_SOCKET_URL || "https://api.ecodrix.com";
      const response = await fetch(`${socketUrl}/api/crm/leads/upsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_ERIX_CLIENT_API_KEY || "",
          "x-client-code": process.env.NEXT_PUBLIC_ERIX_CLIENT_CODE || "",
        },
        body: JSON.stringify({
          leadData: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            source: "website",
            message: `Service Interest: ${data.service}\n\nClient Message: ${data.message}`,
          },
          trigger: "website_contact_form",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sync lead");
      }

      console.log("Lead synced successfully:", await response.json());
      setState("sent");
      reset();
      setTimeout(() => setState("idle"), 4000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setState("idle");
      alert("There was an error sending your message. Please try again later.");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative sep-top py-20 lg:py-32 overflow-hidden"
      style={{ background: "#060608" }}
      onMouseMove={(e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onTouchMove={(e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        setMousePos({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        });
        setIsHovering(true);
      }}
      onTouchEnd={() => setIsHovering(false)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes contactMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `,
        }}
      />

      {/* Hidden Marquee revealed by cursor */}
      <div
        className="absolute inset-0 pointer-events-none select-none transition-opacity duration-500 overflow-hidden flex flex-col justify-center gap-6"
        style={{
          zIndex: 0,
          opacity: isHovering ? 1 : 0,
          WebkitMaskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      >
        {Array(8)
          .fill(null)
          .map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex whitespace-nowrap"
              style={{
                animation: `contactMarquee ${30 + (rowIndex % 3) * 5}s linear infinite`,
                animationDirection: rowIndex % 2 === 0 ? "normal" : "reverse",
                width: "max-content",
              }}
            >
              <div className="flex gap-4 pr-4">
                {Array(6)
                  .fill("LET'S BUILD SOMETHING EXTRAORDINARY •")
                  .map((text, i) => (
                    <span
                      key={i}
                      className="text-[12vw] sm:text-[8vw] lg:text-[6vw] font-black uppercase text-transparent bg-clip-text bg-linear-to-r from-primary/20 to-cyan/20 font-display tracking-tighter opacity-40"
                    >
                      {text}
                    </span>
                  ))}
              </div>
              <div className="flex gap-4 pr-4">
                {Array(6)
                  .fill("LET'S BUILD SOMETHING EXTRAORDINARY •")
                  .map((text, i) => (
                    <span
                      key={`dup-${i}`}
                      className="text-[12vw] sm:text-[8vw] lg:text-[6vw] font-black uppercase text-transparent bg-clip-text bg-linear-to-r from-primary/20 to-cyan/20 font-display tracking-tighter opacity-40"
                    >
                      {text}
                    </span>
                  ))}
              </div>
            </div>
          ))}
      </div>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          style={{
            width: "700px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(124,110,250,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="wrapper relative z-10">
        {/* Heading */}
        <div className="c-head text-center mb-16 max-w-3xl mx-auto">
          <div className="pill mb-6 text-primary border-primary/20 bg-primary/5 mx-auto">
            Contact
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tighter">
            Ready to Build{" "}
            <span className="bg-linear-to-r from-primary to-cyan bg-clip-text text-transparent">
              Something?
            </span>
          </h2>
          <p className="text-lg text-[#64647A] leading-relaxed">
            Drop a message and we&apos;ll talk scope, timeline, and budget.{" "}
            <br className="hidden md:block" />
            Usually responds within 2 hours.
          </p>
        </div>

        {/* Two-panel grid */}
        <div className="c-grid flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-2 lg:gap-4">
          {/* Form panel */}
          <div
            className="c-form-panel p-px"
            style={{
              background: "rgba(255,255,255,0.07)",
              clipPath:
                "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
            }}
          >
            <div
              className="bg-[#0D0D14] p-6 sm:p-8 lg:p-10"
              style={{
                clipPath:
                  "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#64647A] uppercase text-[13px] tracking-wider mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      {...register("name", { required: "Required" })}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-[#ff6b6b] text-[11px] mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#64647A] uppercase text-[13px] tracking-wider mb-2 block">
                      Email
                    </Label>
                    <Input
                      {...register("email", {
                        required: "Required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email",
                        },
                      })}
                      type="email"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-[#ff6b6b] text-[11px] mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#64647A] uppercase text-[13px] tracking-wider mb-2 block">
                      Phone Number
                    </Label>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: "Required",
                        validate: (value) =>
                          /^\+?[0-9]{10,15}$/.test(value || "") ||
                          "Invalid phone number",
                      }}
                      render={({ field }) => (
                        <StyledPhoneInput
                          value={field.value}
                          onChange={field.onChange}
                          error={!!errors.phone}
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-[#ff6b6b] text-[11px] mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#64647A] uppercase text-[13px] tracking-wider mb-2 block">
                      Service
                    </Label>
                    <Controller
                      name="service"
                      control={control}
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service..." />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Website Development",
                              "SEO",
                              "WhatsApp Automation",
                              "SaaS Development",
                              "ECODrIx Demo",
                            ].map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.service && (
                      <p className="text-[#ff6b6b] text-[11px] mt-1">
                        {errors.service.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#64647A] uppercase text-[13px] tracking-wider mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    {...register("message", { required: "Required" })}
                    placeholder="Tell us about your project — timeline, budget, goals..."
                  />
                  {errors.message && (
                    <p className="text-[#ff6b6b] text-[11px] mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={state !== "idle"}
                  className="group relative p-px transition-all duration-300 mt-2"
                  style={{
                    clipPath:
                      "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                    background:
                      state !== "idle"
                        ? "rgba(255,255,255,0.1)"
                        : "linear-gradient(135deg, rgba(124,110,250,0.5), rgba(34,211,238,0.5))",
                  }}
                >
                  <div
                    className="w-full flex justify-center items-center py-4 text-white font-semibold transition-all duration-300"
                    style={{
                      background:
                        state !== "idle"
                          ? state === "sent"
                            ? "linear-gradient(135deg, #22c55e, #16a34a)"
                            : "#1A1A24"
                          : "linear-gradient(135deg, #7C6EFA, #22D3EE)",
                      clipPath:
                        "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                      opacity: state === "sending" ? 0.8 : 1,
                    }}
                  >
                    {state === "idle" && "Send Message →"}
                    {state === "sending" && "Sending..."}
                    {state === "sent" && "✓ Message Sent!"}
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Info panel */}
          <div
            className="c-info-panel p-px"
            style={{
              background: "rgba(255,255,255,0.07)",
              clipPath:
                "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              className="bg-[#0D0D14] p-6 sm:p-8 lg:p-10 flex flex-col flex-1"
              style={{
                clipPath:
                  "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  marginBottom: "32px",
                }}
              >
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "contact@ecodrix.com",
                    href: "mailto:contact@ecodrix.com",
                  },
                  {
                    icon: BsWhatsapp,
                    label: "WhatsApp",
                    value: "Message us →",
                    href: "https://wa.me/918143963821",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Andhra Pradesh · India",
                    sub: "Available globally · IST",
                  },
                ].map(({ icon: Icon, label, value, href, sub }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        flexShrink: 0,
                        background: "rgba(124,110,250,0.1)",
                        clipPath:
                          "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                        boxShadow: "inset 0 0 0 1px rgba(124,110,250,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={15} color="#7C6EFA" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#64647A",
                          fontFamily: "monospace",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: "3px",
                        }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          style={{
                            color: "#E0E0F0",
                            fontSize: "14px",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLAnchorElement).style.color =
                              "#7C6EFA";
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLAnchorElement).style.color =
                              "#E0E0F0";
                          }}
                        >
                          {value}
                        </a>
                      ) : (
                        <>
                          <p style={{ color: "#E0E0F0", fontSize: "14px" }}>
                            {value}
                          </p>
                          {sub && (
                            <p
                              style={{
                                color: "#64647A",
                                fontSize: "12px",
                                marginTop: "2px",
                              }}
                            >
                              {sub}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: "24px",
                  marginBottom: "24px",
                }}
              >
                <p
                  style={{
                    color: "#64647A",
                    fontSize: "13px",
                    marginBottom: "10px",
                  }}
                >
                  Prefer a call?
                </p>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#7C6EFA",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <Calendar size={14} /> Schedule a Call →
                </a>
              </div> */}

              <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                {[
                  {
                    icon: Linkedin,
                    label: "Linkedin",
                    href: "www.linkedin.com/in/dhanesh-mekalthuru-5baa9323b",
                  },
                  {
                    icon: Github,
                    label: "Github",
                    href: "https://github.com/dhanesh1232",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    href: "https://www.instagram.com/erix.__.after17_59/",
                  },
                ].map(({ icon: Icon, label, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "rgba(255,255,255,0.04)",
                      clipPath:
                        "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64647A",
                      transition: "all 0.2s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.color = "#7C6EFA";
                      el.style.boxShadow =
                        "inset 0 0 0 1px rgba(124,110,250,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.color = "#64647A";
                      el.style.boxShadow =
                        "inset 0 0 0 1px rgba(255,255,255,0.07)";
                    }}
                    aria-label={label}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
