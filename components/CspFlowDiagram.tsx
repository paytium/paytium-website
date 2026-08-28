import { FaBuildingColumns, FaCircleCheck, FaServer, FaUserTie } from "react-icons/fa6";
import type { BlogLocale } from "../content/blog";

export function CspFlowDiagram({ locale }: { locale: BlogLocale }) {
  const copy = locale === "fr" ? {
    kicker: "Modèle d’échange décentralisé",
    title: "Des flux interopérables, contrôlés par l’autorité fiscale.",
    authority: "DGI · Autorité fiscale",
    authorityDetail: "Contrôle, clearance et traçabilité",
    issuer: "CSP émetteur",
    receiver: "CSP récepteur",
    providerDetail: "Prestataire certifié",
    supplier: "Fournisseur",
    customer: "Client",
    exchange: "Échange standardisé",
    steps: ["Émission structurée", "Validation fiscale", "Acheminement sécurisé", "Accusé de réception"],
  } : {
    kicker: "Decentralised exchange model",
    title: "Interoperable flows controlled by the tax authority.",
    authority: "DGI · Tax authority",
    authorityDetail: "Control, clearance and traceability",
    issuer: "Issuing CSP",
    receiver: "Receiving CSP",
    providerDetail: "Certified service provider",
    supplier: "Supplier",
    customer: "Customer",
    exchange: "Standardised exchange",
    steps: ["Structured issue", "Tax validation", "Secure delivery", "Acknowledgement"],
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
    <div className="csp-clearance-lines" aria-hidden="true"><i data-step="2"></i><i data-step="4"></i></div>
    <div className="csp-exchange-row">
      <div className="csp-provider-node"><i><FaServer /></i><b>{copy.issuer}</b><small>{copy.providerDetail}</small></div>
      <div className="csp-exchange-bridge"><span>{copy.exchange}</span><i aria-hidden="true"><b className="csp-step-marker">3</b></i></div>
      <div className="csp-provider-node"><i><FaServer /></i><b>{copy.receiver}</b><small>{copy.providerDetail}</small></div>
    </div>
    <div className="csp-actor-row">
      <div><b className="csp-step-marker" aria-hidden="true">1</b><i><FaUserTie /></i><b>{copy.supplier}</b></div>
      <div><i><FaUserTie /></i><b>{copy.customer}</b></div>
    </div>
    <div className="csp-flow-steps">{copy.steps.map((step, index) => <span key={step}><i><FaCircleCheck /></i><b>{String(index + 1).padStart(2, "0")}</b>{step}</span>)}</div>
  </figure>;
}
