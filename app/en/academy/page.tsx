import type { Metadata } from "next";
import { AcademyCatalog } from "../../../components/AcademyCatalog";
import { Eyebrow } from "../../../components/Brand";
import { FinalCta, PageHero, SectionHeading } from "../../../components/Sections";
import { Breadcrumbs, PageShell } from "../../../components/SiteShell";
import { servicesEn } from "../../../content/site-en";

export const metadata: Metadata = {
  title: "Paytium | Academy",
  description: "Grow your teams’ skills with Paytium Academy courses in product, software engineering, cloud, data, AI, Agile and responsible digital.",
  alternates: { canonical: "/en/academy", languages: { "fr-FR": "/academy", "en-US": "/en/academy" } },
};

const formats = [
  ["01", "Public courses", "Scheduled sessions where participants learn alongside professionals from different organisations."],
  ["02", "Private team training", "Dedicated training contextualised around your teams, challenges, tools and maturity."],
  ["03", "Tailored learning paths", "A learning path built around your capability goals, combining courses, workshops, coaching and hands-on practice."],
];
const academyOffering = servicesEn.find((service) => service.id === "academy")!;

export default function AcademyPage() {
  return <PageShell locale="en" translationHref="/academy">
    <Breadcrumbs locale="en" items={[{ label: "Academy", href: "/en/academy" }]} sections={{ catalogue: "Course catalogue" }} />
    <PageHero eyebrow="PAYTIUM ACADEMY" title={<>Skills that move from theory <em>to action.</em></>} text="Practitioner-led training that helps your teams master the technologies, methods and mindsets behind successful transformations." primary={["Explore the catalogue", "#catalogue"]} secondary={["Build a learning path", "/en/#contact"]} />
    <section className="section academy-intro"><div><Eyebrow>LEARN BY DOING</Eyebrow><h2>Training connected to <em>real-world practice.</em></h2></div><p>Our programmes combine expert-led instruction, demonstrations, exercises and real delivery cases. They support business, product, design, data, engineering, cloud and management teams, in person, remotely or in a hybrid format.</p></section>
    <section className="section academy-expertise"><SectionHeading eyebrow="OUR APPROACH" title={<>A complete offer for building <em>lasting capabilities.</em></>} text={academyOffering.description} /><div className="academy-expertise-grid"><article><small>EXPECTED OUTCOMES</small><h3>{academyOffering.tagline}</h3><p>{academyOffering.outcomes}</p></article><div className="academy-capabilities"><small>CAPABILITIES</small>{academyOffering.capabilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</div>)}</div></div></section>
    <section className="section academy-formats"><SectionHeading eyebrow="TRAINING FORMATS" title={<>The right format for <em>every capability goal.</em></>} /><div className="academy-format-grid">{formats.map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="section academy-catalog-section" id="catalogue"><SectionHeading eyebrow="CATALOGUE" title={<>Find the course that fits <em>your priorities.</em></>} text="Filter the catalogue by domain, type or format, or search directly for a topic or technology." /><AcademyCatalog locale="en" /></section>
    <FinalCta eyebrow="A SPECIFIC NEED?" title={<>Let’s build a custom learning journey <em>for your teams.</em></>} text="Tell us about your goals, target profiles and constraints. We will suggest a suitable learning approach." primary="Talk to Paytium Academy" contactHref="/en/#contact" />
  </PageShell>;
}
