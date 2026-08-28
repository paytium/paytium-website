"use client";

import { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { LuCheck, LuCopy, LuPrinter } from "react-icons/lu";

export function BlogPrintButton({ locale = "fr" }: { locale?: "fr" | "en" }) {
  return <button className="article-print" type="button" onClick={() => window.print()}><LuPrinter aria-hidden="true" />{locale === "fr" ? "Imprimer l’article" : "Print article"}</button>;
}

export function BlogShare({ locale = "fr", title }: { locale?: "fr" | "en"; title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => setUrl(window.location.href), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(url); }
    catch { const field = document.createElement("textarea"); field.value = url; document.body.appendChild(field); field.select(); document.execCommand("copy"); field.remove(); }
    setCopied(true); window.setTimeout(() => setCopied(false), 2400);
  };
  return <section className="article-share" aria-labelledby="share-title"><div><span className="eyebrow"><span />{locale === "fr" ? "PARTAGER" : "SHARE"}</span><h2 id="share-title">{locale === "fr" ? "Partagez cette analyse avec votre réseau." : "Share this insight with your network."}</h2></div><div className="share-actions">
    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn aria-hidden="true" /></a>
    <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter aria-hidden="true" /></a>
    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF aria-hidden="true" /></a>
    <button type="button" onClick={copyLink} aria-label={locale === "fr" ? "Copier le lien" : "Copy link"} title={locale === "fr" ? "Copier le lien" : "Copy link"}>{copied ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}</button>
  </div>{copied && <div className="copy-toast" role="status">{locale === "fr" ? "Lien copié dans le presse-papiers." : "Link copied to clipboard."}</div>}</section>;
}
