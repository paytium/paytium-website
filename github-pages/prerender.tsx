import { renderToString } from "react-dom/server";
import HomePage from "../app/page";
import EnglishHomePage from "../app/en/page";
import ServicesPage from "../app/services/page";
import EnglishServicesPage from "../app/en/services/page";
import AcademyPage from "../app/academy/page";
import EnglishAcademyPage from "../app/en/academy/page";
import ElectronicInvoicingPage from "../app/facturation-electronique/page";
import EnglishElectronicInvoicingPage from "../app/en/facturation-electronique/page";
import { PageLoader } from "../components/PageLoader";

const routes = {
  "/": HomePage,
  "/en": EnglishHomePage,
  "/services": ServicesPage,
  "/en/services": EnglishServicesPage,
  "/academy": AcademyPage,
  "/en/academy": EnglishAcademyPage,
  "/facturation-electronique": ElectronicInvoicingPage,
  "/en/facturation-electronique": EnglishElectronicInvoicingPage,
} as const;

export function renderPage(path: string) {
  const Page = routes[path as keyof typeof routes];
  if (!Page) throw new Error(`Unknown route: ${path}`);
  return renderToString(<><PageLoader /><Page /></>);
}
