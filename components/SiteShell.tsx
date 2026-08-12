"use client";

import { useEffect, useState } from "react";
import { Brand, Arrow } from "./Brand";
import { services, siteConfig } from "../content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} id="top">
        <a className="brand" href="/" aria-label="Paytium — Accueil"><Brand /></a>
        <nav className="desktop-nav" aria-label="Navigation principale">
          <a href="/">Accueil</a>
          <a href="/#a-propos">À propos</a>
          <div className="nav-group">
            <a href="/services">Services <span aria-hidden="true">⌄</span></a>
            <div className="submenu">
              {services.map((service) => <a key={service.id} href={`/services#${service.id}`}>{service.short}</a>)}
            </div>
          </div>
          <a href="/facturation-electronique">Facturation électronique</a>
          <a href="/#methode">Méthode</a>
          <a href="/services#technologies">Technologies</a>
          <a href="/#contact">Contact</a>
        </nav>
        <a className="header-cta desktop-cta" href="/#contact">Parler à un expert <Arrow /></a>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <span /> <span /> <span /><span className="sr-only">Ouvrir le menu</span>
        </button>
      </header>
      <div className={`drawer-backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`mobile-drawer ${open ? "open" : ""}`} id="mobile-menu" aria-hidden={!open}>
        <div className="drawer-top"><Brand /><button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu">×</button></div>
        <nav aria-label="Navigation mobile" onClick={() => setOpen(false)}>
          <a href="/">Accueil</a><a href="/#a-propos">À propos</a><a href="/services">Services</a>
          {services.map((service) => <a className="drawer-sub" key={service.id} href={`/services#${service.id}`}>{service.short}</a>)}
          <a href="/facturation-electronique">Facturation électronique</a><a href="/#methode">Méthode</a><a href="/services#technologies">Technologies</a><a href="/#contact">Contact</a>
        </nav>
        <a className="button button-primary" href="/#contact">Parler à un expert <Arrow /></a>
      </aside>
    </>
  );
}

export function SiteFooter() {
  const legalLinks = [
    siteConfig.legalNoticeUrl && ["Mentions légales", siteConfig.legalNoticeUrl],
    siteConfig.privacyUrl && ["Confidentialité", siteConfig.privacyUrl],
  ].filter(Boolean) as string[][];

  return (
    <footer className="site-footer">
      <div className="footer-intro"><a href="/"><Brand /></a><p>Paytium transforme les enjeux métiers en solutions numériques utiles, fiables et évolutives.</p></div>
      <div><h3>Services</h3><a href="/services#consulting">Conseil & stratégie</a><a href="/services#digital-data">Digital, Data & IA</a><a href="/services#engineering">Engineering</a><a href="/services#cloud-devops">Cloud & DevOps</a></div>
      <div><h3>Entreprise</h3><a href="/#a-propos">À propos</a><a href="/#methode">Notre méthode</a><a href="/#contact">Contact</a>{siteConfig.linkedinUrl && <a href={siteConfig.linkedinUrl}>LinkedIn</a>}</div>
      <div><h3>Ressources</h3><a href="/facturation-electronique">Facturation électronique</a><a href="/services#technologies">Technologies</a>{legalLinks.map(([label, url]) => <a key={url} href={url}>{label}</a>)}</div>
      <div className="footer-bottom"><span>© 2026 {siteConfig.legalCompanyName}</span><span>La technologie au service de transformations maîtrisées.</span></div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const selector = [".section-heading", ".editorial-cards > article", ".values-row > article", ".service-card", ".method-timeline > article", ".tech-preview > article", ".service-detail", ".method-matrix > article", ".technology-groups > article", ".challenge-grid > article", ".lifecycle > article", ".security-grid > article", ".usecase-grid > article", ".deployment-track > article", ".contact-form", ".contact-intro", ".invoice-copy", ".invoice-visual"].join(",");
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
  }, []);
  return <><SiteHeader /><main id="main-content">{children}</main><SiteFooter /><ScrollToTop /></>;
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <a className={`scroll-top ${visible ? "visible" : ""}`} href="#top" aria-label="Revenir en haut de la page"><span>↑</span><small>Haut</small></a>;
}
