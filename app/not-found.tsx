import type { Metadata } from "next";
import { PageShell } from "../components/SiteShell";
import { Arrow } from "../components/Brand";

export const metadata: Metadata = { title: "Paytium | Page introuvable" };

export default function NotFound({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const isEnglish = locale === "en";
  return <PageShell locale={locale} translationHref={isEnglish ? "/" : "/en"}><section className="not-found"><span>404</span><h1>{isEnglish ? "This page does not exist." : "Cette page n’existe pas."}</h1><p>{isEnglish ? "The requested page is no longer available or never existed." : "Le chemin demandé n’est plus disponible ou n’a jamais existé."}</p><a className="button button-primary" href={isEnglish ? "/en/" : "/"}>{isEnglish ? "Back to home" : "Retour à l’accueil"} <Arrow /></a></section></PageShell>;
}
