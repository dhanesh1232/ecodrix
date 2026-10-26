"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { BrandIcon, type BrandName, Icon, type GlyphName } from "@/components/icons";

export type BeamItem = { label: string; brand?: BrandName; icon?: GlyphName };

/**
 * IntegrationBeam (design system v13): channels flow into ERIX and out to
 * outcomes, with light pulses travelling along the wires. The nodes are
 * plain HTML in a CSS grid (server-rendered, readable without JS); only the
 * wires are measured from the DOM after layout, in an absolutely positioned
 * SVG, so nothing shifts. Pulses and the halo stop under reduced motion.
 * On phones the three parts stack (labels stay readable) and the wires run
 * top to bottom instead of left to right.
 */
export function IntegrationBeam({ inputs, outputs, label }: { inputs: BeamItem[]; outputs: BeamItem[]; label: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const mid = useRef<HTMLDivElement>(null);
  const ins = useRef<(HTMLLIElement | null)[]>([]);
  const outs = useRef<(HTMLLIElement | null)[]>([]);
  const [paths, setPaths] = useState<{ w: number; h: number; d: { k: string; d: string; i: number }[] }>({
    w: 0,
    h: 0,
    d: [],
  });

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el || !mid.current) return;
    const centre = mid.current;
    const calc = () => {
      const b = el.getBoundingClientRect();
      const m = centre.getBoundingClientRect();
      const mx1 = m.left - b.left;
      const mx2 = m.right - b.left;
      const my = m.top - b.top + m.height / 2;
      const d: { k: string; d: string; i: number }[] = [];
      const first = ins.current[0]?.getBoundingClientRect();
      if (first && m.top >= first.bottom) {
        // Stacked (phones): inputs above the centre, outputs below it.
        const cx = m.left - b.left + m.width / 2;
        const top = m.top - b.top;
        const bottom = m.bottom - b.top;
        ins.current.forEach((n, i) => {
          if (!n) return;
          const r = n.getBoundingClientRect();
          const x = r.left - b.left + r.width / 2;
          const y = r.bottom - b.top;
          const c = (top - y) / 2;
          d.push({ k: `i${i}`, d: `M${x} ${y} C${x} ${y + c} ${cx} ${top - c} ${cx} ${top}`, i });
        });
        outs.current.forEach((n, i) => {
          if (!n) return;
          const r = n.getBoundingClientRect();
          const x = r.left - b.left + r.width / 2;
          const y = r.top - b.top;
          const c = (y - bottom) / 2;
          d.push({ k: `o${i}`, d: `M${cx} ${bottom} C${cx} ${bottom + c} ${x} ${y - c} ${x} ${y}`, i: i + inputs.length });
        });
        setPaths({ w: b.width, h: b.height, d });
        return;
      }
      ins.current.forEach((n, i) => {
        if (!n) return;
        const r = n.getBoundingClientRect();
        const x = r.right - b.left;
        const y = r.top - b.top + r.height / 2;
        const c = (mx1 - x) / 2;
        d.push({ k: `i${i}`, d: `M${x} ${y} C${x + c} ${y} ${mx1 - c} ${my} ${mx1} ${my}`, i });
      });
      outs.current.forEach((n, i) => {
        if (!n) return;
        const r = n.getBoundingClientRect();
        const x = r.left - b.left;
        const y = r.top - b.top + r.height / 2;
        const c = (x - mx2) / 2;
        d.push({ k: `o${i}`, d: `M${mx2} ${my} C${mx2 + c} ${my} ${x - c} ${y} ${x} ${y}`, i: i + inputs.length });
      });
      setPaths({ w: b.width, h: b.height, d });
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [inputs.length, outputs.length]);

  const node = (it: BeamItem) => (
    <span className="erix-beam__node">
      {it.brand ? (
        <span className="erix-beam__icon erix-beam__icon--brand">
          <BrandIcon name={it.brand} size={18} label={null} />
        </span>
      ) : (
        <span className="erix-beam__icon">
          <Icon name={it.icon ?? "plug"} size={18} variant="duo" animate="none" />
        </span>
      )}
      <span>{it.label}</span>
    </span>
  );

  return (
    <div ref={wrap} className="erix-beam">
      <svg className="erix-beam__wires" width={paths.w} height={paths.h} aria-hidden="true">
        {paths.d.map((p) => (
          <path key={p.k} d={p.d} className="erix-beam__wire" />
        ))}
        {paths.d.map((p) => (
          <path key={`p${p.k}`} d={p.d} pathLength={1} className="erix-beam__pulse" style={{ "--i": p.i } as CSSProperties} />
        ))}
      </svg>
      <ul className="erix-beam__col" aria-label="Comes in from">
        {inputs.map((it, i) => (
          <li key={it.label} ref={(n) => void (ins.current[i] = n)}>
            {node(it)}
          </li>
        ))}
      </ul>
      <div ref={mid} className="erix-beam__center">
        <span className="grid size-16 place-items-center rounded-[18px] bg-white max-[760px]:size-12">
          <Image src="/brand/erix-mark-trimmed.png" alt={label} width={410} height={242} className="w-11 max-[760px]:w-8" />
        </span>
      </div>
      <ul className="erix-beam__col erix-beam__col--out" aria-label="Goes out as">
        {outputs.map((it, i) => (
          <li key={it.label} ref={(n) => void (outs.current[i] = n)}>
            {node(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
