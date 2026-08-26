import { LuBookOpenCheck, LuBoxes, LuCloudCog, LuCompass, LuPresentation, LuRocket, LuRoute, LuUsers } from "react-icons/lu";
import type { IconType } from "react-icons";

export function ServicesWheel({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const items: Array<[string, IconType]> = [
    ["Business & Technology Consulting", LuCompass],
    ["Digital & Data Factory", LuBoxes],
    ["DevSecOps & Cloud Engineering", LuCloudCog],
    ["Squad As Service", LuUsers],
  ];
  return <div className="services-wheel" aria-label={locale === "fr" ? "Les quatre services Paytium" : "Paytium’s four services"}>
    <div className="services-wheel-quadrants">{items.map(([label, Icon], index) => <span className={`wheel-quarter quarter-${index + 1}`} key={label}><span className="wheel-quarter-content"><Icon aria-hidden="true" /><b>{label}</b></span></span>)}</div>
    <div className="services-wheel-core"><img src="/paytium-icon-white.svg" alt="" /><b>PAYTIUM</b></div>
  </div>;
}

export function AcademyTrainerVisual({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const content = locale === "fr" ? {
    eyebrow: "PAYTIUM ACADEMY",
    title: "Apprendre. Pratiquer. Transmettre.",
    text: "Des parcours animés par des praticiens pour transformer les savoirs en compétences durables.",
    items: [["Formations", "Des apports ciblés et concrets"], ["Parcours sur mesure", "Un dispositif adapté à vos enjeux"], ["Ateliers & coaching", "La pratique au cœur de l’apprentissage"]],
    footer: "Présentiel · À distance · Hybride",
  } : {
    eyebrow: "PAYTIUM ACADEMY",
    title: "Learn. Practise. Share.",
    text: "Practitioner-led learning paths that turn knowledge into lasting team capabilities.",
    items: [["Courses", "Focused, practical learning"], ["Tailored paths", "A programme shaped around your goals"], ["Workshops & coaching", "Hands-on practice at every step"]],
    footer: "In person · Remote · Hybrid",
  };
  const icons = [LuBookOpenCheck, LuRoute, LuPresentation];
  return <div className="academy-trainer-visual academy-light-poster" aria-label={locale === "fr" ? "Les formats de formation Paytium Academy" : "Paytium Academy learning formats"}>
    <header><img src="/paytium-icon.svg" alt="" /><span>{content.eyebrow}</span></header>
    <div className="academy-poster-copy"><h3>{content.title}</h3><p>{content.text}</p></div>
    <div className="academy-learning-path">{content.items.map(([title, text], index) => {
      const Icon = icons[index];
      return <article key={title}><span><Icon aria-hidden="true" /></span><b>{title}</b><small>{text}</small></article>;
    })}</div>
    <footer><span>{content.footer}</span><i aria-hidden="true" /><b>{locale === "fr" ? "Des compétences directement mobilisables" : "Capabilities ready to apply"}</b></footer>
  </div>;
}

export function ContactRocketVisual({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const labels = locale === "fr" ? ["Votre défi", "Nos expertises", "Un plan d’action"] : ["Your challenge", "Our expertise", "An action plan"];
  return <div className="contact-rocket-visual" aria-label={locale === "fr" ? "Transformez votre défi en plan d’action avec Paytium" : "Turn your challenge into an action plan with Paytium"}>
    <div className="contact-orbit" aria-hidden="true"><i/><i/><i/></div>
    <div className="contact-rocket-core"><img src="/paytium-icon-white.svg" alt="" /><LuRocket aria-hidden="true" /></div>
    <div className="contact-challenge-path">{labels.map((label, index) => <span key={label}><small>0{index + 1}</small><b>{label}</b></span>)}</div>
    <p>{locale === "fr" ? "Échangeons. Clarifions. Avançons." : "Discuss. Clarify. Move forward."}</p>
  </div>;
}
