import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { appLoginUrl } from "@/lib/site";

/**
 * The shell for the site's plain reading pages (Security, and the pages that
 * explain each use of Trainera): the logo and Log in, one readable column,
 * a Book a demo band and a footer that links the pages to each other.
 *
 * Same look as the privacy policy, which keeps its own copy of this layout
 * because it is a legal document.
 *
 * Copy rules (README): no dashes or hyphenated words, never name an outside
 * company, and every claim must already be true in the app.
 */

/** Every reading page, for the footer links. Add a new page here. */
export const READING_PAGES: { href: string; label: string }[] = [
  { href: "/contact-centre-training", label: "Contact centre training" },
  { href: "/candidate-assessment", label: "Candidate assessment" },
  { href: "/training-courses", label: "Courses from your documents" },
  { href: "/security", label: "Security and data" },
  { href: "/privacy", label: "Privacy policy" },
];

export function ContentPage({
  label,
  title,
  intro,
  children,
  cta = true,
}: {
  label: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
  cta?: boolean;
}) {
  return (
    <main className="bg-background min-h-svh px-[5vw] py-8">
      <div className="mx-auto max-w-[1240px]">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center" aria-label="Trainera home">
            <BrandMark size="sm" />
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/book-a-demo"
              className="text-muted-foreground hover:text-foreground text-[13px] font-medium transition-colors"
            >
              Book a demo
            </Link>
            {/* Log in is on the app's own address (see lib/site.ts). */}
            <a
              href={appLoginUrl()}
              className="text-muted-foreground hover:text-foreground text-[13px] font-medium transition-colors"
            >
              Log in
            </a>
          </div>
        </header>

        <article className="mx-auto mt-14 max-w-[760px] min-w-0 lg:mt-20">
          <span className="section-label text-accent-foreground">{label}</span>
          <h1 className="font-display mt-4 text-[clamp(30px,3.2vw,44px)] leading-[1.08] font-bold tracking-[-0.02em] text-pretty break-words">
            {title}
          </h1>
          <div className="mt-6 text-lg leading-8 break-words">{intro}</div>

          {children}

          {cta ? <DemoBand /> : null}
        </article>

        <footer className="mt-24 border-t pt-6">
          <nav aria-label="More from Trainera">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground hover:text-accent-foreground underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              {READING_PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-foreground hover:text-accent-foreground underline-offset-4 hover:underline"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <BrandMark size="sm" />
            <span className="text-muted-foreground text-xs break-words">
              © 2026 Trainera. AI training for teams that talk to customers.
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}

export function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-8">
      <h2 className="font-display text-[22px] leading-tight font-bold tracking-[-0.01em] break-words">{title}</h2>
      <div className="text-foreground/90 mt-4 space-y-4 text-[15px] leading-7 break-words">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function Steps({ items }: { items: [string, string][] }) {
  return (
    <ol className="space-y-4">
      {items.map(([title, body], i) => (
        <li key={title} className="flex gap-4">
          <span
            className="bg-secondary text-foreground flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-semibold"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="text-foreground font-semibold">{title}</p>
            <p className="mt-1">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Book a demo, the page's one orange button: charcoal text on orange (README rule 3). */
function DemoBand() {
  return (
    <section className="bg-secondary mt-16 rounded-[10px] border p-6 sm:p-8">
      <h2 className="font-display text-[24px] leading-tight font-bold tracking-[-0.01em]">
        See it with your own calls
      </h2>
      <p className="text-muted-foreground mt-3 text-[15px] leading-7">
        We&apos;ll show you Trainera with the kinds of conversations your team handles every day.
      </p>
      <Link
        href="/book-a-demo"
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-[#f7841e] px-5 text-[15px] font-semibold text-[#211f1c] transition-colors hover:bg-[#ee7614]"
      >
        Book a demo
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-foreground font-medium underline underline-offset-4">
      {children}
    </Link>
  );
}
