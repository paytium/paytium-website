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
    <PageHero eyebrow="À PROPOS DE PAYTIUM" title={<>Une promesse simple : <em>Build. Secure. Scale.</em></>} text="Paytium transforme vos enjeux métier en trajectoires digitales exécutables. De la stratégie à l’exploitation, nous alignons décisions, architecture et delivery avec un engagement constant sur la valeur, la qualité et l’autonomie." primary={["Échanger avec Paytium", "/contact/"]} secondary={["Découvrir nos services", "/services/"]}>
      <div className="expertise-visual"><span>Build</span><span>Secure</span><span>Scale</span><i /></div>
    </PageHero>

    <section className="section partner-intent">
      <SectionHeading eyebrow="NOS VALEURS" title={<>Clarté. Engagement. <em>Excellence.</em></>} text="Trois principes guident notre manière de conseiller, de construire et de collaborer avec vos équipes." />
      <div className="values-row">
        {[
          ["Clarté", "Rendre les choix, les priorités et les résultats compréhensibles."],
          ["Engagement", "Travailler avec vos équipes et avancer avec transparence."],
          ["Excellence", "Privilégier qualité, sécurité, maintenabilité et progrès continu."],
        ].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>

    <section className="section approach-section">
      <div className="approach-heading"><span className="eyebrow"><span />NOTRE APPROCHE</span><h2>Une maîtrise <em>de bout en bout.</em></h2><p>De la définition de la vision à la montée en autonomie de vos équipes, Paytium intervient à chaque étape du cycle de vie de vos solutions.</p></div>
      <div className="approach-grid">{methods.map((step) => <article key={step.number}><span>{step.number}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </section>

    <FinalCta title={<>Un enjeu à clarifier ou une transformation <em>à accélérer ?</em></>} text="Parlons de vos priorités et construisons une trajectoire adaptée à votre contexte." primary="Parler à un expert" contactHref="/contact/" />
  </PageShell>;
}
