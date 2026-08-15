import type { Metadata } from "next";
import { Breadcrumbs, PageShell } from "../../components/SiteShell";
import { FinalCta, PageHero, SectionHeading } from "../../components/Sections";
import { ProfileRequestModal } from "../../components/ProfileRequestModal";
import { services, technologies, workingMethods } from "../../content/site";

const serviceEntries = services.filter((service) => service.id !== "academy");

export const metadata: Metadata = {
  title: "Paytium | Services",
  description: "Paytium, cabinet de conseil IT à Casablanca : transformation digitale, Squad As Service, Data & IA, intégration ERP/API, Cloud, DevOps et DevSecOps.",
  alternates: { canonical: "/services", languages: { "fr-FR": "/services", "en-US": "/en/services" } },
};

export default function ServicesPage() {
  return <PageShell translationHref="/en/services">
    <Breadcrumbs items={[{ label: "Services", href: "/services" }]} sections={{ consulting: "Business & Technology Consulting", "digital-data": "Digital & Data Factory", engineering: "Squad As Service", "cloud-devops": "DevSecOps & Cloud Engineering", methods: "Méthodes de travail", expertise: "Nos expertises", technologies: "Nos expertises" }} />
    <PageHero eyebrow="EXPERTISES PAYTIUM" title={<>De la vision à l’exploitation, une expertise <em>de bout en bout.</em></>} text="Paytium mobilise conseil, produit, Squad As Service, data et cloud pour concevoir des transformations cohérentes et les faire vivre dans la durée." primary={["Parler de votre projet", "/#contact"]} secondary={["Voir nos méthodes", "#methods"]}>
      <div className="expertise-visual"><span>Conseil</span><span>Produit</span><span>Squads</span><span>Cloud</span><i /></div>
    </PageHero>

    <section className="section partner-intent">
      <SectionHeading eyebrow="UN PARTENAIRE TECHNOLOGIQUE" title={<>Des expertises digitales et technologiques <em>pensées pour vos enjeux.</em></>} text="Paytium accompagne entreprises, institutions et équipes IT dans leurs programmes de transformation digitale. Nos consultants relient enjeux métier, architecture du système d’information et exécution technologique, à travers une mission ciblée ou une Squad As Service pluridisciplinaire, de la discovery à l’amélioration continue." />
      <div className="partner-intent-grid">
        {[["Business & Technology Consulting", "Stratégie, audit du système d’information, architecture, feuille de route et accompagnement du changement."], ["Digital & Data Factory", "Produits digitaux, plateformes data, BI, gouvernance, cas d’usage IA et automatisation des processus."], ["Squad As Service", "Squads produit pluridisciplinaires, capacité flexible, pratiques Agile et responsabilité de bout en bout sur le delivery."], ["DevSecOps & Cloud Engineering", "Migration cloud, platform engineering, CI/CD, observabilité, fiabilité et sécurité intégrée."]].map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
      <p className="intent-note"><strong>Vous préparez aussi votre transition vers l’e-facture ?</strong> Découvrez notre accompagnement en <a href="/e-invoicing">facturation électronique, préparation DGI et intégration ERP/API</a>.</p>
    </section>

    <section className="section service-details">
      {serviceEntries.map((service, index) => <article id={service.id} key={service.id} className="service-detail">
        <div className="service-index"><span>{service.number}</span><small>EXPERTISE</small></div>
        <div className="service-main"><h2>{service.title}</h2><h3>{service.tagline}</h3><p>{service.description}</p><div className="outcome"><small>RÉSULTATS RECHERCHÉS</small><p>{service.outcomes}</p></div>{service.id === "engineering" && <ProfileRequestModal />}</div>
        <div className="capability-list"><small>CAPACITÉS</small>{service.capabilities.map((item, itemIndex) => <div key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</div>)}</div>
        {index < serviceEntries.length - 1 && <hr />}
      </article>)}
    </section>

    <section className="section working-methods" id="methods">
      <SectionHeading eyebrow="MÉTHODES DE TRAVAIL" title={<>Des méthodes adaptées à la réalité <em>de chaque programme.</em></>} />
      <div className="method-matrix">{workingMethods.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="section technology-library" id="expertise">
      <span className="section-anchor" id="technologies" aria-hidden="true" />
      <SectionHeading eyebrow="NOS EXPERTISES" title={<>Stack technologique et <em>domaines de maîtrise.</em></>} text="Nos expertises couvrent l’ensemble de la chaîne de valeur digitale : conseil, software engineering, Data & IA, Cloud, DevSecOps, cybersécurité, intégration et delivery produit. Nous composons chaque stack selon votre contexte, vos standards et vos contraintes d’exploitation." />
      <div className="technology-groups">{technologies.map((group, index) => <article key={group.title}><div><span>{String(index + 1).padStart(2, "0")}</span><h3>{group.title}</h3></div><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      <p className="responsible-note">Les technologies et services sont retenus après cadrage. Leur présence ici ne constitue pas une revendication de partenariat ou de certification éditeur.</p>
    </section>

    <FinalCta title={<>Besoin de réunir plusieurs expertises autour <em>d’un même objectif ?</em></>} text="Construisons une équipe et une trajectoire adaptées à votre contexte, de l’étude initiale à la mise en production." primary="Échanger avec Paytium" />
  </PageShell>;
}
