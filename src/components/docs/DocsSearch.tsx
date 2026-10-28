"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/icons";

export interface SearchEntry {
  /** Where the hit goes, e.g. `/docs#leads`. */
  href: string;
  title: string;
  /** Section name, or the method of an endpoint. */
  kind: string;
  hint: string;
}

/**
 * Find a docs section or endpoint from any developer page: every word has to
 * match. ⌘K / Ctrl+K focuses it; Escape clears it.
 */
export function DocsSearch({ entries, onPick }: { entries: SearchEntry[]; onPick?: () => void }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = words.length
    ? entries
        .filter((e) => {
          const hay = `${e.title} ${e.kind} ${e.hint}`.toLowerCase();
          return words.every((w) => hay.includes(w));
        })
        .slice(0, 8)
    : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Only the visible box takes the shortcut (the phone menu has its own).
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && input.current?.offsetParent) {
        e.preventDefault();
        input.current.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div role="search" className="relative">
      <label htmlFor={`${listId}-q`} className="sr-only">
        Search the docs
      </label>
      <Icon
        name="search"
        size={16}
        variant="line"
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-subtle"
      />
      <input
        ref={input}
        id={`${listId}-q`}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && setQ("")}
        placeholder="Search docs"
        aria-controls={listId}
        autoComplete="off"
        className="peer h-9 w-full rounded-[8px] bg-background pr-12 pl-9 text-[14px] shadow-[inset_0_0_0_1px_var(--color-border-soft)] outline-none placeholder:text-subtle focus:bg-surface focus:shadow-[inset_0_0_0_2px_var(--color-accent)]"
      />
      <kbd
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded-[4px] bg-surface px-1.5 font-sans text-[11px] text-subtle shadow-[inset_0_0_0_1px_var(--color-border-soft)] peer-focus:hidden"
      >
        ⌘K
      </kbd>
      <div id={listId} aria-live="polite" className={words.length ? "" : "sr-only"}>
        {words.length > 0 && (
          <div className="absolute inset-x-0 top-[calc(100%+6px)] z-50 min-w-[min(420px,90vw)] rounded-[12px] bg-surface p-1.5 shadow-[0_0_0_1px_var(--color-border-soft),var(--shadow-card)]">
            {hits.length ? (
              <ul>
                {hits.map((h) => (
                  <li key={h.href}>
                    <a
                      href={h.href}
                      onClick={() => {
                        setQ("");
                        onPick?.();
                      }}
                      className="flex flex-col gap-0.5 rounded-[8px] px-3 py-2 hover:bg-sunken focus-visible:bg-sunken focus-visible:outline-none"
                    >
                      <span className="text-[14px] font-semibold">
                        <span className="mr-1.5 font-mono text-[12px] text-accent">{h.kind}</span>
                        {h.title}
                      </span>
                      <span className="line-clamp-1 text-[12.5px] text-muted-foreground">{h.hint}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-2 text-[13.5px] text-muted-foreground">Nothing matches “{q}”.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
