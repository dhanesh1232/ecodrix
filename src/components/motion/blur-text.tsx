import type { JSX } from "react";

/**
 * A headline that sharpens in word by word (DS `BlurText`, 55ms apart),
 * pure CSS (`.erix-blurtext` in globals.css), so it paints without JS.
 * Screen readers get the plain text once: the element carries it as its
 * name and the animated words are aria-hidden. Crawlers read the words.
 */
export function BlurText({
  text,
  as: Tag = "h1",
  className,
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  let n = -1;
  return (
    <Tag className={`erix-blurtext ${className ?? ""}`} aria-label={text}>
      {text.split(/(\s+)/).map((w, k) =>
        /^\s+$/.test(w) ? (
          w
        ) : (
          <span key={k} aria-hidden="true" style={{ "--w": ++n } as React.CSSProperties}>
            {w}
          </span>
        ),
      )}
    </Tag>
  );
}
