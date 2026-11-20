import { notFound } from "next/navigation";
import type { Metadata } from "next";
import EditView from "@/components/EditView";
import { getPublishedEdit, getPublishedEdits } from "@/lib/cms/edits";

export async function generateStaticParams() {
  return (await getPublishedEdits()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const edit = await getPublishedEdit(slug);
  if (!edit) return { title: "Edit" };
  // The search title leads in search results, because it is what a parent
  // actually typed. The edit's own name still leads when the page is shared.
  return {
    title: edit.searchTitle ?? edit.title,
    description: edit.description,
    openGraph: {
      title: edit.searchTitle ? `${edit.title}: ${edit.searchTitle}` : edit.title,
      description: edit.description,
      images: edit.shareImage ?? edit.boardImage ? [(edit.shareImage ?? edit.boardImage) as string] : ["/logo-the-arch-square-dot.png"],
    },
    // Without this, a link shared on X fell back to the site-wide card: the
    // logo and the general tagline instead of this edit's board and name.
    twitter: {
      card: "summary_large_image",
      title: edit.searchTitle ? `${edit.title}: ${edit.searchTitle}` : edit.title,
      description: edit.description,
      images: edit.shareImage ?? edit.boardImage ? [(edit.shareImage ?? edit.boardImage) as string] : ["/logo-the-arch-square-dot.png"],
    },
  };
}

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edit = await getPublishedEdit(slug);
  if (!edit) notFound();
  return <EditView edit={edit} />;
}
