import { createRoot, hydrateRoot } from "react-dom/client";
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
import NotFound from "../app/not-found";
import { PageLoader } from "../components/PageLoader";
import "../app/globals.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function relativePath() {
  const withoutBase = window.location.pathname.startsWith(basePath)
    ? window.location.pathname.slice(basePath.length)
    : window.location.pathname;
  return withoutBase.replace(/\/+$/, "") || "/";
}

const initialPath = relativePath();
if (initialPath === "/") try {
  const saved = window.localStorage.getItem("paytium-language");
  const browserLanguage = (window.navigator.language || "fr").toLowerCase();
  const isCrawler = /bot|crawl|spider|slurp|bingpreview/i.test(window.navigator.userAgent);
  const desiredLanguage: "fr" | "en" = saved === "fr" || saved === "en" ? saved : browserLanguage.startsWith("en") ? "en" : "fr";
  if (!isCrawler && desiredLanguage === "en") window.location.replace(`${basePath}/en/${window.location.search}${window.location.hash}`);
} catch {
  // Keep French as the safe fallback when browser storage is unavailable.
}

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

const Page = routes[initialPath as keyof typeof routes];
const notFoundLocale = initialPath === "/en" || initialPath.startsWith("/en/") ? "en" : "fr";

function prefixProjectPath(value: string) {
  if (!value.startsWith("/") || value === basePath || value.startsWith(`${basePath}/`)) return value;
  return `${basePath}${value}`;
}

function adaptInternalPaths(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[href^='/'], [src^='/']").forEach((element) => {
    for (const attribute of ["href", "src"]) {
      const value = element.getAttribute(attribute);
      if (value) element.setAttribute(attribute, prefixProjectPath(value));
    }
  });
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
    if (node instanceof HTMLElement) adaptInternalPaths(node);
  }));
});
observer.observe(document.documentElement, { childList: true, subtree: true });

document.documentElement.style.setProperty("--font-geist-sans", "'Geist'");
document.documentElement.style.setProperty("--font-bricolage", "'Bricolage Grotesque'");
const root = document.getElementById("root")!;
const application = <><PageLoader />{Page ? <Page /> : <NotFound locale={notFoundLocale} />}</>;
if (Page && root.hasChildNodes()) hydrateRoot(root, application);
else {
  root.replaceChildren();
  createRoot(root).render(application);
}
queueMicrotask(() => adaptInternalPaths());
