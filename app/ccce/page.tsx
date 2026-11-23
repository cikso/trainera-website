import type { Metadata } from "next";

import { CSIA_EMAIL, CsiaDemoButton, CsiaLogo, csiaMailto } from "@/components/csia/csia-share";
import { SITE_URL } from "@/lib/site";

/**
 * Public share page (trainera.ai/CCCE, served from /ccce; other casings are
 * rewrites in next.config.ts): CSIA's promotional video for the Certified
 * Contact Centre Excellence program, presented by Sia. Brett (CSIA) uses it as
 * follow up collateral after first conversations about the program.
 * Link-shared, so kept out of search results (robots below). CSIA branded:
 * their logo, and "Book a demo" emails CSIA.
 *
 * The files live under public/csia/ (video re-muxed for fast start, a poster
 * frame and captions). Copy follows the public-site rules: no dashes.
 */
const VIDEO = "/csia/ccce-promo.mp4";
const POSTER = "/csia/ccce-promo-poster.jpg";
const CAPTIONS = "/csia/ccce-promo.vtt";
const SHARE_ORIGIN = SITE_URL;
const TITLE = "CSIA | Certified Contact Centre Excellence (CCCE)";
const DESCRIPTION =
  "Meet Sia, your AI coach, and see how the Certified Contact Centre Excellence program builds the skills your frontline needs.";

export const metadata: Metadata = {
  // Link-shared, not for search results.
  robots: { index: false, follow: false },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: new URL("/CCCE", SHARE_ORIGIN).toString(),
    images: [{ url: new URL(POSTER, SHARE_ORIGIN).toString(), width: 1920, height: 1080 }],
    videos: [{ url: new URL(VIDEO, SHARE_ORIGIN).toString(), width: 1920, height: 1080, type: "video/mp4" }],
    type: "video.other",
  },
};

export default function CccePromoPage() {
  return (
    <main className="bg-background min-h-svh px-[5vw] py-8">
      <div className="mx-auto max-w-[1200px]">
        <header className="flex items-center justify-between gap-4">
          <CsiaLogo />
        </header>

        <div className="mt-12 text-center lg:mt-16">
          <span className="section-label text-accent-foreground">CSIA presents</span>
          <h1 className="font-display mx-auto mt-4 max-w-[24ch] text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.02em] text-balance">
            Certified Contact Centre Excellence
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-[60ch] text-base leading-relaxed text-pretty">
            Meet Sia, your AI coach. Six modules, sample calls to learn from, realistic practice conversations, and the
            Certified Contact Centre Professional (CCCP) qualification.
          </p>
        </div>

        <div className="border-border mx-auto mt-10 overflow-hidden rounded-xl border bg-[#12100E]">
          <video className="block aspect-video w-full" controls playsInline preload="metadata" poster={POSTER}>
            <source src={VIDEO} type="video/mp4" />
            <track kind="captions" src={CAPTIONS} srcLang="en" label="English" />
            Your browser can&apos;t play this video.{" "}
            <a href={VIDEO} className="underline">
              Download it instead
            </a>
            .
          </video>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <CsiaDemoButton subject="Book a demo: Certified Contact Centre Excellence (CCCE)" />
          <p className="text-muted-foreground text-sm">
            Or email{" "}
            <a href={csiaMailto("Certified Contact Centre Excellence (CCCE)")} className="text-foreground underline">
              {CSIA_EMAIL}
            </a>
          </p>
        </div>

        <p className="text-muted-foreground mt-16 pb-6 text-center text-xs">Built on Trainera</p>
      </div>
    </main>
  );
}
