import { LuBoxes, LuCloudCog, LuCompass, LuGraduationCap, LuLightbulb, LuPresentation, LuRocket, LuUsers } from "react-icons/lu";
import type { IconType } from "react-icons";

export function ServicesWheel({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const items: Array<[string, IconType]> = locale === "fr" ? [
    ["Conseil", LuCompass], ["Digital & Data", LuBoxes], ["Squad As Service", LuUsers], ["DevSecOps & Cloud", LuCloudCog],
  ] : [
    ["Consulting", LuCompass], ["Digital & Data", LuBoxes], ["Squad As Service", LuUsers], ["DevSecOps & Cloud", LuCloudCog],
  ];
  return <div className="services-wheel" aria-label={locale === "fr" ? "Les quatre services Paytium" : "Paytium’s four services"}>
    <div className="services-wheel-quadrants">{items.map(([label, Icon], index) => <span className={`wheel-quarter quarter-${index + 1}`} key={label}><Icon aria-hidden="true" /><b>{label}</b></span>)}</div>
    <div className="services-wheel-core"><img src="/paytium-icon-white.svg" alt="" /><b>PAYTIUM</b></div>
  </div>;
}

export function AcademyTrainerVisual({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const teamLabel = locale === "fr" ? "Équipes" : "Teams";
  return <div className="academy-trainer-visual" aria-label={locale === "fr" ? "Un formateur Paytium transmet ses compétences à une équipe" : "A Paytium trainer building team capabilities"}>
    <div className="academy-board"><img src="/paytium-icon.svg" alt="" /><span><LuLightbulb aria-hidden="true" />{locale === "fr" ? "Comprendre" : "Understand"}</span><span><LuGraduationCap aria-hidden="true" />{locale === "fr" ? "Pratiquer" : "Practise"}</span><span><LuRocket aria-hidden="true" />{locale === "fr" ? "Appliquer" : "Apply"}</span></div>
    <div className="academy-trainer"><LuPresentation aria-hidden="true" /><b>{locale === "fr" ? "Formateur expert" : "Expert trainer"}</b></div>
    <div className="academy-team"><b>{teamLabel}</b>{[0, 1, 2, 3].map((item) => <span key={item}><LuUsers aria-hidden="true" /></span>)}</div>
    <i className="academy-knowledge-flow" aria-hidden="true" />
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
