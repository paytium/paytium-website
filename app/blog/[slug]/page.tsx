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
  const title = article.metaTitle?.fr || article.title.fr;
  const description = article.metaDescription?.fr || article.summary.fr;
  const tags = article.tags?.fr?.length ? article.tags.fr : [article.theme.fr, "Paytium Insights"];
  return { title: `Paytium | ${title}`, description, keywords: tags, authors: [{ name: "Paytium", url: "https://paytium.io/" }], category: article.theme.fr, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }, alternates: { canonical, languages: { "fr-FR": canonical, "en-US": `/en/blog/${slug}/` } }, openGraph: { siteName: "Paytium", title, description, url: canonical, type: "article", locale: "fr_FR", alternateLocale: ["en_US"], publishedTime: article.date, modifiedTime: article.date, authors: ["Paytium"], section: article.theme.fr, tags, images: image }, twitter: { card: article.image ? "summary_large_image" : "summary", title, description, images: image } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = findBlogArticle((await params).slug);
  if (!article) notFound();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogArticleStructuredData(article, "fr")).replaceAll("<", "\\u003c") }} /><BlogArticlePage article={article} includeDocumentMetadata={false} /></>;
}
