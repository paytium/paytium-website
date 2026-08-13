import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
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
  title: { default: "Paytium Maroc | Conseil IT & transformation digitale", template: "%s | Paytium" },
  description: "Cabinet de conseil et d’ingénierie digitale à Casablanca : stratégie IT, logiciels sur mesure, Data & IA, Cloud, DevOps et facturation électronique.",
  applicationName: "Paytium",
  authors: [{ name: "Paytium", url: "https://paytium.io" }],
  creator: "Paytium",
  publisher: "Paytium",
  keywords: ["Paytium", "Paytium Maroc", "transformation digitale Maroc", "cabinet conseil IT Maroc", "développement logiciel Maroc", "intégration ERP Maroc", "Data IA Maroc", "Cloud DevOps Maroc", "e-facture Maroc", "facturation électronique Maroc", "facturation électronique DGI", "e-invoice Morocco", "e-invoicing Morocco", "Casablanca"],
  alternates: { canonical: "/", languages: { "fr-FR": "/", "en-US": "/en" } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    title: "Paytium | Transformation digitale",
    description: "Conseil, produits digitaux, data, engineering et cloud pour des transformations utiles, fiables et évolutives.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    siteName: "Paytium",
    url: "/",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Paytium — stratégie, technologie et impact" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paytium | Transformation digitale",
    description: "De la vision à l’impact : conseil, produits digitaux, data, engineering et cloud.",
    images: [{ url: "/og.png", alt: "Paytium — stratégie, technologie et impact" }],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var p=location.pathname,c=p==='/en'||p.indexOf('/en/')===0?'en':'fr',s=localStorage.getItem('paytium-language'),n=(navigator.language||'fr').toLowerCase(),b=/bot|crawl|spider|slurp|bingpreview/i.test(navigator.userAgent),d=s==='en'||s==='fr'?s:n.indexOf('en')===0?'en':'fr';if(!b&&d!==c){var t=d==='en'?'/en'+(p==='/'?'':p):(p.replace(/^\\/en(?=\\/|$)/,'')||'/');location.replace(t+location.search+location.hash)}}catch(e){}})();` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", "@id": "https://paytium.io/#organization", name: "Paytium", alternateName: ["Paytium Maroc", "Paytium Morocco"], url: "https://paytium.io", logo: "https://paytium.io/logo-paytium.svg", email: "connect@paytium.io", telephone: "+212707252336", contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "connect@paytium.io", telephone: "+212707252336", availableLanguage: ["French", "English"] }, sameAs: ["https://www.linkedin.com/company/paytium"], address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" }, areaServed: ["Maroc", "Morocco", "International"], knowsAbout: ["Transformation digitale", "Conseil IT", "Développement logiciel", "Data et intelligence artificielle", "Cloud et DevOps", "Facturation électronique", "E-invoicing"] }, { "@type": "WebSite", "@id": "https://paytium.io/#website", url: "https://paytium.io", name: "Paytium", alternateName: "Paytium Morocco", publisher: { "@id": "https://paytium.io/#organization" }, inLanguage: ["fr-FR", "en-US"] }, { "@type": "ProfessionalService", "@id": "https://paytium.io/#professional-service", name: "Paytium", url: "https://paytium.io", email: "connect@paytium.io", telephone: "+212707252336", areaServed: ["Maroc", "International"], address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" }, parentOrganization: { "@id": "https://paytium.io/#organization" } }] }) }} />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
