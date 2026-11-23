import { APP_URL } from "@/lib/site";

/**
 * Any address this website doesn't have a page for is sent on to the app,
 * with the same path and query: trainera.ai/login → app.trainera.ai/login.
 *
 * Until November 2026 the app itself answered on trainera.ai, so people have
 * old links and bookmarks like trainera.ai/login, /dashboard or /verify/…;
 * this keeps every one of them working. Real pages always win: adding
 * app/about/page.tsx makes trainera.ai/about a page here, not a redirect.
 *
 * 308 keeps the request's method (a form POST stays a POST).
 */
function forwardToApp(request: Request): Response {
  const incoming = new URL(request.url);
  const target = new URL(APP_URL);
  // Only the path and query are copied, so the redirect can never point at
  // any website other than the app.
  target.pathname = incoming.pathname;
  target.search = incoming.search;
  return Response.redirect(target.toString(), 308);
}

export const GET = forwardToApp;
export const HEAD = forwardToApp;
export const POST = forwardToApp;
export const PUT = forwardToApp;
export const PATCH = forwardToApp;
export const DELETE = forwardToApp;
export const OPTIONS = forwardToApp;
