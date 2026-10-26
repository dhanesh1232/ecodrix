import { STATUS_LABEL, type ModuleStatus } from "@/lib/site";
import { cn } from "@/lib/utils";

const tone: Record<ModuleStatus, string> = {
  live: "bg-success-subtle text-success",
  soon: "bg-warning-subtle text-warning",
  invite: "bg-accent-muted text-accent",
};

/** Module status: colour plus the word, never colour alone. Always drawn
 *  with the light tokens (`surface-light`), so it reads the same on dark. */
export function StatusBadge({ status, className }: { status: ModuleStatus; className?: string }) {
  return (
    <span
      className={cn(
        "surface-light inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-[6px] px-2 py-0.5 text-[11px] font-semibold",
        tone[status],
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status]}
    </span>
  );
}
