import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://paytium.io";
  const routes = ["", "/services", "/facturation-electronique", "/academy", "/en", "/en/services", "/en/facturation-electronique", "/en/academy"];
  return routes.map((route, index) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: index < 2 ? "weekly" : "monthly", priority: index === 0 ? 1 : route === "/en" ? .9 : .8 }));
}
