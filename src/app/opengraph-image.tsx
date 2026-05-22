import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ECODrIx — Unified Business Infrastructure Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#060608",
        position: "relative",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,110,250,0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.25) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Logo text */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#7C6EFA",
            letterSpacing: "-0.02em",
            marginBottom: "24px",
            fontFamily: "sans-serif",
          }}
        >
          ECODrIx
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "8px",
            fontFamily: "sans-serif",
          }}
        >
          Your Business.
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "24px",
            background: "linear-gradient(135deg, #A89EFD, #7C6EFA, #22D3EE)",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "sans-serif",
          }}
        >
          One Command.
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: "20px",
            color: "#8888A0",
            maxWidth: "600px",
            lineHeight: 1.5,
            fontFamily: "sans-serif",
          }}
        >
          CRM, WhatsApp, Email, AI Lead Gen, Booking & Storage — unified in one
          platform.
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "32px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["CRM", "WhatsApp", "Email", "AI Engine", "Booking", "Storage"].map(
            (f) => (
              <div
                key={f}
                style={{
                  padding: "6px 14px",
                  fontSize: "13px",
                  color: "#A89EFD",
                  background: "rgba(124,110,250,0.1)",
                  border: "1px solid rgba(124,110,250,0.25)",
                  fontFamily: "monospace",
                }}
              >
                {f}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#64647A",
          fontSize: "14px",
          fontFamily: "sans-serif",
        }}
      >
        ecodrix.com · Join the Waitlist
      </div>
    </div>,
    { ...size },
  );
}
