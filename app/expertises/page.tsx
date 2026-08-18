import type { Metadata } from "next";
import { ExpertiseCasesPage } from "../../components/ExpertiseCases";

export const metadata: Metadata = {
  title: "Expertises Fintech, Paiements et Digital Banking | Paytium",
  description: "Découvrez les expertises Paytium en facturation électronique, paiements, cash management, Host-to-Host, ISO 20022, Digital Banking, Trade Finance, crédit, workflows métiers et API Gateway.",
  alternates: { canonical: "/expertises/", languages: { "fr-FR": "/expertises/", "en-US": "/en/expertises/" } },
  openGraph: { title: "Expertises Fintech, Paiements et Digital Banking | Paytium", description: "Découvrez les expertises Paytium en facturation électronique, paiements, cash management, Host-to-Host, ISO 20022, Digital Banking, Trade Finance, crédit, workflows métiers et API Gateway.", url: "/expertises/", type: "website", locale: "fr_FR", alternateLocale: ["en_US"], siteName: "Paytium", images: [] },
  twitter: { card: "summary", title: "Expertises Fintech, Paiements et Digital Banking | Paytium", description: "Expertises anonymisées Paytium en e-invoicing, paiements, Digital Banking, ISO 20022, workflows et API Gateway.", images: [] },
};

export default function ExpertisesPage() { return <ExpertiseCasesPage />; }
