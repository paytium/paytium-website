import type { Metadata } from "next";
import { Breadcrumbs, PageShell } from "../../components/SiteShell";
import { FinalCta, PageHero, SectionHeading } from "../../components/Sections";
import { methods } from "../../content/site";

export const metadata: Metadata = {
  title: "Paytium | À propos",
  description: "Découvrez Paytium, cabinet de conseil et de delivery digital qui relie stratégie, technologie et exécution pour construire, sécuriser et faire évoluer vos solutions.",
  alternates: { canonical: "/about/", languages: { "fr-FR": "/about/", "en-US": "/en/about/" } },
  openGraph: {
    title: "Paytium | À propos",
    description: "Notre mission : transformer vos enjeux métier en trajectoires digitales exécutables, de la vision à l’autonomie de vos équipes.",
    url: "/about/",
  },
};

export default function AboutPage() {
  return <PageShell translationHref="/en/about/" activeNav="about">
    <Breadcrumbs items={[{ label: "À propos", href: "/about/" }]} />
    <PageHero eyebrow="À PROPOS DE PAYTIUM" title={<>La stratégie, la technologie et le delivery <em>réunis.</em></>} text="Paytium accompagne les organisations qui veulent transformer une ambition métier en solutions digitales utiles, fiables et capables d’évoluer." primary={["Échanger avec Paytium", "/contact/"]} secondary={["Découvrir nos services", "/services/"]}>
      <div className="expertise-visual"><span>Build</span><span>Secure</span><span>Scale</span><span>Deliver</span><i /></div>
    </PageHero>

    <section className="section partner-intent">
      <SectionHeading eyebrow="NOTRE MISSION" title={<>Construire. Sécuriser. <em>Faire grandir.</em></>} text="Nous relions compréhension métier, excellence technologique et proximité opérationnelle pour produire des résultats concrets et renforcer durablement l’autonomie de vos équipes." />
      <div className="partner-intent-grid">
        {[
          ["Clarté", "Cadrer les choix, les priorités et les investissements avant d’engager l’exécution."],
          ["Impact", "Concevoir des produits, des données et des plateformes alignés sur la valeur attendue."],
          ["Maîtrise", "Intégrer qualité, sécurité, résilience et maintenabilité dès la conception."],
          ["Autonomie", "Transmettre les méthodes et les savoir-faire pour faire progresser vos équipes."],
        ].map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>

    <section className="section approach-section">
      <div className="approach-heading"><span className="eyebrow"><span />NOTRE APPROCHE</span><h2>Une maîtrise <em>de bout en bout.</em></h2><p>De la définition de la vision à la montée en autonomie de vos équipes, Paytium intervient à chaque étape du cycle de vie de vos solutions.</p></div>
      <div className="approach-grid">{methods.map((step) => <article key={step.number}><span>{step.number}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </section>

    <FinalCta title={<>Un enjeu à clarifier ou une transformation <em>à accélérer ?</em></>} text="Parlons de vos priorités et construisons une trajectoire adaptée à votre contexte." primary="Parler à un expert" contactHref="/contact/" />
  </PageShell>;
}
