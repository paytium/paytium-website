import type { Metadata } from "next";
import { Breadcrumbs, PageShell } from "../../../components/SiteShell";
import { FinalCta } from "../../../components/Sections";
import { AboutOverview } from "../../../components/HomePositioning";
import { methodsEn } from "../../../content/site-en";

export const metadata: Metadata = {
  title: "Paytium | About",
  description: "Discover Paytium, a technology consulting and digital delivery company connecting strategy, technology and execution to build, secure and scale digital solutions.",
  alternates: { canonical: "/en/about/", languages: { "fr-FR": "/about/", "en-US": "/en/about/" } },
  openGraph: {
    title: "Paytium | About",
    description: "Our mission is to turn business priorities into executable digital roadmaps, from vision to lasting team autonomy.",
    url: "/en/about/",
  },
};

export default function EnglishAboutPage() {
  return <PageShell locale="en" translationHref="/about/" activeNav="about">
    <Breadcrumbs locale="en" items={[{ label: "About", href: "/en/about/" }]} />
    <AboutOverview locale="en" page />

    <section className="section approach-section">
      <div className="approach-heading"><span className="eyebrow"><span />OUR APPROACH</span><h2><em>End-to-end</em> mastery.</h2><p>From defining the vision to building team autonomy, Paytium works across every stage of the solution lifecycle.</p></div>
      <div className="approach-grid">{methodsEn.map((step) => <article key={step.number}><span>{step.number}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </section>

    <FinalCta eyebrow="YOUR NEXT STEP STARTS HERE" title={<>A challenge to frame or a transformation <em>to accelerate?</em></>} text="Let’s discuss your priorities and shape a roadmap around your context." primary="Talk to an expert" contactHref="/en/contact/" />
  </PageShell>;
}
