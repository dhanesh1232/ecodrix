import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ECODrIx — every lead, every chat, one workspace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Literal colours: CSS variables don't resolve inside ImageResponse.
const BLUE = "#2b4dcb";
const BLUE_DEEP = "#162c8b";
const PURPLE = "#8d1fae";
const RED = "#b03a3b";
const INK = "#12151d";
const MUTED = "#555c6d";

/** Social share card — the homepage headline on the ERIX light surface. */
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#f2f4fb",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ width: "14px", height: "40px", background: BLUE, borderRadius: "3px" }} />
          <div style={{ width: "14px", height: "40px", background: PURPLE, borderRadius: "3px" }} />
          <div style={{ width: "14px", height: "40px", background: RED, borderRadius: "3px" }} />
        </div>
        <div style={{ fontSize: "34px", fontWeight: 800, color: INK }}>ECODrIx</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "68px", fontWeight: 800, color: INK, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          Every lead, every chat,
        </div>
        <div style={{ fontSize: "68px", fontWeight: 800, color: BLUE, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          one workspace.
        </div>
        <div style={{ marginTop: "28px", fontSize: "28px", color: MUTED, maxWidth: "900px", lineHeight: 1.4 }}>
          CRM, WhatsApp and email inbox, GST invoices and AI automation for
          Indian businesses.
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            padding: "14px 26px",
            background: BLUE,
            color: "#ffffff",
            fontSize: "24px",
            fontWeight: 700,
            borderRadius: "6px",
          }}
        >
          Join the waitlist
        </div>
        <div style={{ fontSize: "24px", color: BLUE_DEEP, fontWeight: 600 }}>ecodrix.com</div>
      </div>
    </div>,
    { ...size },
  );
}
