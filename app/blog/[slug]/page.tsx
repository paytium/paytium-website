import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "../../../components/BlogArticlePage";
import { blogArticles, blogArticleStructuredData, findBlogArticle } from "../../../content/blog";

export function generateStaticParams() { return blogArticles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = findBlogArticle(slug);
  if (!article) return { title: "Paytium | Article introuvable", robots: { index: false, follow: true } };
  const canonical = `/blog/${slug}/`;
  const image = article.image ? [{ url: `https://paytium.io${article.image}`, alt: article.imageAlt.fr }] : [];
  return { title: `Paytium | ${article.title.fr}`, description: article.summary.fr, keywords: [article.theme.fr, "Paytium Insights", "facturation électronique Maroc", "e-invoicing Morocco", "DGI", "UBL", "ERP", "CSP"], authors: [{ name: "Paytium", url: "https://paytium.io/" }], category: article.theme.fr, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }, alternates: { canonical, languages: { "fr-FR": canonical, "en-US": `/en/blog/${slug}/` } }, openGraph: { siteName: "Paytium", title: article.title.fr, description: article.summary.fr, url: canonical, type: "article", locale: "fr_FR", alternateLocale: ["en_US"], publishedTime: article.date, modifiedTime: article.date, authors: ["Paytium"], section: article.theme.fr, tags: [article.theme.fr, "DGI", "UBL", "ERP", "CSP"], images: image }, twitter: { card: article.image ? "summary_large_image" : "summary", title: article.title.fr, description: article.summary.fr, images: image } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = findBlogArticle((await params).slug);
  if (!article) notFound();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogArticleStructuredData(article, "fr")).replaceAll("<", "\\u003c") }} /><BlogArticlePage article={article} includeDocumentMetadata={false} /></>;
}
