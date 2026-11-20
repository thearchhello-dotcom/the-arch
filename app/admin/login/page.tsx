import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/cms/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <main className="mx-auto max-w-sm px-5 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">The Arch admin</h1>
      <p className="mb-8">Just for Gemma.</p>
      <LoginForm />
    </main>
  );
}
