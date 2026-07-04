import Link from "next/link";

function Header() {
  return (
    <header>
      <nav className="flex justify-between gap-4 p-4">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/guide">Guide</Link>
          <Link href="/cheatsheet">Cheatsheet</Link>
        </div>

        <div className="flex gap-4">
          <Link href="/login">Sign In</Link>
          <Link href="/signup">Get Started</Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return <footer className="p-4">Footer</footer>;
}

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
