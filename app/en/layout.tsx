import type { Metadata } from "next";

export const metadata: Metadata = {
  other: { "content-language": "en" },
  openGraph: { locale: "en_US", alternateLocale: ["fr_FR"] },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
