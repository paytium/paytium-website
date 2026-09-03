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
  readingTime?: Record<BlogLocale, string>;
  theme: Record<BlogLocale, string>;
  tags?: Record<BlogLocale, string[]>;
  title: Record<BlogLocale, string>;
  summary: Record<BlogLocale, string>;
  metaTitle?: Record<BlogLocale, string>;
  metaDescription?: Record<BlogLocale, string>;
  image: string | null;
  imageAlt: Record<BlogLocale, string>;
  sections: Record<BlogLocale, BlogBlock[]>;
};

export const blogArticles = (blogData as BlogArticle[]).slice().sort((a, b) => b.date.localeCompare(a.date));
export const findBlogArticle = (slug: string) => blogArticles.find((article) => article.slug === slug);
export const blogHref = (article: BlogArticle, locale: BlogLocale) => `${locale === "en" ? "/en" : ""}/blog/${article.slug}/`;

export function blogArticleStructuredData(article: BlogArticle, locale: BlogLocale) {
  const url = `https://paytium.io${blogHref(article, locale)}`;
  const blogUrl = `https://paytium.io${locale === "en" ? "/en" : ""}/blog/`;
  const language = locale === "en" ? "en-US" : "fr-FR";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: article.title[locale],
        description: article.metaDescription?.[locale] || article.summary[locale],
        articleSection: article.theme[locale],
        keywords: article.tags?.[locale]?.length ? article.tags[locale] : [article.theme[locale], "Paytium"],
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: language,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        isPartOf: { "@type": "Blog", "@id": `${blogUrl}#blog`, name: "Paytium Insights", url: blogUrl },
        author: { "@type": "Organization", "@id": "https://paytium.io/#organization", name: "Paytium", url: "https://paytium.io/" },
        publisher: { "@type": "Organization", "@id": "https://paytium.io/#organization", name: "Paytium", logo: { "@type": "ImageObject", url: "https://paytium.io/apple-touch-icon.png" } },
        ...(article.image ? { image: { "@type": "ImageObject", url: `https://paytium.io${article.image}` } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : "Accueil", item: `https://paytium.io${locale === "en" ? "/en/" : "/"}` },
          { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl },
          { "@type": "ListItem", position: 3, name: article.title[locale], item: url },
        ],
      },
    ],
  };
}

export function blogIndexStructuredData(locale: BlogLocale) {
  const url = `https://paytium.io${locale === "en" ? "/en" : ""}/blog/`;
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    name: "Paytium Insights",
    description: locale === "en"
      ? "Paytium insights on e-invoicing, payments, cash management, digital banking, APIs and automation."
      : "Analyses Paytium sur la facturation électronique, les paiements, le Cash Management, le Digital Banking, les API et l’automatisation.",
    url,
    inLanguage: locale === "en" ? "en-US" : "fr-FR",
    publisher: { "@type": "Organization", "@id": "https://paytium.io/#organization", name: "Paytium" },
    blogPost: blogArticles.map((article) => ({
      "@type": "BlogPosting",
      "@id": `https://paytium.io${blogHref(article, locale)}#article`,
      headline: article.title[locale],
      description: article.summary[locale],
      datePublished: article.date,
      articleSection: article.theme[locale],
      url: `https://paytium.io${blogHref(article, locale)}`,
      ...(article.image ? { image: `https://paytium.io${article.image}` } : {}),
    })),
  };
}

export function formatBlogDate(date: string, locale: BlogLocale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
