import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-gray-800 p-4 text-white">
        <nav className="flex justify-between">
          <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
          </div>
          <div className="flex gap-4">
            <Link href="/settings">Settings</Link>
            <Link href="/logout">Log out</Link>
          </div>
        </nav>
      </header>
      <main className="grow p-4">{children}</main>
      <footer className="bg-gray-800 p-4 text-white">Footer</footer>
    </div>
  );
}
