import { MetadataRoute } from "next";
import { storeConfig } from "@/config/product";

export default function robots(): MetadataRoute.Robots {
  const domain = storeConfig.domain.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you", "/upsell"],
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
