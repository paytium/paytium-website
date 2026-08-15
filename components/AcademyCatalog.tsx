"use client";

import { useMemo, useState } from "react";
import { LuArrowUpRight, LuChevronDown, LuX } from "react-icons/lu";
import { AcademyCourse, AcademyLocale, academyCourses, academyDomains } from "../content/academy";

const labels = {
  fr: { allDomains: "Tous les domaines", allTypes: "Tous les types", allFormats: "Tous les formats", search: "Rechercher une formation", placeholder: "Ex. IA, Product, Kubernetes…", results: "formations trouvées", empty: "Aucune formation ne correspond à ces critères.", reset: "Réinitialiser les filtres", duration: "Durée", format: "Formats", details: "Demander le programme", types: { Technology: "Technologie", Methods: "Méthodologie", "Responsible Digital": "Numérique responsable" }, formats: { "Inter-company": "Inter-entreprises", "In-company": "Intra-entreprise", Custom: "Sur mesure" } },
  en: { allDomains: "All domains", allTypes: "All types", allFormats: "All formats", search: "Search for a course", placeholder: "E.g. AI, Product, Kubernetes…", results: "courses found", empty: "No course matches these criteria.", reset: "Reset filters", duration: "Duration", format: "Formats", details: "Request course details", types: { Technology: "Technology", Methods: "Delivery methods", "Responsible Digital": "Responsible digital" }, formats: { "Inter-company": "Public course", "In-company": "Private team", Custom: "Tailored" } },
} as const;

function normalise(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function AcademyCatalog({ locale = "fr" }: { locale?: AcademyLocale }) {
  const copy = labels[locale];
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("");
  const [format, setFormat] = useState("");
  const [query, setQuery] = useState("");
  const courses = useMemo(() => academyCourses.filter((course) => {
    const haystack = normalise(`${course.title[locale]} ${course.description[locale]} ${course.domain} ${course.code}`);
    return (!domain || course.domain === domain) && (!type || course.type === type) && (!format || course.formats.includes(format as AcademyCourse["formats"][number])) && (!query || haystack.includes(normalise(query)));
  }), [domain, type, format, query, locale]);
  const reset = () => { setDomain(""); setType(""); setFormat(""); setQuery(""); };

  return <div className="academy-catalog">
    <div className="catalog-filters" role="search">
      <label className="catalog-search"><span className="sr-only">{copy.search}</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.placeholder} /></label>
      <div className={`filter-select ${domain ? "has-value" : ""}`}><label className="sr-only" htmlFor="academy-domain-filter">{copy.allDomains}</label><select id="academy-domain-filter" value={domain} onChange={(event) => setDomain(event.target.value)}><option value="">{copy.allDomains}</option>{academyDomains.map((item) => <option key={item}>{item}</option>)}</select>{domain ? <button className="filter-clear" type="button" onClick={() => setDomain("")} aria-label={`${locale === "fr" ? "Supprimer le filtre" : "Remove filter"} ${domain}`}><LuX aria-hidden="true" /></button> : <LuChevronDown className="filter-chevron" aria-hidden="true" />}</div>
      <div className={`filter-select ${type ? "has-value" : ""}`}><label className="sr-only" htmlFor="academy-type-filter">{copy.allTypes}</label><select id="academy-type-filter" value={type} onChange={(event) => setType(event.target.value)}><option value="">{copy.allTypes}</option>{Object.entries(copy.types).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select>{type ? <button className="filter-clear" type="button" onClick={() => setType("")} aria-label={`${locale === "fr" ? "Supprimer le filtre" : "Remove filter"} ${copy.types[type as keyof typeof copy.types]}`}><LuX aria-hidden="true" /></button> : <LuChevronDown className="filter-chevron" aria-hidden="true" />}</div>
      <div className={`filter-select ${format ? "has-value" : ""}`}><label className="sr-only" htmlFor="academy-format-filter">{copy.allFormats}</label><select id="academy-format-filter" value={format} onChange={(event) => setFormat(event.target.value)}><option value="">{copy.allFormats}</option>{Object.entries(copy.formats).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select>{format ? <button className="filter-clear" type="button" onClick={() => setFormat("")} aria-label={`${locale === "fr" ? "Supprimer le filtre" : "Remove filter"} ${copy.formats[format as keyof typeof copy.formats]}`}><LuX aria-hidden="true" /></button> : <LuChevronDown className="filter-chevron" aria-hidden="true" />}</div>
    </div>
    <div className="catalog-summary"><strong>{courses.length} {copy.results}</strong>{(domain || type || format || query) && <button type="button" onClick={reset}>{copy.reset}</button>}</div>
    {courses.length ? <div className="course-grid">{courses.map((course) => <article className="course-card" key={course.code}>
      <div className="course-meta"><span>{course.code}</span><b>{copy.types[course.type]}</b></div>
      <p className="course-domain">{course.domain}</p><h3>{course.title[locale]}</h3><p>{course.description[locale]}</p>
      <dl><div><dt>{copy.duration}</dt><dd>{course.duration.replace("days", locale === "fr" ? "jours" : "days").replace("day", locale === "fr" ? "jour" : "day")}</dd></div><div><dt>{copy.format}</dt><dd>{course.formats.map((item) => copy.formats[item]).join(" · ")}</dd></div></dl>
      <a href={`${locale === "en" ? "/en" : ""}/#contact`}>{copy.details}<LuArrowUpRight aria-hidden="true" /></a>
    </article>)}</div> : <div className="catalog-empty"><p>{copy.empty}</p><button className="button button-secondary" type="button" onClick={reset}>{copy.reset}</button></div>}
  </div>;
}
