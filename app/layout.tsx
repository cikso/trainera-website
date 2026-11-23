import type { Metadata } from "next";

// Fonts are bundled with the site (@fontsource): Bricolage Grotesque for
// headings, Inter for everything else, JetBrains Mono for the small "Step 1"
// style labels. Don't switch to next/font/google.
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";

import "./globals.css";

import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Trainera",
  // This is the public website, so pages are indexable unless a page says
  // otherwise (the link-shared promo and CSIA pages opt out).
  robots: { index: true, follow: true },
  // favicon.ico (app/) is for browsers that ask for it by name; the
  // iPhone home-screen icon lives at the address iPhones look for by default.
  icons: { icon: "/trainera-icon.svg", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `data-scroll-behavior="smooth"` is a marker Next.js reads (it is not a
    // style): it keeps page-to-page navigation from animating its scroll to
    // the top. The smooth scrolling itself is the `#s-hero` rule in
    // globals.css.
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
