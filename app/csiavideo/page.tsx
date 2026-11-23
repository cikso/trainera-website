import type { Metadata } from "next";
import Link from "next/link";

import { CsiaDemoButton, CsiaLogo } from "@/components/csia/csia-share";
import { SITE_URL } from "@/lib/site";

/**
 * Public share page (trainera.ai/CSIAvideo, served from /csiavideo; the
 * mixed-case address is a rewrite in next.config.ts): the one-minute welcome
 * tour Sia gives at the start of CSIA's Certified Contact Centre Excellence
 * course, for the founder to send to people. Link-shared, so kept out of
 * search results (robots below).
 *
 * The files are a copy of the course's welcome video (re-muxed for fast
 * start), a poster frame and captions, under public/csia/. The live course
 * keeps its own private copy; replacing the course's video does not change
 * this page. Copy follows the public-site rules: no dashes.
 *
 * CSIA branded since 22 Nov 2026 (Brett): their logo at the top, and
 * "Book a demo" emails info@csia.com.au (components/csia/csia-share.tsx).
 */
// v2 (21 Nov 2026): the closing three sentences re-recorded so Sia stays
// Australian to the end, fitted phrase by phrase to the original timing (her
// lips still match). New file name so no cache serves the old ending.
const VIDEO = "/csia/ccce-welcome-tour-v2.mp4";
const POSTER = "/csia/ccce-welcome-tour-poster.jpg";
const CAPTIONS = "/csia/ccce-welcome-tour.vtt";
const SHARE_ORIGIN = SITE_URL;
const TITLE = "CSIA | Getting the most out of your course";
const DESCRIPTION =
  "A one minute tour of the Certified Contact Centre Excellence course with Sia, your AI coach, built on Trainera.";

export const metadata: Metadata = {
  // Link-shared, not for search results.
  robots: { index: false, follow: false },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: new URL("/CSIAvideo", SHARE_ORIGIN).toString(),
    images: [{ url: new URL(POSTER, SHARE_ORIGIN).toString(), width: 1920, height: 1080 }],
    videos: [{ url: new URL(VIDEO, SHARE_ORIGIN).toString(), width: 1920, height: 1080, type: "video/mp4" }],
    type: "video.other",
  },
};

export default function CsiaVideoPage() {
  return (
    <main className="bg-background min-h-svh px-[5vw] py-8">
      <div className="mx-auto max-w-[1200px]">
        <header className="flex items-center justify-between gap-4">
          <CsiaLogo />
        </header>

        <div className="mt-12 text-center lg:mt-16">
          <span className="section-label text-accent-foreground">CSIA Certified Contact Centre Excellence</span>
          <h1 className="font-display mx-auto mt-4 max-w-[22ch] text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.02em] text-balance">
            Getting the most out of your course
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-pretty">
            A one minute tour with Sia, your AI coach. She presents every page, answers your questions out loud, and
            shows you what it takes to get certified.
          </p>
        </div>

        <div className="border-border mx-auto mt-10 overflow-hidden rounded-xl border bg-[#12100E]">
          <video
            className="block aspect-video w-full"
            controls
            playsInline
            preload="metadata"
            poster={POSTER}
          >
            <source src={VIDEO} type="video/mp4" />
            <track kind="captions" src={CAPTIONS} srcLang="en" label="English" />
            Your browser can&apos;t play this video.{" "}
            <a href={VIDEO} className="underline">
              Download it instead
            </a>
            .
          </video>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <CsiaDemoButton subject="Book a demo: Certified Contact Centre Excellence (CCCE)" />
          <Link
            href="/CCCE"
            className="border-border hover:bg-secondary inline-flex h-11 items-center rounded-md border px-6 text-[15px] font-semibold transition-colors"
          >
            Watch the CCCE program video
          </Link>
        </div>

        <p className="text-muted-foreground mt-16 pb-6 text-center text-xs">Built on Trainera</p>
      </div>
    </main>
  );
}
