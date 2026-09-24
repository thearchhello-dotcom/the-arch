import type { Metadata } from "next";
import { Fredoka, Karla } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CookieBanner from "@/components/CookieBanner";
import { site } from "@/lib/site";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  // A relative canonical resolves per route, so every page declares itself the
  // original. Without it, /shop and /shop?category=Baby look like two pages
  // with the same content and Google has to guess which one to rank.
  alternates: { canonical: "./" },
  title: {
    default: "The Arch — all the little things, under one arch",
    template: "%s — The Arch",
  },
  description:
    "Curated children's clothes, toys, gifts and baby essentials from the shops parents already trust — all in one place.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: "The Arch — all the little things, under one arch",
    description:
      "Styled edits for babies and children — from the shops parents already use, with every piece linked and priced up in full.",
    images: ["/logo-the-arch-square-dot.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Arch — all the little things, under one arch",
    description:
      "Styled edits for babies and children — from the shops parents already use, with every piece linked and priced up in full.",
    images: ["/logo-the-arch-square-dot.png"],
  },
  icons: { icon: "/logo-the-arch-square-dot.png", apple: "/logo-the-arch-square-dot.png" },
  // robots.txt is a request; this tag is the instruction search engines
  // actually honour. Both come off when site.isPublic goes true.
  robots: site.isPublic ? undefined : { index: false, follow: false },
};

// Who the site is, stated once for every page.
//
// Three linked entities with stable @ids, so the edit pages can point at them
// rather than repeating them: the organisation (The Arch), the person behind
// it (Gemma, the stylist) and the website. sameAs ties the organisation to its
// real social profiles, which is how search engines and AI assistants tell this
// "The Arch" from the many others — Mark's entity point, and the reason the
// full domain is used alongside the name everywhere.
const sameAs = Object.values(site.socials).filter(Boolean);
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.domain}/#organization`,
      name: site.name,
      alternateName: site.displayDomain,
      url: site.domain,
      logo: `${site.domain}/logo-the-arch-square-dot.png`,
      description:
        "Styled edits for babies and children, from the shops parents already use, with every piece linked and priced up in full.",
      founder: { "@id": `${site.domain}/#gemma` },
      address: { "@type": "PostalAddress", addressRegion: "Cumbria", addressCountry: "GB" },
      email: site.email,
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "Person",
      "@id": `${site.domain}/#gemma`,
      name: site.owner,
      jobTitle: "Stylist",
      url: `${site.domain}/about`,
      worksFor: { "@id": `${site.domain}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${site.domain}/#website`,
      name: site.name,
      url: site.domain,
      inLanguage: "en-GB",
      publisher: { "@id": `${site.domain}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${fredoka.variable} ${karla.variable}`}>
      <body className="font-body bg-cream">
        {children}
        <CookieBanner />
        {/* Counts page views. Cookieless and it stores nothing about the
            visitor, so it sits outside the consent banner — there's nothing
            for anyone to consent to. Needs Web Analytics switched on in the
            Vercel dashboard before it records anything. */}
        <Analytics />
        {/* Skimlinks is switched off. Gemma's application was declined on
            18 September 2026, so the script earned nothing while still loading
            a third party's code on every page for every visitor. Their
            guidance is to wait about three months before reapplying.

            If they approve her later, put it back exactly here:
              <Script id="skimlinks"
                src="https://s.skimresources.com/js/309523X1797878.skimlinks.js"
                strategy="afterInteractive" />
            (and re-add: import Script from "next/script"). Nothing else needs
            to change, because product links stay as the shops' own addresses
            and Skimlinks converts them in the browser. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
