import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Search engines may crawl the whole website. Pages that shouldn't appear in
 * search results (the link-shared promo and CSIA pages) say so in their own
 * `metadata.robots`. The app (app.trainera.ai) has its own robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
