"use client";

import { createContext, useContext, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon, type GlyphName } from "@/components/icons";
import { cn } from "@/lib/utils";

export type SegTab = { id: string; label: string; icon?: GlyphName; panel: ReactNode };

const PanelSeen = createContext(true);

/**
 * Renders its children only once their tab has been opened. For the heavy,
 * decorative part of a panel (the redrawn product screens): the copy beside
 * it stays in the HTML for every tab, while the screens of unopened tabs
 * (~1,000 elements on the home page) are neither parsed nor hydrated on load.
 */
export function OnceVisible({ children }: { children: ReactNode }) {
  return useContext(PanelSeen) ? children : null;
}

/**
 * WAI-ARIA tabs drawn as the DS segmented control (`.erix-seg`): one
 * measured indicator glides between items (DS `useIndicator`). Arrow keys,
 * Home/End, automatic activation. Every panel is server-rendered into the
 * HTML; inactive ones are `hidden`, and parts wrapped in `OnceVisible` wait
 * until their tab is first opened. Until measured (SSR, no JS) the selected
 * item carries its own fill.
 */
export function SegTabs({
  tabs,
  label,
  panelClassName,
}: {
  tabs: SegTab[];
  label: string;
  panelClassName?: string;
}) {
  const [active, setActiveIndex] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const setActive = (i: number) => {
    setActiveIndex(i);
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
  };
  const list = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const place = () => {
      const b = buttons.current[active];
      const el = ind.current;
      if (!b || !el || !list.current) return;
      el.style.translate = `${b.offsetLeft}px ${b.offsetTop}px`;
      el.style.width = `${b.offsetWidth}px`;
      el.style.height = `${b.offsetHeight}px`;
      void el.offsetWidth; // commit the first position before transitions switch on
      list.current.dataset.ind = "";
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  const onKey = (e: KeyboardEvent) => {
    const n = tabs.length;
    const to = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const i = (to + n) % n;
    setActive(i);
    buttons.current[i]?.focus();
  };

  return (
    <div>
      <div ref={list} role="tablist" aria-label={label} onKeyDown={onKey} className="erix-seg">
        <span ref={ind} aria-hidden="true" className="erix-seg__ind" />
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className="erix-seg__item"
          >
            {t.icon && <Icon name={t.icon} size={16} variant={i === active ? "solid" : "line"} />}
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={i !== active}
          className={cn("tab-panel mt-8", panelClassName)}
        >
          <PanelSeen.Provider value={seen.includes(i)}>{t.panel}</PanelSeen.Provider>
        </div>
      ))}
    </div>
  );
}
