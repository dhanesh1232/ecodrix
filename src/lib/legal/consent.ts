/**
 * Cookie consent storage, shared by the banner (client) and the boot script
 * in the root layout's <head> (runs before first paint).
 */
export const CONSENT_STORAGE_KEY = "ecodrix_cookie_consent";
export const CONSENT_VERSION = 1;
/** Fired on window after the visitor saves a choice (banner, preferences). */
export const CONSENT_CHANGED_EVENT = "ecodrix:consent-changed";

const GA_ID = "G-DK8Q4TLZPM";

/**
 * Google Consent Mode v2 defaults (everything but essentials denied), then
 * the visitor's stored choice if there is one. With no valid stored choice it
 * marks <html data-consent="ask">, which shows the server-rendered banner in
 * the first paint instead of after hydration (the banner was the page's
 * largest paint on phones, at about 6 s). Must stay synchronous and run
 * before any Google tag.
 */
export const CONSENT_BOOT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})||'null');if(c&&c.version===${CONSENT_VERSION}){gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:c.marketing?'granted':'denied',ad_user_data:c.marketing?'granted':'denied',ad_personalization:c.marketing?'granted':'denied'});}else{document.documentElement.dataset.consent='ask';}}catch(e){document.documentElement.dataset.consent='ask';}`;

/**
 * Loads Google's gtag.js only once the visitor has allowed analytics (the cookie policy promises
 * this): at once if they allow it now, else on their first scroll/tap/key or 5 s after load when
 * an earlier "allow" is stored. Without consent no request goes to Google at all, not even a
 * cookieless Consent Mode ping.
 */
export const GA_LOADER_SCRIPT = `(function(w,d){var done=0,ev=['scroll','pointerdown','keydown','touchstart'];
function ok(){try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})||'null');return !!(c&&c.version===${CONSENT_VERSION}&&c.analytics===true);}catch(e){return false;}}
function load(){if(done||!ok())return;done=1;ev.forEach(function(e){w.removeEventListener(e,load);});
var j=d.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';d.head.appendChild(j);}
w.addEventListener(${JSON.stringify(CONSENT_CHANGED_EVENT)},load);
if(!ok())return;
ev.forEach(function(e){w.addEventListener(e,load,{passive:true});});
if(d.readyState==='complete')setTimeout(load,5000);else w.addEventListener('load',function(){setTimeout(load,5000);});
})(window,document);`;

/**
 * Whether the visitor's stored choice allows analytics. Client only; false
 * until they choose, and when storage is unavailable.
 */
export function analyticsConsented(): boolean {
  try {
    const c = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) ?? "null") as {
      analytics?: boolean;
      version?: number;
    } | null;
    return c?.version === CONSENT_VERSION && c.analytics === true;
  } catch {
    return false;
  }
}
