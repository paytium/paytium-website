"use client";

import { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuArrowUp, LuChevronDown, LuMenu, LuX } from "react-icons/lu";
import { Brand, Arrow } from "./Brand";
import { services, siteConfig } from "../content/site";
import { servicesEn } from "../content/site-en";

type Locale = "fr" | "en";
type BreadcrumbItem = { label: string; href: string };

const shellCopy = {
  fr: { skip: "Aller au contenu", home: "Accueil", about: "À propos", services: "Services", playground: "Notre terrain de jeu", methodsMenu: "Nos méthodes", invoice: "Facturation électronique", cases: "Études de cas", method: "Méthode", technologies: "Expertises", academy: "Paytium Academy", contact: "Contact", talk: "Parler à un expert", exchange: "Échanger avec un expert", invoiceOffers: "Nos offres d’accompagnement", freeConsultation: "Réserver une consultation gratuite", open: "Ouvrir le menu", close: "Fermer le menu", nav: "Navigation principale", top: "Haut", footer: "Nous concevons, sécurisons et faisons évoluer des solutions digitales qui créent une valeur durable.", company: "Paytium", legal: "Mentions légales", privacy: "Confidentialité", signature: "Conseil · Delivery · Expertise" },
  en: { skip: "Skip to content", home: "Home", about: "About", services: "Services", playground: "Field of play", methodsMenu: "Our methods", invoice: "E-invoicing", cases: "Case studies", method: "Delivery approach", technologies: "Expertise", academy: "Paytium Academy", contact: "Contact", talk: "Talk to an expert", exchange: "Talk to an expert", invoiceOffers: "Our support offers", freeConsultation: "Book a free consultation", open: "Open menu", close: "Close menu", nav: "Main navigation", top: "Top", footer: "We design, secure and scale digital solutions that create lasting value.", company: "Paytium", legal: "Legal notice", privacy: "Privacy", signature: "Consulting · Delivery · Expertise" },
};

export function SiteHeader({ locale = "fr", translationHref = "/en/", activeNav }: { locale?: Locale; translationHref?: string; activeNav?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const copy = shellCopy[locale];
  const prefix = locale === "en" ? "/en" : "";
  const homeHref = locale === "en" ? "/en/" : "/";
  const caseStudyAreas = locale === "en" ? [
    ["E-invoicing", "e-invoicing"], ["Payments & Transaction Banking", "payments"], ["Digital banking & lending", "digital-banking"], ["Orchestration & channels", "orchestration"], ["API & interoperability", "api"], ["Advisory & Due diligence", "technical-due-diligence"],
  ] : [
    ["Facturation électronique", "e-invoicing"], ["Paiements & Transaction Banking", "payments"], ["Banque digitale & financement", "digital-banking"], ["Orchestration & canaux", "orchestration"], ["API & interopérabilité", "api"], ["Conseil & Due diligence", "technical-due-diligence"],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} id="top">
        <a className="brand" href={homeHref} aria-label={`Paytium — ${copy.home}`}><Brand /></a>
        <nav className="desktop-nav" aria-label={copy.nav}>
          <a className={activeNav === "about" ? "active" : undefined} aria-current={activeNav === "about" ? "page" : undefined} href={`${prefix}/about/`}>{copy.about}</a>
          <div className="nav-group">
            <button className={`nav-services-trigger ${activeNav === "services" ? "active" : ""}`} type="button" aria-haspopup="true">{copy.services} <LuChevronDown className="nav-chevron" aria-hidden="true" /></button>
            <div className="submenu">
              <a href={`${prefix}/services/`}>{copy.playground}</a>
              <a href={`${prefix}/services/#methods`}>{copy.methodsMenu}</a>
              <a href={`${prefix}/services/#expertise`}>{copy.technologies}</a>
              <a href={`${prefix}/academy/`}>{copy.academy}</a>
            </div>
          </div>
          <div className="nav-group nav-cases-group">
            <a className={`nav-cases-trigger ${activeNav === "case-studies" ? "active" : ""}`} aria-current={activeNav === "case-studies" ? "page" : undefined} href={`${prefix}/case-studies/`}>{copy.cases} <LuChevronDown className="nav-chevron" aria-hidden="true" /></a>
            <div className="submenu case-studies-submenu">{caseStudyAreas.map(([label, id]) => <a key={id} href={`${prefix}/case-studies/#${id}`}>{label}</a>)}</div>
          </div>
          <a className={activeNav === "e-invoicing" ? "active" : undefined} aria-current={activeNav === "e-invoicing" ? "page" : undefined} href={`${prefix}/e-invoicing/`}>{copy.invoice}</a>
        </nav>
        <details className="language-menu">
          <summary aria-label={locale === "fr" ? "Changer la langue" : "Change language"}><span>{locale === "fr" ? "FR" : "EN"}</span><LuChevronDown aria-hidden="true" /></summary>
          <a className="language-option" href={translationHref} hrefLang={locale === "fr" ? "en" : "fr"} onClick={() => window.localStorage.setItem("paytium-language", locale === "fr" ? "en" : "fr")}>{locale === "fr" ? "EN" : "FR"}</a>
        </details>
        <a className="header-cta desktop-cta" href={`${prefix}/contact/`}>{copy.talk} <Arrow /></a>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <LuMenu aria-hidden="true" /><span className="sr-only">{copy.open}</span>
        </button>
      </header>
      <button className={`drawer-backdrop ${open ? "show" : ""}`} type="button" aria-label={copy.close} onClick={() => setOpen(false)} />
      <aside className={`mobile-drawer ${open ? "open" : ""}`} id="mobile-menu" aria-hidden={!open}>
        <div className="drawer-top"><Brand /><button type="button" onClick={() => setOpen(false)} aria-label={copy.close}><LuX aria-hidden="true" /></button></div>
        <nav aria-label={copy.nav}>
          <a className={activeNav === "about" ? "active" : undefined} aria-current={activeNav === "about" ? "page" : undefined} href={`${prefix}/about/`} onClick={() => setOpen(false)}>{copy.about}</a><span className={`drawer-menu-label ${activeNav === "services" ? "active" : ""}`}>{copy.services}</span>
          <a className="drawer-sub" href={`${prefix}/services/`} onClick={() => setOpen(false)}>{copy.playground}</a>
          <a className="drawer-sub" href={`${prefix}/services/#methods`} onClick={() => setOpen(false)}>{copy.methodsMenu}</a>
          <a className="drawer-sub" href={`${prefix}/services/#expertise`} onClick={() => setOpen(false)}>{copy.technologies}</a>
          <a className="drawer-sub" href={`${prefix}/academy/`} onClick={() => setOpen(false)}>{copy.academy}</a>
          <span className={`drawer-menu-label ${activeNav === "case-studies" ? "active" : ""}`}>{copy.cases}</span>
          {caseStudyAreas.map(([label, id]) => <a className="drawer-sub" key={id} href={`${prefix}/case-studies/#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
          <a className={activeNav === "e-invoicing" ? "active" : undefined} aria-current={activeNav === "e-invoicing" ? "page" : undefined} href={`${prefix}/e-invoicing/`} onClick={() => setOpen(false)}>{copy.invoice}</a>
        </nav>
        <a className="button button-primary" href={`${prefix}/contact/`}>{copy.talk} <Arrow /></a>
      </aside>
    </>
  );
}

export function SiteFooter({ locale = "fr" }: { locale?: Locale }) {
  const copy = shellCopy[locale];
  const prefix = locale === "en" ? "/en" : "";
  const homeHref = locale === "en" ? "/en/" : "/";
  const legalLinks = [
    siteConfig.legalNoticeUrl && ["Mentions légales", siteConfig.legalNoticeUrl],
    siteConfig.privacyUrl && ["Confidentialité", siteConfig.privacyUrl],
  ].filter(Boolean) as string[][];

  return (
    <footer className="site-footer">
      <div className="footer-intro"><a className="brand" href={homeHref}><Brand /></a><strong className="footer-slogan">Build. <em>Secure.</em> Scale.</strong><p>{copy.footer}</p>{siteConfig.linkedinUrl && <a className="footer-linkedin-icon" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" aria-label={locale === "fr" ? "Suivre Paytium sur LinkedIn" : "Follow Paytium on LinkedIn"}><FaLinkedinIn className="linkedin-icon" aria-hidden="true" /></a>}</div>
      <div><h3>{copy.services}</h3>{(locale === "en" ? servicesEn : services).filter((service) => service.id !== "academy").map((service) => <a key={service.id} href={`${prefix}/services/#${service.id}`}>{service.title}</a>)}<a href={`${prefix}/academy/`}>Paytium Academy</a></div>
      <div><h3>{copy.company}</h3><a href={`${prefix}/about/`}>{copy.about}</a><a href={`${prefix}/services/#methods`}>{copy.methodsMenu}</a><a href={`${prefix}/services/#expertise`}>{copy.technologies}</a><a href={`${prefix}/contact/`}>{copy.exchange}</a></div>
      <div><h3>{copy.invoice}</h3><a href={`${prefix}/e-invoicing/#offres`}>{copy.invoiceOffers}</a><a href={`${prefix}/e-invoicing/#consultation`}>{copy.freeConsultation}</a>{legalLinks.map(([label, url], index) => <a key={url} href={url}>{locale === "fr" ? label : index === 0 ? copy.legal : copy.privacy}</a>)}</div>
      <div className="footer-bottom"><span>© 2026 {siteConfig.legalCompanyName}</span><span>{copy.signature}</span></div>
    </footer>
  );
}

export function PageShell({ children, locale = "fr", translationHref = "/en/", activeNav }: { children: React.ReactNode; locale?: Locale; translationHref?: string; activeNav?: string }) {
  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    let retryTimers: number[] = [];
    const scrollToCurrentHash = (behavior: ScrollBehavior = "smooth") => {
      const legacyHashes: Record<string, string> = { "a-propos": "about", "proposition-valeur": "value-proposition", methode: "method", approche: "approach", methodes: "methods", expertises: "expertise", catalogue: "catalog", "e-facture": "e-invoice" };
      const requestedId = decodeURIComponent(window.location.hash.slice(1));
      const id = legacyHashes[requestedId] ?? requestedId;
      if (!id) return;
      if (id !== requestedId) window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${id}`);
      document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
    };
    const scheduleHashScroll = () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          scrollToCurrentHash();
        });
      });
      retryTimers = [180, 550].map((delay) => window.setTimeout(() => scrollToCurrentHash("auto"), delay));
    };
    const handleHashLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href*='#']") : null;
      if (!link) return;
      const destination = new URL(link.href, window.location.href);
      const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
      const destinationPath = destination.pathname.replace(/\/$/, "") || "/";
      if (destination.origin !== window.location.origin || destinationPath !== currentPath || !destination.hash) return;
      event.preventDefault();
      window.history.pushState(null, "", `${destination.pathname}${destination.search}${destination.hash}`);
      window.dispatchEvent(new Event("paytium:hashchange"));
      scheduleHashScroll();
    };
    scheduleHashScroll();
    window.addEventListener("hashchange", scheduleHashScroll);
    document.addEventListener("click", handleHashLink);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("hashchange", scheduleHashScroll);
      document.removeEventListener("click", handleHashLink);
    };
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const selector = [".section-heading", ".values-row > article", ".mission-statement", ".mission-pillars > article", ".value-proposition-row", ".approach-heading", ".approach-grid > article", ".service-card", ".service-detail", ".method-matrix > article", ".technology-groups > article", ".challenge-grid > article", ".lifecycle > article", ".security-grid > article", ".usecase-grid > article", ".deployment-track > article", ".academy-format-grid > article", ".course-card", ".contact-form", ".contact-intro", ".invoice-copy", ".invoice-visual", ".einvoice-hero-copy", ".einvoice-hero-media", ".erp-logo-grid > div", ".public-marker-grid > article", ".compliance-pillar-grid > article", ".connector-node", ".connection-mode-grid > article", ".einvoice-offer-grid > article", ".einvoice-deployment-track > article", ".expertise-cases-visual", ".expertise-anchor-nav > a", ".expertise-domain-heading", ".case-study"].join(",");
    const items = Array.from(document.querySelectorAll<HTMLElement>(selector));
    items.forEach((item, index) => {
      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", `${(index % 5) * 70}ms`);
    });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: .12, rootMargin: "0px 0px -7%" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [locale]);
  return <><SiteHeader locale={locale} translationHref={translationHref} activeNav={activeNav} /><main id="main-content">{children}</main><SiteFooter locale={locale} /><ScrollToTop locale={locale} /></>;
}

export function Breadcrumbs({ items, sections = {}, locale = "fr" }: { items: BreadcrumbItem[]; sections?: Record<string, string>; locale?: Locale }) {
  const [currentSection, setCurrentSection] = useState("");
  const homeHref = locale === "en" ? "/en/" : "/";
  useEffect(() => {
    const update = () => setCurrentSection(decodeURIComponent(window.location.hash.slice(1)));
    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    window.addEventListener("paytium:hashchange", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
      window.removeEventListener("paytium:hashchange", update);
    };
  }, []);
  const sectionLabel = sections[currentSection];
  const crumbs = [{ label: locale === "fr" ? "Accueil" : "Home", href: homeHref }, ...items];
  return <nav className="breadcrumbs" aria-label={locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"}><ol>{crumbs.map((item, index) => {
    const isCurrent = index === crumbs.length - 1 && !sectionLabel;
    return <li key={`${item.href}-${item.label}`}>{isCurrent ? <span aria-current="page">{item.label}</span> : <a href={item.href}>{item.label}</a>}</li>;
  })}{sectionLabel && <li><span aria-current="page">{sectionLabel}</span></li>}</ol></nav>;
}

function ScrollToTop({ locale = "fr" }: { locale?: Locale }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  return <button className={`scroll-top ${visible ? "visible" : ""}`} type="button" onClick={scrollToTop} aria-label={locale === "fr" ? "Revenir en haut de la page" : "Back to the top of the page"}><LuArrowUp aria-hidden="true" /><small>{shellCopy[locale].top}</small></button>;
}
