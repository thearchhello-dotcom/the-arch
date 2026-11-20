"use client";

import { usePathname } from "next/navigation";

/** Renders its children on the public site but not in /admin: no cookie banner
 *  over the admin forms, and Gemma's own visits don't count as readers in analytics. */
export default function PublicOnly({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/admin" || path.startsWith("/admin/")) return null;
  return <>{children}</>;
}
