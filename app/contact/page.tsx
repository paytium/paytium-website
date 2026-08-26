import type { Metadata } from "next";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuCheck, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { ContactForm } from "../../components/ContactForm";
import { Eyebrow } from "../../components/Brand";
import { Breadcrumbs, PageShell } from "../../components/SiteShell";
import { PageHero } from "../../components/Sections";
import { siteConfig } from "../../content/site";
import { ContactRocketVisual } from "../../components/PageVisuals";

export const metadata: Metadata = {
  title: "Paytium | Contact & consultation",
  description: "Contactez Paytium pour cadrer un projet de transformation digitale, data, cloud, Squad As Service ou facturation électronique.",
  alternates: { canonical: "/contact/", languages: { "fr-FR": "/contact/", "en-US": "/en/contact/" } },
  openGraph: { title: "Paytium | Contact & consultation", description: "Échangez avec les experts Paytium sur votre prochain projet digital et technologique.", url: "/contact/" },
};

export default function ContactPage() {
  return <PageShell translationHref="/en/contact/">
    <Breadcrumbs items={[{ label: "Contact", href: "/contact/" }]} />
    <PageHero eyebrow="CONTACT PAYTIUM" title={<>Transformons votre prochain enjeu en <em>plan d’action.</em></>} text="Présentez-nous votre contexte, vos priorités et vos contraintes. Nos experts vous aideront à clarifier la prochaine étape." primary={["Envoyer une demande", "#contact-form"]} secondary={["Découvrir nos services", "/services/"]}>
      <ContactRocketVisual />
    </PageHero>
    <section className="section contact-section" id="contact-form">
      <div className="contact-intro"><Eyebrow>ÉCHANGEONS</Eyebrow><h2>Parlons de votre <em>prochain projet.</em></h2><p>Un premier échange permet de comprendre votre besoin, d’identifier les expertises pertinentes et de définir des prochaines étapes concrètes.</p><ul>{["Un échange centré sur votre contexte", "Une approche claire et sans jargon inutile", "Des expertises mobilisées selon le besoin", "Une trajectoire pragmatique et progressive"].map((item) => <li key={item}><LuCheck aria-hidden="true" />{item}</li>)}</ul><address className="contact-details"><a href={`mailto:${siteConfig.contactEmail}`}><span aria-hidden="true"><LuMail /></span><small>Email</small><b>{siteConfig.contactEmail}</b></a><a href={`tel:${siteConfig.contactPhone?.replace(/[^\d+]/g, "")}`}><span aria-hidden="true"><LuPhone /></span><small>Téléphone</small><b>{siteConfig.contactPhone}</b></a><div><span aria-hidden="true"><LuMapPin /></span><small>Adresse</small><b>{siteConfig.addressFr}</b></div><a className="linkedin-detail" href={siteConfig.linkedinUrl ?? undefined} target="_blank" rel="noreferrer"><span className="linkedin-icon" aria-hidden="true"><FaLinkedinIn /></span><small>Réseau professionnel</small><b>Suivre Paytium sur LinkedIn</b></a></address></div>
      <ContactForm />
    </section>
  </PageShell>;
}
