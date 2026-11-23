import type { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { SITE_URL, appLoginUrl } from "@/lib/site";

/**
 * Public promo page (trainera.ai/promo): the 60-second pitch video Tia
 * presents, for sales agents to send to prospects. Link-shared, so it is kept
 * out of search results (robots below).
 *
 * The video, its poster and captions are static files under public/promo/.
 * The video is the web-encoded 1080p cut (H.264, faststart) so it starts
 * playing before it has fully downloaded. Copy follows the public-site rules:
 * no dashes, no Citrus.
 */
const VIDEO = "/promo/trainera-pitch-tia.mp4";
const POSTER = "/promo/trainera-pitch-tia-poster.jpg";
const CAPTIONS = "/promo/trainera-pitch-tia.vtt";
/** Link previews name the marketing host (trainera.ai), where this page is shared from. */
const SHARE_ORIGIN = SITE_URL;

export const metadata: Metadata = {
  // Link-shared, not for search results.
  robots: { index: false, follow: false },
  title: "Trainera | See it in 60 seconds",
  description:
    "Meet Tia, your AI trainer. See how Trainera helps you hire, train and coach the people who talk to your customers.",
  openGraph: {
    title: "Trainera | See it in 60 seconds",
    description: "Hire, train and coach your customer teams, all in one place.",
    url: new URL("/promo", SHARE_ORIGIN).toString(),
    images: [{ url: new URL(POSTER, SHARE_ORIGIN).toString(), width: 1920, height: 1080 }],
    videos: [{ url: new URL(VIDEO, SHARE_ORIGIN).toString(), width: 1920, height: 1080, type: "video/mp4" }],
    type: "video.other",
  },
};

export default function PromoPage() {
  return (
    <main className="bg-background min-h-svh px-[5vw] py-8">
      <div className="mx-auto max-w-[1200px]">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center" aria-label="Trainera home">
            <BrandMark size="sm" />
          </Link>
          {/* Log in is on the app's own address (see lib/site.ts). */}
          <a
            href={appLoginUrl()}
            className="text-muted-foreground hover:text-foreground text-[13px] font-medium transition-colors"
          >
            Log in
          </a>
        </header>

        <div className="mt-12 text-center lg:mt-16">
          <span className="section-label text-accent-foreground">Trainera in 60 seconds</span>
          <h1 className="font-display mx-auto mt-4 max-w-[22ch] text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.02em] text-balance">
            Hire, train and coach, all in one place.
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-[56ch] text-base leading-relaxed text-pretty">
            Meet Tia, your AI trainer. In one minute she shows you how Trainera gets the people who talk
            to your customers ready for every conversation.
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
          {/* Landing orange with charcoal text: white on this orange fails AA. */}
          <Link
            href="/book-a-demo"
            className="inline-flex h-11 items-center rounded-md bg-[#f7841e] px-6 text-[15px] font-semibold text-[#211f1c] transition-colors hover:bg-[#ee7614]"
          >
            Book a demo
          </Link>
          <Link
            href="/"
            className="border-border hover:bg-secondary inline-flex h-11 items-center rounded-md border px-6 text-[15px] font-semibold transition-colors"
          >
            Explore Trainera
          </Link>
        </div>

        <p className="text-muted-foreground mt-16 pb-6 text-center text-xs">trainera.ai</p>
      </div>
    </main>
  );
}
