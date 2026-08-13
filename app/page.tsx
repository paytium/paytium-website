import type { Metadata } from "next";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuCheck, LuMail, LuMapPin, LuPhone, LuPlus } from "react-icons/lu";
import { PageShell } from "../components/SiteShell";
import { HomeHero } from "../components/HomeHero";
import { ContactForm } from "../components/ContactForm";
import { Arrow, Eyebrow, OrbitMark } from "../components/Brand";
import { FinalCta, SectionHeading, TechPreview } from "../components/Sections";
import { methods, services, siteConfig } from "../content/site";

export const metadata: Metadata = {
  title: "Paytium Maroc — Conseil IT & transformation digitale",
  description: "Cabinet de conseil et d’ingénierie digitale à Casablanca : stratégie IT, logiciels sur mesure, Data & IA, Cloud, DevOps et facturation électronique.",
  alternates: { canonical: "/", languages: { "fr-FR": "/", "en-US": "/en" } },
};

const quickLinks = [
  ["Facturation électronique", "/facturation-electronique", "01"], ["Conseil & stratégie", "/services#consulting", "02"], ["Digital, Data & IA", "/services#digital-data", "03"], ["Paytium Academy", "/academy", "04"], ["Parler de votre projet", "/#contact", "05"],
];
const homeServices = services.filter((service) => service.id !== "academy");

export default function HomePage() {
  const hasContact = siteConfig.contactEmail || siteConfig.contactPhone || siteConfig.addressFr;
  return (
    <PageShell translationHref="/en">
      <HomeHero />
      <nav className="quick-links" aria-label="Accès rapides">{quickLinks.map(([label, href, number]) => <a key={label} href={href}><span>{number}</span>{label}<b><Arrow /></b></a>)}</nav>

      <section className="section value-section">
        <SectionHeading eyebrow="UNE TRAJECTOIRE DIGITALE PLUS CLAIRE" title={<>De l’ambition métier à une solution <em>qui fonctionne.</em></>} text="Paytium aide les entreprises et les institutions à transformer une ambition digitale en résultats concrets. Nous réunissons conseil, design, ingénierie logicielle, data et cloud pour simplifier les décisions, accélérer l’exécution et construire des solutions durables." />
        <div className="editorial-cards">
          {[ ["01", "Clarifier", "Aligner les priorités métier, les contraintes et la trajectoire technologique avant d’investir."], ["02", "Construire", "Concevoir et développer des produits numériques centrés sur l’usage, la qualité et la performance."], ["03", "Faire évoluer", "Industrialiser, sécuriser et améliorer continuellement les plateformes, les données et les opérations."] ].map(([n,t,p]) => <article key={t}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}
        </div>
      </section>

      <section className="section about-section" id="a-propos">
        <div className="about-copy"><Eyebrow>À PROPOS DE PAYTIUM</Eyebrow><h2>Un partenaire engagé dans votre <em>transformation.</em></h2><p>Paytium est un cabinet de conseil et d’ingénierie digitale basé à Casablanca. Nous accompagnons les organisations dans la conception, la réalisation et l’évolution de leurs initiatives digitales, avec une approche qui relie compréhension métier, excellence technologique et proximité opérationnelle.</p><blockquote>Notre mission est de rendre la technologie plus utile, plus lisible et plus performante au service des métiers, des collaborateurs et des clients.</blockquote></div>
        <div className="about-visual"><OrbitMark /><div className="discipline-stack"><span>Conseil</span><span>Design</span><span>Engineering</span><span>Run</span></div></div>
        <div className="values-row">{[["Clarté", "Rendre les choix, les priorités et les résultats compréhensibles."], ["Engagement", "Travailler avec vos équipes et avancer avec transparence."], ["Excellence", "Privilégier qualité, sécurité, maintenabilité et progrès continu."]].map(([title,text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section services-home">
        <SectionHeading eyebrow="NOS SERVICES" title={<>Nous accélérons votre <em>transformation digitale.</em></>} />
        <div className="service-grid">{homeServices.map((service) => <article className={`service-card service-${service.number}`} key={service.id}><span>{service.number}</span><h3>{service.title}</h3><p>{service.summary}</p><ul>{service.capabilities.slice(0, 5).map((item) => <li key={item}><LuPlus aria-hidden="true" />{item}</li>)}</ul><a href={"href" in service ? service.href : `/services#${service.id}`} aria-label={`Découvrir ${service.title}`}><Arrow /></a></article>)}</div>
        <a className="button button-primary section-action" href="/services">Voir tous nos services <Arrow /></a>
      </section>

      <section className="invoice-focus">
        <div className="invoice-copy"><Eyebrow>FOCUS SOLUTION</Eyebrow><h2>La facturation électronique, intégrée à votre <em>réalité métier.</em></h2><p>Paytium vous accompagne dans la digitalisation de bout en bout du cycle de facturation : préparation, contrôle, validation, transmission, suivi, rapprochement et archivage. L’objectif est de sécuriser la transition tout en préservant la continuité de vos opérations.</p><ul>{["Intégration aux ERP, systèmes comptables et applications métier", "Automatisation des contrôles et workflows de validation", "Traçabilité des échanges et suivi des statuts", "Architecture adaptable aux exigences applicables"].map((item) => <li key={item}><LuCheck aria-hidden="true" />{item}</li>)}</ul><div className="hero-actions"><a className="button button-light" href="/facturation-electronique">Explorer la solution <Arrow /></a><a className="button button-outline-light" href="/#contact">Évaluer votre préparation</a></div></div>
        <div className="invoice-visual"><div className="invoice-sheet"><small>FACTURE</small><span /><span /><span /><div><b>Contrôlée</b><b>Transmise</b><b>Archivée</b></div></div><div className="invoice-orbit"/><div className="system-tag tag-erp">ERP</div><div className="system-tag tag-data">DATA</div><div className="system-tag tag-archive">ARCHIVE</div></div>
      </section>

      <section className="section method-section" id="methode">
        <SectionHeading eyebrow="UNE MÉTHODE DE BOUT EN BOUT" title={<>Avancer vite, sans perdre <em>la maîtrise.</em></>} text="Notre méthode combine Product Thinking, Agile, DevSecOps et amélioration continue. Elle s’adapte au niveau de maturité et aux contraintes de chaque organisation." />
        <div className="method-timeline">{methods.map((method) => <article key={method.number}><span>{method.number}</span><h3>{method.title}</h3><p>{method.text}</p><small>{method.deliverables}</small></article>)}</div>
      </section>

      <section className="section tech-section">
        <SectionHeading eyebrow="TECHNOLOGIES" title={<>Une technologie choisie pour le besoin, <em>pas l’inverse.</em></>} text="Nous composons des architectures modernes, ouvertes et maintenables selon le contexte métier, le patrimoine existant, la sécurité et les objectifs d’évolution." />
        <TechPreview /><a className="text-link" href="/services#technologies">Découvrir notre stack et nos méthodes <Arrow /></a>
      </section>

      <FinalCta />

      <section className="section contact-section" id="contact">
        <div className="contact-intro"><Eyebrow>CONTACT</Eyebrow><h2>Parlons de votre <em>prochain projet.</em></h2><p>Une idée, un défi ou une transformation à accélérer ? Échangeons pour transformer votre ambition en prochaines étapes concrètes.</p><ul>{["Un échange centré sur votre contexte", "Une approche claire et sans jargon inutile", "Des expertises mobilisées selon le besoin", "Une trajectoire pragmatique et progressive"].map((item) => <li key={item}><LuCheck aria-hidden="true" />{item}</li>)}</ul>{hasContact && <address className="contact-details"><a href={`mailto:${siteConfig.contactEmail}`}><span aria-hidden="true"><LuMail /></span><small>Email</small><b>{siteConfig.contactEmail}</b></a><a href={`tel:${siteConfig.contactPhone?.replace(/[^\d+]/g, "")}`}><span aria-hidden="true"><LuPhone /></span><small>Téléphone</small><b>{siteConfig.contactPhone}</b></a><div><span aria-hidden="true"><LuMapPin /></span><small>Adresse</small><b>{siteConfig.addressFr}</b></div>{siteConfig.linkedinUrl && <a className="linkedin-detail" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer"><span className="linkedin-icon" aria-hidden="true"><FaLinkedinIn /></span><small>Réseau professionnel</small><b>Suivre Paytium sur LinkedIn</b></a>}</address>}</div>
        <ContactForm />
      </section>
    </PageShell>
  );
}
