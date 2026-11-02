import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The ERIX mark: `public/logo.svg` as-is, with no plate, tile or ring behind it.
 * The file is a 500x500 canvas with the mark in x 90-410, y 146-330, so an
 * `overflow-hidden` frame crops it to that box (the same crop as the saas
 * `ErixLogo` and the admin `Logo`; the file itself is untouched).
 *
 * The frame fills the width of the box it is given (`className`, e.g.
 * `size-8`) and the mark sits centred in it, so the box keeps its size and
 * nothing around it moves.
 */
export function LogoMark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn("grid shrink-0 place-items-center", className)}>
      <span className="relative block aspect-[320/184] w-full overflow-hidden">
        <Image
          src="/logo.svg"
          alt=""
          width={500}
          height={500}
          priority={priority}
          className="absolute top-[-79.35%] left-[-28.125%] block h-auto w-[156.25%] max-w-none"
        />
      </span>
    </span>
  );
}
