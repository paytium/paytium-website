import { FaBuildingColumns, FaCircleCheck, FaServer, FaUserTie } from "react-icons/fa6";
import type { BlogLocale } from "../content/blog";

export function CspFlowDiagram({ locale }: { locale: BlogLocale }) {
  const copy = locale === "fr" ? {
    kicker: "Modèle d’échange décentralisé",
    title: "Des flux interopérables, contrôlés par l’autorité fiscale.",
    authority: "DGI · Autorité fiscale",
    authorityDetail: "Contrôle, clearance et traçabilité",
    issuer: "CSP fournisseur",
    receiver: "CSP client",
    providerDetail: "Prestataire certifié",
    supplier: "Fournisseur",
    customer: "Client",
    exchange: "Échange standardisé",
    steps: [
      { code: "1", label: "Édition, signature et émission" },
      { code: "2", label: "Validation (clearance)" },
      { code: "3′", label: "Échange standardisé entre CSP" },
      { code: "3″", label: "Collecte DGI : factures et statuts" },
      { code: "4", label: "Réception par le client" },
      { code: "4″", label: "Collecte DGI : statuts et événements" },
    ],
  } : {
    kicker: "Decentralised exchange model",
    title: "Interoperable flows controlled by the tax authority.",
    authority: "DGI · Tax authority",
    authorityDetail: "Control, clearance and traceability",
    issuer: "Supplier CSP",
    receiver: "Customer CSP",
    providerDetail: "Certified service provider",
    supplier: "Supplier",
    customer: "Customer",
    exchange: "Standardised exchange",
    steps: [
      { code: "1", label: "Creation, signature and issuance" },
      { code: "2", label: "Validation (clearance)" },
      { code: "3′", label: "Standardised CSP-to-CSP exchange" },
      { code: "3″", label: "DGI data collection: invoices and statuses" },
      { code: "4", label: "Receipt by the customer" },
      { code: "4″", label: "DGI data collection: statuses and events" },
    ],
  };

  return <figure className="csp-flow-diagram" aria-labelledby="csp-flow-title">
    <figcaption><span>{copy.kicker}</span><strong id="csp-flow-title">{copy.title}</strong></figcaption>
    <div className="csp-authority-node">
      <div className="csp-authority-brands">
        <img src="/flag-morocco.png" alt={locale === "fr" ? "Drapeau du Maroc" : "Flag of Morocco"} />
        <img src="/logo-dgi.png" alt={locale === "fr" ? "Logo de la DGI" : "DGI logo"} />
      </div>
      <i aria-hidden="true"><FaBuildingColumns /></i><b>{copy.authority}</b><small>{copy.authorityDetail}</small>
    </div>
    <div className="csp-clearance-lines" aria-hidden="true"><i data-step="3″"></i><i data-step="4″"></i></div>
    <div className="csp-exchange-row">
      <div className="csp-provider-node"><b className="csp-step-marker" aria-hidden="true">2</b><i><FaServer /></i><b>{copy.issuer}</b><small>{copy.providerDetail}</small></div>
      <div className="csp-exchange-bridge"><span>{copy.exchange}</span><i aria-hidden="true"><b className="csp-step-marker">3′</b></i></div>
      <div className="csp-provider-node"><i><FaServer /></i><b>{copy.receiver}</b><small>{copy.providerDetail}</small></div>
    </div>
    <div className="csp-party-links" aria-hidden="true"><i data-step="1"></i><i data-step="4"></i></div>
    <div className="csp-actor-row">
      <div><i><FaUserTie /></i><b>{copy.supplier}</b></div>
      <div><i><FaUserTie /></i><b>{copy.customer}</b></div>
    </div>
    <div className="csp-flow-steps">{copy.steps.map((step) => <span key={step.code}><i><FaCircleCheck /></i><b>{step.code}</b>{step.label}</span>)}</div>
  </figure>;
}
