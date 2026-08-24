import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const output = new URL("../dist-pages/", import.meta.url);
const baseUrl = "https://paytium.io";
const lastModified = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Casablanca", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const { renderPage, renderNotFound } = await import(new URL("../dist-pages-ssr/prerender.js", import.meta.url));

const routes = [
  { path: "/", lang: "fr", alternate: "/en", title: "Paytium | Conseil & technologie", breadcrumb: "Accueil", description: "Paytium est un cabinet de conseil et de delivery digital : stratégie IT, Squad As Service, Data & IA, Cloud, DevOps et facturation électronique.", keywords: "Paytium, Squad As Service, squad Agile, équipe produit externalisée, cabinet conseil IT, transformation digitale, Data IA, Cloud DevOps" },
  { path: "/en", lang: "en", alternate: "/", title: "Paytium | Consulting & Technology", breadcrumb: "Home", description: "Paytium provides technology consulting, digital product delivery, Squad As Service, Data & AI, DevSecOps, cloud engineering and e-invoicing integration.", keywords: "Paytium, Squad As Service, Agile squad, technology consulting company, digital transformation, digital product delivery, Data AI, DevSecOps, cloud engineering" },
  { path: "/services", lang: "fr", alternate: "/en/services", title: "Paytium | Services", breadcrumb: "Services", description: "Paytium, cabinet de conseil IT : transformation digitale, Squad As Service, Data & IA, intégration ERP/API, Cloud, DevOps et DevSecOps.", keywords: "services Paytium, Squad As Service, squad Agile, équipe produit externalisée, cabinet conseil IT, transformation digitale, intégration ERP API, Data IA, Cloud DevOps, DevSecOps" },
  { path: "/en/services", lang: "en", alternate: "/services", title: "Paytium | Services", breadcrumb: "Services", description: "Paytium provides technology consulting, Digital & Data Factory delivery, Squad As Service, API integration and DevSecOps & Cloud Engineering.", keywords: "Paytium services, Squad As Service, Agile squad, product squad as a service, technology consulting company, digital transformation company, ERP API integration, Data AI, DevSecOps cloud engineering" },
  { path: "/academy", lang: "fr", alternate: "/en/academy", title: "Paytium | Academy", breadcrumb: "Academy", description: "Développez les compétences de vos équipes avec les formations pratiques Digital, Data, IA, Cloud, DevOps et Agile de Paytium Academy.", keywords: "Paytium Academy, formation digitale, formation Data IA, formation Cloud DevOps, formation Agile" },
  { path: "/en/academy", lang: "en", alternate: "/academy", title: "Paytium | Academy", breadcrumb: "Academy", description: "Build practical capabilities through practitioner-led training in digital product delivery, software engineering, Data & AI, cloud, DevSecOps and Agile.", keywords: "Paytium Academy, digital product training, software engineering training, Data AI training, cloud DevSecOps training, Agile delivery training" },
  { path: "/e-invoicing", lang: "fr", alternate: "/en/e-invoicing", title: "Paytium | Facturation électronique & e-Invoice Connector", breadcrumb: "Facturation électronique", description: "Connectez vos ERP et applications à l’écosystème de facturation électronique avec Paytium : conseil, intégration bidirectionnelle, Connector et accompagnement CSP.", keywords: "e-facture Maroc, facture électronique Maroc, facturation électronique DGI, e-invoice Morocco, e-invoicing Morocco, Connector DGI, intégration ERP facturation, CSP facturation électronique, Paytium", socialImage: "/og-einvoicing-casablanca.png", socialImageAlt: "Paytium — Facturation électronique et e-Invoice Connector à Casablanca" },
  { path: "/en/e-invoicing", lang: "en", alternate: "/e-invoicing", title: "Paytium | E-Invoicing & DGI Connector", breadcrumb: "E-invoicing", description: "Connect ERP and business applications to the e-invoicing ecosystem with Paytium: advisory, bidirectional integration, e-Invoice Connector and CSP support.", keywords: "e-invoice, e invoice, e-invoicing, electronic invoicing, DGI e-invoicing, e-invoicing integration company, ERP invoice integration, Paytium", socialImage: "/og-einvoicing-casablanca.png", socialImageAlt: "Paytium — E-invoicing and e-Invoice Connector in Casablanca" },
  { path: "/case-studies", lang: "fr", alternate: "/en/case-studies", title: "Paytium | Études de cas Fintech, Paiements et Digital Banking", breadcrumb: "Études de cas", description: "Découvrez comment Paytium transforme des enjeux complexes de facturation électronique, paiements, banque digitale, interopérabilité et due diligence technique en décisions et plateformes créatrices de valeur.", keywords: "études de cas Paytium, due diligence technique, audit plateforme digitale, fintech, paiements, transaction banking, cash management, host-to-host, ISO 20022, banque digitale, crédit digital, API Gateway, facturation électronique", socialImage: null },
  { path: "/en/case-studies", lang: "en", alternate: "/case-studies", title: "Paytium | Fintech, Payments & Digital Banking Case Studies", breadcrumb: "Case studies", description: "See how Paytium turns complex e-invoicing, payments, digital banking, interoperability and technical due diligence challenges into confident decisions and platforms that deliver measurable value.", keywords: "Paytium case studies, technical due diligence, digital platform audit, fintech, payments, transaction banking, cash management, host-to-host, ISO 20022, digital banking, digital lending, Point of Sale POS, API Gateway, e-invoicing", socialImage: null },
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
    alternateName: "paytium.io",
    url: `${baseUrl}/`,
    logo: `${baseUrl}/apple-touch-icon.png`,
    image: `${baseUrl}/og-paytium.png`,
    email: "connect@paytium.io",
    telephone: "+212707252336",
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "connect@paytium.io", telephone: "+212707252336", availableLanguage: ["French", "English"] },
    sameAs: ["https://www.linkedin.com/company/paytium"],
    address: { "@type": "PostalAddress", addressLocality: "Casablanca" },
    areaServed: "International",
    knowsAbout: isEnglish
      ? ["Digital transformation", "Business & Technology Consulting", "Digital & Data Factory", "Squad As Service", "DevSecOps & Cloud Engineering", "E-invoice", "E-invoicing", "ERP integration"]
      : ["Transformation digitale", "Business & Technology Consulting", "Digital & Data Factory", "Squad As Service", "DevSecOps & Cloud Engineering", "E-facture", "Facturation électronique", "Intégration ERP"],
  };
  const breadcrumbId = `${absolute(route.path)}#breadcrumb`;
  const webPage = { "@type": "WebPage", "@id": `${absolute(route.path)}#webpage`, url: absolute(route.path), name: route.title, description: route.description, isPartOf: { "@id": `${baseUrl}/#website` }, about: { "@id": `${baseUrl}/#organization` }, inLanguage: isEnglish ? "en-US" : "fr-FR" };
  const graph = [
    organisation,
    { "@type": "WebSite", "@id": `${baseUrl}/#website`, url: `${baseUrl}/`, name: "Paytium", alternateName: "paytium.io", publisher: { "@id": `${baseUrl}/#organization` }, inLanguage: ["fr-FR", "en-US"] },
    webPage,
  ];

  if (route.path !== "/" && route.path !== "/en") {
    webPage.breadcrumb = { "@id": breadcrumbId };
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isEnglish ? "Home" : "Accueil", item: absolute(isEnglish ? "/en" : "/") },
        { "@type": "ListItem", position: 2, name: route.breadcrumb, item: absolute(route.path) },
      ],
    });
  }

  if (route.path.endsWith("/services") || route.path === "/services") {
    const services = ["Business & Technology Consulting", "Digital & Data Factory", "Squad As Service", "DevSecOps & Cloud Engineering"];
    graph.push({ "@type": "ItemList", name: "Paytium services", itemListElement: services.map((name, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name, provider: { "@id": `${baseUrl}/#organization` }, areaServed: "International" } })) });
  }

  if (route.path.includes("e-invoicing")) {
    graph.push({ "@type": "Service", "@id": `${absolute(route.path)}#service`, name: isEnglish ? "E-invoicing readiness and integration" : "Préparation et intégration de la facturation électronique", serviceType: isEnglish ? "E-invoicing consulting and integration" : "Conseil et intégration en facturation électronique", provider: { "@id": `${baseUrl}/#organization` }, areaServed: "International", audience: { "@type": "BusinessAudience", audienceType: "Businesses and institutions" }, description: route.description });
    const faq = isEnglish
      ? [["What is the difference between a PDF invoice, an e-invoice and a structured electronic invoice?", "A PDF may be a readable representation without being a structured, machine-processable data flow. A structured electronic invoice enables automated exchange, checks and integration through the selected format and channel."], ["How should an ERP be prepared for DGI e-invoicing?", "Preparation starts by mapping flows, data, interfaces and controls. Paytium then identifies priority ERP, accounting and integration changes while keeping the target adaptable to official publications."], ["Does Paytium provide invoicing software or integration services?", "Paytium provides consulting, scoping, architecture, integration and automation. The solution scope — platform, connectors, portal or specific components — is selected around the client’s information system and needs."], ["Can a business prepare before every final requirement is published?", "Yes. Data quality, flow mapping, governance and an adaptable architecture can be prepared while choices that depend on official legislation and specifications remain open."], ["Does Paytium guarantee tax compliance?", "Paytium designs adaptable architecture and processes. Legal, tax and regulatory validation remains coordinated with the client’s relevant internal teams and official sources."]]
      : [["Quelle différence entre une facture PDF, une e-facture et une facture électronique structurée ?", "Un PDF peut être une représentation lisible d’une facture sans être un flux de données structuré et directement exploitable. Une facture électronique structurée permet l’échange, le contrôle et l’intégration automatisés selon le format et le canal retenus."], ["Comment préparer son ERP à la facturation électronique DGI ?", "La préparation commence par la cartographie des flux, des données, des interfaces et des contrôles. Paytium identifie ensuite les adaptations ERP, comptables et d’intégration à prioriser, en gardant la cible adaptable aux publications officielles."], ["Paytium propose-t-il un logiciel de facturation ou un accompagnement d’intégration ?", "Paytium intervient en conseil, cadrage, architecture, intégration et automatisation. Le périmètre de solution — plateforme, connecteurs, portail ou composants spécifiques — est défini selon le système d’information et le besoin du client."], ["Peut-on préparer le projet avant la publication définitive de toutes les exigences ?", "Oui. Il est possible de fiabiliser les données, cartographier les flux, clarifier la gouvernance et préparer une architecture évolutive, tout en réservant les choix dépendant des textes et spécifications officiels."], ["Paytium garantit-il la conformité fiscale ?", "Paytium conçoit une architecture et des processus adaptables. La validation juridique, fiscale et réglementaire reste menée avec les fonctions compétentes du client et sur la base des référentiels officiels en vigueur."]];
    graph.push({ "@type": "FAQPage", mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) });
  }

  if (route.path.includes("academy")) {
    graph.push({ "@type": "EducationalOrganization", name: "Paytium Academy", url: absolute(route.path), parentOrganization: { "@id": `${baseUrl}/#organization` }, address: { "@type": "PostalAddress", addressLocality: "Casablanca" } });
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
  const socialImage = route.socialImage === null ? null : route.socialImage ?? "/og-paytium.png";
  const socialImageUrl = socialImage ? `${baseUrl}${socialImage}` : "";
  const socialImageAlt = route.socialImageAlt ?? "Paytium — Build. Secure. Scale.";
  const alternateLinks = `<link rel="alternate" hreflang="fr" href="${frUrl}" />\n    <link rel="alternate" hreflang="en" href="${enUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${frUrl}" />`;
  const renderedContent = renderPage(route.path);
  let html = template
    .replace(/<html lang="[^"]+">/, `<html lang="${route.lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n    <meta name="keywords" content="${route.keywords}" />\n    <meta name="geo.placename" content="Casablanca" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${routeUrl}" />`)
    .replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${locale}" />`)
    .replace(/<meta property="og:locale:alternate" content="[^"]*" \/>/, `<meta property="og:locale:alternate" content="${alternateLocale}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${socialImageUrl}" />`)
    .replace(/<meta property="og:image:secure_url" content="[^"]*" \/>/, `<meta property="og:image:secure_url" content="${socialImageUrl}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${socialImageAlt}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${socialImageUrl}" />`)
    .replace(/<meta name="twitter:image:alt" content="[^"]*" \/>/, `<meta name="twitter:image:alt" content="${socialImageAlt}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${routeUrl}" />`)
    .replace(/<link rel="alternate" hreflang="fr"[^>]*>\s*<link rel="alternate" hreflang="en"[^>]*>/, alternateLinks)
    .replace("</head>", `    <script type="application/ld+json">${jsonLd(route)}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderedContent}</div>`)
    .replace(/href="(\/(?:en(?:\/(?:services|academy|e-invoicing|case-studies))?|services|academy|e-invoicing|case-studies))(#[^"]*)?"/g, (_match, path, hash = "") => `href="${path}/${hash}"`);
  if (!socialImage) html = html
    .replace(/\s*<meta property="og:image(?::[^" ]+)?"[^>]*\/>/g, "")
    .replace(/\s*<meta name="twitter:image(?::[^" ]+)?"[^>]*\/>/g, "");
  const destination = route.path === "/" ? new URL("index.html", output) : new URL(`.${route.path}/index.html`, output);
  await mkdir(dirname(fileURLToPath(destination)), { recursive: true });
  await writeFile(destination, html);
}

const notFoundHtml = template
  .replace(/<title>[^<]*<\/title>/, "<title>Paytium | Page introuvable</title>")
  .replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="La page demandée est introuvable. Retrouvez les services et expertises de Paytium depuis la page d’accueil." />')
  .replace('<div id="root"></div>', `<div id="root">${renderNotFound("fr")}</div>`);
await writeFile(new URL("404.html", output), notFoundHtml);

for (const [legacyPath, destinationPath, lang, title] of [
  ["/facturation-electronique", "/e-invoicing", "fr", "Paytium | Facturation électronique"],
  ["/en/facturation-electronique", "/en/e-invoicing", "en", "Paytium | E-invoicing"],
  ["/expertises", "/case-studies", "fr", "Paytium | Études de cas"],
  ["/en/expertises", "/en/case-studies", "en", "Paytium | Case studies"],
]) {
  const destinationUrl = absolute(destinationPath);
  const redirectHtml = `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${destinationUrl}" />
    <link rel="canonical" href="${destinationUrl}" />
    <title>${title}</title>
    <script>location.replace(${JSON.stringify(destinationUrl)}+location.search+location.hash)</script>
  </head>
  <body><a href="${destinationUrl}">${lang === "en" ? "Continue to the new page" : "Continuer vers la nouvelle page"}</a></body>
</html>`;
  const redirectDestination = new URL(`.${legacyPath}/index.html`, output);
  await mkdir(dirname(fileURLToPath(redirectDestination)), { recursive: true });
  await writeFile(redirectDestination, redirectHtml);
}

await writeFile(new URL(".nojekyll", output), "");
await writeFile(new URL("CNAME", output), "paytium.io\n");
await writeFile(new URL("robots.txt", output), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\nHost: paytium.io\n`);
await writeFile(new URL("sitemap.xml", output), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${routes.map((route) => {
  const routeUrl = absolute(route.path);
  const alternateUrl = absolute(route.alternate);
  const frUrl = route.lang === "fr" ? routeUrl : alternateUrl;
  const enUrl = route.lang === "en" ? routeUrl : alternateUrl;
  const priority = route.path === "/" ? "1.0" : route.path === "/en" ? "0.9" : "0.8";
  return `  <url>\n    <loc>${escapeXml(routeUrl)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n    <xhtml:link rel="alternate" hreflang="fr" href="${escapeXml(frUrl)}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(frUrl)}" />\n  </url>`;
}).join("\n")}\n</urlset>\n`);
