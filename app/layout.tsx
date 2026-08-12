import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paytium | Transformation digitale",
  description: "Paytium accompagne les organisations de la stratégie à l’exécution de leurs transformations digitales.",
  openGraph: {
    title: "Paytium | Transformation digitale",
    description: "Conseil, produits digitaux, data, engineering et cloud pour des transformations utiles, fiables et évolutives.",
    type: "website",
    locale: "fr_FR",
    images: ["https://northstar-momentum.ltt-6.chatgpt.site/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paytium | Transformation digitale",
    description: "De la vision à l’impact : conseil, produits digitaux, data, engineering et cloud.",
    images: ["https://northstar-momentum.ltt-6.chatgpt.site/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
