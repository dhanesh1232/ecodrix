import type { ReactNode } from "react";
import { DocsShell } from "@/components/docs/DocsShell";

/** Developer pages (docs, changelog, status): their own one-row header and slim footer. */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
