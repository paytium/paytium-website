import { Breadcrumbs, PageShell } from "./SiteShell";
import { BlogVisual } from "./BlogVisual";
import { BlogPrintButton, BlogShare } from "./BlogArticleActions";
import { CspFlowDiagram } from "./CspFlowDiagram";
import { blogArticles, blogHref, formatBlogDate, type BlogArticle, type BlogLocale } from "../content/blog";

export function BlogArticlePage({ article, locale = "fr", includeDocumentMetadata = true }: { article: BlogArticle; locale?: BlogLocale; includeDocumentMetadata?: boolean }) {
  const index = blogArticles.indexOf(article);
  const canonical = `https://paytium.io${blogHref(article, locale)}`;
  const alternate = `https://paytium.io${blogHref(article, locale === "fr" ? "en" : "fr")}`;
  return <>{includeDocumentMetadata && <>
    <title>{`Paytium | ${article.metaTitle?.[locale] || article.title[locale]}`}</title>
    <meta name="description" content={article.metaDescription?.[locale] || article.summary[locale]} />
    <link rel="canonical" href={canonical} />
    <link rel="alternate" hrefLang={locale === "fr" ? "en" : "fr"} href={alternate} />
    <meta property="og:title" content={article.metaTitle?.[locale] || article.title[locale]} />
    <meta property="og:description" content={article.metaDescription?.[locale] || article.summary[locale]} />
    <meta property="og:url" content={canonical} />
    <meta property="og:type" content="article" />
    {article.image && <meta property="og:image" content={`https://paytium.io${article.image}`} />}
  </>}
  <PageShell locale={locale} translationHref={blogHref(article, locale === "fr" ? "en" : "fr")} activeNav="blog">
    <Breadcrumbs locale={locale} items={[{ label: "Blog", href: `${locale === "en" ? "/en" : ""}/blog/` }, { label: article.title[locale], href: blogHref(article, locale) }]} />
    <article className="blog-article">
      <header className="article-header"><div><span className="blog-tag">{article.theme[locale]}</span><h1>{article.title[locale]}</h1><p className="article-meta"><time dateTime={article.date}>{formatBlogDate(article.date, locale)}</time>{article.readingTime && <><span aria-hidden="true">·</span><span>{article.readingTime[locale]}</span></>}</p></div><BlogPrintButton locale={locale} /></header>
      <BlogVisual article={article} index={index} locale={locale} large />
      <div className="article-content">{article.sections[locale].map((block, blockIndex) => {
        if (block.type === "heading") return <h2 key={blockIndex}>{block.text}</h2>;
        if (block.type === "subheading") return <h3 key={blockIndex}>{block.text}</h3>;
        if (block.type === "lead") return <p className="article-lead" key={blockIndex}>{block.text}</p>;
        if (block.type === "paragraph") return <p key={blockIndex}>{block.text}</p>;
        if (block.type === "callout") return <aside className="article-callout" key={blockIndex}>{block.text}</aside>;
        if (block.type === "note") return <p className="article-note" key={blockIndex}>{block.text}</p>;
        if (block.type === "list") return <ul key={blockIndex}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        if (block.type === "orderedList") return <ol key={blockIndex}>{block.items.map((item) => <li key={item}>{item}</li>)}</ol>;
        if (block.type === "table") return <div className="article-table-wrap" key={blockIndex}><table><thead><tr>{block.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
        if (block.type === "articleImage") return <figure className="article-inline-visual" key={blockIndex}><img src={block.src} alt={block.alt} loading="lazy" /><figcaption>{block.caption}</figcaption></figure>;
        if (block.type === "cspDiagram") return <CspFlowDiagram key={blockIndex} locale={locale} />;
        if (block.type === "cta") return <aside className="article-cta" key={blockIndex}><div><span>{locale === "fr" ? "Passez à l’action" : "Take the next step"}</span><h2>{block.title}</h2><p>{block.text}</p></div><div className="article-cta-actions"><a className="primary" href={block.primary.href}>{block.primary.label}</a><a href={block.secondary.href}>{block.secondary.label}</a></div></aside>;
        return <div className="article-sources" key={blockIndex}><h2>{locale === "fr" ? "Sources et références" : "Sources and references"}</h2><ul>{block.items.map((item) => <li key={item.url}><a href={item.url} target="_blank" rel="noreferrer">{item.label}</a></li>)}</ul></div>;
      })}</div>
    </article>
    <BlogShare locale={locale} title={article.title[locale]} />
  </PageShell></>;
}
