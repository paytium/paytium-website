import type { Metadata } from "next";
import { AcademyCatalog } from "../../components/AcademyCatalog";
import { Eyebrow } from "../../components/Brand";
import { FinalCta, PageHero, SectionHeading } from "../../components/Sections";
import { Breadcrumbs, PageShell } from "../../components/SiteShell";
import { services } from "../../content/site";

export const metadata: Metadata = {
  title: "Paytium | Academy",
  description: "Développez les compétences de vos équipes avec les formations Paytium Academy : produit, software engineering, cloud, data, IA, Agile et numérique responsable.",
  alternates: { canonical: "/academy/", languages: { "fr-FR": "/academy/", "en-US": "/en/academy/" } },
};

const formats = [
  ["01", "Inter-entreprises", "Des sessions planifiées pour apprendre aux côtés de professionnels issus d’organisations différentes."],
  ["02", "Intra-entreprise", "Une formation réservée à vos équipes, contextualisée avec vos enjeux, vos outils et votre niveau de maturité."],
  ["03", "Sur mesure", "Un parcours conçu à partir de vos objectifs, combinant modules, ateliers, coaching et mise en pratique."],
];
const academyOffering = services.find((service) => service.id === "academy")!;

export default function AcademyPage() {
  const structuredData = { "@context": "https://schema.org", "@type": "ItemList", name: "Catalogue Paytium Academy", numberOfItems: 28, itemListOrder: "https://schema.org/ItemListUnordered" };
  return <PageShell translationHref="/en/academy/">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <Breadcrumbs items={[{ label: "Academy", href: "/academy" }]} sections={{ catalog: "Catalogue des formations" }} />
    <PageHero eyebrow="PAYTIUM ACADEMY" title={<>Des compétences qui passent de la théorie <em>à l’action.</em></>} text="Des formations conçues et animées par des praticiens pour aider vos équipes à maîtriser les technologies, les méthodes et les postures qui font réussir les transformations." primary={["Explorer le catalogue", "#catalog"]} secondary={["Construire un parcours", "/#contact"]} />
    <section className="section academy-intro"><div><Eyebrow>APPRENDRE PAR LA PRATIQUE</Eyebrow><h2>Des formations connectées à <em>la réalité du terrain.</em></h2></div><p>Nos programmes alternent apports ciblés, démonstrations, exercices et cas concrets. Ils s’adressent aux équipes métier, produit, design, data, engineering, cloud et management, en présentiel, à distance ou en format hybride.</p></section>
    <section className="section academy-expertise"><SectionHeading eyebrow="NOTRE APPROCHE" title={<>Une offre complète pour développer <em>des compétences durables.</em></>} text={academyOffering.description} /><div className="academy-expertise-grid"><article><small>RÉSULTATS RECHERCHÉS</small><h3>{academyOffering.tagline}</h3><p>{academyOffering.outcomes}</p></article><div className="academy-capabilities"><small>CAPACITÉS</small>{academyOffering.capabilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</div>)}</div></div></section>
    <section className="section academy-formats"><SectionHeading eyebrow="FORMATS DE FORMATION" title={<>Le bon dispositif pour <em>chaque ambition.</em></>} /><div className="academy-format-grid">{formats.map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="section academy-catalog-section" id="catalog"><SectionHeading eyebrow="CATALOGUE" title={<>Trouvez la formation adaptée à <em>vos priorités.</em></>} text="Filtrez le catalogue par domaine, type ou format, ou recherchez directement un sujet ou une technologie." /><AcademyCatalog /></section>
    <FinalCta eyebrow="UN BESOIN SPÉCIFIQUE ?" title={<>Construisons votre parcours de montée en compétences <em>sur mesure.</em></>} text="Partagez-nous vos objectifs, les profils concernés et vos contraintes. Nous vous proposerons un dispositif pédagogique adapté." primary="Parler à Paytium Academy" />
  </PageShell>;
}
