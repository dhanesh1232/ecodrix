import { COMPANY_NAV, COMPARE_NAV, INDUSTRY_NAV, RESOURCE_NAV } from "@/lib/site";

/** The four header sections, shared by the desktop menu and the phone sheet. */
export const NAV_SECTIONS = [
  { key: "platform", label: "Platform" },
  { key: "industries", label: "Industries" },
  { key: "resources", label: "Resources" },
  { key: "company", label: "Company" },
] as const;

export type NavSection = (typeof NAV_SECTIONS)[number]["key"];

const under = (path: string, href: string) => path === href || path.startsWith(`${href}/`);

/** Which header section the current page belongs to (for the active marker). */
export function sectionOf(path: string | null): NavSection | undefined {
  if (!path) return undefined;
  if (INDUSTRY_NAV.some((i) => under(path, i.href))) return "industries";
  if ([...RESOURCE_NAV, ...COMPARE_NAV].some((r) => under(path, r.href))) return "resources";
  if (under(path, "/platform")) return "platform";
  if (COMPANY_NAV.some((c) => under(path, c.href))) return "company";
  return undefined;
}

export const isCurrent = (path: string | null, href: string) => path === href;
