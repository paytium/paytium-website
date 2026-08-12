import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const output = new URL("../dist-pages/", import.meta.url);
const baseUrl = "https://paytium.github.io/paytium-website";
const routes = [
  ["/", "fr", "Paytium | Transformation digitale", "Paytium accompagne les organisations de la stratégie à l’exécution de leurs transformations digitales."],
  ["/en", "en", "Paytium | Digital transformation", "Paytium supports organisations from strategy through delivery across digital, data, cloud and engineering transformation."],
  ["/services", "fr", "Services de transformation digitale | Paytium", "Conseil, produits digitaux, data, engineering, cloud et DevOps : découvrez les expertises de Paytium."],
  ["/en/services", "en", "Digital transformation services | Paytium", "Consulting, digital products, data, engineering, cloud and DevOps expertise from Paytium."],
  ["/academy", "fr", "Paytium Academy | Formations Digital, Data, Cloud et Agile", "Développez les compétences de vos équipes avec les formations pratiques de Paytium Academy."],
  ["/en/academy", "en", "Paytium Academy | Digital, Data, Cloud and Agile training", "Grow your teams’ skills with practical training from Paytium Academy."],
  ["/facturation-electronique", "fr", "Facturation électronique et intégration | Paytium", "Préparez, intégrez et industrialisez votre chaîne de facturation électronique avec Paytium."],
  ["/en/facturation-electronique", "en", "E-invoicing integration | Paytium", "Prepare, integrate and industrialise your e-invoicing chain with Paytium."],
];

const template = await readFile(new URL("index.html", output), "utf8");

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

for (const [route, language, title, description] of routes) {
  const routeUrl = `${baseUrl}${route === "/" ? "/" : `${route}/`}`;
  const html = template
    .replace(/<html lang="[^"]+">/, `<html lang="${language}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${routeUrl}" />`);
  const destination = route === "/" ? new URL("index.html", output) : new URL(`.${route}/index.html`, output);
  await mkdir(dirname(fileURLToPath(destination)), { recursive: true });
  await writeFile(destination, html);
}

await copyFile(new URL("index.html", output), new URL("404.html", output));
await writeFile(new URL(".nojekyll", output), "");
await writeFile(new URL("robots.txt", output), `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`);
await writeFile(new URL("sitemap.xml", output), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(([route]) => `  <url><loc>${escapeXml(`${baseUrl}${route === "/" ? "/" : `${route}/`}`)}</loc></url>`).join("\n")}\n</urlset>\n`);
