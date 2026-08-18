import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth-client";

function Header({ isValidSession }: { isValidSession: boolean }) {
  return (
    <header>
      <nav className="flex justify-between gap-4 p-4">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/guide">Guide</Link>
          <Link href="/cheatsheet">Cheatsheet</Link>
        </div>

        <div className="flex gap-4">
          {isValidSession ? (
            <Link href="/dashboard">Dashboard</Link>
          ) : (
            <>
              <Link href="/login">Log In</Link>
              <Link href="/signup">Get Started</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return <footer className="p-4">Footer</footer>;
}

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = await auth.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return (
    <>
      <Header isValidSession={!!session} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
