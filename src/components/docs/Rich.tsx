import Link from "next/link";
import type { ReactNode } from "react";

const TOKEN = /`([^`]+)`|\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
const linkCls = "font-semibold text-accent underline-offset-2 hover:underline";

/**
 * Inline text for docs and release notes: `code`, **bold** and [label](href).
 * Content is our own static copy, so it's parsed into elements, never set as HTML.
 */
export function Rich({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [whole, code, bold, label, href] = m;
    if (code != null) {
      parts.push(
        <code key={m.index} className="rounded-sm bg-sunken px-1 py-0.5 font-mono text-[0.88em] text-foreground">
          {code}
        </code>,
      );
    } else if (bold != null) {
      parts.push(
        <strong key={m.index} className="font-semibold text-foreground">
          <Rich text={bold} />
        </strong>,
      );
    } else if (href.startsWith("/")) {
      parts.push(
        <Link key={m.index} href={href} className={linkCls}>
          <Rich text={label} />
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={m.index}
          href={href}
          className={linkCls}
          {...(href.startsWith("#") ? {} : { target: "_blank", rel: "noreferrer" })}
        >
          <Rich text={label} />
        </a>,
      );
    }
    last = m.index + whole.length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}
