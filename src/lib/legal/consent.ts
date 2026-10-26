/**
 * Cookie consent storage, shared by the banner (client) and the boot script
 * in the root layout's <head> (runs before first paint).
 */
export const CONSENT_STORAGE_KEY = "ecodrix_cookie_consent";
export const CONSENT_VERSION = 1;

/**
 * Google Consent Mode v2 defaults (everything but essentials denied), then
 * the visitor's stored choice if there is one. With no valid stored choice it
 * marks <html data-consent="ask">, which shows the server-rendered banner in
 * the first paint instead of after hydration (the banner was the page's
 * largest paint on phones, at about 6 s). Must stay synchronous and run
 * before any Google tag.
 */
export const CONSENT_BOOT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})||'null');if(c&&c.version===${CONSENT_VERSION}){gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:c.marketing?'granted':'denied',ad_user_data:c.marketing?'granted':'denied',ad_personalization:c.marketing?'granted':'denied'});}else{document.documentElement.dataset.consent='ask';}}catch(e){document.documentElement.dataset.consent='ask';}`;
