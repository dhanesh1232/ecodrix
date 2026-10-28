import { CalendarCheck, CheckCircle2, Link2, Sparkles } from "@/components/icons";
import { BrowserFrame, PhoneFrame } from "@/components/marketing/kit";
import { Scene } from "@/components/motion/scene";
import { HeroChat } from "@/components/demos/hero-chat";
import { Avatar, Channel, Pill, at } from "./parts";

/**
 * Home hero: one enquiry, start to finish, as the DS hero composite (the
 * ERIX window with a phone overlapping it). The phone is live (HeroChat): it
 * plays the WhatsApp enquiry, then visitors can ask the AI agent themselves.
 * It sits outside the Scene, whose content is one image to screen readers.
 * In the window, the lead lands in the pipeline and a GST invoice goes out
 * with a payment link and turns Paid. Amounts follow the real invoice maths
 * (₹25,000 + 9% CGST + 9% SGST = ₹29,500).
 */
export function HeroScene() {
  return (
    // Window plus a phone overlapping its lower corner; on phones the window runs to the screen edge.
    <div className="relative pr-[120px] max-[900px]:pr-0">
      <Scene
        steps={8}
        timing={[0, 1000, 1500, 800, 900, 1500, 1700, 1600]}
        hold={3600}
        // The phone overlaps the bottom-right corner, so the pause button goes left.
        toggleClassName="mr-auto"
        label="ERIX at work: after a WhatsApp enquiry about a 3BHK flat, the lead moves into the pipeline with a site visit booked, and a GST invoice for ₹29,500 is sent with a payment link and marked paid."
      >
        <BrowserFrame className="max-[900px]:-mr-gutter max-[900px]:rounded-[12px_0_0_0]">
          {/* The phone overlaps the window's right edge on desktop, so the content keeps clear of it. */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:pr-[118px]">
            {/* Pipeline: the lead lands in the right stage */}
            <div className="rounded-[12px] bg-sunken p-2">
              <div className="flex items-center justify-between gap-2 px-1 pb-2 text-[12px] font-semibold text-foreground">
                <span className="flex min-w-0 items-center gap-1.5">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="truncate">Site visit booked</span>
                </span>
                <span className="inline-grid text-right text-muted-foreground tabular-nums *:[grid-area:1/1]">
                  <span className="scene-in" style={at(0, 6)}>
                    ₹1,20,000
                  </span>
                  <span className="scene-in" style={at(6)}>
                    ₹3,05,000
                  </span>
                </span>
              </div>
              <div className="space-y-2">
                <div className="rounded-[9px] bg-surface p-2.5 shadow-[var(--shadow-sm)]">
                  <p className="text-[13px] font-semibold text-foreground">Meera Iyer</p>
                  <p className="text-[11px] text-muted-foreground">2BHK, Wakad · ₹1,20,000</p>
                </div>
                <div
                  style={at(6)}
                  className="scene-in scene-x rounded-[9px] bg-surface p-2.5 shadow-[var(--shadow-sm)] ring-1 ring-accent-border"
                >
                  <p className="text-[13px] font-semibold text-foreground">Rohan Mehta</p>
                  <p className="text-[11px] text-muted-foreground">3BHK, Baner · ₹1,85,000</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <Channel name="whatsapp" />
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <CalendarCheck className="size-3" /> Sat, 4 pm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* GST invoice with a payment link → Paid */}
            <div className="rounded-[12px] bg-surface p-3 shadow-[var(--shadow-card)]">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <p className="font-mono text-[11px] text-muted-foreground">INV/26-27/0042</p>
                <span className="inline-grid justify-items-end *:[grid-area:1/1]">
                  <Pill tone="neutral" className="scene-in" style={at(0, 7)}>
                    Draft
                  </Pill>
                  <Pill tone="primary" icon={Link2} className="scene-in" style={at(7, 8)}>
                    Link sent
                  </Pill>
                  <Pill tone="success" icon={CheckCircle2} className="scene-in scene-pop" style={at(8)}>
                    Paid
                  </Pill>
                </span>
              </div>
              <p className="mt-1.5 text-[12px] font-semibold text-foreground">Booking advance · Rohan Mehta</p>
              <dl className="mt-2 space-y-1 text-[11px] text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">₹25,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt>CGST 9%</dt>
                  <dd className="tabular-nums">₹2,250</dd>
                </div>
                <div className="flex justify-between">
                  <dt>SGST 9%</dt>
                  <dd className="tabular-nums">₹2,250</dd>
                </div>
              </dl>
              <p className="mt-2 flex justify-between border-t border-border pt-2 text-[13px] font-semibold text-foreground">
                <span>Total</span>
                <span className="tabular-nums">₹29,500</span>
              </p>
            </div>
          </div>
        </BrowserFrame>
      </Scene>
      {/* The owner's inbox on a phone, live. Below the Scene, so it's offset past the pause button's row. */}
      <div className="absolute right-0 bottom-0 z-2 max-[900px]:relative max-[900px]:right-auto max-[900px]:bottom-auto max-[900px]:mt-[-180px] max-[900px]:ml-auto max-[900px]:w-max">
        <PhoneFrame
          className="w-[250px] max-[900px]:w-[230px]"
          head={
            <>
              <Avatar name="Rohan Mehta" className="size-7" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-foreground">Rohan Mehta</span>
                <Channel name="whatsapp" />
              </span>
              <Pill tone="ai" icon={Sparkles}>
                AI on
              </Pill>
            </>
          }
        >
          <HeroChat />
        </PhoneFrame>
      </div>
    </div>
  );
}
