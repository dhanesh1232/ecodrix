import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ECODrIx: from first message to paid invoice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Literal colours: CSS variables don't resolve inside ImageResponse.
const NAVY = "#0b1b64"; // nav / --mk-navy
const SWOOSH = "#b251d3"; // hero-swoosh (purple-500)
const DOT = "#cc5a57"; // hero-dot (red-500)
const LINK = "#9db2ff";

/**
 * Social share card: the DS navy `OGCard` (logo swoosh + red dot, one blue
 * bloom). Used for Open Graph and Twitter, and named by every page-level
 * `openGraph.images`.
 */
// ponytail: the title uses the default sans because next/og can't read our woff2 Bricolage; add a Bricolage TTF/OTF to load it here.
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "72px",
        backgroundColor: NAVY,
        backgroundImage: "radial-gradient(60% 80% at 90% 0%, rgba(43, 77, 203, 0.55), transparent 70%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <svg
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <path d="M260 900 C 600 380 900 300 1320 330" fill="none" stroke={SWOOSH} strokeWidth="80" strokeLinecap="round" opacity="0.5" />
        <circle cx="1166" cy="330" r="18" fill={DOT} />
      </svg>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              borderRadius: "12px",
              background: "#ffffff",
              color: NAVY,
              fontSize: "26px",
              fontWeight: 800,
            }}
          >
            E
          </div>
          <div style={{ fontSize: "34px", fontWeight: 800, letterSpacing: "-0.02em" }}>ECODrIx</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "820px" }}>
          <div style={{ fontSize: "24px", fontWeight: 700, color: LINK }}>ERIX for Indian businesses</div>
          <div style={{ marginTop: "18px", fontSize: "70px", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            From first message to paid invoice.
          </div>
          <div style={{ marginTop: "24px", fontSize: "26px", lineHeight: 1.45, color: "rgba(255,255,255,0.8)" }}>
            WhatsApp, Instagram, email and website chat in one inbox, an AI agent, a pipeline and GST invoices.
          </div>
        </div>
        <div style={{ fontSize: "22px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>ecodrix.com</div>
      </div>
    </div>,
    { ...size },
  );
}
