import type { Metadata } from "next";
import { BlogArticlePage } from "../../../../components/BlogArticlePage";
import { blogArticles, findBlogArticle } from "../../../../content/blog";

export function generateStaticParams() { return blogArticles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = findBlogArticle(slug);
  if (!article) return { title: "Paytium | Article not found", robots: { index: false, follow: true } };
  const canonical = `/en/blog/${slug}/`;
  const image = article.image ? [{ url: `https://paytium.io${article.image}`, alt: article.imageAlt.en }] : [];
  return { title: `Paytium | ${article.title.en}`, description: article.summary.en, alternates: { canonical, languages: { "fr-FR": `/blog/${slug}/`, "en-US": canonical } }, openGraph: { title: article.title.en, description: article.summary.en, url: canonical, type: "article", locale: "en_US", alternateLocale: ["fr_FR"], publishedTime: article.date, authors: ["Paytium"], tags: [article.theme.en], images: image }, twitter: { card: article.image ? "summary_large_image" : "summary", title: article.title.en, description: article.summary.en, images: image } };
}

export default async function EnglishArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = findBlogArticle((await params).slug);
  if (!article) return null;
  return <BlogArticlePage article={article} locale="en" includeDocumentMetadata={false} />;
}
