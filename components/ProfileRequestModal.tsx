"use client";

import { FormEvent, useEffect, useState } from "react";
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
  const copy = locale === "fr" ? {
    trigger: "Demander des profils", title: "Décrivez les profils recherchés", intro: "Partagez votre besoin : notre équipe reviendra vers vous avec un dispositif et des profils adaptés.", close: "Fermer", client: "Vos coordonnées", name: "Nom et prénom", namePlaceholder: "Votre nom complet", email: "Email de contact", emailPlaceholder: "votre.nom@entreprise.com", phone: "Téléphone de contact", phonePlaceholder: "Ex. +212 707-252336", optional: "Facultatif", profile: "Profil recherché", profilePlaceholder: "Ex. Développeur Backend Java / Spring", level: "Niveau", chooseLevel: "Sélectionnez un niveau", levels: ["Junior", "Confirmé", "Senior", "Expert"], availability: "Disponibilité", immediate: "Immédiate", exactDate: "À une date précise", startDate: "Date de disponibilité", workMode: "Mode de travail", chooseMode: "Sélectionnez un mode", modes: ["Présentiel", "Hybride", "Remote"], mission: "Détails de la mission", missionPlaceholder: "Contexte, responsabilités, compétences attendues, durée estimée…", remove: "Supprimer ce profil", add: "Ajouter un profil", general: "Message général", generalPlaceholder: "Précisez vos contraintes, le nombre de personnes, la durée ou toute information utile.", consent: "J’accepte que mes informations soient utilisées pour traiter cette demande.", send: "Envoyer la demande", sending: "Envoi…", successTitle: "Votre demande est envoyée", success: "Nous avons bien reçu le récapitulatif de votre besoin. L’équipe Paytium vous contactera rapidement.", another: "Faire une autre demande", error: "L’envoi n’a pas abouti. Merci de réessayer ou de nous écrire à connect@paytium.io.", profileNumber: "Profil", required: "Champs obligatoires",
  } : {
    trigger: "Request profiles", title: "Tell us which profiles you need", intro: "Share your requirement and our team will come back with the right setup and qualified profiles.", close: "Close", client: "Your contact details", name: "Full name", namePlaceholder: "Your full name", email: "Contact email", emailPlaceholder: "your.name@company.com", phone: "Contact phone", phonePlaceholder: "E.g. +212 707-252336", optional: "Optional", profile: "Required profile", profilePlaceholder: "E.g. Java / Spring Backend Developer", level: "Level", chooseLevel: "Select a level", levels: ["Junior", "Intermediate", "Senior", "Expert"], availability: "Availability", immediate: "Immediate", exactDate: "On a specific date", startDate: "Availability date", workMode: "Work mode", chooseMode: "Select a mode", modes: ["On-site", "Hybrid", "Remote"], mission: "Assignment details", missionPlaceholder: "Context, responsibilities, expected skills, estimated duration…", remove: "Remove this profile", add: "Add a profile", general: "General message", generalPlaceholder: "Add constraints, team size, duration or any useful information.", consent: "I agree that my information may be used to process this request.", send: "Send request", sending: "Sending…", successTitle: "Your request has been sent", success: "We have received the full summary. The Paytium team will contact you shortly.", another: "Send another request", error: "Your request could not be sent. Please try again or email connect@paytium.io.", profileNumber: "Profile", required: "Required fields",
  };

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
    const phone = form.elements.namedItem("contact_phone") as HTMLInputElement;
    phone.setCustomValidity("");
    const digits = phone.value.replace(/\D/g, "");
    if (phone.value && (!/^[+\d][\d\s().-]+$/.test(phone.value) || digits.length < 7 || digits.length > 15)) {
      phone.setCustomValidity(locale === "fr" ? "Saisissez un numéro valide contenant entre 7 et 15 chiffres." : "Enter a valid phone number containing between 7 and 15 digits.");
    }
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
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return <>
    <button className={`profile-request-trigger profile-request-trigger-${variant}`} type="button" onClick={openModal}>{copy.trigger}<LuPlus aria-hidden="true" /></button>
    {open && <div className="profile-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-request-title">
        <header className="profile-modal-header"><div><small>SQUAD AS SERVICE</small><h2 id="profile-request-title">{copy.title}</h2><p>{copy.intro}</p></div><button type="button" onClick={() => setOpen(false)} aria-label={copy.close}><LuX aria-hidden="true" /></button></header>
        {status === "success" ? <div className="profile-request-success" role="status"><span><LuSend aria-hidden="true" /></span><h3>{copy.successTitle}</h3><p>{copy.success}</p><button className="button button-primary" type="button" onClick={() => setStatus("")}>{copy.another}</button></div> :
          <form className="contact-form profile-request-form" onSubmit={submit}>
            <input type="hidden" name="_subject" value="Demande de profils — Squad As Service" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="request_type" value="Squad As Service — demande de profils" />
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
            <div className="profile-form-section-heading"><div><span>01</span><h3>{copy.client}</h3></div><small>* {copy.required}</small></div>
            <div className="field-grid profile-client-grid">
              <label>{copy.name} *<input name="contact_name" autoFocus autoComplete="name" placeholder={copy.namePlaceholder} minLength={2} maxLength={80} required /></label>
              <label>{copy.email} *<input name="contact_email" type="email" inputMode="email" autoComplete="email" placeholder={copy.emailPlaceholder} maxLength={254} required /></label>
              <label><span className="field-label">{copy.phone}<small>{copy.optional}</small></span><input name="contact_phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={copy.phonePlaceholder} maxLength={25} onInput={(event) => event.currentTarget.setCustomValidity("")} /></label>
            </div>
            <div className="profile-list">
              {profiles.map((profile, index) => <fieldset className="profile-entry" key={profile.id}>
                <legend><span>{String(index + 2).padStart(2, "0")}</span>{copy.profileNumber} {index + 1}</legend>
                {profiles.length > 1 && <button className="remove-profile" type="button" onClick={() => removeProfile(profile.id)} aria-label={`${copy.remove} ${index + 1}`}><LuTrash2 aria-hidden="true" />{copy.remove}</button>}
                <div className="field-grid">
                  <label>{copy.profile} *<input name={`profile_${index + 1}_role`} placeholder={copy.profilePlaceholder} minLength={3} maxLength={120} required /></label>
                  <label>{copy.level}<span className="contact-select"><select name={`profile_${index + 1}_level`} defaultValue=""><option value="">{copy.chooseLevel}</option>{copy.levels.map((level) => <option key={level}>{level}</option>)}</select><LuChevronDown aria-hidden="true" /></span></label>
                  <label>{copy.availability} *<span className="contact-select"><select name={`profile_${index + 1}_availability`} value={profile.availability} onChange={(event) => updateAvailability(profile.id, event.target.value as ProfileRequest["availability"])} required><option value="immediate">{copy.immediate}</option><option value="date">{copy.exactDate}</option></select><LuChevronDown aria-hidden="true" /></span></label>
                  {profile.availability === "date" ? <label>{copy.startDate} *<span className="date-field"><input name={`profile_${index + 1}_availability_date`} type="date" min={new Date().toISOString().slice(0, 10)} required /><LuCalendarDays aria-hidden="true" /></span></label> : <input type="hidden" name={`profile_${index + 1}_availability_date`} value={copy.immediate} />}
                  <label>{copy.workMode} *<span className="contact-select"><select name={`profile_${index + 1}_work_mode`} defaultValue="" required><option value="" disabled>{copy.chooseMode}</option>{copy.modes.map((mode) => <option key={mode}>{mode}</option>)}</select><LuChevronDown aria-hidden="true" /></span></label>
                </div>
                <label>{copy.mission} *<textarea name={`profile_${index + 1}_mission_details`} rows={4} placeholder={copy.missionPlaceholder} minLength={20} maxLength={1500} required /></label>
              </fieldset>)}
            </div>
            <button className="add-profile" type="button" onClick={addProfile} disabled={profiles.length >= 8}><LuPlus aria-hidden="true" />{copy.add}</button>
            <label>{copy.general}<textarea name="general_message" rows={4} placeholder={copy.generalPlaceholder} maxLength={2000} /></label>
            <label className="consent"><input type="checkbox" name="consent" required /><span>{copy.consent}</span></label>
            <button className="button button-primary profile-submit" type="submit" disabled={loading}>{loading ? copy.sending : copy.send}<LuSend aria-hidden="true" /></button>
            {status === "error" && <p className="form-message" role="alert">{copy.error}</p>}
          </form>}
      </section>
    </div>}
  </>;
}
