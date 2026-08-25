import { Arrow, Eyebrow, OrbitMark } from "./Brand";
import { methods } from "../content/site";
import { methodsEn } from "../content/site-en";

type Locale = "fr" | "en";

const content = {
  fr: {
    aboutEyebrow: "À PROPOS DE PAYTIUM",
    aboutTitle: <>Un partenaire engagé dans votre <em>transformation.</em></>,
    aboutText: "Paytium est un cabinet de conseil et de delivery digital. Nous accompagnons les organisations dans la conception, la réalisation et l’évolution de leurs initiatives digitales, en reliant compréhension métier, excellence technologique et proximité opérationnelle.",
    disciplines: ["Conseil", "Design", "Squads", "Run"],
    values: [["Clarté", "Rendre les choix, les priorités et les résultats compréhensibles."], ["Engagement", "Travailler avec vos équipes et avancer avec transparence."], ["Excellence", "Privilégier qualité, sécurité, maintenabilité et progrès continu."]],
    missionEyebrow: "MISSION",
    missionTitle: <>Une promesse simple : <em>Build. Secure. Scale.</em></>,
    missionText: "Paytium transforme vos enjeux métier en trajectoires digitales exécutables. De la stratégie à l’exploitation, nous alignons décisions, architecture et delivery avec un engagement constant sur la valeur, la qualité et l’autonomie.",
    missionPillars: [
      ["01", "Build", "Nous transformons vos enjeux métier en produits digitaux et data utiles, performants et conçus pour durer."],
      ["02", "Secure", "Nous renforçons la sécurité, la fiabilité et la résilience de vos architectures, plateformes et opérations."],
      ["03", "Scale", "Nous accélérons vos projets grâce à des expertises ciblées, rapidement mobilisables et pleinement intégrées à vos équipes."],
    ],
    valueEyebrow: "PROPOSITION DE VALEUR",
    valueTitle: <>Quatre enjeux clients. <em>Une réponse intégrée.</em></>,
    propositions: [
      { number: "01", pillar: "Cadrer", challenge: "Les décisions et investissements technologiques", answer: "Business & Technology Consulting", detail: "Audit SI, due diligence, architecture et roadmaps", href: "/services/#consulting" },
      { number: "02", pillar: "Construire", challenge: "Les produits, les données et les intégrations", answer: "Digital & Data Factory", detail: "Product delivery, Data & IA, APIs et TMA", href: "/services/#digital-data" },
      { number: "03", pillar: "Accélérer", challenge: "La capacité et la performance du delivery", answer: "Squad As Service", detail: "Squads, centres de services et expertises ciblées", href: "/services/#engineering" },
      { number: "04", pillar: "Industrialiser", challenge: "La qualité, la sécurité et la résilience", answer: "DevSecOps & Cloud Engineering", detail: "Cloud, CI/CD, plateformes et observabilité", href: "/services/#cloud-devops" },
    ],
    servicesLink: "Explorer nos services",
    expertiseLink: "Découvrir nos expertises",
    approachEyebrow: "NOTRE APPROCHE",
    approachTitle: <>Une maîtrise <em>de bout en bout.</em></>,
    approachText: "De la définition de la vision à la montée en autonomie de vos équipes, nous couvrons chaque étape du cycle de vie de vos solutions.",
  },
  en: {
    aboutEyebrow: "ABOUT PAYTIUM",
    aboutTitle: <>A committed partner in your <em>transformation.</em></>,
    aboutText: "Paytium is a technology consulting and digital delivery company. We help organisations design, deliver and evolve digital initiatives by connecting business understanding, technology excellence and hands-on collaboration.",
    disciplines: ["Consulting", "Design", "Squads", "Operate"],
    values: [["Clarity", "Make choices, priorities and outcomes understandable."], ["Commitment", "Work alongside your teams and move forward transparently."], ["Excellence", "Prioritise quality, security, maintainability and continuous improvement."]],
    missionEyebrow: "MISSION",
    missionTitle: <>One simple promise : <em>Build. Secure. Scale.</em></>,
    missionText: "Paytium turns business priorities into executable digital roadmaps. From strategy through operations, we align decisions, architecture and delivery with a constant focus on value, quality and client autonomy.",
    missionPillars: [
      ["01", "Build", "We turn your business priorities into useful, high-performing digital and data products designed to last."],
      ["02", "Secure", "We strengthen the security, reliability and resilience of your architectures, platforms and operations."],
      ["03", "Scale", "We accelerate your initiatives with targeted expertise that can be mobilised quickly and fully integrated into your teams."],
    ],
    valueEyebrow: "VALUE PROPOSITION",
    valueTitle: <>Four client priorities. <em>One integrated response.</em></>,
    propositions: [
      { number: "01", pillar: "Frame", challenge: "Technology decisions and investment priorities", answer: "Business & Technology Consulting", detail: "IT assessment, due diligence, architecture and roadmaps", href: "/en/services/#consulting" },
      { number: "02", pillar: "Build", challenge: "Digital products, data and integration", answer: "Digital & Data Factory", detail: "Product delivery, Data & AI, APIs and application support", href: "/en/services/#digital-data" },
      { number: "03", pillar: "Accelerate", challenge: "Delivery capacity and performance", answer: "Squad As Service", detail: "Squads, managed delivery centres and targeted specialists", href: "/en/services/#engineering" },
      { number: "04", pillar: "Industrialise", challenge: "Quality, security and resilience", answer: "DevSecOps & Cloud Engineering", detail: "Cloud, CI/CD, platforms and observability", href: "/en/services/#cloud-devops" },
    ],
    servicesLink: "Explore our services",
    expertiseLink: "Discover our expertise",
    approachEyebrow: "OUR APPROACH",
    approachTitle: <><em>End-to-end</em> mastery.</>,
    approachText: "From defining the vision to building your teams’ autonomy, we cover every stage of your solutions’ lifecycle.",
  },
};

export function HomePositioning({ locale = "fr" }: { locale?: Locale }) {
  const copy = content[locale];
  const approach = locale === "fr" ? methods : methodsEn;
  const prefix = locale === "en" ? "/en" : "";

  return <>
    <section className="section about-section home-about" id="about">
      <div className="about-copy"><Eyebrow>{copy.aboutEyebrow}</Eyebrow><h2>{copy.aboutTitle}</h2><p>{copy.aboutText}</p></div>
      <div className="about-visual"><OrbitMark /><div className="discipline-stack">{copy.disciplines.map((item) => <span key={item}>{item}</span>)}</div></div>
      <div className="values-row">{copy.values.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="mission-panel">
        <div className="mission-statement"><Eyebrow>{copy.missionEyebrow}</Eyebrow><h2>{copy.missionTitle}</h2><p>{copy.missionText}</p></div>
        <div className="mission-pillars">{copy.missionPillars.map(([number, title, text]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className="section value-proposition" id="value-proposition">
      <Eyebrow>{copy.valueEyebrow}</Eyebrow>
      <h2>{copy.valueTitle}</h2>
      <div className="value-proposition-table">
        {copy.propositions.map((item) => <article className="value-proposition-row" key={item.number}>
          <span>{item.number}</span><h3>{item.pillar}</h3><p>{item.challenge}</p>
          <a href={item.href}><span><b>{item.answer}</b><small>{item.detail}</small></span><Arrow /></a>
        </article>)}
      </div>
      <div className="value-proposition-actions"><a className="button button-primary" href={`${prefix}/services/`}>{copy.servicesLink} <Arrow /></a><a className="button button-secondary" href={`${prefix}/services/#expertise`}>{copy.expertiseLink} <Arrow /></a></div>
    </section>

    <section className="section approach-section" id="method">
      <span className="section-anchor" id="approach" aria-hidden="true" />
      <div className="approach-heading"><Eyebrow>{copy.approachEyebrow}</Eyebrow><h2>{copy.approachTitle}</h2><p>{copy.approachText}</p></div>
      <div className="approach-grid">{approach.map((step) => <article key={step.number}><span>{step.number}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </section>
  </>;
}
