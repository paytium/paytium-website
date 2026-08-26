import type { Metadata } from "next";
import { Breadcrumbs, PageShell } from "../../../components/SiteShell";
import { FinalCta, PageHero, SectionHeading } from "../../../components/Sections";
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
    <PageHero eyebrow="ABOUT PAYTIUM" title={<>Strategy, technology and delivery, <em>connected.</em></>} text="Paytium helps organisations turn business ambition into useful, reliable digital solutions designed to evolve." primary={["Talk to Paytium", "/en/contact/"]} secondary={["Explore our services", "/en/services/"]}>
      <div className="expertise-visual"><span>Build</span><span>Secure</span><span>Scale</span><span>Deliver</span><i /></div>
    </PageHero>

    <section className="section partner-intent">
      <SectionHeading eyebrow="OUR MISSION" title={<>Build. Secure. <em>Scale.</em></>} text="We connect business insight, technology excellence and hands-on collaboration to deliver measurable outcomes and strengthen your teams’ long-term autonomy." />
      <div className="partner-intent-grid">
        {[
          ["Clarity", "Frame choices, priorities and investment decisions before execution begins."],
          ["Impact", "Design products, data and platforms around the value they need to deliver."],
          ["Control", "Embed quality, security, resilience and maintainability from the outset."],
          ["Autonomy", "Transfer methods and know-how that help your teams keep progressing."],
        ].map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>

    <section className="section approach-section">
      <div className="approach-heading"><span className="eyebrow"><span />OUR APPROACH</span><h2><em>End-to-end</em> mastery.</h2><p>From defining the vision to building team autonomy, Paytium works across every stage of the solution lifecycle.</p></div>
      <div className="approach-grid">{methodsEn.map((step) => <article key={step.number}><span>{step.number}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </section>

    <FinalCta eyebrow="YOUR NEXT STEP STARTS HERE" title={<>A challenge to frame or a transformation <em>to accelerate?</em></>} text="Let’s discuss your priorities and shape a roadmap around your context." primary="Talk to an expert" contactHref="/en/contact/" />
  </PageShell>;
}
