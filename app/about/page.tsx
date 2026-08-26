import type { Metadata } from "next";
import { Breadcrumbs, PageShell } from "../../components/SiteShell";
import { FinalCta } from "../../components/Sections";
import { AboutOverview } from "../../components/HomePositioning";
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
    <AboutOverview page />

    <section className="section approach-section">
      <div className="approach-heading"><span className="eyebrow"><span />NOTRE APPROCHE</span><h2>Une maîtrise <em>de bout en bout.</em></h2><p>De la définition de la vision à la montée en autonomie de vos équipes, Paytium intervient à chaque étape du cycle de vie de vos solutions.</p></div>
      <div className="approach-grid">{methods.map((step) => <article key={step.number}><span>{step.number}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </section>

    <FinalCta title={<>Un enjeu à clarifier ou une transformation <em>à accélérer ?</em></>} text="Parlons de vos priorités et construisons une trajectoire adaptée à votre contexte." primary="Parler à un expert" contactHref="/contact/" />
  </PageShell>;
}
