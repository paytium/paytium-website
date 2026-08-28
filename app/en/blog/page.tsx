import type { Metadata } from "next";
import { BlogIndex } from "../../../components/BlogIndex";
import { Breadcrumbs, PageShell } from "../../../components/SiteShell";
import { blogIndexStructuredData } from "../../../content/blog";

const description = "Paytium insights on e-invoicing, payments, cash management, digital banking, APIs and business process automation.";

export const metadata: Metadata = {
  title: "Paytium | Blog",
  description,
  keywords: ["Paytium Insights", "Paytium blog", "e-invoicing", "electronic invoicing", "DGI", "payments", "cash management", "digital banking", "API", "automation"],
  authors: [{ name: "Paytium", url: "https://paytium.io/" }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "/en/blog/", languages: { "fr-FR": "/blog/", "en-US": "/en/blog/" } },
  openGraph: { title: "Paytium | Blog", description, url: "/en/blog/", type: "website", locale: "en_US", alternateLocale: ["fr_FR"], siteName: "Paytium", images: [{ url: "/og-paytium.png", width: 1200, height: 630, alt: "Paytium — Build. Secure. Scale." }] },
  twitter: { card: "summary_large_image", title: "Paytium | Blog", description, images: [{ url: "/og-paytium.png", alt: "Paytium Insights" }] },
};

export default function EnglishBlogPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexStructuredData("en")).replaceAll("<", "\\u003c") }} /><PageShell locale="en" translationHref="/blog/" activeNav="blog"><Breadcrumbs locale="en" items={[{ label: "Blog", href: "/en/blog/" }]} /><section className="blog-hero"><span className="eyebrow"><span />PAYTIUM INSIGHTS</span><h1>Welcome to the <em>Paytium blog.</em></h1><p>Your source for insight into the digital transformation of financial services and business processes. We share trends, analysis and practical guidance on e-invoicing, payments, cash management, digital banking, APIs and automation.</p><strong>Understand the technologies and innovations shaping tomorrow’s financial services.</strong></section><section className="blog-list-section"><BlogIndex locale="en" /></section></PageShell></>;
}
