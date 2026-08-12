import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://northstar-momentum.ltt-6.chatgpt.site/sitemap.xml" };
}
