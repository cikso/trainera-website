/**
 * The two addresses this website knows about.
 *
 *   SITE_URL  the marketing site itself (trainera.ai). Used for canonical
 *             links, link previews and the sitemap.
 *   APP_URL   the Trainera app (app.trainera.ai). This website and the app
 *             are separate projects on separate addresses.
 *
 * Both have defaults, so the site needs NO environment variables. Set
 * NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_APP_URL only to point a test build
 * somewhere else.
 */
function trimSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export const SITE_URL = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || "https://trainera.ai");
export const APP_URL = trimSlash(process.env.NEXT_PUBLIC_APP_URL || "https://app.trainera.ai");

/**
 * "Log in" always goes to the APP's address, never a path on this website.
 * Render it as a plain <a href>, not next/link: it is a different website.
 */
export function appLoginUrl(): string {
  return `${APP_URL}/login`;
}

/**
 * Where the "Book a demo" form sends its answers. The app stores the request
 * and emails the team; this website holds no keys or passwords of any kind.
 */
export const DEMO_REQUEST_ENDPOINT = `${APP_URL}/api/demo-request`;

/**
 * The picture link previews show (LinkedIn, Slack, email, search results).
 * A 1200 x 630 copy of the home page's hero banner, made from
 * public/landing/premium/hero-agent.webp and the logo. If the hero's headline
 * or photo changes, make a new one to match.
 */
export const SHARE_IMAGE = {
  url: `${SITE_URL}/og/trainera.jpg`,
  width: 1200,
  height: 630,
  alt: "Trainera: Let your team practise on AI customers before they talk to yours.",
} as const;

/**
 * Who we are, for search engines (schema.org). Google uses this for the
 * name and logo it shows beside the site. Add a profile address to
 * PROFILES (LinkedIn, for example) once it exists; search engines use the
 * list to connect those profiles to this site.
 */
export const PROFILES: string[] = [];

export function organizationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Trainera",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/brand/trainera-logo.png`,
          width: 1147,
          height: 320,
        },
        description,
        ...(PROFILES.length ? { sameAs: PROFILES } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Trainera",
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}
