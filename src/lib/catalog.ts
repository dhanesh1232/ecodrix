/**
 * The website's view of the catalog (admin › Catalog): staff mark each item
 * Listed, Coming soon or Hidden, and the lists below follow. Anything missing
 * from the answer is Hidden. If the API fails or answers nothing, the static
 * list stays exactly as written, so the site never breaks.
 */

import { fetchCatalog } from "@/lib/api";
import type { ModuleStatus } from "@/lib/site";
import { PLATFORM_NAV } from "@/lib/site";

export interface CatalogItem {
  id: string;
  kind: "product" | "app" | "feature";
  label: string;
  description: string;
  status: "listed" | "soon";
}

/** Platform menu key → catalog item id (Connect's card is the Inbox item). */
const ITEM_OF: Record<string, string> = {
  crm: "crm",
  connect: "inbox",
  agents: "agents",
  flow: "flow",
  storage: "storage",
};

/**
 * Apply the catalog to a list of modules: Hidden ones drop out, Coming soon
 * ones get the "soon" status (the Coming soon badge), Listed ones are live.
 * `items` null or empty (failed read) returns the list untouched.
 */
export function applyCatalog<T extends { key: string; status: ModuleStatus }>(
  nav: readonly T[],
  items: readonly CatalogItem[] | null,
): (Omit<T, "status"> & { status: ModuleStatus })[] {
  if (!items?.length) return [...nav];
  return nav.flatMap((m) => {
    const hit = items.find((i) => i.id === ITEM_OF[m.key]);
    if (!ITEM_OF[m.key]) return [m];
    if (!hit) return [];
    return [{ ...m, status: (hit.status === "soon" ? "soon" : "live") as ModuleStatus }];
  });
}

/** The Platform menu list for server components, from the catalog (ISR 300 s) with the static fallback. */
export async function getPlatformNav() {
  return applyCatalog(PLATFORM_NAV, await fetchCatalog());
}
