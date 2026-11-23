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
