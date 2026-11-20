import Link from "next/link";
import { notFound } from "next/navigation";
import EditView from "@/components/EditView";
import { requireAdmin } from "@/lib/cms/auth";
import { fetchRow } from "@/lib/cms/db";
import { rowToEdit } from "@/lib/cms/edits";
import { registerProducts } from "@/data/products";

/** A draft shown exactly as it will look on the site. Reading the admin cookie
 *  here is what keeps the public edit pages fully cacheable. */
export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const row = await fetchRow(id);
  if (!row) notFound();
  const { edit, products } = rowToEdit(row);
  registerProducts(products);
  return (
    <>
      <div className="sticky top-0 z-50 bg-ink px-5 py-3 text-sm text-card flex items-center justify-between gap-3">
        <span>Preview. Only you can see this.</span>
        <Link href={`/admin/edit/${row.id}`} className="rounded-pill bg-card px-4 py-1.5 font-semibold text-ink">
          Back to editing
        </Link>
      </div>
      <EditView
        edit={{ ...edit, draft: row.status === "draft" }}
        draftNote="This is a draft. It's not on the site, in the sitemap, or anywhere else until you press Publish."
      />
    </>
  );
}
