import { renderToString } from "react-dom/server";
import HomePage from "../app/page";
import EnglishHomePage from "../app/en/page";
import ServicesPage from "../app/services/page";
import EnglishServicesPage from "../app/en/services/page";
import AcademyPage from "../app/academy/page";
import EnglishAcademyPage from "../app/en/academy/page";
import ElectronicInvoicingPage from "../app/e-invoicing/page";
import EnglishElectronicInvoicingPage from "../app/en/e-invoicing/page";
import ExpertisesPage from "../app/expertises/page";
import EnglishExpertisesPage from "../app/en/expertises/page";
import { PageLoader } from "../components/PageLoader";
import NotFound from "../app/not-found";

const routes = {
  "/": HomePage,
  "/en": EnglishHomePage,
  "/services": ServicesPage,
  "/en/services": EnglishServicesPage,
  "/academy": AcademyPage,
  "/en/academy": EnglishAcademyPage,
  "/e-invoicing": ElectronicInvoicingPage,
  "/en/e-invoicing": EnglishElectronicInvoicingPage,
  "/expertises": ExpertisesPage,
  "/en/expertises": EnglishExpertisesPage,
} as const;

export function renderPage(path: string) {
  const Page = routes[path as keyof typeof routes];
  if (!Page) throw new Error(`Unknown route: ${path}`);
  return renderToString(<><PageLoader /><Page /></>);
}

export function renderNotFound(locale: "fr" | "en" = "fr") {
  return renderToString(<><PageLoader /><NotFound locale={locale} /></>);
}
