"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LuCalendarDays, LuChevronDown, LuPlus, LuSend, LuTrash2, LuX } from "react-icons/lu";
import { siteConfig } from "../content/site";

type Locale = "fr" | "en";
type ProfileRequest = { id: number; availability: "immediate" | "date" };

let nextProfileId = 2;

export function ProfileRequestModal({ locale = "fr", variant = "detail" }: { locale?: Locale; variant?: "detail" | "card" }) {
  const [open, setOpen] = useState(false);
  const [profiles, setProfiles] = useState<ProfileRequest[]>([{ id: 1, availability: "immediate" }]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("");
  const [mounted, setMounted] = useState(false);
  const [generalMessageLength, setGeneralMessageLength] = useState(0);
  const [missionLengths, setMissionLengths] = useState<Record<number, number>>({});
  const copy = locale === "fr" ? {
    trigger: "Demander des profils", title: "Décrivez les profils recherchés", intro: "Partagez votre besoin : notre équipe reviendra vers vous avec un dispositif et des profils adaptés.", close: "Fermer", client: "Vos coordonnées", name: "Nom et prénom", namePlaceholder: "Votre nom complet", email: "Email de contact", emailPlaceholder: "votre.nom@entreprise.com", phone: "Téléphone de contact", phonePlaceholder: "Ex. +212 707-252336", optional: "Facultatif", profile: "Profil recherché", profilePlaceholder: "Ex. Développeur Backend Java / Spring", level: "Niveau", chooseLevel: "Sélectionnez un niveau", levels: ["Junior", "Confirmé", "Senior", "Expert"], availability: "Disponibilité", immediate: "Immédiate", exactDate: "À une date précise", startDate: "Date de disponibilité", workMode: "Mode de travail", chooseMode: "Sélectionnez un mode", modes: ["Présentiel", "Hybride", "Remote"], mission: "Détails de la mission", missionPlaceholder: "Contexte, responsabilités, compétences attendues, durée estimée…", remove: "Supprimer ce profil", add: "Ajouter un profil", general: "Message général", generalPlaceholder: "Précisez vos contraintes, le nombre de personnes, la durée ou toute information utile.", consent: "J’accepte que mes informations soient utilisées pour traiter cette demande.", send: "Envoyer la demande", sending: "Envoi…", successTitle: "Votre demande est envoyée", success: "Nous avons bien reçu le récapitulatif de votre besoin. L’équipe Paytium vous contactera rapidement.", another: "Faire une autre demande", error: "L’envoi n’a pas abouti. Merci de réessayer ou de nous écrire à connect@paytium.io.", profileNumber: "Profil", required: "Champs obligatoires", nameInvalid: "Saisissez un nom valide de 2 à 80 caractères, sans chiffres ni symboles spéciaux.", phoneInvalid: "Saisissez un numéro valide contenant entre 7 et 15 chiffres.", profileInvalid: "Décrivez le profil recherché en 3 à 120 caractères.", missionInvalid: "Les détails de la mission doivent contenir entre 20 et 1 500 caractères.",
  } : {
    trigger: "Request specialists", title: "Tell us which specialists you need", intro: "Share your requirement and our team will recommend the right delivery model and qualified specialists.", close: "Close", client: "Your contact details", name: "Full name", namePlaceholder: "Your full name", email: "Business email", emailPlaceholder: "your.name@company.com", phone: "Contact number", phonePlaceholder: "E.g. +212 707-252336", optional: "Optional", profile: "Required role", profilePlaceholder: "E.g. Java / Spring Backend Engineer", level: "Seniority", chooseLevel: "Select seniority", levels: ["Junior", "Mid-level", "Senior", "Expert"], availability: "Availability", immediate: "Immediate", exactDate: "From a specific date", startDate: "Available from", workMode: "Delivery mode", chooseMode: "Select a delivery mode", modes: ["On-site", "Hybrid", "Remote"], mission: "Engagement details", missionPlaceholder: "Business context, responsibilities, required skills and estimated duration…", remove: "Remove this role", add: "Add another role", general: "Additional context", generalPlaceholder: "Add constraints, team size, target start date or any other useful information.", consent: "I agree that my information may be used to process this request.", send: "Submit request", sending: "Submitting…", successTitle: "Your request has been submitted", success: "We have received the full brief. The Paytium team will contact you shortly.", another: "Submit another request", error: "Your request could not be submitted. Please try again or email connect@paytium.io.", profileNumber: "Role", required: "Required fields", nameInvalid: "Enter a valid name between 2 and 80 characters, without numbers or special symbols.", phoneInvalid: "Enter a valid phone number containing between 7 and 15 digits.", profileInvalid: "Describe the required role in 3 to 120 characters.", missionInvalid: "Engagement details must contain between 20 and 1,500 characters.",
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const openModal = () => { setStatus(""); setOpen(true); };
  const addProfile = () => setProfiles((current) => current.length >= 8 ? current : [...current, { id: nextProfileId++, availability: "immediate" }]);
  const removeProfile = (id: number) => setProfiles((current) => current.filter((profile) => profile.id !== id));
  const updateAvailability = (id: number, availability: ProfileRequest["availability"]) => setProfiles((current) => current.map((profile) => profile.id === id ? { ...profile, availability } : profile));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.namedItem("contact_name") as HTMLInputElement;
    const email = form.elements.namedItem("contact_email") as HTMLInputElement;
    const phone = form.elements.namedItem("contact_phone") as HTMLInputElement;
    const generalMessage = form.elements.namedItem("general_message") as HTMLTextAreaElement;
    const roleFields = Array.from(form.querySelectorAll<HTMLInputElement>('input[name$="_role"]'));
    const missionFields = Array.from(form.querySelectorAll<HTMLTextAreaElement>('textarea[name$="_mission_details"]'));
    [name, email, phone, generalMessage, ...roleFields, ...missionFields].forEach((field) => field.setCustomValidity(""));
    name.value = name.value.trim().replace(/\s+/g, " ");
    email.value = email.value.trim().toLowerCase();
    phone.value = phone.value.trim().replace(/\s+/g, " ");
    generalMessage.value = generalMessage.value.trim();
    roleFields.forEach((field) => { field.value = field.value.trim().replace(/\s+/g, " "); });
    missionFields.forEach((field) => { field.value = field.value.trim(); });
    const nameLetters = name.value.match(/\p{L}/gu)?.length ?? 0;
    if (name.value.length < 2 || name.value.length > 80 || nameLetters < 2 || !/^[\p{L}\p{M}\s.'’-]+$/u.test(name.value)) name.setCustomValidity(copy.nameInvalid);
    const digits = phone.value.replace(/\D/g, "");
    if (phone.value && (!/^[+\d][\d\s().-]+$/.test(phone.value) || digits.length < 7 || digits.length > 15)) {
      phone.setCustomValidity(copy.phoneInvalid);
    }
    roleFields.forEach((field) => { if (field.value.length < 3 || field.value.length > 120) field.setCustomValidity(copy.profileInvalid); });
    missionFields.forEach((field) => { if (field.value.length < 20 || field.value.length > 1500) field.setCustomValidity(copy.missionInvalid); });
    setGeneralMessageLength(generalMessage.value.length);
    setMissionLengths(Object.fromEntries(missionFields.map((field, index) => [profiles[index]?.id ?? index, field.value.length])));
    if (!form.reportValidity()) return;
    if (!siteConfig.contactEndpoint) { setStatus("error"); return; }
    setLoading(true); setStatus("");
    try {
      const payload = Object.fromEntries(new FormData(form));
      profiles.forEach((profile, index) => {
        payload[`profile_${index + 1}_availability`] = profile.availability === "immediate" ? copy.immediate : copy.exactDate;
      });
      payload.submitted_at = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { dateStyle: "full", timeStyle: "long" }).format(new Date());
      payload.profiles_count = String(profiles.length);
      payload.source_page = window.location.href;
      const response = await fetch(siteConfig.contactEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("request-failed");
      form.reset();
      setProfiles([{ id: nextProfileId++, availability: "immediate" }]);
      setGeneralMessageLength(0);
      setMissionLengths({});
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  const modal = open ? <div className="profile-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-request-title">
        <header className="profile-modal-header"><div><small>SQUAD AS SERVICE</small><h2 id="profile-request-title">{copy.title}</h2><p>{copy.intro}</p></div><button type="button" onClick={() => setOpen(false)} aria-label={copy.close}><LuX aria-hidden="true" /></button></header>
        {status === "success" ? <div className="profile-request-success" role="status"><span><LuSend aria-hidden="true" /></span><h3>{copy.successTitle}</h3><p>{copy.success}</p><button className="button button-primary" type="button" onClick={() => setStatus("")}>{copy.another}</button></div> :
          <form className="contact-form profile-request-form" onSubmit={submit}>
            <input type="hidden" name="_subject" value={locale === "fr" ? "Demande de profils — Squad As Service" : "Resource request — Squad As Service"} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="request_type" value={locale === "fr" ? "Squad As Service — demande de profils" : "Squad As Service — resource request"} />
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
            <div className="profile-form-section-heading"><div><span>01</span><h3>{copy.client}</h3></div><small>* {copy.required}</small></div>
            <div className="field-grid profile-client-grid">
              <label>{copy.name} *<input name="contact_name" autoFocus autoComplete="name" placeholder={copy.namePlaceholder} minLength={2} maxLength={80} onInput={(event) => event.currentTarget.setCustomValidity("")} required /></label>
              <label>{copy.email} *<input name="contact_email" type="email" inputMode="email" autoComplete="email" placeholder={copy.emailPlaceholder} maxLength={254} required /></label>
              <label><span className="field-label">{copy.phone}<small>{copy.optional}</small></span><input name="contact_phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={copy.phonePlaceholder} minLength={7} maxLength={25} onInput={(event) => event.currentTarget.setCustomValidity("")} /></label>
            </div>
            <div className="profile-list">
              {profiles.map((profile, index) => <fieldset className="profile-entry" key={profile.id}>
                <legend><span>{String(index + 2).padStart(2, "0")}</span>{copy.profileNumber} {index + 1}</legend>
                {profiles.length > 1 && <button className="remove-profile" type="button" onClick={() => removeProfile(profile.id)} aria-label={`${copy.remove} ${index + 1}`}><LuTrash2 aria-hidden="true" />{copy.remove}</button>}
                <div className="field-grid">
                  <label>{copy.profile} *<input name={`profile_${index + 1}_role`} placeholder={copy.profilePlaceholder} minLength={3} maxLength={120} onInput={(event) => event.currentTarget.setCustomValidity("")} required /></label>
                  <label>{copy.level}<span className="contact-select"><select name={`profile_${index + 1}_level`} defaultValue=""><option value="">{copy.chooseLevel}</option>{copy.levels.map((level) => <option key={level}>{level}</option>)}</select><LuChevronDown aria-hidden="true" /></span></label>
                  <label>{copy.availability} *<span className="contact-select"><select name={`profile_${index + 1}_availability`} value={profile.availability} onChange={(event) => updateAvailability(profile.id, event.target.value as ProfileRequest["availability"])} required><option value="immediate">{copy.immediate}</option><option value="date">{copy.exactDate}</option></select><LuChevronDown aria-hidden="true" /></span></label>
                  {profile.availability === "date" ? <label>{copy.startDate} *<span className="date-field"><input name={`profile_${index + 1}_availability_date`} type="date" min={new Date().toISOString().slice(0, 10)} required /><LuCalendarDays aria-hidden="true" /></span></label> : <input type="hidden" name={`profile_${index + 1}_availability_date`} value={copy.immediate} />}
                  <label>{copy.workMode} *<span className="contact-select"><select name={`profile_${index + 1}_work_mode`} defaultValue="" required><option value="" disabled>{copy.chooseMode}</option>{copy.modes.map((mode) => <option key={mode}>{mode}</option>)}</select><LuChevronDown aria-hidden="true" /></span></label>
                </div>
                <label><span className="field-label">{copy.mission} *<small aria-live="polite">{missionLengths[profile.id] ?? 0} / 1500</small></span><textarea name={`profile_${index + 1}_mission_details`} rows={4} placeholder={copy.missionPlaceholder} minLength={20} maxLength={1500} onInput={(event) => { event.currentTarget.setCustomValidity(""); setMissionLengths((current) => ({ ...current, [profile.id]: event.currentTarget.value.length })); }} required /></label>
              </fieldset>)}
            </div>
            <button className="add-profile" type="button" onClick={addProfile} disabled={profiles.length >= 8}><LuPlus aria-hidden="true" />{copy.add}</button>
            <label><span className="field-label">{copy.general}<small aria-live="polite">{generalMessageLength} / 2000</small></span><textarea name="general_message" rows={4} placeholder={copy.generalPlaceholder} maxLength={2000} onInput={(event) => { event.currentTarget.setCustomValidity(""); setGeneralMessageLength(event.currentTarget.value.length); }} /></label>
            <label className="consent"><input type="checkbox" name="consent" required /><span>{copy.consent}</span></label>
            <button className="button button-primary profile-submit" type="submit" disabled={loading}>{loading ? copy.sending : copy.send}<LuSend aria-hidden="true" /></button>
            {status === "error" && <p className="form-message" role="alert">{copy.error}</p>}
          </form>}
      </section>
    </div> : null;

  return <>
    <button className={`profile-request-trigger profile-request-trigger-${variant}`} type="button" onClick={openModal}>{copy.trigger}<LuPlus aria-hidden="true" /></button>
    {mounted && modal ? createPortal(modal, document.body) : null}
  </>;
}
