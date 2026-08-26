import type { Metadata } from "next";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuCheck, LuMail, LuMapPin, LuPhone, LuPlus } from "react-icons/lu";
import { Arrow, Eyebrow } from "../../components/Brand";
import { ContactForm } from "../../components/ContactForm";
import { HomeHero } from "../../components/HomeHero";
import { HomePositioning } from "../../components/HomePositioning";
import { ExpertiseBand, FinalCta, SectionHeading } from "../../components/Sections";
import { ProfileRequestModal } from "../../components/ProfileRequestModal";
import { PageShell } from "../../components/SiteShell";
import { EinvoicePromoPopup } from "../../components/EinvoicePromoPopup";
import { servicesEn } from "../../content/site-en";
import { siteConfig } from "../../content/site";

export const metadata: Metadata = { title: "Paytium | Consulting & Technology", description: "Paytium provides technology consulting, digital product delivery, Squad As Service, Data & AI, DevSecOps, cloud engineering and e-invoicing integration.", alternates: { canonical: "/en/", languages: { "fr-FR": "/", "en-US": "/en/" } } };
const homeServices = servicesEn.filter((service) => service.id !== "academy");

export default function EnglishHomePage() {
  return <PageShell locale="en" translationHref="/">
    <HomeHero locale="en" />
    <nav className="quick-links" aria-label="Quick access">{[["E-invoicing","/en/e-invoicing/","01"],["Business & Technology Consulting","/en/services/#consulting","02"],["Digital & Data Factory","/en/services/#digital-data","03"],["Paytium Academy","/en/academy/","04"],["Discuss your project","/en/#contact","05"]].map(([label,href,number]) => <a key={label} href={href}><span>{number}</span>{label}<b><Arrow /></b></a>)}</nav>
    <HomePositioning locale="en" />
    <ExpertiseBand locale="en" />
    <section className="section services-home"><SectionHeading eyebrow="OUR SERVICES" title={<>We accelerate your <em>digital transformation.</em></>} /><div className="service-grid">{homeServices.map((service) => <article className={`service-card service-${service.number}`} key={service.id}><span>{service.number}</span><h3>{service.title}</h3><p>{service.summary}</p><ul>{service.capabilities.slice(0,5).map((item) => <li key={item}><LuPlus aria-hidden="true" />{item}</li>)}</ul>{service.id === "engineering" && <ProfileRequestModal locale="en" variant="card" />}<a href={`/en/services/#${service.id}`} aria-label={`Discover ${service.title}`}><Arrow /></a></article>)}</div><a className="button button-primary section-action" href="/en/services/">View all services <Arrow /></a></section>
    <section className="invoice-focus">
      <div className="invoice-copy"><Eyebrow>E-INVOICING FOCUS</Eyebrow><h2>Connect invoicing to the DGI ecosystem, <em>without replacing your tools.</em></h2><p>From readiness assessment to deployment, Paytium secures your e-invoicing journey. Our e-Invoice Connector links ERP and business applications to the expected exchanges, with controls, traceability and an architecture designed to evolve.</p><ul>{["Business, data and information-system readiness assessment", "Bidirectional ERP, API and file integration", "Flow validation, transformation and orchestration", "Monitoring, traceability and phased deployment"].map((item) => <li key={item}><LuCheck aria-hidden="true" />{item}</li>)}</ul><div className="hero-actions"><a className="button button-light" href="/en/e-invoicing/#consultation">Book my free 30-minute consultation <Arrow /></a><a className="button button-outline-light" href="/en/e-invoicing/#offres">Explore our e-invoicing offers</a></div></div>
      <div className="invoice-visual"><div className="invoice-sheet"><small>INVOICE</small><span /><span /><span /><div><b>Checked</b><b>Sent</b><b>Archived</b></div></div><div className="invoice-orbit"/><div className="system-tag tag-erp">ERP</div><div className="system-tag tag-data">DATA</div><div className="system-tag tag-archive">ARCHIVE</div></div>
    </section>
    <FinalCta eyebrow="YOUR NEXT STEP STARTS HERE" title={<>A transformation initiative <em>ready to move forward?</em></>} text="Let’s discuss your priorities, constraints and the best path from idea to an operational solution." primary="Start a conversation" contactHref="/en/#contact" />
    <section className="section contact-section" id="contact"><div className="contact-intro"><Eyebrow>CONTACT</Eyebrow><h2>Let’s discuss your <em>next project.</em></h2><p>An idea, challenge or transformation to accelerate? Let’s turn your ambition into concrete next steps.</p><ul>{["A conversation focused on your context", "A clear approach without unnecessary jargon", "Specialists matched to the requirement", "A pragmatic, phased roadmap"].map((item) => <li key={item}><LuCheck aria-hidden="true" />{item}</li>)}</ul><address className="contact-details"><a href={`mailto:${siteConfig.contactEmail}`}><span aria-hidden="true"><LuMail /></span><small>Email</small><b>{siteConfig.contactEmail}</b></a><a href={`tel:${siteConfig.contactPhone?.replace(/[^\d+]/g, "")}`}><span aria-hidden="true"><LuPhone /></span><small>Phone</small><b>{siteConfig.contactPhone}</b></a><div><span aria-hidden="true"><LuMapPin /></span><small>Address</small><b>{siteConfig.addressEn}</b></div>{siteConfig.linkedinUrl && <a className="linkedin-detail" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer"><span className="linkedin-icon" aria-hidden="true"><FaLinkedinIn /></span><small>Professional network</small><b>Follow Paytium on LinkedIn</b></a>}</address></div><ContactForm locale="en" /></section>
    <EinvoicePromoPopup locale="en" />
  </PageShell>;
}
