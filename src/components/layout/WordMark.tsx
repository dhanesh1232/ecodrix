/**
 * Oversized brand wordmark — a clean grayscale watermark that smoothly reveals
 * the brand gradient (blue → purple → crimson) on hover. Rendered as SVG so it
 * stays crisp and fills the width at any size.
 */
export function BrandWordmark({ text }: { text: string }) {
  const VIEW_W = 1000;
  const VIEW_H = 230;

  const wmTextProps = {
    x: VIEW_W / 2,
    y: VIEW_H * 0.8,
    textAnchor: "middle" as const,
    textLength: VIEW_W - 16,
    lengthAdjust: "spacingAndGlyphs" as const,
    fontFamily: "var(--font-roboto), system-ui, sans-serif",
    fontWeight: 900,
    fontSize: VIEW_H * 0.9,
    letterSpacing: "-0.04em",
  };

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="wm-group w-full h-auto block select-none"
      role="img"
      aria-label={text}
    >
      <defs>
        <linearGradient id="ecodrix-wm-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-brand-blue)" />
          <stop offset="55%" stopColor="var(--color-brand-purple)" />
          <stop offset="100%" stopColor="var(--color-brand-crimson)" />
        </linearGradient>
      </defs>

      {/* Grayscale base + gradient overlay that crossfades in on hover
          (opacity transitions smoothly; a fill→gradient tween cannot). */}
      <text {...wmTextProps} className="wm-text-base">
        {text}
      </text>
      <text
        {...wmTextProps}
        className="wm-text-grad"
        fill="url(#ecodrix-wm-grad)"
      >
        {text}
      </text>
    </svg>
  );
}