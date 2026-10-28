"use client";

import { useEffect, useRef, useState } from "react";
import { Composer, MessageList, msg, reducedMotion, sleep, useAgentChat } from "./chat";

const SUGGESTIONS = ["What's the price?", "Is parking included?", "Send the brochure", "Can I get a discount?"];

// The enquiry the hero opens with (same words as before it became live).
const SCRIPT = [
  { from: "customer", text: "Hi, is the 3BHK at Baner still available? Can I visit on Saturday?", time: "9:42 pm" },
  {
    from: "ai",
    text: "Yes, two 3BHK flats are open at Baner. Saturday has visits at 11 am and 4 pm. Which suits you?",
    source: "Baner listing",
    time: "9:42 pm",
  },
  { from: "customer", text: "4 pm, please.", time: "9:44 pm" },
  {
    from: "ai",
    text: "Booked for Saturday, 4 pm. We'll send you a WhatsApp reminder before the visit.",
    time: "9:44 pm",
  },
] as const;

/**
 * The hero phone, live: it plays the opening enquiry, then you can ask the AI
 * agent anything as the customer (or tap a suggestion). Answers come from the
 * example business's listing; questions it shouldn't answer go to a person.
 */
export function HeroChat() {
  // The customer's question is there from the start, so the phone never shows an empty chat.
  const chat = useAgentChat([msg({ ...SCRIPT[0] })]);
  const [busy, setBusy] = useState(false);
  const [joined, setJoined] = useState(false);
  const played = useRef(false);
  const stopIntro = useRef(false);
  const root = useRef<HTMLDivElement>(null);

  // Play the opening enquiry once, when the phone is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const play = async () => {
      if (played.current) return;
      played.current = true;
      const fast = reducedMotion();
      for (const line of SCRIPT.slice(1)) {
        if (stopIntro.current) return;
        if (line.from === "ai" && !fast) {
          chat.setTyping("AI agent");
          await sleep(1300);
          chat.setTyping(null);
        } else if (!fast) {
          await sleep(900);
        }
        if (stopIntro.current) return;
        chat.push(msg({ ...line, status: line.from === "ai" ? "read" : undefined }));
      }
    };
    const io = new IntersectionObserver(([e]) => e.isIntersecting && void play(), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
    // biome-ignore lint/correctness/useExhaustiveDependencies: plays once
  }, []);

  const ask = async (text: string) => {
    if (!joined) {
      // Your first question ends the intro, which jumps to its end so the chat reads in order.
      stopIntro.current = true;
      chat.setTyping(null);
      chat.setMessages((list) =>
        list.length >= SCRIPT.length
          ? list
          : SCRIPT.map((l) => msg({ ...l, status: l.from === "ai" ? "read" : undefined })),
      );
      setJoined(true);
    }
    setBusy(true);
    chat.push(msg({ from: "customer", text }));
    await chat.answer(text);
    setBusy(false);
  };

  return (
    <div ref={root} className="flex flex-col gap-2">
      <MessageList
        label="Chat with the ERIX AI agent"
        messages={chat.messages}
        typing={chat.typing}
        className="h-[208px] max-[900px]:h-[190px]"
      />
      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] font-semibold text-subtle">Ask as the customer:</p>
        <div data-lenis-prevent className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none]">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              disabled={busy}
              onClick={() => void ask(s)}
              className="shrink-0 rounded-full bg-surface px-2 py-1 text-[10.5px] font-semibold text-accent shadow-[inset_0_0_0_1px_var(--accent-border)] transition-colors hover:bg-accent-muted focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
        <Composer placeholder="Ask about the flat…" disabled={busy} onSend={(t) => void ask(t)} />
      </div>
    </div>
  );
}
