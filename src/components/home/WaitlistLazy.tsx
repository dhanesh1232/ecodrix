"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The form pulls in react-hook-form, the Radix select and the phone-number
// library (~90 KB compressed), which every home visit used to download and run
// before the page became usable. It lives at the bottom of the page, so it
// loads when the visitor gets near it (or lands on #contact).
const WaitlistForm = dynamic(
  () => import("./Waitlist").then((m) => m.WaitlistForm),
  { ssr: false },
);

/** Holds the form's space until it loads, so nothing shifts: at least the
 *  form's tallest rendered height (measured 27 Oct: 564px on phones, 480 to
 *  496px from md up). It was 64px short, which moved #contact after a jump. */
export function WaitlistLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[570px] md:min-h-[500px]">
      {show && <WaitlistForm />}
    </div>
  );
}
