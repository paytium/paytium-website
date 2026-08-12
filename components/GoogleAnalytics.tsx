const measurementId = process.env.VITE_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  if (!measurementId) return null;
  return <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
    <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});` }} />
  </>;
}
