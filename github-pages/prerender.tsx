import { renderToString } from "react-dom/server";
import HomePage from "../app/page";
import EnglishHomePage from "../app/en/page";
import ServicesPage from "../app/services/page";
import EnglishServicesPage from "../app/en/services/page";
import AcademyPage from "../app/academy/page";
import EnglishAcademyPage from "../app/en/academy/page";
import ElectronicInvoicingPage from "../app/e-invoicing/page";
import EnglishElectronicInvoicingPage from "../app/en/e-invoicing/page";
import CaseStudiesPage from "../app/case-studies/page";
import EnglishCaseStudiesPage from "../app/en/case-studies/page";
import AboutPage from "../app/about/page";
import EnglishAboutPage from "../app/en/about/page";
import ContactPage from "../app/contact/page";
import EnglishContactPage from "../app/en/contact/page";
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
  "/case-studies": CaseStudiesPage,
  "/en/case-studies": EnglishCaseStudiesPage,
  "/about": AboutPage,
  "/en/about": EnglishAboutPage,
  "/contact": ContactPage,
  "/en/contact": EnglishContactPage,
} as const;

export function renderPage(path: string) {
  const Page = routes[path as keyof typeof routes];
  if (!Page) throw new Error(`Unknown route: ${path}`);
  return renderToString(<><PageLoader /><Page /></>);
}

export function renderNotFound(locale: "fr" | "en" = "fr") {
  return renderToString(<><PageLoader /><NotFound locale={locale} /></>);
}
