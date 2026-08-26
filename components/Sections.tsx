import { Arrow, Eyebrow, OrbitMark } from "./Brand";

export function SectionHeading({ eyebrow, title, text, invert = false }: { eyebrow: string; title: React.ReactNode; text?: string; invert?: boolean }) {
  return <div className={`section-heading ${invert ? "invert" : ""}`}><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

export function ExpertiseBand({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const message = locale === "en" ? ["DIGITAL EXPERTISE", "360°", "TO ACCELERATE YOUR TRANSFORMATION"] : ["UNE EXPERTISE", "360°", "POUR ACCÉLÉRER VOTRE TRANSFORMATION DIGITALE"];
  const groups = [0, 1];
  return <aside className="expertise-band" aria-label={message.join(" ")}><div className="expertise-band-track" aria-hidden="true">{groups.map((group) => <div className="expertise-band-group" key={group} aria-hidden={group === 1 ? true : undefined}>{Array.from({ length: 3 }, (_, index) => <div className="expertise-band-item" key={index}><img src="/paytium-icon.svg" alt="" width="46" height="46" />{message.map((part) => part === "360°" ? <b key={part}>{part}</b> : <strong key={part}>{part}</strong>)}</div>)}</div>)}</div></aside>;
}

export function FinalCta({ eyebrow = "VOTRE PROCHAINE ÉTAPE COMMENCE ICI", title = <>Un projet de transformation <em>à concrétiser ?</em></>, text = "Échangeons sur vos priorités, vos contraintes et la meilleure manière de passer de l’idée à une solution opérationnelle.", primary = "Démarrer une conversation", secondary, contactHref = "/contact/" }: { eyebrow?: string; title?: React.ReactNode; text?: string; primary?: string; secondary?: [string, string]; contactHref?: string }) {
  return <section className="final-cta"><OrbitMark /><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p>{text}</p><div><a className="button button-primary" href={contactHref}>{primary} <Arrow /></a>{secondary && <a className="button button-secondary" href={secondary[1]}>{secondary[0]}</a>}</div></section>;
}

export function PageHero({ eyebrow, title, text, primary, secondary, children, visual = true }: { eyebrow: string; title: React.ReactNode; text: string; primary: [string, string]; secondary: [string, string]; children?: React.ReactNode; visual?: boolean }) {
  return <section className={`page-hero ${visual ? "" : "page-hero-text-only"}`}><div><Eyebrow className="page-kicker">{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p><div className="hero-actions"><a className="button button-primary" href={primary[1]}>{primary[0]} <Arrow /></a><a className="button button-secondary" href={secondary[1]}>{secondary[0]}</a></div></div>{visual && <div className="page-hero-visual">{children ?? <OrbitMark />}</div>}</section>;
}
