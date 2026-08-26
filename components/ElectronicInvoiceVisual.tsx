import { LuBadgeCheck, LuBinary, LuFileCode2, LuSignature } from "react-icons/lu";

export function ElectronicInvoiceVisual({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const fr = locale === "fr";
  return <div className="invoice-visual electronic-invoice-visual" aria-label={fr ? "Illustration d’une facture électronique structurée, contrôlée et signée" : "Illustration of a structured, cleared and signed electronic invoice"}>
    <div className="binary-stream" aria-hidden="true"><LuBinary/><span>01001001 01001110 01010110 01001111 01001001 01000011 01000101</span></div>
    <div className="invoice-orbit" aria-hidden="true"/>
    <div className="electronic-invoice-sheet">
      <header><LuFileCode2 aria-hidden="true"/><span><small>UBL 2.1 · XML</small><b>{fr ? "FACTURE ÉLECTRONIQUE" : "ELECTRONIC INVOICE"}</b></span><i>XML</i></header>
      <code aria-hidden="true"><span>&lt;Invoice&gt;</span><span>&nbsp;&nbsp;&lt;cbc:ID&gt;INV-2026-0042&lt;/cbc:ID&gt;</span><span>&nbsp;&nbsp;&lt;cac:TaxTotal&gt;...&lt;/cac:TaxTotal&gt;</span><span>&lt;/Invoice&gt;</span></code>
      <div className="invoice-data-lines" aria-hidden="true"><i/><i/><i/><i/></div>
      <div className="invoice-stamps">
        <div className="invoice-stamp stamp-dgi"><LuBadgeCheck aria-hidden="true"/><span><b>DGI</b><small>CLEARANCE</small></span></div>
        <div className="invoice-stamp stamp-signature"><LuSignature aria-hidden="true"/><span><b>E-SIGNATURE</b><small>{fr ? "VÉRIFIÉE" : "VERIFIED"}</small></span></div>
      </div>
      <i className="invoice-scan-line" aria-hidden="true"/>
    </div>
    <div className="system-tag tag-erp">ERP</div><div className="system-tag tag-data">DATA</div><div className="system-tag tag-archive">ARCHIVE</div>
  </div>;
}
