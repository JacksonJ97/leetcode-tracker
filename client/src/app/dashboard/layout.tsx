import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth-client";
import { SignOutButton } from "@/features/dashboard/signout-button";

function Sidebar() {
  return (
    <div className="bg-surface border-border flex w-3xs flex-col justify-between border-r p-4">
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Home</Link>
          </li>
          <li>
            <Link href="/dashboard/tracker">Tracker</Link>
          </li>
          <li>
            <Link href="/dashboard/calendar">Calendar</Link>
          </li>
          <li>
            <Link href="/dashboard/analytics">Analytics</Link>
          </li>
          <li>
            <Link href="/dashboard/cheatsheet">Cheat Sheet</Link>
          </li>
          <li>
            <Link href="/dashboard/guide">Guide</Link>
          </li>
        </ul>
      </nav>
      <SignOutButton />
    </div>
  );
}

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = await auth.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
