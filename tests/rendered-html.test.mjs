import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Paytium site and its branded page loader", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Paytium \| Conseil &amp; technologie<\/title>/);
  assert.match(html, /class="page-loader is-pending"/);
  assert.match(html, /role="status"/);
  assert.match(html, /src="\/paytium-icon\.svg"/);
  assert.match(html, /Parlons de votre/);
  assert.match(html, /Squad As Service/);
  assert.match(html, /class="expertise-band"/);
  assert.match(html, /UNE EXPERTISE/);
  assert.ok(html.indexOf('class="expertise-band"') < html.indexOf('class="section services-home"'));
  assert.doesNotMatch(html, /class="tech-preview"/);
  assert.doesNotMatch(html, /class="section tech-section tech-summary"/);
  assert.doesNotMatch(html, /Engineering &amp; Technology/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("displays the Paytium promise prominently in the footer", async () => {
  const [shell, css] = await Promise.all([
    readFile(new URL("../components/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(shell, /footer-slogan">Build\. <em>Secure\.<\/em> Scale\./);
  assert.match(css, /\.footer-slogan\{/);
});

test("promotes e-invoicing consultations and keeps English pages directly indexable", async () => {
  const [hero, homeFr, homeEn, rootLayout, pagesEntry, socialTemplate] = await Promise.all([
    readFile(new URL("../components/HomeHero.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/en/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../github-pages/main.tsx", import.meta.url), "utf8"),
    readFile(new URL("../github-pages/index.html", import.meta.url), "utf8"),
  ]);
  assert.match(hero, /Réserver ma consultation gratuite de 30 minutes/);
  assert.match(hero, /Explorer nos offres e-invoice/);
  assert.match(homeFr, /Diagnostic de préparation métier, data et SI/);
  assert.match(homeEn, /Business, data and information-system readiness assessment/);
  assert.match(rootLayout, /p==='\/'&&d==='en'/);
  assert.match(pagesEntry, /if \(initialPath === "\/"\)/);
  assert.doesNotMatch(pagesEntry, /desiredLanguage !== currentLanguage/);
  assert.match(socialTemplate, /Paytium — Build\. Secure\. Scale\./);
});

test("localizes and positions the expertise band before services", async () => {
  const response = await render("/en");
  const html = await response.text();
  assert.match(html, /DIGITAL EXPERTISE/);
  assert.match(html, /TO ACCELERATE YOUR TRANSFORMATION/);
  assert.ok(html.indexOf('class="expertise-band"') < html.indexOf('class="section services-home"'));
  assert.doesNotMatch(html, /class="tech-preview"/);
  assert.doesNotMatch(html, /class="section tech-section tech-summary"/);
});

test("localizes the country in the contact address", async () => {
  const frenchHtml = await (await render("/")).text();
  const englishHtml = await (await render("/en")).text();

  assert.match(frenchHtml, /Casablanca, Maroc/);
  assert.doesNotMatch(frenchHtml, /Casablanca, Morocco/);
  assert.match(englishHtml, /Casablanca, Morocco/);
  assert.doesNotMatch(englishHtml, /Casablanca, Maroc/);
});

test("uses descriptive page titles and the e-invoicing route", async () => {
  const expectedTitles = new Map([
    ["/", "Paytium | Conseil &amp; technologie"], ["/en", "Paytium | Consulting &amp; Technology"],
    ["/services", "Paytium | Services"], ["/en/services", "Paytium | Services"],
    ["/academy", "Paytium | Academy"], ["/en/academy", "Paytium | Academy"],
    ["/e-invoicing", "Paytium | Facturation électronique &amp; e-Invoice Connector"], ["/en/e-invoicing", "Paytium | E-Invoicing &amp; DGI Connector"],
    ["/case-studies", "Études de cas Fintech, Paiements et Digital Banking | Paytium"], ["/en/case-studies", "Fintech, Payments &amp; Digital Banking Case Studies | Paytium"],
  ]);
  for (const [route, title] of expectedTitles) {
    const response = await render(route);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title.replace("|", "\\|")}<\\/title>`));
  }
  const shell = await readFile(new URL("../components/SiteShell.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(shell, /\/facturation-electronique/);
  assert.match(shell, /\/e-invoicing/);
});

test("publishes bilingual financial-platform case studies", async () => {
  const frenchHtml = await (await render("/case-studies")).text();
  const englishHtml = await (await render("/en/case-studies")).text();
  const [shell, css] = await Promise.all([
    readFile(new URL("../components/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  for (const text of ["E-invoicing", "Cash Management solutions", "ISO 20022", "Digital Banking", "Trade Finance", "API Gateway"]) {
    assert.match(frenchHtml, new RegExp(text));
    assert.match(englishHtml, new RegExp(text));
  }
  assert.match(frenchHtml, /href="\/e-invoicing\/"/);
  assert.match(englishHtml, /href="\/en\/e-invoicing\/"/);
  assert.match(frenchHtml, /ÉTUDES DE CAS/);
  assert.match(englishHtml, /CASE STUDIES/);
  assert.match(frenchHtml, /CAS.{0,40}1.{0,40}Facturation électronique/);
  assert.match(frenchHtml, /CAS.{0,40}12.{0,40}API &amp; interopérabilité/);
  assert.match(englishHtml, /CASE.{0,40}1.{0,40}E-invoicing/);
  assert.match(englishHtml, /CASE.{0,40}12.{0,40}API &amp; interoperability/);
  assert.doesNotMatch(frenchHtml, /NOTRE MÉTHODE|De l’idée à/);
  assert.doesNotMatch(englishHtml, /OUR DELIVERY APPROACH|From idea to/);
  assert.match(shell, /aria-current=\{activeNav === "case-studies" \? "page"/);
  assert.match(shell, /href=\{`\$\{prefix\}\/case-studies\/`\}/);
  assert.match(shell, /activeNav === "about"/);
  assert.match(shell, /activeNav === "services"/);
  assert.match(shell, /activeNav === "e-invoicing"/);
  assert.match(css, /nav-services-trigger\.active:after/);
  assert.match(shell, /\.expertise-cases-visual[\s\S]*\.expertise-domain-heading[\s\S]*\.case-study/);
  assert.match(css, /@keyframes expertiseOrbit/);
  assert.match(css, /\.case-study\.reveal-item>div/);
  assert.match(frenchHtml, /Crédit et financement/);
  assert.match(englishHtml, /Digital lending/);
  assert.match(englishHtml, /Point of Sale \(POS\)/);
  assert.doesNotMatch(englishHtml, /Credit &amp; Loan|digital workplace/);
  assert.doesNotMatch(frenchHtml, /XHUB|logo client|nom du client/i);
});

test("presents the Moroccan e-invoicing offer, connector and consultation flow", async () => {
  const response = await render("/e-invoicing");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Connectez votre système de facturation à l’écosystème DGI/);
  assert.match(html, /Paytium e-Invoice Connector/);
  assert.match(html, /id="connector"/);
  assert.match(html, /id="offres"/);
  assert.match(html, /id="consultation"/);
  assert.match(html, /id="faq"/);
  assert.match(html, /API REST/);
  assert.match(html, /API SOAP/);
  assert.match(html, /SFTP \/ transfert sécurisé/);
  assert.match(html, /Intégration personnalisée/);
  assert.match(html, /name="need"/);
  assert.match(html, /name="stage"/);
  assert.doesNotMatch(html, /name="consent"/);
  assert.match(html, /einvoicing-casablanca\.jpg/);
  assert.match(html, /flag-morocco\.png/);
  assert.match(html, /logo-dgi\.png/);
  assert.match(html, /og-einvoicing-casablanca\.png/);
  assert.doesNotMatch(html, /class="institutional-logos"/);
  assert.doesNotMatch(html, /Paytium est un acteur indépendant/);
  assert.doesNotMatch(html, /Informations fondées sur les annonces publiques disponibles/);
  assert.doesNotMatch(html, /Représentation fonctionnelle simplifiée/);
  assert.match(html, /FAQPage/);
  assert.match(html, /Cette page ne présente pas Paytium comme CSP agréé ou certifié/);
  assert.doesNotMatch(html, /SOURCES PUBLIQUES ET INFORMATIONS RÉGLEMENTAIRES/);
  for (const label of ["UNE INTEROPÉRABILITÉ BIDIRECTIONNELLE", "POURQUOI PAYTIUM", "CONSULTATION OFFERTE · 30 MINUTES"]) {
    assert.match(html, new RegExp(`class="eyebrow page-kicker"[^>]*><span><\\/span>${label}`));
  }

  const englishHtml = await (await render("/en/e-invoicing")).text();
  assert.match(englishHtml, /Connect your invoicing systems to the DGI ecosystem/);
  assert.match(englishHtml, /BIDIRECTIONAL INTEROPERABILITY/);
  assert.match(englishHtml, /WHY PAYTIUM/);
  assert.match(englishHtml, /FREE CONSULTATION · 30 MINUTES/);
  assert.match(englishHtml, /name="need"/);
  assert.doesNotMatch(englishHtml, /name="consent"/);
});

test("uses the shared page-kicker design on service and academy page introductions", async () => {
  const servicesHtml = await (await render("/services")).text();
  const academyHtml = await (await render("/academy")).text();
  assert.match(servicesHtml, /class="eyebrow page-kicker"[^>]*><span><\/span>EXPERTISES PAYTIUM/);
  assert.match(academyHtml, /class="eyebrow page-kicker"[^>]*><span><\/span>PAYTIUM ACADEMY/);
});

test("strengthens brand and page hierarchy signals for search engines", async () => {
  const [layout, pagesScript, hero] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../scripts/prepare-github-pages.mjs", import.meta.url), "utf8"),
    readFile(new URL("../components/HomeHero.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /alternateName: "paytium\.io"/);
  assert.match(layout, /logo: "https:\/\/paytium\.io\/apple-touch-icon\.png"/);
  assert.match(pagesScript, /"@type": "BreadcrumbList"/);
  assert.match(pagesScript, /webPage\.breadcrumb = \{ "@id": breadcrumbId \}/);
  assert.match(pagesScript, /alternateName: "paytium\.io"/);
  assert.match(hero, /PAYTIUM — CONSEIL & TECHNOLOGIE/);
  assert.match(hero, /PAYTIUM — CONSULTING & TECHNOLOGY/);
});

test("adds consistent spacing around the contact subject chevron", async () => {
  const [form, css] = await Promise.all([
    readFile(new URL("../components/ContactForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(form, /className="contact-select"/);
  assert.match(form, /LuChevronDown/);
  assert.match(css, /\.contact-select select\{appearance:none;padding-right:64px\}/);
  assert.match(css, /\.contact-select>svg\{[^}]*right:24px/);
});

test("replaces consent checkboxes with bilingual privacy notices", async () => {
  const [form, profileForm, consultationForm, css] = await Promise.all([
    readFile(new URL("../components/ContactForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/ProfileRequestModal.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/EinvoiceConsultationForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  for (const source of [form, profileForm, consultationForm]) {
    assert.match(source, /className="privacy-note"/);
    assert.match(source, /LuShieldCheck/);
    assert.doesNotMatch(source, /type="checkbox" name="consent"/);
  }
  assert.match(form, /Paytium protège et respecte votre vie privée/);
  assert.match(profileForm, /protecting and respecting your privacy/);
  assert.match(css, /\.contact-form\{color-scheme:light/);
  assert.match(css, /\.privacy-note\{display:flex/);
  assert.match(css, /\.contact-form input:-webkit-autofill/);
});

test("restructures the homepage around mission, value proposition and approach", async () => {
  for (const route of ["/", "/en"]) {
    const response = await render(route);
    const html = await response.text();
    assert.match(html, /class="section about-section home-about"/);
    assert.match(html, /class="mission-panel"/);
    assert.match(html, /Build\. Secure\. Scale\./);
    assert.match(html, /class="section value-proposition"/);
    assert.doesNotMatch(html, /value-proposition-head/);
    assert.match(html, /Business &amp; Technology Consulting/);
    assert.match(html, /class="section approach-section"/);
    assert.match(html, /Vision[\s\S]*Architecture[\s\S]*Build[\s\S]*Run[\s\S]*Transfer/);
    assert.ok(html.indexOf('class="section about-section home-about"') < html.indexOf('class="section value-proposition"'));
    assert.ok(html.indexOf('class="section value-proposition"') < html.indexOf('class="section approach-section"'));
    assert.doesNotMatch(html, /UNE TRAJECTOIRE DIGITALE PLUS CLAIRE|A CLEARER DIGITAL ROADMAP/);
  }
  const source = await readFile(new URL("../components/HomePositioning.tsx", import.meta.url), "utf8");
  assert.match(source, /services#consulting/);
  assert.match(source, /services#expertise/);
});

test("uses English URL anchors across both locales and preserves legacy hash migration", async () => {
  for (const route of ["/", "/en"]) {
    const response = await render(route);
    const html = await response.text();
    assert.match(html, /id="about"/);
    assert.match(html, /id="value-proposition"/);
    assert.match(html, /id="method"/);
    assert.match(html, /id="approach"/);
    assert.match(html, /href="(?:\/en)?\/#about"/);
    assert.doesNotMatch(html, /id="(?:a-propos|proposition-valeur|methode|approche)"/);
  }

  for (const route of ["/services", "/en/services"]) {
    const response = await render(route);
    const html = await response.text();
    assert.match(html, /id="methods"/);
    assert.match(html, /id="expertise"/);
    assert.doesNotMatch(html, /id="(?:methodes|expertises)"/);
  }

  for (const route of ["/academy", "/en/academy"]) {
    const response = await render(route);
    const html = await response.text();
    assert.match(html, /id="catalog"/);
    assert.doesNotMatch(html, /id="catalogue"/);
  }

  const [positioning, shell] = await Promise.all([
    readFile(new URL("../components/HomePositioning.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/SiteShell.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(positioning, /One simple promise :/);
  assert.match(shell, /"a-propos": "about"/);
  assert.match(shell, /methodes: "methods"/);
  assert.match(shell, /catalogue: "catalog"/);
});

test("positions Squad As Service consistently in French and English", async () => {
  const [servicesFr, servicesEn, shell, servicesPage, servicesPageEn] = await Promise.all([
    readFile(new URL("../content/site.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/site-en.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/services/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/en/services/page.tsx", import.meta.url), "utf8"),
  ]);

  for (const source of [servicesFr, servicesEn, servicesPage, servicesPageEn]) {
    assert.match(source, /Squad As Service/);
    assert.doesNotMatch(source, /Engineering & Technology/);
  }
  assert.match(shell, /service\.title/);
  assert.match(servicesFr, /Renforcez votre organisation/);
  assert.match(servicesFr, /centre de services/);
  assert.match(servicesEn, /Scale your delivery capacity/);
  assert.match(servicesEn, /managed delivery centres/);
});

test("uses one ordered service naming system across the site", async () => {
  const [servicesFr, servicesEn, shell, servicesPage, servicesPageEn, pagesScript] = await Promise.all([
    readFile(new URL("../content/site.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/site-en.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/services/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/en/services/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../scripts/prepare-github-pages.mjs", import.meta.url), "utf8"),
  ]);
  const orderedNames = /Business & Technology Consulting[\s\S]*Digital & Data Factory[\s\S]*Squad As Service[\s\S]*DevSecOps & Cloud Engineering/;
  for (const source of [servicesFr, servicesEn, servicesPage, servicesPageEn]) assert.match(source, orderedNames);
  assert.match(pagesScript, /const services = \["Business & Technology Consulting", "Digital & Data Factory", "Squad As Service", "DevSecOps & Cloud Engineering"\]/);
  assert.match(shell, /service\.title/);
  assert.doesNotMatch(servicesPage, /seo-service-intro/);
  assert.doesNotMatch(servicesPageEn, /seo-service-intro/);
});

test("structures the technology stack as complete areas of expertise", async () => {
  const [content, shell, servicesPage, servicesPageEn, css] = await Promise.all([
    readFile(new URL("../content/site.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/services/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/en/services/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  for (const expected of ["Ingénierie logicielle", "Data & IA", "Cloud & Platform Engineering", "DevSecOps", "API Management & Intégration", "Cybersécurité", "Monitoring & Observabilité", "Collaboration", "GED & Stockage objet", "Brokers & Messaging", "Tests & Qualité", "Business & Delivery"]) {
    assert.match(content, new RegExp(expected.replace(/[&]/g, "\\&")));
  }
  for (const expected of ["OpenShift", "APIM", "SonarQube", "Nexus Repository", "AWX", "MinIO", "Alfresco", "Kafka", "RabbitMQ", "GitLab", "GitHub", "Bitbucket"]) assert.match(content, new RegExp(expected));
  assert.doesNotMatch(content, /Jira|Confluence/);
  assert.doesNotMatch(content, /title: "DevOps"/);
  assert.match(servicesPage, /NOS EXPERTISES/);
  assert.match(servicesPage, /Expertises technologiques et/);
  assert.match(servicesPageEn, /Technology expertise and/);
  assert.doesNotMatch(servicesPage, /Stack technologique et/);
  assert.doesNotMatch(servicesPageEn, /Technology stack and/);
  assert.match(servicesPage, /id="expertise"/);
  assert.match(css, /\.technology-groups article\{display:grid;grid-template-columns:\.4fr \.6fr/);
  assert.doesNotMatch(css, /\.technology-groups\{display:grid;grid-template-columns:repeat\(3/);
  assert.doesNotMatch(shell, /<a href=\{homeHref\}>\{copy\.home\}<\/a>/);
  assert.match(shell, /\{copy\.playground\}/);
  assert.match(shell, /services\/#expertise/);
});

test("makes every service concrete and adds a profile-request workflow", async () => {
  const [servicesFr, servicesEn, modal, servicesPage, servicesPageEn, home, homeEn] = await Promise.all([
    readFile(new URL("../content/site.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/site-en.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/ProfileRequestModal.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/services/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/en/services/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/en/page.tsx", import.meta.url), "utf8"),
  ]);

  for (const expected of ["Due diligence technologique", "Schéma directeur", "Audit d’architecture", "Benchmark", "TMA corrective", "régie forfaitisée", "Centre de services", "Squads augmentées", "Cellule d’architecture", "usine logicielle industrialisée", "SAST", "OpenShift"]) assert.match(servicesFr, new RegExp(expected));
  for (const expected of ["Technology due diligence", "master plans", "application support", "delivery centres", "Augmented multidisciplinary squads", "delivery-platform implementation"]) assert.match(servicesEn, new RegExp(expected, "i"));
  assert.match(servicesFr, /Dynatrace/);
  assert.match(servicesFr, /Elastic Stack \(ELK\)/);
  assert.match(modal, /contact_name/);
  assert.match(modal, /contact_email/);
  assert.match(modal, /profile_\$\{index \+ 1\}_role/);
  assert.match(modal, /availability_date/);
  assert.match(modal, /profile_\$\{index \+ 1\}_work_mode/);
  assert.match(modal, /mission_details/);
  assert.match(modal, /siteConfig\.contactEndpoint/);
  assert.match(modal, /Demande de profils — Squad As Service/);
  assert.match(modal, /createPortal\(modal, document\.body\)/);
  assert.match(modal, /minLength=\{2\} maxLength=\{80\}/);
  assert.match(modal, /maxLength=\{254\}/);
  assert.match(modal, /minLength=\{10\} maxLength=\{14\}/);
  assert.match(modal, /minLength=\{3\} maxLength=\{120\}/);
  assert.match(modal, /minLength=\{20\} maxLength=\{1500\}/);
  assert.match(modal, /generalMessageLength\} \/ 2000/);
  assert.match(modal, /Junior.*Confirmé.*Senior.*Expert/);
  assert.match(modal, /Présentiel.*Hybride.*Remote/);
  for (const source of [servicesPage, servicesPageEn, home, homeEn]) assert.match(source, /ProfileRequestModal/);
});

test("validates the requested phone formats and keeps profile mission input stable", async () => {
  const [validation, contactForm, modal, css] = await Promise.all([
    readFile(new URL("../lib/contactValidation.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/ContactForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/ProfileRequestModal.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.ok(validation.includes("0\\d{9}"));
  assert.ok(validation.includes("\\+\\d{10,12}"));
  assert.ok(validation.includes("00\\d{10,12}"));
  for (const source of [contactForm, modal]) {
    assert.match(source, /normalizePhoneNumber/);
    assert.match(source, /isValidPhoneNumber/);
    assert.match(source, /minLength=\{10\} maxLength=\{14\}/);
    assert.match(source, /sanitizePhoneInput/);
    assert.match(source, /pattern="\(\?:0\[0-9\]\{9\}\|\\\+\[0-9\]\{10,12\}\|00\[0-9\]\{10,12\}\)"/);
  }
  assert.match(modal, /profilesSection: "Détails des profils recherchés"/);
  assert.match(modal, /profilesSection: "Details of the requested profiles"/);
  assert.match(modal, /const length = event\.currentTarget\.value\.length/);
  assert.doesNotMatch(modal, /\[profile\.id\]: event\.currentTarget\.value\.length/);
  assert.match(css, /\.profile-details-heading/);
  assert.match(css, /\.invoice-visual\{background:#fff\}/);
});

test("uses the approved Mission and end-to-end approach copy in both languages", async () => {
  const [fr, en, css] = await Promise.all([
    render("/").then((response) => response.text()),
    render("/en").then((response) => response.text()),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  for (const text of [
    "Nous transformons vos enjeux métier en produits digitaux et data utiles, performants et conçus pour durer.",
    "Nous renforçons la sécurité, la fiabilité et la résilience de vos architectures, plateformes et opérations.",
    "Nous accélérons vos projets grâce à des expertises ciblées, rapidement mobilisables et pleinement intégrées à vos équipes.",
    "Une maîtrise",
    "de bout en bout.",
    "De la définition de la vision à la montée en autonomie de vos équipes",
    "Nous transmettons nos méthodes et nos savoir-faire",
  ]) assert.match(fr, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(en, /End-to-end/);
  assert.match(en, /We share our methods and know-how/);
  assert.match(css, /\.approach-section\{background:var\(--pale\)/);
  assert.match(css, /\.approach-grid article\.reveal-item\.is-visible i/);
  assert.match(css, /@media\(min-width:1181px\)\{\.mission-pillars\{align-self:start;margin-top:48px\}\}/);
});

test("orders the services menu and uses market-aware English labels", async () => {
  const [shell, servicesPageEn, servicesEn, contactForm] = await Promise.all([
    readFile(new URL("../components/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/en/services/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../content/site-en.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/ContactForm.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(shell, /playground: "Field of play"/);
  assert.match(shell, /methodsMenu: "Our methods"/);
  assert.match(shell, /cases: "Études de cas"/);
  assert.match(shell, /cases: "Case studies"/);
  assert.match(shell, /technologies: "Expertises"/);
  assert.match(shell, /technologies: "Expertise"/);
  assert.match(shell, /<button className=\{`nav-services-trigger \$\{activeNav === "services" \? "active" : ""\}`\} type="button" aria-haspopup="true">\{copy\.services\}/);
  assert.doesNotMatch(shell, /<a href=\{`\$\{prefix\}\/services\/`\}>\{copy\.services\}/);
  assert.match(shell, /copy\.playground[\s\S]*copy\.methodsMenu[\s\S]*copy\.technologies[\s\S]*copy\.academy/);
  assert.match(shell, /services\/#methods/);
  assert.match(shell, /e-invoicing\/#offres/);
  assert.match(shell, /e-invoicing\/#consultation/);
  assert.match(servicesPageEn, /DELIVERY METHODS/);
  assert.match(servicesPageEn, /workingMethodsEn/);
  assert.match(servicesEn, /managed delivery centres/);
  assert.match(contactForm, /DevSecOps & Cloud Engineering/);
  assert.doesNotMatch(servicesPageEn, /Ways of working|View our method/);
});

test("keeps the loader animated, accessible and limited to document navigation", async () => {
  const [loader, css, layout, notFound, pagesEntry] = await Promise.all([
    readFile(new URL("../components/PageLoader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8"),
    readFile(new URL("../github-pages/main.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /<PageLoader \/>/);
  assert.match(loader, /destination\.pathname !== current\.pathname/);
  assert.match(loader, /destination\.search !== current\.search/);
  assert.match(loader, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(loader, /minimumDisplay|startedAt/);
  assert.match(loader, /aria-label="Chargement \/ Loading"/);
  assert.match(css, /@keyframes pageLoaderOrbit/);
  assert.match(css, /@keyframes pageLoaderReveal/);
  assert.match(css, /@keyframes pageLoaderPulse/);
  assert.match(css, /@keyframes pageLoaderDot/);
  assert.match(css, /\.page-loader\.is-hidden/);
  assert.match(css, /\.page-loader\.is-pending/);
  assert.match(css, /pageLoaderReveal 1ms linear \.18s forwards/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(notFound, /This page does not exist\./);
  assert.match(notFound, /Back to home/);
  assert.match(pagesEntry, /initialPath\.startsWith\("\/en\/"\)/);
  assert.match(pagesEntry, /<NotFound locale=\{notFoundLocale\} \/>/);
});
