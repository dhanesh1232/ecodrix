/** Eyebrow + h2 + intro, the same on every homepage section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl md:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>
      )}
    </div>
  );
}
