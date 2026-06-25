import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isLoggedIn = false;
  return (
    <>
      <header>
        <nav className="flex justify-between gap-4 p-4">
          <div className="flex gap-4">
            <Link href="/">Home</Link>
            {/* <Link href="/guide">Guide</Link> TODO: In V2*/}
            {/* <Link href="/cheatsheet">Cheatsheet</Link> TODO: In V2 */}
            {/* <Link href="/calendar">Calendar</Link> TODO: In V2 */}
            {/* <Link href="/analytics">Analytics</Link> TODO: In V2 */}
            {isLoggedIn && <Link href="/tracker">Tracker</Link>}
          </div>

          <div className="flex gap-4">
            {isLoggedIn ? (
              <Link href="/logout">Log out</Link>
            ) : (
              <>
                <Link href="/login">Log in</Link>
                <Link href="/signup">Sign up</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      {children}
      <footer className="p-4">Footer</footer>
    </>
  );
}
