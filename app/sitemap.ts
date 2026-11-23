import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * The pages search engines should know about. Add a new public page here.
 * (The promo and CSIA share pages are deliberately left out.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/book-a-demo`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/contact-centre-training`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/candidate-assessment`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/training-courses`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/security`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
