/** Run: npx tsx --test src/lib/catalog.test.ts (no test runner is installed in this repo). */
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { applyCatalog, type CatalogItem, getPlatformNav } from "./catalog";
import { PLATFORM_NAV } from "./site";

const item = (id: string, status: "listed" | "soon"): CatalogItem => ({
  id,
  kind: "product",
  label: id,
  description: "",
  status,
});
const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

describe("applyCatalog", () => {
  it("keeps the static list when the catalog is null or empty", () => {
    assert.deepEqual(applyCatalog(PLATFORM_NAV, null), [...PLATFORM_NAV]);
    assert.deepEqual(applyCatalog(PLATFORM_NAV, []), [...PLATFORM_NAV]);
  });

  it("drops what the catalog leaves out, badges Coming soon, keeps Listed live", () => {
    const out = applyCatalog(PLATFORM_NAV, [item("crm", "listed"), item("flow", "soon"), item("inbox", "listed")]);
    assert.deepEqual(
      out.map((m) => [m.key, m.status]),
      [
        ["crm", "live"],
        ["connect", "live"],
        ["flow", "soon"],
      ],
    );
  });
});

describe("getPlatformNav fallback", () => {
  it("serves the static list when the API is down", async () => {
    globalThis.fetch = (async () => {
      throw new Error("down");
    }) as typeof fetch;
    assert.deepEqual(await getPlatformNav(), [...PLATFORM_NAV]);
  });

  it("serves the static list on a non-OK answer", async () => {
    globalThis.fetch = (async () => new Response("{}", { status: 502 })) as typeof fetch;
    assert.deepEqual(await getPlatformNav(), [...PLATFORM_NAV]);
  });

  it("follows the catalog when the API answers", async () => {
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ success: true, data: [item("agents", "soon")] }))) as typeof fetch;
    const nav = await getPlatformNav();
    assert.deepEqual(
      nav.map((m) => [m.key, m.status]),
      [["agents", "soon"]],
    );
  });
});
