"use client";

import { useEffect, useState } from "react";

type LoaderPhase = "visible" | "leaving" | "hidden";

export function PageLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("visible");

  useEffect(() => {
    let hideTimer = 0;
    let finishTimer = 0;
    const startedAt = window.performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(finishTimer);
      document.documentElement.classList.add("is-page-loading");
      setPhase("visible");
    };

    const hide = () => {
      const minimumDisplay = reducedMotion ? 0 : 420;
      const remaining = Math.max(0, minimumDisplay - (window.performance.now() - startedAt));
      hideTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("is-page-loading");
        setPhase(reducedMotion ? "hidden" : "leaving");
        if (!reducedMotion) finishTimer = window.setTimeout(() => setPhase("hidden"), 360);
      }, remaining);
    };

    const handleNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || !["http:", "https:"].includes(destination.protocol)) return;

      const current = new URL(window.location.href);
      const changesDocument = destination.pathname !== current.pathname || destination.search !== current.search;
      if (changesDocument) show();
    };

    document.documentElement.classList.add("is-page-loading");
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });
    document.addEventListener("click", handleNavigation, true);
    window.addEventListener("beforeunload", show);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(finishTimer);
      window.removeEventListener("load", hide);
      document.removeEventListener("click", handleNavigation, true);
      window.removeEventListener("beforeunload", show);
      document.documentElement.classList.remove("is-page-loading");
    };
  }, []);

  return (
    <div className={`page-loader is-${phase}`} role="status" aria-live="polite" aria-label="Chargement / Loading">
      <div className="page-loader-mark" aria-hidden="true">
        <span className="page-loader-orbit page-loader-orbit-outer" />
        <span className="page-loader-orbit page-loader-orbit-inner" />
        <img src="/paytium-icon.svg" alt="" width="72" height="72" />
      </div>
      <div className="page-loader-dots" aria-hidden="true"><i /><i /><i /></div>
    </div>
  );
}
