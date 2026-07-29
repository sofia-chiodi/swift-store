import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/cart", "/checkout", "/orders", "/favorites"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
