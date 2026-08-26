"use client";

import { PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuBadgeCheck, LuBriefcaseBusiness, LuCloudCog, LuCode, LuDatabase, LuFileCode2, LuGauge, LuRefreshCw, LuShieldCheck, LuUsers } from "react-icons/lu";
import { Arrow, Eyebrow } from "./Brand";

const slidesFr = [
  {
    eyebrow: "DIGITAL & DATA FACTORY",
    title: <>De l’idée au produit, avancez par cycles <em>courts et maîtrisés.</em></>,
    text: "Nos équipes hybrides cadrent, conçoivent et livrent par incréments, avec votre implication à chaque sprint. Après la mise en production, choisissez la TMA, un centre de services ou le transfert de compétences.",
    primary: ["Découvrir la Digital & Data Factory", "/services/#digital-data"], secondary: ["Échanger avec un expert", "/#contact"], visual: "agile",
  },
  {
    eyebrow: "FACTURATION ÉLECTRONIQUE",
    title: <>Le bon rôle Paytium à chaque étape de votre <em>trajectoire e-invoice.</em></>,
    text: "Conseil, cadrage, pilotage, intégration, Connector et exploitation : composez l’accompagnement adapté à votre maturité, à votre SI et à vos priorités réglementaires.",
    primary: ["Réserver ma consultation gratuite de 30 minutes", "/e-invoicing/#consultation"], secondary: ["Explorer nos offres e-invoice", "/e-invoicing/#offres"], visual: "invoice",
  },
  {
    eyebrow: "SQUAD AS SERVICE",
    title: <>Mobilisez les bons profils, du junior à <em>l’expert.</em></>,
    text: "Accédez à un vivier technique riche et qualifié sur toute la chaîne du delivery digital : produit, UX, engineering, Data & IA, Cloud, DevSecOps, QA et Agilité.",
    primary: ["Découvrir Squad As Service", "/services/#engineering"], secondary: ["Demander des profils", "/services/#engineering"], visual: "talent",
  },
];

const slidesEn = [
  { eyebrow: "DIGITAL & DATA FACTORY", title: <>Move from idea to product through <em>short, controlled cycles.</em></>, text: "Our hybrid teams frame, design and deliver in increments, involving your teams in every sprint. After go-live, choose application support, a managed service centre or capability transfer.", primary: ["Explore the Digital & Data Factory", "/en/services/#digital-data"], secondary: ["Talk to an expert", "/en/#contact"], visual: "agile" },
  { eyebrow: "E-INVOICING", title: <>The right Paytium role at every stage of your <em>e-invoicing journey.</em></>, text: "Advisory, scoping, programme steering, integration, Connector and operations: build the support model that fits your maturity, systems and regulatory priorities.", primary: ["Book my free 30-minute consultation", "/en/e-invoicing/#consultation"], secondary: ["Explore our e-invoicing offers", "/en/e-invoicing/#offres"], visual: "invoice" },
  { eyebrow: "SQUAD AS SERVICE", title: <>Mobilise the right talent, from junior to <em>expert.</em></>, text: "Tap into a rich, qualified technical talent pool spanning the entire digital delivery chain: product, UX, engineering, Data & AI, Cloud, DevSecOps, QA and Agile.", primary: ["Explore Squad As Service", "/en/services/#engineering"], secondary: ["Request profiles", "/en/services/#engineering"], visual: "talent" },
];

function HeroVisual({ type, locale }: { type: string; locale: "fr" | "en" }) {
  if (type === "invoice") return <div className="hero-diagram invoice-role-diagram"><div className="einvoice-role-poster"><div className="role-poster-heading"><LuFileCode2 aria-hidden="true"/><span><small>E-INVOICE</small><b>{locale === "fr" ? "Un partenaire, plusieurs rôles" : "One partner, multiple roles"}</b></span></div><div className="role-poster-core"><img src="/paytium-icon-white.svg" alt=""/><span>PAYTIUM</span></div><div className="role-orbit" aria-hidden="true"/><div className="role-chip role-advisory"><LuBriefcaseBusiness aria-hidden="true"/><span>{locale === "fr" ? "Conseil" : "Advisory"}</span></div><div className="role-chip role-steering"><LuGauge aria-hidden="true"/><span>{locale === "fr" ? "Pilotage" : "Steering"}</span></div><div className="role-chip role-integration"><LuCode aria-hidden="true"/><span>{locale === "fr" ? "Intégration" : "Integration"}</span></div><div className="role-chip role-connector"><LuRefreshCw aria-hidden="true"/><span>Connector</span></div><div className="role-chip role-secure"><LuShieldCheck aria-hidden="true"/><span>{locale === "fr" ? "Sécurisation" : "Security"}</span></div></div></div>;
  if (type === "talent") return <div className="hero-diagram talent-diagram"><div className="talent-spectrum"><div className="talent-heading"><LuUsers aria-hidden="true"/><span><small>{locale === "fr" ? "VIVIER TECHNIQUE" : "TECH TALENT POOL"}</small><b>{locale === "fr" ? "Toute la chaîne du delivery" : "The full delivery chain"}</b></span></div><div className="talent-capabilities"><span><LuBriefcaseBusiness/>Product</span><span><LuCode/>Engineering</span><span><LuDatabase/>Data & IA</span><span><LuCloudCog/>Cloud</span><span><LuShieldCheck/>DevSecOps</span></div><div className="talent-levels"><div className="talent-level junior"><b>Junior</b><small>&lt; 2 {locale === "fr" ? "ans" : "years"}</small></div><div className="talent-level confirmed"><b>{locale === "fr" ? "Confirmé" : "Confirmed"}</b><small>&lt; 5 {locale === "fr" ? "ans" : "years"}</small></div><div className="talent-level senior"><b>Senior</b><small>&lt; 10 {locale === "fr" ? "ans" : "years"}</small></div><div className="talent-level expert"><b>Expert</b><small>10+ {locale === "fr" ? "ans" : "years"}</small></div></div><div className="talent-assurance"><LuBadgeCheck aria-hidden="true"/>{locale === "fr" ? "Profils qualifiés · mobilisation rapide" : "Qualified profiles · rapid mobilisation"}</div></div></div>;
  return <div className="hero-diagram agile-delivery-diagram"><div className="agile-loop" aria-hidden="true"><span/><span/><span/></div><div className="agile-core"><img src="/paytium-icon-white.svg" alt=""/><small>SPRINT</small><b>BUILD</b></div><div className="agile-stage agile-scope"><small>01</small><b>{locale === "fr" ? "Cadrage" : "Frame"}</b><span>Vision · Backlog</span></div><div className="agile-stage agile-build"><small>02</small><b>Build / Dev</b><span>{locale === "fr" ? "Sprints itératifs" : "Iterative sprints"}</span></div><div className="agile-stage agile-release"><small>03</small><b>Release</b><span>Test · Deploy</span></div><div className="agile-stage agile-run"><small>04A</small><b>{locale === "fr" ? "TMA / Centre" : "Support / Centre"}</b><span>{locale === "fr" ? "Évolution continue" : "Continuous evolution"}</span></div><div className="agile-stage agile-transfer"><small>04B</small><b>{locale === "fr" ? "Transfert" : "Transfer"}</b><span>{locale === "fr" ? "Autonomie client" : "Client autonomy"}</span></div><div className="agile-feedback"><LuRefreshCw aria-hidden="true"/>{locale === "fr" ? "Feedback & amélioration continue" : "Feedback & continuous improvement"}</div></div>;
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
