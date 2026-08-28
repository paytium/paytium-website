import { LuBot, LuBraces, LuLandmark, LuNetwork, LuReceiptText } from "react-icons/lu";
import type { BlogArticle, BlogLocale } from "../content/blog";

const icons = [LuReceiptText, LuNetwork, LuBraces, LuLandmark, LuBot];

export function BlogVisual({ article, index = 0, large = false, locale = "fr" }: { article: BlogArticle; index?: number; large?: boolean; locale?: BlogLocale }) {
  if (article.image) return <div className={`blog-visual ${large ? "large" : ""}`}><img src={article.image} alt={article.imageAlt[locale]} /><span className="blog-visual-brand" aria-hidden="true"><img className="blog-visual-brand-logo" src="/logo-paytium.svg" alt="" /><b>INSIGHTS</b></span></div>;
  const Icon = icons[index % icons.length];
  return <div className={`blog-visual blog-poster poster-${index % 5} ${large ? "large" : ""}`} role="img" aria-label={article.imageAlt[locale]}>
    <span className="poster-grid" aria-hidden="true" />
    <Icon aria-hidden="true" />
    <strong>PAYTIUM <small>INSIGHTS</small></strong>
  </div>;
}
