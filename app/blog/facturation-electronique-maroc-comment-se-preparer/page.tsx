import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Paytium | Article déplacé",
  robots: { index: false, follow: true },
  alternates: { canonical: "/blog/e-invoicing-morocco-how-to-prepare/" },
};

export default function LegacyFrenchArticlePage() {
  redirect("/blog/e-invoicing-morocco-how-to-prepare/");
}
