/**
 * Plain numbers, server-rendered: no count-up from 0 (crawlers and anyone who
 * doesn't scroll used to see "0+ API endpoints").
 */
const stats = [
  { value: "180+", label: "API endpoints" },
  { value: "6", label: "Tools in one workspace" },
  { value: "20+", label: "Automation triggers" },
  { value: "99.9%", label: "Uptime target" },
];

export function Stats() {
  return (
    <section aria-label="ERIX in numbers" className="border-b border-border bg-surface">
      <dl className="wrapper grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center px-4 py-8 text-center ${
              i % 2 ? "border-l border-border" : ""
            } ${i > 1 ? "border-t border-border lg:border-t-0" : ""} ${
              i === 2 ? "lg:border-l" : ""
            }`}
          >
            <dt className="order-2 mt-1 text-sm text-muted-foreground">{s.label}</dt>
            <dd className="order-1 font-display text-3xl font-bold tabular-nums text-foreground md:text-4xl">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
