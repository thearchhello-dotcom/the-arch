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
    default: "The Arch — little finds for little people",
    template: "%s — The Arch",
  },
  description:
    "Curated children's clothes, toys, gifts and baby essentials from the shops parents already trust — all in one place.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: "The Arch — little finds for little people",
    description:
      "Complete children's outfits from the shops parents already use — styled properly and priced up in full.",
    images: ["/logo-the-arch-square-dot.png"],
  },
  twitter: {
    card: "summary",
    title: "The Arch — little finds for little people",
    description:
      "Complete children's outfits from the shops parents already use — styled properly and priced up in full.",
    images: ["/logo-the-arch-square-dot.png"],
  },
  icons: { icon: "/logo-the-arch-square-dot.png", apple: "/logo-the-arch-square-dot.png" },
  // robots.txt is a request; this tag is the instruction search engines
  // actually honour. Both come off when site.isPublic goes true.
  robots: site.isPublic ? undefined : { index: false, follow: false },
};

// Tells Google this is a real publication with a named author behind it —
// which is exactly what both search and affiliate reviewers look for.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.domain,
  description:
    "Curated children's outfits from the shops parents already use — styled properly and priced up in full.",
  publisher: {
    "@type": "Person",
    name: site.owner,
    address: { "@type": "PostalAddress", addressRegion: "Cumbria", addressCountry: "GB" },
    email: site.email,
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
