import type { Metadata } from "next";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuCheck, LuMail, LuMapPin, LuPhone, LuPlus } from "react-icons/lu";
import { PageShell } from "../components/SiteShell";
import { HomeHero } from "../components/HomeHero";
import { HomePositioning } from "../components/HomePositioning";
import { ElectronicInvoiceVisual } from "../components/ElectronicInvoiceVisual";
import { ContactForm } from "../components/ContactForm";
import { Arrow, Eyebrow } from "../components/Brand";
import { ExpertiseBand, FinalCta, SectionHeading } from "../components/Sections";
import { ProfileRequestModal } from "../components/ProfileRequestModal";
import { EinvoicePromoPopup } from "../components/EinvoicePromoPopup";
import { services, siteConfig } from "../content/site";

export const metadata: Metadata = {
  title: "Paytium | Conseil & technologie",
  description: "Paytium est un cabinet de conseil et de delivery digital : stratégie IT, Squad As Service, Data & IA, Cloud, DevOps et facturation électronique.",
  alternates: { canonical: "/", languages: { "fr-FR": "/", "en-US": "/en/" } },
};

const quickLinks = [
  ["Facturation électronique", "/e-invoicing/", "01"], ["Business & Technology Consulting", "/services/#consulting", "02"], ["Digital & Data Factory", "/services/#digital-data", "03"], ["Paytium Academy", "/academy/", "04"], ["Parler de votre projet", "/#contact", "05"],
];
const homeServices = services.filter((service) => service.id !== "academy");

export default function HomePage() {
  const hasContact = siteConfig.contactEmail || siteConfig.contactPhone || siteConfig.addressFr;
  return (
    <PageShell translationHref="/en/">
      <HomeHero />
      <nav className="quick-links" aria-label="Accès rapides">{quickLinks.map(([label, href, number]) => <a key={label} href={href}><span>{number}</span>{label}<b><Arrow /></b></a>)}</nav>

      <HomePositioning />

      <ExpertiseBand />
      <section className="section services-home">
        <SectionHeading eyebrow="NOS SERVICES" title={<>Nous accélérons votre <em>transformation digitale.</em></>} />
        <div className="service-grid">{homeServices.map((service) => <article className={`service-card service-${service.number}`} key={service.id}><span>{service.number}</span><h3>{service.title}</h3><p>{service.summary}</p><ul>{service.capabilities.slice(0, 5).map((item) => <li key={item}><LuPlus aria-hidden="true" />{item}</li>)}</ul>{service.id === "engineering" && <ProfileRequestModal variant="card" />}<a href={"href" in service ? service.href : `/services/#${service.id}`} aria-label={`Découvrir ${service.title}`}><Arrow /></a></article>)}</div>
        <a className="button button-primary section-action" href="/services/">Voir tous nos services <Arrow /></a>
      </section>

      <section className="invoice-focus">
        <div className="invoice-copy"><Eyebrow>FOCUS E-INVOICING</Eyebrow><h2>Connectez votre facturation à l’écosystème DGI, <em>sans remplacer vos outils.</em></h2><p>De l’évaluation de votre préparation au déploiement, Paytium sécurise votre trajectoire e-invoice. Notre e-Invoice Connector relie vos ERP et applications métier aux échanges attendus, avec des contrôles, une traçabilité et une architecture conçue pour évoluer.</p><ul>{["Diagnostic de préparation métier, data et SI", "Intégration bidirectionnelle ERP, API et fichiers", "Contrôles, transformation et orchestration des flux", "Supervision, traçabilité et déploiement progressif"].map((item) => <li key={item}><LuCheck aria-hidden="true" />{item}</li>)}</ul><div className="hero-actions"><a className="button button-light" href="/e-invoicing/#consultation">Réserver ma consultation gratuite de 30 minutes <Arrow /></a><a className="button button-outline-light" href="/e-invoicing/#offers">Explorer nos offres e-invoice</a></div></div>
        <ElectronicInvoiceVisual />
      </section>

      <FinalCta />

      <section className="section contact-section" id="contact">
        <div className="contact-intro"><Eyebrow>CONTACT</Eyebrow><h2>Parlons de votre <em>prochain projet.</em></h2><p>Une idée, un défi ou une transformation à accélérer ? Échangeons pour transformer votre ambition en prochaines étapes concrètes.</p><ul>{["Un échange centré sur votre contexte", "Une approche claire et sans jargon inutile", "Des expertises mobilisées selon le besoin", "Une trajectoire pragmatique et progressive"].map((item) => <li key={item}><LuCheck aria-hidden="true" />{item}</li>)}</ul>{hasContact && <address className="contact-details"><a href={`mailto:${siteConfig.contactEmail}`}><span aria-hidden="true"><LuMail /></span><small>Email</small><b>{siteConfig.contactEmail}</b></a><a href={`tel:${siteConfig.contactPhone?.replace(/[^\d+]/g, "")}`}><span aria-hidden="true"><LuPhone /></span><small>Téléphone</small><b>{siteConfig.contactPhone}</b></a><div><span aria-hidden="true"><LuMapPin /></span><small>Adresse</small><b>{siteConfig.addressFr}</b></div>{siteConfig.linkedinUrl && <a className="linkedin-detail" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer"><span className="linkedin-icon" aria-hidden="true"><FaLinkedinIn /></span><small>Réseau professionnel</small><b>Suivre Paytium sur LinkedIn</b></a>}</address>}</div>
        <ContactForm />
      </section>
      <EinvoicePromoPopup />
    </PageShell>
  );
}
