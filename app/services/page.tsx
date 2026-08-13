import type { Metadata } from "next";
import { Breadcrumbs, PageShell } from "../../components/SiteShell";
import { FinalCta, PageHero, SectionHeading } from "../../components/Sections";
import { services, technologies, workingMethods } from "../../content/site";

const serviceEntries = services.filter((service) => service.id !== "academy");

export const metadata: Metadata = {
  title: "Cabinet conseil IT & transformation digitale Maroc",
  description: "Paytium, cabinet de conseil IT à Casablanca : transformation digitale, développement logiciel, Data & IA, intégration ERP/API, Cloud, DevOps et DevSecOps.",
  alternates: { canonical: "/services", languages: { "fr-FR": "/services", "en-US": "/en/services" } },
};

export default function ServicesPage() {
  return <PageShell translationHref="/en/services">
    <Breadcrumbs items={[{ label: "Services", href: "/services" }]} sections={{ consulting: "Conseil & stratégie", "digital-data": "Digital, Data & IA", engineering: "Engineering", "cloud-devops": "Cloud & DevOps", methodes: "Méthodes de travail", technologies: "Technologies" }} />
    <PageHero eyebrow="EXPERTISES PAYTIUM" title={<>De la vision à l’exploitation, une expertise <em>de bout en bout.</em></>} text="Paytium mobilise conseil, produit, ingénierie, data et cloud pour concevoir des transformations cohérentes et les faire vivre dans la durée." primary={["Parler de votre projet", "/#contact"]} secondary={["Voir nos méthodes", "#methodes"]}>
      <div className="expertise-visual"><span>Conseil</span><span>Produit</span><span>Engineering</span><span>Cloud</span><i /></div>
    </PageHero>

    <section className="section seo-service-intro" aria-labelledby="expertises-maroc">
      <div><span>PAYTIUM MAROC</span><h2 id="expertises-maroc">Des expertises digitales et technologiques <em>ancrées au Maroc.</em></h2></div>
      <div><p>Depuis Casablanca, Paytium accompagne entreprises, institutions et équipes IT dans leurs programmes de transformation digitale au Maroc et à l’international. Nos consultants relient enjeux métier, architecture du système d’information et exécution technologique.</p><nav aria-label="Expertises Paytium au Maroc"><a href="#consulting">Conseil IT & stratégie digitale</a><a href="#digital-data">Produits digitaux, Data & IA</a><a href="#engineering">Software engineering</a><a href="#cloud-devops">Cloud, DevOps & DevSecOps</a></nav></div>
    </section>

    <section className="section partner-intent">
      <SectionHeading eyebrow="UN PARTENAIRE TECHNOLOGIQUE AU MAROC" title={<>L’expertise recherchée, <em>reliée à vos résultats.</em></>} text="Paytium intervient comme cabinet de conseil et partenaire d’ingénierie digitale. Nous pouvons prendre en charge une mission ciblée ou réunir une équipe pluridisciplinaire, du diagnostic à la mise en production et au run." />
      <div className="partner-intent-grid">
        {[["Conseil IT & transformation digitale", "Stratégie, audit du système d’information, architecture, feuille de route et accompagnement du changement."], ["Développement logiciel sur mesure", "Applications web et mobile, plateformes métier, modernisation, intégration ERP et API."], ["Data, IA & automatisation", "Plateformes data, BI, gouvernance, cas d’usage IA, MLOps et automatisation des processus."], ["Cloud, DevOps & DevSecOps", "Migration cloud, platform engineering, CI/CD, observabilité, fiabilité et sécurité intégrée."]].map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
      <p className="intent-note"><strong>Vous préparez aussi l’e-facture au Maroc ?</strong> Découvrez notre accompagnement en <a href="/facturation-electronique">facturation électronique, préparation DGI et intégration ERP/API</a>.</p>
    </section>

    <section className="section service-details">
      {serviceEntries.map((service, index) => <article id={service.id} key={service.id} className="service-detail">
        <div className="service-index"><span>{service.number}</span><small>EXPERTISE</small></div>
        <div className="service-main"><h2>{service.title}</h2><h3>{service.tagline}</h3><p>{service.description}</p><div className="outcome"><small>RÉSULTATS RECHERCHÉS</small><p>{service.outcomes}</p></div></div>
        <div className="capability-list"><small>CAPACITÉS</small>{service.capabilities.map((item, itemIndex) => <div key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</div>)}</div>
        {index < serviceEntries.length - 1 && <hr />}
      </article>)}
    </section>

    <section className="section working-methods" id="methodes">
      <SectionHeading eyebrow="MÉTHODES DE TRAVAIL" title={<>Des méthodes adaptées à la réalité <em>de chaque programme.</em></>} />
      <div className="method-matrix">{workingMethods.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="section technology-library" id="technologies">
      <SectionHeading eyebrow="STACK TECHNOLOGIQUE" title={<>Un écosystème moderne, ouvert <em>et composable.</em></>} text="La stack est sélectionnée selon les besoins, les standards du client et les contraintes d’exploitation. L’objectif n’est pas d’imposer un outil, mais de construire une solution cohérente, sécurisée et maintenable." />
      <div className="technology-groups">{technologies.map((group, index) => <article key={group.title}><div><span>{String(index + 1).padStart(2, "0")}</span><h3>{group.title}</h3></div><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      <p className="responsible-note">Les technologies et services sont retenus après cadrage. Leur présence ici ne constitue pas une revendication de partenariat ou de certification éditeur.</p>
    </section>

    <FinalCta title={<>Besoin de réunir plusieurs expertises autour <em>d’un même objectif ?</em></>} text="Construisons une équipe et une trajectoire adaptées à votre contexte, de l’étude initiale à la mise en production." primary="Échanger avec Paytium" />
  </PageShell>;
}
