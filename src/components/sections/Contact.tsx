"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useForm } from "react-hook-form";
import {
  Mail,
  MapPin,
  MessageCircle,
  Calendar,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".c-head > *", {
          y: 28,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".c-head", start: "top 85%" },
        });
        gsap.from([".c-form-panel", ".c-info-panel"], {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".c-grid", start: "top 80%" },
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    setState("sending");
    await new Promise((r) => setTimeout(r, 1400));
    console.log(data);
    setState("sent");
    reset();
    setTimeout(() => setState("idle"), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.04)",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
    clipPath:
      "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s",
    fontFamily: "inherit",
  };

  const onFocus = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    e.target.style.background = "rgba(124,110,250,0.08)";
    e.target.style.boxShadow =
      "inset 0 0 0 1px rgba(124,110,250,0.5), inset 0 0 20px rgba(124,110,250,0.1)";
  };
  const onBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    e.target.style.background = "rgba(255,255,255,0.04)";
    e.target.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.08)";
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "#64647A",
    fontSize: "11px",
    fontFamily: "monospace",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "8px",
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative sep-top py-32 overflow-hidden"
      style={{ background: "#060608" }}
    >
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
        <div
          className="c-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "20px",
          }}
        >
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
              style={{
                background: "#0D0D14",
                clipPath:
                  "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
                padding: "40px",
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      {...register("name", { required: "Required" })}
                      placeholder="John Doe"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                    {errors.name && (
                      <p
                        style={{
                          color: "#ff6b6b",
                          fontSize: "11px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      {...register("email", {
                        required: "Required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email",
                        },
                      })}
                      type="email"
                      placeholder="john@example.com"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                    {errors.email && (
                      <p
                        style={{
                          color: "#ff6b6b",
                          fontSize: "11px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Service</label>
                  <select
                    {...register("service", { required: "Required" })}
                    style={{ ...inputStyle, appearance: "none" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  >
                    <option value="" style={{ background: "#0D0D14" }}>
                      Select a service...
                    </option>
                    {[
                      "Website Development",
                      "SEO",
                      "WhatsApp Automation",
                      "SaaS Development",
                      "ECODrIx Demo",
                    ].map((s) => (
                      <option
                        key={s}
                        value={s}
                        style={{ background: "#0D0D14" }}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p
                      style={{
                        color: "#ff6b6b",
                        fontSize: "11px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.service.message}
                    </p>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    {...register("message", { required: "Required" })}
                    rows={4}
                    placeholder="Tell us about your project — timeline, budget, goals..."
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  {errors.message && (
                    <p
                      style={{
                        color: "#ff6b6b",
                        fontSize: "11px",
                        marginTop: "4px",
                      }}
                    >
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
              style={{
                background: "#0D0D14",
                clipPath:
                  "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
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
                    value: "hello@ecodrix.com",
                    href: "mailto:hello@ecodrix.com",
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "Message us →",
                    href: "#",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Tirupati, AP · India",
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

              <div
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
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                {[Linkedin, Github, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
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
