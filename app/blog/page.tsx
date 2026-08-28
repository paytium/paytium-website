import type { Metadata } from "next";
import { BlogIndex } from "../../components/BlogIndex";
import { Breadcrumbs, PageShell } from "../../components/SiteShell";

const description = "Analyses Paytium sur la facturation électronique, les paiements, le Cash Management, le Digital Banking, les API et l’automatisation des processus.";

export const metadata: Metadata = {
  title: "Paytium | Blog",
  description,
  alternates: { canonical: "/blog/", languages: { "fr-FR": "/blog/", "en-US": "/en/blog/" } },
  openGraph: { title: "Paytium | Blog", description, url: "/blog/", type: "website", locale: "fr_FR", alternateLocale: ["en_US"], siteName: "Paytium", images: [{ url: "/og-paytium.png", width: 1200, height: 630, alt: "Paytium — Build. Secure. Scale." }] },
};

export default function BlogPage() {
  return <PageShell translationHref="/en/blog/" activeNav="blog"><Breadcrumbs items={[{ label: "Blog", href: "/blog/" }]} /><section className="blog-hero"><span className="eyebrow"><span />INSIGHTS PAYTIUM</span><h1>Bienvenue sur le <em>blog de Paytium.</em></h1><p>Votre source d’informations sur la transformation digitale des services financiers et des processus métiers. Nous partageons tendances, analyses et bonnes pratiques autour de la facturation électronique, des paiements, du Cash Management, du Digital Banking, des API et de l’automatisation.</p><strong>Décryptez les technologies et les innovations qui façonnent les services financiers de demain.</strong></section><section className="blog-list-section"><BlogIndex /></section></PageShell>;
}
