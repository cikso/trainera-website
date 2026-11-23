import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { SHARE_IMAGE, SITE_URL, appLoginUrl } from "@/lib/site";

import { DemoForm } from "./demo-form";

/**
 * The Book a demo page. The form (demo-form.tsx) sends its answers to the
 * Trainera app, which stores them and emails the team.
 */
const TITLE = "Book a demo | Trainera";
const DESCRIPTION =
  "See how Trainera assesses candidates, gets new starters ready and coaches your team with realistic AI practice calls. Tell us about your team and we'll shape the demo around it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/book-a-demo` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/book-a-demo`,
    siteName: "Trainera",
    type: "website",
    locale: "en_AU",
    images: [SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [SHARE_IMAGE.url] },
};

/** What a prospect actually gets — concrete, not marketing filler. */
const NEXT_STEPS = [
  "We'll reply to your work email within one business day.",
  "A walkthrough of about 30 minutes, shaped around how your team actually works.",
  "We'll build a live simulation from one of your own scenarios.",
  "No obligation, and no sales script.",
];

export default function BookADemoPage() {
  return (
    <main className="bg-background min-h-svh px-[5vw] py-8">
      <div className="mx-auto max-w-[1240px]">
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

        <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-[72px]">
          {/* Left — the pitch */}
          <div className="min-w-0">
            <span className="section-label text-accent-foreground">
              Book a demo
            </span>
            <h1 className="font-display mt-4 text-[clamp(30px,3.2vw,44px)] leading-[1.08] font-bold tracking-[-0.02em] text-pretty">
              See What Your Team Could Become.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-[52ch] text-base leading-relaxed break-words">
              Trainera brings AI assessment, onboarding and training together
              in one platform. Tell us a little about your team and we&apos;ll
              walk you through all of it: hiring assessments, the AI classroom,
              realistic practice calls and the reporting your trainers actually
              use.
            </p>

            <ul className="mt-8 space-y-3">
              {NEXT_STEPS.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="bg-secondary text-muted-foreground mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-3" />
                  </span>
                  <span className="min-w-0 text-sm leading-6 break-words">
                    {step}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground mt-8 text-xs leading-5">
              Your details stay with us. We use them to get in touch about
              Trainera and nothing else. Read our{" "}
              <Link href="/privacy" className="text-foreground underline underline-offset-4">
                privacy policy
              </Link>
              .
            </p>
          </div>

          {/* Right — the form */}
          <div className="bg-card shadow-float min-w-0 rounded-xl border p-6 sm:p-8">
            <DemoForm />
          </div>
        </div>

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <BrandMark size="sm" />
          <span className="text-muted-foreground text-xs break-words">
            © 2026 Trainera. AI training for teams that talk to customers.
          </span>
        </footer>
      </div>
    </main>
  );
}
