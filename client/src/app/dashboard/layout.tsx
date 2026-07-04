import Link from "next/link";

function Sidebar() {
  return (
    <nav className="p-4">
      <ul>
        <li>
          <Link href="/dashboard">Home</Link>
        </li>
        <li>
          <Link href="/dashboard/analytics">Analytics</Link>
        </li>
        <li>
          <Link href="/dashboard/calendar">Calendar</Link>
        </li>
        <li>
          <Link href="/dashboard/cheatsheet">Cheat Sheet</Link>
        </li>
        <li>
          <Link href="/dashboard/guide">Guide</Link>
        </li>
        <li>
          <Link href="/dashboard/tracker">Tracker</Link>
        </li>
      </ul>
    </nav>
  );
}

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
