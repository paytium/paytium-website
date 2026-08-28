import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "../../../components/BlogArticlePage";
import { blogArticles, findBlogArticle } from "../../../content/blog";

export function generateStaticParams() { return blogArticles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = findBlogArticle(slug);
  if (!article) return { title: "Paytium | Article introuvable", robots: { index: false, follow: true } };
  const canonical = `/blog/${slug}/`;
  const image = article.image ? [{ url: `https://paytium.io${article.image}`, alt: article.imageAlt.fr }] : [];
  return { title: `Paytium | ${article.title.fr}`, description: article.summary.fr, alternates: { canonical, languages: { "fr-FR": canonical, "en-US": `/en/blog/${slug}/` } }, openGraph: { siteName: "Paytium", title: article.title.fr, description: article.summary.fr, url: canonical, type: "article", locale: "fr_FR", alternateLocale: ["en_US"], publishedTime: article.date, authors: ["Paytium"], tags: [article.theme.fr], images: image }, twitter: { card: article.image ? "summary_large_image" : "summary", title: article.title.fr, description: article.summary.fr, images: image } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = findBlogArticle((await params).slug);
  if (!article) notFound();
  return <BlogArticlePage article={article} includeDocumentMetadata={false} />;
}
