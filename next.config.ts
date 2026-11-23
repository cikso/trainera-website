import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // trainera.ai/CCCE and trainera.ai/CSIAvideo are shared with capital
  // letters, but the pages live at /ccce and /csiavideo. These rewrites make
  // every capitalisation of "ccce" and the "CSIAvideo" spelling work.
  async rewrites() {
    const ccce = Array.from({ length: 16 }, (_, m) =>
      [..."ccce"].map((ch, i) => (m & (1 << i) ? ch.toUpperCase() : ch)).join(""),
    ).filter((v) => v !== "ccce");
    return [
      { source: "/CSIAvideo", destination: "/csiavideo" },
      ...ccce.map((v) => ({ source: `/${v}`, destination: "/ccce" })),
    ];
  },

  // Security headers on every page (the same ones the app sends).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
