"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "../content/site";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!siteConfig.contactEndpoint) {
      setMessage("Le formulaire de contact n’est pas encore connecté. Configurez VITE_CONTACT_ENDPOINT pour activer l’envoi.");
      return;
    }
    setLoading(true); setMessage("");
    try {
      const response = await fetch(siteConfig.contactEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      if (!response.ok) throw new Error("request-failed");
      form.reset(); setMessage("Votre demande a bien été envoyée. Nous reviendrons vers vous rapidement.");
    } catch {
      setMessage("L’envoi n’a pas abouti. Merci de réessayer ultérieurement.");
    } finally { setLoading(false); }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-grid">
        <label>Nom et prénom<input name="name" autoComplete="name" required /></label>
        <label>Email professionnel<input name="email" type="email" autoComplete="email" required /></label>
        <label>Téléphone <small>Facultatif</small><input name="phone" type="tel" autoComplete="tel" /></label>
        <label>Entreprise<input name="company" autoComplete="organization" required /></label>
      </div>
      <label>Sujet<select name="subject" required defaultValue=""><option value="" disabled>Choisissez un sujet</option><option>Transformation digitale</option><option>Facturation électronique</option><option>Développement produit</option><option>Data & IA</option><option>Cloud & DevOps</option><option>Autre</option></select></label>
      <label>Message<textarea name="message" rows={5} required placeholder="Parlez-nous de votre contexte et de vos priorités." /></label>
      <label className="consent"><input type="checkbox" name="consent" required /><span>J’accepte que mes informations soient utilisées pour répondre à ma demande.</span></label>
      <button className="button button-primary" type="submit" disabled={loading}>{loading ? "Envoi…" : "Envoyer ma demande"} <span aria-hidden="true">↗</span></button>
      {message && <p className="form-message" role="status">{message}</p>}
    </form>
  );
}
