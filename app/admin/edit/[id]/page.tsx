import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/cms/auth";
import { fetchRow } from "@/lib/cms/db";
import { shopList } from "@/lib/shops";
import EditForm from "../../EditForm";

export default async function EditExistingPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const row = await fetchRow(id);
  if (!row) notFound();
  return (
    <EditForm
      id={row.id}
      status={row.status}
      slug={row.slug}
      shops={shopList()}
      initial={{
        title: row.title,
        section: row.section,
        intro: row.intro,
        searchTitle: row.search_title,
        description: row.description,
        season: row.season,
        note: row.note,
        instagram: row.instagram,
        boardImage: row.board_image,
        lookKind: row.look_kind,
        products: row.products ?? [],
      }}
    />
  );
}
