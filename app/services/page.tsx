import type { Metadata } from "next";
import { PageShell } from "../../components/SiteShell";
import { FinalCta, PageHero, SectionHeading } from "../../components/Sections";
import { services, technologies, workingMethods } from "../../content/site";

export const metadata: Metadata = {
  title: "Services de transformation digitale",
  description: "Conseil, produits digitaux, data, engineering, cloud et DevOps : découvrez les expertises de transformation de Paytium.",
  alternates: { canonical: "/services", languages: { "fr-FR": "/services", "en-US": "/en/services" } },
};

export default function ServicesPage() {
  return <PageShell translationHref="/en/services">
    <PageHero eyebrow="EXPERTISES PAYTIUM" title={<>De la vision à l’exploitation, une expertise <em>de bout en bout.</em></>} text="Paytium mobilise conseil, produit, ingénierie, data et cloud pour concevoir des transformations cohérentes et les faire vivre dans la durée." primary={["Parler de votre projet", "/#contact"]} secondary={["Voir notre méthode", "#methodes"]}>
      <div className="expertise-visual"><span>Conseil</span><span>Produit</span><span>Engineering</span><span>Cloud</span><i /></div>
    </PageHero>

    <section className="section service-details">
      {services.map((service, index) => <article id={service.id} key={service.id} className="service-detail">
        <div className="service-index"><span>{service.number}</span><small>EXPERTISE</small></div>
        <div className="service-main"><h2>{service.title}</h2><h3>{service.tagline}</h3><p>{service.description}</p>{service.id === "academy" && <a className="text-link" href="/academy">Explorer Paytium Academy <span aria-hidden="true">↗</span></a>}<div className="outcome"><small>RÉSULTATS RECHERCHÉS</small><p>{service.outcomes}</p></div></div>
        <div className="capability-list"><small>CAPACITÉS</small>{service.capabilities.map((item, itemIndex) => <div key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</div>)}</div>
        {index < services.length - 1 && <hr />}
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
