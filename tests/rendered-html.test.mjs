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

test("localizes and positions the expertise band before services", async () => {
  const response = await render("/en");
  const html = await response.text();
  assert.match(html, /DIGITAL EXPERTISE/);
  assert.match(html, /TO ACCELERATE YOUR TRANSFORMATION/);
  assert.ok(html.indexOf('class="expertise-band"') < html.indexOf('class="section services-home"'));
  assert.doesNotMatch(html, /class="tech-preview"/);
  assert.doesNotMatch(html, /class="section tech-section tech-summary"/);
});

test("removes country labels from every French and English page", async () => {
  const routes = ["/", "/en", "/services", "/en/services", "/academy", "/en/academy", "/e-invoicing", "/en/e-invoicing"];
  for (const route of routes) {
    const response = await render(route);
    const html = await response.text();
    assert.doesNotMatch(html, /maroc|morocc/i, `country label found on ${route}`);
  }
});

test("uses descriptive page titles and the e-invoicing route", async () => {
  const expectedTitles = new Map([
    ["/", "Paytium | Conseil &amp; technologie"], ["/en", "Paytium | Consulting &amp; Technology"],
    ["/services", "Paytium | Services"], ["/en/services", "Paytium | Services"],
    ["/academy", "Paytium | Academy"], ["/en/academy", "Paytium | Academy"],
    ["/e-invoicing", "Paytium | Facturation électronique"], ["/en/e-invoicing", "Paytium | E-invoicing"],
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

test("styles native contact controls with the Paytium design system", async () => {
  const [form, css] = await Promise.all([
    readFile(new URL("../components/ContactForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(form, /type="checkbox" name="consent" required/);
  assert.match(css, /\.contact-form\{color-scheme:light/);
  assert.match(css, /\.consent input\{appearance:none;-webkit-appearance:none/);
  assert.match(css, /\.consent input:checked\{[^}]*background:var\(--deep\)/);
  assert.match(css, /\.consent input:focus-visible\{[^}]*outline:3px solid/);
  assert.match(css, /\.contact-form input:-webkit-autofill/);
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
  assert.match(servicesFr, /Réduisez vos délais de mise sur le marché/);
  assert.match(servicesFr, /cycle de vie produit/);
  assert.match(servicesEn, /Reduce time to market/);
  assert.match(servicesEn, /full product lifecycle/);
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
  assert.match(servicesPage, /Stack technologique et/);
  assert.match(servicesPageEn, /Technology stack and/);
  assert.match(servicesPage, /id="expertises"/);
  assert.match(css, /\.technology-groups\{display:grid;grid-template-columns:repeat\(3/);
  assert.doesNotMatch(shell, /<a href=\{homeHref\}>\{copy\.home\}<\/a>/);
  assert.match(shell, /\{copy\.playground\}/);
  assert.match(shell, /services#expertises/);
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
