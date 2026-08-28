import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Paytium | Article moved",
  robots: { index: false, follow: true },
  alternates: { canonical: "/en/blog/e-invoicing-morocco-how-to-prepare/" },
};

export default function LegacyEnglishArticlePage() {
  redirect("/en/blog/e-invoicing-morocco-how-to-prepare/");
}
