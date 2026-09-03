import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "../../../../components/BlogArticlePage";
import { blogArticles, blogArticleStructuredData, findBlogArticle } from "../../../../content/blog";

export function generateStaticParams() { return blogArticles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = findBlogArticle(slug);
  if (!article) return { title: "Paytium | Article not found", robots: { index: false, follow: true } };
  const canonical = `/en/blog/${slug}/`;
  const image = article.image ? [{ url: `https://paytium.io${article.image}`, alt: article.imageAlt.en }] : [];
  const title = article.metaTitle?.en || article.title.en;
  const description = article.metaDescription?.en || article.summary.en;
  const tags = article.tags?.en?.length ? article.tags.en : [article.theme.en, "Paytium Insights"];
  return { title: `Paytium | ${title}`, description, keywords: tags, authors: [{ name: "Paytium", url: "https://paytium.io/" }], category: article.theme.en, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }, alternates: { canonical, languages: { "fr-FR": `/blog/${slug}/`, "en-US": canonical } }, openGraph: { siteName: "Paytium", title, description, url: canonical, type: "article", locale: "en_US", alternateLocale: ["fr_FR"], publishedTime: article.date, modifiedTime: article.date, authors: ["Paytium"], section: article.theme.en, tags, images: image }, twitter: { card: article.image ? "summary_large_image" : "summary", title, description, images: image } };
}

export default async function EnglishArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = findBlogArticle((await params).slug);
  if (!article) notFound();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogArticleStructuredData(article, "en")).replaceAll("<", "\\u003c") }} /><BlogArticlePage article={article} locale="en" includeDocumentMetadata={false} /></>;
}
