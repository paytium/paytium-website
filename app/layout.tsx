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
  metadataBase: new URL("https://northstar-momentum.ltt-6.chatgpt.site"),
  title: { default: "Paytium | Transformation digitale", template: "%s | Paytium" },
  description: "Paytium accompagne les organisations de la stratégie à l’exécution de leurs transformations digitales.",
  applicationName: "Paytium",
  authors: [{ name: "Paytium", url: "https://paytium.io" }],
  creator: "Paytium",
  publisher: "Paytium",
  keywords: ["transformation digitale", "conseil IT", "data", "intelligence artificielle", "cloud", "DevOps", "engineering", "facturation électronique", "formation digitale", "Casablanca", "Maroc"],
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
    images: ["https://northstar-momentum.ltt-6.chatgpt.site/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paytium | Transformation digitale",
    description: "De la vision à l’impact : conseil, produits digitaux, data, engineering et cloud.",
    images: ["https://northstar-momentum.ltt-6.chatgpt.site/og.png"],
  },
  icons: {
    icon: "/favicon-rounded.svg",
    shortcut: "/favicon-rounded.svg",
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
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var p=location.pathname,c=p==='/en'||p.indexOf('/en/')===0?'en':'fr',s=localStorage.getItem('paytium-language'),n=(navigator.language||'fr').toLowerCase(),d=s==='en'||s==='fr'?s:n.indexOf('en')===0?'en':'fr';if(d!==c){var t=d==='en'?'/en'+(p==='/'?'':p):(p.replace(/^\\/en(?=\\/|$)/,'')||'/');location.replace(t+location.search+location.hash)}}catch(e){}})();` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", "@id": "https://paytium.io/#organization", name: "Paytium", url: "https://paytium.io", logo: "https://northstar-momentum.ltt-6.chatgpt.site/logo-paytium.svg", email: "connect@paytium.io", telephone: "+212707252336", sameAs: ["https://www.linkedin.com/company/paytium"], address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" } }, { "@type": "WebSite", "@id": "https://northstar-momentum.ltt-6.chatgpt.site/#website", url: "https://northstar-momentum.ltt-6.chatgpt.site", name: "Paytium", publisher: { "@id": "https://paytium.io/#organization" }, inLanguage: ["fr-FR", "en-US"] }, { "@type": "ProfessionalService", name: "Paytium", email: "connect@paytium.io", telephone: "+212707252336", areaServed: ["Morocco", "International"], address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" } }] }) }} />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
