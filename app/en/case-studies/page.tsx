import type { Metadata } from "next";
import { ExpertiseCasesPage } from "../../../components/ExpertiseCases";

const description = "See how Paytium turns complex e-invoicing, payments, digital banking, interoperability and technical due diligence challenges into confident decisions and platforms that deliver measurable value.";

export const metadata: Metadata = {
  title: "Paytium | Fintech, Payments & Digital Banking Case Studies",
  description,
  alternates: { canonical: "/en/case-studies/", languages: { "fr-FR": "/case-studies/", "en-US": "/en/case-studies/" } },
  openGraph: { title: "Paytium | Fintech, Payments & Digital Banking Case Studies", description, url: "/en/case-studies/", type: "website", locale: "en_US", alternateLocale: ["fr_FR"], siteName: "Paytium", images: [] },
  twitter: { card: "summary", title: "Paytium | Fintech, Payments & Digital Banking Case Studies", description, images: [] },
};

export default function EnglishCaseStudiesPage() { return <ExpertiseCasesPage locale="en" />; }
