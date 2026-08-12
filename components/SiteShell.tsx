"use client";

import { useEffect, useState } from "react";
import { Brand, Arrow } from "./Brand";
import { services, siteConfig } from "../content/site";

type Locale = "fr" | "en";

const shellCopy = {
  fr: { skip: "Aller au contenu", home: "Accueil", about: "À propos", services: "Services", invoice: "Facturation électronique", method: "Méthode", technologies: "Technologies", academy: "Academy", contact: "Contact", talk: "Parler à un expert", open: "Ouvrir le menu", close: "Fermer le menu", nav: "Navigation principale", top: "Haut", footer: "Paytium transforme les enjeux métiers en solutions numériques utiles, fiables et évolutives.", company: "Entreprise", resources: "Ressources", legal: "Mentions légales", privacy: "Confidentialité", signature: "La technologie au service de transformations maîtrisées." },
  en: { skip: "Skip to content", home: "Home", about: "About", services: "Services", invoice: "E-invoicing", method: "Method", technologies: "Technologies", academy: "Academy", contact: "Contact", talk: "Talk to an expert", open: "Open menu", close: "Close menu", nav: "Main navigation", top: "Top", footer: "Paytium turns business challenges into useful, reliable and scalable digital solutions.", company: "Company", resources: "Resources", legal: "Legal notice", privacy: "Privacy", signature: "Technology for controlled, lasting transformations." },
};

export function SiteHeader({ locale = "fr", translationHref = "/en" }: { locale?: Locale; translationHref?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const copy = shellCopy[locale];
  const prefix = locale === "en" ? "/en" : "";

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
        <a className="brand" href={`${prefix}/` || "/"} aria-label={`Paytium — ${copy.home}`}><Brand /></a>
        <nav className="desktop-nav" aria-label={copy.nav}>
          <a href={`${prefix}/` || "/"}>{copy.home}</a>
          <a href={`${prefix}/#a-propos`}>{copy.about}</a>
          <div className="nav-group">
            <a href={`${prefix}/services`}>{copy.services} <span aria-hidden="true">⌄</span></a>
            <div className="submenu">
              {services.map((service) => <a key={service.id} href={service.id === "academy" ? `${prefix}/academy` : `${prefix}/services#${service.id}`}>{service.id === "academy" ? copy.academy : service.short}</a>)}
            </div>
          </div>
          <a href={`${prefix}/facturation-electronique`}>{copy.invoice}</a>
        </nav>
        <a className="language-switch" href={translationHref} hrefLang={locale === "fr" ? "en" : "fr"} aria-label={locale === "fr" ? "View the site in English" : "Voir le site en français"} onClick={() => window.localStorage.setItem("paytium-language", locale === "fr" ? "en" : "fr")}><span className={locale === "fr" ? "active" : ""}>FR</span><span className={locale === "en" ? "active" : ""}>EN</span></a>
        <a className="header-cta desktop-cta" href={`${prefix}/#contact`}>{copy.talk} <Arrow /></a>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <span /> <span /> <span /><span className="sr-only">{copy.open}</span>
        </button>
      </header>
      <div className={`drawer-backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`mobile-drawer ${open ? "open" : ""}`} id="mobile-menu" aria-hidden={!open}>
        <div className="drawer-top"><Brand /><button type="button" onClick={() => setOpen(false)} aria-label={copy.close}>×</button></div>
        <nav aria-label={copy.nav} onClick={() => setOpen(false)}>
          <a href={`${prefix}/` || "/"}>{copy.home}</a><a href={`${prefix}/#a-propos`}>{copy.about}</a><a href={`${prefix}/services`}>{copy.services}</a>
          {services.map((service) => <a className="drawer-sub" key={service.id} href={service.id === "academy" ? `${prefix}/academy` : `${prefix}/services#${service.id}`}>{service.id === "academy" ? copy.academy : service.short}</a>)}
          <a href={`${prefix}/facturation-electronique`}>{copy.invoice}</a><a href={translationHref} onClick={() => window.localStorage.setItem("paytium-language", locale === "fr" ? "en" : "fr")}>{locale === "fr" ? "English" : "Français"}</a>
        </nav>
        <a className="button button-primary" href={`${prefix}/#contact`}>{copy.talk} <Arrow /></a>
      </aside>
    </>
  );
}

export function SiteFooter({ locale = "fr" }: { locale?: Locale }) {
  const copy = shellCopy[locale];
  const prefix = locale === "en" ? "/en" : "";
  const legalLinks = [
    siteConfig.legalNoticeUrl && ["Mentions légales", siteConfig.legalNoticeUrl],
    siteConfig.privacyUrl && ["Confidentialité", siteConfig.privacyUrl],
  ].filter(Boolean) as string[][];

  return (
    <footer className="site-footer">
      <div className="footer-intro"><a className="brand" href={`${prefix}/` || "/"}><Brand /></a><p>{copy.footer}</p>{siteConfig.linkedinUrl && <a className="footer-linkedin-icon" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" aria-label={locale === "fr" ? "Suivre Paytium sur LinkedIn" : "Follow Paytium on LinkedIn"}><span className="linkedin-icon" aria-hidden="true">in</span></a>}</div>
      <div><h3>{copy.services}</h3><a href={`${prefix}/services#consulting`}>{locale === "fr" ? "Conseil & stratégie" : "Consulting & strategy"}</a><a href={`${prefix}/services#digital-data`}>Digital, Data & AI</a><a href={`${prefix}/services#engineering`}>Engineering</a><a href={`${prefix}/services#cloud-devops`}>Cloud & DevOps</a><a href={`${prefix}/academy`}>Paytium Academy</a></div>
      <div><h3>{copy.company}</h3><a href={`${prefix}/#a-propos`}>{copy.about}</a><a href={`${prefix}/#methode`}>{copy.method}</a><a href={`${prefix}/#contact`}>{copy.contact}</a></div>
      <div><h3>{copy.resources}</h3><a href={`${prefix}/facturation-electronique`}>{copy.invoice}</a><a href={`${prefix}/services#technologies`}>{copy.technologies}</a>{legalLinks.map(([label, url], index) => <a key={url} href={url}>{locale === "fr" ? label : index === 0 ? copy.legal : copy.privacy}</a>)}</div>
      <div className="footer-bottom"><span>© 2026 {siteConfig.legalCompanyName}</span><span>{copy.signature}</span></div>
    </footer>
  );
}

export function PageShell({ children, locale = "fr", translationHref = "/en" }: { children: React.ReactNode; locale?: Locale; translationHref?: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const selector = [".section-heading", ".editorial-cards > article", ".values-row > article", ".service-card", ".method-timeline > article", ".tech-preview > article", ".service-detail", ".method-matrix > article", ".technology-groups > article", ".challenge-grid > article", ".lifecycle > article", ".security-grid > article", ".usecase-grid > article", ".deployment-track > article", ".academy-format-grid > article", ".course-card", ".contact-form", ".contact-intro", ".invoice-copy", ".invoice-visual"].join(",");
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

function ScrollToTop({ locale = "fr" }: { locale?: Locale }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  return <button className={`scroll-top ${visible ? "visible" : ""}`} type="button" onClick={scrollToTop} aria-label={locale === "fr" ? "Revenir en haut de la page" : "Back to the top of the page"}><span>↑</span><small>{shellCopy[locale].top}</small></button>;
}
