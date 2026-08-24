"use client";

import { useEffect, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import { Arrow } from "./Brand";

type Locale = "fr" | "en";

const STORAGE_KEY = "paytium-einvoice-popup-dismissed-v1";

const copy = {
  fr: {
    eyebrow: "FACTURATION ÉLECTRONIQUE",
    title: "Préparez votre entreprise à l’e-facture.",
    text: "Du diagnostic à l’intégration, Paytium connecte vos ERP et applications à l’écosystème de facturation électronique avec une trajectoire claire, sécurisée et évolutive.",
    discover: "Découvrir l’offre",
    consultation: "Réserver une consultation gratuite",
    benefits: ["Diagnostic de préparation et feuille de route", "Intégration ERP, API et plateformes CSP", "Sécurité, traçabilité et conformité de bout en bout"],
    close: "Fermer cette présentation",
    memory: "En fermant, ce message ne sera plus affiché sur cet appareil.",
  },
  en: {
    eyebrow: "E-INVOICING",
    title: "Prepare your business for e-invoicing.",
    text: "From readiness assessment to integration, Paytium connects your ERP and business applications to the e-invoicing ecosystem through a clear, secure and scalable roadmap.",
    discover: "Explore the offer",
    consultation: "Book a free consultation",
    benefits: ["Readiness assessment and actionable roadmap", "ERP, API and CSP platform integration", "End-to-end security, traceability and compliance"],
    close: "Close this introduction",
    memory: "Once closed, this message will not be shown again on this device.",
  },
};

export function EinvoicePromoPopup({ locale = "fr" }: { locale?: Locale }) {
  const [visible, setVisible] = useState(false);
  const content = copy[locale];
  const prefix = locale === "en" ? "/en" : "";

  useEffect(() => {
    let dismissed = false;
    try { dismissed = window.localStorage.getItem(STORAGE_KEY) === "true"; } catch { /* Show the offer when storage is unavailable. */ }
    if (dismissed) return;
    const timer = window.setTimeout(() => setVisible(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    try { window.localStorage.setItem(STORAGE_KEY, "true"); } catch { /* Closing still works without storage. */ }
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && dismiss();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible]);

  if (!visible) return null;

  return <div className="einvoice-promo-backdrop">
    <button className="einvoice-promo-scrim" type="button" onClick={dismiss} aria-label={content.close} />
    <aside className="einvoice-promo-popup" role="dialog" aria-modal="true" aria-labelledby="einvoice-promo-title">
      <div className="einvoice-promo-media">
        <img src="/einvoicing-casablanca.jpg" alt={locale === "fr" ? "Architecture à Casablanca" : "Architecture in Casablanca"} width="2400" height="1594" />
        <div className="einvoice-promo-identities" aria-label={locale === "fr" ? "Drapeau du Maroc et logo de la Direction Générale des Impôts" : "Flag of Morocco and Directorate General of Taxes logo"}>
          <img className="einvoice-promo-flag" src="/flag-morocco.png" alt={locale === "fr" ? "Drapeau du Maroc" : "Flag of Morocco"} width="52" height="34" />
          <span aria-hidden="true" />
          <img className="einvoice-promo-dgi" src="/logo-dgi.png" alt={locale === "fr" ? "Logo de la Direction Générale des Impôts" : "Directorate General of Taxes logo"} width="50" height="50" />
        </div>
      </div>
      <div className="einvoice-promo-content">
        <button className="einvoice-promo-close" type="button" onClick={dismiss} aria-label={content.close}><LuX aria-hidden="true" /></button>
        <small>{content.eyebrow}</small>
        <h2 id="einvoice-promo-title">{content.title}</h2>
        <p>{content.text}</p>
        <ul>{content.benefits.map((benefit) => <li key={benefit}><LuCheck aria-hidden="true" />{benefit}</li>)}</ul>
        <div className="einvoice-promo-actions">
          <a className="button button-primary" href={`${prefix}/e-invoicing/`}>{content.discover} <Arrow /></a>
          <a className="button button-secondary" href={`${prefix}/e-invoicing/#consultation`}>{content.consultation}</a>
        </div>
        <button className="einvoice-promo-memory" type="button" onClick={dismiss}>{content.memory}</button>
      </div>
    </aside>
  </div>;
}
