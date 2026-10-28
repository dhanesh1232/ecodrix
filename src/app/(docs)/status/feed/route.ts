import { readStatus } from "@/lib/status";

/**
 * GET /status/feed — what the status page polls. The site asks the API on the
 * server and the CDN shares the answer for 15 seconds, so visitors' browsers
 * only ever talk to ecodrix.com (no CORS, no blocked cross-port calls), the
 * API sees one request per 15s however many tabs are open, and "can't reach
 * the API" means the API, not the visitor's network.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await readStatus({ next: { revalidate: 15 } });
  return Response.json(snapshot, {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=15, stale-while-revalidate=30" },
  });
}
