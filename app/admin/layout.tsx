import type { Metadata } from "next";

// Every admin page is built per visit, never saved ahead of time.
export const dynamic = "force-dynamic";

// Not indexed, in three ways: this tag, the X-Robots-Tag header in
// next.config.js, and the Disallow in robots.ts. It is also left out of the
// sitemap and is not linked from anywhere on the public site.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true, noarchive: true, nosnippet: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-cream text-ink-soft">{children}</div>;
}
