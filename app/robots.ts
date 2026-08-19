import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /preview is an internal tool for choosing a background — useful to keep,
    // but it should never turn up in search results.
    rules: { userAgent: "*", allow: "/", disallow: "/preview" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
