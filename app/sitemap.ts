import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://paytium.io";
  const routes = [["", "/en/"], ["/services/", "/en/services/"], ["/case-studies/", "/en/case-studies/"], ["/e-invoicing/", "/en/e-invoicing/"], ["/academy/", "/en/academy/"]];
  return routes.flatMap(([fr, en], pairIndex) => [fr, en].map((route, localeIndex) => ({
    url: `${base}${route || "/"}`,
    lastModified: new Date(),
    changeFrequency: pairIndex === 0 ? "weekly" : "monthly",
    priority: pairIndex === 0 ? localeIndex === 0 ? 1 : .9 : .8,
    alternates: { languages: { fr: `${base}${fr || "/"}`, en: `${base}${en}`, "x-default": `${base}${fr || "/"}` } },
  })));
}
