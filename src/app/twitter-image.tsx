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
        <div
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#7C6EFA",
            letterSpacing: "-0.02em",
            marginBottom: "24px",
          }}
        >
          ECODrIx
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "8px",
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
          }}
        >
          One Command.
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#8888A0",
            maxWidth: "600px",
            lineHeight: 1.5,
          }}
        >
          CRM, WhatsApp, Email, AI Lead Gen, Booking & Storage — unified in one
          platform.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          color: "#64647A",
          fontSize: "14px",
        }}
      >
        ecodrix.com · Join the Waitlist
      </div>
    </div>,
    { ...size },
  );
}
