# Paytium Website

Site vitrine React bilingue de Paytium construit avec vinext, TypeScript et CSS. Il comprend les pages d’accueil, services, facturation électronique et Paytium Academy en français et en anglais.

## Lancer le projet

```bash
npm install
npm run dev
npm run build
npm run build:pages
```

## Modifier les informations

Les coordonnées, liens légaux, technologies, services et méthodes sont centralisés dans `content/site.ts`. Les valeurs non confirmées restent à `null` et sont automatiquement masquées dans l’interface.

Informations à fournir avant une mise en production publique :

- adresse email de contact ;
- téléphone ;
- adresse postale ;
- URL LinkedIn ;
- raison sociale officielle ;
- liens Mentions légales et Politique de confidentialité ;
- validation finale de la liste des technologies maîtrisées.

## Configurer le formulaire de contact

Le formulaire envoie les demandes à l’adresse Paytium configurée via FormSubmit. La première demande nécessite la validation unique de l’adresse de réception.

## GitHub Pages

La commande `npm run build:pages` produit une version statique dans `dist-pages/`. Elle conserve les routes bilingues, le formulaire de contact, Google Analytics, les métadonnées SEO et les préférences de langue du navigateur.

## Structure

- `app/` : routes et métadonnées ;
- `components/` : navigation, carousel, formulaire et sections réutilisables ;
- `content/site.ts` : contenu structuré et configuration éditable ;
- `public/` : logo et favicon Paytium ;
- `app/globals.css` : tokens et système visuel responsive.

## Principes UX/UI

Le design reprend les codes Paytium : vert profond, sauge, menthe et ivoire, grands titres éditoriaux, compositions orbitales, cartes arrondies et interfaces abstraites. Les interactions sont utilisables au clavier et les animations sont réduites avec `prefers-reduced-motion`.
