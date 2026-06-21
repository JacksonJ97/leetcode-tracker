import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeetCode Tracker",
  description: "Track your LeetCode progress",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <header>
          <nav className="flex justify-between gap-4 p-4">
            <div className="flex gap-4">
              <Link href="/">Logo</Link>
              <Link href="/guide">Guide</Link>
              <Link href="/cheatsheet">Cheatsheet</Link>
              <Link href="/tracker">Tracker</Link>
            </div>

            <div className="flex gap-4">
              <Link href="/login">Log in</Link>
              <Link href="/signup">Sign up</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="p-4">Footer</footer>
      </body>
    </html>
  );
}
