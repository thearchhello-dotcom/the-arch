import Image from "next/image";
import Link from "next/link";
import { publishedEdits } from "@/data/edits";
import { site } from "@/lib/site";

const COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Browse",
    links: [
      { href: "/shop", label: "Shop" },
      { href: "/edits", label: "All edits" },
      { href: `/edits/${publishedEdits[0]?.slug ?? ""}`, label: "Latest edit" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "/about", label: "About The Arch" },
      { href: "/how-we-choose", label: "How it works" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "The small print",
    links: [
      { href: "/disclosure", label: "Affiliate disclosure" },
      { href: "/privacy", label: "Privacy & cookies" },
      { href: "/terms", label: "Terms of use" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="px-5 pt-12 pb-10 sm:px-8 sm:pt-14 bg-footer border-t border-line md:px-14">
      <div className="flex flex-wrap gap-12 justify-between mb-12">
        <div className="flex flex-col gap-4 max-w-xs">
          <Image
            src="/logo-the-arch-horizontal-dot.png"
            alt="The Arch"
            width={120}
            height={34}
            className="opacity-85"
          />
          <p className="text-sm leading-relaxed text-ink-soft">
            Curated children&apos;s outfits from the shops parents already use &mdash; styled
            properly, priced up in full. Written in {site.location}.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <h2 className="font-body font-bold text-xs tracking-widest uppercase text-ink-faint">
              {col.heading}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-ink hover:text-terracotta transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line pt-6 flex flex-col gap-2">
        <p className="text-xs text-ink-faint leading-relaxed max-w-3xl">
          The Arch is a curated affiliate site &mdash; some links earn us a small commission
          at no extra cost to you, which never affects what we choose.{" "}
          <Link href="/disclosure" className="underline underline-offset-4 hover:text-terracotta">
            Read the disclosure
          </Link>
          . Prices are correct at the time of writing and change often; always check on the
          retailer&apos;s site before buying.
        </p>
        <p className="text-xs text-ink-faint">
          &copy; {new Date().getFullYear()} {site.name}. Written by {site.owner}.
        </p>
      </div>
    </footer>
  );
}
