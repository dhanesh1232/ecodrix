"use client";

/**
 * @module components/brand/BrandLoader
 * @responsibility Animated ECODrIx brand loader using the actual logo mark.
 * Ported from the console (ECOD/saas). Each structural element of the mark
 * shimmers in a staggered wave; the accent dot/pillar pulse and the whole
 * group gently breathes. Colours are the literal logo hexes (the mark itself).
 */

import { cn } from "@/lib/utils";

const SIZES = {
  sm: 32,
  md: 48,
  lg: 80,
  xl: 120,
} as const;

interface BrandLoaderProps {
  size?: keyof typeof SIZES;
  label?: string;
  className?: string;
}

export function BrandLoader({
  size = "md",
  label = "Loading",
  className,
}: BrandLoaderProps) {
  const dim = SIZES[size];
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: dim, height: dim }}
    >
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <style>{`
          .bl-part { opacity: 1; animation: bl-wave 1.8s ease-in-out infinite; }
          @keyframes bl-wave { 0%,100% { opacity: 0.35; } 45% { opacity: 1; } }
          @keyframes bl-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.18); } }
          @keyframes bl-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
          #bl-e { animation-delay: 0s; }
          #bl-r { animation-delay: 0.12s; }
          #bl-detail { animation-delay: 0.18s; }
          #bl-bar { animation-delay: 0.24s; }
          #bl-i { animation-delay: 0.36s; }
          #bl-purple { animation-delay: 0.42s; }
          #bl-x { animation-delay: 0.30s; }
          #bl-red { animation: bl-pulse 1.8s ease-in-out infinite; transform-origin: 281px 292px; }
          #bl-dot { animation: bl-pulse 1.8s ease-in-out 0.2s infinite; transform-origin: 281px 230px; }
          #bl-all { animation: bl-breathe 3s ease-in-out infinite; transform-origin: 250px 250px; }
          @media (prefers-reduced-motion: reduce) {
            .bl-part, #bl-red, #bl-dot, #bl-all { animation: none !important; opacity: 1 !important; }
          }
        `}</style>

        <g id="bl-all">
          <path
            id="bl-e"
            className="bl-part"
            fill="#2B4ECB"
            d="M127,273.8c0,0-0.4,0.2-0.9,0.3c-1,0.8-1.5,1.4-2,2c-0.8,0.9-1.6,1.8-3,2.7c-1.8-1.2-3-2.5-4.1-3.8c4-4.3,4-9.5,4.3-15.1c0.5-9.5,2-18.9,3.1-28.4c0.5-4.6,1.2-9.1,1.7-13.7c1-10.1,1.9-20.2,2.8-30.5c37.3,0,74,0,111.7,0c-1,8.2-2,15.9-3,23.7c0,0.3-0.3,0.6-0.4,0.9c-0.4,2.5,0,6.5-1.4,7.3c-2.3,1.3-5.7,0.8-8.7,0.8c-18.3,0-36.6,0-54.9,0c-1.8,0-3.6,0-6.3,0c-0.5,6.9-0.9,13.6-1.4,20.6c1.9,0.2,4,0.4,6,0.6c-0.7,3.7-0.8,3.5-13.4,9.9c-5.3,2.7-10.1,6.5-15.8,10c-1.5,1.1-2.3,2-3.1,3c0,0,0-0.1-0.3,0c-1.4,1-2.5,2-3.7,3c0,0,0-0.1-0.3,0c-3.7,0.6-5.4,2.7-5.7,6c0,0,0-0.1-0.2,0C127.4,273.4,127.2,273.6,127,273.8z"
          />
          <path
            id="bl-r"
            className="bl-part"
            fill="#2B4DCB"
            d="M267.8,233.8c-18,3.5-35.6,8.5-52,16.9c-8.8,4.5-17.6,9-26.1,14.2c-13.9,8.5-26.1,19.3-35.9,32.2c-6.9,9-12,19.3-18,29c-0.8,1.3-2.4,2.9-3.7,2.9c-13.5,0.2-27,0.1-41.4,0.1c0.6-2.2,0.7-4.2,1.6-5.6c10.5-17,22.9-32.5,37.8-45.6c10.8-9.5,22.4-18.3,34.7-25.5c11.4-6.7,24-11.9,36.6-15.9c21.2-6.7,43.4-5.7,65.8-4.8C267.7,232.5,267.8,233.1,267.8,233.8z"
          />
          <path
            id="bl-i"
            className="bl-part"
            fill="#2B4DCB"
            d="M294,159.1c3,4.1,6,8.2,8.8,12.3c5.2,7.5,4.6,8,0.9,15.7c-6.4,8.7-11.9,18.1-17.9,27.1c-1.4,2-3.2,3.7-5.3,6.1c-5-7-9.8-13.8-14.6-20.6c-4.3-6.1-8.6-12-12.7-18.2c-5.6-8.6-11-17.3-16.6-25.9c-0.9-1.5-2.5-2.6-3.4-4.1c-0.5-0.9-0.1-2.2,0.6-3.2c15.5,0.4,30.3,0.5,45.1,0.7c3.1,0.1,6.3,0.6,9.6,1.2C291.4,153.4,293.7,156.2,294,159.1z"
          />
          <path
            id="bl-x"
            className="bl-part"
            fill="#2B4DCB"
            d="M343.9,157.2c1.7-2.4,3.4-4.9,5.3-7.3c0.6-0.8,1.7-1.8,2.6-1.8c18.3-0.1,36.6-0.1,55.9-0.1c-2.2,3.6-3.8,6.5-5.6,9.3c-6.4,9.7-12.7,19.4-19.3,27.9c-9.3,13.4-18.8,26.7-28.3,40c-0.3,0.4-0.2,1-0.5,1.3c-9.8,9.4-1.7,16.1,3.4,23.4c3.7,5.3,7,10.9,10.6,16.4c4,6.1,8.1,12.2,12.1,18.3c6,9.1,11.9,18.2,17.9,27.3c2.7,4.1,5.6,8,8.4,12.1c0.7,1,1.2,2.1,2.2,4c-5.4,0-9.9,0-14.3,0c-13,0-26,0.1-39,0c-1.8,0-4.2-1-5.2-2.4c-7.5-11-14.7-22.3-22.2-33.4c-7.5-11.2-15.2-22.3-22.8-33.5c-3.5-5.1-6.9-10.3-10.7-16c-1.1-3.2-1.9-5.9-2.8-8.5c8.8-12.9,17.7-25.8,26.4-38.7c4.1-6.2,7.9-12.6,12.3-19.2C335.2,170.2,339.5,163.7,343.9,157.2z"
          />
          <path
            id="bl-bar"
            className="bl-part"
            fill="#2C4ECB"
            d="M174,329c-11.1,0-21.8,0-33.3,0c0.6-1.9,0.8-3.5,1.5-4.7c5.8-8.9,11.6-17.8,17.5-26.6c0.5-0.8,1.7-1.6,2.6-1.6c22.3-0.1,44.6-0.1,68.1-0.1c-0.8,11-1.7,21.6-2.5,32.9C210,329,192.3,329,174,329z"
          />
          <path
            id="bl-red"
            className="bl-part"
            fill="#B03A3B"
            d="M268,256L294,256L294,329L268,329Z"
          />
          <path
            id="bl-purple"
            className="bl-part"
            fill="#8D1FAE"
            d="M294.5,159c-2.8-2.8-5.1-5.6-7.6-9.1c-0.1-1,0-1.4,0.1-1.8c15.6-0.8,31,0.4,46.1,4.7c3.5,1,6.7,3.2,10.4,5c-4,6.6-8.3,13.1-13,19.7c-5.7-11.1-15.7-14.9-26.9-16.8C300.8,159.5,297.8,159.3,294.5,159z"
          />
          <circle
            id="bl-dot"
            className="bl-part"
            fill="#AF3A3D"
            cx="281"
            cy="230"
            r="15"
          />
          <path
            id="bl-detail"
            className="bl-part"
            fill="#2B4DCB"
            d="M224.8,251.8c-0.6,7.1-1.2,13.8-2,20.8c-11.2,0-22.3,0-33.4,0C199.6,262.8,211.5,256,224.8,251.8z"
          />
        </g>
      </svg>
      <span className="sr-only">{label}…</span>
    </div>
  );
}
