# Paytium agent guidance

This repository is the bilingual Paytium marketing site. Changes can affect public navigation, lead forms, SEO metadata, structured data, and both the Sites and GitHub Pages builds.

## Start here

- Read [docs/agents/agent-entrypoint.md](docs/agents/agent-entrypoint.md) and follow only the route relevant to the task.
- Treat French and English as paired public surfaces. When behavior or shared business content changes, inspect the corresponding `/en` route or English content source.
- Keep canonical URLs, language alternates, the static route list, sitemap entries, and legacy redirects aligned when adding or renaming a public route.

## Source boundaries

- `app/` owns routes and route metadata; `components/` owns reusable UI and client behavior.
- `content/site.ts`, `content/site-en.ts`, and `content/academy.ts` own reusable editorial and catalogue data.
- `app/globals.css` is the shared visual system; prefer its existing tokens and responsive patterns.
- `scripts/prepare-github-pages.mjs` owns static-page SEO, route generation, sitemap output, and legacy redirects for GitHub Pages.
- `public/` contains committed brand and social assets. `dist/`, `dist-pages/`, and `dist-pages-ssr/` are generated outputs.

## Change rules

- Preserve keyboard usability and the existing `prefers-reduced-motion` behavior when changing interactions or animation.
- Keep form validation consistent through `lib/contactValidation.ts`; inspect every form that uses a changed rule.
- Do not expose or commit credentials. Environment files are ignored; the public contact endpoint configuration lives in `content/site.ts`.
- Do not hand-edit generated build directories. Regenerate them through the package scripts.
- Preserve unrelated working-tree changes and avoid destructive Git operations.

## Verification

Run checks from the repository root and choose the smallest set that covers the change:

- `npm run lint` for TypeScript, React, or component changes.
- `npm run build` for the Sites/vinext application.
- `node --test tests/rendered-html.test.mjs` after a successful build for rendered routes, metadata, navigation, or forms.
- `npm run build:pages` for routes, SEO, language behavior, public assets, or GitHub Pages output.

Report only checks that actually ran. Publishing is a separate external action and should only be reported after the target deployment succeeds.
