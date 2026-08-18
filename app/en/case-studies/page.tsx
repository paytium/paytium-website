import type { Metadata } from "next";
import { ExpertiseCasesPage } from "../../../components/ExpertiseCases";

const description = "See how Paytium turns complex e-invoicing, payments, digital banking, lending, workflow and API challenges into reliable platforms that deliver measurable business value.";

export const metadata: Metadata = {
  title: "Fintech, Payments & Digital Banking Case Studies | Paytium",
  description,
  alternates: { canonical: "/en/case-studies/", languages: { "fr-FR": "/case-studies/", "en-US": "/en/case-studies/" } },
  openGraph: { title: "Fintech, Payments & Digital Banking Case Studies | Paytium", description, url: "/en/case-studies/", type: "website", locale: "en_US", alternateLocale: ["fr_FR"], siteName: "Paytium", images: [] },
  twitter: { card: "summary", title: "Fintech, Payments & Digital Banking Case Studies | Paytium", description, images: [] },
};

export default function EnglishCaseStudiesPage() { return <ExpertiseCasesPage locale="en" />; }
