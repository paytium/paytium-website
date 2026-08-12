export const siteConfig = {
  contactEmail: null as string | null,
  contactPhone: null as string | null,
  address: null as string | null,
  linkedinUrl: null as string | null,
  legalCompanyName: "Paytium",
  legalNoticeUrl: null as string | null,
  privacyUrl: null as string | null,
  contactEndpoint: process.env.VITE_CONTACT_ENDPOINT ?? null,
};

export const services = [
  {
    id: "consulting",
    number: "01",
    title: "Business & Technology Consulting",
    short: "Conseil & stratégie",
    summary: "Donnez une direction claire à votre transformation, de la stratégie digitale à la définition d’architectures résilientes et gouvernées.",
    tagline: "Décider avec une vision claire de la valeur, des risques et de la trajectoire.",
    description: "Nous aidons les directions métier et IT à transformer leurs priorités en une feuille de route réaliste. Le cadrage relie objectifs business, expérience utilisateur, architecture, organisation et gouvernance.",
    capabilities: ["Diagnostic de maturité digitale et technologique", "Vision cible et feuille de route", "Cadrage de programmes et business cases", "Architecture d’entreprise, solution et intégration", "Stratégie API et gouvernance des échanges", "Accompagnement au changement et gouvernance"],
    outcomes: "Priorités partagées, décisions documentées, trajectoire lisible et risques anticipés.",
  },
  {
    id: "digital-data",
    number: "02",
    title: "Digital & Data Factory",
    short: "Digital, Data & IA",
    summary: "Transformez vos idées en produits numériques et vos données en leviers de décision, du prototype à l’industrialisation.",
    tagline: "Transformer rapidement une opportunité en produit numérique utile.",
    description: "Nos équipes produit, design, développement et data travaillent ensemble pour concevoir, tester, livrer et industrialiser des expériences digitales centrées sur l’usage.",
    capabilities: ["Product discovery, recherche utilisateur et prototypage", "UX/UI design et design systems", "Applications web, mobiles et portails", "Backend, APIs et microservices", "Data platforms, pipelines, qualité et gouvernance", "Analytics, IA et automatisation", "MVP, passage à l’échelle et modernisation"],
    outcomes: "Délai de mise sur le marché réduit, adoption renforcée, données mieux exploitées et socle maintenable.",
  },
  {
    id: "engineering",
    number: "03",
    title: "Engineering & Technology",
    short: "Engineering",
    summary: "Concrétisez vos ambitions avec des squads pluridisciplinaires et une exécution maîtrisée sur tout le cycle de vie produit.",
    tagline: "Renforcer l’exécution avec des équipes responsables de la qualité de bout en bout.",
    description: "Paytium constitue des dispositifs adaptés au projet : squad produit, équipe d’intégration, expertise ciblée ou accompagnement d’une équipe existante. La qualité, la sécurité et la transmission des connaissances font partie du delivery.",
    capabilities: ["Product management et pilotage de delivery", "Organisation Agile et amélioration des pratiques", "Développement frontend, backend et mobile", "Intégration de systèmes et urbanisation", "Architecture logicielle et revues techniques", "Tests, automatisation, performance et recette", "Documentation et transfert de compétences"],
    outcomes: "Meilleure prévisibilité, qualité intégrée, dette réduite et autonomie renforcée des équipes.",
  },
  {
    id: "cloud-devops",
    number: "04",
    title: "DevOps & Cloud Engineering",
    short: "Cloud & DevOps",
    summary: "Accélérez vos livraisons et fiabilisez vos environnements grâce à l’automatisation, au cloud et à l’observabilité.",
    tagline: "Livrer plus sereinement sur une plateforme fiable, observable et sécurisée.",
    description: "Nous accompagnons la modernisation des environnements et l’industrialisation du cycle de livraison, de la stratégie cloud à l’exploitation quotidienne.",
    capabilities: ["Assessment et stratégie Move-to-Cloud", "Architecture cloud, hybride ou on-premise", "CI/CD et automatisation des déploiements", "Infrastructure as Code", "Conteneurs, Kubernetes et platform engineering", "Observabilité, SRE et continuité", "DevSecOps, secrets et optimisation des coûts"],
    outcomes: "Livraisons plus fluides, environnements reproductibles, meilleure résilience et coûts plus visibles.",
  },
];

export const methods = [
  { number: "01", title: "Cadrer", text: "Comprendre les enjeux, cartographier l’existant, prioriser les cas d’usage et définir des résultats mesurables.", deliverables: "Diagnostic · Vision cible · Feuille de route · Backlog initial" },
  { number: "02", title: "Concevoir", text: "Co-construire l’expérience, l’architecture et le modèle opérationnel avec les équipes métier et IT.", deliverables: "Parcours · Prototypes · Architecture · Plan de livraison" },
  { number: "03", title: "Construire", text: "Développer, intégrer et tester par itérations courtes avec une qualité intégrée dès le départ.", deliverables: "Produit opérationnel · APIs · Automatisation · Documentation" },
  { number: "04", title: "Faire évoluer", text: "Déployer, observer, sécuriser et améliorer la solution à partir des usages et des données réelles.", deliverables: "Mise en production · Observabilité · Transfert · Amélioration" },
];

export const technologies = [
  { title: "Web & Mobile", items: ["React", "TypeScript", "Next.js", "Angular", "Flutter", "Design systems", "Accessibilité"] },
  { title: "Backend & APIs", items: ["Java", "Spring Boot", "Node.js", "Python", "REST", "Événements", "Microservices", "API Gateway"] },
  { title: "Data & IA", items: ["PostgreSQL", "NoSQL", "Kafka", "Airflow", "Spark", "BI", "Machine learning", "IA générative"] },
  { title: "Cloud & DevOps", items: ["AWS", "Microsoft Azure", "Google Cloud", "Cloud privé", "Docker", "Kubernetes", "Terraform", "CI/CD"] },
  { title: "Sécurité & intégration", items: ["OAuth 2.0", "OpenID Connect", "Gestion des secrets", "SAST & DAST", "API management", "ESB / iPaaS", "Intégration ERP"] },
];

export const workingMethods = [
  ["Product Thinking", "Partir du problème, des utilisateurs et de la valeur attendue."],
  ["Design Thinking", "Explorer, prototyper et tester avant d’industrialiser."],
  ["Agile Delivery", "Livrer par incréments, partager les arbitrages et apprendre rapidement."],
  ["DevSecOps", "Automatiser la qualité, la sécurité et la livraison dans le cycle."],
  ["Data-driven improvement", "Utiliser les métriques d’usage, de qualité et d’exploitation pour progresser."],
  ["Co-construction & transfert", "Associer les équipes clientes et renforcer leur autonomie."],
];
