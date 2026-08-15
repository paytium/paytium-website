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
  fr: { skip: "Aller au contenu", home: "Accueil", about: "À propos", services: "Services", invoice: "Facturation électronique", method: "Méthode", technologies: "Technologies", academy: "Academy", contact: "Contact", talk: "Parler à un expert", open: "Ouvrir le menu", close: "Fermer le menu", nav: "Navigation principale", top: "Haut", footer: "Paytium transforme les enjeux métiers en solutions numériques utiles, fiables et évolutives.", company: "Entreprise", resources: "Ressources", legal: "Mentions légales", privacy: "Confidentialité", signature: "La technologie au service de transformations maîtrisées." },
  en: { skip: "Skip to content", home: "Home", about: "About", services: "Services", invoice: "E-invoicing", method: "Method", technologies: "Technologies", academy: "Academy", contact: "Contact", talk: "Talk to an expert", open: "Open menu", close: "Close menu", nav: "Main navigation", top: "Top", footer: "Paytium turns business challenges into useful, reliable and scalable digital solutions.", company: "Company", resources: "Resources", legal: "Legal notice", privacy: "Privacy", signature: "Technology for controlled, lasting transformations." },
};

export function SiteHeader({ locale = "fr", translationHref = "/en" }: { locale?: Locale; translationHref?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const copy = shellCopy[locale];
  const prefix = locale === "en" ? "/en" : "";
  const homeHref = locale === "en" ? "/en/" : "/";
  const navigationServices = locale === "en" ? servicesEn : services;

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
          <a href={homeHref}>{copy.home}</a>
          <a href={`${prefix}/#a-propos`}>{copy.about}</a>
          <div className="nav-group">
            <a href={`${prefix}/services`}>{copy.services} <LuChevronDown className="nav-chevron" aria-hidden="true" /></a>
            <div className="submenu">
              {navigationServices.filter((service) => service.id !== "academy").map((service) => <a key={service.id} href={`${prefix}/services#${service.id}`}>{service.short}</a>)}
            </div>
          </div>
          <a href={`${prefix}/academy`}>{copy.academy}</a>
          <a href={`${prefix}/e-invoicing`}>{copy.invoice}</a>
        </nav>
        <details className="language-menu">
          <summary aria-label={locale === "fr" ? "Changer la langue" : "Change language"}><span>{locale === "fr" ? "FR" : "EN"}</span><LuChevronDown aria-hidden="true" /></summary>
          <a className="language-option" href={translationHref} hrefLang={locale === "fr" ? "en" : "fr"} onClick={() => window.localStorage.setItem("paytium-language", locale === "fr" ? "en" : "fr")}>{locale === "fr" ? "EN" : "FR"}</a>
        </details>
        <a className="header-cta desktop-cta" href={`${prefix}/#contact`}>{copy.talk} <Arrow /></a>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <LuMenu aria-hidden="true" /><span className="sr-only">{copy.open}</span>
        </button>
      </header>
      <button className={`drawer-backdrop ${open ? "show" : ""}`} type="button" aria-label={copy.close} onClick={() => setOpen(false)} />
      <aside className={`mobile-drawer ${open ? "open" : ""}`} id="mobile-menu" aria-hidden={!open}>
        <div className="drawer-top"><Brand /><button type="button" onClick={() => setOpen(false)} aria-label={copy.close}><LuX aria-hidden="true" /></button></div>
        <nav aria-label={copy.nav}>
          <a href={homeHref} onClick={() => setOpen(false)}>{copy.home}</a><a href={`${prefix}/#a-propos`} onClick={() => setOpen(false)}>{copy.about}</a><a href={`${prefix}/services`} onClick={() => setOpen(false)}>{copy.services}</a>
          {navigationServices.filter((service) => service.id !== "academy").map((service) => <a className="drawer-sub" key={service.id} href={`${prefix}/services#${service.id}`} onClick={() => setOpen(false)}>{service.short}</a>)}
          <a href={`${prefix}/academy`} onClick={() => setOpen(false)}>{copy.academy}</a><a href={`${prefix}/e-invoicing`} onClick={() => setOpen(false)}>{copy.invoice}</a>
        </nav>
        <a className="button button-primary" href={`${prefix}/#contact`}>{copy.talk} <Arrow /></a>
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
      <div className="footer-intro"><a className="brand" href={homeHref}><Brand /></a><p>{copy.footer}</p>{siteConfig.linkedinUrl && <a className="footer-linkedin-icon" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" aria-label={locale === "fr" ? "Suivre Paytium sur LinkedIn" : "Follow Paytium on LinkedIn"}><FaLinkedinIn className="linkedin-icon" aria-hidden="true" /></a>}</div>
      <div><h3>{copy.services}</h3>{(locale === "en" ? servicesEn : services).filter((service) => service.id !== "academy").map((service) => <a key={service.id} href={`${prefix}/services#${service.id}`}>{service.title}</a>)}</div>
      <div><h3>{copy.company}</h3><a href={`${prefix}/#a-propos`}>{copy.about}</a><a href={`${prefix}/#methode`}>{copy.method}</a><a href={`${prefix}/#contact`}>{copy.contact}</a></div>
      <div><h3>{copy.resources}</h3><a href={`${prefix}/academy`}>Paytium Academy</a><a href={`${prefix}/e-invoicing`}>{copy.invoice}</a><a href={`${prefix}/services#technologies`}>{copy.technologies}</a>{legalLinks.map(([label, url], index) => <a key={url} href={url}>{locale === "fr" ? label : index === 0 ? copy.legal : copy.privacy}</a>)}</div>
      <div className="footer-bottom"><span>© 2026 {siteConfig.legalCompanyName}</span><span>{copy.signature}</span></div>
    </footer>
  );
}

export function PageShell({ children, locale = "fr", translationHref = "/en" }: { children: React.ReactNode; locale?: Locale; translationHref?: string }) {
  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    let retryTimers: number[] = [];
    const scrollToCurrentHash = (behavior: ScrollBehavior = "smooth") => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
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
    const selector = [".section-heading", ".editorial-cards > article", ".values-row > article", ".service-card", ".method-timeline > article", ".service-detail", ".method-matrix > article", ".technology-groups > article", ".challenge-grid > article", ".lifecycle > article", ".security-grid > article", ".usecase-grid > article", ".deployment-track > article", ".academy-format-grid > article", ".course-card", ".contact-form", ".contact-intro", ".invoice-copy", ".invoice-visual"].join(",");
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
  return <><SiteHeader locale={locale} translationHref={translationHref} /><main id="main-content">{children}</main><SiteFooter locale={locale} /><ScrollToTop locale={locale} /></>;
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
