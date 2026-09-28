import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Google Analytics, with Consent Mode v2, so nothing is stored about a visitor
 * unless they tap "Accept all".
 *
 * Why it's here at all: Gemma wanted to know whether anyone clicks through to
 * the shops. Only Awin could say, and only for the two programmes that track.
 * GA's enhanced measurement counts every outbound click to every shop, per
 * page, automatically.
 *
 * How consent works: the default for every storage type is denied. If the
 * visitor has already accepted (the cookie banner's choice lives in
 * localStorage under "ta-cookie-consent"), analytics is granted before the
 * config runs; otherwise GA sends only cookieless pings, which is what
 * Consent Mode is for. The banner updates it live when someone chooses.
 * Advertising storage is never granted: the site runs no ads.
 *
 * Check it works in GA's Realtime report, not by whether the script loads —
 * Mark's playbook is right that a loading script proves nothing.
 */
export default function GoogleAnalytics() {
  const id = site.gaMeasurementId;
  if (!id) return null;

  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          try {
            if (localStorage.getItem('ta-cookie-consent') === 'accepted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
    </>
  );
}
