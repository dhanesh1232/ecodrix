import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

/**
 * The brand site's chrome (ecodrix.com marketing pages): the mega-menu header
 * and the full footer. Developer pages (docs, changelog, status) use DocsShell.
 */
export function BrandShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
