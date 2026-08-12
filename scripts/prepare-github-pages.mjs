import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const output = new URL("../dist-pages/", import.meta.url);
const baseUrl = "https://paytium.io";
const lastModified = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Casablanca", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const { renderPage } = await import(new URL("../dist-pages-ssr/prerender.js", import.meta.url));

const routes = [
  { path: "/", lang: "fr", alternate: "/en", title: "Paytium Maroc | Conseil digital, Data, Cloud & Engineering", description: "Paytium accompagne les entreprises au Maroc en stratégie digitale, Data & IA, software engineering, Cloud & DevOps et facturation électronique.", keywords: "Paytium, Paytium Maroc, transformation digitale Maroc, conseil IT Maroc, Data IA, Cloud DevOps, software engineering" },
  { path: "/en", lang: "en", alternate: "/", title: "Paytium Morocco | Digital, Data, Cloud & Engineering", description: "Paytium supports organisations in Morocco with digital consulting, Data & AI, software engineering, Cloud & DevOps and e-invoicing.", keywords: "Paytium, Paytium Morocco, digital transformation Morocco, IT consulting Morocco, Data AI, Cloud DevOps, software engineering" },
  { path: "/services", lang: "fr", alternate: "/en/services", title: "Conseil digital, Data, IA, Cloud & DevOps Maroc | Paytium", description: "Services Paytium au Maroc : conseil IT, stratégie digitale, produits web et mobile, Data & IA, software engineering, Cloud, DevOps et DevSecOps.", keywords: "services Paytium, conseil IT Maroc, stratégie digitale, développement web Maroc, développement mobile, Data IA Maroc, Cloud DevOps Maroc, DevSecOps" },
  { path: "/en/services", lang: "en", alternate: "/services", title: "Digital, Data, AI, Cloud & DevOps Morocco | Paytium", description: "Paytium Morocco provides IT consulting, digital products, Data & AI, software engineering, Cloud, DevOps and DevSecOps services.", keywords: "Paytium services, IT consulting Morocco, digital products, software engineering Morocco, Data AI Morocco, Cloud DevOps Morocco" },
  { path: "/academy", lang: "fr", alternate: "/en/academy", title: "Paytium Academy | Formations Digital, Data, Cloud et Agile", description: "Développez les compétences de vos équipes au Maroc avec les formations pratiques Digital, Data, IA, Cloud, DevOps et Agile de Paytium Academy.", keywords: "Paytium Academy, formation digitale Maroc, formation Data IA, formation Cloud DevOps, formation Agile Casablanca" },
  { path: "/en/academy", lang: "en", alternate: "/academy", title: "Paytium Academy | Digital, Data, Cloud and Agile training", description: "Grow your teams’ capabilities in Morocco through practical Digital, Data, AI, Cloud, DevOps and Agile training from Paytium Academy.", keywords: "Paytium Academy, digital training Morocco, Data AI training, Cloud DevOps training, Agile training Casablanca" },
  { path: "/facturation-electronique", lang: "fr", alternate: "/en/facturation-electronique", title: "Facturation électronique Maroc & préparation DGI | Paytium", description: "Paytium accompagne la préparation à la facturation électronique au Maroc : DGI, ERP, intégration comptable, contrôles, workflows, traçabilité et archivage.", keywords: "facturation électronique Maroc, facture électronique Maroc, DGI Maroc, intégration ERP, dématérialisation factures, e-invoicing Morocco, Paytium" },
  { path: "/en/facturation-electronique", lang: "en", alternate: "/facturation-electronique", title: "E-invoicing Morocco & DGI readiness | Paytium", description: "Paytium helps businesses prepare for e-invoicing in Morocco: DGI readiness, ERP integration, invoice controls, workflows, traceability and archiving.", keywords: "e-invoicing Morocco, electronic invoicing Morocco, Morocco DGI, ERP integration, invoice automation, Paytium" },
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
    sameAs: ["https://www.linkedin.com/company/paytium"],
    address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
    areaServed: { "@type": "Country", name: isEnglish ? "Morocco" : "Maroc" },
    knowsAbout: isEnglish
      ? ["Digital transformation", "IT consulting", "Data and artificial intelligence", "Software engineering", "Cloud and DevOps", "E-invoicing"]
      : ["Transformation digitale", "Conseil IT", "Data et intelligence artificielle", "Ingénierie logicielle", "Cloud et DevOps", "Facturation électronique"],
  };
  const graph = [
    organisation,
    { "@type": "WebSite", "@id": `${baseUrl}/#website`, url: baseUrl, name: "Paytium", alternateName: "Paytium Morocco", publisher: { "@id": `${baseUrl}/#organization` }, inLanguage: ["fr-FR", "en-US"] },
    { "@type": "WebPage", "@id": `${absolute(route.path)}#webpage`, url: absolute(route.path), name: route.title, description: route.description, isPartOf: { "@id": `${baseUrl}/#website` }, about: { "@id": `${baseUrl}/#organization` }, inLanguage: isEnglish ? "en-US" : "fr-FR" },
  ];

  if (route.path.endsWith("/services") || route.path === "/services") {
    const services = isEnglish
      ? ["IT consulting and digital strategy", "Digital products, Data and AI", "Software engineering", "Cloud, DevOps and DevSecOps"]
      : ["Conseil IT et stratégie digitale", "Produits digitaux, Data et IA", "Ingénierie logicielle", "Cloud, DevOps et DevSecOps"];
    graph.push({ "@type": "ItemList", name: isEnglish ? "Paytium services in Morocco" : "Services Paytium au Maroc", itemListElement: services.map((name, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name, provider: { "@id": `${baseUrl}/#organization` }, areaServed: { "@type": "Country", name: isEnglish ? "Morocco" : "Maroc" } } })) });
  }

  if (route.path.includes("facturation-electronique")) {
    graph.push({ "@type": "Service", "@id": `${absolute(route.path)}#service`, name: isEnglish ? "E-invoicing readiness and integration in Morocco" : "Préparation et intégration de la facturation électronique au Maroc", serviceType: isEnglish ? "E-invoicing consulting and integration" : "Conseil et intégration en facturation électronique", provider: { "@id": `${baseUrl}/#organization` }, areaServed: { "@type": "Country", name: isEnglish ? "Morocco" : "Maroc" }, audience: { "@type": "BusinessAudience", audienceType: "Businesses and institutions" }, description: route.description });
    const faq = isEnglish
      ? [["Can Paytium connect e-invoicing to our ERP?", "Yes. Integration is designed after assessing the ERP, available interfaces, volumes and security constraints."], ["Can e-invoicing deployment be progressive?", "Yes. A controlled pilot can validate flows, checks and operations before a wider rollout."], ["Does Paytium replace tax advice?", "No. Paytium prepares adaptable architecture and processes while tax and regulatory decisions remain coordinated with competent functions and official DGI references."]]
      : [["Paytium peut-il connecter la facturation électronique à notre ERP ?", "Oui. L’intégration est définie après analyse de l’ERP, des interfaces, des volumes et des contraintes de sécurité."], ["Le déploiement de la facture électronique peut-il être progressif ?", "Oui. Un pilote contrôlé permet de valider les flux, les contrôles et l’exploitation avant un déploiement plus large."], ["Paytium remplace-t-il le conseil fiscal ?", "Non. Paytium prépare une architecture et des processus adaptables ; les décisions fiscales et réglementaires restent validées avec les fonctions compétentes et les références officielles de la DGI."]];
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

await copyFile(new URL("index.html", output), new URL("404.html", output));
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
