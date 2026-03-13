import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Sovereign RCM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = readFileSync(join(process.cwd(), "public/srcm1d.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Top crimson bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#C8102E",
            display: "flex",
          }}
        />

        {/* Centered content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: "36px",
            paddingTop: "6px",
            paddingLeft: "80px",
            paddingRight: "80px",
          }}
        >
          {/* Logo — white version on dark bg, width scaled to ~480px */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="Sovereign RCM"
            width={480}
            height={112}
            style={{ objectFit: "contain" }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "38px",
              color: "#FFFFFF",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              textAlign: "center",
            }}
          >
            Your Billing. Your Building. Your Data.
          </div>

          {/* Red divider */}
          <div
            style={{
              width: "72px",
              height: "3px",
              background: "#C8102E",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Sub-line */}
          <div
            style={{
              fontSize: "24px",
              color: "#5A5A5A",
              textAlign: "center",
            }}
          >
            On-Premise AI Medical Billing · Princeton, NJ
          </div>
        </div>

        {/* URL bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "20px",
            color: "#3A3A3A",
            display: "flex",
          }}
        >
          rizexcapital.com
        </div>
      </div>
    ),
    { ...size }
  );
}
