import type { Metadata } from "next";
import { FaMicrosoft } from "react-icons/fa6";
import { LuArrowLeft, LuArrowRight, LuCheck, LuDatabase, LuLayers3, LuPlus, LuZap } from "react-icons/lu";
import { SiOdoo, SiSage, SiSap } from "react-icons/si";
import { Breadcrumbs, PageShell } from "../../components/SiteShell";
import { Arrow, Eyebrow } from "../../components/Brand";
import { SectionHeading } from "../../components/Sections";
import { EinvoiceConsultationForm, TrackedLink } from "../../components/EinvoiceConsultationForm";

export const metadata: Metadata = {
  title: "Paytium | Facturation électronique & e-Invoice Connector",
  description: "Connectez vos ERP et applications à l’écosystème de facturation électronique avec Paytium : conseil, intégration bidirectionnelle, Connector et accompagnement CSP.",
  alternates: { canonical: "/e-invoicing/", languages: { "fr-FR": "/e-invoicing/", "en-US": "/en/e-invoicing/" } },
  openGraph: {
    title: "Paytium | Facturation électronique & e-Invoice Connector",
    description: "Conseil, intégration ERP et Paytium e-Invoice Connector pour orchestrer vos flux de facturation électronique de bout en bout.",
    url: "/e-invoicing/",
    type: "website",
    locale: "fr_FR",
    siteName: "Paytium",
    images: [{ url: "/og-einvoicing-casablanca.png", width: 1200, height: 630, alt: "Paytium — Facturation électronique et e-Invoice Connector à Casablanca" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paytium | Facturation électronique & e-Invoice Connector",
    description: "Connectez vos ERP, automatisez vos échanges et sécurisez votre trajectoire e-invoicing avec Paytium.",
    images: ["/og-einvoicing-casablanca.png"],
  },
};

const publicMarkers = [
  ["Format structuré", "UBL a été annoncé comme standard de référence. La version et le profil national seront confirmés par les spécifications officielles."],
  ["Authenticité et intégrité", "Une signature électronique qualifiée a été annoncée afin de sécuriser l’origine et l’intégrité de la facture."],
  ["Validation et traçabilité", "Le flux annoncé prévoit une validation en temps réel, des accusés et une date de réception fiable."],
  ["Déploiement progressif", "Le B2B est annoncé comme premier périmètre, avec un calendrier et des modalités à confirmer officiellement."],
];

const compliancePillars = [
  ["Processus", "Émission, réception, avoirs, validations, exceptions et rapprochements."],
  ["Données", "Qualité des référentiels, complétude, cohérence et traçabilité."],
  ["Technologie", "Intégration ERP, interopérabilité, sécurité, supervision et résilience."],
  ["Gouvernance", "Rôles, contrôles, documentation, conduite du changement et pilotage."],
];

const connectionModes = [
  ["API REST", "Intégration moderne, synchrone ou asynchrone selon les usages."],
  ["API SOAP", "Compatibilité avec les architectures et applications existantes."],
  ["SFTP / transfert sécurisé", "Échanges batch CFT ou SFTP pour les systèmes orientés fichiers."],
  ["Intégration personnalisée", "Adaptateur spécifique, middleware, ESB, événements ou contraintes propriétaires."],
];

const connectorCapabilities = [
  "Émission et réception des factures et avoirs",
  "Mapping et transformation des données",
  "Contrôles de complétude, de cohérence et règles métier",
  "Orchestration des échanges et des retours",
  "Suivi des statuts et gestion des erreurs",
  "Reprise, idempotence et traitement des doublons",
  "Synchronisation avec les ERP et applications comptables",
  "Journalisation, supervision, alertes et piste d’audit",
  "Événements de paiement selon le périmètre disponible",
  "Déploiement progressif par entité, flux, ERP ou population",
];

const offers = [
  { title: "Conseil métier & readiness", text: "Évaluer votre maturité, transformer les exigences publiques en décisions opérationnelles et construire une feuille de route réaliste.", items: ["Diagnostic métier, data, SI, sécurité et organisation", "Cartographie des flux d’émission et de réception", "Analyse d’écarts, risques et priorités", "Audit ERP, référentiels et interfaces", "Cible, feuille de route, gouvernance et conduite du changement"] },
  { title: "Paytium e-Invoice Connector", text: "Connecter vos systèmes au dispositif DGI à travers une couche bidirectionnelle, adaptable et supervisée.", items: ["Connecteurs ERP et adaptateurs spécifiques", "API, services web et échanges fichiers", "Émission, réception, statuts et exceptions", "Contrôles, transformation et orchestration", "Supervision, traçabilité et déploiement multi-entités"], featured: true },
  { title: "Plateforme pour candidats CSP", text: "Concevoir et industrialiser la plateforme, les services et les opérations nécessaires aux acteurs qui souhaitent se positionner comme CSP.", items: ["Modèle opérationnel et architecture cible", "Services d’échange, portails et supervision", "Enrôlement, traitement, traçabilité et exploitation", "Architecture sécurisée, résiliente et observable", "Environnements, transfert et accompagnement au démarrage"] },
  { title: "Accompagnement à la certification CSP", text: "Préparer les équipes, la plateforme et le dossier de preuves pour aborder le processus officiel avec méthode.", items: ["Recette fonctionnelle et technique", "Campagnes de tests et gestion des anomalies", "Qualité, sécurité, résilience et exploitation", "Préparation documentaire et dossier de preuves", "Répétitions à blanc et plans de remédiation"] },
  { title: "Pilotage, data, sécurité & change", text: "Sécuriser les dimensions transverses qui conditionnent la réussite du programme.", items: ["PMO et gouvernance du programme", "Qualité des données et référentiels", "Architecture, cybersécurité et données personnelles", "Tests, performance et continuité d’activité", "Formation, documentation et hypercare"] },
  { title: "Run, support & veille", text: "Maintenir la qualité des échanges et adapter le dispositif aux évolutions officiellement publiées.", items: ["Supervision et traitement des incidents", "Support applicatif et amélioration continue", "Suivi des versions et interfaces", "Veille réglementaire et analyse d’impact", "Optimisation des contrôles, performances et coûts"] },
];

const deployment = [
  ["Diagnostiquer", "Flux, systèmes, données, acteurs, volumes et risques."],
  ["Cadrer", "Cible, périmètre, gouvernance, responsabilités et feuille de route."],
  ["Préparer", "Qualité des données, interfaces, contrôles et environnements."],
  ["Piloter", "Un flux, une entité ou un ERP sur un périmètre contrôlé."],
  ["Industrialiser", "Automatisation, sécurité, supervision, documentation et support."],
  ["Déployer & améliorer", "Extension progressive et adaptation aux évolutions officielles."],
];

const whyPaytium = [
  "Connaissance des processus de facturation, de leurs statuts et de leurs impacts opérationnels",
  "Traduction des exigences réglementaires en architecture, données, contrôles et backlog",
  "Expertise d’intégration ERP, API, middleware, fichiers et systèmes legacy",
  "Développement de plateformes sécurisées, observables et évolutives",
  "Accompagnement de bout en bout : conseil, build, certification, déploiement et run",
];

const faq = [
  ["Quelle différence entre un PDF et une facture électronique structurée ?", "Un PDF peut être une représentation lisible d’une facture, sans offrir de données directement exploitables par les systèmes. Une facture électronique structurée contient des données normalisées qui peuvent être contrôlées, transmises et intégrées automatiquement."],
  ["Quelles caractéristiques du dispositif marocain sont déjà annoncées publiquement ?", "Les annonces publiques mentionnent notamment un format structuré fondé sur UBL, une signature électronique qualifiée, un circuit de validation en temps réel, un premier périmètre B2B et l’intervention progressive de CSP certifiés. Les versions, profils, règles détaillées, calendriers et modalités applicables restent à confirmer par les textes et spécifications officiels."],
  ["La date d’entrée en vigueur pour mon entreprise est-elle déjà connue ?", "Un lancement courant 2026 et un déploiement progressif ont été annoncés. Le calendrier précis par catégorie d’entreprise, activité ou marché doit être confirmé par les textes officiels. Paytium peut néanmoins préparer les travaux qui ne dépendent pas de ces arbitrages : cartographie, qualité des données, gouvernance et architecture évolutive."],
  ["Quel format de facture faut-il préparer ?", "UBL a été annoncé comme standard international de référence. La version, le profil marocain, les données obligatoires et les règles de contrôle doivent être alignés sur les spécifications officiellement publiées. Le Connector Paytium est conçu pour adapter les formats internes à la cible applicable."],
  ["Paytium remplace-t-il mon ERP ou mon logiciel de facturation ?", "Non. Le Paytium e-Invoice Connector se place entre vos systèmes et le canal de facturation électronique. Il préserve les usages existants et prend en charge l’intégration, la transformation, l’orchestration et les retours de statut."],
  ["Le Connector gère-t-il l’émission et la réception ?", "Oui, son positionnement est bidirectionnel : émission de factures et avoirs, réception des factures fournisseurs, gestion des accusés, statuts, notifications et erreurs, selon le périmètre et les interfaces officiellement disponibles."],
  ["Quels modes d’intégration sont disponibles ?", "API REST, services SOAP, échanges de fichiers sécurisés via CFT ou SFTP, middleware, événements ou connecteur personnalisé. Le mode est choisi selon l’architecture, les contraintes de sécurité, les volumes et les capacités du système client."],
  ["Quels ERP peuvent être connectés ?", "Paytium peut connecter des ERP, logiciels comptables, TMS et applications métier au moyen de connecteurs, d’accélérateurs ou d’adaptateurs spécifiques. La compatibilité exacte est confirmée selon le produit, sa version, ses modules et les possibilités d’intégration disponibles."],
  ["Peut-on commencer avant la publication de toutes les spécifications ?", "Oui. Il est possible d’évaluer la maturité, cartographier les flux, fiabiliser les référentiels, clarifier la gouvernance et préparer une architecture adaptable. Les choix dépendant des textes ou spécifications définitifs restent ouverts jusqu’à leur publication."],
  ["Paytium est-il un CSP certifié par la DGI ?", "Cette page ne présente pas Paytium comme CSP agréé ou certifié. Paytium accompagne les entreprises et les acteurs qui souhaitent construire une plateforme CSP et préparer leur parcours de certification, sur la base du cadre officiel applicable."],
  ["Comment Paytium accompagne-t-il un candidat CSP ?", "Paytium intervient sur le cadrage, l’architecture, le développement, les tests, la sécurité, la gouvernance des données, l’exploitation et la préparation documentaire. L’objectif est d’accélérer et de sécuriser le parcours, sans garantir une décision qui relève de l’autorité de certification."],
  ["Comment sont traitées la sécurité et la protection des données ?", "Le dispositif est défini selon le contexte du client et les exigences applicables : contrôle d’accès, chiffrement des échanges, journalisation, séparation des responsabilités, supervision, continuité d’activité et protection des données personnelles. L’architecture et l’hébergement sont validés pendant le cadrage."],
  ["Que couvre la consultation gratuite de 30 minutes ?", "Elle permet de comprendre votre contexte, identifier les principaux écarts et vous orienter vers le prochain pas le plus utile. Elle ne constitue pas un audit complet ni un avis fiscal ou juridique."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": "https://paytium.io/e-invoicing/#service", name: "Facturation électronique Maroc & Paytium e-Invoice Connector", serviceType: "Conseil et intégration de facturation électronique", provider: { "@id": "https://paytium.io/#organization" }, areaServed: { "@type": "Country", name: "Maroc" }, url: "https://paytium.io/e-invoicing/", description: metadata.description },
    { "@type": "FAQPage", "@id": "https://paytium.io/e-invoicing/#faq", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

export default function ElectronicInvoicingPage() {
  return <PageShell translationHref="/en/e-invoicing/" activeNav="e-invoicing">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <Breadcrumbs items={[{ label: "Facturation électronique", href: "/e-invoicing/" }]} sections={{ connector: "Connector", offers: "Offres", consultation: "Consultation", faq: "FAQ" }} />

    <section className="einvoice-hero">
      <div className="einvoice-hero-copy">
        <Eyebrow className="page-kicker">FACTURATION ÉLECTRONIQUE AU MAROC</Eyebrow>
        <h1>Connectez votre système de facturation à l’écosystème DGI, <em>sans bouleverser vos opérations.</em></h1>
        <p>Paytium accompagne les entreprises de l’évaluation de maturité à l’intégration opérationnelle. Le Paytium e-Invoice Connector crée une passerelle bidirectionnelle entre vos ERP, TMS, logiciels comptables et applications métier, et le système de facturation électronique de la Direction Générale des Impôts.</p>
        <p className="einvoice-proof">Conseil métier & réglementaire · Intégration ERP · Connector · Projets CSP · Accompagnement à la certification</p>
        <div className="hero-actions"><TrackedLink className="button button-primary" href="#consultation" eventName="einvoice_hero_cta_click">Réserver ma consultation gratuite de 30 min <Arrow /></TrackedLink><TrackedLink className="button button-secondary" href="#connector" eventName="einvoice_connector_cta_click">Découvrir le Connector</TrackedLink></div>
        <div className="einvoice-consultation-note"><b>Consultation offerte · 30 minutes</b><span>Un échange sans engagement pour clarifier votre périmètre, vos risques et les prochaines étapes.</span></div>
      </div>
      <figure className="einvoice-hero-media">
        <img src="/einvoicing-casablanca.jpg" alt="Architecture marocaine à Casablanca" width="2400" height="1594" fetchPriority="high" />
        <div className="einvoice-hero-badges" aria-label="Drapeau du Maroc et logo de la Direction Générale des Impôts"><img className="einvoice-hero-flag" src="/flag-morocco.png" alt="Drapeau du Maroc" width="56" height="36" /><span aria-hidden="true" /><img className="einvoice-hero-dgi" src="/logo-dgi.png" alt="Logo de la Direction Générale des Impôts" width="56" height="56" /></div>
        <figcaption>Casablanca · Photo <a href="https://unsplash.com/fr/@hansjuergen" target="_blank" rel="noopener noreferrer">Hans-Jürgen Weinhardt</a> / Unsplash</figcaption>
      </figure>
    </section>

    <section className="section einvoice-erp-section">
      <SectionHeading eyebrow="CONÇU POUR VOTRE ÉCOSYSTÈME" title={<>Votre ERP reste au cœur <em>de vos opérations.</em></>} text="Paytium s’adapte à vos systèmes existants et limite les ruptures dans les processus finance, achats et ventes. Des connecteurs ou accélérateurs d’intégration sont mobilisés selon l’ERP, sa version et les modules utilisés." />
      <div className="erp-logo-grid" aria-label="Exemples de systèmes intégrables">
        <div><SiSap aria-hidden="true" /><span>SAP</span></div><div><LuDatabase aria-hidden="true" /><span>Oracle</span></div><div><LuDatabase aria-hidden="true" /><span>Oracle NetSuite</span></div><div><FaMicrosoft aria-hidden="true" /><span>Dynamics 365</span></div><div><SiSage aria-hidden="true" /><span>Sage</span></div><div><SiOdoo aria-hidden="true" /><span>Odoo</span></div><div><LuLayers3 aria-hidden="true" /><span>Cegid</span></div><div><LuLayers3 aria-hidden="true" /><span>Infor</span></div>
      </div>
      <p className="brand-disclaimer">Marques citées à titre d’illustration. La disponibilité et le périmètre d’un connecteur sont confirmés selon la version et l’architecture du système client. Les marques appartiennent à leurs propriétaires respectifs.</p>
    </section>

    <section className="section einvoice-context-section">
      <SectionHeading invert eyebrow="LE CONTEXTE MAROCAIN" title={<>Une facture structurée, sécurisée et <em>intégrée aux systèmes.</em></>} text="La facturation électronique transforme la facture en un flux de données exploitable de bout en bout. Selon les annonces publiques de la DGI, le dispositif marocain doit permettre de contrôler, transmettre et tracer les factures B2B à travers un format structuré et des échanges sécurisés." />
      <div className="public-marker-grid">{publicMarkers.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="section einvoice-compliance-section">
      <SectionHeading eyebrow="VOTRE TRAJECTOIRE DE CONFORMITÉ" title={<>Des exigences réglementaires à <em>un dispositif opérationnel.</em></>} text="Paytium traduit les exigences officiellement applicables en processus, données, contrôles, interfaces et preuves exploitables. L’objectif : aligner votre chaîne de facturation sur le cadre technique et réglementaire de la DGI, tout en protégeant la continuité de vos opérations." />
      <div className="compliance-pillar-grid">{compliancePillars.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      <p className="responsible-note">La validation juridique et fiscale reste menée avec les fonctions compétentes du client et sur la base des textes officiels en vigueur.</p>
    </section>

    <section className="section connector-positioning" aria-labelledby="connector-positioning-title">
      <div className="connector-positioning-copy"><div><Eyebrow className="page-kicker">UNE INTEROPÉRABILITÉ BIDIRECTIONNELLE</Eyebrow><h2 id="connector-positioning-title">Paytium e-Invoice Connector : votre point d’accès à la facturation électronique DGI.</h2></div><p>Une couche d’intégration unique orchestre les échanges dans les deux sens, sans imposer le remplacement de vos outils. Elle adapte les données et protocoles au canal attendu, puis restitue factures reçues, accusés, statuts et erreurs dans vos applications.</p></div>
      <div className="connector-diagram" aria-label="Schéma fonctionnel bidirectionnel du Paytium e-Invoice Connector">
        <div className="connector-node"><small>SYSTÈMES DE L’ENTREPRISE</small><b>ERP · TMS · Comptabilité</b><span>Achats · Ventes · Applications métier · Fichiers</span></div>
        <div className="connector-flows"><span><LuArrowRight aria-hidden="true" />Flux sortants</span><span><LuArrowLeft aria-hidden="true" />Flux entrants</span></div>
        <div className="connector-node connector-core"><img src="/paytium-icon-white.svg" alt="" width="44" height="44" /><small>PAYTIUM E-INVOICE CONNECTOR</small><b>Collecter · Contrôler · Transformer</b><span>Orchestrer · Transmettre · Superviser</span></div>
        <div className="connector-flows"><span><LuArrowRight aria-hidden="true" />Factures · avoirs · données</span><span><LuArrowLeft aria-hidden="true" />Accusés · statuts · erreurs</span></div>
        <div className="connector-node"><small>ÉCOSYSTÈME DGI / CSP</small><b>Validation · Échange</b><span>Accusés · Statuts · Clients · Fournisseurs</span></div>
      </div>
    </section>

    <section className="section connector-detail" id="connector">
      <SectionHeading eyebrow="PAYTIUM E-INVOICE CONNECTOR" title={<>Une intégration transparente, <em>quel que soit votre point de départ.</em></>} text="Le Connector absorbe l’hétérogénéité de vos systèmes et centralise l’orchestration. Vos équipes continuent à travailler dans leurs outils habituels pendant que la couche Paytium gère les transformations, contrôles, transmissions et retours nécessaires au flux cible." />
      <div className="connection-mode-grid">{connectionModes.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="connector-capability-layout"><div><h3>Capacités du Connector</h3><p>Un socle d’intégration conçu pour évoluer avec votre architecture et les publications officielles.</p><div className="connector-promises"><strong>Votre ERP n’est pas remplacé.</strong><strong>Vos utilisateurs conservent leurs outils habituels.</strong><strong>L’intégration évolue avec les publications officielles.</strong></div></div><ul>{connectorCapabilities.map((item) => <li key={item}><LuCheck aria-hidden="true" />{item}</li>)}</ul></div>
      <TrackedLink className="button button-primary connector-cta" href="#consultation" eventName="einvoice_connector_cta_click">Évaluer mon architecture d’intégration <Arrow /></TrackedLink>
    </section>

    <section className="section einvoice-offers" id="offers">
      <SectionHeading invert eyebrow="DES OFFRES ADAPTÉES À VOTRE AMBITION" title={<>Du diagnostic au déploiement, <em>jusqu’au parcours CSP.</em></>} text="Un accompagnement modulaire pour préparer vos équipes, intégrer vos systèmes ou construire et sécuriser un parcours CSP." />
      <div className="einvoice-offer-grid">{offers.map((offer, index) => <article className={offer.featured ? "featured" : ""} key={offer.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{offer.title}</h3><p>{offer.text}</p><ul>{offer.items.map((item) => <li key={item}><LuCheck aria-hidden="true" />{item}</li>)}</ul>{index === 2 && <small>Objectif : accélérer et sécuriser le parcours, sans promettre un délai de certification.</small>}</article>)}</div>
    </section>

    <section className="section einvoice-deployment">
      <SectionHeading eyebrow="MÉTHODE DE DÉPLOIEMENT" title={<>Une trajectoire progressive, <em>mesurable et maîtrisée.</em></>} text="Paytium travaille aux côtés de vos équipes pour réduire les risques, préserver la continuité métier et construire leur autonomie." />
      <div className="einvoice-deployment-track">{deployment.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="section why-paytium-section">
      <div><Eyebrow className="page-kicker">POURQUOI PAYTIUM</Eyebrow><h2>Une double maîtrise <em>métier et technologique.</em></h2><p>Du cadrage à l’exploitation, nous réunissons les expertises nécessaires pour transformer une exigence complexe en dispositif utilisable, observable et durable.</p></div>
      <ol>{whyPaytium.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
    </section>

    <section className="section einvoice-consultation" id="consultation">
      <div className="consultation-copy"><Eyebrow className="page-kicker">CONSULTATION OFFERTE · 30 MINUTES</Eyebrow><h2>Où en êtes-vous dans votre préparation à la <em>facturation électronique ?</em></h2><p>Échangez avec un expert Paytium pour clarifier votre contexte, identifier les principaux écarts et choisir le prochain pas le plus utile — diagnostic, intégration du Connector, projet CSP ou préparation à la certification.</p><div className="consultation-agenda"><span><b>5 min</b>Votre contexte, vos systèmes et priorités</span><span><b>15 min</b>Risques, dépendances et options d’architecture</span><span><b>10 min</b>Recommandations initiales et prochaines étapes</span></div><div className="after-consultation"><h3>Après la consultation</h3><p><b>01 · Synthèse</b> Récapitulatif des enjeux identifiés.</p><p><b>02 · Orientation</b> Trajectoire recommandée.</p><p><b>03 · Proposition ciblée</b> Périmètre et étapes adaptés si vous souhaitez poursuivre.</p></div></div>
      <EinvoiceConsultationForm />
    </section>

    <section className="section faq-section einvoice-faq" id="faq"><div><Eyebrow>QUESTIONS FRÉQUENTES</Eyebrow><h2>Avancer avec une information <em>claire et prudente.</em></h2><p>Les réponses distinguent les annonces publiques des modalités qui restent à confirmer officiellement.</p></div><div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true"><LuPlus /></span></summary><p>{answer}</p></details>)}</div></section>

    <TrackedLink className="einvoice-mobile-cta" href="#consultation" eventName="einvoice_hero_cta_click"><LuZap aria-hidden="true" />Consultation gratuite — 30 min</TrackedLink>
  </PageShell>;
}
