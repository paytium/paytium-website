import { Breadcrumbs, PageShell } from "./SiteShell";
import { BlogVisual } from "./BlogVisual";
import { BlogPrintButton, BlogShare } from "./BlogArticleActions";
import { blogArticles, blogHref, formatBlogDate, type BlogArticle, type BlogLocale } from "../content/blog";

export function BlogArticlePage({ article, locale = "fr", includeDocumentMetadata = true }: { article: BlogArticle; locale?: BlogLocale; includeDocumentMetadata?: boolean }) {
  const index = blogArticles.indexOf(article);
  const canonical = `https://paytium.io${blogHref(article, locale)}`;
  const alternate = `https://paytium.io${blogHref(article, locale === "fr" ? "en" : "fr")}`;
  return <>{includeDocumentMetadata && <>
    <title>{`Paytium | ${article.title[locale]}`}</title>
    <meta name="description" content={article.summary[locale]} />
    <link rel="canonical" href={canonical} />
    <link rel="alternate" hrefLang={locale === "fr" ? "en" : "fr"} href={alternate} />
    <meta property="og:title" content={article.title[locale]} />
    <meta property="og:description" content={article.summary[locale]} />
    <meta property="og:url" content={canonical} />
    <meta property="og:type" content="article" />
    {article.image && <meta property="og:image" content={`https://paytium.io${article.image}`} />}
  </>}
  <PageShell locale={locale} translationHref={blogHref(article, locale === "fr" ? "en" : "fr")} activeNav="blog">
    <Breadcrumbs locale={locale} items={[{ label: "Blog", href: `${locale === "en" ? "/en" : ""}/blog/` }, { label: article.title[locale], href: blogHref(article, locale) }]} />
    <article className="blog-article">
      <header className="article-header"><div><span className="blog-tag">{article.theme[locale]}</span><h1>{article.title[locale]}</h1><time dateTime={article.date}>{formatBlogDate(article.date, locale)}</time></div><BlogPrintButton locale={locale} /></header>
      <BlogVisual article={article} index={index} locale={locale} large />
      <div className="article-content">{article.sections[locale].map((block, blockIndex) => {
        if (block.type === "heading") return <h2 key={blockIndex}>{block.text}</h2>;
        if (block.type === "lead") return <p className="article-lead" key={blockIndex}>{block.text}</p>;
        if (block.type === "paragraph") return <p key={blockIndex}>{block.text}</p>;
        if (block.type === "callout") return <aside className="article-callout" key={blockIndex}>{block.text}</aside>;
        if (block.type === "note") return <p className="article-note" key={blockIndex}>{block.text}</p>;
        if (block.type === "list") return <ul key={blockIndex}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        return <div className="article-sources" key={blockIndex}><h2>{locale === "fr" ? "Sources officielles" : "Official sources"}</h2><ul>{block.items.map((item) => <li key={item.url}><a href={item.url} target="_blank" rel="noreferrer">{item.label}</a></li>)}</ul></div>;
      })}</div>
    </article>
    <BlogShare locale={locale} title={article.title[locale]} />
  </PageShell></>;
}
