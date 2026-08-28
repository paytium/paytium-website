import blogData from "./blog.json";

export type BlogLocale = "fr" | "en";
export type BlogBlock =
  | { type: "lead" | "paragraph" | "heading" | "subheading" | "callout" | "note"; text: string }
  | { type: "list"; items: string[] }
  | { type: "orderedList"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "cspDiagram" }
  | { type: "sources"; items: { label: string; url: string }[] }
  | { type: "cta"; title: string; text: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };

export type BlogArticle = {
  slug: string;
  date: string;
  theme: Record<BlogLocale, string>;
  title: Record<BlogLocale, string>;
  summary: Record<BlogLocale, string>;
  image: string | null;
  imageAlt: Record<BlogLocale, string>;
  sections: Record<BlogLocale, BlogBlock[]>;
};

export const blogArticles = (blogData as BlogArticle[]).slice().sort((a, b) => b.date.localeCompare(a.date));
export const findBlogArticle = (slug: string) => blogArticles.find((article) => article.slug === slug);
export const blogHref = (article: BlogArticle, locale: BlogLocale) => `${locale === "en" ? "/en" : ""}/blog/${article.slug}/`;

export function formatBlogDate(date: string, locale: BlogLocale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
