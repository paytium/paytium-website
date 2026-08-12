import { Arrow, Eyebrow, OrbitMark } from "./Brand";
import { technologies } from "../content/site";

export function SectionHeading({ eyebrow, title, text, invert = false }: { eyebrow: string; title: React.ReactNode; text?: string; invert?: boolean }) {
  return <div className={`section-heading ${invert ? "invert" : ""}`}><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

export function TechPreview() {
  const symbols = ["{ }", "◫", "▣", "✦", "◉", "∞", "✓", "▤", "☁", "◎", "↔", "⌘"];
  return <div className="tech-preview">{technologies.map((group, index) => <article key={group.title}><span aria-hidden="true">{symbols[index % symbols.length]}</span><h3>{group.title}</h3><p>{group.items.join(" · ")}</p></article>)}</div>;
}

export function FinalCta({ eyebrow = "VOTRE PROCHAINE ÉTAPE COMMENCE ICI", title = <>Un projet de transformation <em>à concrétiser ?</em></>, text = "Échangeons sur vos priorités, vos contraintes et la meilleure manière de passer de l’idée à une solution opérationnelle.", primary = "Démarrer une conversation", secondary }: { eyebrow?: string; title?: React.ReactNode; text?: string; primary?: string; secondary?: [string, string] }) {
  return <section className="final-cta"><OrbitMark /><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p>{text}</p><div><a className="button button-primary" href="/#contact">{primary} <Arrow /></a>{secondary && <a className="button button-secondary" href={secondary[1]}>{secondary[0]}</a>}</div></section>;
}

export function PageHero({ eyebrow, title, text, primary, secondary, children }: { eyebrow: string; title: React.ReactNode; text: string; primary: [string, string]; secondary: [string, string]; children?: React.ReactNode }) {
  return <section className="page-hero"><div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p><div className="hero-actions"><a className="button button-primary" href={primary[1]}>{primary[0]} <Arrow /></a><a className="button button-secondary" href={secondary[1]}>{secondary[0]}</a></div></div><div className="page-hero-visual">{children ?? <OrbitMark />}</div></section>;
}
