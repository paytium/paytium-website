"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "../content/site";

export function ContactForm({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const copy = locale === "fr" ? {
    name: "Nom et prénom", namePlaceholder: "Votre nom complet", email: "Email professionnel", phone: "Téléphone", optional: "Facultatif", phonePlaceholder: "Votre numéro de téléphone", company: "Entreprise", companyPlaceholder: "Nom de votre organisation", subject: "Sujet", choose: "Choisissez un sujet", subjects: ["Transformation digitale", "Facturation électronique", "Paytium Academy & formation", "Développement produit", "Data & IA", "Cloud & DevOps", "Autre"], message: "Message", messagePlaceholder: "Décrivez votre contexte, vos priorités et les prochaines étapes envisagées.", consent: "J’accepte que mes informations soient utilisées pour répondre à ma demande.", send: "Envoyer ma demande", sending: "Envoi…", disabled: "Le formulaire de contact n’est pas encore connecté. Configurez VITE_CONTACT_ENDPOINT pour activer l’envoi.", success: "Votre demande a bien été envoyée. Nous reviendrons vers vous rapidement.", error: "L’envoi n’a pas abouti. Merci de réessayer ultérieurement.",
  } : {
    name: "Full name", namePlaceholder: "Your full name", email: "Work email", phone: "Phone", optional: "Optional", phonePlaceholder: "Your phone number", company: "Company", companyPlaceholder: "Your organisation name", subject: "Subject", choose: "Choose a subject", subjects: ["Digital transformation", "E-invoicing", "Paytium Academy & training", "Product development", "Data & AI", "Cloud & DevOps", "Other"], message: "Message", messagePlaceholder: "Tell us about your context, priorities and expected next steps.", consent: "I agree that my information may be used to answer my request.", send: "Send my request", sending: "Sending…", disabled: "The contact form is not connected yet. Configure VITE_CONTACT_ENDPOINT to enable submissions.", success: "Your request has been sent. We will get back to you shortly.", error: "Your request could not be sent. Please try again later.",
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!siteConfig.contactEndpoint) {
      setMessage(copy.disabled);
      return;
    }
    setLoading(true); setMessage("");
    try {
      const response = await fetch(siteConfig.contactEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      if (!response.ok) throw new Error("request-failed");
      form.reset(); setMessage(copy.success);
    } catch {
      setMessage(copy.error);
    } finally { setLoading(false); }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input type="hidden" name="_subject" value="Nouveau message depuis le site Paytium" />
      <input type="hidden" name="_template" value="table" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <div className="field-grid">
        <label>{copy.name}<input name="name" autoComplete="name" placeholder={copy.namePlaceholder} required /></label>
        <label>{copy.email}<input name="email" type="email" autoComplete="email" placeholder="your.name@company.com" required /></label>
        <label><span className="field-label">{copy.phone} <small>{copy.optional}</small></span><input name="phone" type="tel" autoComplete="tel" placeholder={copy.phonePlaceholder} /></label>
        <label>{copy.company}<input name="company" autoComplete="organization" placeholder={copy.companyPlaceholder} required /></label>
      </div>
      <label>{copy.subject}<select name="subject" required defaultValue=""><option value="" disabled>{copy.choose}</option>{copy.subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></label>
      <label>{copy.message}<textarea name="message" rows={5} required placeholder={copy.messagePlaceholder} /></label>
      <label className="consent"><input type="checkbox" name="consent" required /><span>{copy.consent}</span></label>
      <button className="button button-primary" type="submit" disabled={loading}>{loading ? copy.sending : copy.send} <span aria-hidden="true">↗</span></button>
      {message && <p className="form-message" role="status">{message}</p>}
    </form>
  );
}
