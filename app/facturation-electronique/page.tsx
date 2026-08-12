import type { Metadata } from "next";
import { LuArrowRight, LuPlus } from "react-icons/lu";
import { Breadcrumbs, PageShell } from "../../components/SiteShell";
import { Eyebrow } from "../../components/Brand";
import { FinalCta, PageHero, SectionHeading } from "../../components/Sections";

export const metadata: Metadata = {
  title: "Facturation électronique Maroc & préparation DGI",
  description: "Paytium accompagne les entreprises au Maroc dans leur préparation à la facturation électronique : DGI, processus, ERP, intégration, contrôle et archivage.",
  alternates: { canonical: "/facturation-electronique", languages: { "fr-FR": "/facturation-electronique", "en-US": "/en/facturation-electronique" } },
};

const challenges = [["Préparation", "Cartographier les flux, les acteurs, les formats et les écarts."], ["Interopérabilité", "Connecter ERP, applications métier, partenaires et plateformes d’échange."], ["Maîtrise", "Contrôler les données, suivre les statuts et traiter les exceptions."], ["Évolutivité", "Absorber les changements réglementaires, fonctionnels et volumétriques."]];
const lifecycle = [["Collecter", "Recevoir la facture ou les données depuis les canaux configurés."], ["Contrôler", "Vérifier la structure, les données obligatoires et les règles métier."], ["Valider", "Appliquer les circuits d’approbation et gérer les exceptions."], ["Échanger", "Transmettre ou recevoir via le canal et le format attendus."], ["Rapprocher", "Synchroniser les statuts et alimenter les systèmes comptables."], ["Archiver & piloter", "Conserver les éléments requis et suivre l’activité."]];
const capabilities = ["Émission et réception de factures électroniques", "Import depuis ERP, fichiers, APIs ou portail", "Contrôles de complétude, cohérence et règles métier", "Enrichissement et normalisation des données", "Workflows de validation et gestion des exceptions", "Transmission, accusés, statuts et notifications", "Rapprochement comptable et de paiement", "Archivage, recherche et piste d’audit", "Tableaux de bord et supervision opérationnelle"];
const security = ["Accès par rôles et séparation des responsabilités", "Chiffrement des échanges et protection des données", "Journalisation des actions, statuts et erreurs", "Intégrité et traçabilité des documents", "Conservation et archivage configurables", "Supervision, alertes et traitement des exceptions", "Adaptation aux exigences applicables"];
const useCases = [["Factures clients", "Automatiser l’émission, le suivi et la réconciliation des factures de vente."], ["Factures fournisseurs", "Accélérer la réception, le contrôle, l’approbation et l’intégration comptable."], ["Groupes multi-entités", "Harmoniser les règles et consolider le pilotage en respectant les spécificités locales."], ["Écosystèmes partenaires", "Proposer des canaux adaptés à des partenaires de maturités différentes."]];
const deployment = [["Diagnostic", "Flux, données, outils, acteurs, volumes et risques."], ["Cible", "Architecture, processus, modèle opérationnel et feuille de route."], ["Pilote", "Périmètre contrôlé, intégrations prioritaires et mesure."], ["Industrialisation", "Automatisation, sécurité, supervision et documentation."], ["Déploiement", "Extension par entité, population, flux ou cas d’usage."], ["Amélioration continue", "Suivi, assistance, optimisation et évolutions."]];
const faq = [["Peut-on connecter la solution à notre ERP ?", "Oui. Le mode d’intégration est défini après analyse de l’ERP, des interfaces disponibles, des volumes et des contraintes de sécurité. APIs, échanges batch, événements ou connecteurs peuvent être combinés."], ["Quels formats de facture sont pris en charge ?", "Les formats sont déterminés selon l’écosystème cible et les exigences applicables. Une couche de normalisation peut convertir les données internes vers les formats d’échange retenus."], ["Peut-on déployer progressivement ?", "Oui. Une approche pilote permet de valider les flux, les contrôles et l’exploitation avant d’étendre le dispositif à d’autres entités ou volumes."], ["Comment sont gérées les erreurs ?", "Les contrôles, statuts, notifications et files de traitement permettent d’identifier les exceptions, de les qualifier et d’organiser leur résolution avec une traçabilité complète."], ["La conformité est-elle garantie ?", "Paytium conçoit l’architecture et les processus pour s’adapter aux exigences applicables. La validation juridique, fiscale et réglementaire reste menée avec les fonctions compétentes du client et sur la base des référentiels officiels en vigueur."]];

export default function ElectronicInvoicingPage() {
  return <PageShell translationHref="/en/facturation-electronique">
    <Breadcrumbs items={[{ label: "Facturation électronique", href: "/facturation-electronique" }]} />
    <PageHero eyebrow="FACTURATION ÉLECTRONIQUE MAROC" title={<>Préparez votre facturation électronique, <em>sans interrompre vos opérations.</em></>} text="Paytium accompagne les entreprises au Maroc dans la préparation à la facturation électronique et aux évolutions portées par la DGI, avec une chaîne connectée aux outils finance, comptables et métier." primary={["Évaluer votre niveau de préparation", "/#contact"]} secondary={["Parler à un expert", "/#contact"]}>
      <div className="einvoice-flow"><div>ERP<br/><small>Applications</small></div><i aria-hidden="true"><LuArrowRight /></i><div className="active">Contrôle<br/><small>& orchestration</small></div><i aria-hidden="true"><LuArrowRight /></i><div>Émission<br/><small>& réception</small></div><i aria-hidden="true"><LuArrowRight /></i><div>Archivage<br/><small>& pilotage</small></div></div>
    </PageHero>

    <section className="section einvoice-morocco" aria-labelledby="dgi-maroc">
      <div><Eyebrow>FACTURATION ÉLECTRONIQUE & DGI MAROC</Eyebrow><h2 id="dgi-maroc">Anticiper les exigences, <em>préparer le système d’information.</em></h2></div>
      <div><p>La transition vers la facturation électronique au Maroc implique la Direction Générale des Impôts (DGI), mais aussi les équipes finance, fiscalité, achats, ventes et IT. Paytium aide à cartographier les flux, fiabiliser les données et préparer les adaptations ERP et comptables.</p><p>Le dispositif est conçu pour rester adaptable aux textes, calendriers et spécifications officiellement publiés. Paytium ne se substitue pas au conseil fiscal : chaque décision de conformité est validée avec les fonctions compétentes et les référentiels officiels.</p><a className="text-link" href="https://www.finances.gov.ma/fr/Ministere/Pages/dgi.aspx" target="_blank" rel="noreferrer">Consulter la présentation officielle de la DGI <LuArrowRight aria-hidden="true" /></a></div>
    </section>

    <section className="section challenges-section">
      <SectionHeading eyebrow="UNE TRANSITION MÉTIER, PAS SEULEMENT TECHNIQUE" title={<>Transformer une obligation en <em>levier d’efficacité.</em></>} text="La facturation électronique touche les processus, les données, les systèmes et l’organisation. Une transition réussie commence par une vision claire de l’existant et se poursuit par une intégration progressive, sécurisée et mesurable." />
      <div className="challenge-grid">{challenges.map(([title,text], index) => <article key={title}><span>{String(index + 1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="section invoice-capabilities">
      <div><Eyebrow>CHAÎNE DE VALEUR</Eyebrow><h2>Une chaîne de facturation pensée <em>de bout en bout.</em></h2><p>Notre approche combine conseil, intégration et ingénierie pour fluidifier le cycle de vie de la facture, depuis sa création ou sa réception jusqu’au suivi, au rapprochement et à l’archivage.</p></div>
      <ol>{capabilities.map((item,index) => <li key={item}><span>{String(index+1).padStart(2,"0")}</span>{item}</li>)}</ol>
    </section>

    <section className="section lifecycle-section"><SectionHeading eyebrow="CYCLE DE TRAITEMENT" title={<>Six étapes pour garder <em>la maîtrise.</em></>} /><div className="lifecycle">{lifecycle.map(([title,text],index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="integration-section"><div className="integration-copy"><Eyebrow>INTÉGRATION AU SI</Eyebrow><h2>Connectée à votre <em>écosystème existant.</em></h2><p>L’intégration est définie à partir de votre architecture et de vos contraintes. Elle peut associer APIs, événements, échanges batch, connecteurs ERP et portail sécurisé.</p><small>Les formats, protocoles et connecteurs définitifs sont validés lors du cadrage technique.</small></div><div className="ecosystem-map"><div className="ecosystem-core"><img src="/paytium-icon-white.svg" alt=""/><b>Orchestration</b></div>{["ERP & comptabilité", "Achats & ventes", "Référentiels", "Paiement", "GED & archivage", "Data & reporting"].map((item,index)=><span className={`eco-${index+1}`} key={item}>{item}</span>)}</div></section>

    <section className="section security-section"><SectionHeading eyebrow="SÉCURITÉ, TRAÇABILITÉ & CONFORMITÉ" title={<>La maîtrise intégrée à <em>chaque échange.</em></>} /><div className="security-grid">{security.map((item,index)=><article key={item}><span>0{index+1}</span><p>{item}</p></article>)}</div><p className="responsible-note">Le périmètre de conformité est défini avec les équipes juridique, fiscale, sécurité et protection des données du client, à partir des textes et référentiels officiellement applicables.</p></section>

    <section className="section usecase-section"><SectionHeading eyebrow="CAS D’USAGE" title={<>Des flux adaptés à <em>votre organisation.</em></>} /><div className="usecase-grid">{useCases.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="section deployment-section"><SectionHeading eyebrow="DÉPLOIEMENT" title={<>Une transition progressive <em>et maîtrisée.</em></>} /><div className="deployment-track">{deployment.map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="section faq-section"><div><Eyebrow>QUESTIONS FRÉQUENTES</Eyebrow><h2>Pour avancer avec <em>clarté.</em></h2></div><div className="faq-list">{faq.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true"><LuPlus /></span></summary><p>{answer}</p></details>)}</div></section>

    <FinalCta eyebrow="PRÉPAREZ LA SUITE" title={<>Où en êtes-vous dans votre transition vers la <em>facturation électronique ?</em></>} text="Réalisons un premier échange pour clarifier votre périmètre, vos priorités et les dépendances à anticiper." primary="Demander un échange" secondary={["Découvrir les services Paytium", "/services"]} />
  </PageShell>;
}
