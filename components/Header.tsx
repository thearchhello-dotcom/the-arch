import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/edits", label: "Edits" },
  { href: "/how-we-choose", label: "How it works" },
  { href: "/about", label: "About" },
];

/**
 * On a wide screen the links sit in a row. Below `md` they collapse into a
 * menu.
 *
 * The menu is a plain <details> element rather than React state, so it opens
 * and closes with no JavaScript at all. That matters: most of this site's
 * traffic will be phones, and a nav that silently dies whenever a script fails
 * to load is the worst possible thing to have at the top of every page.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-cream border-b border-line">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8 md:px-14 md:py-4">
        <Link href="/" className="block shrink-0">
          <Image
            src="/logo-the-arch-horizontal-dot.png"
            alt="The Arch"
            width={140}
            height={40}
            priority
            className="w-[112px] h-auto md:w-[140px]"
          />
        </Link>

        {/* Wide screens */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-9 text-[15px] font-semibold text-ink"
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-terracotta transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Phones */}
        <details className="group md:hidden relative -mr-1">
          <summary
            aria-label="Menu"
            className="list-none [&::-webkit-details-marker]:hidden cursor-pointer p-2.5 rounded-full text-ink hover:bg-card transition-colors flex items-center justify-center"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3.5 7h17" className="group-open:hidden" />
              <path d="M3.5 12h17" className="group-open:hidden" />
              <path d="M3.5 17h17" className="group-open:hidden" />
              <path d="M5 5l14 14" className="hidden group-open:block" />
              <path d="M19 5L5 19" className="hidden group-open:block" />
            </svg>
          </summary>

          <nav
            aria-label="Primary"
            className="absolute right-0 top-full mt-2 w-[210px] rounded-2xl border border-line bg-cream shadow-xl shadow-ink/10 py-1.5 flex flex-col z-50"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-3 text-[16px] font-semibold text-ink hover:bg-card transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
