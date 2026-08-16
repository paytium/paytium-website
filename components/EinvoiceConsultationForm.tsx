"use client";

import { FormEvent, useState } from "react";
import { LuChevronDown, LuSend, LuShieldCheck } from "react-icons/lu";
import { siteConfig } from "../content/site";
import { isValidPhoneNumber, normalizePhoneNumber, sanitizePhoneInput } from "../lib/contactValidation";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function TrackedLink({ href, eventName, className, children }: { href: string; eventName: string; className: string; children: React.ReactNode }) {
  return <a className={className} href={href} onClick={() => (window as GtagWindow).gtag?.("event", eventName, { page_path: window.location.pathname })}>{children}</a>;
}

export function EinvoiceConsultationForm() {
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
    if (fullName.value.length < 2 || fullName.value.length > 80 || nameLetters < 2 || !/^[\p{L}\p{M}\s.'’-]+$/u.test(fullName.value)) fullName.setCustomValidity("Saisissez un nom valide de 2 à 80 caractères.");
    if (phone.value && !isValidPhoneNumber(phone.value)) phone.setCustomValidity("Utilisez 10 chiffres commençant par 0, + suivi de 10 à 12 chiffres, ou 12 à 14 chiffres commençant par 00.");
    if (company.value.length < 2 || company.value.length > 120) company.setCustomValidity("Le nom de l’organisation doit contenir entre 2 et 120 caractères.");
    if (message.value.length > 2000) message.setCustomValidity("Le message ne peut pas dépasser 2 000 caractères.");
    setMessageLength(message.value.length);
    if (!form.reportValidity()) return;
    if (!siteConfig.contactEndpoint) {
      setStatus("Le formulaire n’est pas encore connecté. Contactez connect@paytium.io.");
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
      setStatus("Merci. Votre demande a bien été transmise à l’équipe Paytium. Nous reviendrons vers vous pour convenir d’un créneau adapté.");
    } catch {
      setStatus("L’envoi n’a pas abouti. Merci de réessayer ou d’écrire à connect@paytium.io.");
    } finally {
      setLoading(false);
    }
  }

  const needs = ["Évaluation de maturité", "Paytium e-Invoice Connector", "Développement d’une plateforme CSP", "Certification CSP", "Pilotage du programme", "Autre"];
  const stages = ["Réflexion", "Cadrage", "Développement / intégration", "Tests / certification", "Déploiement"];

  return <form className="contact-form einvoice-consultation-form" onSubmit={submit}>
    <input type="hidden" name="_subject" value="Demande de consultation gratuite — Facturation électronique" />
    <input type="hidden" name="_template" value="table" />
    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="form-honeypot" />
    <div className="field-grid">
      <label>Nom et prénom<input name="name" autoComplete="name" placeholder="Votre nom complet" minLength={2} maxLength={80} required onInput={(event) => event.currentTarget.setCustomValidity("")} /></label>
      <label>Email professionnel<input name="email" type="email" inputMode="email" autoComplete="email" placeholder="votre.nom@entreprise.com" maxLength={254} required /></label>
      <label><span className="field-label">Téléphone <small>Facultatif</small></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Ex. 0707252336 ou +212707252336" minLength={10} maxLength={14} pattern="(?:0[0-9]{9}|\+[0-9]{10,12}|00[0-9]{10,12})" onInput={(event) => { event.currentTarget.value = sanitizePhoneInput(event.currentTarget.value); event.currentTarget.setCustomValidity(""); }} /></label>
      <label>Entreprise / organisation<input name="company" autoComplete="organization" placeholder="Nom de votre organisation" minLength={2} maxLength={120} required /></label>
      <label><span className="field-label">Fonction <small>Facultatif</small></span><input name="role" autoComplete="organization-title" placeholder="Ex. DAF, responsable SI…" maxLength={100} /></label>
      <label><span className="field-label">ERP ou système principal <small>Facultatif</small></span><input name="erp" placeholder="Ex. SAP, Oracle, Sage, Odoo…" maxLength={120} /></label>
      <label>Besoin principal<span className="contact-select"><select name="need" required defaultValue=""><option value="" disabled>Choisissez votre besoin</option>{needs.map((need) => <option key={need}>{need}</option>)}</select><LuChevronDown aria-hidden="true" /></span></label>
      <label>Niveau d’avancement<span className="contact-select"><select name="stage" required defaultValue=""><option value="" disabled>Choisissez votre niveau</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select><LuChevronDown aria-hidden="true" /></span></label>
    </div>
    <label><span className="field-label">Message <small>{messageLength} / 2000</small></span><textarea name="message" rows={5} maxLength={2000} placeholder="Décrivez vos systèmes, votre périmètre et vos principales questions." onInput={(event) => setMessageLength(event.currentTarget.value.length)} /></label>
    <label className="consent-control"><input name="consent" type="checkbox" value="Accepté" required /><span>J’accepte que mes informations soient utilisées pour traiter ma demande, conformément à la <a href="#privacy-information">notice de confidentialité</a>.</span></label>
    <p className="privacy-note" id="privacy-information"><LuShieldCheck aria-hidden="true" /><span>Paytium protège et respecte votre vie privée. Les données transmises sont utilisées uniquement pour organiser cette consultation et répondre à votre demande. Pour exercer vos droits ou poser une question : <a href="mailto:connect@paytium.io">connect@paytium.io</a>.</span></p>
    <button className="button button-primary" type="submit" disabled={loading}>{loading ? "Envoi…" : "Demander ma consultation gratuite"} <LuSend aria-hidden="true" /></button>
    {status && <p className="form-message" role="status" aria-live="polite">{status}</p>}
  </form>;
}
