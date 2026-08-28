import type { Metadata } from "next";
import { BlogIndex } from "../../components/BlogIndex";
import { Breadcrumbs, PageShell } from "../../components/SiteShell";
import { blogIndexStructuredData } from "../../content/blog";

const description = "Analyses Paytium sur la facturation électronique, les paiements, le Cash Management, le Digital Banking, les API et l’automatisation des processus.";

export const metadata: Metadata = {
  title: "Paytium | Blog",
  description,
  keywords: ["Paytium Insights", "blog Paytium", "facturation électronique", "e-invoicing", "DGI", "paiements", "Cash Management", "Digital Banking", "API", "automatisation"],
  authors: [{ name: "Paytium", url: "https://paytium.io/" }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "/blog/", languages: { "fr-FR": "/blog/", "en-US": "/en/blog/" } },
  openGraph: { title: "Paytium | Blog", description, url: "/blog/", type: "website", locale: "fr_FR", alternateLocale: ["en_US"], siteName: "Paytium", images: [{ url: "/og-paytium.png", width: 1200, height: 630, alt: "Paytium — Build. Secure. Scale." }] },
  twitter: { card: "summary_large_image", title: "Paytium | Blog", description, images: [{ url: "/og-paytium.png", alt: "Paytium Insights" }] },
};

export default function BlogPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexStructuredData("fr")).replaceAll("<", "\\u003c") }} /><PageShell translationHref="/en/blog/" activeNav="blog"><Breadcrumbs items={[{ label: "Blog", href: "/blog/" }]} /><section className="blog-hero"><span className="eyebrow"><span />INSIGHTS PAYTIUM</span><h1>Bienvenue sur le <em>blog de Paytium.</em></h1><p>Votre source d’informations sur la transformation digitale des services financiers et des processus métiers. Nous partageons tendances, analyses et bonnes pratiques autour de la facturation électronique, des paiements, du Cash Management, du Digital Banking, des API et de l’automatisation.</p><strong>Décryptez les technologies et les innovations qui façonnent les services financiers de demain.</strong></section><section className="blog-list-section"><BlogIndex /></section></PageShell></>;
}
