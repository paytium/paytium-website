"use client";

import { FormEvent, useState } from "react";
import { LuChevronDown, LuRocket, LuShieldCheck } from "react-icons/lu";
import { siteConfig } from "../content/site";
import { isValidPhoneNumber, normalizePhoneNumber, sanitizePhoneInput } from "../lib/contactValidation";

export function ContactForm({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const copy = locale === "fr" ? {
    name: "Nom et prénom", namePlaceholder: "Votre nom complet", email: "Email professionnel", phone: "Téléphone", optional: "Facultatif", phonePlaceholder: "Ex. 0707252336 ou +212707252336", company: "Entreprise", companyPlaceholder: "Nom de votre organisation", subject: "Sujet", choose: "Choisissez un sujet", subjects: ["Transformation digitale", "Facturation électronique", "Paytium Academy & formation", "Développement produit", "Data & IA", "Cloud & DevOps", "Autre"], message: "Message", messagePlaceholder: "Décrivez votre contexte, vos priorités et les prochaines étapes envisagées.", privacy: "Paytium protège et respecte votre vie privée. Vos données personnelles seront utilisées uniquement pour traiter votre demande et vous fournir les informations, produits ou services sollicités.", send: "Envoyer ma demande", sending: "Envoi…", disabled: "Le formulaire de contact n’est pas encore connecté. Configurez VITE_CONTACT_ENDPOINT pour activer l’envoi.", success: "Votre demande a bien été envoyée. Nous reviendrons vers vous rapidement.", error: "L’envoi n’a pas abouti. Merci de réessayer ultérieurement.", nameInvalid: "Saisissez un nom valide de 2 à 80 caractères, sans chiffres ni symboles spéciaux.", phoneInvalid: "Utilisez 10 chiffres commençant par 0, + suivi de 10 à 12 chiffres, ou 12 à 14 chiffres commençant par 00.", companyInvalid: "Le nom de l’entreprise doit contenir entre 2 et 120 caractères.", messageInvalid: "Votre message doit contenir entre 20 et 2 000 caractères.",
  } : {
    name: "Full name", namePlaceholder: "Your full name", email: "Business email", phone: "Contact number", optional: "Optional", phonePlaceholder: "E.g. 0707252336 or +212707252336", company: "Company", companyPlaceholder: "Your organisation name", subject: "Subject", choose: "Choose a subject", subjects: ["Digital transformation", "E-invoicing", "Paytium Academy & training", "Digital product delivery", "Data & AI", "DevSecOps & Cloud Engineering", "Squad As Service", "Other"], message: "Message", messagePlaceholder: "Tell us about your business context, priorities and expected next steps.", privacy: "Paytium is committed to protecting and respecting your privacy. We will use your personal data only to process your request and provide the information, products or services you asked for.", send: "Submit my request", sending: "Submitting…", disabled: "The contact form is not connected yet. Configure VITE_CONTACT_ENDPOINT to enable submissions.", success: "Your request has been submitted. We will get back to you shortly.", error: "Your request could not be submitted. Please try again later.", nameInvalid: "Enter a valid name between 2 and 80 characters, without numbers or special symbols.", phoneInvalid: "Use 10 digits starting with 0, + followed by 10 to 12 digits, or 12 to 14 digits starting with 00.", companyInvalid: "The company name must contain between 2 and 120 characters.", messageInvalid: "Your message must contain between 20 and 2,000 characters.",
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    const company = form.elements.namedItem("company") as HTMLInputElement;
    const messageField = form.elements.namedItem("message") as HTMLTextAreaElement;

    [name, email, phone, company, messageField].forEach((field) => field.setCustomValidity(""));
    name.value = name.value.trim().replace(/\s+/g, " ");
    email.value = email.value.trim().toLowerCase();
    phone.value = normalizePhoneNumber(phone.value);
    company.value = company.value.trim().replace(/\s+/g, " ");
    messageField.value = messageField.value.trim();

    const nameLetters = name.value.match(/\p{L}/gu)?.length ?? 0;
    if (name.value.length < 2 || name.value.length > 80 || nameLetters < 2 || !/^[\p{L}\p{M}\s.'’-]+$/u.test(name.value)) name.setCustomValidity(copy.nameInvalid);
    if (phone.value && !isValidPhoneNumber(phone.value)) phone.setCustomValidity(copy.phoneInvalid);
    if (company.value.length < 2 || company.value.length > 120) company.setCustomValidity(copy.companyInvalid);
    if (messageField.value.length < 20 || messageField.value.length > 2000) messageField.setCustomValidity(copy.messageInvalid);
    setMessageLength(messageField.value.length);
    if (!form.reportValidity()) return;
    if (!siteConfig.contactEndpoint) {
      setMessage(copy.disabled);
      return;
    }
    setLoading(true); setMessage("");
    try {
      const response = await fetch(siteConfig.contactEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      if (!response.ok) throw new Error("request-failed");
      form.reset(); setMessageLength(0); setMessage(copy.success);
    } catch {
      setMessage(copy.error);
    } finally { setLoading(false); }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input type="hidden" name="_subject" value={locale === "fr" ? "Nouveau message depuis le site Paytium" : "New enquiry from the Paytium website"} />
      <input type="hidden" name="_template" value="table" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <div className="field-grid">
        <label>{copy.name}<input name="name" autoComplete="name" placeholder={copy.namePlaceholder} minLength={2} maxLength={80} onInput={(event) => event.currentTarget.setCustomValidity("")} required /></label>
        <label>{copy.email}<input name="email" type="email" inputMode="email" autoComplete="email" placeholder="your.name@company.com" maxLength={254} onInput={(event) => event.currentTarget.setCustomValidity("")} required /></label>
        <label><span className="field-label">{copy.phone} <small>{copy.optional}</small></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={copy.phonePlaceholder} minLength={10} maxLength={14} pattern="(?:0[0-9]{9}|\+[0-9]{10,12}|00[0-9]{10,12})" onInput={(event) => { event.currentTarget.value = sanitizePhoneInput(event.currentTarget.value); event.currentTarget.setCustomValidity(""); }} /></label>
        <label>{copy.company}<input name="company" autoComplete="organization" placeholder={copy.companyPlaceholder} minLength={2} maxLength={120} onInput={(event) => event.currentTarget.setCustomValidity("")} required /></label>
      </div>
      <label>{copy.subject}<span className="contact-select"><select name="subject" required defaultValue=""><option value="" disabled>{copy.choose}</option>{copy.subjects.map((subject) => <option key={subject}>{subject}</option>)}</select><LuChevronDown aria-hidden="true" /></span></label>
      <label><span className="field-label">{copy.message} <small aria-live="polite">{messageLength} / 2000</small></span><textarea name="message" rows={5} minLength={20} maxLength={2000} required placeholder={copy.messagePlaceholder} onInput={(event) => { event.currentTarget.setCustomValidity(""); setMessageLength(event.currentTarget.value.length); }} /></label>
      <p className="privacy-note"><LuShieldCheck aria-hidden="true" /><span>{copy.privacy}</span></p>
      <button className="button button-primary" type="submit" disabled={loading}>{loading ? copy.sending : copy.send} <LuRocket aria-hidden="true" /></button>
      {message && <p className="form-message" role="status">{message}</p>}
    </form>
  );
}
