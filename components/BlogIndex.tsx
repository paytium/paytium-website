"use client";

import { useMemo, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuSearch, LuX } from "react-icons/lu";
import { blogArticles, blogHref, formatBlogDate, type BlogLocale } from "../content/blog";
import { BlogVisual } from "./BlogVisual";

const pageSize = 3;

export function BlogIndex({ locale = "fr" }: { locale?: BlogLocale }) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("");
  const [page, setPage] = useState(1);
  const copy = locale === "fr"
    ? { search: "Rechercher un article", placeholder: "Ex. facturation, API, cash management…", themes: "Tous les thèmes", clear: "Effacer les filtres", empty: "Aucun article ne correspond à votre recherche.", read: "Lire l’article", previous: "Page précédente", next: "Page suivante" }
    : { search: "Search articles", placeholder: "E.g. e-invoicing, API, cash management…", themes: "All topics", clear: "Clear filters", empty: "No articles match your search.", read: "Read article", previous: "Previous page", next: "Next page" };
  const themes = useMemo(() => Array.from(new Set(blogArticles.map((article) => article.theme[locale]))).sort(), [locale]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    return blogArticles.filter((article) => (!theme || article.theme[locale] === theme) && (!needle || `${article.title[locale]} ${article.summary[locale]} ${article.theme[locale]}`.toLocaleLowerCase(locale).includes(needle)));
  }, [locale, query, theme]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const updateQuery = (value: string) => { setQuery(value); setPage(1); };
  const updateTheme = (value: string) => { setTheme(value); setPage(1); };
  const clear = () => { setQuery(""); setTheme(""); setPage(1); };

  return <>
    <div className="blog-filters" aria-label={locale === "fr" ? "Filtres des articles" : "Article filters"}>
      <label><span>{copy.search}</span><div><LuSearch aria-hidden="true" /><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder={copy.placeholder} /></div></label>
      <label><span>{locale === "fr" ? "Thème" : "Topic"}</span><select value={theme} onChange={(event) => updateTheme(event.target.value)}><option value="">{copy.themes}</option>{themes.map((item) => <option key={item}>{item}</option>)}</select></label>
      {(query || theme) && <button type="button" onClick={clear}><LuX aria-hidden="true" />{copy.clear}</button>}
    </div>
    <div className="blog-results-status" aria-live="polite">{filtered.length} {locale === "fr" ? filtered.length > 1 ? "articles" : "article" : filtered.length === 1 ? "article" : "articles"}</div>
    {visible.length ? <div className="blog-grid">{visible.map((article) => {
      const index = blogArticles.indexOf(article);
      return <article className="blog-card" key={article.slug}>
        <a className="blog-card-visual" href={blogHref(article, locale)}><BlogVisual article={article} index={index} locale={locale} /></a>
        <div className="blog-card-body"><span className="blog-tag">{article.theme[locale]}</span><h2><a href={blogHref(article, locale)}>{article.title[locale]}</a></h2><time dateTime={article.date}>{formatBlogDate(article.date, locale)}</time><p>{article.summary[locale]}</p><a className="blog-read-more" href={blogHref(article, locale)}>{copy.read}<LuArrowRight aria-hidden="true" /></a></div>
      </article>;
    })}</div> : <div className="blog-empty">{copy.empty}<button type="button" onClick={clear}>{copy.clear}</button></div>}
    {pages > 1 && <nav className="blog-pagination" aria-label={locale === "fr" ? "Pagination des articles" : "Article pagination"}>
      <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} aria-label={copy.previous}><LuArrowLeft aria-hidden="true" /></button>
      {Array.from({ length: pages }, (_, index) => index + 1).map((number) => <button type="button" key={number} className={number === currentPage ? "active" : ""} aria-current={number === currentPage ? "page" : undefined} onClick={() => setPage(number)}>{number}</button>)}
      <button type="button" disabled={currentPage === pages} onClick={() => setPage((value) => Math.min(pages, value + 1))} aria-label={copy.next}><LuArrowRight aria-hidden="true" /></button>
    </nav>}
  </>;
}
