/**
 * @module components/icons/Icon
 * ERIX Glyphs v2 renderer, ported from the design system (components/src/icons/Icon.jsx, v8).
 *
 * - `variant`: `duo` (default: line + 16% tint, 22% on dark) · `line` (dense UI: buttons, menus,
 *   inputs, table rows) · `solid` (active nav and status; fills the shape, knocks out details).
 * - Optical stroke follows size (2.1 @14 · 1.9 @16 · 1.7 @20 · 1.6 @24 · 1.4 @32). Dark theme thins
 *   it 8% in CSS (`.dark .erix-icon` in globals.css).
 * - Decorative by default (`aria-hidden`); pass `label` only when the icon stands alone.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { type BrandMark, BRANDS, type BrandName, GLYPH_CATEGORIES, GLYPHS, type GlyphName, SOLID } from "./glyphs";

export type IconVariant = "duo" | "line" | "solid";

// Optical stroke in grid units (24), tuned for Lucide's 2px master (design system v3): a touch
// heavier at 12–16px, lighter at 24px+. Rendered stroke ≈ value × size / 24.
const OPTICAL: ReadonlyArray<readonly [number, number]> = [
  [12, 2.25],
  [14, 2.15],
  [16, 2],
  [20, 1.85],
  [24, 1.75],
  [32, 1.5],
  [48, 1.25],
];

export function opticalStroke(size: number): number {
  if (size <= OPTICAL[0][0]) return OPTICAL[0][1];
  for (let i = 1; i < OPTICAL.length; i++) {
    const [s1, w1] = OPTICAL[i - 1];
    const [s2, w2] = OPTICAL[i];
    if (size <= s2)
      return +(w1 + ((size - s1) / (s2 - s1)) * (w2 - w1)).toFixed(3);
  }
  return OPTICAL[OPTICAL.length - 1][1];
}

// Call sites size icons with Tailwind classes (`size-4`, `h-3.5 w-3.5`, `size-[18px]`), not `size`.
// Read the unprefixed class so the stroke still follows the rendered size.
const CLASS_SIZE =
  /(?:^|\s)(?:size|h|w)-(?:(\d+(?:\.\d+)?)|\[(\d+(?:\.\d+)?)px\])(?=\s|$)/;
function sizeFromClass(className?: string): number | undefined {
  const m = className ? CLASS_SIZE.exec(className) : null;
  if (!m) return undefined;
  return m[1] ? Number(m[1]) * 4 : Number(m[2]);
}

export interface IconBaseProps
  extends Omit<React.SVGProps<SVGSVGElement>, "ref" | "name"> {
  /** px. Defaults to the size in `className` (e.g. `size-4` → 16), else 16. */
  size?: number | string;
  /** Grid units (24). Defaults to the optical stroke for the size. */
  strokeWidth?: number | string;
  variant?: IconVariant;
  /** Accessible name. Only when the icon stands alone (no visible text). */
  label?: string;
}

/** Props for an ERIX glyph (`name` is a GlyphName). */
export interface GlyphIconProps extends IconBaseProps {
  name: GlyphName;
  /** SVG transform for the glyph (used for rotated/mirrored stand-ins). */
  transform?: string;
}

/**
 * Props for a third-party brand mark (`name` is a BrandName: whatsapp, instagram, razorpay…).
 * `color` (default) = the brand's real colours, gradients and multi-colour marks included ·
 * `mono` = currentColor, for marks on a solid fill · `tile` = real colours on a white tile.
 * Glyph-only options (duo/line/solid, strokeWidth) don't apply and won't type-check.
 */
export interface BrandIconProps {
  name: BrandName;
  variant?: "color" | "mono" | "tile";
  /** px. Defaults to the size in `className` (e.g. `size-4` → 16), else 16. */
  size?: number;
  /** Accessible name. Only when the mark stands alone (no visible text). */
  label?: string;
  className?: string;
}

/** Every name <Icon> draws: ERIX glyphs and brand marks. */
export type IconName = GlyphName | BrandName;

/**
 * For data-driven names that may be either (menus, lists): the shared options plus a glyph style.
 * Brand marks ignore the style and keep their real colours.
 */
export interface MixedIconProps {
  name: IconName;
  variant?: "line" | "duo";
  size?: number;
  label?: string;
  className?: string;
}

/** `<Icon>` props: the options follow from the name, so a glyph can't get brand options or the reverse. */
export type IconProps = GlyphIconProps | BrandIconProps | MixedIconProps;

/** True for brand-mark names (whatsapp, instagram…), false for ERIX glyphs. */
export const isBrandName = (name: string): name is BrandName => Object.hasOwn(BRANDS, name);

/** Any ERIX icon component: what used to be `LucideIcon`. */
export type IconComponent = React.ForwardRefExoticComponent<
  IconBaseProps & React.RefAttributes<SVGSVGElement>
>;

type Attrs = Record<string, string>;
type Element = readonly [string, Attrs];

// Duo tint goes on the first closed shape (circle, rect, ellipse, polygon or a path ending in z).
const closed = ([t, a]: Element) =>
  t === "circle" ||
  t === "rect" ||
  t === "ellipse" ||
  t === "polygon" ||
  (t === "path" && /z\s*$/i.test(a.d ?? ""));
const TINT = new Map<string, number>();
function tintOf(name: string, els: ReadonlyArray<Element>): number {
  let i = TINT.get(name);
  if (i === undefined) {
    i = els.findIndex(closed);
    TINT.set(name, i);
  }
  return i;
}

/** Resolved px size, stroke and the shared <svg> props for every ERIX icon. */
function svgBase(
  { size, strokeWidth, label, className, style, ...rest }: IconBaseProps,
  variantClass: string,
  strokeFor: (px: number) => number = opticalStroke,
) {
  const px =
    (size !== undefined && Number(size)) || sizeFromClass(className) || 16;
  const sw = Number(strokeWidth) || strokeFor(px);
  // Hidden from assistive tech unless the call site names it (label / aria-label / aria-labelledby).
  const named = Boolean(label || rest["aria-label"] || rest["aria-labelledby"]);
  return {
    className: cn("erix-icon", variantClass, className),
    width: size ?? px,
    height: size ?? px,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { "--icon-sw": sw, ...style } as React.CSSProperties,
    role: named ? "img" : undefined,
    "aria-label": label,
    "aria-hidden": named ? undefined : true,
    ...rest,
  };
}

/**
 * The one icon component (design system Icons v3): ERIX glyphs and brand marks.
 * - Glyphs: `<Icon name="users" />`, see `GLYPH_CATEGORIES`. `duo` (default): Lucide line plus a
 *   soft tint on the main closed shape. `line`: dense UI. `solid`: the Tabler filled glyph when
 *   one exists (`SOLID`), otherwise duo.
 * - Brand marks: `<Icon name="whatsapp" />` in real colours; `variant="mono"` on a solid fill.
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(props, ref) {
  if (isBrandName(props.name)) {
    const { name, size, label, className, variant } = props as BrandIconProps | MixedIconProps;
    const tone = variant === "mono" || variant === "tile" ? variant : "color";
    return <BrandMarkSvg ref={ref} name={name as BrandName} size={size} label={label} className={className} variant={tone} />;
  }
  return <GlyphSvg ref={ref} {...(props as GlyphIconProps)} />;
});

const GlyphSvg = React.forwardRef<SVGSVGElement, GlyphIconProps>(function GlyphSvg(
  { name, variant = "duo", transform, ...props },
  ref,
) {
  const els = GLYPHS[name] as ReadonlyArray<Element>;
  if (!els) return null;
  const h = React.createElement;
  const solid = variant === "solid" ? SOLID[name] : undefined;

  if (solid) {
    const body = solid.map(([t, a], i) => h(t, { key: i, ...a }));
    return (
      <svg
        ref={ref}
        {...svgBase(props, "erix-icon--solid")}
        fill="currentColor"
        stroke="none"
      >
        {transform ? <g transform={transform}>{body}</g> : body}
      </svg>
    );
  }

  const v = variant === "solid" ? "duo" : variant;
  const ti = v === "duo" ? tintOf(name, els) : -1;
  const body = (
    <>
      {ti >= 0 &&
        h(els[ti][0], {
          ...els[ti][1],
          className: "erix-icon__duo",
          fill: "currentColor",
          stroke: "none",
        })}
      {els.map(([t, a], i) => h(t, { key: i, ...a }))}
    </>
  );
  return (
    <svg ref={ref} {...svgBase(props, `erix-icon--${v}`)}>
      {transform ? <g transform={transform}>{body}</g> : body}
    </svg>
  );
});

/** Brand marks for <Icon> (integrations and channels only; never as ECODrIx branding). */
const BrandMarkSvg = React.forwardRef<SVGSVGElement, BrandIconProps>(function BrandMarkSvg(
  { name, size, variant = "color", label, className },
  ref,
) {
  const b: BrandMark = BRANDS[name];
  const px = size ?? sizeFromClass(className) ?? 16;
  const mono = variant === "mono";
  // White parts of a multi-colour mark (e.g. the calendar page) become see-through
  // in mono, so the mark keeps its shape instead of turning into a solid block.
  const fill = (hex: string) => (mono ? (/^#f{3}(f{3})?$/i.test(hex) ? "none" : "currentColor") : hex);
  // Unique per instance: a shared id resolves to the first copy, and if that copy sits in a
  // display:none subtree (closed menu, other breakpoint) Chrome paints every other copy blank.
  const gradientId = `erix-brand-${name}-${React.useId().replace(/:/g, "")}`;
  const g = !mono && "gradient" in b ? b.gradient : undefined;
  // Same rule as glyphs: decorative unless the call site names it.
  const a11y = label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true as const };

  const svg = (
    <svg
      ref={ref}
      className={cn("erix-brand shrink-0", variant !== "tile" && className)}
      width={px}
      height={px}
      viewBox={b.viewBox ?? "0 0 24 24"}
      xmlns="http://www.w3.org/2000/svg"
      {...a11y}
    >
      {g && (
        <defs>
          {g.type === "radial" ? (
            <radialGradient id={gradientId} cx={g.cx ?? 0.5} cy={g.cy ?? 0.5} r={g.r ?? 0.5}>
              {g.stops.map(([offset, hex]) => (
                <stop key={offset} offset={offset} stopColor={hex} />
              ))}
            </radialGradient>
          ) : (
            <linearGradient id={gradientId} x1={g.x1 ?? 0} y1={g.y1 ?? 0} x2={g.x2 ?? 1} y2={g.y2 ?? 0}>
              {g.stops.map(([offset, hex]) => (
                <stop key={offset} offset={offset} stopColor={hex} />
              ))}
            </linearGradient>
          )}
        </defs>
      )}
      {"paths" in b ? (
        b.paths.map((item, index) => <path key={index} d={item.d} fill={fill(item.hex)} />)
      ) : (
        <path d={b.path} fill={g ? `url(#${gradientId})` : fill(b.hex)} />
      )}
    </svg>
  );

  if (variant !== "tile") return svg;

  return (
    <span
      className={cn(
        "inline-grid place-items-center rounded-lg bg-white shadow-[0_0_0_1px_rgba(11,27,100,0.08)]",
        className,
      )}
      style={{ width: px + 16, height: px + 16 }}
    >
      {svg}
    </span>
  );
});

export const ICON_NAMES = Object.keys(GLYPHS) as GlyphName[];
export { GLYPH_CATEGORIES, type GlyphName };

/**
 * A fixed-glyph component with the old icon-component API (`<Users className="size-4" />`).
 * Defaults to `line`: these replace Lucide in buttons, menus, inputs and rows (dense UI).
 * Pass `variant="duo"` on feature tiles and empty states, `variant="solid"` for active nav and status.
 */
export function createIcon(name: GlyphName, transform?: string): IconComponent {
  const C = React.forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
    <Icon
      ref={ref}
      name={name}
      transform={transform}
      variant="line"
      {...props}
    />
  ));
  C.displayName = `Icon(${name})`;
  return C;
}

/** Loading arc matching the DS `.erix-spinner` (¾ ring, 2px). Spin it with `animate-spin`. */
export const SpinnerArc: IconComponent = React.forwardRef<
  SVGSVGElement,
  IconBaseProps
>(({ variant: _v, ...props }, ref) => (
  <svg ref={ref} {...svgBase(props, "erix-spinner", (px) => 48 / px)}>
    <path d="M12 3a9 9 0 1 1-9 9" />
  </svg>
));
SpinnerArc.displayName = "SpinnerArc";

/**
 * Stop-gap for text-formatting and symbol icons the glyph set doesn't have yet (B, I, U, ∞, #…).
 * Renders the character in the UI sans. Listed in docs/ui-v8/icon-map.md as glyph gaps.
 */
export function createLetterIcon(
  text: string,
  opts: { fontSize?: number; italic?: boolean; underline?: boolean } = {},
): IconComponent {
  const { fontSize = 16, italic, underline } = opts;
  const C = React.forwardRef<SVGSVGElement, IconBaseProps>(
    ({ variant: _v, ...props }, ref) => (
      <svg ref={ref} {...svgBase(props, "erix-icon--letter")}>
        <text
          x="12"
          y={underline ? 15.5 : 12}
          dominantBaseline="central"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize={fontSize}
          fontWeight={700}
          fontStyle={italic ? "italic" : undefined}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {text}
        </text>
        {underline && <path d="M7 21h10" />}
      </svg>
    ),
  );
  C.displayName = `LetterIcon(${text})`;
  return C;
}

export type IconChipTone =
  | "blue"
  | "purple"
  | "red"
  | "indigo"
  | "magenta"
  | "rose"
  | "green"
  | "orange"
  | "teal";

// App token names: DS `primary` = app `accent`/`primary`; DS `accent` (purple) = app `ai`.
const CHIP_TONE: Record<IconChipTone, string> = {
  blue: "bg-primary-subtle text-primary",
  purple: "bg-ai-subtle text-ai",
  red: "bg-danger-subtle text-danger",
  indigo: "bg-indigo-subtle text-indigo",
  magenta: "bg-magenta-subtle text-magenta",
  // Brand-only palette (design system, 26 Oct 2026): rose is red-500 on red-50; the old green,
  // orange and teal names render deep blue, rose and deep blue. Green stays a status signal only.
  rose: "bg-error-subtle text-[var(--red-500)]",
  green: "bg-accent-muted text-[var(--blue-700)]",
  orange: "bg-error-subtle text-[var(--red-500)]",
  teal: "bg-accent-muted text-[var(--blue-700)]",
};
const CHIP_SIZE = {
  sm: ["size-6 rounded-sm", 13],
  md: ["size-7 rounded-md", 15],
  lg: ["size-9 rounded-[10px]", 18],
} as const;

/** A tinted icon square (sm 24 · md 28 · lg 36). Decorative: pair it with visible text. */
export function IconChip({
  icon,
  tone = "blue",
  size = "md",
  variant = "line",
  className,
}: {
  icon: GlyphName;
  tone?: IconChipTone;
  size?: keyof typeof CHIP_SIZE;
  variant?: IconVariant;
  className?: string;
}) {
  const [box, px] = CHIP_SIZE[size];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid flex-none place-items-center",
        box,
        CHIP_TONE[tone],
        className,
      )}
    >
      <Icon name={icon} size={px} variant={variant} />
    </span>
  );
}
