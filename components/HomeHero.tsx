"use client";

import { PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { Arrow, Eyebrow } from "./Brand";

const slides = [
  {
    eyebrow: "STRATÉGIE. TECHNOLOGIE. IMPACT.",
    title: <>Faites avancer votre <em>transformation digitale.</em></>,
    text: "Paytium transforme vos enjeux métiers en produits, plateformes et services numériques utiles, fiables et évolutifs. De la stratégie à l’exécution, nos équipes vous accompagnent à chaque étape.",
    primary: ["Construire votre feuille de route", "/#contact"], secondary: ["Découvrir nos services", "/services"], visual: "trajectory",
  },
  {
    eyebrow: "FACTURATION ÉLECTRONIQUE",
    title: <>Passez à la facture digitale <em>avec clarté.</em></>,
    text: "Préparez, intégrez et industrialisez vos échanges de factures grâce à une approche sécurisée, interopérable et adaptée à vos processus finance et métier.",
    primary: ["Découvrir notre approche", "/facturation-electronique"], secondary: ["Échanger avec un expert", "/#contact"], visual: "invoice",
  },
  {
    eyebrow: "ENGINEERING. DATA. CLOUD.",
    title: <>Construisez des plateformes <em>prêtes à évoluer.</em></>,
    text: "Modernisez votre système d’information, accélérez vos mises en production et valorisez vos données avec des architectures robustes et des équipes pluridisciplinaires.",
    primary: ["Explorer nos expertises", "/services"], secondary: ["Nous contacter", "/#contact"], visual: "platform",
  },
];

function HeroVisual({ type }: { type: string }) {
  if (type === "invoice") return <div className="hero-diagram invoice-diagram"><div className="orbital-lines"/><div className="flow-node"><small>SOURCE</small><b>ERP</b></div><div className="flow-hub"><img src="/paytium-icon-white.svg" alt=""/><span>Paytium</span></div><div className="flow-node end"><small>ÉCHANGE</small><b>Partenaires</b></div><div className="status-stack"><span>✓ Contrôlée</span><span>↗ Transmise</span><span>□ Archivée</span></div></div>;
  if (type === "platform") return <div className="hero-diagram platform-diagram"><div className="orbital-lines"/><div className="platform-panel"><p>Architecture & delivery</p><div><span>Disponibilité</span><i className="signal"><b/><b/><b/><b/></i></div><div><span>Livraison</span><i className="progress"><b/></i></div><div><span>Qualité</span><i className="dots">● ● ● ●</i></div></div><div className="code-card">API<br/><b>Connected</b></div><div className="cloud-card">Cloud<br/><b>Observable</b></div></div>;
  return <div className="hero-diagram trajectory-diagram"><div className="orbital-lines"/><div className="paytium-core"><img src="/paytium-icon.svg" alt=""/></div><div className="float-label label-a">Stratégie</div><div className="float-label label-b">Produit</div><div className="float-label label-c">Data</div><div className="float-label label-d">Cloud</div><div className="trajectory-card"><small>TRAJECTOIRE</small><b>Vision → Produit → Impact</b><i><span/></i></div></div>;
}

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const reduced = useRef(false);
  const pointerStart = useRef<number | null>(null);
  const suppressClick = useRef(false);
  useEffect(() => { reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }, []);
  useEffect(() => {
    if (paused || reduced.current) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);
  const go = (next: number) => setActive((next + slides.length) % slides.length);
  const startDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStart.current = event.clientX;
    suppressClick.current = false;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return;
    const offset = event.clientX - pointerStart.current;
    if (Math.abs(offset) > 6) suppressClick.current = true;
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
    <section className={`home-hero ${dragging ? "is-dragging" : ""}`} aria-roledescription="carousel" aria-label="À la une" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} onKeyDown={(event) => { if (event.key === "ArrowLeft") go(active - 1); if (event.key === "ArrowRight") go(active + 1); }} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
      <div className="hero-slide" key={active} aria-live="polite" style={{ transform: `translateX(${dragOffset}px)` }}>
        <div className="hero-copy"><Eyebrow>{slide.eyebrow}</Eyebrow><h1>{slide.title}</h1><p>{slide.text}</p><div className="hero-actions"><a className="button button-primary" href={slide.primary[1]}>{slide.primary[0]} <Arrow /></a><a className="button button-secondary" href={slide.secondary[1]}>{slide.secondary[0]}</a></div></div>
        <HeroVisual type={slide.visual} />
      </div>
      <div className="slider-controls"><button type="button" onClick={() => go(active - 1)} aria-label="Slide précédente">←</button><div>{slides.map((item, index) => <button className={index === active ? "active" : ""} key={item.eyebrow} type="button" aria-label={`Afficher la slide ${index + 1}`} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} />)}</div><button type="button" onClick={() => go(active + 1)} aria-label="Slide suivante">→</button></div>
    </section>
  );
}
