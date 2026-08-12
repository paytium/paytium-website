# Site Paytium

Site vitrine React de Paytium construit avec vinext, TypeScript et CSS. Il comprend trois routes : l’accueil, les services et la facturation électronique.

## Lancer le projet

```bash
npm install
npm run dev
npm run build
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

Définir `VITE_CONTACT_ENDPOINT` dans l’environnement d’exécution. Le formulaire envoie une requête POST JSON vers cet endpoint. Sans endpoint, aucun faux succès n’est affiché : le visiteur reçoit un message de configuration explicite.

## Structure

- `app/` : routes et métadonnées ;
- `components/` : navigation, carousel, formulaire et sections réutilisables ;
- `content/site.ts` : contenu structuré et configuration éditable ;
- `public/` : logo et favicon Paytium ;
- `app/globals.css` : tokens et système visuel responsive.

## Principes UX/UI

Le design reprend les codes Paytium : vert profond, sauge, menthe et ivoire, grands titres éditoriaux, compositions orbitales, cartes arrondies et interfaces abstraites. Les interactions sont utilisables au clavier et les animations sont réduites avec `prefers-reduced-motion`.
