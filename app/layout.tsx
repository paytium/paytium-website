import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { PageLoader } from "../components/PageLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paytium.io"),
  title: "Paytium | Conseil & technologie",
  description: "Paytium est un cabinet de conseil et de delivery digital : stratégie IT, Squad As Service, Data & IA, Cloud, DevOps et facturation électronique.",
  applicationName: "Paytium",
  authors: [{ name: "Paytium", url: "https://paytium.io" }],
  creator: "Paytium",
  publisher: "Paytium",
  keywords: ["Paytium", "Squad As Service", "squad Agile", "équipe produit externalisée", "transformation digitale", "cabinet conseil IT", "développement logiciel", "intégration ERP", "Data IA", "Cloud DevOps", "e-facture", "facturation électronique", "facturation électronique DGI", "e-invoice", "e-invoicing", "Casablanca"],
  alternates: { canonical: "/", languages: { "fr-FR": "/", "en-US": "/en/" } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    title: "Paytium | Conseil & technologie",
    description: "Conseil, produits digitaux, Squad As Service, data et cloud pour accélérer vos transformations.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    siteName: "Paytium",
    url: "/",
    images: [{ url: "/og-paytium.png", width: 1200, height: 630, alt: "Paytium — Build. Secure. Scale." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paytium | Conseil & technologie",
    description: "De la vision à l’impact : conseil, produits digitaux, Squad As Service, data et cloud.",
    images: [{ url: "/og-paytium.png", alt: "Paytium — Build. Secure. Scale." }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-rounded.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "192x192", type: "image/png" }],
  },
};

const organisationId = "https://paytium.io/#organization";
const websiteId = "https://paytium.io/#website";
const mainNavigation = [
  ["À propos de Paytium", "https://paytium.io/about/"],
  ["Services Paytium", "https://paytium.io/services/"],
  ["Études de cas", "https://paytium.io/case-studies/"],
  ["Facturation électronique", "https://paytium.io/e-invoicing/"],
  ["Paytium Academy", "https://paytium.io/academy/"],
  ["Blog Paytium", "https://paytium.io/blog/"],
  ["Contact Paytium", "https://paytium.io/contact/"],
].map(([name, url], index) => ({ "@type": "SiteNavigationElement", "@id": `https://paytium.io/#navigation-${index + 1}`, name, url, isPartOf: { "@id": websiteId } }));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organisationId,
      name: "Paytium",
      legalName: "Paytium",
      alternateName: "paytium.io",
      url: "https://paytium.io/",
      description: "Cabinet de conseil et de delivery digital spécialisé en stratégie technologique, produits digitaux, Data & IA, Squad As Service, DevSecOps, cloud et facturation électronique.",
      logo: { "@type": "ImageObject", "@id": "https://paytium.io/#logo", url: "https://paytium.io/apple-touch-icon.png", contentUrl: "https://paytium.io/apple-touch-icon.png", width: 192, height: 192, caption: "Paytium" },
      image: { "@type": "ImageObject", url: "https://paytium.io/og-paytium.png", width: 1200, height: 630 },
      email: "connect@paytium.io",
      telephone: "+212707252336",
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "connect@paytium.io", telephone: "+212707252336", availableLanguage: ["French", "English"] },
      sameAs: ["https://www.linkedin.com/company/paytium"],
      address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
      areaServed: "International",
      knowsAbout: ["Transformation digitale", "Business & Technology Consulting", "Digital & Data Factory", "Squad As Service", "DevSecOps & Cloud Engineering", "Facturation électronique", "E-invoicing"],
    },
    { "@type": "WebSite", "@id": websiteId, url: "https://paytium.io/", name: "Paytium", alternateName: "paytium.io", publisher: { "@id": organisationId }, inLanguage: ["fr-FR", "en-US"] },
    { "@type": "ProfessionalService", "@id": "https://paytium.io/#professional-service", name: "Paytium", url: "https://paytium.io/", description: "Conseil technologique, delivery digital et expertise à la demande.", logo: { "@id": "https://paytium.io/#logo" }, email: "connect@paytium.io", telephone: "+212707252336", sameAs: ["https://www.linkedin.com/company/paytium"], areaServed: "International", address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" }, parentOrganization: { "@id": organisationId } },
    ...mainNavigation,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}>
        <PageLoader />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var p=location.pathname,s=localStorage.getItem('paytium-language'),n=(navigator.language||'fr').toLowerCase(),b=/bot|crawl|spider|slurp|bingpreview/i.test(navigator.userAgent),d=s==='en'||s==='fr'?s:n.indexOf('en')===0?'en':'fr';if(!b&&p==='/'&&d==='en')location.replace('/en/'+location.search+location.hash)}catch(e){}})();` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
