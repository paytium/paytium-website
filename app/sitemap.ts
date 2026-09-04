import type { MetadataRoute } from "next";
import publicRoutePairs from "../content/generated-public-routes.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://paytium.io";
  return publicRoutePairs.flatMap(({ fr, en }, pairIndex) => [fr, en].map((route, localeIndex) => ({
    url: `${base}${route === "/" ? "/" : `${route}/`}`,
    lastModified: new Date(),
    changeFrequency: pairIndex === 0 ? "weekly" : "monthly",
    priority: pairIndex === 0 ? localeIndex === 0 ? 1 : .9 : .8,
    alternates: { languages: { fr: `${base}${fr === "/" ? "/" : `${fr}/`}`, en: `${base}${en}/`, "x-default": `${base}${fr === "/" ? "/" : `${fr}/`}` } },
  })));
}
