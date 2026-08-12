import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://paytium.io";
  const routes = [["", "/en"], ["/services", "/en/services"], ["/facturation-electronique", "/en/facturation-electronique"], ["/academy", "/en/academy"]];
  return routes.flatMap(([fr, en], pairIndex) => [fr, en].map((route, localeIndex) => ({
    url: `${base}${route || "/"}`,
    lastModified: new Date(),
    changeFrequency: pairIndex === 0 ? "weekly" : "monthly",
    priority: pairIndex === 0 ? localeIndex === 0 ? 1 : .9 : .8,
    alternates: { languages: { "fr-MA": `${base}${fr || "/"}`, en: `${base}${en}`, "x-default": `${base}${fr || "/"}` } },
  })));
}
