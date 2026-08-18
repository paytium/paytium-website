"use client";

import { FormEvent, useState } from "react";
import { LuChevronDown, LuSend, LuShieldCheck } from "react-icons/lu";
import { siteConfig } from "../content/site";
import { isValidPhoneNumber, normalizePhoneNumber, sanitizePhoneInput } from "../lib/contactValidation";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function TrackedLink({ href, eventName, className, children }: { href: string; eventName: string; className: string; children: React.ReactNode }) {
  return <a className={className} href={href} onClick={() => (window as GtagWindow).gtag?.("event", eventName, { page_path: window.location.pathname })}>{children}</a>;
}

export function EinvoiceConsultationForm({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fullName = form.elements.namedItem("name") as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    const company = form.elements.namedItem("company") as HTMLInputElement;
    const message = form.elements.namedItem("message") as HTMLTextAreaElement;

    [fullName, email, phone, company, message].forEach((field) => field.setCustomValidity(""));
    fullName.value = fullName.value.trim().replace(/\s+/g, " ");
    email.value = email.value.trim().toLowerCase();
    phone.value = normalizePhoneNumber(phone.value);
    company.value = company.value.trim().replace(/\s+/g, " ");
    message.value = message.value.trim();

    const nameLetters = fullName.value.match(/\p{L}/gu)?.length ?? 0;
    if (fullName.value.length < 2 || fullName.value.length > 80 || nameLetters < 2 || !/^[\p{L}\p{M}\s.'’-]+$/u.test(fullName.value)) fullName.setCustomValidity(locale === "en" ? "Enter a valid name containing 2 to 80 characters." : "Saisissez un nom valide de 2 à 80 caractères.");
    if (phone.value && !isValidPhoneNumber(phone.value)) phone.setCustomValidity(locale === "en" ? "Use 10 digits starting with 0, + followed by 10 to 12 digits, or 12 to 14 digits starting with 00." : "Utilisez 10 chiffres commençant par 0, + suivi de 10 à 12 chiffres, ou 12 à 14 chiffres commençant par 00.");
    if (company.value.length < 2 || company.value.length > 120) company.setCustomValidity(locale === "en" ? "The organisation name must contain 2 to 120 characters." : "Le nom de l’organisation doit contenir entre 2 et 120 caractères.");
    if (message.value.length > 2000) message.setCustomValidity(locale === "en" ? "The message cannot exceed 2,000 characters." : "Le message ne peut pas dépasser 2 000 caractères.");
    setMessageLength(message.value.length);
    if (!form.reportValidity()) return;
    if (!siteConfig.contactEndpoint) {
      setStatus(locale === "en" ? "The form is not connected yet. Contact connect@paytium.io." : "Le formulaire n’est pas encore connecté. Contactez connect@paytium.io.");
      return;
    }

    setLoading(true);
    setStatus("");
    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error("request-failed");
      (window as GtagWindow).gtag?.("event", "einvoice_consultation_submit", { page_path: window.location.pathname });
      form.reset();
      setMessageLength(0);
      setStatus(locale === "en" ? "Thank you. Your request has been sent to the Paytium team. We will contact you to arrange a suitable time." : "Merci. Votre demande a bien été transmise à l’équipe Paytium. Nous reviendrons vers vous pour convenir d’un créneau adapté.");
    } catch {
      setStatus(locale === "en" ? "Your request could not be sent. Please try again or email connect@paytium.io." : "L’envoi n’a pas abouti. Merci de réessayer ou d’écrire à connect@paytium.io.");
    } finally {
      setLoading(false);
    }
  }

  const needs = locale === "en" ? ["Readiness assessment", "Paytium e-Invoice Connector", "CSP platform development", "CSP certification support", "Programme management", "Other"] : ["Évaluation de maturité", "Paytium e-Invoice Connector", "Développement d’une plateforme CSP", "Certification CSP", "Pilotage du programme", "Autre"];
  const stages = locale === "en" ? ["Exploration", "Scoping", "Development / integration", "Testing / certification", "Deployment"] : ["Réflexion", "Cadrage", "Développement / intégration", "Tests / certification", "Déploiement"];

  return <form className="contact-form einvoice-consultation-form" onSubmit={submit}>
    <input type="hidden" name="_subject" value={locale === "en" ? "Free consultation request — E-invoicing" : "Demande de consultation gratuite — Facturation électronique"} />
    <input type="hidden" name="_template" value="table" />
    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="form-honeypot" />
    <div className="field-grid">
      <label>{locale === "en" ? "Full name" : "Nom et prénom"}<input name="name" autoComplete="name" placeholder={locale === "en" ? "Your full name" : "Votre nom complet"} minLength={2} maxLength={80} required onInput={(event) => event.currentTarget.setCustomValidity("")} /></label>
      <label>{locale === "en" ? "Business email" : "Email professionnel"}<input name="email" type="email" inputMode="email" autoComplete="email" placeholder={locale === "en" ? "your.name@company.com" : "votre.nom@entreprise.com"} maxLength={254} required /></label>
      <label><span className="field-label">{locale === "en" ? "Phone" : "Téléphone"} <small>{locale === "en" ? "Optional" : "Facultatif"}</small></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Ex. 0707252336 ou +212707252336" minLength={10} maxLength={14} pattern="(?:0[0-9]{9}|\+[0-9]{10,12}|00[0-9]{10,12})" onInput={(event) => { event.currentTarget.value = sanitizePhoneInput(event.currentTarget.value); event.currentTarget.setCustomValidity(""); }} /></label>
      <label>{locale === "en" ? "Company / organisation" : "Entreprise / organisation"}<input name="company" autoComplete="organization" placeholder={locale === "en" ? "Your organisation name" : "Nom de votre organisation"} minLength={2} maxLength={120} required /></label>
      <label><span className="field-label">{locale === "en" ? "Role" : "Fonction"} <small>{locale === "en" ? "Optional" : "Facultatif"}</small></span><input name="role" autoComplete="organization-title" placeholder={locale === "en" ? "e.g. CFO, IT manager…" : "Ex. DAF, responsable SI…"} maxLength={100} /></label>
      <label><span className="field-label">{locale === "en" ? "ERP or primary system" : "ERP ou système principal"} <small>{locale === "en" ? "Optional" : "Facultatif"}</small></span><input name="erp" placeholder="Ex. SAP, Oracle, Sage, Odoo…" maxLength={120} /></label>
      <label>{locale === "en" ? "Primary need" : "Besoin principal"}<span className="contact-select"><select name="need" required defaultValue=""><option value="" disabled>{locale === "en" ? "Select your need" : "Choisissez votre besoin"}</option>{needs.map((need) => <option key={need}>{need}</option>)}</select><LuChevronDown aria-hidden="true" /></span></label>
      <label>{locale === "en" ? "Project stage" : "Niveau d’avancement"}<span className="contact-select"><select name="stage" required defaultValue=""><option value="" disabled>{locale === "en" ? "Select your stage" : "Choisissez votre niveau"}</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select><LuChevronDown aria-hidden="true" /></span></label>
    </div>
    <label><span className="field-label">Message <small>{messageLength} / 2000</small></span><textarea name="message" rows={5} maxLength={2000} placeholder={locale === "en" ? "Describe your systems, scope and key questions." : "Décrivez vos systèmes, votre périmètre et vos principales questions."} onInput={(event) => setMessageLength(event.currentTarget.value.length)} /></label>
    <p className="privacy-note" id="privacy-information"><LuShieldCheck aria-hidden="true" /><span>{locale === "en" ? "Paytium protects and respects your privacy. The information submitted is used only to arrange this consultation and respond to your request. To exercise your rights or ask a question : " : "Paytium protège et respecte votre vie privée. Les données transmises sont utilisées uniquement pour organiser cette consultation et répondre à votre demande. Pour exercer vos droits ou poser une question : "}<a href="mailto:connect@paytium.io">connect@paytium.io</a>.</span></p>
    <button className="button button-primary" type="submit" disabled={loading}>{loading ? (locale === "en" ? "Sending…" : "Envoi…") : (locale === "en" ? "Request my free consultation" : "Demander ma consultation gratuite")} <LuSend aria-hidden="true" /></button>
    {status && <p className="form-message" role="status" aria-live="polite">{status}</p>}
  </form>;
}
