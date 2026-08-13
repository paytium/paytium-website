import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const output = new URL("../dist-pages/", import.meta.url);
const baseUrl = "https://paytium.io";
const lastModified = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Casablanca", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const { renderPage, renderNotFound } = await import(new URL("../dist-pages-ssr/prerender.js", import.meta.url));

const routes = [
  { path: "/", lang: "fr", alternate: "/en", title: "Paytium", description: "Cabinet de conseil et de delivery digital à Casablanca : stratégie IT, Squad As Service, Data & IA, Cloud, DevOps et facturation électronique.", keywords: "Paytium, Paytium Maroc, Squad As Service Maroc, squad Agile Maroc, équipe produit externalisée, cabinet conseil IT Maroc, transformation digitale Maroc, Data IA Maroc, Cloud DevOps Maroc" },
  { path: "/en", lang: "en", alternate: "/", title: "Paytium", description: "IT consulting company in Casablanca for strategy, Squad As Service, Data & AI, Cloud, DevOps and e-invoicing.", keywords: "Paytium, Paytium Morocco, Squad As Service Morocco, Agile squad Morocco, IT consulting company Morocco, digital transformation Morocco, Data AI Morocco, Cloud DevOps Morocco" },
  { path: "/services", lang: "fr", alternate: "/en/services", title: "Paytium", description: "Paytium, cabinet de conseil IT à Casablanca : transformation digitale, Squad As Service, Data & IA, intégration ERP/API, Cloud, DevOps et DevSecOps.", keywords: "services Paytium, Squad As Service Maroc, squad Agile Maroc, équipe produit externalisée, cabinet conseil IT Maroc, transformation digitale Maroc, intégration ERP API, Data IA Maroc, Cloud DevOps Maroc, DevSecOps" },
  { path: "/en/services", lang: "en", alternate: "/services", title: "Paytium", description: "Paytium delivers IT consulting, Squad As Service, Data & AI, ERP/API integration, Cloud and DevOps from Casablanca.", keywords: "Paytium services, Squad As Service Morocco, Agile squad Morocco, product squad as a service, IT consulting company Morocco, digital transformation company Morocco, ERP API integration, Data AI Morocco, Cloud DevOps Morocco" },
  { path: "/academy", lang: "fr", alternate: "/en/academy", title: "Paytium", description: "Développez les compétences de vos équipes au Maroc avec les formations pratiques Digital, Data, IA, Cloud, DevOps et Agile de Paytium Academy.", keywords: "Paytium Academy, formation digitale Maroc, formation Data IA, formation Cloud DevOps, formation Agile Casablanca" },
  { path: "/en/academy", lang: "en", alternate: "/academy", title: "Paytium", description: "Grow your teams’ capabilities in Morocco through practical Digital, Data, AI, Cloud, DevOps and Agile training from Paytium Academy.", keywords: "Paytium Academy, digital training Morocco, Data AI training, Cloud DevOps training, Agile training Casablanca" },
  { path: "/facturation-electronique", lang: "fr", alternate: "/en/facturation-electronique", title: "Paytium", description: "Conseil et intégration e-facture au Maroc : préparation DGI, connexion ERP/API, contrôles, workflows, traçabilité et archivage avec Paytium.", keywords: "e-facture Maroc, e facture Maroc, facture électronique Maroc, facturation électronique Maroc, facturation électronique DGI, e-invoice Morocco, e-invoicing Morocco, intégrateur facturation électronique Maroc, intégration ERP facturation, Paytium" },
  { path: "/en/facturation-electronique", lang: "en", alternate: "/facturation-electronique", title: "Paytium", description: "E-invoice consulting and integration in Morocco: DGI readiness, ERP/API connections, controls, workflows, traceability and archiving with Paytium.", keywords: "e-invoice Morocco, e invoice Morocco, e-invoicing Morocco, electronic invoicing Morocco, Morocco DGI e-invoicing, e-invoicing integration company Morocco, ERP invoice integration, Paytium" },
];

const template = await readFile(new URL("index.html", output), "utf8");

function absolute(path) {
  return `${baseUrl}${path === "/" ? "/" : `${path}/`}`;
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function jsonLd(route) {
  const isEnglish = route.lang === "en";
  const organisation = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Paytium",
    alternateName: ["Paytium Maroc", "Paytium Morocco"],
    url: baseUrl,
    logo: `${baseUrl}/logo-paytium.svg`,
    email: "connect@paytium.io",
    telephone: "+212707252336",
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "connect@paytium.io", telephone: "+212707252336", availableLanguage: ["French", "English"] },
    sameAs: ["https://www.linkedin.com/company/paytium"],
    address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
    areaServed: { "@type": "Country", name: isEnglish ? "Morocco" : "Maroc" },
    knowsAbout: isEnglish
      ? ["Digital transformation", "IT consulting", "Squad As Service", "Agile product squads", "Data and artificial intelligence", "Cloud and DevOps", "E-invoice", "E-invoicing", "ERP integration"]
      : ["Transformation digitale", "Conseil IT", "Squad As Service", "Squads produit Agile", "Data et intelligence artificielle", "Cloud et DevOps", "E-facture", "Facturation électronique", "Intégration ERP"],
  };
  const graph = [
    organisation,
    { "@type": "WebSite", "@id": `${baseUrl}/#website`, url: baseUrl, name: "Paytium", alternateName: "Paytium Morocco", publisher: { "@id": `${baseUrl}/#organization` }, inLanguage: ["fr-FR", "en-US"] },
    { "@type": "WebPage", "@id": `${absolute(route.path)}#webpage`, url: absolute(route.path), name: route.title, description: route.description, isPartOf: { "@id": `${baseUrl}/#website` }, about: { "@id": `${baseUrl}/#organization` }, inLanguage: isEnglish ? "en-US" : "fr-FR" },
  ];

  if (route.path.endsWith("/services") || route.path === "/services") {
    const services = isEnglish
      ? ["IT consulting and digital strategy", "Digital products, Data and AI", "Squad As Service", "Cloud, DevOps and DevSecOps"]
      : ["Conseil IT et stratégie digitale", "Produits digitaux, Data et IA", "Squad As Service", "Cloud, DevOps et DevSecOps"];
    graph.push({ "@type": "ItemList", name: isEnglish ? "Paytium services in Morocco" : "Services Paytium au Maroc", itemListElement: services.map((name, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name, provider: { "@id": `${baseUrl}/#organization` }, areaServed: { "@type": "Country", name: isEnglish ? "Morocco" : "Maroc" } } })) });
  }

  if (route.path.includes("facturation-electronique")) {
    graph.push({ "@type": "Service", "@id": `${absolute(route.path)}#service`, name: isEnglish ? "E-invoicing readiness and integration in Morocco" : "Préparation et intégration de la facturation électronique au Maroc", serviceType: isEnglish ? "E-invoicing consulting and integration" : "Conseil et intégration en facturation électronique", provider: { "@id": `${baseUrl}/#organization` }, areaServed: { "@type": "Country", name: isEnglish ? "Morocco" : "Maroc" }, audience: { "@type": "BusinessAudience", audienceType: "Businesses and institutions" }, description: route.description });
    const faq = isEnglish
      ? [["What is the difference between a PDF invoice, an e-invoice and a structured electronic invoice?", "A PDF may be a readable representation without being a structured, machine-processable data flow. A structured electronic invoice enables automated exchange, checks and integration through the selected format and channel."], ["How should an ERP be prepared for DGI e-invoicing in Morocco?", "Preparation starts by mapping flows, data, interfaces and controls. Paytium then identifies priority ERP, accounting and integration changes while keeping the target adaptable to official publications."], ["Does Paytium provide invoicing software or integration services?", "Paytium provides consulting, scoping, architecture, integration and automation. The solution scope — platform, connectors, portal or specific components — is selected around the client’s information system and needs."], ["Can a business prepare before every final requirement is published?", "Yes. Data quality, flow mapping, governance and an adaptable architecture can be prepared while choices that depend on official legislation and specifications remain open."], ["Does Paytium guarantee tax compliance?", "Paytium designs adaptable architecture and processes. Legal, tax and regulatory validation remains coordinated with the client’s competent functions and official sources."]]
      : [["Quelle différence entre une facture PDF, une e-facture et une facture électronique structurée ?", "Un PDF peut être une représentation lisible d’une facture sans être un flux de données structuré et directement exploitable. Une facture électronique structurée permet l’échange, le contrôle et l’intégration automatisés selon le format et le canal retenus."], ["Comment préparer son ERP à la facturation électronique DGI au Maroc ?", "La préparation commence par la cartographie des flux, des données, des interfaces et des contrôles. Paytium identifie ensuite les adaptations ERP, comptables et d’intégration à prioriser, en gardant la cible adaptable aux publications officielles."], ["Paytium propose-t-il un logiciel de facturation ou un accompagnement d’intégration ?", "Paytium intervient en conseil, cadrage, architecture, intégration et automatisation. Le périmètre de solution — plateforme, connecteurs, portail ou composants spécifiques — est défini selon le système d’information et le besoin du client."], ["Peut-on préparer le projet avant la publication définitive de toutes les exigences ?", "Oui. Il est possible de fiabiliser les données, cartographier les flux, clarifier la gouvernance et préparer une architecture évolutive, tout en réservant les choix dépendant des textes et spécifications officiels."], ["Paytium garantit-il la conformité fiscale ?", "Paytium conçoit une architecture et des processus adaptables. La validation juridique, fiscale et réglementaire reste menée avec les fonctions compétentes du client et sur la base des référentiels officiels en vigueur."]];
    graph.push({ "@type": "FAQPage", mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) });
  }

  if (route.path.includes("academy")) {
    graph.push({ "@type": "EducationalOrganization", name: "Paytium Academy", url: absolute(route.path), parentOrganization: { "@id": `${baseUrl}/#organization` }, address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" } });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c");
}

for (const route of routes) {
  const routeUrl = absolute(route.path);
  const alternateUrl = absolute(route.alternate);
  const frUrl = route.lang === "fr" ? routeUrl : alternateUrl;
  const enUrl = route.lang === "en" ? routeUrl : alternateUrl;
  const locale = route.lang === "en" ? "en_US" : "fr_FR";
  const alternateLocale = route.lang === "en" ? "fr_FR" : "en_US";
  const socialImageAlt = route.lang === "en" ? "Paytium Morocco — strategy, technology and impact" : "Paytium Maroc — stratégie, technologie et impact";
  const alternateLinks = `<link rel="alternate" hreflang="fr-MA" href="${frUrl}" />\n    <link rel="alternate" hreflang="en" href="${enUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${frUrl}" />`;
  const renderedContent = renderPage(route.path);
  const html = template
    .replace(/<html lang="[^"]+">/, `<html lang="${route.lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n    <meta name="keywords" content="${route.keywords}" />\n    <meta name="geo.region" content="MA-CAS" />\n    <meta name="geo.placename" content="Casablanca" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${routeUrl}" />`)
    .replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${locale}" />`)
    .replace(/<meta property="og:locale:alternate" content="[^"]*" \/>/, `<meta property="og:locale:alternate" content="${alternateLocale}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${socialImageAlt}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/<meta name="twitter:image:alt" content="[^"]*" \/>/, `<meta name="twitter:image:alt" content="${socialImageAlt}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${routeUrl}" />`)
    .replace(/<link rel="alternate" hreflang="fr"[^>]*>\s*<link rel="alternate" hreflang="en"[^>]*>/, alternateLinks)
    .replace("</head>", `    <script type="application/ld+json">${jsonLd(route)}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderedContent}</div>`);
  const destination = route.path === "/" ? new URL("index.html", output) : new URL(`.${route.path}/index.html`, output);
  await mkdir(dirname(fileURLToPath(destination)), { recursive: true });
  await writeFile(destination, html);
}

const notFoundHtml = template
  .replace(/<title>[^<]*<\/title>/, "<title>Paytium</title>")
  .replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="La page demandée est introuvable. Retrouvez les services et expertises de Paytium depuis la page d’accueil." />')
  .replace('<div id="root"></div>', `<div id="root">${renderNotFound("fr")}</div>`);
await writeFile(new URL("404.html", output), notFoundHtml);
await writeFile(new URL(".nojekyll", output), "");
await writeFile(new URL("CNAME", output), "paytium.io\n");
await writeFile(new URL("robots.txt", output), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\nHost: paytium.io\n`);
await writeFile(new URL("sitemap.xml", output), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${routes.map((route) => {
  const routeUrl = absolute(route.path);
  const alternateUrl = absolute(route.alternate);
  const frUrl = route.lang === "fr" ? routeUrl : alternateUrl;
  const enUrl = route.lang === "en" ? routeUrl : alternateUrl;
  const priority = route.path === "/" ? "1.0" : route.path === "/en" ? "0.9" : "0.8";
  return `  <url>\n    <loc>${escapeXml(routeUrl)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n    <xhtml:link rel="alternate" hreflang="fr-MA" href="${escapeXml(frUrl)}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(frUrl)}" />\n  </url>`;
}).join("\n")}\n</urlset>\n`);
