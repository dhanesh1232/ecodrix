"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The redrawn app screens the stories show further down a page. Each loads
// (code and DOM) only when it gets near the screen, so a long story costs a
// phone nothing on first load. They're decorative: the chapter copy beside
// them carries the meaning, in the server HTML.
const screens = {
  inbox: dynamic(() => import("./screens").then((m) => m.InboxScreen), { ssr: false }),
  ai: dynamic(() => import("./screens").then((m) => m.AiScreen), { ssr: false }),
  pipeline: dynamic(() => import("./screens").then((m) => m.PipelineScreen), { ssr: false }),
  booking: dynamic(() => import("./screens").then((m) => m.BookingScreen), { ssr: false }),
  invoice: dynamic(() => import("./screens").then((m) => m.InvoiceScreen), { ssr: false }),
  flow: dynamic(() => import("./screens").then((m) => m.FlowScreen), { ssr: false }),
  documents: dynamic(() => import("./screens").then((m) => m.DocumentsScreen), { ssr: false }),
  overview: dynamic(() => import("./story-scenes").then((m) => m.OverviewScreen), { ssr: false }),
  broadcast: dynamic(() => import("./screens").then((m) => m.BroadcastScreen), { ssr: false }),
  crm: dynamic(() => import("./showcase-scenes").then((m) => m.CrmScreen), { ssr: false }),
  flowCanvas: dynamic(() => import("./showcase-scenes").then((m) => m.FlowCanvasScreen), { ssr: false }),
  analytics: dynamic(() => import("./showcase-scenes").then((m) => m.AnalyticsScreen), { ssr: false }),
  form: dynamic(() => import("./showcase-scenes").then((m) => m.FormScreen), { ssr: false }),
  templates: dynamic(() => import("./showcase-scenes").then((m) => m.TemplatesScreen), { ssr: false }),
  widget: dynamic(() => import("./showcase-scenes").then((m) => m.WidgetScreen), { ssr: false }),
};

export type LazyScreenName = keyof typeof screens;

/**
 * A 25rem app screen that mounts when it's within ~1,200px of the viewport.
 * The placeholder has the scene's exact height (screen 25rem + pause button
 * 2.5rem; no button under reduced motion), so mounting never moves the page:
 * a jump to /#contact lands where it should.
 */
export function LazyScreen({ name }: { name: LazyScreenName }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return void setTimeout(() => setNear(true));
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Screen = screens[name];
  return (
    <div ref={ref} className="js-only h-[27.5rem] motion-reduce:h-[25rem]">
      {near && <Screen />}
    </div>
  );
}
