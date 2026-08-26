import type { Metadata } from "next";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuCheck, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { ContactForm } from "../../../components/ContactForm";
import { Eyebrow } from "../../../components/Brand";
import { Breadcrumbs, PageShell } from "../../../components/SiteShell";
import { PageHero } from "../../../components/Sections";
import { siteConfig } from "../../../content/site";
import { ContactRocketVisual } from "../../../components/PageVisuals";

export const metadata: Metadata = {
  title: "Paytium | Contact & Consultation",
  description: "Contact Paytium to frame a digital transformation, data, cloud, Squad As Service or e-invoicing initiative.",
  alternates: { canonical: "/en/contact/", languages: { "fr-FR": "/contact/", "en-US": "/en/contact/" } },
  openGraph: { title: "Paytium | Contact & Consultation", description: "Talk to Paytium experts about your next digital and technology initiative.", url: "/en/contact/" },
};

export default function EnglishContactPage() {
  return <PageShell locale="en" translationHref="/contact/">
    <Breadcrumbs locale="en" items={[{ label: "Contact", href: "/en/contact/" }]} />
    <PageHero eyebrow="CONTACT PAYTIUM" title={<>Turn your next priority into an <em>action plan.</em></>} text="Tell us about your context, priorities and constraints. Our experts will help you clarify the next step." primary={["Send a request", "#contact-form"]} secondary={["Explore our services", "/en/services/"]}>
      <ContactRocketVisual locale="en" />
    </PageHero>
    <section className="section contact-section" id="contact-form">
      <div className="contact-intro"><Eyebrow>LET’S TALK</Eyebrow><h2>Let’s discuss your <em>next project.</em></h2><p>An initial conversation helps us understand the requirement, identify the right expertise and define concrete next steps.</p><ul>{["A conversation focused on your context", "A clear approach without unnecessary jargon", "Specialists matched to the requirement", "A pragmatic, phased roadmap"].map((item) => <li key={item}><LuCheck aria-hidden="true" />{item}</li>)}</ul><address className="contact-details"><a href={`mailto:${siteConfig.contactEmail}`}><span aria-hidden="true"><LuMail /></span><small>Email</small><b>{siteConfig.contactEmail}</b></a><a href={`tel:${siteConfig.contactPhone?.replace(/[^\d+]/g, "")}`}><span aria-hidden="true"><LuPhone /></span><small>Phone</small><b>{siteConfig.contactPhone}</b></a><div><span aria-hidden="true"><LuMapPin /></span><small>Address</small><b>{siteConfig.addressEn}</b></div><a className="linkedin-detail" href={siteConfig.linkedinUrl ?? undefined} target="_blank" rel="noreferrer"><span className="linkedin-icon" aria-hidden="true"><FaLinkedinIn /></span><small>Professional network</small><b>Follow Paytium on LinkedIn</b></a></address></div>
      <ContactForm locale="en" />
    </section>
  </PageShell>;
}
