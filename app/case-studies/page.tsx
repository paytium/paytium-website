import type { Metadata } from "next";
import { ExpertiseCasesPage } from "../../components/ExpertiseCases";

const description = "Découvrez comment Paytium transforme des enjeux complexes de facturation électronique, paiements, banque digitale, interopérabilité et due diligence technique en décisions et plateformes créatrices de valeur.";

export const metadata: Metadata = {
  title: "Paytium | Études de cas Fintech, Paiements et Digital Banking",
  description,
  alternates: { canonical: "/case-studies/", languages: { "fr-FR": "/case-studies/", "en-US": "/en/case-studies/" } },
  openGraph: { title: "Paytium | Études de cas Fintech, Paiements et Digital Banking", description, url: "/case-studies/", type: "website", locale: "fr_FR", alternateLocale: ["en_US"], siteName: "Paytium", images: [] },
  twitter: { card: "summary", title: "Paytium | Études de cas Fintech, Paiements et Digital Banking", description, images: [] },
};

export default function CaseStudiesPage() { return <ExpertiseCasesPage />; }
