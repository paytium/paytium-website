import type { Metadata } from "next";
import { ExpertiseCasesPage } from "../../../components/ExpertiseCases";

export const metadata: Metadata = {
  title: "Fintech, Payments & Digital Banking Case Studies | Paytium",
  description: "Explore Paytium case studies in e-invoicing, payments, cash management, Host-to-Host banking, ISO 20022, Digital Banking, Trade Finance, lending, workflows and API Gateway.",
  alternates: { canonical: "/en/expertises/", languages: { "fr-FR": "/expertises/", "en-US": "/en/expertises/" } },
  openGraph: { title: "Fintech, Payments & Digital Banking Case Studies | Paytium", description: "Explore Paytium case studies in e-invoicing, payments, cash management, Host-to-Host banking, ISO 20022, Digital Banking, Trade Finance, lending, workflows and API Gateway.", url: "/en/expertises/", type: "website", locale: "en_US", alternateLocale: ["fr_FR"], siteName: "Paytium", images: [] },
  twitter: { card: "summary", title: "Fintech, Payments & Digital Banking Case Studies | Paytium", description: "Anonymised Paytium case studies across e-invoicing, payments, Digital Banking, ISO 20022, workflows and API Gateway.", images: [] },
};

export default function EnglishExpertisesPage() { return <ExpertiseCasesPage locale="en" />; }
