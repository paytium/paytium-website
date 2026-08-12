import { Arrow, Eyebrow, OrbitMark } from "./Brand";
import { technologies } from "../content/site";
import { LuArrowLeftRight, LuBraces, LuCircleCheckBig, LuCircleDot, LuCloud, LuCommand, LuDatabase, LuInfinity, LuLayers3, LuPanelTop, LuRows3, LuSparkles } from "react-icons/lu";

const technologyIcons = [LuBraces, LuPanelTop, LuLayers3, LuSparkles, LuDatabase, LuInfinity, LuCircleCheckBig, LuRows3, LuCloud, LuCircleDot, LuArrowLeftRight, LuCommand];

export function SectionHeading({ eyebrow, title, text, invert = false }: { eyebrow: string; title: React.ReactNode; text?: string; invert?: boolean }) {
  return <div className={`section-heading ${invert ? "invert" : ""}`}><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

export function TechPreview({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const englishTitles: Record<string, string> = { "Bases de données": "Databases", "Produit & Agilité": "Product & Agile", "Outils & Plateforme": "Tools & Platforms" };
  return <div className="tech-preview">{technologies.map((group, index) => { const Icon = technologyIcons[index % technologyIcons.length]; return <article key={group.title}><span aria-hidden="true"><Icon /></span><h3>{locale === "en" ? englishTitles[group.title] ?? group.title : group.title}</h3><p>{group.items.join(" · ")}</p></article>; })}</div>;
}

export function FinalCta({ eyebrow = "VOTRE PROCHAINE ÉTAPE COMMENCE ICI", title = <>Un projet de transformation <em>à concrétiser ?</em></>, text = "Échangeons sur vos priorités, vos contraintes et la meilleure manière de passer de l’idée à une solution opérationnelle.", primary = "Démarrer une conversation", secondary, contactHref = "/#contact" }: { eyebrow?: string; title?: React.ReactNode; text?: string; primary?: string; secondary?: [string, string]; contactHref?: string }) {
  return <section className="final-cta"><OrbitMark /><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p>{text}</p><div><a className="button button-primary" href={contactHref}>{primary} <Arrow /></a>{secondary && <a className="button button-secondary" href={secondary[1]}>{secondary[0]}</a>}</div></section>;
}

export function PageHero({ eyebrow, title, text, primary, secondary, children }: { eyebrow: string; title: React.ReactNode; text: string; primary: [string, string]; secondary: [string, string]; children?: React.ReactNode }) {
  return <section className="page-hero"><div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p><div className="hero-actions"><a className="button button-primary" href={primary[1]}>{primary[0]} <Arrow /></a><a className="button button-secondary" href={secondary[1]}>{secondary[0]}</a></div></div><div className="page-hero-visual">{children ?? <OrbitMark />}</div></section>;
}
