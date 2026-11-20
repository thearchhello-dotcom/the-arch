import { requireAdmin } from "@/lib/cms/auth";
import EditForm from "../EditForm";
import { shopList } from "@/lib/shops";

export default async function NewEditPage() {
  await requireAdmin();
  return <EditForm id={null} status="draft" slug={null} initial={null} shops={shopList()} />;
}
