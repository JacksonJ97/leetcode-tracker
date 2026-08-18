import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth-client";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = await auth.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center p-4">{children}</main>
  );
}
