import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The Trainera wordmark — single source of truth for every logo
 * placement. Renders the supplied PNG (public/brand/trainera-logo.png,
 * 1147×320, transparent; the charcoal + citrus "trainera" mark) at fixed
 * heights per size:
 *   sm 20px · md 28px (sidebar) · lg 48px (login/onboarding)
 * Designed for light backgrounds; no dark-background variant has been
 * supplied yet.
 */
function BrandMark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  // 1147 × 320 source (≈3.58:1) — keep the intrinsic aspect ratio per height.
  const dims = {
    sm: { width: 72, height: 20 },
    md: { width: 100, height: 28 },
    lg: { width: 172, height: 48 },
  }[size];

  return (
    <Image
      src="/brand/trainera-logo.png"
      alt="Trainera"
      width={dims.width}
      height={dims.height}
      priority
      className={cn("w-auto", className)}
      style={{ height: dims.height }}
    />
  );
}

export { BrandMark };
