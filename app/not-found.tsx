import { PageShell } from "../components/SiteShell";

export default function NotFound() {
  return <PageShell><section className="not-found"><span>404</span><h1>Cette page n’existe pas.</h1><p>Le chemin demandé n’est plus disponible ou n’a jamais existé.</p><a className="button button-primary" href="/">Retour à l’accueil ↗</a></section></PageShell>;
}
