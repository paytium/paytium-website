import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const appRoot = join(projectRoot, "app");
const blogFile = join(projectRoot, "content", "blog.json");
const outputFile = join(projectRoot, "content", "generated-public-routes.json");

async function pageFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? pageFiles(path) : entry.name === "page.tsx" ? [path] : [];
  }));
  return nested.flat();
}

function normalizeRoute(value) {
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function routeFromFile(file) {
  const directory = relative(appRoot, dirname(file)).split(sep).filter(Boolean);
  return normalizeRoute(directory.join("/"));
}

function canonicalFromSource(source) {
  return source.match(/canonical:\s*["']([^"']+)["']/)?.[1];
}

const discovered = [];
for (const file of await pageFiles(appRoot)) {
  const route = routeFromFile(file);
  if (route.split("/").some((segment) => segment.startsWith("["))) continue;

  const source = await readFile(file, "utf8");
  const canonical = canonicalFromSource(source);
  const redirects = /\bredirect\s*\(/.test(source) || /robots:\s*{[^}]*index:\s*false/s.test(source);
  const canonicalPointsElsewhere = canonical && normalizeRoute(canonical) !== route;
  if (!redirects && !canonicalPointsElsewhere) discovered.push(route);
}

const articles = JSON.parse(await readFile(blogFile, "utf8"));
for (const article of articles) {
  discovered.push(`/blog/${article.slug}`, `/en/blog/${article.slug}`);
}

const routes = [...new Set(discovered)].sort((a, b) => a.localeCompare(b, "en"));
const routeSet = new Set(routes);
const frenchRoutes = routes.filter((route) => !route.startsWith("/en"));
const pairs = frenchRoutes.map((fr) => {
  const en = fr === "/" ? "/en" : `/en${fr}`;
  if (!routeSet.has(en)) throw new Error(`Missing English public route for ${fr}: expected ${en}`);
  return { fr, en };
});

const pairedRoutes = new Set(pairs.flatMap(({ fr, en }) => [fr, en]));
const unpairedRoutes = routes.filter((route) => !pairedRoutes.has(route));
if (unpairedRoutes.length) throw new Error(`Public routes without a French/English pair: ${unpairedRoutes.join(", ")}`);

await writeFile(outputFile, `${JSON.stringify(pairs, null, 2)}\n`);
console.log(`Generated ${pairs.length * 2} sitemap routes in ${relative(projectRoot, outputFile)}`);
