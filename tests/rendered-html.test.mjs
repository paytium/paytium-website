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
  assert.match(html, /<title>Paytium Maroc/);
  assert.match(html, /class="page-loader is-visible"/);
  assert.match(html, /role="status"/);
  assert.match(html, /src="\/paytium-icon\.svg"/);
  assert.match(html, /Parlons de votre/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps the loader animated, accessible and limited to document navigation", async () => {
  const [loader, css, layout] = await Promise.all([
    readFile(new URL("../components/PageLoader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /<PageLoader \/>/);
  assert.match(loader, /destination\.pathname !== current\.pathname/);
  assert.match(loader, /destination\.search !== current\.search/);
  assert.match(loader, /prefers-reduced-motion: reduce/);
  assert.match(loader, /aria-label="Chargement \/ Loading"/);
  assert.match(css, /@keyframes pageLoaderOrbit/);
  assert.match(css, /@keyframes pageLoaderPulse/);
  assert.match(css, /@keyframes pageLoaderDot/);
  assert.match(css, /\.page-loader\.is-hidden/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
});
