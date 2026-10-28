import type { ReactNode } from "react";
import { BrandShell } from "@/components/layout/BrandShell";

/** ecodrix.com marketing pages: the brand header and footer. */
export default function BrandLayout({ children }: { children: ReactNode }) {
  return <BrandShell>{children}</BrandShell>;
}
