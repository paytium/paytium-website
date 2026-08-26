"use client";

import { PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuBadgeCheck, LuBriefcaseBusiness, LuClipboardList, LuCloudCog, LuCode, LuDatabase, LuGauge, LuNetwork, LuPackageOpen, LuRefreshCw, LuShieldCheck, LuSparkles, LuTestTube, LuUsers } from "react-icons/lu";
import { Arrow, Eyebrow } from "./Brand";

const slidesFr = [
  {
    eyebrow: "DIGITAL & DATA FACTORY",
    title: <>Du cadrage au run, livrez par cycles <em>courts et maîtrisés.</em></>,
    text: "Nous cadrons vos priorités, construisons par cycles courts et livrons des incréments régulièrement. Vos retours orientent chaque étape jusqu’à la mise en service, puis la TMA, le centre de services ou le transfert de compétences.",
    primary: ["Découvrir la Digital & Data Factory", "/services/#digital-data"], secondary: ["Échanger avec un expert", "/#contact"], visual: "agile",
  },
  {
    eyebrow: "FACTURATION ÉLECTRONIQUE",
    title: <>Connectez votre SI à la DGI avec le <em>Paytium e-Invoice Connector.</em></>,
    text: "Paytium relie vos ERP et TMS à la plateforme DGI, tout en complétant la solution par le conseil, le cadrage, le pilotage, l’intégration, les tests et l’accompagnement au déploiement.",
    primary: ["Réserver ma consultation gratuite de 30 minutes", "/e-invoicing/#consultation"], secondary: ["Explorer nos offres e-invoice", "/e-invoicing/#offres"], visual: "invoice",
  },
  {
    eyebrow: "SQUAD AS SERVICE",
    title: <>Une hero squad pour couvrir toute votre <em>chaîne de transformation.</em></>,
    text: "Mobilisez une équipe engineering pluridisciplinaire et qualifiée : Product, Software Engineering, Data & IA, Cloud, DevSecOps, QA et Agilité, du junior à l’expert.",
    primary: ["Découvrir Squad As Service", "/services/#engineering"], secondary: ["Demander des profils", "/services/#engineering"], visual: "talent",
  },
];

const slidesEn = [
  { eyebrow: "DIGITAL & DATA FACTORY", title: <>From framing to run, deliver through <em>short, controlled cycles.</em></>, text: "We frame your priorities, build in short cycles and release useful increments regularly. Your feedback guides every step through go-live, followed by application support, managed services or capability transfer.", primary: ["Explore the Digital & Data Factory", "/en/services/#digital-data"], secondary: ["Talk to an expert", "/en/#contact"], visual: "agile" },
  { eyebrow: "E-INVOICING", title: <>Connect your systems to the DGI through the <em>Paytium e-Invoice Connector.</em></>, text: "Paytium connects ERP and TMS platforms to the DGI platform, complemented by advisory, scoping, programme steering, integration, testing and deployment support.", primary: ["Book my free 30-minute consultation", "/en/e-invoicing/#consultation"], secondary: ["Explore our e-invoicing offers", "/en/e-invoicing/#offres"], visual: "invoice" },
  { eyebrow: "SQUAD AS SERVICE", title: <>A hero squad spanning your entire <em>transformation chain.</em></>, text: "Mobilise a multidisciplinary, qualified engineering team across Product, Software Engineering, Data & AI, Cloud, DevSecOps, QA and Agile, from junior to expert.", primary: ["Explore Squad As Service", "/en/services/#engineering"], secondary: ["Request profiles", "/en/services/#engineering"], visual: "talent" },
];

function HeroVisual({ type, locale }: { type: string; locale: "fr" | "en" }) {
  if (type === "invoice") return <div className="hero-diagram invoice-role-diagram"><div className="einvoice-connection-map"><div className="connection-sources"><div><LuDatabase aria-hidden="true"/><b>ERP</b><small>SAP · Oracle · Odoo</small></div><div><LuBriefcaseBusiness aria-hidden="true"/><b>TMS</b><small>{locale === "fr" ? "Systèmes métier" : "Business systems"}</small></div></div><div className="connection-flow flow-in" aria-hidden="true"><i/><i/><i/></div><div className="connector-core"><img src="/paytium-icon-white.svg" alt=""/><small>PAYTIUM</small><b>e-Invoice<br/>Connector</b><span><LuShieldCheck/>API · XML · UBL</span></div><div className="connection-flow flow-out" aria-hidden="true"><i/><i/><i/></div><div className="dgi-platform"><img src="/logo-dgi.png" alt=""/><b>{locale === "fr" ? "Plateforme DGI" : "DGI platform"}</b><small>Clearance · Exchange</small></div><div className="einvoice-services"><span><LuBriefcaseBusiness/>{locale === "fr" ? "Conseil" : "Advisory"}</span><span><LuGauge/>{locale === "fr" ? "Pilotage" : "Steering"}</span><span><LuCode/>{locale === "fr" ? "Intégration" : "Integration"}</span><span><LuTestTube/>Tests</span><span><LuRefreshCw/>{locale === "fr" ? "Déploiement" : "Deployment"}</span></div></div></div>;
  if (type === "talent") return <div className="hero-diagram talent-diagram"><div className="engineering-heroes"><div className="heroes-heading"><LuSparkles aria-hidden="true"/><span><small>PAYTIUM HERO SQUAD</small><b>{locale === "fr" ? "Une équipe. Toutes les expertises." : "One team. Every capability."}</b></span></div><div className="hero-team"><div className="hero-profile hero-product"><i><LuBriefcaseBusiness/></i><b>Product</b><small>PO · UX</small></div><div className="hero-profile hero-architecture"><i><LuNetwork/></i><b>Architecture</b><small>SI · API · Solution</small></div><div className="hero-profile hero-software"><i><LuCode/></i><b>Software</b><small>Web · Mobile · API</small></div><div className="hero-profile hero-data"><i><LuDatabase/></i><b>Data & AI</b><small>Data · ML · GenAI</small></div><div className="hero-profile hero-cloud"><i><LuCloudCog/></i><b>Cloud</b><small>DevSecOps · SRE</small></div><div className="hero-profile hero-quality"><i><LuBadgeCheck/></i><b>Quality</b><small>QA · Agile</small></div></div><div className="hero-delivery-chain"><span>{locale === "fr" ? "Vision" : "Vision"}</span><i/><span>Build</span><i/><span>Secure</span><i/><span>Scale</span></div><div className="hero-seniority"><LuUsers aria-hidden="true"/><span>Junior</span><i/><span>{locale === "fr" ? "Confirmé" : "Confirmed"}</span><i/><span>Senior</span><i/><span>Expert</span></div></div></div>;
  return <div className="hero-diagram agile-delivery-diagram"><div className="agile-project-flow"><div className="agile-flow-heading"><small>DIGITAL &amp; DATA FACTORY</small><b>{locale === "fr" ? "Votre projet, livré par cycles courts." : "Your project, delivered in short cycles."}</b></div><div className="agile-flow-track" aria-hidden="true"><i/><i/><i/><i/></div><div className="agile-flow-feedback" aria-hidden="true"><span>{locale === "fr" ? "Feedback client continu" : "Continuous client feedback"}</span><i/><i/><i/></div><div className="agile-flow-stages"><div className="agile-flow-stage"><LuClipboardList aria-hidden="true"/><b>{locale === "fr" ? "Cadrage partagé" : "Shared framing"}</b><small>{locale === "fr" ? "Priorités & feuille de route" : "Priorities & roadmap"}</small></div><div className="agile-flow-stage agile-flow-cycle"><LuRefreshCw aria-hidden="true"/><b>Build &amp; Test</b><small>{locale === "fr" ? "Cycles itératifs" : "Iterative cycles"}</small></div><div className="agile-flow-stage"><LuPackageOpen aria-hidden="true"/><b>{locale === "fr" ? "Livraisons régulières" : "Regular releases"}</b><small>{locale === "fr" ? "Incréments utiles" : "Valuable increments"}</small></div><div className="agile-flow-stage"><LuUsers aria-hidden="true"/><b>{locale === "fr" ? "Run & autonomie" : "Run & autonomy"}</b><small>{locale === "fr" ? "TMA, services ou transfert" : "Support, services or transfer"}</small></div></div></div></div>;
}

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions -- The carousel surface supports drag and arrow-key navigation; equivalent native buttons remain available. */
export function HomeHero({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const slides = locale === "fr" ? slidesFr : slidesEn;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const reduced = useRef(false);
  const pointerStart = useRef<number | null>(null);
  useEffect(() => { reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }, []);
  useEffect(() => {
    if (paused || reduced.current) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);
  const go = (next: number) => setActive((next + slides.length) % slides.length);
  const startDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest("a, button, input, select, textarea, label")) return;
    pointerStart.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return;
    const offset = event.clientX - pointerStart.current;
    setDragOffset(Math.max(-180, Math.min(180, offset)));
  };
  const endDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return;
    const offset = event.clientX - pointerStart.current;
    if (Math.abs(offset) > 55) go(active + (offset < 0 ? 1 : -1));
    pointerStart.current = null;
    setDragOffset(0);
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const slide = slides[active];
  return (
    <section className={`home-hero ${dragging ? "is-dragging" : ""}`} aria-roledescription="carousel" aria-label={locale === "fr" ? "À la une" : "Featured content"} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} onKeyDown={(event) => { if (event.key === "ArrowLeft") go(active - 1); if (event.key === "ArrowRight") go(active + 1); }} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
      <div className="hero-slide" key={active} aria-live="polite" style={{ transform: `translateX(${dragOffset}px)` }}>
        <div className="hero-copy"><Eyebrow>{slide.eyebrow}</Eyebrow><h1>{slide.title}</h1><p>{slide.text}</p><div className="hero-actions"><a className="button button-primary" href={slide.primary[1]}>{slide.primary[0]} <Arrow /></a><a className="button button-secondary" href={slide.secondary[1]}>{slide.secondary[0]}</a></div></div>
        <HeroVisual type={slide.visual} locale={locale} />
      </div>
      <div className="slider-controls"><button type="button" onClick={() => go(active - 1)} aria-label={locale === "fr" ? "Slide précédente" : "Previous slide"}><LuArrowLeft aria-hidden="true" /></button><div>{slides.map((item, index) => <button className={index === active ? "active" : ""} key={item.eyebrow} type="button" aria-label={locale === "fr" ? `Afficher la slide ${index + 1}` : `Show slide ${index + 1}`} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} />)}</div><button type="button" onClick={() => go(active + 1)} aria-label={locale === "fr" ? "Slide suivante" : "Next slide"}><LuArrowRight aria-hidden="true" /></button></div>
    </section>
  );
}
