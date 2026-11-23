import type { Metadata } from "next";

import { PremiumLandingPage } from "@/components/landing/premium-page";
import { SHARE_IMAGE, SITE_URL, appLoginUrl, organizationJsonLd } from "@/lib/site";

/**
 * The home page (trainera.ai). The whole page lives in
 * components/landing/premium-page.tsx; its styles are in
 * components/landing/premium.css.
 *
 * "Log in" goes to the app (app.trainera.ai/login), a different website, so
 * it is passed in as a full address. "Book a demo" stays on this site.
 */
const TITLE =
  "Trainera | AI training for contact centres and teams that talk to customers";
const DESCRIPTION =
  "Trainera is an AI training platform for contact centres and teams that talk to customers. Your people practise real conversations with AI customers, get scored against your standards and get ready faster.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Trainera",
    type: "website",
    locale: "en_AU",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Who we are, for search engines: the name and logo Google shows. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(DESCRIPTION)) }}
      />
      <PremiumLandingPage loginUrl={appLoginUrl()} />
    </>
  );
}
