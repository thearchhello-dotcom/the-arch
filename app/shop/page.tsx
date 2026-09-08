import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopFilters from "@/components/ShopFilters";
import DisclosureNote from "@/components/DisclosureNote";
import type { Category } from "@/lib/types";

export const metadata: Metadata = {
  title: "Shop the catalogue",
  description:
    "Every piece featured in an edit, filterable by who it's for and which shop it's from.",
};

const VALID_CATEGORIES: Category[] = ["Baby", "Girls", "Boys"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const requested = resolvedParams.category as Category | undefined;
  const initialCategory = requested && VALID_CATEGORIES.includes(requested) ? requested : "All";

  return (
    <>
      <Header />
      <section className="px-5 pt-10 pb-2 sm:px-8 sm:pt-14 md:px-14 flex flex-col gap-3">
        <h1 className="font-display text-[30px] sm:text-4xl font-semibold text-ink">Shop the catalogue</h1>
        <p className="text-ink-soft">
          Every piece, from the shops you already trust &mdash; filter by who it&apos;s for and where
          it&apos;s from.
        </p>
      </section>
      <section className="px-5 pt-6 pb-8 sm:px-8 md:px-14">
        <DisclosureNote className="max-w-2xl" />
      </section>
      <section className="px-5 pb-16 sm:px-8 sm:pb-24 md:px-14">
        <ShopFilters initialCategory={initialCategory} />
        <p className="text-xs text-ink-faint mt-10">
          Each piece shows an icon rather than a photograph for now. Product images come through
          with the retailers&apos; own product feeds once the affiliate programmes are approved.
        </p>
      </section>
      <Footer />
    </>
  );
}
