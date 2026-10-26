import { CountUp } from "@/components/motion/motion";

/**
 * The published numbers, unchanged. Server-rendered as their final values;
 * CountUp only animates an aria-hidden overlay when the strip comes into view.
 */
const stats = [
  { value: "180+", label: "API endpoints" },
  { value: "6", label: "Tools in one workspace" },
  { value: "20+", label: "Automation triggers" },
  { value: "99.9%", label: "Uptime target" },
];

export function Stats() {
  return (
    <section aria-label="ERIX in numbers" className="bg-surface py-12 md:py-16">
      <dl className="wrapper grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <dt className="order-2 mt-1 text-[15px] text-muted-foreground">{s.label}</dt>
            <dd className="order-1 text-[clamp(32px,3.6vw,44px)] leading-none font-bold tracking-[-0.03em] text-foreground">
              <CountUp value={s.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
