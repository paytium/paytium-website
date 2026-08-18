import type { Metadata } from "next";
import { ExpertiseCasesPage } from "../../components/ExpertiseCases";

const description = "Découvrez comment Paytium transforme des enjeux complexes de facturation électronique, paiements, banque digitale, crédit, orchestration métier et API en plateformes fiables et créatrices de valeur.";

export const metadata: Metadata = {
  title: "Études de cas Fintech, Paiements et Digital Banking | Paytium",
  description,
  alternates: { canonical: "/case-studies/", languages: { "fr-FR": "/case-studies/", "en-US": "/en/case-studies/" } },
  openGraph: { title: "Études de cas Fintech, Paiements et Digital Banking | Paytium", description, url: "/case-studies/", type: "website", locale: "fr_FR", alternateLocale: ["en_US"], siteName: "Paytium", images: [] },
  twitter: { card: "summary", title: "Études de cas Fintech, Paiements et Digital Banking | Paytium", description, images: [] },
};

export default function CaseStudiesPage() { return <ExpertiseCasesPage />; }
